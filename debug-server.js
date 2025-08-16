import { env } from "./server/env.ts";

console.log('Debug - Env loaded:', {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  HOST: env.HOST,
  ORIGIN: env.ORIGIN
});

import express from 'express';
import { createServer } from 'http';

const app = express();

// Simple test route
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const server = createServer(app);

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(env.PORT, env.HOST, () => {
  console.log(`Debug server listening on ${env.HOST}:${env.PORT}`);
});

console.log('Debug script completed, server should be starting...');
