import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('AI Service Endpoints', () => {
  describe('POST /api/ai/summarize-protocol', () => {
    it('should summarize a protocol', async () => {
      const response = await request(app)
        .post('/api/ai/summarize-protocol')
        .send({
          slug: 'cancer-pain',
          length: 'brief'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('summary');
      expect(response.body).toHaveProperty('protocol_title');
      expect(response.body).toHaveProperty('ai_model');
      expect(response.body.disclaimer).toContain('educational purposes');
    });

    it('should handle detailed summaries', async () => {
      const response = await request(app)
        .post('/api/ai/summarize-protocol')
        .send({
          slug: 'cancer-pain',
          length: 'detailed'
        });

      expect(response.status).toBe(200);
      expect(response.body.length).toBe('detailed');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/ai/summarize-protocol')
        .send({
          // Missing slug
          length: 'brief'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('should handle non-existent protocols gracefully', async () => {
      const response = await request(app)
        .post('/api/ai/summarize-protocol')
        .send({
          slug: 'non-existent-protocol',
          length: 'brief'
        });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('AI processing failed');
    });
  });

  describe('POST /api/ai/explain-education', () => {
    it('should explain educational topics', async () => {
      const response = await request(app)
        .post('/api/ai/explain-education')
        .send({
          topic: 'opioid rotation',
          level: 'resident'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('explanation');
      expect(response.body).toHaveProperty('target_audience', 'resident');
      expect(response.body.disclaimer).toContain('educational purposes');
    });

    it('should handle different training levels', async () => {
      const fellowResponse = await request(app)
        .post('/api/ai/explain-education')
        .send({
          topic: 'pain pathophysiology',
          level: 'fellow'
        });

      expect(fellowResponse.status).toBe(200);
      expect(fellowResponse.body.target_audience).toBe('fellow');

      const attendingResponse = await request(app)
        .post('/api/ai/explain-education')
        .send({
          topic: 'pain pathophysiology',
          level: 'attending'
        });

      expect(attendingResponse.status).toBe(200);
      expect(attendingResponse.body.target_audience).toBe('attending');
    });

    it('should require topic', async () => {
      const response = await request(app)
        .post('/api/ai/explain-education')
        .send({
          level: 'resident'
          // Missing topic
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('POST /api/ai/compare-guidelines', () => {
    it('should compare multiple guidelines', async () => {
      const response = await request(app)
        .post('/api/ai/compare-guidelines')
        .send({
          guidelines: ['WHO Pain Guidelines', 'NCCN Pain Management', 'ASCO Supportive Care']
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('comparison');
      expect(response.body).toHaveProperty('guidelines_compared');
      expect(response.body.guidelines_compared).toHaveLength(3);
    });

    it('should require minimum 2 guidelines', async () => {
      const response = await request(app)
        .post('/api/ai/compare-guidelines')
        .send({
          guidelines: ['Single Guideline']
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('should limit maximum guidelines', async () => {
      const response = await request(app)
        .post('/api/ai/compare-guidelines')
        .send({
          guidelines: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'] // Too many
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('should handle focus areas', async () => {
      const response = await request(app)
        .post('/api/ai/compare-guidelines')
        .send({
          guidelines: ['WHO Guidelines', 'NCCN Guidelines'],
          focus: 'opioid dosing'
        });

      expect(response.status).toBe(200);
      expect(response.body.focus_area).toBe('opioid dosing');
    });
  });

  describe('POST /api/ai/generate-treatment-plan', () => {
    it('should generate treatment plans', async () => {
      const response = await request(app)
        .post('/api/ai/generate-treatment-plan')
        .send({
          patientAge: 65,
          diagnosis: 'Stage IV lung cancer',
          comorbidities: ['COPD', 'Diabetes'],
          currentMedications: ['Metformin', 'Albuterol'],
          allergies: ['Penicillin'],
          performanceStatus: 70,
          goals: ['Pain control', 'Maintain independence']
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('treatment_plan');
      expect(response.body).toHaveProperty('patient_summary');
      expect(response.body.disclaimer).toContain('physician review');
    });
  });

  describe('GET /api/ai', () => {
    it('should return available AI services', async () => {
      const response = await request(app)
        .get('/api/ai');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('available_services');
      expect(response.body.available_services).toHaveLength(4);
      expect(response.body.disclaimer).toContain('clinical judgment');
    });
  });
});
