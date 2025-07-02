# OncoVista - Netlify Deployment Guide

This guide provides comprehensive instructions for deploying OncoVista to Netlify with Supabase backend.

## 📋 Prerequisites

Before deployment, ensure you have:

- **GitHub repository** with OncoVista code
- **Netlify account** - [Sign up at netlify.com](https://netlify.com/)
- **Supabase project** with production database
- **Environment variables** configured
- **API keys** for AI services (optional)

## 🚀 Deployment Methods

### Method 1: GitHub Integration (Recommended)

#### 1. Connect GitHub Repository

1. **Login to Netlify** dashboard
2. Click **"New site from Git"**
3. Choose **GitHub** as provider
4. **Authorize Netlify** to access your repositories
5. **Select repository**: `wahidmansoor/mwov`

#### 2. Configure Build Settings

```yaml
# Build settings
Build command: npm run build
Publish directory: dist/public
Functions directory: netlify/functions

# Advanced settings
Base directory: (leave empty)
Environment: Node.js 18.x
```

#### 3. Environment Variables

In Netlify dashboard, go to **Site settings** → **Environment variables**:

```bash
# Database Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=postgresql://postgres:password@db.project-id.supabase.co:5432/postgres

# Application Settings
NODE_ENV=production
SESSION_SECRET=your-secure-random-string-for-production

# AI Services (Optional)
OPENAI_API_KEY=sk-your-openai-api-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-production-email@domain.com
SMTP_PASS=your-production-app-password
```

#### 4. Deploy

Click **"Deploy site"** and wait for the build to complete (typically 2-5 minutes).

### Method 2: Netlify CLI

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli

# Login to Netlify
netlify login
```

#### 2. Initialize Site

```bash
# In your project directory
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: oncovista (or your preferred name)
```

#### 3. Configure Environment

```bash
# Set environment variables via CLI
netlify env:set SUPABASE_URL "https://your-project-id.supabase.co"
netlify env:set SUPABASE_ANON_KEY "your-supabase-anon-key"
netlify env:set NODE_ENV "production"
netlify env:set SESSION_SECRET "your-secure-session-secret"

# Add additional variables as needed
```

#### 4. Deploy

```bash
# Build and deploy
npm run build
netlify deploy --prod --dir=dist/public
```

## 🗄️ Supabase Production Setup

### 1. Production Database

#### Create Production Project
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a **new project** for production
3. Choose a **strong password**
4. Select **region** closest to your users

#### Configure Database Schema
```bash
# From your local environment
npm run db:push

# This will create all tables and relationships in Supabase
```

### 2. Row Level Security (RLS)

Enable RLS for data protection:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_support_inputs ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables

-- Create policies (example for users table)
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id);
```

### 3. Authentication Configuration

In Supabase dashboard:

1. Go to **Authentication** → **Settings**
2. Configure **Site URL**: `https://your-app.netlify.app`
3. Add **Redirect URLs**:
   - `https://your-app.netlify.app/auth/callback`
   - `https://your-app.netlify.app/dashboard`

## ⚙️ Netlify Configuration

### netlify.toml Configuration

The project includes a `netlify.toml` file with optimized settings:

```toml
[build]
  publish = "dist/public"
  command = "npm run build"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "8"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Serverless Functions

The app uses Netlify Functions for backend API:

```javascript
// netlify/functions/api.js
import express from 'express';
import serverless from 'serverless-http';
import { registerRoutes } from '../../server/routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all routes
registerRoutes(app);

export const handler = serverless(app);
```

## 🔄 Continuous Deployment

### Automatic Deployment

Once connected to GitHub, Netlify automatically deploys when:

- **Push to main branch**: Triggers production deployment
- **Pull request**: Creates deploy preview
- **Push to other branches**: Creates branch deploy (if configured)

### Branch Deployments

Configure branch deployments in Netlify:

1. Go to **Site settings** → **Build & deploy** → **Deploy contexts**
2. Set **Production branch**: `main`
3. Set **Branch deploys**: `All branches` or specific branches
4. **Deploy previews**: `Any pull request`

### Deploy Hooks

Create deploy hooks for external triggers:

1. Go to **Site settings** → **Build & deploy** → **Build hooks**
2. Click **Add build hook**
3. Name it (e.g., "Manual Deploy")
4. Use the webhook URL to trigger deployments

```bash
# Trigger deployment via webhook
curl -X POST -d '{}' https://api.netlify.com/build_hooks/your-hook-id
```

## 📊 Monitoring and Analytics

### Netlify Analytics

Enable Netlify Analytics:

1. Go to **Site overview** → **Analytics**
2. Subscribe to **Netlify Analytics** (paid feature)
3. View traffic, performance, and conversion data

### Error Tracking

Configure error monitoring:

```javascript
// In your React app
if (process.env.NODE_ENV === 'production') {
  // Configure error tracking service
  // e.g., Sentry, LogRocket, etc.
}
```

### Performance Monitoring

The app includes performance optimizations:

- **Code splitting** via React.lazy()
- **Image optimization** for assets
- **CDN delivery** via Netlify Edge
- **Gzip compression** enabled
- **Cache headers** configured

## 🔒 Security Configuration

### HTTPS and SSL

Netlify provides automatic HTTPS:

1. **SSL certificate** automatically provisioned
2. **HTTP to HTTPS** redirect enabled
3. **HSTS headers** configured in netlify.toml

### Environment Security

Protect sensitive data:

```bash
# Use strong session secrets
SESSION_SECRET=$(openssl rand -base64 32)

# Rotate API keys regularly
# Store secrets securely in Netlify dashboard only
```

### Content Security Policy

Configure CSP headers:

```toml
# In netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://your-domain.com; style-src 'self' 'unsafe-inline'"
```

## 🎯 Domain Configuration

### Custom Domain

To use a custom domain:

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain name
4. Configure DNS records:

```
Type: CNAME
Name: www
Value: your-site.netlify.app

Type: A (or ALIAS/ANAME)
Name: @
Value: 75.2.60.5 (Netlify's load balancer)
```

### SSL Certificate

For custom domains:

1. **Automatic SSL**: Netlify provides free Let's Encrypt certificates
2. **External SSL**: Upload your own certificate if needed
3. **Verification**: May take 24-48 hours for DNS propagation

## 🚀 Performance Optimization

### Build Optimization

```bash
# Build settings for optimal performance
npm run build

# The build process:
# 1. TypeScript compilation
# 2. Vite bundling and minification
# 3. Asset optimization
# 4. Code splitting
```

### CDN and Caching

Netlify's CDN automatically:

- **Distributes assets** globally
- **Caches static files** at edge locations
- **Compresses** content (gzip/brotli)
- **Optimizes images** (if enabled)

### Bundle Analysis

Check bundle size:

```bash
# Analyze bundle
npx vite-bundle-analyzer dist

# Check for large dependencies
npm run build --report
```

## 🧪 Testing Deployment

### Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Database schema deployed to Supabase
- [ ] All secrets properly set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Error tracking enabled

### Deployment Testing

```bash
# Test build locally
npm run build
npm run preview

# Test API endpoints
curl https://your-app.netlify.app/api/health

# Test database connection
# (through application UI)
```

### Post-deployment Verification

1. **Application loads** correctly
2. **Authentication works** properly
3. **Database operations** function
4. **API endpoints** respond
5. **Static assets** load from CDN
6. **SSL certificate** active
7. **Performance metrics** acceptable

## 🛠️ Deployment Troubleshooting

### Common Build Issues

#### Node.js Version Mismatch
```bash
# In netlify.toml
[build.environment]
  NODE_VERSION = "18"
```

#### Missing Dependencies
```bash
# Check package.json dependencies
# Ensure all required packages are in dependencies, not devDependencies
```

#### Environment Variable Issues
```bash
# Verify all required variables are set in Netlify dashboard
# Check for typos in variable names
# Ensure values don't have extra spaces or quotes
```

### Runtime Issues

#### Database Connection Errors
```bash
# Verify Supabase URL and key
# Check database schema is deployed
# Ensure RLS policies are configured correctly
```

#### Function Timeout
```bash
# Netlify functions have 10-second timeout
# Optimize database queries
# Implement proper error handling
```

#### Memory Limits
```bash
# Netlify functions have 1GB memory limit
# Optimize data processing
# Use streaming for large datasets
```

### Performance Issues

#### Slow Loading
```bash
# Check bundle size: npm run build --report
# Implement code splitting
# Optimize images and assets
# Enable Netlify's asset optimization
```

#### API Latency
```bash
# Optimize database queries
# Implement caching strategies
# Use connection pooling
# Consider edge functions for better performance
```

## 📞 Support and Resources

### Netlify Resources
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://community.netlify.com/)
- [Netlify Status](https://netlifystatus.com/)

### Supabase Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://supabase.com/community)
- [Supabase Status](https://status.supabase.com/)

### Getting Help
- **GitHub Issues**: Report bugs or ask questions
- **Documentation**: Check project docs folder
- **Community**: Join development discussions

---

**Congratulations!** 🎉 Your OncoVista application should now be live on Netlify!

🌐 **Live URL**: `https://your-app.netlify.app`  
📊 **Netlify Dashboard**: Monitor deployments and performance  
🗄️ **Supabase Dashboard**: Manage database and authentication
