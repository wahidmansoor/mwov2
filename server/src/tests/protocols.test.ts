import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('Protocol Endpoints', () => {
  describe('GET /api/protocols/symptoms/:slug', () => {
    it('should retrieve cancer pain protocol', async () => {
      const response = await request(app)
        .get('/api/protocols/symptoms/cancer-pain');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('steps');
      expect(response.body).toHaveProperty('red_flags');
      expect(response.body.title).toContain('Cancer Pain');
      expect(response.body.steps).toBeInstanceOf(Array);
      expect(response.body.steps.length).toBeGreaterThan(0);
    });

    it('should return 404 for non-existent protocol', async () => {
      const response = await request(app)
        .get('/api/protocols/symptoms/non-existent-protocol');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('should include disclaimer in response', async () => {
      const response = await request(app)
        .get('/api/protocols/symptoms/cancer-pain');

      expect(response.status).toBe(200);
      expect(response.body.disclaimer).toContain('clinical guidance only');
    });
  });

  describe('GET /api/protocols/emergencies/:slug', () => {
    it('should retrieve spinal cord compression protocol', async () => {
      const response = await request(app)
        .get('/api/protocols/emergencies/spinal-cord-compression');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('type', 'emergency');
      expect(response.body.title).toContain('Spinal Cord Compression');
    });

    it('should include emergency disclaimer', async () => {
      const response = await request(app)
        .get('/api/protocols/emergencies/spinal-cord-compression');

      expect(response.status).toBe(200);
      expect(response.body.disclaimer).toContain('emergency protocol');
    });
  });

  describe('GET /api/protocols/search', () => {
    it('should search protocols by keyword', async () => {
      const response = await request(app)
        .get('/api/protocols/search')
        .query({ q: 'pain' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('results');
      expect(response.body).toHaveProperty('count');
      expect(response.body.results).toBeInstanceOf(Array);
      expect(response.body.count).toBeGreaterThan(0);
    });

    it('should filter by type', async () => {
      const response = await request(app)
        .get('/api/protocols/search')
        .query({ q: 'management', type: 'symptom' });

      expect(response.status).toBe(200);
      expect(response.body.results.every((p: any) => p.type === 'symptom')).toBe(true);
    });

    it('should require search query', async () => {
      const response = await request(app)
        .get('/api/protocols/search');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('should limit results', async () => {
      const response = await request(app)
        .get('/api/protocols/search')
        .query({ q: 'a', limit: 2 }); // Very broad search

      expect(response.status).toBe(200);
      expect(response.body.results.length).toBeLessThanOrEqual(2);
    });
  });

  describe('GET /api/protocols', () => {
    it('should return all protocols', async () => {
      const response = await request(app)
        .get('/api/protocols');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('protocols');
      expect(response.body).toHaveProperty('count');
      expect(response.body.protocols).toBeInstanceOf(Array);
      expect(response.body.count).toBeGreaterThan(0);
    });

    it('should filter by category', async () => {
      const response = await request(app)
        .get('/api/protocols')
        .query({ category: 'pain_management' });

      expect(response.status).toBe(200);
      expect(response.body.protocols.every((p: any) => p.category === 'pain_management')).toBe(true);
    });

    it('should filter by type', async () => {
      const response = await request(app)
        .get('/api/protocols')
        .query({ type: 'emergency' });

      expect(response.status).toBe(200);
      expect(response.body.protocols.every((p: any) => p.type === 'emergency')).toBe(true);
    });
  });

  describe('GET /api/protocols/categories', () => {
    it('should return available categories', async () => {
      const response = await request(app)
        .get('/api/protocols/categories');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('symptom_categories');
      expect(response.body).toHaveProperty('emergency_categories');
      expect(response.body).toHaveProperty('treatment_types');
      expect(response.body.symptom_categories).toBeInstanceOf(Array);
      expect(response.body.emergency_categories).toBeInstanceOf(Array);
    });
  });
});
