#!/bin/bash

echo "🧪 OncoVista Integration Testing (Supabase + Netlify)"
echo "===================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "SUCCESS") echo -e "${GREEN}✅ $message${NC}" ;;
        "WARNING") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "ERROR") echo -e "${RED}❌ $message${NC}" ;;
        "INFO") echo -e "${BLUE}ℹ️  $message${NC}" ;;
    esac
}

# Test counter
tests_passed=0
tests_failed=0

echo "🔍 PHASE 3C: INTEGRATION TESTING"
echo "================================"
echo ""

print_status "INFO" "Testing Supabase + Netlify integration..."
echo ""

# Test 1: Environment Variables
echo "1️⃣  Testing Environment Variables"
echo "--------------------------------"

if [ -f ".env" ]; then
    print_status "SUCCESS" "Environment file exists"
    ((tests_passed++))
else
    print_status "ERROR" "Environment file missing"
    ((tests_failed++))
fi

if [ -f ".env.production" ]; then
    print_status "SUCCESS" "Production environment template exists"
    ((tests_passed++))
else
    print_status "WARNING" "Production environment template missing"
fi

# Check for required Supabase variables
required_vars=("VITE_SUPABASE_URL" "VITE_SUPABASE_ANON_KEY" "SUPABASE_SERVICE_KEY")
for var in "${required_vars[@]}"; do
    if grep -q "$var" .env; then
        print_status "SUCCESS" "$var defined in environment"
        ((tests_passed++))
    else
        print_status "ERROR" "$var missing from environment"
        ((tests_failed++))
    fi
done

echo ""

# Test 2: Dependencies
echo "2️⃣  Testing Dependencies"
echo "-----------------------"

# Check client dependencies
if [ -f "client/package.json" ] && grep -q "@supabase/supabase-js" client/package.json; then
    print_status "SUCCESS" "Supabase client library in package.json"
    ((tests_passed++))
else
    print_status "ERROR" "Supabase client library missing"
    ((tests_failed++))
fi

if [ -d "client/node_modules/@supabase" ]; then
    print_status "SUCCESS" "Supabase dependencies installed"
    ((tests_passed++))
else
    print_status "WARNING" "Supabase dependencies not installed - run npm install"
fi

# Check Netlify functions dependencies
if [ -f "netlify/functions/package.json" ]; then
    print_status "SUCCESS" "Netlify functions package.json exists"
    ((tests_passed++))
else
    print_status "ERROR" "Netlify functions package.json missing"
    ((tests_failed++))
fi

echo ""

# Test 3: Configuration Files
echo "3️⃣  Testing Configuration Files"
echo "------------------------------"

if [ -f "netlify.toml" ]; then
    print_status "SUCCESS" "netlify.toml exists"
    
    # Check build command
    if grep -q "cd client && npm run build" netlify.toml; then
        print_status "SUCCESS" "Build command correctly configured"
        ((tests_passed++))
    else
        print_status "ERROR" "Build command not configured correctly"
        ((tests_failed++))
    fi
    
    # Check publish directory
    if grep -q "publish = \"client/dist\"" netlify.toml; then
        print_status "SUCCESS" "Publish directory correctly configured"
        ((tests_passed++))
    else
        print_status "ERROR" "Publish directory not configured correctly"
        ((tests_failed++))
    fi
    
    # Check functions directory
    if grep -q "functions = \"netlify/functions\"" netlify.toml; then
        print_status "SUCCESS" "Functions directory correctly configured"
        ((tests_passed++))
    else
        print_status "ERROR" "Functions directory not configured correctly"
        ((tests_failed++))
    fi
    
else
    print_status "ERROR" "netlify.toml missing"
    ((tests_failed++))
fi

echo ""

# Test 4: Build Process
echo "4️⃣  Testing Build Process"
echo "------------------------"

print_status "INFO" "Testing client build..."

if cd client && npm run build > /dev/null 2>&1; then
    print_status "SUCCESS" "Client builds successfully"
    ((tests_passed++))
    
    # Check if dist directory was created
    if [ -d "dist" ]; then
        print_status "SUCCESS" "Build output directory created"
        ((tests_passed++))
        
        # Check for essential files
        if [ -f "dist/index.html" ]; then
            print_status "SUCCESS" "index.html generated"
            ((tests_passed++))
        else
            print_status "ERROR" "index.html not generated"
            ((tests_failed++))
        fi
        
        if ls dist/assets/*.js > /dev/null 2>&1; then
            print_status "SUCCESS" "JavaScript bundles generated"
            ((tests_passed++))
        else
            print_status "ERROR" "JavaScript bundles not generated"
            ((tests_failed++))
        fi
        
        if ls dist/assets/*.css > /dev/null 2>&1; then
            print_status "SUCCESS" "CSS bundles generated"
            ((tests_passed++))
        else
            print_status "WARNING" "CSS bundles not found (might be inlined)"
        fi
        
    else
        print_status "ERROR" "Build output directory not created"
        ((tests_failed++))
    fi
    
else
    print_status "ERROR" "Client build failed"
    ((tests_failed++))
fi

cd ..

echo ""

# Test 5: Supabase Integration
echo "5️⃣  Testing Supabase Integration"
echo "-------------------------------"

if [ -f "client/src/lib/supabase.js" ]; then
    print_status "SUCCESS" "Supabase client configuration exists"
    ((tests_passed++))
else
    print_status "ERROR" "Supabase client configuration missing"
    ((tests_failed++))
fi

if [ -f "supabase/config.toml" ]; then
    print_status "SUCCESS" "Supabase project configuration exists"
    ((tests_passed++))
else
    print_status "WARNING" "Supabase project configuration missing (run supabase init)"
fi

echo ""

# Test 6: Netlify Functions
echo "6️⃣  Testing Netlify Functions"
echo "----------------------------"

if [ -f "netlify/functions/api.js" ]; then
    print_status "SUCCESS" "Netlify API function exists"
    ((tests_passed++))
else
    print_status "ERROR" "Netlify API function missing"
    ((tests_failed++))
fi

# Check for proper imports in the function
if [ -f "netlify/functions/api.js" ] && grep -q "@supabase/supabase-js" netlify/functions/api.js; then
    print_status "SUCCESS" "Netlify function imports Supabase"
    ((tests_passed++))
else
    print_status "ERROR" "Netlify function doesn't import Supabase"
    ((tests_failed++))
fi

echo ""

# Test 7: Route Configuration
echo "7️⃣  Testing Route Configuration"
echo "------------------------------"

# Check for SPA redirects
if grep -q "from = \"/\*\"" netlify.toml && grep -q "to = \"/index.html\"" netlify.toml; then
    print_status "SUCCESS" "SPA routing redirects configured"
    ((tests_passed++))
else
    print_status "ERROR" "SPA routing redirects not configured"
    ((tests_failed++))
fi

# Check for API redirects
if grep -q "from = \"/api/\*\"" netlify.toml && grep -q "to = \"/.netlify/functions/api" netlify.toml; then
    print_status "SUCCESS" "API routing redirects configured"
    ((tests_passed++))
else
    print_status "ERROR" "API routing redirects not configured"
    ((tests_failed++))
fi

echo ""

# Test 8: Security Headers
echo "8️⃣  Testing Security Configuration"
echo "--------------------------------"

security_headers=("X-Frame-Options" "X-Content-Type-Options" "X-XSS-Protection")
for header in "${security_headers[@]}"; do
    if grep -q "$header" netlify.toml; then
        print_status "SUCCESS" "$header configured"
        ((tests_passed++))
    else
        print_status "WARNING" "$header not configured"
    fi
done

echo ""

# Final Report
echo "📊 INTEGRATION TEST RESULTS"
echo "=========================="
echo ""
echo "Tests Passed: $tests_passed"
echo "Tests Failed: $tests_failed"
total_tests=$((tests_passed + tests_failed))
echo "Total Tests: $total_tests"
echo ""

if [ $tests_failed -eq 0 ]; then
    print_status "SUCCESS" "All critical tests passed! 🎉"
    print_status "INFO" "Your Supabase + Netlify integration is ready for deployment"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Set up your Supabase project and get credentials"
    echo "2. Update environment variables in .env"
    echo "3. Set environment variables in Netlify dashboard"
    echo "4. Deploy to Netlify"
    exit 0
elif [ $tests_failed -le 3 ]; then
    print_status "WARNING" "Some tests failed, but integration should work with fixes"
    echo ""
    echo "🔧 Required Actions:"
    echo "1. Review failed tests above"
    echo "2. Fix configuration issues"
    echo "3. Re-run this test"
    exit 1
else
    print_status "ERROR" "Multiple critical tests failed"
    echo ""
    echo "❌ Critical Issues Found:"
    echo "1. Review all failed tests above"
    echo "2. Check project structure and configuration"
    echo "3. Ensure all dependencies are installed"
    exit 2
fi
