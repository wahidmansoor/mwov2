import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Heart, 
  Users,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Target
} from "lucide-react";

export default function PsychosocialCare() {
  const [activeTab, setActiveTab] = useState("communication");

  const communicationTechniques = [
    {
      technique: "PEARLS Model",
      description: "Framework for compassionate communication in healthcare",
      components: [
        "Partnership: 'We're in this together, and I want to work with you'",
        "Empathy: 'I can see how difficult this must be for you'",
        "Apology: 'I'm sorry you've had to wait for results'",
        "Respect: 'You know your body better than anyone'",
        "Legitimization: 'Your concerns are completely valid'",
        "Support: 'We're here to help you through this'"
      ],
      clinical_use: "Builds therapeutic relationship and trust during difficult conversations"
    },
    {
      technique: "Open-Ended Questions",
      description: "Questions that elicit patient perspectives and deeper concerns",
      examples: [
        "'What worries you most about your current situation?'",
        "'How has this illness affected your daily life and relationships?'",
        "'What gives you strength during these difficult times?'",
        "'What do you hope for in the time ahead?'",
        "'Tell me what a typical day looks like for you now'"
      ],
      clinical_use: "Uncovers psychosocial issues that may not be readily apparent"
    },
    {
      technique: "Emotional Validation",
      description: "Acknowledging and normalizing patient and family emotions",
      approaches: [
        "'I can see this is really difficult for you'",
        "'It makes complete sense you'd feel that way'",
        "'Many people in your situation feel similarly'",
        "'Your feelings are completely understandable'",
        "'That sounds incredibly challenging'"
      ],
      clinical_use: "Reduces emotional distress and improves therapeutic relationship"
    },
    {
      technique: "Reflective Listening",
      description: "Restating what you hear to confirm understanding and show empathy",
      approaches: [
        "'What I'm hearing is that you're most worried about...'",
        "'It sounds like the hardest part for you is...'",
        "'Let me make sure I understand - you're saying...'",
        "'I sense that you're feeling...'",
        "'Your main concern seems to be...'"
      ],
      clinical_use: "Demonstrates understanding and helps patients feel heard"
    }
  ];

  const psychologicalInterventions = [
    {
      category: "Cognitive Behavioral Therapy (CBT)",
      description: "Evidence-based therapy focusing on thoughts, feelings, and behaviors",
      techniques: [
        "Identifying and challenging negative thought patterns",
        "Behavioral activation for depression",
        "Relaxation training and stress management",
        "Problem-solving skills training"
      ],
      indications: ["Depression", "Anxiety", "Adjustment disorders", "Catastrophic thinking"],
      duration: "8-16 sessions, can be adapted for palliative care setting"
    },
    {
      category: "Dignity Therapy",
      description: "Brief intervention focused on meaning, purpose, and legacy",
      techniques: [
        "Life review and reminiscence",
        "Legacy document creation",
        "Values clarification",
        "Generativity discussions"
      ],
      indications: ["Existential distress", "Loss of meaning", "Dignity concerns", "Desire for legacy"],
      duration: "3-4 sessions, creates tangible legacy document"
    },
    {
      category: "Supportive-Expressive Therapy",
      description: "Group or individual therapy focusing on emotional expression and support",
      techniques: [
        "Emotional expression and processing", 
        "Mutual support among participants",
        "Coping strategy development",
        "Death anxiety reduction"
      ],
      indications: ["Social isolation", "Emotional suppression", "Need for peer support", "Death anxiety"],
      duration: "Ongoing weekly sessions, group or individual format"
    },
    {
      category: "Acceptance and Commitment Therapy (ACT)",
      description: "Therapy focusing on psychological flexibility and value-based living",
      techniques: [
        "Mindfulness and present-moment awareness",
        "Acceptance of difficult emotions",
        "Values clarification and commitment",
        "Psychological flexibility training"
      ],
      indications: ["Existential concerns", "Avoidance behaviors", "Values conflicts", "Chronic illness adjustment"],
      duration: "8-12 sessions, emphasis on behavioral change"
    }
  ];

  const pharmacologicalOptions = [
    {
      category: "Selective Serotonin Reuptake Inhibitors (SSRIs)",
      medications: [
        {
          name: "Sertraline",
          dosing: "25-50 mg daily, titrate to 100-200 mg",
          notes: "First-line for depression and anxiety, good side effect profile",
          considerations: "May take 4-6 weeks for full effect"
        },
        {
          name: "Escitalopram", 
          dosing: "10-20 mg daily",
          notes: "Fewer drug interactions, well-tolerated",
          considerations: "QT prolongation at higher doses"
        }
      ]
    },
    {
      category: "Atypical Antidepressants",
      medications: [
        {
          name: "Mirtazapine",
          dosing: "15-30 mg at bedtime",
          notes: "Helpful for depression with insomnia, poor appetite, nausea",
          considerations: "Sedating, weight gain, good for palliative care"
        },
        {
          name: "Bupropion",
          dosing: "150-300 mg daily",
          notes: "Activating, helpful for fatigue and low energy",
          considerations: "Avoid in seizure disorders, lower weight gain"
        }
      ]
    },
    {
      category: "Psychostimulants",
      medications: [
        {
          name: "Methylphenidate",
          dosing: "5-10 mg twice daily (morning and noon)",
          notes: "Rapid onset, helpful in limited prognosis",
          considerations: "Monitor for agitation, appetite suppression"
        },
        {
          name: "Modafinil",
          dosing: "100-200 mg daily in morning",
          notes: "Less abuse potential, good for fatigue",
          considerations: "Expensive, may cause headaches"
        }
      ]
    }
  ];

  const spiritualAssessment = {
    domains: [
      {
        domain: "Meaning and Purpose",
        questions: [
          "What gives your life meaning?",
          "What has been most important to you in your life?",
          "Do you feel your life has had purpose?"
        ]
      },
      {
        domain: "Hope and Despair",
        questions: [
          "What are you hoping for now?",
          "What sustains you during difficult times?",
          "Are there things that give you hope?"
        ]
      },
      {
        domain: "Relationships and Connection",
        questions: [
          "Who are the most important people in your life?",
          "How has illness affected your relationships?",
          "Do you feel connected to others?"
        ]
      },
      {
        domain: "Forgiveness and Reconciliation",
        questions: [
          "Are there relationships that need healing?",
          "Are there things you need to forgive or be forgiven for?",
          "Any unfinished business with family or friends?"
        ]
      },
      {
        domain: "Transcendence and Mystery",
        questions: [
          "Do you have religious or spiritual beliefs?",
          "How do your beliefs affect your experience of illness?",
          "What happens after death in your view?"
        ]
      }
    ],
    tools: [
      {
        tool: "FICA",
        components: "Faith, Importance, Community, Address",
        use: "Brief spiritual screening in clinical settings"
      },
      {
        tool: "HOPE",
        components: "Hope, Organized religion, Personal practices, Effects",
        use: "Spiritual assessment framework"
      },
      {
        tool: "SPIRIT",
        components: "Spiritual belief system, Personal practices, Integration, Ritual, Implications, Terminal events",
        use: "Comprehensive spiritual history"
      }
    ]
  };

  const behavioralChangeStages = [
    {
      stage: "Precontemplation",
      description: "Not ready to change; may deny need for change",
      characteristics: ["Unaware of problem", "Resistant to change", "May feel pressured by others"],
      approach: "Gentle probing, provide information, offer follow-up",
      example: "Patient denies depression despite obvious symptoms"
    },
    {
      stage: "Contemplation", 
      description: "Acknowledges problem but ambivalent about change",
      characteristics: ["Weighing pros and cons", "Aware of benefits and costs", "May remain stuck"],
      approach: "Explore ambivalence, discuss pros/cons, use readiness scaling",
      example: "Patient knows they're depressed but unsure about medication"
    },
    {
      stage: "Preparation",
      description: "Ready to take action within 30 days",
      characteristics: ["Small steps taken", "Commitment developing", "Planning for change"],
      approach: "Set realistic goals, develop action plan, remove barriers",
      example: "Patient agrees to try antidepressant and counseling"
    },
    {
      stage: "Action",
      description: "Actively engaged in behavior change",
      characteristics: ["Visible behavior change", "Time and energy invested", "Requires support"],
      approach: "Reinforce behavior, manage obstacles, celebrate progress",
      example: "Patient taking medication consistently, attending therapy"
    },
    {
      stage: "Maintenance",
      description: "Sustained change for more than 6 months",
      characteristics: ["New behavior established", "Confidence growing", "Vigilant about relapse"],
      approach: "Prevent relapse, affirm progress, plan for challenges",
      example: "Patient stable on treatment, developing coping skills"
    },
    {
      stage: "Relapse",
      description: "Return to previous behavior patterns",
      characteristics: ["Normal part of change process", "May feel discouraged", "Learning opportunity"],
      approach: "Normalize experience, rebuild motivation, adjust plan",
      example: "Patient stops medication during difficult period"
    }
  ];

  const screeningTools = [
    {
      tool: "PHQ-9",
      purpose: "Depression screening",
      scoring: "0-4: Minimal, 5-9: Mild, 10-14: Moderate, 15-19: Moderately severe, 20-27: Severe",
      cutoff: "Score ≥10 indicates need for treatment",
      frequency: "Every visit for high-risk patients"
    },
    {
      tool: "GAD-7",
      purpose: "Generalized anxiety screening", 
      scoring: "0-4: Minimal, 5-9: Mild, 10-14: Moderate, 15-21: Severe",
      cutoff: "Score ≥8 suggests clinically significant anxiety",
      frequency: "When anxiety symptoms suspected"
    },
    {
      tool: "Distress Thermometer",
      purpose: "Overall psychological distress",
      scoring: "0-10 scale, with problem list",
      cutoff: "Score ≥4 warrants further assessment",
      frequency: "At each visit, quick screening tool"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-orange-600" />
            Psychosocial Care Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Psychosocial care addresses the emotional, psychological, social, and spiritual dimensions of illness experience. 
            Effective interventions improve quality of life, reduce distress, and support coping and meaning-making.
          </p>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-auto p-2">
              <TabsTrigger value="communication" className="flex items-center gap-2 p-3">
                <MessageSquare className="h-4 w-4" />
                Communication
              </TabsTrigger>
              <TabsTrigger value="interventions" className="flex items-center gap-2 p-3">
                <Target className="h-4 w-4" />
                Interventions
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center gap-2 p-3">
                <TrendingUp className="h-4 w-4" />
                Behavior Change
              </TabsTrigger>
              <TabsTrigger value="spiritual" className="flex items-center gap-2 p-3">
                <Heart className="h-4 w-4" />
                Spiritual Care
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6">
            <TabsContent value="communication" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Communication Techniques
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Evidence-based communication approaches for building therapeutic relationships and addressing psychosocial concerns.
                  </p>
                </div>

                <div className="space-y-6">
                  {communicationTechniques.map((technique, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-yellow-500" />
                          {technique.technique}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {technique.description}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">
                            {technique.components ? "Components:" : technique.examples ? "Examples:" : "Approaches:"}
                          </h4>
                          <div className="grid gap-2">
                            {(technique.components || technique.examples || technique.approaches || []).map((item, i) => (
                              <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400">
                          <h4 className="font-medium text-green-900 dark:text-green-300 mb-1">Clinical Application:</h4>
                          <p className="text-sm text-green-800 dark:text-green-300">{technique.clinical_use}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interventions" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Psychological Interventions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Evidence-based psychological and pharmacological interventions for common mental health issues in palliative care.
                  </p>
                </div>

                {/* Psychological Therapies */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Psychological Therapies</h4>
                  {psychologicalInterventions.map((intervention, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">{intervention.category}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {intervention.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium mb-2">Techniques:</h5>
                            <ul className="space-y-1">
                              {intervention.techniques.map((technique, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                  {technique}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Best For:</h5>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {intervention.indications.map((indication, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {indication}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              <strong>Duration:</strong> {intervention.duration}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pharmacological Options */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Pharmacological Options</h4>
                  {pharmacologicalOptions.map((category, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {category.medications.map((med, i) => (
                            <div key={i} className="border rounded-lg p-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium text-base">{med.name}</h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    <strong>Dosing:</strong> {med.dosing}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm mb-2">{med.notes}</p>
                                  <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                                    <strong>Consider:</strong> {med.considerations}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Screening Tools */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
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
                            <th className="text-left p-3 font-semibold">Scoring</th>
                            <th className="text-left p-3 font-semibold">Action Threshold</th>
                          </tr>
                        </thead>
                        <tbody>
                          {screeningTools.map((tool, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="p-3 font-medium">{tool.tool}</td>
                              <td className="p-3">{tool.purpose}</td>
                              <td className="p-3 text-sm">{tool.scoring}</td>
                              <td className="p-3 text-sm">{tool.cutoff}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Behavioral Change Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Understanding stages of change and motivational interviewing techniques to support patient behavior modification.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Stages of Change Model</h4>
                  <div className="grid gap-4">
                    {behavioralChangeStages.map((stage, index) => (
                      <Card key={index} className="border-2">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{stage.stage}</CardTitle>
                            <Badge variant="outline">{stage.description}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h5 className="font-medium mb-2">Characteristics:</h5>
                              <ul className="space-y-1">
                                {stage.characteristics.map((char, i) => (
                                  <li key={i} className="text-sm flex items-start gap-1">
                                    <span className="text-blue-500">•</span>
                                    {char}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Clinical Approach:</h5>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {stage.approach}
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Example:</h5>
                              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm italic">
                                {stage.example}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Motivational Interviewing Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h5 className="font-medium">Core Principles:</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Express empathy through reflective listening</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Develop discrepancy between current behavior and goals</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Roll with resistance rather than opposing it</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Support self-efficacy and optimism</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h5 className="font-medium">Example Questions:</h5>
                        <div className="space-y-2">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <p className="text-sm italic">"On a scale from 1 to 10, how ready are you to discuss hospice care?"</p>
                          </div>
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <p className="text-sm italic">"What would need to happen for you to consider counseling?"</p>
                          </div>
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <p className="text-sm italic">"What are the pros and cons of starting antidepressant medication?"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="spiritual" className="mt-0">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-purple-600" />
                    Spiritual Care Assessment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Addressing existential and spiritual dimensions of illness experience through systematic assessment and intervention.
                  </p>
                </div>

                {/* Spiritual Assessment Domains */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Assessment Domains</h4>
                  <div className="grid gap-4">
                    {spiritualAssessment.domains.map((domain, index) => (
                      <Card key={index} className="border-2">
                        <CardHeader>
                          <CardTitle className="text-lg">{domain.domain}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <h5 className="font-medium mb-2">Key Questions:</h5>
                            {domain.questions.map((question, i) => (
                              <div key={i} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                                <p className="text-sm italic">"{question}"</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Assessment Tools */}
                <Card>
                  <CardHeader>
                    <CardTitle>Spiritual Assessment Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {spiritualAssessment.tools.map((tool, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h5 className="font-medium text-base mb-2">{tool.tool}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <strong>Components:</strong> {tool.components}
                          </p>
                          <p className="text-xs text-purple-700 dark:text-purple-300">
                            {tool.use}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Spiritual Interventions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Spiritual Care Interventions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-3">Professional Interventions:</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Users className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Chaplaincy services and spiritual counseling</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Life review and legacy work</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Meaning-centered psychotherapy</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Brain className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Meditation and mindfulness training</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-3">Religious/Cultural Support:</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Rituals and sacraments aligned with beliefs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Users className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Faith community involvement</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Prayer and meditation practices</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Cultural and religious ritual facilitation</span>
                          </li>
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