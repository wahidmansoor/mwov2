import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Heart, Brain, Shield, Target, Activity, AlertTriangle, Zap } from "lucide-react";

export default function PsychosocialCare() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Chapter 5: Psychosocial Care and Support
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Mental Health</Badge>
            <Badge variant="outline">Family Support</Badge>
            <Badge variant="outline">Grief Counseling</Badge>
            <Badge variant="outline">Social Work</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Psychosocial care addresses the emotional, psychological, social, and spiritual needs of patients and families facing serious illness, providing comprehensive support throughout the disease trajectory and bereavement period.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter explores evidence-based interventions for psychological distress, family dynamics, grief and bereavement, social determinants of health, and the integration of mental health services within palliative care teams.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-blue-600" />
              Psychological Assessment and Interventions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Common Psychological Conditions</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Adjustment Disorders:</strong> Reaction to illness diagnosis</li>
                  <li>• <strong>Depression:</strong> Major depressive episodes, dysthymia</li>
                  <li>• <strong>Anxiety Disorders:</strong> Generalized anxiety, panic attacks</li>
                  <li>• <strong>Delirium:</strong> Acute confusional states</li>
                  <li>• <strong>PTSD:</strong> Medical trauma, treatment-related stress</li>
                  <li>• <strong>Existential Distress:</strong> Meaning and purpose concerns</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Screening and Assessment Tools</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Depression</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">PHQ-9, BDI-II, HADS</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Anxiety</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">GAD-7, BAI, STAI</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                    <div className="font-medium text-xs">Distress</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">DT, BSI-18</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Delirium</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">CAM, 3D-CAM</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Therapeutic Interventions</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Cognitive Behavioral Therapy:</strong> Thought and behavior modification</li>
                  <li>• <strong>Acceptance and Commitment Therapy:</strong> Mindfulness-based approach</li>
                  <li>• <strong>Meaning-Centered Psychotherapy:</strong> Existential therapy</li>
                  <li>• <strong>Dignity Therapy:</strong> Life review and legacy building</li>
                  <li>• <strong>Supportive Counseling:</strong> Active listening and validation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-rose-600" />
              Family-Centered Care and Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Family Assessment</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Family Structure:</strong> Relationships, roles, dynamics</li>
                  <li>• <strong>Communication Patterns:</strong> Information sharing preferences</li>
                  <li>• <strong>Coping Mechanisms:</strong> Adaptive vs maladaptive strategies</li>
                  <li>• <strong>Cultural Background:</strong> Values, beliefs, traditions</li>
                  <li>• <strong>Resource Availability:</strong> Social, financial, practical support</li>
                  <li>• <strong>Caregiver Burden:</strong> Physical and emotional strain</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Family Interventions</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Family Meetings:</strong> Structured communication sessions</li>
                  <li>• <strong>Caregiver Support Groups:</strong> Peer support networks</li>
                  <li>• <strong>Respite Care:</strong> Temporary caregiver relief</li>
                  <li>• <strong>Educational Programs:</strong> Disease and care management</li>
                  <li>• <strong>Conflict Resolution:</strong> Mediation and negotiation skills</li>
                  <li>• <strong>Anticipatory Guidance:</strong> Preparation for disease progression</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Pediatric Considerations</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Age-Appropriate Communication:</strong> Developmental considerations</li>
                  <li>• <strong>School Support:</strong> Educational continuity</li>
                  <li>• <strong>Sibling Support:</strong> Addressing needs of healthy children</li>
                  <li>• <strong>Legacy Activities:</strong> Memory-making opportunities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Grief, Bereavement, and Loss
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Grief and bereavement care extends beyond the patient's death, providing ongoing support to families through the complex process of mourning and adjustment to life without their loved one.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Types of Grief
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Anticipatory Grief:</strong> Before death occurs</li>
                <li>• <strong>Normal Grief:</strong> Expected mourning process</li>
                <li>• <strong>Complicated Grief:</strong> Prolonged, intense grieving</li>
                <li>• <strong>Disenfranchised Grief:</strong> Socially unrecognized loss</li>
                <li>• <strong>Ambiguous Loss:</strong> Unclear or incomplete loss</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Bereavement Services
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Risk Assessment:</strong> Identifying vulnerable bereaved</li>
                <li>• <strong>Individual Counseling:</strong> One-on-one grief therapy</li>
                <li>• <strong>Support Groups:</strong> Peer support networks</li>
                <li>• <strong>Memorial Services:</strong> Ritualized remembrance</li>
                <li>• <strong>Follow-up Contact:</strong> Regular check-ins post-death</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Special Populations
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Children and Adolescents:</strong> Age-specific grief responses</li>
                <li>• <strong>Elderly Bereaved:</strong> Multiple losses, isolation risks</li>
                <li>• <strong>Cultural Minorities:</strong> Culturally responsive bereavement</li>
                <li>• <strong>LGBTQ+ Families:</strong> Unique challenges and needs</li>
                <li>• <strong>Sudden Death:</strong> Traumatic grief responses</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Integrated Care Approach:</strong> Effective psychosocial care requires seamless integration with medical care, including early identification of distress, timely referrals, and coordinated interventions. Regular team communication ensures comprehensive support for patients and families.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Social Determinants and Community Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Social Work Assessment</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    Psychosocial Assessment Areas
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Housing Stability:</strong> Homelessness risk, safety concerns</li>
                    <li>• <strong>Financial Resources:</strong> Insurance, medication access</li>
                    <li>• <strong>Transportation:</strong> Barriers to care access</li>
                    <li>• <strong>Food Security:</strong> Nutritional needs, meal assistance</li>
                    <li>• <strong>Social Isolation:</strong> Support network assessment</li>
                    <li>• <strong>Legal Issues:</strong> Advance directives, guardianship</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    Intervention Strategies
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Resource Linkage:</strong> Community service connections</li>
                    <li>• <strong>Advocacy:</strong> Systems navigation support</li>
                    <li>• <strong>Crisis Intervention:</strong> Emergency support services</li>
                    <li>• <strong>Discharge Planning:</strong> Safe transition coordination</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Community Integration</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Community Resources</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Volunteer Programs:</strong> Companionship, practical support</li>
                    <li>• <strong>Faith Communities:</strong> Spiritual care, congregational support</li>
                    <li>• <strong>Support Organizations:</strong> Disease-specific groups</li>
                    <li>• <strong>Educational Programs:</strong> Community health initiatives</li>
                    <li>• <strong>Recreational Therapy:</strong> Quality of life activities</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Technology Integration</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Telehealth Counseling:</strong> Remote therapy access</li>
                    <li>• <strong>Online Support Groups:</strong> Virtual peer connections</li>
                    <li>• <strong>Mental Health Apps:</strong> Self-management tools</li>
                    <li>• <strong>Family Communication Platforms:</strong> Care coordination</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Holistic Psychosocial Care</h4>
        <p className="text-sm text-purple-700 dark:text-purple-300">
          Effective psychosocial care requires a team-based approach integrating mental health professionals, 
          social workers, chaplains, and trained volunteers. Cultural competence, trauma-informed care, 
          and strength-based interventions optimize outcomes for patients and families throughout the 
          illness trajectory and into bereavement.
        </p>
      </div>
    </div>
  );
}