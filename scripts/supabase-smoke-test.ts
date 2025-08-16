#!/usr/bin/env tsx
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import { supabase } from '../src/lib/supabaseClient';
import * as queries from '../src/lib/db';

async function testConnection() {
  console.log('🧪 OncoVista Supabase Migration Smoke Test');
  console.log('==========================================\n');

  // Test basic connection
  console.log('1. Testing Supabase connection...');
  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.log('✅ Connection successful');
  } catch (error) {
    console.log('❌ Connection failed:', error);
    return false;
  }

  // Test sample queries across different table types
  const testTables = [
    // Core reference tables (READ-ONLY)
    { name: 'nccn_guidelines', query: queries.nccnGuidelines },
    { name: 'oncology_medications', query: queries.oncologyMedications },
    { name: 'performance_status_scales', query: queries.performanceStatusScales },
    
    // Protocol tables (WRITABLE)
    { name: 'treatment_protocols', query: queries.treatmentProtocols },
    { name: 'clinical_protocols', query: queries.clinicalProtocols },
    { name: 'emergency_protocols', query: queries.emergencyProtocols },
    
    // User/session tables
    { name: 'users', query: queries.users },
    { name: 'sessions', query: queries.sessions },
    
    // JSONB-heavy tables (watch for timestamp issues)
    { name: 'treatment_plan_criteria', query: queries.treatmentPlanCriteria },
    { name: 'treatment_plan_mappings', query: queries.treatmentPlanMappings },
  ];

  console.log('2. Testing query helpers...');
  let testsPassed = 0;
  
  for (const table of testTables) {
    try {
      console.log(`   Testing ${table.name}...`);
      const data = await table.query.list({ limit: 1 });
      console.log(`   ✅ ${table.name}: ${Array.isArray(data) ? data.length : 0} records accessible`);
      testsPassed++;
    } catch (error) {
      console.log(`   ❌ ${table.name}: ${error instanceof Error ? error.message : error}`);
    }
  }

  // Test JSONB validation concerns
  console.log('\n3. Testing JSONB field handling...');
  try {
    const mappingsData = await queries.treatmentPlanMappings.list({ limit: 1 });
    if (mappingsData.length > 0) {
      const sample = mappingsData[0];
      console.log('   Sample treatment_plan_mappings JSONB fields:');
      console.log('   - biomarkers:', typeof sample.biomarkers);
      console.log('   - conflicting_biomarkers:', typeof sample.conflicting_biomarkers);
      console.log('   - required_stage:', typeof sample.required_stage);
      console.log('   ⚠️  MIGRATION NOTE: JSONB fields contain complex data that may need validation');
    }
  } catch (error) {
    console.log('   ❌ JSONB validation failed:', error);
  }

  console.log('\n📊 Test Results:');
  console.log(`   Passed: ${testsPassed}/${testTables.length} table queries`);
  console.log(`   Success Rate: ${Math.round((testsPassed / testTables.length) * 100)}%`);
  
  if (testsPassed === testTables.length) {
    console.log('\n🎉 All tests passed! Supabase migration is ready.');
    return true;
  } else {
    console.log('\n⚠️  Some tests failed. Check connection and table access.');
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('💥 Smoke test crashed:', error);
    process.exit(1);
  });
