#!/usr/bin/env node

import http from 'http';

function makeRequest(path, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5001,
      path,
      method,
      headers: {
        'User-Agent': 'ServerTest/1.0',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

async function runTests() {
  console.log('🔍 Testing upgraded server...\n');

  try {
    // Test 1: Original health endpoint
    console.log('1. Testing /api/health');
    const health = await makeRequest('/api/health');
    console.log(`   Status: ${health.statusCode}`);
    console.log(`   Body: ${health.body}`);
    console.log(`   Security Headers:`);
    console.log(`     X-Content-Type-Options: ${health.headers['x-content-type-options'] || 'Missing'}`);
    console.log(`     X-Frame-Options: ${health.headers['x-frame-options'] || 'Missing'}`);
    console.log(`     X-DNS-Prefetch-Control: ${health.headers['x-dns-prefetch-control'] || 'Missing'}`);
    
    // Test 2: New healthz endpoint
    console.log('\n2. Testing /api/healthz');
    const healthz = await makeRequest('/api/healthz');
    console.log(`   Status: ${healthz.statusCode}`);
    console.log(`   Body: ${healthz.body}`);
    
    // Test 3: CORS preflight
    console.log('\n3. Testing CORS preflight');
    const cors = await makeRequest('/api/health', 'OPTIONS', {
      'Origin': 'http://localhost:5173',
      'Access-Control-Request-Method': 'GET'
    });
    console.log(`   Status: ${cors.statusCode}`);
    console.log(`   CORS Headers:`);
    console.log(`     Access-Control-Allow-Origin: ${cors.headers['access-control-allow-origin'] || 'Missing'}`);
    console.log(`     Access-Control-Allow-Methods: ${cors.headers['access-control-allow-methods'] || 'Missing'}`);
    
    // Test 4: Rate limit headers
    console.log('\n4. Testing rate limit headers');
    const rateLimited = await makeRequest('/api/health');
    console.log(`   Status: ${rateLimited.statusCode}`);
    console.log(`   Rate Limit Headers:`);
    console.log(`     X-RateLimit-Limit: ${rateLimited.headers['x-ratelimit-limit'] || 'Missing'}`);
    console.log(`     X-RateLimit-Remaining: ${rateLimited.headers['x-ratelimit-remaining'] || 'Missing'}`);
    console.log(`     X-RateLimit-Reset: ${rateLimited.headers['x-ratelimit-reset'] || 'Missing'}`);
    
    console.log('\n✅ All basic tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

runTests().catch(console.error);
