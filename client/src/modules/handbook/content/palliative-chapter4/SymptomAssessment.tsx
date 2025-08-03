import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, Heart, Brain, Target, CheckCircle, AlertTriangle } from "lucide-react";

export default function SymptomAssessment() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-teal-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-teal-600" />
            Chapter 4: Comprehensive Symptom Assessment
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Assessment Tools</Badge>
            <Badge variant="outline">Documentation</Badge>
            <Badge variant="outline">Quality Metrics</Badge>
            <Badge variant="outline">Patient-Reported Outcomes</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Comprehensive symptom assessment forms the foundation of effective palliative care, requiring systematic evaluation of physical, psychological, social, and spiritual dimensions of suffering using validated tools and patient-centered approaches.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter covers evidence-based assessment methodologies, standardized instruments, documentation strategies, and quality improvement initiatives to optimize symptom management outcomes and enhance quality of life for patients and families.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Standardized Assessment Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Comprehensive Assessment Scales</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>ESAS (Edmonton Symptom Assessment System):</strong> 9-item symptom scale</li>
                  <li>• <strong>POS (Palliative Care Outcome Scale):</strong> Multidimensional outcomes</li>
                  <li>• <strong>IPOS (Integrated Palliative Care Outcome Scale):</strong> Comprehensive tool</li>
                  <li>• <strong>STAS (Support Team Assessment Schedule):</strong> Professional rating</li>
                  <li>• <strong>MSAS (Memorial Symptom Assessment Scale):</strong> Cancer-specific</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Symptom-Specific Tools</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <div className="font-medium text-xs">Pain</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">NRS, VAS, BPI</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Fatigue</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">FSI, FACIT-F</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Dyspnea</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">MRC, Borg Scale</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Anxiety/Depression</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">HADS, PHQ-9</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Functional Assessment</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>ECOG Performance Status:</strong> 0-4 scale functional capacity</li>
                  <li>• <strong>Karnofsky Performance Scale:</strong> 0-100% functional status</li>
                  <li>• <strong>Barthel Index:</strong> Activities of daily living</li>
                  <li>• <strong>IADL Scale:</strong> Instrumental activities assessment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-amber-600" />
              Multidimensional Assessment Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Physical Domain</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Pain Assessment:</strong> Location, intensity, quality, temporal patterns</li>
                  <li>• <strong>Symptom Burden:</strong> Nausea, fatigue, dyspnea, constipation</li>
                  <li>• <strong>Functional Status:</strong> Mobility, self-care, usual activities</li>
                  <li>• <strong>Appetite/Nutrition:</strong> Weight loss, eating difficulties</li>
                  <li>• <strong>Sleep Disturbance:</strong> Quality, duration, sleep hygiene</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Psychological Domain</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Emotional Distress:</strong> Anxiety, depression, fear</li>
                  <li>• <strong>Cognitive Function:</strong> Delirium, concentration, memory</li>
                  <li>• <strong>Coping Mechanisms:</strong> Adaptive vs maladaptive strategies</li>
                  <li>• <strong>Mood Assessment:</strong> Standardized screening tools</li>
                  <li>• <strong>Quality of Life:</strong> Subjective well-being measures</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Social and Spiritual Domains</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Social Support:</strong> Family dynamics, caregiver burden</li>
                  <li>• <strong>Financial Impact:</strong> Economic hardship, resource needs</li>
                  <li>• <strong>Spiritual Distress:</strong> Meaning, hope, religious concerns</li>
                  <li>• <strong>Cultural Factors:</strong> Beliefs, values, traditions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Patient-Reported Outcomes and Digital Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Digital health technologies and patient-reported outcome measures (PROMs) are revolutionizing symptom assessment by enabling real-time monitoring, improving care coordination, and enhancing patient engagement in palliative care.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Digital Platforms
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Mobile Apps:</strong> Real-time symptom tracking</li>
                <li>• <strong>Web Portals:</strong> Patient-provider communication</li>
                <li>• <strong>Wearable Devices:</strong> Objective activity monitoring</li>
                <li>• <strong>Telehealth:</strong> Remote assessment capabilities</li>
                <li>• <strong>AI Integration:</strong> Predictive analytics for symptom management</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Implementation Strategies
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Staff Training:</strong> Assessment tool competency</li>
                <li>• <strong>Workflow Integration:</strong> EHR compatibility</li>
                <li>• <strong>Patient Education:</strong> Self-assessment skills</li>
                <li>• <strong>Quality Assurance:</strong> Regular tool validation</li>
                <li>• <strong>Data Analytics:</strong> Outcome measurement</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Quality Improvement
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>PDSA Cycles:</strong> Continuous improvement methodology</li>
                <li>• <strong>Benchmarking:</strong> Performance comparisons</li>
                <li>• <strong>Patient Feedback:</strong> Experience measures</li>
                <li>• <strong>Clinical Audits:</strong> Assessment quality reviews</li>
                <li>• <strong>Outcome Tracking:</strong> Longitudinal monitoring</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Assessment Best Practices:</strong> Effective symptom assessment requires regular monitoring, use of validated tools, patient-centered approaches, and integration with clinical decision-making. Cultural sensitivity and family involvement enhance assessment accuracy and treatment adherence.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-600" />
            Documentation and Communication Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Documentation Standards</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Assessment Documentation</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Systematic Recording:</strong> Structured assessment forms</li>
                    <li>• <strong>Trending Analysis:</strong> Symptom trajectory documentation</li>
                    <li>• <strong>Intervention Outcomes:</strong> Treatment response tracking</li>
                    <li>• <strong>Medication Effects:</strong> Efficacy and side effect monitoring</li>
                    <li>• <strong>Family Concerns:</strong> Caregiver observations and needs</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Quality Indicators</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Assessment Frequency:</strong> Regular evaluation intervals</li>
                    <li>• <strong>Tool Utilization:</strong> Standardized instrument usage</li>
                    <li>• <strong>Response Times:</strong> Symptom-to-intervention timelines</li>
                    <li>• <strong>Patient Satisfaction:</strong> Care experience measures</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Communication Excellence</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Interdisciplinary Communication</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Team Rounds:</strong> Structured assessment reviews</li>
                    <li>• <strong>Care Plans:</strong> Collaborative treatment planning</li>
                    <li>• <strong>Handoff Communication:</strong> SBAR methodology</li>
                    <li>• <strong>Electronic Records:</strong> Real-time information sharing</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Patient and Family Communication</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Assessment Education:</strong> Tool explanation and training</li>
                    <li>• <strong>Feedback Loops:</strong> Regular communication scheduling</li>
                    <li>• <strong>Cultural Competence:</strong> Language and cultural considerations</li>
                    <li>• <strong>Shared Decision-Making:</strong> Collaborative care planning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
        <h4 className="font-medium text-teal-800 dark:text-teal-200 mb-2">Evidence-Based Assessment Practice</h4>
        <p className="text-sm text-teal-700 dark:text-teal-300">
          Comprehensive symptom assessment requires integration of validated tools, clinical expertise, 
          and patient-centered communication. Regular assessment training, quality improvement initiatives, 
          and technology integration enhance the accuracy and effectiveness of palliative care interventions, 
          ultimately improving patient outcomes and quality of life.
        </p>
      </div>
    </div>
  );
}