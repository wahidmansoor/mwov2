import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('Calculator Endpoints', () => {
  describe('POST /api/calculators/opioid-conversion', () => {
    it('should convert morphine to oxycodone correctly', async () => {
      const response = await request(app)
        .post('/api/calculators/opioid-conversion')
        .send({
          drug: 'morphine',
          dose: 30,
          target: 'oxycodone'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('equivalent_dose');
      expect(response.body).toHaveProperty('safety_reduced_dose');
      expect(response.body).toHaveProperty('morphine_equivalent');
      expect(response.body.equivalent_dose).toBe(20); // 30mg morphine = 20mg oxycodone
    });

    it('should handle invalid drug names', async () => {
      const response = await request(app)
        .post('/api/calculators/opioid-conversion')
        .send({
          drug: 'invalid-drug',
          dose: 30,
          target: 'oxycodone'
        });

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('error');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/calculators/opioid-conversion')
        .send({
          drug: 'morphine'
          // Missing dose and target
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Validation Error');
    });

    it('should handle negative doses', async () => {
      const response = await request(app)
        .post('/api/calculators/opioid-conversion')
        .send({
          drug: 'morphine',
          dose: -10,
          target: 'oxycodone'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('should apply renal function adjustments', async () => {
      const response = await request(app)
        .post('/api/calculators/opioid-conversion')
        .send({
          drug: 'morphine',
          dose: 30,
          target: 'oxycodone',
          renalFunction: 'moderate'
        });

      expect(response.status).toBe(200);
      expect(response.body.equivalent_dose).toBeLessThan(20); // Should be reduced for renal impairment
      expect(response.body.warnings).toContain('Renal adjustment applied');
    });
  });

  describe('POST /api/calculators/renal-dose-adjustment', () => {
    it('should calculate creatinine clearance correctly', async () => {
      const response = await request(app)
        .post('/api/calculators/renal-dose-adjustment')
        .send({
          drug: 'morphine',
          creatinine: 1.2,
          age: 65,
          weight: 70,
          gender: 'male'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('creatinine_clearance');
      expect(response.body).toHaveProperty('adjustment_factor');
      expect(response.body).toHaveProperty('recommendation');
      expect(response.body.creatinine_clearance).toBeGreaterThan(0);
    });

    it('should classify renal function correctly', async () => {
      const response = await request(app)
        .post('/api/calculators/renal-dose-adjustment')
        .send({
          drug: 'morphine',
          creatinine: 3.0, // High creatinine = poor renal function
          age: 80,
          weight: 60
        });

      expect(response.status).toBe(200);
      expect(response.body.renal_function).toContain('impairment');
      expect(response.body.adjustment_factor).toBeLessThan(1);
    });
  });

  describe('POST /api/calculators/prognostic-index', () => {
    it('should calculate prognostic score correctly', async () => {
      const response = await request(app)
        .post('/api/calculators/prognostic-index')
        .send({
          kps: 80,
          dyspnea: false,
          anorexia: false,
          fatigue: false
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('score');
      expect(response.body).toHaveProperty('prognosis');
      expect(response.body).toHaveProperty('survival_estimate');
      expect(response.body.prognosis).toBe('Good'); // High KPS, no symptoms
    });

    it('should handle poor prognosis cases', async () => {
      const response = await request(app)
        .post('/api/calculators/prognostic-index')
        .send({
          kps: 30,
          dyspnea: true,
          anorexia: true,
          fatigue: true
        });

      expect(response.status).toBe(200);
      expect(response.body.prognosis).toMatch(/Poor|Very Poor/);
      expect(response.body.score).toBeLessThan(0);
    });

    it('should validate KPS range', async () => {
      const response = await request(app)
        .post('/api/calculators/prognostic-index')
        .send({
          kps: 150, // Invalid KPS > 100
          dyspnea: false,
          anorexia: false,
          fatigue: false
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('GET /api/calculators', () => {
    it('should return available calculators', async () => {
      const response = await request(app)
        .get('/api/calculators');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('available_calculators');
      expect(response.body.available_calculators).toHaveLength(3);
      expect(response.body.disclaimer).toContain('educational purposes');
    });
  });
});
