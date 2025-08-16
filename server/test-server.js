import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware with fixed CSP (single script-src directive)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "'unsafe-eval'",
        "translate.googleapis.com",
        "translate.google.com", 
        "www.google.com",
        "www.gstatic.com",
        "replit.com",
        "*.replit.com",
        "chrome-extension:"
      ],
      styleSrc: ["'self'", "'unsafe-inline'", "translate.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "translate.googleapis.com"],
      fontSrc: ["'self'", "translate.googleapis.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    }
  }
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    csp: 'Fixed - No duplicate script-src directives'
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'OncoVista API - CSP Test Server',
    version: '1.0.0',
    csp_status: 'Fixed'
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl: 'demo',
    supabaseAnonKey: 'demo',
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Test Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 API endpoint: http://localhost:${PORT}/api`);
  console.log(`🛡️ CSP: Fixed - No duplicate script-src directives`);
});
