import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageCircle, Heart, Users, Lightbulb, CheckCircle, AlertTriangle, Shield } from "lucide-react";

export default function CommunicationSkills() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Chapter 3: Communication in Palliative Care
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Difficult Conversations</Badge>
            <Badge variant="outline">Breaking Bad News</Badge>
            <Badge variant="outline">Family Meetings</Badge>
            <Badge variant="outline">Cultural Sensitivity</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Effective communication is the cornerstone of palliative care, requiring specialized skills to navigate complex medical information, emotional responses, and difficult decisions. Healthcare providers must master techniques for breaking bad news, conducting family meetings, and addressing cultural and spiritual concerns.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter provides evidence-based communication frameworks, practical tools, and ethical considerations for delivering compassionate, culturally sensitive care while maintaining professional boundaries and supporting both patients and families through challenging circumstances.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              Breaking Bad News Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              The SPIKES protocol provides a structured approach to delivering difficult news with compassion and clarity.
            </p>
            
            <div className="space-y-3">
              <div className="border-2 border-blue-300 rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">S</div>
                  <h4 className="font-semibold text-sm">Setting</h4>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 ml-8">
                  <li>• Private, comfortable environment without interruptions</li>
                  <li>• Appropriate seating arrangements for eye contact</li>
                  <li>• Ensure adequate time and emotional support available</li>
                  <li>• Turn off pagers/phones and minimize distractions</li>
                </ul>
              </div>

              <div className="border-2 border-green-300 rounded-lg p-3 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">P</div>
                  <h4 className="font-semibold text-sm">Perception</h4>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 ml-8">
                  <li>• "What is your understanding of your illness?"</li>
                  <li>• "What have the doctors told you so far?"</li>
                  <li>• Assess patient's baseline understanding and emotional state</li>
                  <li>• Identify misconceptions and information gaps</li>
                </ul>
              </div>

              <div className="border-2 border-purple-300 rounded-lg p-3 bg-purple-50 dark:bg-purple-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">I</div>
                  <h4 className="font-semibold text-sm">Invitation</h4>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 ml-8">
                  <li>• "Would you like me to explain the test results?"</li>
                  <li>• "How much detail would you like me to share?"</li>
                  <li>• Respect patient autonomy and information preferences</li>
                  <li>• Consider cultural factors affecting information sharing</li>
                </ul>
              </div>

              <div className="border-2 border-red-300 rounded-lg p-3 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">K</div>
                  <h4 className="font-semibold text-sm">Knowledge</h4>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 ml-8">
                  <li>• Use clear, jargon-free language</li>
                  <li>• Provide information in small chunks</li>
                  <li>• Warning shot: "I'm afraid I have some difficult news"</li>
                  <li>• Allow silence for processing</li>
                </ul>
              </div>

              <div className="border-2 border-orange-300 rounded-lg p-3 bg-orange-50 dark:bg-orange-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">E</div>
                  <h4 className="font-semibold text-sm">Emotions</h4>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 ml-8">
                  <li>• Acknowledge and validate emotional responses</li>
                  <li>• "I can see this is very difficult news"</li>
                  <li>• Provide tissues and physical comfort measures</li>
                  <li>• Allow time for emotional expression</li>
                </ul>
              </div>

              <div className="border-2 border-teal-300 rounded-lg p-3 bg-teal-50 dark:bg-teal-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">S</div>
                  <h4 className="font-semibold text-sm">Strategy & Summary</h4>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 ml-8">
                  <li>• Discuss next steps and treatment options</li>
                  <li>• Ensure understanding through teach-back method</li>
                  <li>• Plan follow-up meetings and support services</li>
                  <li>• Provide written information and resources</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-rose-600" />
              Family Meeting Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Family meetings are essential for complex decision-making, conflict resolution, and care planning in palliative care.
            </p>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  Pre-Meeting Preparation
                </h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Stakeholder Identification:</strong> Key family members, decision-makers</li>
                  <li>• <strong>Goal Setting:</strong> Clear objectives and desired outcomes</li>
                  <li>• <strong>Information Gathering:</strong> Medical facts, patient preferences</li>
                  <li>• <strong>Team Coordination:</strong> Multidisciplinary representation</li>
                  <li>• <strong>Logistics:</strong> Timing, location, duration planning</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  Meeting Structure
                </h4>
                <div className="space-y-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Opening (5-10 minutes)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Introductions, agenda setting, ground rules</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Medical Update (10-15 minutes)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Current status, prognosis, treatment options</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Values & Goals (15-20 minutes)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Patient values, family concerns, quality of life</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                    <div className="font-medium text-xs">Decision Making (10-15 minutes)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Options review, recommendations, consensus building</div>
                  </div>
                  <div className="bg-teal-50 dark:bg-teal-900/20 rounded p-2">
                    <div className="font-medium text-xs">Next Steps (5 minutes)</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Action items, follow-up, documentation</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Conflict Resolution Strategies
                </h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Active Listening:</strong> Acknowledge all perspectives</li>
                  <li>• <strong>Reframing:</strong> Focus on shared values and goals</li>
                  <li>• <strong>Mediation:</strong> Neutral facilitation of discussions</li>
                  <li>• <strong>Time-outs:</strong> Breaks for emotional processing</li>
                  <li>• <strong>Ethics Consultation:</strong> External perspective when needed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-purple-600" />
            Cultural and Spiritual Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Cultural competency and spiritual sensitivity are essential components of palliative care communication, requiring awareness of diverse beliefs, practices, and communication styles.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Cultural Assessment
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Family structure and decision-making patterns</li>
                <li>• Language preferences and interpretation needs</li>
                <li>• Religious and spiritual beliefs about illness</li>
                <li>• Death and dying cultural practices</li>
                <li>• Pain expression and medication attitudes</li>
                <li>• Gender roles in healthcare decisions</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Communication Adaptation
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Direct vs. indirect communication styles</li>
                <li>• Eye contact and physical space preferences</li>
                <li>• Information disclosure cultural norms</li>
                <li>• Family involvement expectations</li>
                <li>• Professional interpreter utilization</li>
                <li>• Non-verbal communication awareness</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Spiritual Support
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Chaplaincy and spiritual care referrals</li>
                <li>• Religious ritual accommodation</li>
                <li>• Meaning-making and hope discussions</li>
                <li>• Existential distress recognition</li>
                <li>• Faith community involvement</li>
                <li>• Prayer and meditation support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Communication Documentation:</strong> Thorough documentation of communication encounters, family meetings, and decision-making processes is essential for continuity of care, legal protection, and quality improvement. Include participants, key discussions, decisions made, and follow-up plans.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Self-Care and Professional Boundaries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Emotional Self-Protection</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Professional Boundaries:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Maintain therapeutic relationships while providing compassionate care</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Emotional Processing:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Regular debriefing, supervision, and peer support</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Stress Management:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Personal wellness strategies and work-life balance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Team Communication</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Interdisciplinary Rounds:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Regular team meetings for care coordination</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Conflict Resolution:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Address team disagreements professionally</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">Continuous Learning:</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Communication skills training and feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Excellence in Communication</h4>
        <p className="text-sm text-green-700 dark:text-green-300">
          Mastering palliative care communication requires ongoing practice, reflection, and commitment to 
          professional development. Effective communication serves as both a therapeutic intervention and 
          a foundation for building trust, reducing suffering, and honoring the dignity of patients and 
          families during life's most challenging moments.
        </p>
      </div>
    </div>
  );
}