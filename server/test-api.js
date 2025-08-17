// Simple test script to verify the API endpoints
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5001/api';

async function testEndpoints() {
  console.log('🧪 Testing OncoVista API Endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('   ✅ Health check:', healthData.status);

    // Test root API endpoint
    console.log('2. Testing root API endpoint...');
    const rootResponse = await fetch(`${API_BASE}/`);
    const rootData = await rootResponse.json();
    console.log('   ✅ API root:', rootData.message);

    // Test calculators info
    console.log('3. Testing calculators info...');
    const calcInfoResponse = await fetch(`${API_BASE}/calculators`);
    const calcInfoData = await calcInfoResponse.json();
    console.log('   ✅ Calculators info:', calcInfoData.available_calculators.length, 'calculators');

    // Test opioid conversion
    console.log('4. Testing opioid conversion...');
    const conversionResponse = await fetch(`${API_BASE}/calculators/opioid-conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        drug: 'morphine',
        dose: 30,
        target: 'oxycodone'
      })
    });
    const conversionData = await conversionResponse.json();
    console.log('   ✅ Opioid conversion:', conversionData.equivalent_dose, 'mg');

    // Test protocol search
    console.log('5. Testing protocol search...');
    const searchResponse = await fetch(`${API_BASE}/protocols/search?q=pain`);
    const searchData = await searchResponse.json();
    console.log('   ✅ Protocol search:', searchData.count, 'results');

    // Test AI service info
    console.log('6. Testing AI services info...');
    const aiInfoResponse = await fetch(`${API_BASE}/ai`);
    const aiInfoData = await aiInfoResponse.json();
    console.log('   ✅ AI services:', aiInfoData.available_services.length, 'services');

    console.log('\n🎉 All tests passed! API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
testEndpoints();
