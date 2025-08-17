# OncoVista – Comprehensive Oncology Application

![OncoVista](https://img.shields.io/badge/OncoVista-v1.0.0-blue) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green) ![Netlify](https://img.shields.io/badge/Netlify-Ready-success)

OncoVista is a modular, full-stack oncology platform for clinical decision support, patient management, and medical education. It is built as a monorepo with a modern React + Node.js stack, PostgreSQL/Supabase backend, and robust AI integration for evidence-based clinical tools.

## 🚀 Features

### Clinical Modules
- **OPD Module**: Outpatient management and consultations
- **CDU Module**: Clinical Decision Unit with protocol support
- **Inpatient Management**: Hospital patient management
- **Palliative Care**: Specialized palliative workflows
- **Analytics**: Clinical data analysis and reporting
- **AI Assistant**: AI-powered clinical decision support
- **Education Module**: Oncology education platform
- **Clinical Handbook**: Medical reference

### Technical Features
- **AI-Powered Decision Support** (OpenAI, Anthropic integration)
- **Role-Based Access Control (RBAC)**
- **Real-time Chat & Notifications**
- **Advanced Risk Calculation**
- **Clinical Protocol Versioning**
- **Data Import/Export**
- **Multi-specialty Support**


## 🧩 Environment Setup

Copy `.env.example` to `.env` and fill in your Supabase and API keys:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
NODE_ENV=development
SESSION_SECRET=your_session_secret
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
- **React 18 + TypeScript** (Vite)
- **Tailwind CSS** + **Radix UI** (custom UI kit)
- **TanStack Query** for data fetching
- **Zustand** for state management
- **Wouter** for routing

### Backend
- **Node.js + Express.js**
- **Drizzle ORM**
- **PostgreSQL** (Neon/Supabase)
- **Zod** for validation

### AI & Integration
- **OpenAI GPT** and **Anthropic Claude**
- **WebSocket** for real-time features

### Deployment
- **Netlify** (serverless functions)
- **Supabase** (PostgreSQL, Auth)

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI/Anthropic API keys (optional)

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

## 🏗️ Monorepo Structure

```
mwov/
├── client/           # React frontend (Vite + TypeScript)
│   └── src/
│       ├── components/ui/   # UI kit (Radix + Tailwind)
│       ├── modules/         # Clinical modules (OPD, CDU, etc.)
│       ├── pages/           # Route components
│       ├── services/        # API services (ApiService pattern)
│       └── ...
├── server/           # Express.js backend
│   ├── routes/       # API route definitions
│   ├── services/     # Business logic
│   ├── middleware/   # Auth, error handling
│   └── index.ts
├── shared/           # Shared types and schemas (schema.ts)
├── netlify/          # Netlify deployment functions
└── docs/             # Documentation
```

## 🔧 Development

### Essential Commands

```bash
npm run dev            # Start both client & server (dev mode)
npm run build           # Build for production
npm run start          # Start production server
npm run db:push        # Push schema changes to database
npm run smoke:supabase # Test database connectivity
npm run build:netlify  # Build for Netlify deployment
npm run check          # Type checking
```

## 🌐 Deployment

### Netlify Deployment

1. **Connect GitHub repository** to Netlify
2. **Configure build settings**:
   - Build command: `npm run build:netlify`
   - Publish directory: `dist/public`
3. **Set environment variables** in Netlify dashboard
4. **Deploy** automatically on git push

See [Deployment Guide](./README-deployment.md) for details.

### Environment Variables

See `.env.example` for all required variables. Key variables:

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
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

- Follow TypeScript strict mode and best practices
- Use the `ApiService` pattern for all API services
- Extend clinical modules using the module architecture pattern
- Use Zod schemas for validation at API boundaries
- Maintain test coverage for new features
- Use conventional commit messages
- Update documentation for new features and modules

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: See [docs/](./docs/)
- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions

### Common Issues
- **Database Connection**: Check Supabase credentials
- **Build Errors**: Ensure Node.js 18+ is used
- **Environment Variables**: Verify all required variables

See [Troubleshooting Guide](./docs/troubleshooting.md) for more.

## 🙏 Acknowledgments

- Built with ❤️ for the oncology community
- Powered by modern web technologies
- Inspired by the need for better clinical tools

---


**OncoVista** – Enhancing oncology care through technology

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wahidmansoor/mwov)
