import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Scale, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle,
  Users,
  Clock,
  Heart,
  Shield
} from "lucide-react";

interface DirectiveDocument {
  id: string;
  name: string;
  description: string;
  legalStatus: string;
  whenToUse: string;
  exampleContent?: string;
  keyPoints: string[];
}

interface DecisionOption {
  id: string;
  name: string;
  description: string;
  considerations: string[];
  benefits: string[];
  risks: string[];
}

export default function AdvancedDirective() {
  const [activeTab, setActiveTab] = useState("documents");

  const legalDocuments: DirectiveDocument[] = [
    {
      id: "advance-directive",
      name: "Advance Directive",
      description: "General wishes about future medical care when unable to communicate",
      legalStatus: "Informative in most states, not legally binding",
      whenToUse: "For all adults to document general healthcare preferences",
      keyPoints: [
        "Expresses general values and preferences",
        "Provides guidance for healthcare teams",
        "Should be specific about quality of life values",
        "Needs regular review and updates"
      ]
    },
    {
      id: "living-will",
      name: "Living Will",
      description: "Specific instructions for end-of-life care in terminal illness scenarios",
      legalStatus: "Legally binding in most states when properly executed",
      whenToUse: "When patient wants to specify end-of-life care preferences in detail",
      exampleContent: "If I have an incurable condition with no reasonable hope of recovery and am unable to make decisions, I direct my physicians to withhold or withdraw life-sustaining treatment...",
      keyPoints: [
        "Legally enforceable medical instructions",
        "Specific to terminal illness scenarios",
        "Must meet state-specific requirements",
        "Can address CPR, ventilation, tube feeding"
      ]
    },
    {
      id: "dpoa-hc",
      name: "Durable Power of Attorney for Healthcare",
      description: "Legal document designating a healthcare decision-maker (healthcare proxy)",
      legalStatus: "Legally binding when properly executed",
      whenToUse: "To appoint someone trusted to make healthcare decisions if incapacitated",
      keyPoints: [
        "Names specific person as healthcare agent",
        "Remains valid during incapacity", 
        "Agent can make all healthcare decisions",
        "Should include alternate agents"
      ]
    },
    {
      id: "polst",
      name: "POLST/MOLST",
      description: "Physician Orders for Life-Sustaining Treatment - medical orders reflecting current treatment preferences",
      legalStatus: "Physician orders that are legally binding",
      whenToUse: "For seriously ill patients to translate wishes into actionable medical orders",
      keyPoints: [
        "Completed by healthcare provider",
        "Portable across healthcare settings",
        "Addresses specific medical interventions",
        "For patients with serious illness or advanced age"
      ]
    }
  ];

  const treatmentOptions: DecisionOption[] = [
    {
      id: "cpr",
      name: "CPR (Cardiopulmonary Resuscitation)",
      description: "Emergency procedure including chest compressions, rescue breathing, and electrical shocks",
      considerations: [
        "Success rates vary greatly by patient condition",
        "May result in broken ribs and prolonged ICU stay",
        "Often not recommended for advanced terminal illness",
        "Recovery to previous function is uncommon in serious illness"
      ],
      benefits: [
        "Can restore circulation in cardiac arrest",
        "May provide time for reversible causes to be treated",
        "Can be life-saving in appropriate circumstances"
      ],
      risks: [
        "Low survival rates in terminal illness (2-5%)",
        "Risk of neurological damage from lack of oxygen",
        "Painful recovery process",
        "May prolong dying process without meaningful recovery"
      ]
    },
    {
      id: "ventilation",
      name: "Mechanical Ventilation",
      description: "Machine-assisted breathing support through endotracheal tube or tracheostomy",
      considerations: [
        "Distinction between temporary vs. long-term use",
        "Quality of life implications for conscious patients",
        "Difficulty weaning in progressive respiratory failure",
        "Communication challenges while intubated"
      ],
      benefits: [
        "Can support breathing during acute illness",
        "Allows time for treatment of reversible conditions",
        "May be life-sustaining in acute respiratory failure"
      ],
      risks: [
        "Risk of ventilator-associated pneumonia",
        "Difficulty with communication and comfort",
        "May prolong dying process in terminal illness",
        "Potential for long-term ventilator dependence"
      ]
    },
    {
      id: "feeding-tube",
      name: "Artificial Nutrition and Hydration",
      description: "Tube feeding through stomach (PEG) or nose (NG tube)",
      considerations: [
        "Limited benefit in advanced dementia",
        "Does not necessarily prevent aspiration pneumonia",
        "May prolong dying process without improving comfort",
        "Cultural and religious perspectives on nutrition"
      ],
      benefits: [
        "Can provide nutrition when swallowing is impaired",
        "May be helpful in acute, reversible conditions",
        "Addresses family concerns about 'starvation'"
      ],
      risks: [
        "Risk of aspiration despite tube feeding",
        "Infection at tube insertion site",
        "May cause discomfort or agitation",
        "Can interfere with natural dying process"
      ]
    },
    {
      id: "hospice",
      name: "Hospice Care",
      description: "Comfort-focused end-of-life care emphasizing quality over quantity of life",
      considerations: [
        "Requires prognosis of 6 months or less if disease runs normal course",
        "Focuses on symptom management and comfort",
        "Provides comprehensive support for patient and family",
        "Can be provided in various settings (home, facility, hospital)"
      ],
      benefits: [
        "Expert pain and symptom management",
        "24/7 on-call support",
        "Interdisciplinary team approach",
        "Bereavement support for family",
        "Medical equipment and supplies provided"
      ],
      risks: [
        "Must forgo curative treatments",
        "Some patients/families struggle with 'giving up'",
        "Potential for earlier death due to comfort focus",
        "Insurance requirements may limit access"
      ]
    }
  ];

  const conversationFrameworks = [
    {
      name: "Three-Talk Model",
      description: "Structured approach to shared decision-making",
      steps: [
        {
          talk: "Choice Talk",
          description: "Introduce that options exist and decisions need to be made",
          example: "There are several treatment options we should discuss, including comfort-focused care."
        },
        {
          talk: "Option Talk", 
          description: "Discuss risks and benefits of all available choices",
          example: "Let me explain what each option involves and what we know about outcomes."
        },
        {
          talk: "Decision Talk",
          description: "Support patient/surrogate in reaching a values-aligned decision",
          example: "Based on what matters most to you, which option feels most aligned with your values?"
        }
      ]
    },
    {
      name: "Ask-Tell-Ask",
      description: "Patient-centered communication approach",
      steps: [
        {
          talk: "Ask",
          description: "Assess understanding and permission to discuss",
          example: "What do you understand about your father's condition? Would it be helpful to talk about what to expect?"
        },
        {
          talk: "Tell",
          description: "Provide information in clear, compassionate terms",
          example: "Based on his condition, I'm concerned that he may have weeks to months to live."
        },
        {
          talk: "Ask",
          description: "Check understanding and respond to emotions",
          example: "What questions do you have? How are you feeling about this information?"
        }
      ]
    }
  ];

  const conversationStarters = [
    {
      category: "Values Exploration",
      questions: [
        "What matters most to you when you think about your healthcare?",
        "What would you consider an unacceptable quality of life?",
        "What gives your life meaning and purpose?",
        "How important is it for you to be independent?"
      ]
    },
    {
      category: "Decision-Making Preferences",
      questions: [
        "Who would you want to make decisions if you couldn't speak for yourself?",
        "How much do you want to know about your medical condition?",
        "How involved do you want your family to be in medical decisions?",
        "What role does your faith or spirituality play in healthcare decisions?"
      ]
    },
    {
      category: "End-of-Life Preferences",
      questions: [
        "How important is it for you to be at home versus in a hospital?",
        "What are your biggest fears or concerns about the future?",
        "Have you thought about what kind of medical care you would or wouldn't want?",
        "What would a 'good death' mean to you?"
      ]
    }
  ];

  const specialPopulations = [
    {
      group: "Dementia Patients",
      considerations: [
        "Early planning is crucial due to progressive cognitive decline",
        "Focus on values and preferences while patient has capacity",
        "Consider appointment of healthcare proxy early in disease",
        "Address driving, financial decision-making, and living arrangements"
      ],
      timing: "Ideally at diagnosis or early mild cognitive impairment"
    },
    {
      group: "Cultural Diversity",
      considerations: [
        "Respect different cultural beliefs about death and dying",
        "Understand family decision-making hierarchies",
        "Use professional interpreters, never family members",
        "Ask about religious or spiritual practices around illness"
      ],
      timing: "Throughout care relationship with cultural sensitivity"
    },
    {
      group: "Pediatric Patients",
      considerations: [
        "Parents are primary decision-makers with child involvement when appropriate",
        "Consider developmental stage for child participation",
        "Address both current and future decision-making needs",
        "Special considerations for transition to adult care"
      ],
      timing: "Age-appropriate involvement starting around 12-14 years"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Advance Care Planning Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Advance care planning helps patients communicate their healthcare preferences for future medical decisions. 
            This process involves legal documents, treatment discussions, and values clarification to ensure care aligns with patient wishes.
          </p>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-2">
              <TabsTrigger value="documents" className="flex items-center gap-2 p-3">
                <Scale className="h-4 w-4" />
                Legal Documents
              </TabsTrigger>
              <TabsTrigger value="decisions" className="flex items-center gap-2 p-3">
                <Heart className="h-4 w-4" />
                Treatment Options
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2 p-3">
                <MessageSquare className="h-4 w-4" />
                Communication
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6">
            <TabsContent value="documents" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Scale className="h-5 w-5 text-purple-600" />
                    Key Legal Documents
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Understanding different types of advance directives and their legal implications.
                  </p>
                </div>

                <div className="space-y-6">
                  {legalDocuments.map((doc) => (
                    <Card key={doc.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-500" />
                              {doc.name}
                            </CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {doc.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="ml-4">
                            {doc.legalStatus.includes("binding") ? "Legally Binding" : "Informative"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Legal Status:
                            </h4>
                            <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                              {doc.legalStatus}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-1">
                              <Clock className="h-4 w-4 text-blue-500" />
                              When to Use:
                            </h4>
                            <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                              {doc.whenToUse}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Key Points:</h4>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {doc.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <Shield className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {doc.exampleContent && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Example Language:</h4>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
                              <p className="text-sm italic">"{doc.exampleContent}"</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="decisions" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Common Treatment Decisions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Understanding treatment options, benefits, risks, and considerations for informed decision-making.
                  </p>
                </div>

                <div className="space-y-6">
                  {treatmentOptions.map((option) => (
                    <Card key={option.id} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          {option.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="considerations" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="considerations">Considerations</TabsTrigger>
                            <TabsTrigger value="benefits">Benefits</TabsTrigger>
                            <TabsTrigger value="risks">Risks</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="considerations" className="mt-4">
                            <div className="space-y-2">
                              {option.considerations.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                                  <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="benefits" className="mt-4">
                            <div className="space-y-2">
                              {option.benefits.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="risks" className="mt-4">
                            <div className="space-y-2">
                              {option.risks.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="communication" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    Communication Frameworks & Conversation Starters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Structured approaches to facilitate advance care planning conversations.
                  </p>
                </div>

                {/* Communication Frameworks */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Communication Frameworks</h4>
                  {conversationFrameworks.map((framework, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">{framework.name}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {framework.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {framework.steps.map((step, i) => (
                            <div key={i} className="border rounded-lg p-4">
                              <h5 className="font-medium text-base mb-2">
                                {i + 1}. {step.talk}
                              </h5>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                {step.description}
                              </p>
                              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border-l-4 border-green-400">
                                <p className="text-sm italic">Example: "{step.example}"</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Conversation Starters */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Conversation Starter Questions</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {conversationStarters.map((category, index) => (
                      <Card key={index} className="border-2">
                        <CardHeader>
                          <CardTitle className="text-base">{category.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {category.questions.map((question, i) => (
                              <div key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                <p className="text-sm italic">"{question}"</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Special Populations */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Special Population Considerations</h4>
                  <div className="grid gap-4">
                    {specialPopulations.map((population, index) => (
                      <Card key={index} className="border-2">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Users className="h-4 w-4 text-purple-500" />
                              {population.group}
                            </CardTitle>
                            <Badge variant="outline">{population.timing}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {population.considerations.map((consideration, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{consideration}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}