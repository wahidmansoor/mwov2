# OncoVista - Local Development Setup

This guide will help you set up OncoVista for local development on your machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download from git-scm.com](https://git-scm.com/)
- **Supabase Account** - [Sign up at supabase.com](https://supabase.com/)

### Verify Prerequisites

```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 8.0.0 or higher
git --version     # Any recent version
```

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/wahidmansoor/mwov.git
cd mwov

# Or if you have SSH set up
git clone git@github.com:wahidmansoor/mwov.git
cd mwov
```

### 2. Install Dependencies

```bash
# Install all dependencies (root, client, and server)
npm install

# If you encounter permission issues, try:
sudo npm install
```

### 3. Environment Configuration

Create your local environment file:

```bash
# Copy the example environment file
cp .env.example .env

# Edit the environment file
nano .env
# or use your preferred editor: code .env, vim .env, etc.
```

Configure your `.env` file with the following variables:

```bash
# Database Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres

# Application Settings
NODE_ENV=development
SESSION_SECRET=your-random-session-secret-string

# AI Services (Optional - for AI features)
OPENAI_API_KEY=sk-your-openai-api-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Supabase Setup

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com/)
2. Click "Start your project"
3. Create a new project
4. Wait for the project to be ready (1-2 minutes)

#### Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Update your `.env` file with these values

#### Database Schema Setup

```bash
# Push the database schema to Supabase
npm run db:push

# This will create all necessary tables and relationships
```

### 5. Start Development Servers

OncoVista uses a full-stack development setup:

```bash
# Start the development server (runs both client and server)
npm run dev

# This will start:
# - Frontend (React) on http://localhost:5173
# - Backend (Express) on http://localhost:3000
```

## 🌐 Accessing the Application

Once the development server is running:

1. **Open your browser** to `http://localhost:5173`
2. **First-time setup**: The app will guide you through initial configuration
3. **Authentication**: Use the local development authentication

### Development URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Supabase Dashboard**: https://app.supabase.com/projects/your-project-id

## 🔧 Development Tools

### Available NPM Scripts

```bash
npm run dev          # Start development server
npm run build        # Build production version
npm run start        # Start production server (after build)
npm run check        # TypeScript type checking
npm run db:push      # Push database schema changes
```

### Database Operations

```bash
# Push schema changes to Supabase
npm run db:push

# Generate database types (if configured)
npm run db:generate

# Check database connection
node -e "console.log('Testing DB connection...')" && npm run db:push
```

### Code Quality Tools

```bash
# Type checking
npm run check

# Build verification
npm run build

# Check for common issues
npm run lint    # (if configured)
```

## 🗂️ Project Structure for Development

```
mwov/
├── 📁 client/                  # Frontend React application
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 modules/         # Feature modules
│   │   │   ├── 📁 opd/         # OPD module
│   │   │   ├── 📁 cdu/         # CDU module
│   │   │   ├── 📁 inpatient/   # Inpatient module
│   │   │   └── 📁 palliative/  # Palliative care module
│   │   ├── 📁 pages/           # Application pages
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 services/        # API services
│   │   └── 📁 stores/          # Zustand stores
│   └── 📄 index.html           # Entry HTML file
├── 📁 server/                  # Backend Express application
│   ├── 📁 routes/              # API routes
│   ├── 📁 services/            # Business logic
│   ├── 📁 middleware/          # Express middleware
│   └── 📄 index.ts             # Server entry point
├── 📁 shared/                  # Shared TypeScript types
│   └── 📄 schema.ts            # Database schema
├── 📁 docs/                    # Documentation
└── 📄 .env                     # Environment variables
```

## 🔍 Development Features

### Hot Reload

- **Frontend**: Vite provides instant hot reload for React components
- **Backend**: tsx provides automatic restart on server changes
- **Database**: Drizzle ORM with type-safe queries

### Developer Experience

- **TypeScript**: Full type safety across the stack
- **ESLint**: Code quality and consistency (if configured)
- **Prettier**: Code formatting (if configured)
- **React DevTools**: Browser extension for React debugging

### Local Authentication

For local development, the app uses a simplified authentication system:

1. **Development Mode**: Automatic authentication bypass
2. **Test Users**: Pre-configured test users for different roles
3. **Session Management**: Simplified session handling

## 🎯 Development Workflow

### 1. Feature Development

```bash
# Create a feature branch
git checkout -b feature/new-feature

# Make your changes
# ...

# Test your changes
npm run check      # Type checking
npm run build      # Build verification

# Commit and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

### 2. Database Changes

```bash
# Modify shared/schema.ts
# ...

# Push changes to Supabase
npm run db:push

# Verify changes in Supabase dashboard
```

### 3. API Development

```bash
# Add new routes in server/routes.ts
# ...

# Test API endpoints
curl http://localhost:3000/api/your-endpoint

# Or use a tool like Postman or Insomnia
```

## 📊 Monitoring and Debugging

### Development Logs

The development server provides detailed logging:

```bash
# Frontend logs appear in browser console
# Backend logs appear in terminal

# For more verbose logging, set:
DEBUG=* npm run dev
```

### Database Debugging

```bash
# Check database connection
npm run db:push

# Monitor database queries (in development)
# Check browser Network tab for API calls
```

### Common Development Tasks

```bash
# Reset local database
npm run db:push

# Clear npm cache (if having issues)
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated
```

## 🆘 Troubleshooting

### Common Issues

#### Node.js Version Issues
```bash
# Check Node version
node --version

# Use Node Version Manager (nvm) to switch versions
nvm install 18
nvm use 18
```

#### Database Connection Issues
```bash
# Verify Supabase credentials in .env
# Check Supabase project status
# Ensure database URL is correct format
```

#### Port Conflicts
```bash
# If ports 3000 or 5173 are busy
# Kill existing processes
lsof -ti:3000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

#### Build Errors
```bash
# Clear build cache
rm -rf dist
npm run build

# Check for TypeScript errors
npm run check
```

For more detailed troubleshooting, see [docs/troubleshooting.md](./docs/troubleshooting.md).

## 🎓 Next Steps

After successful setup:

1. **Explore the codebase**: Start with `client/src/App.tsx`
2. **Check the modules**: Review different clinical modules
3. **API documentation**: Explore `server/routes.ts`
4. **Database schema**: Study `shared/schema.ts`
5. **Contributing**: Read the main README for contribution guidelines

## 📞 Getting Help

- **Documentation**: Check the [docs/](./docs/) folder
- **GitHub Issues**: Open an issue for bugs or questions
- **Discord/Slack**: Join our development community (if available)

---

**Happy Coding!** 🚀

Need help? Check [troubleshooting.md](./docs/troubleshooting.md) or open a GitHub issue.
