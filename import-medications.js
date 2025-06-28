import fs from 'fs';
import { db } from './server/db.ts';
import { oncologyMedications } from './shared/schema.ts';

async function importMedications() {
  try {
    console.log('Starting medication import...');
    
    // Read the medications file
    const fileContent = fs.readFileSync('./attached_assets/medications_1751127045971.txt', 'utf8');
    
    // Parse the JSON data
    const jsonData = JSON.parse(fileContent);
    
    // Extract medications from the nested structure
    let allMedications = [];
    
    // Handle the specific structure in the file
    if (Array.isArray(jsonData)) {
      jsonData.forEach(item => {
        if (item.json_agg && Array.isArray(item.json_agg)) {
          allMedications.push(...item.json_agg);
        }
      });
    }
    
    console.log(`Found ${allMedications.length} medications to import`);
    
    // Transform data to match our schema
    const transformedMedications = allMedications.map(med => {
      // Handle side_effects format variations
      let sideEffects = {};
      if (Array.isArray(med.side_effects)) {
        // If it's an array, treat as common side effects
        sideEffects = {
          common: med.side_effects,
          serious: []
        };
      } else if (med.side_effects && typeof med.side_effects === 'object') {
        sideEffects = med.side_effects;
      }
      
      // Handle interactions format variations
      let interactions = {};
      if (Array.isArray(med.interactions)) {
        interactions = { drugs: med.interactions };
      } else if (med.interactions && typeof med.interactions === 'object') {
        interactions = med.interactions;
      }
      
      return {
        id: med.id,
        name: med.name,
        brandNames: med.brand_names || [],
        classification: med.classification,
        mechanism: med.mechanism,
        administration: med.administration,
        indications: med.indications || { cancer_types: [] },
        dosing: med.dosing || { standard: '' },
        sideEffects: sideEffects,
        monitoring: med.monitoring || { labs: [], frequency: '', precautions: [] },
        interactions: interactions,
        referenceSources: med.reference_sources || [],
        summary: med.summary || '',
        blackBoxWarning: med.black_box_warning,
        specialConsiderations: med.special_considerations || {},
        pharmacokinetics: med.pharmacokinetics || {},
        contraindications: med.contraindications || [],
        routineMonitoring: med.routine_monitoring || [],
        preTreatmentTests: med.pre_treatment_tests || [],
        isChemotherapy: med.is_chemotherapy || false,
        isImmunotherapy: med.is_immunotherapy || false,
        isTargetedTherapy: med.is_targeted_therapy || false,
        isOrphanDrug: med.is_orphan_drug || false,
        createdAt: new Date(med.created_at),
        updatedAt: new Date(med.updated_at)
      };
    });
    
    // Clear existing medications
    console.log('Clearing existing medications...');
    await db.delete(oncologyMedications);
    
    // Insert medications in batches
    const batchSize = 50;
    let importedCount = 0;
    
    for (let i = 0; i < transformedMedications.length; i += batchSize) {
      const batch = transformedMedications.slice(i, i + batchSize);
      
      try {
        await db.insert(oncologyMedications).values(batch);
        importedCount += batch.length;
        console.log(`Imported ${importedCount}/${transformedMedications.length} medications`);
      } catch (error) {
        console.error(`Error importing batch ${i}-${i + batchSize}:`, error);
        
        // Try inserting individually to identify problematic records
        for (const med of batch) {
          try {
            await db.insert(oncologyMedications).values([med]);
            importedCount++;
          } catch (individualError) {
            console.error(`Failed to import medication: ${med.name}`, individualError);
          }
        }
      }
    }
    
    console.log(`Successfully imported ${importedCount} medications`);
    
    // Verify import
    const count = await db.select().from(oncologyMedications);
    console.log(`Total medications in database: ${count.length}`);
    
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

// Run the import
importMedications()
  .then(() => {
    console.log('Import completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });