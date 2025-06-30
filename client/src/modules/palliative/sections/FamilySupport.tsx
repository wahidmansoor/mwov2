import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Users, 
  GraduationCap, 
  Heart, 
  Phone, 
  BookOpen, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  MessageCircle
} from "lucide-react";

export default function FamilySupport() {
  const [activeTab, setActiveTab] = useState("education");
  
  // 🎯 ENHANCED INTERACTIVE FAMILY SUPPORT MODULE

  const educationTopics = [
    {
      title: "Illness Progression",
      content: "Understanding disease trajectory and what to expect",
      details: [
        "Explain natural course of illness in clear, non-medical language",
        "Discuss potential complications and warning signs",
        "Timeline expectations and prognosis communication",
        "When to expect changes in function and symptoms"
      ],
      methods: [
        "Visual aids and disease trajectory charts",
        "Written materials for reference",
        "Staged disclosure based on readiness",
        "Regular check-ins for questions"
      ]
    },
    {
      title: "Symptom Management",
      content: "Recognizing and responding to common symptoms",
      details: [
        "Early recognition of pain, dyspnea, nausea",
        "When to administer PRN medications",
        "Non-pharmacological comfort measures",
        "Emergency symptom management"
      ],
      methods: [
        "Demonstration with return demonstration",
        "Symptom monitoring charts",
        "24/7 contact information for questions",
        "Role-playing common scenarios"
      ]
    },
    {
      title: "Caregiving Skills",
      content: "Practical training for daily care needs",
      details: [
        "Safe transfers and positioning",
        "Medication administration techniques",
        "Basic wound care and hygiene",
        "Equipment use and troubleshooting"
      ],
      methods: [
        "Hands-on training sessions",
        "Video demonstrations for reference",
        "Equipment orientation",
        "Safety checklists"
      ]
    },
    {
      title: "Emergency Preparedness",
      content: "When to call for help and what to do in crises",
      details: [
        "Signs requiring immediate medical attention",
        "Step-by-step emergency protocols",
        "Contact numbers and escalation pathways",
        "Basic first aid and CPR training"
      ],
      methods: [
        "Emergency action cards",
        "Practice scenarios",
        "Direct phone numbers for urgent issues",
        "Clear decision trees"
      ]
    }
  ];

  const psychologicalSupport = [
    {
      tool: "PHQ-9",
      purpose: "Screening for depression in caregivers",
      when: "At initial assessment and every 3 months",
      scoring: "0-4: Minimal, 5-9: Mild, 10-14: Moderate, 15-19: Moderately severe, 20-27: Severe",
      action: "Score ≥10 warrants referral for psychological support"
    },
    {
      tool: "GAD-7", 
      purpose: "Anxiety assessment for family members",
      when: "When caregiver shows signs of distress or worry",
      scoring: "0-4: Minimal, 5-9: Mild, 10-14: Moderate, 15-21: Severe",
      action: "Score ≥8 suggests clinically significant anxiety"
    },
    {
      tool: "Zarit Burden Interview",
      purpose: "Measuring caregiver strain and burden",
      when: "Every 3 months for primary caregivers",
      scoring: "0-20: Little/no burden, 21-40: Mild to moderate, 41-60: Moderate to severe, 61-88: Severe",
      action: "High scores indicate need for respite care and support"
    }
  ];

  const bereavementResources = [
    {
      category: "Individual Support",
      services: [
        "One-on-one grief counseling with licensed therapists",
        "Spiritual care and chaplaincy services",
        "Psychiatric evaluation for complicated grief",
        "Medication management for depression/anxiety"
      ]
    },
    {
      category: "Group Support",
      services: [
        "Bereavement support groups (weekly meetings)",
        "Widow/widower specific groups",
        "Parent loss support groups",
        "Virtual support groups for remote families"
      ]
    },
    {
      category: "Educational Resources",
      services: [
        "Grief education materials and handbooks",
        "Online grief resources and websites",
        "Books and literature recommendations",
        "Webinars on coping with loss"
      ]
    },
    {
      category: "Memorial Services",
      services: [
        "Annual memorial events and ceremonies",
        "Memory garden or memorial wall participation",
        "Celebration of life event support",
        "Legacy project assistance"
      ]
    }
  ];

  const communicationBestPractices = [
    {
      practice: "Use Plain Language",
      description: "Avoid medical jargon; explain terms clearly",
      examples: [
        "Say 'breathing problems' instead of 'dyspnea'",
        "Use 'cancer has spread' instead of 'metastatic disease'",
        "Explain 'comfort care' rather than 'palliative care'"
      ]
    },
    {
      practice: "Teach-Back Method",
      description: "Ask families to explain back in their own words",
      examples: [
        "'Tell me how you would give this medication'",
        "'What would you do if pain gets worse?'",
        "'When would you call the nurse?'"
      ]
    },
    {
      practice: "Cultural Sensitivity",
      description: "Respect different communication norms and values",
      examples: [
        "Ask about family decision-making preferences",
        "Respect religious and spiritual beliefs",
        "Use professional interpreters when needed"
      ]
    },
    {
      practice: "Emotional Validation",
      description: "Acknowledge feelings without judgment",
      examples: [
        "'I can see this is really difficult for you'",
        "'Your feelings are completely understandable'",
        "'Many families feel this way'"
      ]
    }
  ];

  const supportInterventions = [
    {
      category: "Psychological Interventions",
      approaches: [
        "Individual counseling with social workers or psychologists",
        "Cognitive Behavioral Therapy (CBT) for anxiety and depression",
        "Supportive-expressive therapy for emotional processing",
        "Crisis intervention and safety planning"
      ],
      medications: [
        "SSRIs: Sertraline 25-50mg daily, Escitalopram 10-20mg daily",
        "Mirtazapine 15-30mg at bedtime (for appetite/sleep)",
        "Short-term benzodiazepines for acute anxiety",
        "Sleep aids for insomnia (trazodone, melatonin)"
      ]
    },
    {
      category: "Social Support",
      approaches: [
        "Caregiver burden assessment and mitigation strategies",
        "Financial counseling and insurance navigation",
        "Transportation assistance programs",
        "Home health aide coordination"
      ],
      resources: [
        "Community support group referrals",
        "Volunteer companion programs",
        "Respite care services (4-8 hours weekly)",
        "Emergency respite for caregiver illness"
      ]
    },
    {
      category: "Practical Support",
      approaches: [
        "Medication management systems",
        "Medical equipment training and maintenance",
        "Home safety assessments and modifications",
        "Care coordination between providers"
      ],
      tools: [
        "Pill organizers and reminder systems",
        "Hospital bed and wheelchair training",
        "Grab bars and bathroom safety equipment",
        "Communication boards for care teams"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Family Support Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Comprehensive family support encompasses education, psychological support, and bereavement care. 
            Effective support reduces caregiver burden, improves patient outcomes, and facilitates healthy grief processing.
          </p>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-2">
              <TabsTrigger value="education" className="flex items-center gap-2 p-3">
                <GraduationCap className="h-4 w-4" />
                Family Education
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2 p-3">
                <Heart className="h-4 w-4" />
                Psychological Support
              </TabsTrigger>
              <TabsTrigger value="bereavement" className="flex items-center gap-2 p-3">
                <MessageCircle className="h-4 w-4" />
                Bereavement Care
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6">
            <TabsContent value="education" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Family Education Topics
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Structured educational approach to prepare families for caregiving responsibilities and expectations.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {educationTopics.map((topic, index) => (
                    <AccordionItem key={index} value={`topic-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="font-medium">{topic.title}</p>
                            <p className="text-sm text-gray-500 font-normal">{topic.content}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-4 p-4">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Key Learning Points:
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {topic.details.map((detail, i) => (
                                <li key={i} className="text-sm">{detail}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-1">
                              <GraduationCap className="h-4 w-4 text-blue-500" />
                              Teaching Methods:
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {topic.methods.map((method, i) => (
                                <li key={i} className="text-sm">{method}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Communication Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {communicationBestPractices.map((practice, index) => (
                        <Card key={index} className="border">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <MessageCircle className="h-4 w-4 text-green-500" />
                              {practice.practice}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {practice.description}
                            </p>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Examples:</p>
                              {practice.examples.map((example, i) => (
                                <p key={i} className="text-xs italic bg-gray-50 dark:bg-gray-800 p-2 rounded">
                                  {example}
                                </p>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Psychological Support & Assessment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Systematic screening and intervention for caregiver psychological distress and burden.
                  </p>
                </div>

                {/* Screening Tools */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      Screening Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-semibold">Tool</th>
                            <th className="text-left p-3 font-semibold">Purpose</th>
                            <th className="text-left p-3 font-semibold">When to Use</th>
                            <th className="text-left p-3 font-semibold">Action Threshold</th>
                          </tr>
                        </thead>
                        <tbody>
                          {psychologicalSupport.map((tool, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="p-3 font-medium">{tool.tool}</td>
                              <td className="p-3">{tool.purpose}</td>
                              <td className="p-3 text-sm">{tool.when}</td>
                              <td className="p-3 text-sm">{tool.action}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Support Interventions */}
                <div className="grid gap-4">
                  {supportInterventions.map((intervention, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{intervention.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Therapeutic Approaches:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {intervention.approaches.map((approach, i) => (
                                <li key={i} className="text-sm">{approach}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">
                              {intervention.medications ? "Medications:" : 
                               intervention.resources ? "Resources:" : "Tools:"}
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {(intervention.medications || intervention.resources || intervention.tools || []).map((item, i) => (
                                <li key={i} className="text-sm">{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bereavement" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    Bereavement Support Services
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Comprehensive grief support continuing 12-18 months after loss, with special attention to high-risk families.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {bereavementResources.map((resource, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Phone className="h-5 w-5 text-blue-500" />
                          {resource.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {resource.services.map((service, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* High-Risk Indicators */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      High-Risk Bereavement Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">Risk Factors:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-sm">Sudden or traumatic death</li>
                          <li className="text-sm">Limited social support network</li>
                          <li className="text-sm">History of mental health issues</li>
                          <li className="text-sm">Complicated relationship with deceased</li>
                          <li className="text-sm">Multiple recent losses</li>
                          <li className="text-sm">Financial strain or instability</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Warning Signs:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-sm">Prolonged intense grief (greater than 6 months)</li>
                          <li className="text-sm">Persistent functional impairment</li>
                          <li className="text-sm">Substance abuse or self-harm</li>
                          <li className="text-sm">Social isolation and withdrawal</li>
                          <li className="text-sm">Inability to accept the death</li>
                          <li className="text-sm">Suicidal ideation or plans</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Follow-up Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      Bereavement Follow-up Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300">1 Month</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-300">Phone call + assessment</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-semibold text-green-900 dark:text-green-300">3 Months</h4>
                        <p className="text-sm text-green-800 dark:text-green-300">In-person visit or call</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-300">6 Months</h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">Grief assessment + support</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <h4 className="font-semibold text-purple-900 dark:text-purple-300">12 Months</h4>
                        <p className="text-sm text-purple-800 dark:text-purple-300">Anniversary support</p>
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