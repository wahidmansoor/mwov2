// Test script to verify Supabase connection
// Run with: npx tsx test-supabase-connection.ts

import { supabaseClient } from '../client/src/lib/supabase/client.js';

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabaseClient
      .from('admission_criteria')
      .select('id, title')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('Sample data:', data);
    
  } catch (err) {
    console.error('❌ Connection test failed:', err);
  }
}

testConnection();
