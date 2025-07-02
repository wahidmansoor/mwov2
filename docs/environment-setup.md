# Environment Setup Guide

This guide covers all aspects of setting up your environment for OncoVista development and deployment.

## 📋 Environment Types

OncoVista supports three environment configurations:

### 🏠 Development (localhost)
- **Purpose**: Local development and testing
- **Database**: Supabase (cloud) or local PostgreSQL
- **File**: `.env`
- **Ports**: Frontend (5173), Backend (3001)

### 🧪 Staging (preview)
- **Purpose**: Testing before production
- **Database**: Supabase staging project
- **File**: `.env.staging`
- **URL**: Netlify preview URL

### 🚀 Production (live)
- **Purpose**: Live application
- **Database**: Supabase production project  
- **File**: `.env.production`
- **URL**: Your custom domain

## 🔧 Environment Variables Reference

### Core Configuration
```bash
# Application
NODE_ENV=development|staging|production
PORT=3001
HOST=localhost

# Application Metadata
VITE_APP_NAME=OncoVista
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
```

### Database Configuration (Supabase)
```bash
# Supabase Project Settings
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here

# Database Connection
DATABASE_URL=postgresql://postgres:password@db.project-ref.supabase.co:5432/postgres
```

### Security Settings
```bash
# JWT Configuration
JWT_SECRET=your-secure-random-string-min-32-chars
JWT_EXPIRES_IN=7d

# Password Hashing
BCRYPT_ROUNDS=10

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### API & Client Configuration
```bash
# API Settings
VITE_API_BASE_URL=http://localhost:3001/api

# Client Features
VITE_ENABLE_MEDICAL_IMAGING=true
VITE_ENABLE_ADVANCED_ANALYTICS=true
VITE_ENABLE_EXPORT_FEATURES=true
```

### File Upload & Storage
```bash
# Local File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# Supabase Storage (optional)
SUPABASE_STORAGE_BUCKET=uploads
```

### Rate Limiting & Performance
```bash
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
LOG_LEVEL=info
```

## 🔄 Environment Setup Process

### 1. Development Environment

```bash
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env

# Verify configuration
npm run env:check
```

### 2. Supabase Setup

1. **Create Project**: Go to [supabase.com](https://supabase.com)
2. **Get Credentials**: Settings → API
3. **Configure Database**: Run `npm run db:push`
4. **Test Connection**: `npm run db:test`

### 3. Staging Environment

```bash
# Create staging environment
cp .env.production .env.staging

# Update with staging Supabase project
# Deploy to Netlify with staging environment
```

### 4. Production Environment

```bash
# Configure production variables in Netlify
# Settings → Environment Variables

# Required for Netlify deployment:
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-anon-key
DATABASE_URL=your-prod-database-url
```

## 🛡️ Security Best Practices

### Environment Variable Security

```bash
# ✅ Good practices:
# - Use strong, random JWT secrets (32+ characters)
# - Different Supabase projects for staging/production
# - Rotate API keys regularly
# - Never commit .env files

# ❌ Avoid:
# - Hardcoding secrets in code
# - Using same keys across environments
# - Sharing environment files
# - Default or weak passwords
```

### Supabase Security

1. **Row Level Security (RLS)**: Enable on all tables
2. **API Keys**: Use anon key for client, service key for server only
3. **Authentication**: Configure proper redirect URLs
4. **Database**: Set up proper user roles and permissions

## 🔍 Environment Validation

### Quick Validation Script

```bash
# Run environment validation
npm run env:validate

# Check specific environment
npm run env:check:dev
npm run env:check:prod
```

### Manual Validation Checklist

#### Development Environment
- [ ] Node.js v18+ installed
- [ ] npm v8+ installed
- [ ] `.env` file exists and configured
- [ ] Supabase project created
- [ ] Database schema pushed
- [ ] Frontend starts on port 5173
- [ ] Backend starts on port 3001
- [ ] API calls work correctly

#### Production Environment
- [ ] Netlify account connected
- [ ] Production Supabase project
- [ ] Environment variables set in Netlify
- [ ] Build completes successfully
- [ ] Deployment works
- [ ] DNS configured (if custom domain)

## 🔧 Environment-Specific Scripts

```bash
# Development
npm run dev           # Start development servers
npm run dev:server    # Backend only
npm run dev:client    # Frontend only

# Building
npm run build         # Production build
npm run build:dev     # Development build
npm run preview       # Preview production build

# Database
npm run db:push       # Push schema changes
npm run db:studio     # Open database GUI
npm run db:seed       # Seed with sample data

# Testing
npm run test          # Run tests
npm run test:e2e      # End-to-end tests
npm run lint          # Code linting
```

## 🔄 Environment Migration

### From Development to Staging

```bash
# 1. Create staging Supabase project
# 2. Copy production schema
npm run db:push --env=staging

# 3. Update staging environment variables
# 4. Deploy to Netlify preview
```

### From Staging to Production

```bash
# 1. Verify staging tests pass
npm run test:staging

# 2. Update production environment
# 3. Deploy to production
# 4. Run production health checks
npm run health:prod
```

## 🎯 Environment-Specific Features

### Development Features
- Hot module reloading
- Debug logging
- Development database seeding
- Error stack traces
- Source maps

### Production Features  
- Optimized builds
- Error tracking
- Performance monitoring
- CDN optimization
- Compression

## 📊 Monitoring & Debugging

### Environment Health Checks

```bash
# Development
curl http://localhost:3001/health

# Production
curl https://your-app.netlify.app/.netlify/functions/api/health
```

### Debug Environment Issues

```bash
# Check environment variables
npm run env:debug

# Validate configuration
npm run config:validate

# Test database connection
npm run db:test-connection
```

## 🔗 Useful Resources

- [Supabase Environment Variables](https://supabase.com/docs/guides/getting-started/local-development)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Note**: Always keep your environment files secure and never commit them to version control.

**Last Updated**: January 2025
