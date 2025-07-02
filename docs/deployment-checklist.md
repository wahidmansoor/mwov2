# Deployment Checklist

Use this checklist to ensure successful deployment of OncoVista to Netlify.

## 📋 Pre-Deployment Checklist

### 🔧 Development Environment
- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] API endpoints responding correctly
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Build process completes successfully

### 🗄️ Database Preparation
- [ ] Supabase production project created
- [ ] Database schema pushed to production
- [ ] RLS policies configured and tested
- [ ] Sample data seeded (if needed)
- [ ] Database backups configured
- [ ] Connection limits configured

### 🔑 Security Verification
- [ ] Environment variables do not contain secrets in client code
- [ ] API keys are production-ready (not test keys)
- [ ] CORS origins configured for production domain
- [ ] Authentication flows tested
- [ ] File upload security configured
- [ ] Rate limiting enabled

## 🚀 Netlify Deployment Steps

### 1. Repository Setup
```bash
# Ensure code is committed and pushed
git add .
git commit -m "Production ready"
git push origin main
```

### 2. Netlify Project Creation
- [ ] Login to [Netlify](https://netlify.com)
- [ ] Click "New site from Git"
- [ ] Connect GitHub repository
- [ ] Select `main` branch
- [ ] Configure build settings:
  - **Build command**: `npm run build`
  - **Publish directory**: `client/dist`
  - **Functions directory**: `netlify/functions`

### 3. Environment Variables Configuration
In Netlify Dashboard → Site Settings → Environment Variables:

```bash
# Core Configuration
NODE_ENV=production
VITE_APP_NAME=OncoVista
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production

# Supabase Configuration
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_KEY=your-production-service-key
DATABASE_URL=your-production-database-url

# API Configuration
VITE_API_BASE_URL=https://your-site.netlify.app/.netlify/functions/api

# Security
JWT_SECRET=your-production-jwt-secret-32-chars-minimum
CORS_ORIGIN=https://your-site.netlify.app

# Features
VITE_ENABLE_MEDICAL_IMAGING=true
VITE_ENABLE_ADVANCED_ANALYTICS=true
VITE_ENABLE_EXPORT_FEATURES=true
```

### 4. Build Configuration Verification
- [ ] `netlify.toml` file in root directory
- [ ] Build command specified correctly
- [ ] Functions configuration correct
- [ ] Headers and redirects configured
- [ ] Build environment specified

### 5. Initial Deployment
- [ ] Trigger first deploy
- [ ] Monitor build logs for errors
- [ ] Verify deployment successful
- [ ] Test site accessibility

## ✅ Post-Deployment Verification

### 🌐 Site Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] API endpoints accessible
- [ ] Database connections working
- [ ] Authentication flow functional
- [ ] File uploads working (if applicable)

### 🔍 Health Checks
```bash
# Test homepage
curl -I https://your-site.netlify.app

# Test API health
curl https://your-site.netlify.app/.netlify/functions/api/health

# Test database connection
curl https://your-site.netlify.app/.netlify/functions/api/db/health
```

### 🎨 Frontend Verification
- [ ] All pages load without errors
- [ ] Responsive design works on mobile
- [ ] Images and assets load correctly
- [ ] CSS styling applied correctly
- [ ] JavaScript functionality works
- [ ] No console errors

### 🔗 API Verification
- [ ] All API endpoints respond
- [ ] Authentication endpoints work
- [ ] Database queries execute
- [ ] CORS headers correct
- [ ] Error handling works
- [ ] Rate limiting active

### 🔐 Security Testing
- [ ] HTTPS redirect working
- [ ] Security headers present
- [ ] API keys not exposed in client
- [ ] Authentication required where needed
- [ ] Input validation working
- [ ] No sensitive data in logs

## 🎯 Domain Configuration (Optional)

### Custom Domain Setup
- [ ] Domain purchased and configured
- [ ] DNS settings updated
- [ ] HTTPS certificate provisioned
- [ ] Domain redirects configured
- [ ] Environment variables updated with new domain

### DNS Configuration
```
Type: CNAME
Name: your-domain.com
Value: your-site.netlify.app
```

## 📊 Performance Optimization

### Site Performance
- [ ] Build size optimized (< 5MB)
- [ ] Images optimized and compressed
- [ ] Code splitting implemented
- [ ] Lazy loading configured
- [ ] CDN caching enabled

### Monitoring Setup
- [ ] Error tracking configured (optional)
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured
- [ ] Analytics installed (optional)

## 🔄 Continuous Deployment

### Auto-Deploy Configuration
- [ ] GitHub integration configured
- [ ] Auto-deploy from `main` branch enabled
- [ ] Build notifications set up
- [ ] Preview deploys configured for PRs

### Branch Protection
- [ ] Main branch protection enabled
- [ ] Required status checks configured
- [ ] Deploy previews working
- [ ] Rollback strategy documented

## 🆘 Troubleshooting Deployment Issues

### Common Build Errors
- **Node version**: Ensure Netlify uses Node 18+
- **Missing dependencies**: Check package.json
- **Environment variables**: Verify all required vars set
- **Build timeout**: Optimize build process

### Runtime Errors
- **API not found**: Check functions deployment
- **Database connection**: Verify Supabase configuration
- **CORS errors**: Update origin settings
- **Authentication issues**: Check redirect URLs

### Performance Issues
- **Slow loading**: Check bundle size and optimization
- **API timeouts**: Verify database performance
- **Memory issues**: Check function memory settings

## 📋 Final Production Checklist

- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance audit passed
- [ ] Documentation updated
- [ ] Team notified of deployment
- [ ] Backup and rollback plan ready
- [ ] Monitoring alerts configured
- [ ] User acceptance testing completed

## 🔄 Post-Deployment Tasks

### Immediate (Within 1 hour)
- [ ] Verify core functionality
- [ ] Check error logs
- [ ] Test critical user flows
- [ ] Monitor performance metrics

### Short-term (Within 24 hours)
- [ ] Monitor user feedback
- [ ] Check analytics data
- [ ] Verify all integrations
- [ ] Update documentation

### Long-term (Within 1 week)
- [ ] Performance optimization
- [ ] User feedback analysis
- [ ] Security review
- [ ] Backup verification

---

## 📞 Emergency Contacts

- **Technical Issues**: Check GitHub Issues
- **Netlify Support**: [Netlify Support](https://netlify.com/support)
- **Supabase Support**: [Supabase Support](https://supabase.com/support)

## 🔗 Useful Links

- [Netlify Documentation](https://docs.netlify.com)
- [Deployment Guide](../DEPLOYMENT-GUIDE.md)
- [Troubleshooting Guide](./troubleshooting.md)

**Last Updated**: January 2025
