import { db } from './server/db.ts';
import { nccnGuidelines } from './shared/schema.ts';

/**
 * NCCN Gastric Cancer Guidelines v2.2025 Integration
 * Auto-generated from structured JSON
 */

async function importGastricGuidelines() {
  console.log('Starting NCCN Gastric Cancer v2.2025 guidelines import...');

  try {
    const gastricGuidelinesData = [
      {
        referenceCode: 'MS-2',
        title: 'Overview',
        category: 'Guideline',
        cancerType: 'Gastric Cancer',
        version: 'v2.2025',
        releaseDate: '2025-04-04',
        content: [
          {
            type: 'paragraph',
            text: 'The incidence of gastric cancer has decreased substantially...'
          },
          {
            type: 'bullet_point',
            text: 'Globally, there were more than 660,000 deaths in 2022...'
          },
          {
            type: 'reference',
            reference_number: '1',
            text: 'Torre LA, Siegel RL, Ward EM, Jemal A. Global cancer incidence and mortality rates and trends-an update.',
            url: 'https://www.ncbi.nlm.nih.gov/pubmed/26667886.'
          }
        ],
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All stages'],
        treatmentSettings: [],
        clinicalDecisionPoints: [],
        monitoringRequirements: [],
        biomarkerRequirements: [],
        crossReferences: [],
        updatesFromPrevious: 'Converted from structured document'
      },
      {
        referenceCode: 'GAST-1',
        title: 'Workup',
        category: 'Guideline',
        cancerType: 'Gastric Cancer',
        version: 'v2.2025',
        releaseDate: '2025-04-04',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'History and physical (H&P)'
          },
          {
            type: 'bullet_point',
            text: 'Esophagogastroduodenoscopy (EGD) and biopsia'
          },
          {
            type: 'table',
            table_title: null,
            header_rows: [["Workup", "Clinical Stage", "Additional Evaluation"]],
            rows: [
              ["History and physical (H&P)", "cTis or cT1a", "Recommend laparoscopy with cytology"],
              ["Esophagogastroduodenoscopy (EGD) and biopsia", "Medically fitk, potentially resectable", "Consider laparoscopy with cytology"]
            ],
            footnotes: [
              {
                footnote_letter: "a",
                text: "Principles of Endoscopic Staging and Therapy (GAST-A)."
              }
            ]
          },
          {
            type: 'footnote',
            footnote_letter: "i",
            text: "If H. pylori testing is positive, discuss recommendations with family members as appropriate. See Principles of Surveillance (GAST-H)."
          }
        ],
        evidenceLevel: 'Category 1',
        consensusLevel: 'Uniform NCCN Consensus',
        applicableStages: ['All stages'],
        treatmentSettings: [],
        clinicalDecisionPoints: [],
        monitoringRequirements: [],
        biomarkerRequirements: [],
        crossReferences: [],
        updatesFromPrevious: 'Converted from structured document'
      },
      // Additional entries like GAST-3, GAST-F, ABBR-1 can follow similarly
    ];

    console.log('Inserting Gastric Cancer guidelines...');
    for (const guideline of gastricGuidelinesData) {
      await db.insert(nccnGuidelines).values(guideline).onConflictDoNothing();
    }

    console.log(`✅ NCCN Gastric Cancer v2.2025 import complete! Inserted ${gastricGuidelinesData.length} entries.`);

  } catch (error) {
    console.error('❌ Error importing Gastric Cancer guidelines:', error);
    throw error;
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  importGastricGuidelines()
    .then(() => {
      console.log('Import completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Import failed:', error);
      process.exit(1);
    });
}

export { importGastricGuidelines };
