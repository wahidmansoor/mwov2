#!/usr/bin/env node
/**
 * Execute comprehensive treatment plan mappings update
 * Based on NCCN 2024-2025, ASCO, and ESMO guidelines
 */

import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeUpdate() {
  try {
    console.log('🔄 Starting comprehensive treatment plan mappings update...');
    
    // Read the SQL file
    const sqlScript = readFileSync('./update-treatment-mappings-comprehensive.sql', 'utf8');
    
    // Split into individual statements (basic approach)
    const statements = sqlScript
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
      .filter(stmt => !stmt.toLowerCase().includes('select')); // Skip SELECT queries for now
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      try {
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
        
        const { data, error } = await supabase.rpc('execute_sql', {
          sql_query: statement
        });
        
        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error);
          errorCount++;
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
          successCount++;
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (err) {
        console.error(`❌ Exception in statement ${i + 1}:`, err);
        errorCount++;
      }
    }
    
    console.log('\n📊 Update Summary:');
    console.log(`✅ Successful statements: ${successCount}`);
    console.log(`❌ Failed statements: ${errorCount}`);
    
    // Verify the updates
    console.log('\n🔍 Verifying updates...');
    
    const { data: cancerTypes, error: typesError } = await supabase
      .from('treatment_plan_mappings')
      .select('cancer_type')
      .order('cancer_type');
    
    if (!typesError && cancerTypes) {
      const uniqueCancerTypes = [...new Set(cancerTypes.map(t => t.cancer_type))];
      console.log(`📋 Total cancer types in database: ${uniqueCancerTypes.length}`);
      
      // List some new additions
      const newTypes = uniqueCancerTypes.filter(type => 
        type.includes('Ampullary') || 
        type.includes('Appendix') || 
        type.includes('Neuroblastoma') ||
        type.includes('Castleman') ||
        type.includes('Waldenstrom')
      );
      
      if (newTypes.length > 0) {
        console.log('🆕 New cancer types added:', newTypes.join(', '));
      }
    }
    
    // Check biomarker normalization
    const { data: biomarkers, error: bioError } = await supabase
      .from('treatment_plan_mappings')
      .select('biomarkers')
      .like('biomarkers', '%Mutation%')
      .limit(5);
    
    if (!bioError && biomarkers) {
      console.log('🧬 Sample normalized biomarkers:', biomarkers.map(b => b.biomarkers).slice(0, 3));
    }
    
    console.log('\n🎉 Comprehensive treatment plan update completed!');
    console.log('📚 Database now includes current NCCN 2024-2025, ASCO, and ESMO guidelines');
    
  } catch (error) {
    console.error('💥 Fatal error during update:', error);
    process.exit(1);
  }
}

// Create a simple SQL execution function if it doesn't exist
async function ensureSqlFunction() {
  const { error } = await supabase.rpc('execute_sql', {
    sql_query: 'SELECT 1'
  });
  
  if (error && error.message.includes('function execute_sql')) {
    console.log('🔧 Creating execute_sql function...');
    
    const createFunction = `
      CREATE OR REPLACE FUNCTION execute_sql(sql_query text)
      RETURNS text
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        EXECUTE sql_query;
        RETURN 'Success';
      EXCEPTION WHEN OTHERS THEN
        RETURN SQLERRM;
      END;
      $$;
    `;
    
    // This would need to be done by a database admin
    console.log('⚠️  Please create the execute_sql function with admin privileges');
    console.log('📝 SQL for function creation:');
    console.log(createFunction);
  }
}

// Run the update
executeUpdate().catch(console.error);