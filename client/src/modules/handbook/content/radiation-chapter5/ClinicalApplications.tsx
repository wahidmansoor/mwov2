import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, Brain, Heart, Activity, Users, Stethoscope, AlertTriangle, CheckCircle } from "lucide-react";

export default function ClinicalApplications() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-emerald-600" />
            Chapter 5: Clinical Applications and Site-Specific Protocols
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">CNS Tumors</Badge>
            <Badge variant="outline">Thoracic Cancers</Badge>
            <Badge variant="outline">GI Malignancies</Badge>
            <Badge variant="outline">Pediatric RT</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Clinical applications of radiation therapy encompass site-specific treatment protocols, combining evidence-based dose prescriptions, advanced techniques, and multidisciplinary management approaches for optimal therapeutic outcomes across diverse cancer types.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter provides comprehensive clinical protocols for major anatomical sites, integrating modern radiation techniques with surgical and systemic therapies while addressing unique challenges in pediatric, elderly, and medically complex patient populations.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-blue-600" />
              Central Nervous System Tumors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Primary Brain Tumors</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Glioblastoma:</strong> 60 Gy/30 fx with concurrent temozolomide</li>
                  <li>• <strong>Low-grade Glioma:</strong> 50.4-54 Gy, risk-adapted approach</li>
                  <li>• <strong>Meningioma:</strong> 54-60 Gy for atypical/malignant grades</li>
                  <li>• <strong>Medulloepithelioma:</strong> 54 Gy craniospinal irradiation</li>
                  <li>• <strong>Pituitary Adenoma:</strong> 45-54 Gy conventional or SRS</li>
                  <li>• <strong>Craniopharyngioma:</strong> 50.4-54 Gy with critical structure sparing</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Brain Metastases</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <div className="font-medium text-xs">Single Metastasis</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">SRS 15-24 Gy single fraction</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Multiple Mets</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">SRS vs WBRT decision</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Post-op Cavity</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">SRS 12-18 Gy to cavity</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">WBRT</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">30 Gy/10 fx + memantine</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Critical Structure Constraints</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Brainstem:</strong> Max dose &lt;54 Gy conventional, &lt;15 Gy SRS</li>
                  <li>• <strong>Optic Apparatus:</strong> Max dose &lt;54 Gy conventional, &lt;8 Gy SRS</li>
                  <li>• <strong>Cochlea:</strong> Mean dose &lt;45 Gy to preserve hearing</li>
                  <li>• <strong>Hippocampus:</strong> D40% &lt;9 Gy for memory preservation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-red-600" />
              Thoracic Malignancies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Non-Small Cell Lung Cancer</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Stage I:</strong> SBRT 54 Gy/3 fx or 60 Gy/8 fx</li>
                  <li>• <strong>Stage II-III:</strong> 60-66 Gy/30-33 fx with concurrent chemo</li>
                  <li>• <strong>Post-operative:</strong> 50-54 Gy to mediastinum</li>
                  <li>• <strong>Oligometastatic:</strong> SBRT to primary and metastases</li>
                  <li>• <strong>Palliative:</strong> 30 Gy/10 fx or 20 Gy/5 fx</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Esophageal Cancer</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Neoadjuvant:</strong> 41.4-50.4 Gy with concurrent chemo</li>
                  <li>• <strong>Definitive:</strong> 50.4-60 Gy with concurrent chemo</li>
                  <li>• <strong>Post-operative:</strong> 45-50.4 Gy for positive margins</li>
                  <li>• <strong>Target Volumes:</strong> GTV + 3-5 cm longitudinal margin</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Normal Tissue Constraints</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Lung:</strong> V20 &lt;30%, mean dose &lt;20 Gy</li>
                  <li>• <strong>Heart:</strong> V30 &lt;46%, mean dose &lt;26 Gy</li>
                  <li>• <strong>Spinal Cord:</strong> Max dose &lt;50 Gy conventional</li>
                  <li>• <strong>Esophagus:</strong> Mean dose &lt;34 Gy, max dose &lt;105%</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-600" />
            Gastrointestinal and Genitourinary Cancers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Rectal Cancer
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Neoadjuvant Long Course:</strong> 45-50.4 Gy/25-28 fx</li>
                <li>• <strong>Neoadjuvant Short Course:</strong> 25 Gy/5 fx</li>
                <li>• <strong>Boost Dose:</strong> Additional 5.4-10.8 Gy to tumor</li>
                <li>• <strong>Small Bowel:</strong> V45 &lt;195 cc constraint</li>
                <li>• <strong>Bladder:</strong> V50 &lt;50% for organ preservation</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Prostate Cancer
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Low Risk:</strong> 70-78 Gy conventional fractionation</li>
                <li>• <strong>Intermediate/High Risk:</strong> 78-80 Gy with ADT</li>
                <li>• <strong>Hypofractionated:</strong> 60 Gy/20 fx or 36.25 Gy/5 fx</li>
                <li>• <strong>Post-operative:</strong> 64-68 Gy to prostate bed</li>
                <li>• <strong>Pelvic Nodes:</strong> 45-50.4 Gy for high-risk disease</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Pancreatic Cancer
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Neoadjuvant:</strong> 50.4 Gy/28 fx with concurrent chemo</li>
                <li>• <strong>Locally Advanced:</strong> 54 Gy/30 fx definitive treatment</li>
                <li>• <strong>SBRT:</strong> 25-35 Gy/5 fx for selected patients</li>
                <li>• <strong>Duodenum:</strong> Max dose &lt;50 Gy to avoid perforation</li>
                <li>• <strong>Kidney:</strong> V20 &lt;32% bilateral constraint</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Multidisciplinary Coordination:</strong> Optimal radiation therapy outcomes require close collaboration with surgical, medical oncology, and diagnostic teams. Treatment decisions should be made in multidisciplinary tumor boards with consideration of patient performance status, comorbidities, and treatment goals.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-teal-600" />
            Special Populations and Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Pediatric Radiation Therapy</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Unique Considerations
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Age-related Sensitivity:</strong> Increased late effect risks</li>
                    <li>• <strong>Growth and Development:</strong> Organ system maturation</li>
                    <li>• <strong>Second Malignancies:</strong> Long-term cancer risk</li>
                    <li>• <strong>Cognitive Development:</strong> Brain irradiation consequences</li>
                    <li>• <strong>Anesthesia Needs:</strong> Young children immobilization</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Dose Modifications</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Reduced Doses:</strong> Age-based prescription guidelines</li>
                    <li>• <strong>Limited Volumes:</strong> Minimized treatment fields</li>
                    <li>• <strong>Proton Therapy:</strong> Reduced integral dose benefits</li>
                    <li>• <strong>Organ Sparing:</strong> Enhanced normal tissue protection</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Elderly and Frail Patients</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Assessment Considerations</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Functional Status:</strong> Comprehensive geriatric assessment</li>
                    <li>• <strong>Comorbidities:</strong> Multiple medical conditions impact</li>
                    <li>• <strong>Life Expectancy:</strong> Treatment benefit vs. burden analysis</li>
                    <li>• <strong>Cognitive Function:</strong> Decision-making capacity</li>
                    <li>• <strong>Social Support:</strong> Transportation and care assistance</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Treatment Adaptations</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Hypofractionation:</strong> Reduced treatment visits</li>
                    <li>• <strong>Palliative Intent:</strong> Symptom-focused approaches</li>
                    <li>• <strong>Toxicity Monitoring:</strong> Enhanced supportive care</li>
                    <li>• <strong>Quality of Life:</strong> Functional outcome prioritization</li>
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
            <CheckCircle className="h-5 w-5 text-green-600" />
            Quality Assurance and Outcome Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Clinical Protocols</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Standardized Guidelines:</strong> NCCN, ASTRO recommendations</li>
                <li>• <strong>Institutional Protocols:</strong> Site-specific pathways</li>
                <li>• <strong>Peer Review:</strong> Treatment plan evaluations</li>
                <li>• <strong>Outcome Tracking:</strong> Toxicity and efficacy monitoring</li>
                <li>• <strong>Quality Improvement:</strong> Continuous protocol refinement</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Patient Safety</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Treatment Verification:</strong> Independent dose calculations</li>
                <li>• <strong>Plan Checking:</strong> Physics and physician review</li>
                <li>• <strong>Patient Identification:</strong> Multiple verification systems</li>
                <li>• <strong>Incident Learning:</strong> Error analysis and prevention</li>
                <li>• <strong>Emergency Procedures:</strong> Acute toxicity management</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Outcome Measures</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Local Control:</strong> Tumor response rates</li>
                <li>• <strong>Overall Survival:</strong> Long-term follow-up</li>
                <li>• <strong>Toxicity Rates:</strong> Acute and late effects</li>
                <li>• <strong>Quality of Life:</strong> Patient-reported outcomes</li>
                <li>• <strong>Cost-effectiveness:</strong> Healthcare resource utilization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
        <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">Excellence in Clinical Practice</h4>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Successful clinical radiation therapy requires integration of advanced technology, evidence-based protocols, 
          and patient-centered care. Continuous quality improvement, multidisciplinary collaboration, and outcomes 
          research drive the evolution of radiation oncology practice toward personalized, precision therapy delivery 
          with optimal therapeutic ratios for all cancer patients.
        </p>
      </div>
    </div>
  );
}