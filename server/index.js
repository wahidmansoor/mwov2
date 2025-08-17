import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the server directory FIRST
dotenv.config({ path: path.join(__dirname, '.env') });

// Add some debug output to verify env vars are loaded
console.log('🔍 Environment check:');
console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);
console.log('VITE_SUPABASE_URL present:', !!process.env.VITE_SUPABASE_URL);

// Now import database modules after env vars are loaded
const { runMigrations, testConnection, closeConnection } = await import('./db/index.js');

const app = express();
const PORT = process.env.PORT || 3005;

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('📋 Please check your .env file and ensure Supabase credentials are set');
  process.exit(1);
}

// Rate limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
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
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check with database connection test
app.get('/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
    database: dbStatus ? 'Connected' : 'Disconnected',
    supabase: process.env.VITE_SUPABASE_URL ? 'Configured' : 'Not configured'
  });
});

// API Routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'OncoVista API - Supabase Integration',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    database: 'Supabase PostgreSQL'
  });
});

// Supabase configuration endpoint (for client)
app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl: process.env.VITE_SUPABASE_URL,
    supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY,
  });
});

// Import and use route modules
// TODO: Add route imports here when routes are created
// import authRoutes from './routes/auth.js';
// import patientRoutes from './routes/patients.js';
// import treatmentRoutes from './routes/treatments.js';
// app.use('/api/auth', authRoutes);
// app.use('/api/patients', patientRoutes);
// app.use('/api/treatments', treatmentRoutes);

// Error handling middleware
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

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Gracefully shutting down server...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Gracefully shutting down server...');
  await closeConnection();
  process.exit(0);
});

// Initialize database and start server
async function startServer() {
  try {
    console.log('🚀 Starting OncoVista Server with Supabase...');
    
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('❌ Failed to connect to Supabase database');
      console.error('📋 Please check your DATABASE_URL and Supabase credentials');
      process.exit(1);
    }
    
    // Run database migrations
    await runMigrations();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔌 API endpoint: http://localhost:${PORT}/api`);
      console.log(`🗃️ Database: Supabase PostgreSQL`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 Supabase URL: ${process.env.VITE_SUPABASE_URL}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
