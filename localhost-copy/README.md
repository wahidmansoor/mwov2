# OncoVista - Localhost Development Setup

## 🚀 Quick Start Guide

This is the localhost development version of OncoVista, configured for local development with PostgreSQL database support.

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **PostgreSQL** (v14 or higher) running locally, OR
- **Neon Database** account (recommended for easier setup)

### 📋 Setup Instructions

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Database Setup

**Option A: Local PostgreSQL (Traditional setup)**
```bash
# Install PostgreSQL if not already installed
# Create a new database
createdb oncovista_dev

# Update .env.local with your local database URL
DATABASE_URL=postgresql://username:password@localhost:5432/oncovista_dev
```

**Option B: Neon Database (Recommended)**
1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy your connection string
4. Update `.env.local` with your Neon database URL

#### 3. Environment Configuration

Copy and configure your environment variables:

```bash
# The .env.local file is already created, just update the values:
# - Set your DATABASE_URL
# - Add your API keys (OpenAI, Anthropic)
# - Set a random SESSION_SECRET (minimum 32 characters)
```

#### 4. Database Migration

```bash
# Generate and run database migrations
npm run db:generate
npm run db:push

# Optional: Seed the database with sample data
npm run db:seed
```

#### 5. Start Development Servers

```bash
# Start both frontend and backend in development mode
npm run dev

# This will start:
# - Backend API server on http://localhost:5000
# - Frontend development server on http://localhost:3000
```

### 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:server` - Start only the backend server
- `npm run dev:client` - Start only the frontend development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run db:generate` - Generate database migration files
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:seed` - Seed the database with sample data

### 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Database Studio**: http://localhost:4983 (when running `npm run db:studio`)

### 📁 Project Structure

```
localhost-copy/
├── client/                 # React frontend application
│   ├── src/               # Source code
│   ├── index.html         # HTML template
├── server/                # Express backend server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── vite.ts           # Vite development setup
├── shared/               # Shared TypeScript definitions
│   └── schema.ts         # Database schema
├── attached_assets/      # Static assets and data files
├── .env.local           # Environment variables
├── package.json         # Dependencies and scripts
├── drizzle.config.ts    # Database configuration
├── vite.config.ts       # Frontend build configuration
└── tailwind.config.ts   # Styling configuration
```

### 🔒 Authentication

The localhost version includes:
- Local development authentication (simplified)
- Session-based authentication
- Role-based access control (RBAC)
- User management system

### 💾 Database Features

- PostgreSQL with Drizzle ORM
- Automated migrations
- Type-safe database queries
- Database seeding scripts
- Drizzle Studio for database management

### 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npm run check

# Linting
npm run lint
npm run lint:fix
```

### 🚨 Troubleshooting

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Reset database
npm run db:push --force
```

#### Port Conflicts
```bash
# If ports 3000 or 5000 are in use, update:
# - server/index.ts (line with PORT)
# - vite.config.ts (server.port)
```

#### Module Resolution Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 📝 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | development |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `SESSION_SECRET` | Session encryption key | Yes | - |
| `OPENAI_API_KEY` | OpenAI API key for AI features | No | - |
| `ANTHROPIC_API_KEY` | Anthropic API key for AI features | No | - |
| `PORT` | Server port | No | 5000 |

### 🔄 Development Workflow

1. Make code changes in `client/src/` or `server/`
2. Changes are automatically reflected (hot reload)
3. API changes require server restart
4. Database schema changes require migration

### 🎯 Next Steps

After successful setup:
1. Access the application at http://localhost:3000
2. Check the API endpoints at http://localhost:5000/api
3. Use Drizzle Studio to explore the database
4. Start developing new features!

### 📞 Support

If you encounter issues:
1. Check the terminal output for error messages
2. Verify all environment variables are set
3. Ensure the database is accessible
4. Check that all required ports are available

Happy coding! 🎉
