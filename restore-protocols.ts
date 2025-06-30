/**
 * Restore CD Protocols from backup JSON
 * Restores all 156 authentic NCCN protocols to cd_protocols table
 */

import { db } from "./server/db";
import { cdProtocols } from "./shared/schema";
import fs from 'fs';

async function restoreCdProtocols() {
  try {
    console.log("Starting CD protocols restoration...");
    
    // Read backup data
    const backupData = JSON.parse(fs.readFileSync('./exports/exports/cdProtocols.json', 'utf8'));
    console.log(`Found ${backupData.length} protocols in backup`);
    
    // Transform and insert protocols in batches of 5 to avoid memory issues
    const batchSize = 5;
    let insertedCount = 0;
    
    for (let i = 0; i < backupData.length; i += batchSize) {
      const batch = backupData.slice(i, i + batchSize);
      
      const transformedBatch = batch.map((protocol: any) => ({
        id: protocol.id,
        code: protocol.code,
        tumourGroup: protocol.tumourGroup,
        tumourSupergroup: protocol.tumourSupergroup || protocol.tumourGroup,
        treatmentIntent: protocol.treatmentIntent,
        summary: protocol.summary,
        eligibility: typeof protocol.eligibility === 'string' ? JSON.parse(protocol.eligibility) : protocol.eligibility,
        precautions: Array.isArray(protocol.precautions) ? protocol.precautions : JSON.parse(protocol.precautions || '[]'),
        treatment: typeof protocol.treatment === 'string' ? JSON.parse(protocol.treatment) : protocol.treatment,
        tests: Array.isArray(protocol.tests) ? protocol.tests : JSON.parse(protocol.tests || '[]'),
        doseModifications: typeof protocol.doseModifications === 'string' ? JSON.parse(protocol.doseModifications) : protocol.doseModifications,
        referenceList: Array.isArray(protocol.referenceList) ? protocol.referenceList : JSON.parse(protocol.referenceList || '[]'),
        cycleInfo: typeof protocol.cycleInfo === 'string' ? JSON.parse(protocol.cycleInfo) : protocol.cycleInfo,
        preMedications: typeof protocol.preMedications === 'string' ? JSON.parse(protocol.preMedications) : protocol.preMedications,
        postMedications: typeof protocol.postMedications === 'string' ? JSON.parse(protocol.postMedications) : protocol.postMedications,
        supportiveCare: typeof protocol.supportiveCare === 'string' ? JSON.parse(protocol.supportiveCare) : protocol.supportiveCare,
        rescueAgents: typeof protocol.rescueAgents === 'string' ? JSON.parse(protocol.rescueAgents) : protocol.rescueAgents,
        monitoring: typeof protocol.monitoring === 'string' ? JSON.parse(protocol.monitoring) : protocol.monitoring,
        toxicityMonitoring: typeof protocol.toxicityMonitoring === 'string' ? JSON.parse(protocol.toxicityMonitoring) : protocol.toxicityMonitoring,
        interactions: typeof protocol.interactions === 'string' ? JSON.parse(protocol.interactions) : protocol.interactions,
        contraindications: Array.isArray(protocol.contraindications) ? protocol.contraindications : JSON.parse(protocol.contraindications || '[]'),
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
    process.exit(0);
    
  } catch (error) {
    console.error("Failed to restore CD protocols:", error);
    process.exit(1);
  }
}

restoreCdProtocols();