/**
 * Restore CD Protocols using direct SQL approach
 * Handles PostgreSQL array formatting properly
 */

import fs from 'fs';
import pg from 'pg';
const { Client } = pg;

async function restoreProtocols() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log("Connected to database");
    
    // Read backup data
    const backupData = JSON.parse(fs.readFileSync('./exports/exports/cdProtocols.json', 'utf8'));
    console.log(`Found ${backupData.length} protocols in backup`);
    
    // Process in small batches
    let insertedCount = 0;
    
    for (const protocol of backupData) {
      try {
        // Format arrays for PostgreSQL
        const precautions = Array.isArray(protocol.precautions) 
          ? `{${protocol.precautions.map(p => `"${p.replace(/"/g, '\\"')}"`).join(',')}}`
          : '{}';
          
        const tests = Array.isArray(protocol.tests)
          ? `{${protocol.tests.map(t => `"${t.replace(/"/g, '\\"')}"`).join(',')}}`
          : '{}';
          
        const referenceList = Array.isArray(protocol.referenceList)
          ? `{${protocol.referenceList.map(r => `"${r.replace(/"/g, '\\"')}"`).join(',')}}`
          : '{}';
          
        const contraindications = Array.isArray(protocol.contraindications)
          ? `{${protocol.contraindications.map(c => `"${c.replace(/"/g, '\\"')}"`).join(',')}}`
          : '{}';

        const query = `
          INSERT INTO cd_protocols (
            id, code, tumour_group, tumour_supergroup, treatment_intent, summary,
            eligibility, precautions, treatment, tests, dose_modifications,
            reference_list, cycle_info, pre_medications, post_medications,
            supportive_care, rescue_agents, monitoring, toxicity_monitoring,
            interactions, contraindications, version, status, created_at, updated_at, last_reviewed
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
        `;

        const values = [
          protocol.id,
          protocol.code,
          protocol.tumourGroup,
          protocol.tumourSupergroup || protocol.tumourGroup,
          protocol.treatmentIntent,
          protocol.summary,
          JSON.stringify(protocol.eligibility),
          precautions,
          JSON.stringify(protocol.treatment),
          tests,
          JSON.stringify(protocol.doseModifications),
          referenceList,
          JSON.stringify(protocol.cycleInfo),
          JSON.stringify(protocol.preMedications),
          JSON.stringify(protocol.postMedications),
          JSON.stringify(protocol.supportiveCare),
          JSON.stringify(protocol.rescueAgents),
          JSON.stringify(protocol.monitoring),
          JSON.stringify(protocol.toxicityMonitoring),
          JSON.stringify(protocol.interactions),
          contraindications,
          protocol.version || "1.0",
          protocol.status || "active",
          new Date(protocol.createdAt || Date.now()),
          new Date(protocol.updatedAt || Date.now()),
          new Date(protocol.lastReviewed || Date.now())
        ];

        await client.query(query, values);
        insertedCount++;
        
        if (insertedCount % 10 === 0) {
          console.log(`Restored ${insertedCount}/${backupData.length} protocols`);
        }
        
      } catch (error) {
        console.error(`Failed to insert protocol ${protocol.code}:`, error.message);
        continue;
      }
    }
    
    console.log(`✓ Successfully restored ${insertedCount}/${backupData.length} CD protocols`);
    
  } catch (error) {
    console.error("Failed to restore protocols:", error);
  } finally {
    await client.end();
  }
}

restoreProtocols();