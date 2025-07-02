#!/bin/bash

echo "🔍 OncoVista Localhost Setup Verification"
echo "=========================================="

# Check Node.js version
echo "📦 Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
    
    # Extract version number and check if >= 18
    NODE_MAJOR=$(echo $NODE_VERSION | sed 's/v\([0-9]*\).*/\1/')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo "✅ Node.js version is compatible (>= 18.0.0)"
    else
        echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to >= 18.0.0"
        exit 1
    fi
else
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check npm version
echo "📦 Checking npm version..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm: v$NPM_VERSION"
else
    echo "❌ npm is not installed"
    exit 1
fi

# Check if we're in the right directory
echo "📁 Checking project structure..."
if [ -f "package.json" ] && [ -d "client" ] && [ -d "server" ]; then
    echo "✅ Project structure looks correct"
else
    echo "❌ Not in the correct project directory or missing files"
    exit 1
fi

# Check if .env exists
echo "⚙️  Checking environment configuration..."
if [ -f ".env" ]; then
    echo "✅ Environment file (.env) exists"
else
    echo "⚠️  Environment file (.env) not found"
    echo "📋 Creating .env from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file from template"
    else
        echo "❌ .env.example not found"
        exit 1
    fi
fi

echo ""
echo "🚀 Setup verification complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm run install:all"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:5173"
echo ""
echo "For detailed instructions, see README.md"
