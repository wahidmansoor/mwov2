// Test setup file for Vitest
import { beforeAll, afterAll } from 'vitest';

// Setup test environment
beforeAll(() => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.LOG_LEVEL = 'silent';
  
  // Mock OpenAI API key for tests
  if (!process.env.OPENAI_API_KEY) {
    process.env.OPENAI_API_KEY = 'test-key-mock';
  }
});

afterAll(() => {
  // Cleanup after tests
});

// Global test utilities
global.testTimeout = 10000; // 10 second timeout for API tests
