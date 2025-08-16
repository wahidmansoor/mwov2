# OncoVista - Comprehensive Oncology Application

![OncoVista](https://img.shields.io/badge/OncoVista-v1.0.0-blue) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green) ![Netlify](https://img.shields.io/badge/Netlify-Ready-success)

OncoVista is a comprehensive oncology application designed for clinical decision support, patient management, and medical education. Built with modern web technologies and AI integration, it provides oncologists with powerful tools for patient care and clinical workflows.

## 🚀 Features

### Clinical Modules
- **🏥 OPD Module**: Outpatient department management and consultations
- **🩺 CDU Module**: Clinical Decision Unit with protocol support
- **🛏️ Inpatient Management**: Hospital patient management system
- **💊 Palliative Care**: Specialized palliative care workflows
- **📊 Analytics**: Clinical data analysis and reporting
- **🤖 AI Assistant**: AI-powered clinical decision support
- **📚 Education Module**: Medical oncology education platform
- **📖 Clinical Handbook**: Comprehensive medical reference

### Technical Features
- **AI-Powered Decision Support** with OpenAI and Anthropic integration
- **Role-Based Access Control (RBAC)** for different user types
- **Real-time Chat & Notifications** for clinical communication
- **Advanced Risk Calculation** algorithms
- **Clinical Protocol Versioning** system
- **Comprehensive Data Export/Import** capabilities
- **Multi-specialty Support** (Medical, Radiation, Palliative Oncology)


## 🧩 Environment Setup

Copy `.env.example` to `.env` and fill in your Supabase project keys:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🔌 Supabase Connectivity Smoke Test

To verify Supabase connectivity and table access, run:

```
npm run smoke:supabase
```

This will check row counts for key tables and validate JSONB parsing. If you see RLS/policy errors, update your Supabase Row Level Security policies.

---
## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** + **TypeScript** for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** + **Radix UI** for modern, accessible UI components
- **TanStack React Query** for efficient data fetching
- **Zustand** for lightweight state management
- **Framer Motion** for smooth animations

### Backend
- **Node.js** + **Express.js** for robust server architecture
- **PostgreSQL** via **Supabase** for scalable database
- **Drizzle ORM** for type-safe database operations
- **Zod** for runtime validation
- **Passport.js** for authentication

### AI & Integration
- **OpenAI GPT** for clinical assistance
- **Anthropic Claude** for advanced reasoning
- **WebSocket** support for real-time features

### Deployment
- **Netlify** for seamless deployment and CDN
- **Supabase** for managed PostgreSQL and authentication
- **Serverless Functions** for scalable backend operations

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Supabase account
- OpenAI/Anthropic API keys (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wahidmansoor/mwov.git
   cd mwov
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to access the application.

## 📖 Documentation

- **[Local Development Setup](./README-localhost.md)** - Complete localhost installation guide
- **[Deployment Guide](./README-deployment.md)** - Netlify deployment instructions  
- **[Migration Roadmap](./MIGRATION_ROADMAP.md)** - Project migration documentation
- **[Tech Stack Analysis](./TECH_STACK_ANALYSIS.md)** - Detailed technical overview
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

## 🏗️ Project Structure

```
mwov/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── modules/        # Feature modules (OPD, CDU, etc.)
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── services/       # API services
│   └── index.html
├── server/                 # Express.js backend
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic services
│   ├── middleware/         # Express middleware
│   └── index.ts
├── shared/                 # Shared types and schemas
├── netlify/               # Netlify deployment files
└── docs/                  # Documentation
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push database schema changes
npm run check        # Type checking
```

### Key Development Commands

```bash
# Database operations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio (if configured)

# Build and deployment
npm run build        # Production build
npm run preview      # Preview production build
```

## 🌐 Deployment

### Netlify Deployment

1. **Connect GitHub repository** to Netlify
2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
3. **Set environment variables** in Netlify dashboard
4. **Deploy** automatically on git push

For detailed deployment instructions, see [Deployment Guide](./README-deployment.md).

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Database
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services (optional)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Application
NODE_ENV=development
SESSION_SECRET=your_session_secret
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain test coverage for new features
- Use conventional commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- **Documentation**: Check our comprehensive [docs/](./docs/) folder
- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

### Common Issues

- **Database Connection**: Ensure Supabase credentials are correct
- **Build Errors**: Check Node.js version (18+ required)
- **Environment Variables**: Verify all required variables are set

See [Troubleshooting Guide](./docs/troubleshooting.md) for detailed solutions.

## 🙏 Acknowledgments

- Built with ❤️ for the oncology community
- Powered by modern web technologies
- Inspired by the need for better clinical tools

---

**OncoVista** - Enhancing oncology care through technology

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wahidmansoor/mwov)
