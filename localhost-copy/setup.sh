#!/bin/bash

# OncoVista Local Development Setup Script
# This script helps set up the local development environment

set -e

echo "🚀 OncoVista Local Development Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found. Please create it with your database configuration."
    echo "Example content:"
    echo "DATABASE_URL=postgresql://localhost:5432/oncovista_dev"
    echo "SESSION_SECRET=your-session-secret-minimum-32-characters"
    echo "OPENAI_API_KEY=your-openai-api-key"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env.local; then
    echo "❌ DATABASE_URL not found in .env.local"
    echo "Please add: DATABASE_URL=postgresql://localhost:5432/oncovista_dev"
    exit 1
fi

echo "✅ Environment file found"

# Test database connection
echo ""
echo "🔌 Testing database connection..."
if npm run db:generate > /dev/null 2>&1; then
    echo "✅ Database schema generated successfully"
else
    echo "❌ Failed to generate database schema. Check your DATABASE_URL"
    exit 1
fi

# Push database schema
echo ""
echo "📊 Setting up database schema..."
if npm run db:push > /dev/null 2>&1; then
    echo "✅ Database schema pushed successfully"
else
    echo "❌ Failed to push database schema. Check your database connection"
    exit 1
fi

# Optional: Seed database
echo ""
read -p "🌱 Would you like to seed the database with sample data? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if npm run db:seed > /dev/null 2>&1; then
        echo "✅ Database seeded successfully"
    else
        echo "⚠️  Failed to seed database (this is optional)"
    fi
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "Available URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  DB Studio: npm run db:studio"
echo ""
echo "Happy coding! 🚀"
