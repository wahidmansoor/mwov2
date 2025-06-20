import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Heart, 
  Pill, 
  FileText, 
  Users,
  Brain,
  Shield,
  Activity,
  Thermometer,
  Moon,
  Utensils,
  Wind,
  Zap,
  Clock,
  MessageCircle
} from "lucide-react";

const SymptomControl = () => {
  const [painScore, setPainScore] = useState([0]);
  const [nauseaScore, setNauseaScore] = useState([0]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-red-600" />
              Pain Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Pain Score (0-10)</label>
                <Slider
                  value={painScore}
                  onValueChange={setPainScore}
                  max={10}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>No Pain</span>
                  <span className="font-medium">{painScore[0]}</span>
                  <span>Worst Pain</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Pain Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pain type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nociceptive">Nociceptive</SelectItem>
                    <SelectItem value="neuropathic">Neuropathic</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="breakthrough">Breakthrough</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
                Generate Pain Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Thermometer className="h-5 w-5 text-blue-600" />
              Symptom Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nausea (0-10)</label>
                <Slider
                  value={nauseaScore}
                  onValueChange={setNauseaScore}
                  max={10}
                  step={1}
                  className="mt-2"
                />
                <span className="text-sm font-medium">{nauseaScore[0]}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { symptom: "Fatigue", score: 6, color: "amber" },
                  { symptom: "Dyspnea", score: 3, color: "blue" },
                  { symptom: "Appetite", score: 8, color: "green" },
                  { symptom: "Sleep", score: 4, color: "purple" }
                ].map((item, i) => (
                  <div key={i} className="p-2 border rounded-lg">
                    <p className="text-xs font-medium">{item.symptom}</p>
                    <p className="text-lg font-bold">{item.score}/10</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Update Symptoms
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pill className="h-5 w-5 text-green-600" />
              Quick Interventions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-sm">Breakthrough Pain</p>
                <p className="text-xs text-blue-700">Short-acting opioid PRN</p>
                <Button size="sm" className="w-full mt-2">
                  Prescribe
                </Button>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-sm">Nausea Relief</p>
                <p className="text-xs text-green-700">Ondansetron 4mg PO/IV</p>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  Prescribe
                </Button>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="font-medium text-sm">Constipation</p>
                <p className="text-xs text-amber-700">Bowel regimen protocol</p>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  Start Protocol
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Symptom Management Protocols</CardTitle>
          <CardDescription>Evidence-based palliative care interventions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="pain">
              <AccordionTrigger>Pain Management</AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Mild Pain (1-3)</h4>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">First Line</p>
                      <p className="text-xs">• Acetaminophen 650mg q6h</p>
                      <p className="text-xs">• NSAIDs if appropriate</p>
                      <p className="text-xs">• Topical agents</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Moderate Pain (4-6)</h4>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">Opioid Therapy</p>
                      <p className="text-xs">• Morphine 5-10mg q4h PO</p>
                      <p className="text-xs">• Oxycodone 5mg q4h PO</p>
                      <p className="text-xs">• Breakthrough: 10-20% of daily dose</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dyspnea">
              <AccordionTrigger>Dyspnea Management</AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Non-pharmacologic</h4>
                    <div className="text-sm space-y-1">
                      <p>• Fan therapy</p>
                      <p>• Positioning</p>
                      <p>• Relaxation techniques</p>
                      <p>• Energy conservation</p>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Pharmacologic</h4>
                    <div className="text-sm space-y-1">
                      <p>• Morphine 2.5mg q4h PO</p>
                      <p>• Bronchodilators</p>
                      <p>• Corticosteroids</p>
                      <p>• Anxiolytics</p>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Oxygen Therapy</h4>
                    <div className="text-sm space-y-1">
                      <p>• If hypoxemic (SpO2 &lt;90%)</p>
                      <p>• Comfort care goals</p>
                      <p>• Trial period</p>
                      <p>• Family education</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

const PainManagement = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-red-600" />
            Opioid Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Opioid</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select current opioid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morphine">Morphine PO</SelectItem>
                  <SelectItem value="oxycodone">Oxycodone PO</SelectItem>
                  <SelectItem value="fentanyl">Fentanyl patch</SelectItem>
                  <SelectItem value="hydromorphone">Hydromorphone PO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Daily Dose (mg)</label>
              <Input type="number" placeholder="Enter total daily dose" />
            </div>
            <div>
              <label className="text-sm font-medium">Convert To</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select target opioid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morphine">Morphine PO</SelectItem>
                  <SelectItem value="oxycodone">Oxycodone PO</SelectItem>
                  <SelectItem value="fentanyl">Fentanyl patch</SelectItem>
                  <SelectItem value="hydromorphone">Hydromorphone PO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              Calculate Conversion
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Pain Ladder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                level: "Step 1", 
                pain: "Mild (1-3)", 
                drugs: ["Acetaminophen", "NSAIDs", "Adjuvants"],
                color: "green"
              },
              { 
                level: "Step 2", 
                pain: "Moderate (4-6)", 
                drugs: ["Weak opioids", "Codeine", "Tramadol"],
                color: "amber"
              },
              { 
                level: "Step 3", 
                pain: "Severe (7-10)", 
                drugs: ["Strong opioids", "Morphine", "Fentanyl"],
                color: "red"
              }
            ].map((step, i) => (
              <div key={i} className={`p-4 border-l-4 border-l-${step.color}-500 bg-${step.color}-50`}>
                <h4 className="font-medium">{step.level}: {step.pain}</h4>
                <p className="text-sm text-muted-foreground">
                  {step.drugs.join(" • ")}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Breakthrough Pain Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Fast-Acting Options</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Fentanyl SL</span>
                <span>100-800mcg</span>
              </div>
              <div className="flex justify-between">
                <span>Morphine IR</span>
                <span>10-20% daily dose</span>
              </div>
              <div className="flex justify-between">
                <span>Oxycodone IR</span>
                <span>5-15mg q1h PRN</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Onset Times</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sublingual</span>
                <span>5-10 min</span>
              </div>
              <div className="flex justify-between">
                <span>Oral IR</span>
                <span>15-30 min</span>
              </div>
              <div className="flex justify-between">
                <span>IV/SC</span>
                <span>5-10 min</span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Monitoring</h4>
            <div className="space-y-2 text-sm">
              <p>• Document frequency</p>
              <p>• Assess effectiveness</p>
              <p>• Adjust baseline if &gt;4/day</p>
              <p>• Screen for incident pain</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const AdvanceDirectives = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Goals of Care
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Primary Goal</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="curative">Curative/Life-prolonging</SelectItem>
                  <SelectItem value="comfort">Comfort-focused</SelectItem>
                  <SelectItem value="hybrid">Hybrid approach</SelectItem>
                  <SelectItem value="uncertain">Uncertain/Exploring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Code Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select code status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full code</SelectItem>
                  <SelectItem value="dnr">DNR</SelectItem>
                  <SelectItem value="dni">DNI</SelectItem>
                  <SelectItem value="dnr-dni">DNR/DNI</SelectItem>
                  <SelectItem value="comfort">Comfort measures only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Decision Maker</label>
              <Input placeholder="Healthcare proxy/surrogate" />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Document Goals
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Care Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Living Will</h4>
              <p className="text-sm text-blue-700">Document personal wishes</p>
              <Button size="sm" className="mt-2" variant="outline">
                Review/Update
              </Button>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Healthcare Proxy</h4>
              <p className="text-sm text-green-700">Designated decision maker</p>
              <Button size="sm" className="mt-2" variant="outline">
                Verify Contact
              </Button>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900">POLST/MOLST</h4>
              <p className="text-sm text-amber-700">Portable medical orders</p>
              <Button size="sm" className="mt-2" variant="outline">
                Complete Form
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Advance Care Planning Framework</CardTitle>
        <CardDescription>Structured approach to goals of care discussions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              phase: "1. Prepare",
              items: ["Review medical facts", "Identify decision makers", "Choose appropriate setting", "Allow adequate time"]
            },
            {
              phase: "2. Explore",
              items: ["Understand patient values", "Assess decision-making capacity", "Identify concerns/fears", "Clarify relationships"]
            },
            {
              phase: "3. Discuss",
              items: ["Present medical options", "Align with patient values", "Address questions", "Allow processing time"]
            },
            {
              phase: "4. Document",
              items: ["Record decisions clearly", "Communicate with team", "Update medical record", "Schedule follow-up"]
            }
          ].map((phase, i) => (
            <Card key={i} className="p-4">
              <h4 className="font-medium mb-3 text-blue-700">{phase.phase}</h4>
              <ul className="space-y-1 text-sm">
                {phase.items.map((item, j) => (
                  <li key={j} className="text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const FamilySupport = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-blue-600" />
            Family Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Primary Caregiver</label>
              <Input placeholder="Name and relationship" />
            </div>
            <div>
              <label className="text-sm font-medium">Support System</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Assess support level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strong">Strong family support</SelectItem>
                  <SelectItem value="moderate">Moderate support</SelectItem>
                  <SelectItem value="limited">Limited support</SelectItem>
                  <SelectItem value="isolated">Socially isolated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Caregiver Burden</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Assess burden level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal burden</SelectItem>
                  <SelectItem value="moderate">Moderate burden</SelectItem>
                  <SelectItem value="high">High burden</SelectItem>
                  <SelectItem value="overwhelmed">Overwhelmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              Complete Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium text-sm">Family Meeting</p>
              <p className="text-xs text-blue-700">Scheduled for tomorrow 2PM</p>
              <Button size="sm" className="w-full mt-2" variant="outline">
                Prepare Agenda
              </Button>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-medium text-sm">Daily Updates</p>
              <p className="text-xs text-green-700">Primary contact: Spouse</p>
              <Button size="sm" className="w-full mt-2" variant="outline">
                Call Family
              </Button>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="font-medium text-sm">Education Needs</p>
              <p className="text-xs text-amber-700">Symptom management</p>
              <Button size="sm" className="w-full mt-2" variant="outline">
                Provide Resources
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-purple-600" />
            Bereavement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Grief Support</p>
              <p className="text-xs text-muted-foreground">Individual and group counseling</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Memorial Services</p>
              <p className="text-xs text-muted-foreground">Celebration of life planning</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Follow-up Care</p>
              <p className="text-xs text-muted-foreground">13-month bereavement protocol</p>
            </div>
            <Button className="w-full" variant="outline">
              Access Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Family Support Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Educational Resources</h4>
            <div className="space-y-2">
              {[
                "Understanding the dying process",
                "Medication management at home",
                "When to call hospice",
                "Comfort measures and positioning",
                "Nutrition and hydration decisions",
                "Spiritual care resources"
              ].map((resource, i) => (
                <div key={i} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{resource}</span>
                  <Button size="sm" variant="ghost">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Support Services</h4>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm">Social Work</h5>
                <p className="text-xs text-muted-foreground">Financial resources, care coordination</p>
                <p className="text-xs font-medium">Ext. 5432</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm">Chaplaincy</h5>
                <p className="text-xs text-muted-foreground">Spiritual care, all faiths welcome</p>
                <p className="text-xs font-medium">Ext. 5555</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm">Volunteer Services</h5>
                <p className="text-xs text-muted-foreground">Companionship, respite care</p>
                <p className="text-xs font-medium">Ext. 5678</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const PsychosocialCare = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Mental Health Screening
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Depression (PHQ-2)</label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" name="interest" id="interest0" />
                  <label htmlFor="interest0" className="text-sm">Not at all</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="interest" id="interest1" />
                  <label htmlFor="interest1" className="text-sm">Several days</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="interest" id="interest2" />
                  <label htmlFor="interest2" className="text-sm">More than half the days</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="interest" id="interest3" />
                  <label htmlFor="interest3" className="text-sm">Nearly every day</label>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Anxiety Level (0-10)</label>
              <Input type="number" min="0" max="10" placeholder="0" className="mt-1" />
            </div>
            <Button className="w-full">
              Complete Screening
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            Coping Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Coping Strategies</label>
              <div className="space-y-2 mt-2">
                {[
                  "Problem-focused coping",
                  "Emotion-focused coping", 
                  "Meaning-making",
                  "Social support seeking",
                  "Avoidance/denial"
                ].map((strategy, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input type="checkbox" id={`coping${i}`} />
                    <label htmlFor={`coping${i}`} className="text-sm">{strategy}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Support Needs</label>
              <Textarea placeholder="Identify specific psychosocial needs..." className="h-20" />
            </div>
            <Button className="w-full" variant="outline">
              Develop Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Psychosocial Interventions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              category: "Individual Therapy",
              interventions: [
                "Supportive counseling",
                "Cognitive behavioral therapy",
                "Acceptance and commitment therapy",
                "Dignity therapy",
                "Life review"
              ]
            },
            {
              category: "Group Support",
              interventions: [
                "Support groups",
                "Peer mentoring",
                "Educational workshops",
                "Art/music therapy",
                "Mindfulness groups"
              ]
            },
            {
              category: "Spiritual Care",
              interventions: [
                "Chaplaincy services",
                "Meaning-making discussions",
                "Ritual and ceremony",
                "Prayer and meditation",
                "Legacy projects"
              ]
            }
          ].map((category, i) => (
            <Card key={i} className="p-4">
              <h4 className="font-medium mb-3 text-purple-700">{category.category}</h4>
              <ul className="space-y-1 text-sm">
                {category.interventions.map((intervention, j) => (
                  <li key={j} className="text-muted-foreground">• {intervention}</li>
                ))}
              </ul>
              <Button className="w-full mt-3" size="sm" variant="outline">
                Refer
              </Button>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function PalliativeModule() {
  const [activeTab, setActiveTab] = useState("symptoms");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Palliative Care Module
              </h1>
              <p className="text-muted-foreground">
                Comprehensive Comfort and Supportive Care
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="symptoms" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Symptom Control
            </TabsTrigger>
            <TabsTrigger value="pain" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Pain Management
            </TabsTrigger>
            <TabsTrigger value="directives" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Advance Directives
            </TabsTrigger>
            <TabsTrigger value="family" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Family Support
            </TabsTrigger>
            <TabsTrigger value="psychosocial" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Psychosocial Care
            </TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms">
            <SymptomControl />
          </TabsContent>
          
          <TabsContent value="pain">
            <PainManagement />
          </TabsContent>
          
          <TabsContent value="directives">
            <AdvanceDirectives />
          </TabsContent>
          
          <TabsContent value="family">
            <FamilySupport />
          </TabsContent>
          
          <TabsContent value="psychosocial">
            <PsychosocialCare />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}