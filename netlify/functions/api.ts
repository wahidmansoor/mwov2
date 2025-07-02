import { Handler } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';

import { db } from '../../server/db';
import { registerRoutes } from '../../server/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Optional CORS handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Register your API routes
registerRoutes(app);

// Fallback health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: 'netlify' });
});

export const handler: Handler = serverless(app);
