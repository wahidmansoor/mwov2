# Troubleshooting Guide

This guide helps you resolve common issues when setting up and running OncoVista.

## 🔧 Installation Issues

### Node.js Version Problems
```bash
# Check your Node.js version
node --version

# Should be v18.0.0 or higher
# If not, install the latest LTS version from nodejs.org
```

### npm Installation Failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🗄️ Database Issues

### Supabase Connection Problems
1. **Check your environment variables**:
   ```bash
   # Verify your .env file has correct values
   cat .env | grep SUPABASE
   ```

2. **Test connection**:
   ```bash
   npm run db:test-connection
   ```

3. **Common connection errors**:
   - ❌ `connection timeout` → Check your internet connection
   - ❌ `invalid credentials` → Verify SUPABASE_URL and keys
   - ❌ `database does not exist` → Run `npm run db:push`

### Schema Migration Issues
```bash
# Reset and regenerate schema
npm run db:drop
npm run db:push

# If that fails, manually reset in Supabase dashboard
```

## 🌐 Development Server Issues

### Port Already in Use
```bash
# Find what's using the port
lsof -i :3001
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use different ports in .env
PORT=3002
VITE_PORT=5174
```

### CORS Errors
- Check that `CORS_ORIGIN` in `.env` matches your frontend URL
- Ensure `VITE_API_BASE_URL` points to correct backend URL

### API Connection Issues
```bash
# Test backend health
curl http://localhost:3001/health

# Test API endpoint
curl http://localhost:3001/api/health
```

## 🔑 Authentication Issues

### JWT Token Problems
```bash
# Clear browser storage
# In browser console:
localStorage.clear()
sessionStorage.clear()
```

### Supabase Auth Issues
1. Check Supabase dashboard → Authentication → Settings
2. Verify redirect URLs are configured
3. Check RLS policies in database

## 🏗️ Build Issues

### TypeScript Errors
```bash
# Clear TypeScript cache
npx tsc --build --clean

# Regenerate types
npm run build:types
```

### Vite Build Failures
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Import Path Issues
- Use relative imports: `./components/...`
- Check case sensitivity in filenames
- Verify all dependencies are installed

## 🚀 Deployment Issues

### Netlify Build Failures
1. **Check build logs** in Netlify dashboard
2. **Verify environment variables** are set in Netlify
3. **Check build command**: should be `npm run build`
4. **Publish directory**: should be `client/dist`

### Environment Variable Problems
```bash
# Test locally with production env
cp .env.production .env
npm run build
npm run preview
```

## 📱 Performance Issues

### Slow Database Queries
1. Check Supabase dashboard → Performance
2. Add database indexes if needed
3. Optimize queries with proper `select()` statements

### Large Bundle Size
```bash
# Analyze bundle
npm run build:analyze

# Check for large dependencies
npx bundle-analyzer client/dist
```

## 🔍 Debug Mode

### Enable Debug Logging
```bash
# In .env file
LOG_LEVEL=debug
NODE_ENV=development

# Restart the server
npm run dev:server
```

### Browser Debug Tools
1. Open DevTools (F12)
2. Check Console for errors
3. Network tab for API calls
4. Application tab for storage

## 🆘 Getting Help

### Check System Status
```bash
# Run the setup verification
./setup-check.sh
```

### Log Files
- Server logs: Check terminal output
- Browser logs: DevTools Console
- Supabase logs: Dashboard → Logs

### Common Solutions
1. **Restart everything**: `npm run dev`
2. **Clear all caches**: `npm cache clean --force`
3. **Reinstall dependencies**: `rm -rf node_modules && npm install`
4. **Check environment**: Compare `.env` with `.env.example`

### Still Need Help?
1. Check the [GitHub Issues](https://github.com/wahidmansoor/mwov/issues)
2. Review the [Documentation](../README.md)
3. Contact the development team

---

## Quick Fixes Checklist

- [ ] Node.js v18+ installed
- [ ] All environment variables set
- [ ] Supabase project created and configured
- [ ] Database schema pushed
- [ ] No port conflicts
- [ ] Internet connection stable
- [ ] Browser cache cleared
- [ ] npm dependencies installed

**Last Updated**: January 2025
