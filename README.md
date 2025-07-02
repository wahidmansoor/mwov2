# OncoVista - Comprehensive Oncology Application

<div align="center">

![OncoVista](https://img.shields.io/badge/OncoVista-Healthcare-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Supabase](https://img.shields.io/badge/Database-Supabase-success)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7)

</div>

OncoVista is a modern, comprehensive oncology application designed to assist healthcare professionals in cancer care management. Built with React, TypeScript, Node.js, and Supabase, it provides a robust platform for clinical decision support and patient care workflows.

## ✨ Features

- 🏥 **Clinical Decision Support** - Evidence-based treatment protocols
- � **Patient Management** - Comprehensive patient tracking and history
- 💊 **Medication Management** - Drug interactions and dosing guidelines
- 📋 **Treatment Planning** - Structured care plan development
- 🔬 **Laboratory Integration** - Test results and monitoring
- 📈 **Analytics & Reporting** - Clinical outcomes and quality metrics
- 🔐 **Secure & Compliant** - HIPAA-ready architecture
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher)
- **Supabase Account** (sign up at https://supabase.com)
- **Git** (for version control)

Check your versions:
```bash
node --version  # Should be 18.0.0+
npm --version   # Should be 8.0.0+
git --version   # Any recent version
```

## 🚀 Quick Start

### 1. Supabase Project Setup

1. **Create Supabase Project**:
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Fill in project details and wait for setup (~2 minutes)

2. **Get Your Credentials**:
   - Go to **Settings** → **API**
   - Copy your **Project URL** and **Anon Key**
   - Go to **Settings** → **Database**
   - Copy your **Connection String**

### 2. Environment Configuration

Copy the example environment file and add your Supabase credentials:

```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials:
```bash
# Replace with your actual Supabase values
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here
DATABASE_URL=postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres
```

### 3. Install Dependencies

Run the installation script to set up all dependencies:

```bash
npm run install:all
```

### 4. Setup Database

Run the Supabase setup script to create your database schema:

```bash
./setup-supabase.sh
```

### 5. Start Development

Start the full development environment:

```bash
npm run dev
```

This will start:
- **Backend server** on http://localhost:3001
- **Frontend client** on http://localhost:5173

## 📖 Documentation

OncoVista provides comprehensive documentation for developers and users:

### 🏠 Development Setup
- **[Local Development Setup](./README-LOCALHOST.md)** - Complete localhost installation guide
- **[Environment Setup Guide](./docs/environment-setup.md)** - Detailed environment configuration
- **[Supabase Setup Guide](./SUPABASE-SETUP-GUIDE.md)** - Database setup instructions

### 🚀 Deployment Guides  
- **[Deployment Guide](./DEPLOYMENT-GUIDE.md)** - Netlify deployment instructions
- **[Deployment Checklist](./docs/deployment-checklist.md)** - Pre-deployment verification steps
- **[Netlify Deployment Guide](./NETLIFY-DEPLOYMENT.md)** - Step-by-step Netlify setup

### 📋 Project Information
- **[Migration Roadmap](./MIGRATION_ROADMAP.md)** - Project migration documentation
- **[Contributing Guidelines](./CONTRIBUTING.md)** - How to contribute to the project
- **[License](./LICENSE)** - MIT License with medical disclaimers

### 🔧 Troubleshooting & Support
- **[Troubleshooting Guide](./docs/troubleshooting.md)** - Common issues and solutions
- **[Environment Variables Checklist](./ENVIRONMENT-VARIABLES-CHECKLIST.md)** - Variable setup verification

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with Hooks and Suspense
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **React Query** - Server state management
- **React Router** - Client-side routing

### Backend
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **Drizzle ORM** - Type-safe database operations
- **JWT** - Authentication and authorization
- **Helmet** - Security middleware
- **Morgan** - HTTP request logging

### Database & Infrastructure
- **Supabase** - PostgreSQL database and authentication
- **Netlify** - Deployment and serverless functions
- **Netlify Functions** - Serverless API endpoints
- **PostgreSQL** - Relational database management

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking
- **Vite Dev Server** - Hot module replacement
- **Drizzle Studio** - Database management GUI

## 🛠️ Installation & Setup

### Option 1: Quick Start (Recommended)

```bash
# Clone the repository
git clone https://github.com/wahidmansoor/mwov.git
cd mwov

# Copy environment template
cp .env.example .env

# Edit environment variables (add your Supabase credentials)
nano .env

# Install all dependencies
npm run install:all

# Setup database schema
npm run db:push

# Start development servers
npm run dev
```

### Option 2: Manual Setup

See [Local Development Setup](./README-LOCALHOST.md) for detailed step-by-step instructions.

## 🚀 Available Scripts

### Development
```bash
npm run dev              # Start both frontend and backend
npm run dev:client       # Start frontend only (port 5173)
npm run dev:server       # Start backend only (port 3001)
npm run install:all      # Install all dependencies
```

### Building
```bash
npm run build           # Build for production
npm run build:client    # Build frontend only
npm run build:server    # Build backend only
npm run preview         # Preview production build
```

### Database
```bash
npm run db:push         # Push schema to database
npm run db:generate     # Generate migration files
npm run db:studio       # Open Drizzle Studio
npm run db:seed         # Seed database with sample data
```

### Testing & Quality
```bash
npm run test           # Run test suite
npm run lint           # Run ESLint
npm run type-check     # TypeScript type checking
npm run format         # Format code with Prettier
```

### Utilities
```bash
npm run health         # Check system health
npm run env:check      # Validate environment setup
npm run clean          # Clean build artifacts
```

## 🌐 Access Points

Once the development server is running:

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **API Health Check**: http://localhost:3001/health
- **Database Studio**: Run `npm run db:studio`
- **Supabase Dashboard**: https://app.supabase.com/projects/your-project-id

## 🔧 Configuration

### Environment Variables

OncoVista uses environment variables for configuration. See [Environment Setup Guide](./docs/environment-setup.md) for detailed information.

Key variables:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-database-connection-string

# Application Configuration  
NODE_ENV=development
PORT=3001
VITE_API_BASE_URL=http://localhost:3001/api
```

### Build Configuration

- **Vite Config**: `client/vite.config.ts` - Frontend build configuration
- **TypeScript**: `tsconfig.json` - TypeScript compiler options
- **Tailwind**: `client/tailwind.config.js` - CSS framework configuration
- **Drizzle**: `drizzle.config.ts` - Database ORM configuration
- **Netlify**: `netlify.toml` - Deployment configuration

## 🔐 Security Features

- **JWT Authentication** - Secure user authentication
- **Row Level Security (RLS)** - Database-level access control
- **CORS Protection** - Cross-origin request security
- **Rate Limiting** - API abuse prevention
- **Input Validation** - SQL injection and XSS prevention
- **Security Headers** - Helmet.js security middleware
- **Environment Isolation** - Separate configs for dev/staging/production

## 🎯 Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/your-feature
   # Make changes
   npm run test
   npm run lint
   git commit -m "feat: add new feature"
   git push origin feature/your-feature
   ```

2. **Testing**
   ```bash
   npm run test           # Unit tests
   npm run test:e2e       # End-to-end tests
   npm run type-check     # TypeScript validation
   ```

3. **Building & Deployment**
   ```bash
   npm run build          # Production build
   npm run preview        # Test production build locally
   # Deploy to Netlify (see deployment guide)
   ```

## 📊 Project Status

| Component | Status | Description |
|-----------|--------|-------------|
| 🏠 **Localhost Setup** | ✅ Complete | Full development environment ready |
| 🗄️ **Supabase Integration** | ✅ Complete | Database and authentication configured |
| 🚀 **Netlify Deployment** | ✅ Complete | Production deployment ready |
| 📚 **Documentation** | ✅ Complete | Comprehensive guides and references |
| 🧪 **Integration Tests** | ✅ Complete | Full test suite passing |
| 🔧 **CI/CD Pipeline** | 🔄 Ready | GitHub Actions configured |

## 🤝 Contributing

We welcome contributions to OncoVista! Please read our [Contributing Guidelines](./CONTRIBUTING.md) for details on:

- Code standards and best practices
- Development workflow and branching strategy
- Testing requirements
- Medical accuracy and compliance guidelines
- Pull request process

### Quick Contribution Setup

```bash
# Fork the repository and clone your fork
git clone https://github.com/your-username/mwov.git
cd mwov

# Create a feature branch
git checkout -b feature/your-feature-name

# Install dependencies and start development
npm run install:all
npm run dev

# Make your changes, test, and submit a PR
npm run test
npm run lint
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

## 🏥 Medical Disclaimer

**Important**: This software is intended for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers.

Key considerations:
- This tool assists but does not replace clinical judgment
- Users must ensure HIPAA compliance when handling patient data
- Medical calculations and protocols should be independently verified
- Healthcare professionals remain responsible for all clinical decisions

## 📋 Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and architecture
- [x] Database design and Supabase integration
- [x] Authentication and security framework
- [x] Basic UI components and routing
- [x] Development environment optimization

### Phase 2: Core Features 🔄
- [ ] Patient management system
- [ ] Treatment protocol library
- [ ] Medication database integration
- [ ] Clinical decision support tools
- [ ] Laboratory results integration

### Phase 3: Advanced Features 📋
- [ ] Real-time collaboration
- [ ] Advanced analytics and reporting
- [ ] Mobile application
- [ ] Integration with EHR systems
- [ ] AI-powered recommendations

### Phase 4: Enterprise Features 🎯
- [ ] Multi-tenant architecture
- [ ] Advanced security and compliance
- [ ] Performance optimization
- [ ] Scalability enhancements
- [ ] Enterprise integrations

## 🔗 Resources & References

### Development Resources
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Deployment Resources
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview)
- [Custom Domain Setup](https://docs.netlify.com/domains-https/custom-domains)

### Medical & Clinical Resources
- [NCCN Clinical Practice Guidelines](https://www.nccn.org/guidelines)
- [HIPAA Compliance Guide](https://www.hhs.gov/hipaa)
- [HL7 FHIR Standards](https://www.hl7.org/fhir)

## 📞 Support & Community

### Getting Help
- **GitHub Issues**: [Report bugs or request features](https://github.com/wahidmansoor/mwov/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/wahidmansoor/mwov/discussions)
- **Documentation**: Check our comprehensive guides above
- **Email Support**: Contact the development team

### Community Guidelines
- Be respectful and professional
- Focus on constructive feedback
- Prioritize patient safety and care quality
- Follow our [Code of Conduct](./CONTRIBUTING.md#code-of-conduct)

## 📄 License

OncoVista is released under the [MIT License](./LICENSE) with additional medical disclaimers.

### Key Points:
- ✅ **Free to use** for personal and commercial projects
- ✅ **Open source** - contribute and modify as needed
- ✅ **No warranty** - use at your own responsibility
- ⚠️ **Medical disclaimer** - not a substitute for professional medical advice
- ⚠️ **Compliance responsibility** - users must ensure HIPAA compliance

## 🎉 Acknowledgments

Special thanks to:
- **Medical professionals** who provided guidance and feedback
- **Open source contributors** who made this project possible
- **Supabase team** for the excellent database platform
- **Netlify team** for seamless deployment solutions
- **React and TypeScript communities** for robust development tools

---

<div align="center">

**Built with ❤️ for healthcare professionals**

[🌟 Star this project](https://github.com/wahidmansoor/mwov) | [🐛 Report Issue](https://github.com/wahidmansoor/mwov/issues) | [💡 Request Feature](https://github.com/wahidmansoor/mwov/issues/new)

**OncoVista** - Advancing cancer care through technology

</div>
