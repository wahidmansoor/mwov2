# 🚀 OncoVista Deployment Guide (Supabase + Netlify)

## 🎯 Quick Deployment Checklist

### Step 1: Supabase Setup (5-10 minutes)

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com
   # Click "Start your project"
   # Create new organization (if needed)
   # Create new project
   ```

2. **Get Your Credentials**
   ```bash
   # In your Supabase dashboard:
   # Go to Settings > API
   # Copy these values:
   PROJECT_URL=https://your-project-ref.supabase.co
   ANON_KEY=your-anon-key-here
   SERVICE_ROLE_KEY=your-service-key-here (keep secret!)
   ```

3. **Set Up Database Schema**
   ```sql
   -- Run in Supabase SQL Editor
   -- Use the schema from supabase/migrations/ folder
   -- Or manually create tables for patients, treatments, etc.
   ```

### Step 2: Local Environment Update (2 minutes)

Update your `.env` file with real Supabase credentials:

```env
# Replace placeholder values with your actual Supabase credentials
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here
```

### Step 3: Netlify Setup (5-10 minutes)

1. **Create Netlify Site**
   ```bash
   # Option A: Through Netlify Dashboard
   # 1. Go to https://netlify.com
   # 2. Click "Add new site" > "Import an existing project"
   # 3. Connect your Git repository
   # 4. Configure build settings:
   #    - Build command: cd client && npm run build
   #    - Publish directory: client/dist
   #    - Functions directory: netlify/functions
   
   # Option B: Using Netlify CLI
   npm install -g netlify-cli
   netlify login
   netlify init
   ```

2. **Set Environment Variables in Netlify**
   ```bash
   # In Netlify Dashboard:
   # Site Settings > Environment Variables > Add Variable
   
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_KEY=your-service-key-here
   VITE_ENVIRONMENT=production
   NODE_ENV=production
   ```

### Step 4: Deploy (2 minutes)

```bash
# Push to your repository main branch
git add .
git commit -m "Deploy OncoVista with Supabase + Netlify"
git push origin main

# Netlify will automatically build and deploy
# Check deployment status in Netlify dashboard
```

## 🔧 Detailed Setup Instructions

### Supabase Database Schema

Create these tables in your Supabase project:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Patients table
CREATE TABLE patients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Diagnoses table
CREATE TABLE diagnoses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    diagnosis_code VARCHAR(20),
    diagnosis_name VARCHAR(255) NOT NULL,
    stage VARCHAR(50),
    grade VARCHAR(50),
    diagnosis_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Treatments table
CREATE TABLE treatments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    diagnosis_id UUID REFERENCES diagnoses(id) ON DELETE SET NULL,
    treatment_type VARCHAR(255) NOT NULL,
    treatment_name VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    dosage VARCHAR(255),
    frequency VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth requirements)
CREATE POLICY "Enable read access for authenticated users" ON patients
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON diagnoses
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON treatments
    FOR SELECT USING (auth.role() = 'authenticated');
```

### Authentication Setup (Optional)

If you want user authentication:

```sql
-- In Supabase dashboard: Authentication > Settings
-- Configure providers (Email, Google, etc.)
-- Set up email templates
-- Configure redirect URLs
```

### Environment Variables Reference

#### Development (.env)
```env
NODE_ENV=development
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
VITE_API_BASE_URL=http://localhost:3001/api
VITE_ENVIRONMENT=development
```

#### Production (Netlify Dashboard)
```env
NODE_ENV=production
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
VITE_API_BASE_URL=https://your-site.netlify.app/api
VITE_ENVIRONMENT=production
```

## 🧪 Testing Your Deployment

### 1. Local Testing
```bash
# Test with Supabase
npm run dev

# Test build process
npm run build
npm run preview
```

### 2. Production Testing
```bash
# Test Netlify functions locally
netlify dev

# Test production build
netlify build
```

### 3. Post-Deployment Verification

Visit your deployed site and verify:
- [ ] Site loads correctly
- [ ] API endpoints respond (`/api/health`)
- [ ] Database connection works
- [ ] Authentication flows (if enabled)
- [ ] All features function properly

## 🔧 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check Node version in Netlify
   # Ensure environment variables are set
   # Check build logs for specific errors
   ```

2. **API Functions Don't Work**
   ```bash
   # Verify functions directory in netlify.toml
   # Check environment variables in Netlify
   # Review function logs in Netlify dashboard
   ```

3. **Database Connection Issues**
   ```bash
   # Verify Supabase credentials
   # Check Row Level Security policies
   # Ensure database schema is created
   ```

4. **CORS Errors**
   ```bash
   # Add your Netlify domain to Supabase allowed origins
   # Check CORS_ORIGIN environment variable
   ```

### Debug Commands

```bash
# View Netlify logs
netlify logs

# Test function locally
netlify functions:invoke api --payload='{"path": "/health"}'

# Check environment
netlify env:list
```

## 📞 Support

If you encounter issues:
1. Check Netlify deploy logs
2. Review Supabase project logs
3. Use browser developer tools for client errors
4. Test API endpoints directly

## 🎉 Success!

Once deployed, your OncoVista application will be available at:
- **Frontend**: `https://your-site-name.netlify.app`
- **API**: `https://your-site-name.netlify.app/api`

Your application now features:
- ✅ Serverless architecture
- ✅ Global CDN distribution
- ✅ Managed PostgreSQL database
- ✅ Real-time capabilities
- ✅ Authentication ready
- ✅ Automatic scaling
- ✅ HTTPS by default
