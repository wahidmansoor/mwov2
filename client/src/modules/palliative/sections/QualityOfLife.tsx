import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Heart, 
  Activity, 
  Brain, 
  Users, 
  Target,
  CheckCircle,
  TrendingUp,
  Clock,
  Stethoscope,
  MessageSquare,
  AlertTriangle
} from "lucide-react";

export default function QualityOfLife() {
  const [activeTab, setActiveTab] = useState("dimensions");

  const qolDimensions = [
    {
      name: "Physical Domain",
      icon: Activity,
      description: "Management of physical symptoms that impact daily functioning",
      color: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
      symptoms: ["Pain", "Dyspnea", "Fatigue", "Nausea", "Anorexia", "Insomnia", "Constipation", "Weakness"],
      interventions: [
        "WHO analgesic ladder for systematic pain management",
        "Low-dose opioids (morphine 2.5-5mg PO) for dyspnea relief",
        "Prophylactic laxatives with all opioid regimens",
        "Antiemetics targeting specific nausea pathways",
        "Sleep hygiene and non-pharmacological sleep aids"
      ],
      assessment: ["Numeric rating scales (0-10)", "Edmonton Symptom Assessment Scale", "Memorial Symptom Assessment Scale"]
    },
    {
      name: "Psychological Domain",
      icon: Brain,
      description: "Addressing emotional and mental health aspects of illness",
      color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
      symptoms: ["Depression", "Anxiety", "Demoralization", "Anticipatory grief", "Fear", "Hopelessness"],
      interventions: [
        "Cognitive Behavioral Therapy (CBT) for anxiety and depression",
        "SSRIs: Sertraline 25-50mg daily, escitalopram 10-20mg daily",
        "Mirtazapine 15-30mg HS for appetite/sleep issues",
        "Psychostimulants (methylphenidate 5-10mg BID) for rapid effect",
        "Dignity therapy for existential concerns"
      ],
      assessment: ["PHQ-9 for depression", "GAD-7 for anxiety", "Distress Thermometer", "Demoralization Scale"]
    },
    {
      name: "Social Domain",
      icon: Users,
      description: "Addressing relationships, support systems, and social functioning",
      color: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
      symptoms: ["Family conflicts", "Caregiver burden", "Social isolation", "Financial strain", "Role changes"],
      interventions: [
        "Family meetings and mediation services",
        "Caregiver support programs and respite care",
        "Social services navigation and financial counseling",
        "Peer support groups and volunteer programs",
        "Community resource connection"
      ],
      assessment: ["Social Support Questionnaire", "Family Assessment Device", "Zarit Burden Interview"]
    },
    {
      name: "Functional Domain",
      icon: Target,
      description: "Maintaining independence and capabilities in daily activities",
      color: "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800",
      symptoms: ["Mobility limitations", "ADL dependence", "Reduced independence", "Physical decline"],
      interventions: [
        "Occupational therapy for adaptive strategies",
        "Physical therapy for mobility preservation",
        "Adaptive devices and home modifications",
        "Energy conservation techniques",
        "Realistic goal-setting and expectations"
      ],
      assessment: ["Karnofsky Performance Scale", "ECOG Performance Status", "Palliative Performance Scale", "Barthel Index"]
    },
    {
      name: "Spiritual Domain",
      icon: Heart,
      description: "Addressing existential concerns, meaning, and transcendence",
      color: "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800",
      symptoms: ["Loss of purpose", "Existential distress", "Spiritual crisis", "Hopelessness", "Meaninglessness"],
      interventions: [
        "Chaplaincy services and spiritual counseling",
        "Dignity therapy and life review processes",
        "Meaning-centered psychotherapy",
        "Rituals and practices aligned with beliefs",
        "Legacy work and generativity projects"
      ],
      assessment: ["FICA spiritual assessment", "HOPE spiritual history", "Spiritual Pain Assessment Scale"]
    }
  ];

  const assessmentTools = [
    { 
      tool: "Numeric Rating Scale (NRS)", 
      purpose: "Symptom intensity measurement (0-10 scale)", 
      notes: "For pain, breathlessness, nausea, fatigue",
      frequency: "Every visit for active symptoms",
      interpretation: "0-3: Mild, 4-6: Moderate, 7-10: Severe"
    },
    { 
      tool: "Visual Analog Scale (VAS)", 
      purpose: "Subjective quality of life measure", 
      notes: "0-100mm scale; sensitive to change over time",
      frequency: "Weekly to monthly assessments",
      interpretation: "Higher scores indicate better quality of life"
    },
    { 
      tool: "Palliative Performance Scale (PPS)", 
      purpose: "Functional capacity and prognosis", 
      notes: "0-100% scale; guides hospice eligibility",
      frequency: "Monthly or with functional changes",
      interpretation: "≤50% often indicates weeks-months prognosis"
    },
    { 
      tool: "Karnofsky Performance Scale", 
      purpose: "Independence and functional status", 
      notes: "0-100 scale; predicts prognosis in cancer",
      frequency: "At diagnosis and major changes",
      interpretation: "≤50 indicates significant functional decline"
    },
    { 
      tool: "ECOG Performance Status", 
      purpose: "Ambulatory status (0-4 scale)", 
      notes: "Commonly used in oncology settings",
      frequency: "At each oncology visit",
      interpretation: "0: Fully active, 4: Completely disabled"
    },
    { 
      tool: "FACIT-Pal", 
      purpose: "Multidimensional QoL in palliative care", 
      notes: "46-item validated questionnaire",
      frequency: "Baseline and every 2-4 weeks",
      interpretation: "Higher scores indicate better QoL"
    },
    { 
      tool: "IPOS (Integrated Palliative Outcome Scale)", 
      purpose: "Comprehensive symptom and psychosocial assessment", 
      notes: "17-item clinically validated tool",
      frequency: "Weekly in palliative care settings",
      interpretation: "Lower scores indicate better outcomes"
    }
  ];

  const interdisciplinaryTeam = [
    { 
      role: "Physician", 
      responsibilities: "Symptom management, goals of care discussions, prognosis communication",
      frequency: "Weekly initially, then as needed",
      expertise: "Medical decision-making, complex symptom management"
    },
    { 
      role: "Nurse", 
      responsibilities: "Direct care, symptom monitoring, patient/family education",
      frequency: "Daily to multiple times per week",
      expertise: "Hands-on care, medication administration, comfort measures"
    },
    { 
      role: "Social Worker", 
      responsibilities: "Psychosocial assessment, resource coordination, counseling",
      frequency: "Weekly initially, then bi-weekly",
      expertise: "Family dynamics, community resources, crisis intervention"
    },
    { 
      role: "Chaplain", 
      responsibilities: "Spiritual assessment, existential support, ritual facilitation",
      frequency: "As requested or weekly if spiritual distress",
      expertise: "Spiritual care, meaning-making, grief support"
    },
    { 
      role: "Psychologist/Psychiatrist", 
      responsibilities: "Mental health assessment, therapy, medication management",
      frequency: "Weekly therapy, monthly medication review",
      expertise: "Depression, anxiety, complicated grief, psychotherapy"
    },
    { 
      role: "Physical Therapist", 
      responsibilities: "Mobility preservation, fall prevention, adaptive strategies",
      frequency: "2-3x weekly initially, then maintenance",
      expertise: "Movement, mobility, physical function optimization"
    },
    { 
      role: "Occupational Therapist", 
      responsibilities: "ADL support, environmental adaptations, energy conservation",
      frequency: "Weekly initially, then as needed",
      expertise: "Daily living skills, adaptive equipment, home safety"
    }
  ];

  const communicationFrameworks = [
    {
      name: "Ask-Tell-Ask",
      description: "Patient-centered approach to information sharing",
      steps: [
        "Ask: Assess understanding and permission to discuss",
        "Tell: Provide information in clear, compassionate terms",
        "Ask: Check understanding and address emotions"
      ],
      example: "What do you understand about your condition? → I'd like to share some information about what we're seeing → What questions do you have about this?"
    },
    {
      name: "SPIKES Protocol",
      description: "Structured approach for delivering serious news",
      steps: [
        "Setting: Private environment with adequate time",
        "Perception: Assess patient's understanding",
        "Invitation: Ask how much information is desired",
        "Knowledge: Deliver information clearly and compassionately",
        "Emotions: Acknowledge and respond to emotions",
        "Strategy/Summary: Develop care plan together"
      ],
      example: "Used for prognostic discussions and treatment changes"
    }
  ];

  const improvementStrategies = [
    {
      category: "Symptom-Specific Protocols",
      strategies: [
        {
          symptom: "Pain Management",
          approach: "WHO analgesic ladder with regular reassessment every 24-48 hours",
          goal: "Pain score ≤4/10 with functional improvement"
        },
        {
          symptom: "Dyspnea Relief", 
          approach: "Low-dose opioids (morphine 2.5-5mg PO q4h), fan therapy, positioning",
          goal: "Improved comfort and reduced anxiety"
        },
        {
          symptom: "Nausea Control",
          approach: "Mechanism-targeted antiemetics: ondansetron, metoclopramide, haloperidol",
          goal: "Ability to maintain oral intake and medications"
        },
        {
          symptom: "Fatigue Management",
          approach: "Energy conservation, activity pacing, methylphenidate if appropriate",
          goal: "Preservation of meaningful activities"
        }
      ]
    },
    {
      category: "Psychosocial Interventions",
      strategies: [
        {
          intervention: "Individual Counseling",
          approach: "CBT, supportive therapy, or dignity therapy based on needs",
          frequency: "Weekly sessions, 45-60 minutes"
        },
        {
          intervention: "Family Meetings",
          approach: "Structured discussions about goals, concerns, and care planning",
          frequency: "Bi-weekly or as needed for conflicts"
        },
        {
          intervention: "Support Groups",
          approach: "Peer-led or professionally facilitated groups",
          frequency: "Weekly participation, ongoing availability"
        },
        {
          intervention: "Respite Care",
          approach: "Planned breaks for primary caregivers",
          frequency: "4-8 hours weekly, more as needed"
        }
      ]
    },
    {
      category: "Functional Optimization",
      strategies: [
        {
          domain: "Mobility",
          approach: "PT assessment, assistive devices, fall prevention",
          goal: "Safe mobility within functional limits"
        },
        {
          domain: "Self-Care",
          approach: "OT evaluation, adaptive equipment, energy conservation",
          goal: "Maximum independence in meaningful activities"
        },
        {
          domain: "Cognitive",
          approach: "Assessment, environmental modifications, support systems",
          goal: "Optimal cognitive function and safety"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            Quality of Life Assessment & Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Quality of life in palliative care encompasses physical, psychological, social, functional, and spiritual dimensions. 
            Systematic assessment and targeted interventions optimize comfort, function, and meaning throughout the illness trajectory.
          </p>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-auto p-2">
              <TabsTrigger value="dimensions" className="flex items-center gap-2 p-3">
                <Target className="h-4 w-4" />
                QoL Dimensions
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center gap-2 p-3">
                <Stethoscope className="h-4 w-4" />
                Assessment Tools
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2 p-3">
                <Users className="h-4 w-4" />
                Team Approach
              </TabsTrigger>
              <TabsTrigger value="strategies" className="flex items-center gap-2 p-3">
                <TrendingUp className="h-4 w-4" />
                Improvement Strategies
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6">
            <TabsContent value="dimensions" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Holistic Dimensions of Quality of Life
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Quality of life assessment requires evaluation across multiple interconnected domains to provide comprehensive care.
                  </p>
                </div>

                <Accordion type="multiple" className="w-full">
                  {qolDimensions.map((dimension, index) => (
                    <AccordionItem key={index} value={`dimension-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${dimension.color}`}>
                            <dimension.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-lg">{dimension.name}</p>
                            <p className="text-sm text-gray-500 font-normal">{dimension.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-3 gap-6 p-4">
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              Common Issues:
                            </h4>
                            <div className="space-y-2">
                              {dimension.symptoms.map((symptom, i) => (
                                <Badge key={i} variant="secondary" className="mr-1 mb-1">
                                  {symptom}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Interventions:
                            </h4>
                            <ul className="space-y-2">
                              {dimension.interventions.map((intervention, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                  {intervention}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <Stethoscope className="h-4 w-4 text-blue-500" />
                              Assessment Tools:
                            </h4>
                            <ul className="space-y-1">
                              {dimension.assessment.map((tool, i) => (
                                <li key={i} className="text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-purple-600" />
                    Quality of Life Assessment Tools
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Standardized tools for systematic evaluation of quality of life domains and treatment outcomes.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="text-left p-4 border-b font-semibold">Assessment Tool</th>
                        <th className="text-left p-4 border-b font-semibold">Purpose</th>
                        <th className="text-left p-4 border-b font-semibold">Frequency</th>
                        <th className="text-left p-4 border-b font-semibold">Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessmentTools.map((tool, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-4 font-medium">{tool.tool}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{tool.purpose}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{tool.notes}</p>
                            </div>
                          </td>
                          <td className="p-4 text-sm">{tool.frequency}</td>
                          <td className="p-4 text-sm">{tool.interpretation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      Implementation Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Best Practices:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Integrate assessments into routine clinical visits</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Use scores to guide treatment intensification</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Track trends over time rather than single measurements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Share results with interdisciplinary team</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Documentation:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Record baseline scores at initial assessment</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Note clinically significant changes (≥1 point NRS)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Link assessment results to treatment modifications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Include patient-reported outcomes in care plans</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Interdisciplinary Team Approach
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Coordinated care across disciplines to address all aspects of quality of life and patient experience.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="text-left p-4 border-b font-semibold">Team Member</th>
                        <th className="text-left p-4 border-b font-semibold">Key Responsibilities</th>
                        <th className="text-left p-4 border-b font-semibold">Typical Frequency</th>
                        <th className="text-left p-4 border-b font-semibold">Expertise Focus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interdisciplinaryTeam.map((member, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-4 font-medium">{member.role}</td>
                          <td className="p-4">{member.responsibilities}</td>
                          <td className="p-4 text-sm">{member.frequency}</td>
                          <td className="p-4 text-sm">{member.expertise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Communication Frameworks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {communicationFrameworks.map((framework, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-medium text-base mb-2">{framework.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {framework.description}
                            </p>
                            <div className="space-y-2">
                              {framework.steps.map((step, i) => (
                                <div key={i} className="text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                  {step}
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs italic">
                              {framework.example}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Team Coordination</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Regular Meetings:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Weekly interdisciplinary team meetings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Bi-weekly case conferences for complex patients</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Monthly quality improvement reviews</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Documentation:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Shared electronic health records</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Unified care plans accessible to all team members</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Clear role definitions with overlapping competencies</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Quality of Life Improvement Strategies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Targeted interventions organized by category to systematically address quality of life concerns.
                  </p>
                </div>

                <div className="space-y-6">
                  {improvementStrategies.map((category, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {category.strategies.map((strategy, i) => (
                            <div key={i} className="border rounded-lg p-4">
                              <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                  <h5 className="font-medium mb-1">
                                    {strategy.symptom || strategy.intervention || strategy.domain}
                                  </h5>
                                  {strategy.frequency && (
                                    <p className="text-xs text-gray-500">{strategy.frequency}</p>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm">{strategy.approach}</p>
                                </div>
                                <div>
                                  {strategy.goal && (
                                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-400">
                                      <p className="text-sm font-medium text-green-900 dark:text-green-300">
                                        Goal: {strategy.goal}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Outcome Measurement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Short-term (1-4 weeks)</h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                          <li>• Symptom score reduction</li>
                          <li>• Improved sleep quality</li>
                          <li>• Enhanced mood</li>
                        </ul>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Medium-term (1-3 months)</h4>
                        <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                          <li>• Functional improvement</li>
                          <li>• Social engagement</li>
                          <li>• Caregiver satisfaction</li>
                        </ul>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Long-term (3+ months)</h4>
                        <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1">
                          <li>• Quality of life scores</li>
                          <li>• Meaning and purpose</li>
                          <li>• Overall wellbeing</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}