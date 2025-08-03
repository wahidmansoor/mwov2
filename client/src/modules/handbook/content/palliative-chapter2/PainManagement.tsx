import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Shield, Activity, AlertTriangle, Target, Pill } from "lucide-react";

export default function PainManagement() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-red-600" />
            2.1 Comprehensive Pain Management
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">WHO Ladder</Badge>
            <Badge variant="outline">Opioid Management</Badge>
            <Badge variant="outline">Adjuvant Therapy</Badge>
            <Badge variant="outline">Non-pharmacological</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Pain is one of the most feared and distressing symptoms in cancer patients, affecting 50-70% during treatment and up to 90% in advanced disease. Effective pain management is not only a moral imperative but also improves quality of life, functional status, and may positively impact survival.
          </p>
          
          <p className="text-sm leading-relaxed">
            Comprehensive pain assessment and multimodal treatment approaches, following evidence-based guidelines, can achieve adequate pain control in 85-95% of patients. The WHO analgesic ladder remains the foundation of cancer pain management.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-600" />
              Pain Assessment Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Comprehensive History</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>PQRST Assessment:</strong> Provocation, Quality, Radiation, Severity, Timing</li>
                  <li>• <strong>Pain Types:</strong> Nociceptive (somatic/visceral), neuropathic, mixed</li>
                  <li>• <strong>Functional Impact:</strong> Sleep, mood, activities of daily living</li>
                  <li>• <strong>Previous Treatments:</strong> Effectiveness, adverse effects, preferences</li>
                  <li>• <strong>Breakthrough Pain:</strong> Frequency, triggers, characteristics</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Validated Assessment Tools</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded p-2">
                    <div className="font-medium text-xs">Numeric Rating Scale</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">0-10 scale most commonly used</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 rounded p-2">
                    <div className="font-medium text-xs">Brief Pain Inventory</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Comprehensive assessment tool</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 rounded p-2">
                    <div className="font-medium text-xs">ESAS-R</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Edmonton Symptom Assessment</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 rounded p-2">
                    <div className="font-medium text-xs">Faces Pain Scale</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">For children and cognitive impairment</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pill className="h-5 w-5 text-purple-600" />
              WHO Analgesic Ladder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-2 border-green-300 rounded-lg p-3 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Step 1: Mild Pain (1-3/10)</h4>
                  <Badge className="bg-green-600 text-white text-xs">Non-opioid</Badge>
                </div>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Acetaminophen:</strong> 650-1000mg q6h (max 4g/day)</li>
                  <li>• <strong>NSAIDs:</strong> Ibuprofen 400-800mg q8h</li>
                  <li>• <strong>Aspirin:</strong> 650-1000mg q4-6h</li>
                  <li>• <strong>±Adjuvants:</strong> Gabapentin, amitriptyline</li>
                </ul>
              </div>

              <div className="border-2 border-yellow-300 rounded-lg p-3 bg-yellow-50 dark:bg-yellow-900/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Step 2: Moderate Pain (4-6/10)</h4>
                  <Badge className="bg-yellow-600 text-white text-xs">Weak Opioid</Badge>
                </div>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Codeine:</strong> 30-60mg q4h + acetaminophen</li>
                  <li>• <strong>Tramadol:</strong> 50-100mg q6h (max 400mg/day)</li>
                  <li>• <strong>Hydrocodone:</strong> 5-10mg q4-6h + acetaminophen</li>
                  <li>• <strong>Continue Step 1</strong> medications and adjuvants</li>
                </ul>
              </div>

              <div className="border-2 border-red-300 rounded-lg p-3 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Step 3: Severe Pain (7-10/10)</h4>
                  <Badge className="bg-red-600 text-white text-xs">Strong Opioid</Badge>
                </div>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Morphine:</strong> 15-30mg q4h immediate release</li>
                  <li>• <strong>Oxycodone:</strong> 10-20mg q4h immediate release</li>
                  <li>• <strong>Hydromorphone:</strong> 2-4mg q4h</li>
                  <li>• <strong>Fentanyl:</strong> Transdermal patches for stable pain</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-600" />
            Adjuvant Medications and Multimodal Approaches
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Adjuvant medications can enhance analgesia, target specific pain mechanisms, and reduce opioid requirements. Selection depends on pain type, comorbidities, and patient-specific factors.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Neuropathic Pain
              </h4>
              <div className="space-y-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Gabapentin</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">300mg TID, titrate to 1800-3600mg/day</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Pregabalin</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">75mg BID, titrate to 300-600mg/day</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Duloxetine</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">30-60mg daily</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Bone Pain
              </h4>
              <div className="space-y-2">
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Bisphosphonates</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Zoledronic acid, pamidronate</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Denosumab</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">120mg SC monthly</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Radiation Therapy</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Single or fractionated doses</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Visceral Pain
              </h4>
              <div className="space-y-2">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                  <div className="font-medium text-xs">Corticosteroids</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Dexamethasone 4-8mg daily</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                  <div className="font-medium text-xs">Octreotide</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">For bowel obstruction pain</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                  <div className="font-medium text-xs">Nerve Blocks</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Celiac plexus, neurolytic blocks</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Breakthrough Pain Management:</strong> Immediate-release opioids for breakthrough pain should be 10-20% of total daily opioid dose, available every 1-2 hours as needed. Rapid-onset formulations (sublingual, intranasal) may be appropriate for incident pain with rapid onset and short duration.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Non-Pharmacological Interventions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Physical Interventions</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-sm font-medium">Physical Therapy:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Range of motion, strengthening, functional training</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-sm font-medium">Massage Therapy:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Lymphatic drainage, trigger point release</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-sm font-medium">Heat/Cold Therapy:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Topical applications for local pain relief</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-sm font-medium">TENS Units:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Transcutaneous electrical nerve stimulation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Psychological Support</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-sm font-medium">Cognitive Behavioral Therapy:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Pain coping strategies, catastrophizing reduction</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-sm font-medium">Mindfulness and Meditation:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Pain awareness, acceptance techniques</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-sm font-medium">Relaxation Techniques:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Progressive muscle relaxation, guided imagery</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-sm font-medium">Spiritual Care:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Chaplaincy, meaning-making, hope</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Pain as the Fifth Vital Sign</h4>
        <p className="text-sm text-red-700 dark:text-red-300">
          Regular pain assessment should be incorporated into routine clinical care. Documentation of pain intensity, 
          functional impact, and treatment response enables quality improvement and guides therapeutic decisions. 
          Multidisciplinary team involvement ensures comprehensive care addressing physical, psychological, and spiritual 
          dimensions of pain experience.
        </p>
      </div>
    </div>
  );
}