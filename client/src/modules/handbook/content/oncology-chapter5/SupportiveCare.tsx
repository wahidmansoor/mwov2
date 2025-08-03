import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Users, Activity, AlertTriangle, Pill, Thermometer } from "lucide-react";

export default function SupportiveCare() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            Chapter 5: Supportive Care in Oncology
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Symptom Management</Badge>
            <Badge variant="outline">Infection Prevention</Badge>
            <Badge variant="outline">Nutritional Support</Badge>
            <Badge variant="outline">Psychosocial Care</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Supportive care encompasses the prevention and management of treatment-related toxicities, symptom control, and optimization of quality of life throughout the cancer care continuum. Effective supportive care enables patients to tolerate intensive treatments and maintain functional capacity.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter covers evidence-based approaches to managing common oncologic complications including febrile neutropenia, mucositis, nausea and vomiting, fatigue, and psychological distress, emphasizing prevention strategies and early intervention principles.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Thermometer className="h-5 w-5 text-red-600" />
              Infection Prevention and Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Febrile Neutropenia</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Definition:</strong> Fever ≥38.3°C with ANC &lt;500 cells/μL</li>
                  <li>• <strong>Risk Stratification:</strong> MASCC score for outpatient management</li>
                  <li>• <strong>Empirical Antibiotics:</strong> Piperacillin-tazobactam, cefepime</li>
                  <li>• <strong>Duration:</strong> Until ANC recovery or afebrile 48-72 hours</li>
                  <li>• <strong>Antifungal Therapy:</strong> Consider after 4-7 days persistent fever</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Prophylactic Strategies</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>G-CSF Support:</strong> Primary prophylaxis for high-risk regimens</li>
                  <li>• <strong>Antimicrobial Prophylaxis:</strong> Fluoroquinolones for high-risk patients</li>
                  <li>• <strong>Antifungal Prophylaxis:</strong> Fluconazole or posaconazole</li>
                  <li>• <strong>PCP Prophylaxis:</strong> TMP-SMX for prolonged steroid use</li>
                  <li>• <strong>Vaccination:</strong> Inactivated vaccines before treatment</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Infection Control Measures</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Hand Hygiene:</strong> Most effective prevention strategy</li>
                  <li>• <strong>Protective Isolation:</strong> Neutropenic precautions</li>
                  <li>• <strong>Environmental Controls:</strong> HEPA filtration, positive pressure</li>
                  <li>• <strong>Dietary Restrictions:</strong> Low-microbial diet considerations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pill className="h-5 w-5 text-green-600" />
              Chemotherapy-Induced Nausea and Vomiting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Emetogenic Classification</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <div className="font-medium text-xs">High Emetogenic (&gt;90%)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Cisplatin, cyclophosphamide (high-dose), dacarbazine</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                    <div className="font-medium text-xs">Moderate Emetogenic (30-90%)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Carboplatin, doxorubicin, cyclophosphamide (low-dose)</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2">
                    <div className="font-medium text-xs">Low Emetogenic (10-30%)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">5-FU, gemcitabine, paclitaxel, cetuximab</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Minimal Emetogenic (&lt;10%)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Bleomycin, rituximab, bevacizumab</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Antiemetic Regimens</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>5-HT3 Antagonists:</strong> Ondansetron, granisetron, palonosetron</li>
                  <li>• <strong>NK1 Antagonists:</strong> Aprepitant, fosaprepitant, rolapitant</li>
                  <li>• <strong>Corticosteroids:</strong> Dexamethasone 12mg IV pre-chemotherapy</li>
                  <li>• <strong>Olanzapine:</strong> 10mg PO for breakthrough nausea</li>
                  <li>• <strong>Metoclopramide:</strong> Delayed nausea management</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Non-Pharmacological Approaches</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Acupuncture:</strong> Evidence-based complementary therapy</li>
                  <li>• <strong>Ginger:</strong> Natural anti-nausea supplement</li>
                  <li>• <strong>Behavioral Techniques:</strong> Progressive muscle relaxation</li>
                  <li>• <strong>Dietary Modifications:</strong> Small frequent meals, avoid triggers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Mucositis and Dermatologic Toxicities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Mucositis and skin toxicities are common dose-limiting side effects that can significantly impact quality of life and treatment adherence.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Oral Mucositis
              </h4>
              <div className="space-y-2">
                <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                  <div className="font-medium text-xs">Prevention</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Oral care protocols, cryotherapy</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                  <div className="font-medium text-xs">Treatment</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Magic mouthwash, palifermin</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                  <div className="font-medium text-xs">Pain Management</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Topical anesthetics, systemic opioids</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Radiation Dermatitis
              </h4>
              <div className="space-y-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Grading</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">CTCAE v5.0 criteria</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Management</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Gentle cleansing, moisturizers</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Severe Cases</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Silver sulfadiazine, hydrogel dressings</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Hand-Foot Syndrome
              </h4>
              <div className="space-y-2">
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Prevention</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Moisturizing, avoid heat/friction</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Treatment</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Topical urea, dose modifications</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Agents</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Capecitabine, sunitinib, sorafenib</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Proactive Management Philosophy:</strong> Early identification and intervention for treatment-related toxicities improves outcomes and quality of life. Patient education about expected side effects and when to seek medical attention is essential for optimal supportive care delivery.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-600" />
            Psychosocial Support and Survivorship
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Psychological Support Services</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Distress Screening</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• National Comprehensive Cancer Network (NCCN) Distress Thermometer</li>
                    <li>• Regular assessment at key time points</li>
                    <li>• Problem list identification and prioritization</li>
                    <li>• Referral pathways to appropriate services</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Intervention Strategies</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Cognitive-behavioral therapy for anxiety and depression</li>
                    <li>• Mindfulness-based stress reduction programs</li>
                    <li>• Support groups and peer counseling</li>
                    <li>• Psychiatric consultation for medication management</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Survivorship Care Planning</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Treatment Summary</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Comprehensive treatment history documentation</li>
                    <li>• Late effects risk assessment and monitoring</li>
                    <li>• Secondary cancer screening recommendations</li>
                    <li>• Fertility and reproductive health considerations</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Follow-up Care</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Surveillance schedules for recurrence detection</li>
                    <li>• Health promotion and prevention strategies</li>
                    <li>• Coordination between oncology and primary care</li>
                    <li>• Community resources and support services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Multidisciplinary Team Coordination
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Core Team Members</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Medical Oncologist:</strong> Primary treatment coordination</li>
                <li>• <strong>Nursing Staff:</strong> Patient education and monitoring</li>
                <li>• <strong>Pharmacist:</strong> Medication management and counseling</li>
                <li>• <strong>Social Worker:</strong> Psychosocial support and resources</li>
                <li>• <strong>Nutritionist:</strong> Dietary assessment and counseling</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Specialty Consultants</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Palliative Care:</strong> Symptom management expertise</li>
                <li>• <strong>Psychology/Psychiatry:</strong> Mental health support</li>
                <li>• <strong>Physical Therapy:</strong> Functional rehabilitation</li>
                <li>• <strong>Chaplaincy:</strong> Spiritual care and support</li>
                <li>• <strong>Pain Management:</strong> Complex pain syndromes</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Communication Tools</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Team Rounds:</strong> Regular multidisciplinary meetings</li>
                <li>• <strong>Electronic Health Records:</strong> Shared documentation</li>
                <li>• <strong>Care Pathways:</strong> Standardized protocols</li>
                <li>• <strong>Patient Portals:</strong> Direct communication channels</li>
                <li>• <strong>Quality Metrics:</strong> Outcome measurement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
        <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">Excellence in Supportive Care</h4>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          High-quality supportive care requires proactive identification of patient needs, evidence-based 
          interventions, and coordinated multidisciplinary approaches. Integration of patient-reported outcomes, 
          quality-of-life assessments, and family-centered care principles enhances the overall cancer care 
          experience and treatment outcomes.
        </p>
      </div>
    </div>
  );
}