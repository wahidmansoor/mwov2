import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for database seeding");
}

// Create the database connection
const client = postgres(databaseUrl);
const db = drizzle(client, { schema });

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Seed users
    console.log("👥 Seeding users...");
    await db.insert(schema.users).values([
      {
        id: "admin-1",
        email: "admin@oncovista.dev",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        department: "Administration",
        licenseNumber: "ADMIN001",
        isActive: true,
      },
      {
        id: "doctor-1",
        email: "doctor@oncovista.dev",
        firstName: "Dr. Sarah",
        lastName: "Johnson",
        role: "oncologist",
        department: "Oncology",
        licenseNumber: "ONC001",
        isActive: true,
      },
      {
        id: "nurse-1",
        email: "nurse@oncovista.dev",
        firstName: "Maria",
        lastName: "Garcia",
        role: "nurse",
        department: "Oncology",
        licenseNumber: "NUR001",
        isActive: true,
      }
    ]).onConflictDoNothing();

    // Seed clinical protocols
    console.log("📋 Seeding clinical protocols...");
    await db.insert(schema.clinicalProtocols).values([
      {
        name: "Breast Cancer Treatment Protocol",
        version: "2025.1",
        protocolType: "treatment",
        cancerType: "breast",
        stage: "stage_ii",
        content: {
          overview: "Comprehensive treatment protocol for Stage II breast cancer",
          steps: [
            "Initial staging and biomarker testing",
            "Neoadjuvant chemotherapy consideration",
            "Surgical planning",
            "Adjuvant therapy planning"
          ]
        },
        evidenceLevel: "level_1",
        guidelineSource: "NCCN",
        createdBy: "doctor-1",
        status: "active",
        approvalStatus: "approved",
        approvedBy: "admin-1",
        approvedAt: new Date(),
      },
      {
        name: "Lung Cancer Screening Protocol",
        version: "2025.1",
        protocolType: "screening",
        cancerType: "lung",
        content: {
          overview: "Lung cancer screening guidelines for high-risk patients",
          criteria: [
            "Age 50-80 years",
            "30+ pack-year smoking history",
            "Current smoker or quit within 15 years"
          ]
        },
        evidenceLevel: "level_1",
        guidelineSource: "USPSTF",
        createdBy: "doctor-1",
        status: "active",
        approvalStatus: "approved",
        approvedBy: "admin-1",
        approvedAt: new Date(),
      }
    ]).onConflictDoNothing();

    // Seed treatment protocols
    console.log("💊 Seeding treatment protocols...");
    await db.insert(schema.treatmentProtocols).values([
      {
        protocolCode: "AC-T",
        tumourGroup: "breast",
        protocolName: "Adriamycin and Cyclophosphamide followed by Taxol",
        indications: {
          primary: ["Early-stage breast cancer", "Node-positive breast cancer"],
          secondary: ["High-risk node-negative breast cancer"]
        },
        contraindications: {
          absolute: ["Severe cardiac dysfunction", "Severe neuropathy"],
          relative: ["Advanced age", "Multiple comorbidities"]
        },
        dosingSchedule: {
          cycles: 8,
          frequency: "Every 2-3 weeks",
          phases: [
            {
              name: "AC Phase",
              duration: "4 cycles",
              drugs: ["Adriamycin 60mg/m²", "Cyclophosphamide 600mg/m²"]
            },
            {
              name: "T Phase", 
              duration: "4 cycles",
              drugs: ["Taxol 175mg/m²"]
            }
          ]
        },
        toxicityProfile: {
          common: ["Nausea", "Fatigue", "Hair loss", "Neuropathy"],
          serious: ["Cardiac toxicity", "Severe neutropenia", "Secondary malignancy"]
        },
        monitoringRequirements: {
          labs: ["CBC", "CMP", "LFTs"],
          imaging: ["ECHO or MUGA"],
          frequency: "Before each cycle"
        }
      }
    ]).onConflictDoNothing();

    console.log("✅ Database seeding completed successfully!");
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run the seeding function
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };
