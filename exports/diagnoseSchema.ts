// diagnoseSchema.ts
import { db } from '../server/db.ts';
import * as fs from 'fs';

const failingTables = [
  'breakthrough_pain',
  'caregiver_scores',
  'educational_ai_interactions',
  'exam_preparation',
  'goals_of_care',
  'learning_progress',
  'learning_sessions',
  'psychosocial_screening',
  'referral_tracking',
  'resource_links',
  'session_logs',
];

async function diagnoseTables() {
  console.log('🔍 Diagnosing schema column mismatches...\n');
  const results: string[] = [];

  for (const tableName of failingTables) {
    try {
      const query = `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = '${tableName}'
        ORDER BY ordinal_position;
      `;

      const { rows } = await db.execute(query);
      results.push(`\n📋 Table: ${tableName}`);
      for (const row of rows as any[]) {
        results.push(`  - ${row.column_name} (${row.data_type})`);
      }
      console.log(`✅ ${tableName} — Columns fetched`);
    } catch (err: any) {
      results.push(`❌ Error reading ${tableName}: ${err.message}`);
      console.error(`❌ Failed to fetch columns for ${tableName}: ${err.message}`);
    }
  }

  const output = results.join('\n');
  fs.writeFileSync('./exports/schema-diagnosis.txt', output);
  console.log('\n📁 Saved to ./exports/schema-diagnosis.txt');
}

diagnoseTables();
