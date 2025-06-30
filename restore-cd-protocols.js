/**
 * Restore CD Protocols from backup JSON
 * Restores all 156 authentic NCCN protocols to cd_protocols table
 */

import { db } from "./server/db.js";
import { cdProtocols } from "./shared/schema.js";
import fs from 'fs';

async function restoreCdProtocols() {
  try {
    console.log("Starting CD protocols restoration...");
    
    // Read backup data
    const backupData = JSON.parse(fs.readFileSync('./exports/exports/cdProtocols.json', 'utf8'));
    console.log(`Found ${backupData.length} protocols in backup`);
    
    // Transform and insert protocols in batches
    const batchSize = 10;
    let insertedCount = 0;
    
    for (let i = 0; i < backupData.length; i += batchSize) {
      const batch = backupData.slice(i, i + batchSize);
      
      const transformedBatch = batch.map(protocol => ({
        id: protocol.id,
        code: protocol.code,
        tumourGroup: protocol.tumourGroup,
        tumourSupergroup: protocol.tumourSupergroup,
        treatmentIntent: protocol.treatmentIntent,
        summary: protocol.summary,
        eligibility: protocol.eligibility,
        precautions: protocol.precautions,
        treatment: protocol.treatment,
        tests: protocol.tests,
        doseModifications: protocol.doseModifications,
        referenceList: protocol.referenceList,
        cycleInfo: protocol.cycleInfo,
        preMedications: protocol.preMedications,
        postMedications: protocol.postMedications,
        supportiveCare: protocol.supportiveCare,
        rescueAgents: protocol.rescueAgents,
        monitoring: protocol.monitoring,
        toxicityMonitoring: protocol.toxicityMonitoring,
        interactions: protocol.interactions,
        contraindications: protocol.contraindications,
        version: protocol.version || "1.0",
        status: protocol.status || "active",
        createdBy: protocol.createdBy,
        updatedBy: protocol.updatedBy,
        createdAt: protocol.createdAt ? new Date(protocol.createdAt) : new Date(),
        updatedAt: protocol.updatedAt ? new Date(protocol.updatedAt) : new Date(),
        lastReviewed: protocol.lastReviewed ? new Date(protocol.lastReviewed) : new Date()
      }));
      
      await db.insert(cdProtocols).values(transformedBatch);
      insertedCount += transformedBatch.length;
      console.log(`Restored ${insertedCount}/${backupData.length} protocols`);
    }
    
    console.log(`✓ Successfully restored ${insertedCount} CD protocols from backup`);
    
    // Verify restoration
    const count = await db.select().from(cdProtocols);
    console.log(`✓ Database now contains ${count.length} total protocols`);
    
    // Show sample of restored protocols
    const sample = count.slice(0, 5).map(p => ({ code: p.code, tumourGroup: p.tumourGroup, treatmentIntent: p.treatmentIntent }));
    console.log("Sample restored protocols:", sample);
    
  } catch (error) {
    console.error("Failed to restore CD protocols:", error);
    process.exit(1);
  }
}

restoreCdProtocols();