#!/bin/bash

echo "🚀 Starting OncoVista Development Environment"
echo "============================================="

# Check if dependencies are installed
if [ ! -d "node_modules" ] || [ ! -d "client/node_modules" ] || [ ! -d "server/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install:all
    echo "✅ Dependencies installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating environment configuration..."
    cp .env.example .env
    echo "✅ Environment file created"
fi

# Create uploads directory if it doesn't exist
mkdir -p server/uploads
mkdir -p server/data

echo ""
echo "🌟 Starting development servers..."
echo "🔧 Backend: http://localhost:3001"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start the development environment
npm run dev
