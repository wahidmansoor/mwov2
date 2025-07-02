#!/bin/bash

echo "🚀 Setting up Supabase Database for OncoVista"
echo "============================================="

# Check if environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable not found"
    echo "📋 Please set your Supabase database URL in .env file"
    exit 1
fi

if [ -z "$VITE_SUPABASE_URL" ]; then
    echo "❌ VITE_SUPABASE_URL environment variable not found" 
    echo "📋 Please set your Supabase project URL in .env file"
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Navigate to server directory
cd server

echo "📦 Installing/updating dependencies..."
npm install

echo ""
echo "🔄 Generating database migrations..."
npm run db:generate

echo ""
echo "🏗️  Running database migrations..."
npm run db:migrate

echo ""
echo "✅ Database setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Your Supabase database schema has been created"
echo "2. Tables are ready for OncoVista data"
echo "3. You can now start the development server with: npm run dev"
echo ""
echo "📊 Useful commands:"
echo "- npm run db:studio    # Open Drizzle Studio to view your database"
echo "- npm run db:generate  # Generate new migrations after schema changes"
echo "- npm run db:migrate   # Apply migrations to database"
echo ""
echo "🌐 Access your Supabase dashboard at: https://supabase.com/dashboard"
