# 🚀 Supabase Setup Guide for OncoVista

## 📋 Prerequisites
- Supabase account (sign up at https://supabase.com)
- Your localhost-setup project ready

## 🔧 Step-by-Step Supabase Setup

### 1. Create New Supabase Project

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Click "New Project"**
3. **Fill in project details**:
   - Project Name: `oncovista-app`
   - Database Password: Generate a strong password (save it!)
   - Region: Choose closest to your users
   - Plan: Start with Free tier

### 2. Get Your Project Credentials

Once your project is created (takes ~2 minutes), go to:
- **Settings** → **API** 

Copy these values:
- **Project URL**: `https://your-project-ref.supabase.co`
- **Anon/Public Key**: `eyJhbGc...` (starts with eyJ)
- **Service Role Key**: `eyJhbGc...` (different from anon key)

### 3. Get Database Connection String

Go to **Settings** → **Database** and copy:
- **Connection String**: `postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres`

### 4. Configure Authentication (Optional)

If you want user authentication:
- Go to **Authentication** → **Settings**
- Configure your preferred providers (Email, Google, GitHub, etc.)

## 🔑 Environment Variables

You'll need these variables for your project:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres

# Keep these for backend
JWT_SECRET=your-jwt-secret-for-custom-auth
```

## 📝 Quick Checklist

- [ ] Supabase project created
- [ ] Project URL copied
- [ ] Anon key copied  
- [ ] Service key copied
- [ ] Database connection string copied
- [ ] Environment variables ready

## 🔄 Next Steps

Once you have your Supabase credentials:
1. Update your environment variables
2. Run the database migration
3. Test the connection
4. Deploy your schema

---

**Ready?** Once you have your Supabase credentials, I'll help you integrate them into the project!
