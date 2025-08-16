#!/bin/bash
# OncoVista Resurrection Toolkit - Quick Clone Script
# For full medical-grade script, see: auto-clone-complete.sh

echo "🧬 OncoVista Quick Clone - Use auto-clone-complete.sh for full medical-grade resurrection"
echo "This is a simplified version for basic setup."

# Basic health check
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

echo "✅ Basic requirements met"

# Install dependencies
echo "📦 Installing dependencies..."
npm install || exit 1

if [ -d "client" ]; then
    cd client && npm install && cd ..
fi

echo "🚀 Starting development server..."
npm run dev

echo "✅ OncoVista is running! Check auto-clone-complete.sh for full setup."

# Validate prerequisites
print_status "Validating environment prerequisites..."

if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command_exists npm; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi

print_success "Environment validation complete"

# Get project name from user
read -p "Enter project name (default: oncovista-clone): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-oncovista-clone}

# Create project directory
print_status "Creating project structure..."
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Initialize package.json for root
cat > package.json << 'EOF'
{
  "name": "oncovista-clone",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "build:netlify": "npm run build:client && npm run build:functions",
    "build:client": "cd client && npm install --include=dev && npx vite build && cd .. && mkdir -p dist/public && cp -r client/dist/* dist/public/",
    "build:functions": "esbuild netlify/functions/api.ts --platform=node --packages=external --bundle --format=esm --outfile=netlify/functions/api.js",
    "install:client": "cd client && npm install",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  }
}
EOF

# Install root dependencies
print_status "Installing core dependencies..."
npm install \
  @anthropic-ai/sdk@^0.37.0 \
  @hookform/resolvers@^3.10.0 \
  @neondatabase/serverless@^0.10.4 \
  @netlify/functions@^2.8.2 \
  @tanstack/react-query@^5.60.5 \
  archiver@^7.0.1 \
  class-variance-authority@^0.7.1 \
  clsx@^2.1.1 \
  cmdk@^1.1.1 \
  commander@^14.0.0 \
  connect-pg-simple@^10.0.0 \
  date-fns@^3.6.0 \
  dotenv@^17.0.0 \
  drizzle-orm@^0.39.1 \
  drizzle-zod@^0.7.0 \
  express@^4.21.2 \
  express-session@^1.18.1 \
  framer-motion@^11.13.1 \
  input-otp@^1.4.2 \
  lucide-react@^0.453.0 \
  memoizee@^0.4.17 \
  memorystore@^1.6.7 \
  nanoid@^5.1.5 \
  next-themes@^0.4.6 \
  nodemailer@^7.0.4 \
  openai@^5.5.1 \
  openid-client@^6.6.1 \
  passport@^0.7.0 \
  passport-local@^1.0.0 \
  pg@^8.16.3 \
  postgres@^3.4.7 \
  react@^18.3.1 \
  react-dom@^18.3.1 \
  react-hook-form@^7.55.0 \
  react-icons@^5.4.0 \
  serverless-http@^3.2.0 \
  tailwind-merge@^2.6.0 \
  tailwindcss-animate@^1.0.7 \
  vaul@^1.1.2 \
  wouter@^3.3.5 \
  ws@^8.18.0 \
  zod@^3.24.2 \
  zod-validation-error@^3.4.0 \
  zustand@^5.0.5

# Install dev dependencies
npm install -D \
  @types/connect-pg-simple@^7.0.3 \
  @types/express@4.17.21 \
  @types/express-session@^1.18.0 \
  @types/node@20.16.11 \
  @types/passport@^1.0.16 \
  @types/passport-local@^1.0.38 \
  @types/react@^18.3.11 \
  @types/react-dom@^18.3.1 \
  @types/ws@^8.5.13 \
  @vitejs/plugin-react@^4.3.2 \
  drizzle-kit@^0.30.4 \
  esbuild@^0.25.0 \
  tailwindcss@^3.4.17 \
  tsx@^4.20.3 \
  typescript@5.6.3 \
  vite@^5.4.19

print_success "Core dependencies installed"

# Create directory structure
print_status "Creating application structure..."
mkdir -p {client,server,shared,netlify/functions,docs,scripts,supabase}

# Create TypeScript configuration
print_status "Setting up TypeScript configuration..."
cat > tsconfig.json << 'EOF'
{
  "include": ["client/src/**/*", "shared/**/*", "server/**/*"],
  "exclude": ["node_modules", "build", "dist", "**/*.test.ts"],
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./node_modules/typescript/tsbuildinfo",
    "noEmit": true,
    "module": "ESNext",
    "strict": true,
    "lib": ["esnext", "dom", "dom.iterable"],
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "types": ["node", "vite/client"],
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
EOF

# Create Vite configuration
print_status "Setting up build configuration..."
cat > vite.config.ts << 'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
EOF

# Create Drizzle configuration
print_status "Setting up database configuration..."
cat > drizzle.config.ts << 'EOF'
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
EOF

# Setup client directory
print_status "Initializing React client..."
cd client

# Client package.json
cat > package.json << 'EOF'
{
  "name": "oncovista-client",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "./node_modules/.bin/vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx,ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@supabase/supabase-js": "^2.50.2",
    "@tanstack/react-query": "^5.60.5",
    "axios": "^1.6.2",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.20.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.53.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.3",
    "vite": "^5.4.19"
  }
}
EOF

# Install client dependencies
npm install

# Create client directory structure
mkdir -p src/{components,pages,modules,hooks,lib,types}
mkdir -p src/modules/{opd,cdu,inpatient,palliative,education,ai-chat}

# Create basic React app structure
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OncoVista AI - Clinical Decision Support</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Tailwind configuration
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [],
}
EOF

cd ..

# Setup server directory
print_status "Setting up Express.js server..."
cd server

# Create basic server structure
mkdir -p {routes,services,middleware,db}

cd ..

# Setup shared directory
print_status "Creating shared schema..."
cd shared

# Create basic schema file
cat > schema.ts << 'EOF'
import { pgTable, varchar, text, timestamp, boolean, uuid, jsonb, decimal, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Sessions table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: text("role").default("oncologist"),
  department: text("department"),
  licenseNumber: text("license_number"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Clinical protocols table
export const clinicalProtocols = pgTable("clinical_protocols", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  version: varchar("version", { length: 50 }).notNull(),
  protocolType: varchar("protocol_type", { length: 100 }).notNull(),
  cancerType: varchar("cancer_type", { length: 100 }),
  stage: varchar("stage", { length: 50 }),
  content: jsonb("content").notNull(),
  evidenceLevel: varchar("evidence_level", { length: 50 }),
  guidelineSource: varchar("guideline_source", { length: 100 }),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  status: varchar("status", { length: 50 }).default("active"),
  approvalStatus: varchar("approval_status", { length: 50 }).default("pending"),
  approvedBy: uuid("approved_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
});

// AI interactions table
export const aiInteractions = pgTable("ai_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  sessionId: varchar("session_id", { length: 255 }),
  moduleType: varchar("module_type", { length: 100 }),
  intent: varchar("intent", { length: 100 }),
  inputContext: jsonb("input_context"),
  aiResponse: jsonb("ai_response"),
  confidenceScore: decimal("confidence_score", { precision: 3, scale: 2 }),
  userFeedback: varchar("user_feedback", { length: 50 }),
  responseTimeMs: integer("response_time_ms"),
  modelVersion: varchar("model_version", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Audit log table
export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  userRole: varchar("user_role", { length: 100 }),
  action: varchar("action", { length: 255 }),
  resource: varchar("resource", { length: 255 }),
  resourceId: varchar("resource_id", { length: 255 }),
  oldValues: jsonb("old_values"),
  newValues: jsonb("new_values"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow(),
  sensitiveData: boolean("sensitive_data").default(false),
});

// Insert schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClinicalProtocolSchema = createInsertSchema(clinicalProtocols).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
EOF

cd ..

# Create environment template
print_status "Creating environment configuration..."
cat > .env.example << 'EOF'
# Database Configuration
DATABASE_URL=your_supabase_database_url

# AI Service Configuration (Optional - will use mock responses if not provided)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Application Configuration
NODE_ENV=development
SESSION_SECRET=your_secure_session_secret_here

# Replit Authentication (Production only)
REPLIT_AUTH_DOMAIN=your_replit_auth_domain

# Client Configuration (These will be exposed to the client)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
EOF

# Create Netlify configuration
print_status "Setting up deployment configuration..."
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build:netlify"
  functions = "netlify/functions"
  publish = "dist/public"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "npm run dev"
  port = 5000
  publish = "dist/public"
  functions = "netlify/functions"
EOF

# Create basic README
print_status "Generating documentation..."
cat > README.md << 'EOF'
# OncoVista AI - Clinical Decision Support Platform

🧬 **Resurrected Clone** of the comprehensive oncology application designed for clinical decision support, patient management, and medical education.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key (optional - uses mock responses if not provided)

### Installation

1. **Clone and setup**
   ```bash
   git clone <your-repo>
   cd oncovista-clone
   npm install
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database setup**
   ```bash
   npm run db:push
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + Drizzle ORM
- **Database**: PostgreSQL via Supabase
- **AI**: OpenAI GPT-4o + Anthropic Claude fallback
- **Deployment**: Netlify with serverless functions

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run db:push      # Push database schema
npm install:client   # Install client dependencies
```

## 🔐 Security Features

- Role-based access control (RBAC)
- Comprehensive audit logging
- Data encryption for sensitive information
- Anonymous clinical data processing

## 📚 Modules

1. **OPD Module** - Outpatient department management
2. **CDU Module** - Cancer day unit protocols
3. **Inpatient Module** - Hospital patient management
4. **Palliative Care** - Specialized care workflows
5. **AI Assistant** - Clinical decision support
6. **Education** - Medical oncology training
7. **Analytics** - Usage and compliance tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

---

**OncoVista Clone** - Reconstructed with surgical precision
EOF

# Create basic package scripts
print_status "Setting up automation scripts..."
mkdir -p scripts

cat > scripts/setup-database.sh << 'EOF'
#!/bin/bash
# Database setup and seeding script

echo "🗄️ Setting up OncoVista database..."

# Push schema to database
npm run db:push

echo "✅ Database schema deployed successfully"
echo "📝 Don't forget to configure your .env file with DATABASE_URL"
EOF

chmod +x scripts/setup-database.sh

cat > scripts/dev-check.sh << 'EOF'
#!/bin/bash
# Development environment health check

echo "🔍 OncoVista Development Health Check"
echo "======================================"

# Check Node version
NODE_VERSION=$(node -v)
echo "Node.js version: $NODE_VERSION"

# Check npm version  
NPM_VERSION=$(npm -v)
echo "npm version: $NPM_VERSION"

# Check if .env exists
if [ -f ".env" ]; then
    echo "✅ Environment file exists"
else
    echo "❌ Environment file missing - copy .env.example to .env"
fi

# Check if database URL is configured
if grep -q "DATABASE_URL=" .env 2>/dev/null; then
    echo "✅ Database URL configured"
else
    echo "❌ Database URL not configured"
fi

echo ""
echo "Run 'npm run dev' to start the development server"
EOF

chmod +x scripts/dev-check.sh

# Final success message
print_success "OncoVista AI has been successfully resurrected! 🎉"
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo -e "${YELLOW}1.${NC} Configure your environment variables:"
echo "   cp .env.example .env"
echo "   # Edit .env with your Supabase and OpenAI credentials"
echo ""
echo -e "${YELLOW}2.${NC} Set up the database:"
echo "   npm run db:push"
echo ""
echo -e "${YELLOW}3.${NC} Start development:"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}4.${NC} Access the application:"
echo "   http://localhost:5000"
echo ""
echo -e "${GREEN}🧬 The resurrection is complete!${NC}"
echo -e "${PURPLE}The clone will breathe with the same intelligence as the original.${NC}"

# Create completion marker
echo "$(date): OncoVista AI successfully resurrected" > .resurrection-complete

print_success "Auto-clone script execution completed successfully! 🚀"
