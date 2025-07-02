# 🚀 Netlify Deployment Guide for OncoVista

## 📋 Prerequisites

1. **Supabase Project Setup**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Note your Project URL and API keys
   - Run the SQL schema from `supabase/schema.sql`

2. **Netlify Account**
   - Sign up at [netlify.com](https://netlify.com)
   - Install Netlify CLI: `npm install -g netlify-cli`

## 🔧 Environment Variables Setup

### Supabase Configuration

In your Supabase project dashboard:
1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-ref.supabase.co`)
   - **Anon public key** (starts with `eyJhbGc...`)
   - **Service role key** (starts with `eyJhbGc...`) - **Keep this secret!**

### Netlify Environment Variables

In your Netlify site dashboard:
1. Go to **Site Settings** → **Environment Variables**
2. Add the following variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# App Configuration
VITE_APP_NAME=OncoVista
VITE_ENVIRONMENT=production
VITE_ENABLE_MEDICAL_IMAGING=true
VITE_ENABLE_ADVANCED_ANALYTICS=true
VITE_ENABLE_EXPORT_FEATURES=true

# Security
CORS_ORIGIN=https://your-site-name.netlify.app
```

## 🌐 Deployment Methods

### Method 1: Git Integration (Recommended)

1. **Push to GitHub/GitLab**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/oncovista.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Choose your repository
   - Build settings should auto-detect from `netlify.toml`

### Method 2: Manual Deploy

1. **Build locally**:
   ```bash
   npm run build:netlify
   ```

2. **Deploy with CLI**:
   ```bash
   netlify login
   netlify deploy --build --prod
   ```

### Method 3: Drag & Drop

1. **Build locally**:
   ```bash
   npm run build:netlify
   ```

2. **Drag `client/dist` folder** to Netlify's deploy area

## 🔧 Build Configuration

The `netlify.toml` file configures:

- **Build Command**: `cd client && npm run build`
- **Publish Directory**: `client/dist`
- **Functions Directory**: `netlify/functions`
- **Redirects**: SPA routing + API proxying
- **Headers**: Security and performance optimizations

## 🛠️ Local Development with Netlify

Test the Netlify environment locally:

```bash
# Install dependencies
npm run install:all

# Start Netlify dev server
npm run netlify:dev
```

This will:
- Start your site on `http://localhost:8888`
- Proxy functions to `/.netlify/functions/*`
- Test environment variables and redirects

## 🔍 Testing the Deployment

1. **Health Check**: Visit `https://your-site.netlify.app`
2. **API Test**: Check the Supabase status indicator
3. **Authentication**: Test sign up/sign in functionality
4. **Database**: Verify data operations work

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check environment variables are set
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Supabase Connection Error**:
   - Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
   - Check RLS policies in Supabase
   - Ensure database schema is applied

3. **Functions Not Working**:
   - Check netlify/functions/package.json exists
   - Verify environment variables for functions
   - Check function logs in Netlify dashboard

4. **CORS Errors**:
   - Update CORS_ORIGIN environment variable
   - Check Supabase project CORS settings
   - Verify redirect rules in netlify.toml

### Build Settings Debug

If auto-detection fails, manually set in Netlify:
- **Build command**: `cd client && npm run build`
- **Publish directory**: `client/dist`
- **Functions directory**: `netlify/functions`

### Environment Variables Checklist

- [ ] VITE_SUPABASE_URL
- [ ] VITE_SUPABASE_ANON_KEY  
- [ ] SUPABASE_SERVICE_KEY
- [ ] VITE_APP_NAME
- [ ] VITE_ENVIRONMENT=production

## 🔐 Security Considerations

1. **Service Role Key**: Never expose in client code
2. **RLS Policies**: Ensure proper row-level security in Supabase
3. **CORS**: Restrict to your domain only
4. **Headers**: Security headers are configured in netlify.toml

## 📊 Performance Optimizations

The configuration includes:
- **Static asset caching**: 1 year for immutable assets
- **HTML caching**: No-cache for dynamic content
- **Compression**: Gzip enabled
- **CDN**: Global edge distribution
- **Bundle splitting**: Vendor and route-based chunks

## 🔄 Continuous Deployment

Once connected to Git:
1. Push commits trigger automatic deploys
2. Preview deploys for pull requests
3. Branch deploys for feature testing
4. Rollback capabilities

## 📈 Monitoring

Monitor your deployment:
- **Netlify Analytics**: Site performance and usage
- **Supabase Dashboard**: Database queries and auth
- **Netlify Functions**: Serverless function metrics
- **Real User Monitoring**: Core web vitals

---

**🎉 Your OncoVista app is now ready for production with Supabase + Netlify!**
