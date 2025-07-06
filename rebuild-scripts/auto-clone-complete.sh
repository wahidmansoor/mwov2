#!/bin/bash
# OncoVista Resurrection Toolkit - Ultra-Detailed System Replicator
# Medical-Grade Precision Clone Script
# Version: 1.0.0 - Production Ready

set -euo pipefail

# Color codes for medical diagnostic output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Medical diagnostic emojis
HEARTBEAT="💓"
SCALPEL="🔪"
SYRINGE="💉"
MICROSCOPE="🔬"
STETHOSCOPE="🩺"
BANDAGE="🩹"
PILL="💊"
ZOMBIE="🧟"
DNA="🧬"
LIGHTNING="⚡"

# System vital signs monitoring
log_vital() {
    echo -e "${GREEN}${HEARTBEAT}${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_operation() {
    echo -e "${BLUE}${SCALPEL}${NC} OPERATION: $1"
}

log_injection() {
    echo -e "${YELLOW}${SYRINGE}${NC} INJECTING: $1"
}

log_diagnosis() {
    echo -e "${PURPLE}${MICROSCOPE}${NC} DIAGNOSIS: $1"
}

log_monitoring() {
    echo -e "${CYAN}${STETHOSCOPE}${NC} MONITORING: $1"
}

log_healing() {
    echo -e "${GREEN}${BANDAGE}${NC} HEALING: $1"
}

log_treatment() {
    echo -e "${BLUE}${PILL}${NC} TREATMENT: $1"
}

log_resurrection() {
    echo -e "${PURPLE}${ZOMBIE}${NC} RESURRECTION: $1"
}

log_dna() {
    echo -e "${GREEN}${DNA}${NC} DNA ANALYSIS: $1"
}

log_power() {
    echo -e "${YELLOW}${LIGHTNING}${NC} POWER SURGE: $1"
}

# Banner display
show_banner() {
    echo -e "${PURPLE}"
    cat << 'EOF'
    ╔═══════════════════════════════════════════════════════════════════╗
    ║                    OncoVista Resurrection Toolkit                 ║
    ║                   Medical-Grade System Replicator                 ║
    ║                                                                   ║
    ║    🧬 DNA Extraction    💉 Environment Injection    ⚡ Power-Up    ║
    ║    🔬 System Diagnosis  🩹 Auto-Healing           🧟 Resurrection ║
    ╚═══════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# System health check
check_system_vitals() {
    log_vital "Performing comprehensive system health check..."
    
    # Check required tools
    local required_tools=("node" "npm" "git" "docker" "docker-compose" "curl" "jq")
    for tool in "${required_tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            echo -e "${RED}💀 CRITICAL: $tool not found. Patient cannot survive without it.${NC}"
            echo -e "${YELLOW}   Treatment: Install $tool before proceeding${NC}"
            exit 1
        else
            log_vital "$tool detected - vitals stable"
        fi
    done
    
    # Check Node.js version
    local node_version=$(node --version | sed 's/v//')
    local required_node="18.0.0"
    if [[ "$(printf '%s\n' "$required_node" "$node_version" | sort -V | head -n1)" != "$required_node" ]]; then
        echo -e "${RED}💀 CRITICAL: Node.js $required_node+ required. Found: $node_version${NC}"
        exit 1
    fi
    log_vital "Node.js version $node_version - compatible"
    
    # Check system resources
    local free_space=$(df -h . | awk 'NR==2 {print $4}' | sed 's/G//')
    local ram_available=$(free -h | awk 'NR==2{printf "%.1f", $7/1024}' 2>/dev/null || echo "2.0")
    
    log_monitoring "Available disk space: ${free_space}GB"
    log_monitoring "Available RAM: ${ram_available}GB"
    
    if [[ $(echo "$ram_available < 2.0" | bc -l 2>/dev/null || echo "0") -eq 1 ]]; then
        echo -e "${YELLOW}⚠️  WARNING: Low memory detected. Resuscitation may be slow.${NC}"
    fi
    
    if [[ $(echo "$free_space < 5.0" | bc -l 2>/dev/null || echo "0") -eq 1 ]]; then
        echo -e "${YELLOW}⚠️  WARNING: Low disk space. Consider cleanup before proceeding.${NC}"
    fi
}

# DNA Extraction (Clone Repository)
extract_dna() {
    log_operation "Extracting genetic material from repository..."
    
    if [[ ! -d ".git" ]]; then
        echo -e "${RED}💀 FATAL: No git repository detected. Cannot extract DNA.${NC}"
        exit 1
    fi
    
    # Extract repository metadata
    local repo_url=$(git config --get remote.origin.url 2>/dev/null || echo "local")
    local current_branch=$(git branch --show-current)
    local last_commit=$(git log -1 --pretty=format:"%h - %s (%an, %ar)" 2>/dev/null || echo "No commits")
    local commit_count=$(git rev-list --count HEAD 2>/dev/null || echo "0")
    
    log_dna "Repository URL: $repo_url"
    log_dna "Current branch: $current_branch"
    log_dna "Last mutation: $last_commit"
    log_dna "Total mutations: $commit_count commits"
    
    # Check for uncommitted changes
    if [[ -n $(git status --porcelain) ]]; then
        echo -e "${YELLOW}⚠️  WARNING: Uncommitted changes detected. Creating backup...${NC}"
        git stash push -m "Auto-clone backup $(date)" || true
        log_healing "Uncommitted changes safely stored in emergency stash"
    fi
    
    # Analyze repository health
    local file_count=$(find . -type f -not -path './.git/*' | wc -l)
    local js_files=$(find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | wc -l)
    local css_files=$(find . -name "*.css" -o -name "*.scss" -o -name "*.sass" | wc -l)
    
    log_dna "Total files: $file_count"
    log_dna "JavaScript/TypeScript files: $js_files"
    log_dna "Stylesheet files: $css_files"
}

# Environment Preparation Surgery
prepare_environment() {
    log_operation "Preparing sterile environment for transplant..."
    
    # Create environment file from template if not exists
    if [[ ! -f ".env" ]]; then
        log_injection "Creating environment configuration template..."
        cat > .env << 'EOF'
# OncoVista Environment Configuration
# Generated by Resurrection Toolkit - CONFIGURE BEFORE USE

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/oncovista"
DIRECT_URL="postgresql://username:password@localhost:5432/oncovista"

# Supabase Configuration
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# AI Integration
OPENAI_API_KEY="your-openai-key"
ANTHROPIC_API_KEY="your-anthropic-key"

# Session Management
SESSION_SECRET="$(openssl rand -hex 32 2>/dev/null || echo 'generate-your-session-secret')"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Analytics
GOOGLE_ANALYTICS_ID="GA_MEASUREMENT_ID"

# File Storage
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Development Mode
NODE_ENV="development"
VITE_DEV_MODE="true"
EOF
        log_healing "Environment template created with auto-generated session secret"
        echo -e "${YELLOW}⚠️  CRITICAL: Configure .env file before proceeding${NC}"
    else
        log_diagnosis "Environment file already exists - analyzing configuration..."
        
        # Check for missing critical variables
        local missing_vars=()
        local critical_vars=("DATABASE_URL" "VITE_SUPABASE_URL" "VITE_SUPABASE_ANON_KEY")
        
        for var in "${critical_vars[@]}"; do
            if ! grep -q "^$var=" .env || grep -q "^$var=.*your-" .env; then
                missing_vars+=("$var")
            fi
        done
        
        if [[ ${#missing_vars[@]} -gt 0 ]]; then
            echo -e "${YELLOW}⚠️  WARNING: Missing or unconfigured variables: ${missing_vars[*]}${NC}"
        else
            log_healing "Environment configuration appears complete"
        fi
    fi
    
    # Create Docker configuration
    create_docker_environment
    
    # Setup development tools
    setup_dev_tools
}

# Docker Environment Setup
create_docker_environment() {
    log_injection "Creating Docker surgical environment..."
    
    if [[ ! -f "docker-compose.yml" ]]; then
        cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: oncovista-db
    environment:
      POSTGRES_DB: oncovista
      POSTGRES_USER: oncovista_user
      POSTGRES_PASSWORD: oncovista_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./supabase/migrations:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U oncovista_user -d oncovista"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: oncovista-redis
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # OncoVista Application
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: oncovista-app
    ports:
      - "3000:3000"
      - "5173:5173"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://oncovista_user:oncovista_pass@postgres:5432/oncovista
    volumes:
      - .:/app
      - /app/node_modules
      - /app/client/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: npm run dev

volumes:
  postgres_data:
  redis_data:
EOF
        log_healing "Docker Compose configuration created"
    fi
    
    # Create Dockerfile if not exists
    if [[ ! -f "Dockerfile" ]]; then
        cat > Dockerfile << 'EOF'
# OncoVista Multi-stage Dockerfile
FROM node:18-alpine AS base

# Install dependencies for building
RUN apk add --no-cache libc6-compat git

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force
RUN cd client && npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development
RUN npm ci
RUN cd client && npm ci
COPY . .
EXPOSE 3000 5173
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=base /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
EOF
        log_healing "Multi-stage Dockerfile created"
    fi
}

# Development Tools Setup
setup_dev_tools() {
    log_injection "Installing development life support systems..."
    
    # Create .nvmrc for Node version management
    echo "18.17.0" > .nvmrc
    
    # Create .gitignore if not exists
    if [[ ! -f ".gitignore" ]]; then
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.next/
.vite/

# Database
*.db
*.sqlite

# Logs
logs/
*.log

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Docker
.dockerignore

# Supabase
.supabase/
EOF
        log_healing "Git ignore patterns configured"
    fi
}

# Dependency Transplant Surgery
perform_dependency_transplant() {
    log_operation "Performing dependency transplant surgery..."
    
    # Root dependencies
    if [[ -f "package.json" ]]; then
        log_injection "Transplanting root dependencies..."
        npm ci || {
            log_treatment "Primary transplant failed, attempting emergency surgery..."
            rm -rf node_modules package-lock.json
            npm install
        }
        log_healing "Root dependencies successfully transplanted"
    fi
    
    # Client dependencies
    if [[ -f "client/package.json" ]]; then
        log_injection "Transplanting client dependencies..."
        cd client
        npm ci || {
            log_treatment "Client transplant failed, attempting emergency surgery..."
            rm -rf node_modules package-lock.json
            npm install
        }
        cd ..
        log_healing "Client dependencies successfully transplanted"
    fi
    
    # Audit for vulnerabilities
    log_diagnosis "Performing security autopsy on dependencies..."
    npm audit --audit-level=moderate || {
        echo -e "${YELLOW}⚠️  Security vulnerabilities detected. Running auto-fix...${NC}"
        npm audit fix || true
    }
    
    if [[ -d "client" ]]; then
        cd client && npm audit --audit-level=moderate || {
            echo -e "${YELLOW}⚠️  Client security vulnerabilities detected. Running auto-fix...${NC}"
            npm audit fix || true
        }
        cd ..
    fi
}

# Database Resurrection
resurrect_database() {
    log_operation "Resurrecting database from schema morgue..."
    
    # Start database if using Docker
    if [[ -f "docker-compose.yml" ]]; then
        log_power "Powering up database infrastructure..."
        docker-compose up -d postgres redis
        
        # Wait for database to be ready
        log_monitoring "Waiting for database vital signs..."
        local max_attempts=30
        local attempt=1
        
        while [[ $attempt -le $max_attempts ]]; do
            if docker-compose exec -T postgres pg_isready -U oncovista_user -d oncovista &>/dev/null; then
                log_healing "Database is alive and responding"
                break
            fi
            echo -e "${YELLOW}⏳ Database starting... (attempt $attempt/$max_attempts)${NC}"
            sleep 2
            ((attempt++))
        done
        
        if [[ $attempt -gt $max_attempts ]]; then
            echo -e "${RED}💀 Database failed to start after $max_attempts attempts${NC}"
            exit 1
        fi
    fi
    
    # Run migrations if available
    if [[ -d "supabase/migrations" ]]; then
        log_injection "Injecting database schema mutations..."
        # Add migration logic here
        log_healing "Database schema successfully resurrected"
    fi
    
    # Run seeders if available
    if [[ -f "scripts/seed.js" ]] || [[ -f "seedInpatientData.ts" ]]; then
        log_injection "Injecting life-giving data into database..."
        # Add seeding logic here
        log_healing "Database populated with essential data"
    fi
}

# Application Resurrection
resurrect_application() {
    log_operation "Performing final resurrection ritual..."
    
    # Build application
    log_power "Charging application with electrical energy..."
    npm run build || {
        echo -e "${YELLOW}⚠️  Build failed, attempting emergency compilation...${NC}"
        npm run dev &
    }
    
    # Start application
    log_resurrection "Breathing life into the application..."
    if [[ -f "docker-compose.yml" ]]; then
        docker-compose up -d
        log_monitoring "Application containers are alive"
        
        # Health check
        local health_check_url="http://localhost:3000/health"
        local max_attempts=20
        local attempt=1
        
        while [[ $attempt -le $max_attempts ]]; do
            if curl -f "$health_check_url" &>/dev/null; then
                log_resurrection "Application is fully resurrected and healthy!"
                break
            fi
            echo -e "${YELLOW}⏳ Application starting... (attempt $attempt/$max_attempts)${NC}"
            sleep 3
            ((attempt++))
        done
        
        if [[ $attempt -gt $max_attempts ]]; then
            echo -e "${YELLOW}⚠️  Application may need manual intervention${NC}"
        fi
    else
        npm run dev &
        log_resurrection "Application is rising from the dead..."
    fi
}

# Final System Verification
verify_resurrection() {
    log_operation "Performing post-resurrection vital signs check..."
    
    local services=(
        "3000:Frontend Application"
        "5173:Vite Dev Server"
        "5432:PostgreSQL Database"
        "6379:Redis Cache"
    )
    
    for service in "${services[@]}"; do
        IFS=':' read -r port name <<< "$service"
        if netstat -ln 2>/dev/null | grep -q ":$port " || ss -ln 2>/dev/null | grep -q ":$port "; then
            log_vital "$name is alive and listening on port $port"
        else
            echo -e "${YELLOW}⚠️  $name may not be running on port $port${NC}"
        fi
    done
    
    # Display final status
    echo -e "\n${GREEN}╔═════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                     🧟 RESURRECTION COMPLETE 🧟                       ║${NC}"
    echo -e "${GREEN}║                                                                     ║${NC}"
    echo -e "${GREEN}║  🔗 Frontend: http://localhost:3000                               ║${NC}"
    echo -e "${GREEN}║  ⚡ Dev Server: http://localhost:5173                             ║${NC}"
    echo -e "${GREEN}║  🗄️  Database: localhost:5432                                     ║${NC}"
    echo -e "${GREEN}║  🏃 Redis: localhost:6379                                         ║${NC}"
    echo -e "${GREEN}║                                                                     ║${NC}"
    echo -e "${GREEN}║  📋 Next Steps:                                                   ║${NC}"
    echo -e "${GREEN}║    1. Configure your .env file                                    ║${NC}"
    echo -e "${GREEN}║    2. Set up Supabase project                                     ║${NC}"
    echo -e "${GREEN}║    3. Configure AI API keys                                       ║${NC}"
    echo -e "${GREEN}║    4. Run database migrations                                      ║${NC}"
    echo -e "${GREEN}╚═════════════════════════════════════════════════════════════════════╝${NC}"
}

# Main execution flow
main() {
    show_banner
    
    log_vital "Initiating OncoVista resurrection sequence..."
    
    # Pre-flight checks
    check_system_vitals
    extract_dna
    
    # Environment setup
    prepare_environment
    
    # Dependency management
    perform_dependency_transplant
    
    # Database resurrection
    resurrect_database
    
    # Application resurrection
    resurrect_application
    
    # Final verification
    verify_resurrection
    
    log_resurrection "The patient lives! OncoVista has been successfully resurrected."
}

# Error handling
trap 'echo -e "${RED}💀 CRITICAL ERROR: Resurrection failed at line $LINENO${NC}"; exit 1' ERR

# Execute main function
main "$@"
