import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Network, TrendingUp, Target } from "lucide-react";

export default function InterdisciplinaryTeamIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 8: Interdisciplinary Team and Systems of Care
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Collaborative Care Models and Team Dynamics
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">Team-Based Care</Badge>
          <Badge variant="secondary">Quality Improvement</Badge>
          <Badge variant="secondary">Integration</Badge>
        </div>
      </div>

      <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Interdisciplinary Team Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Effective palliative care requires a coordinated interdisciplinary approach 
            that addresses the complex physical, emotional, social, and spiritual needs 
            of patients and families. This chapter explores team composition, communication 
            strategies, and integration with other healthcare specialties.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Network className="h-4 w-4" />
                Core Team Members
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs">MD</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Physicians</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Medical management, prognosis, treatment decisions</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs">RN</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Nurses</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Direct care, patient education, family support</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <span className="text-white text-xs">SW</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Social Workers</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Psychosocial support, resources, discharge planning</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xs">Ch</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Chaplains</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Spiritual care, meaning-making, ritual support</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Extended Team
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Clinical Pharmacists:</strong> Medication optimization and management</li>
                <li>• <strong>Mental Health Professionals:</strong> Psychiatric and psychological care</li>
                <li>• <strong>Physical/Occupational Therapists:</strong> Functional assessment and mobility</li>
                <li>• <strong>Dietitians:</strong> Nutritional assessment and counseling</li>
                <li>• <strong>Music/Art Therapists:</strong> Creative and expressive therapies</li>
                <li>• <strong>Volunteers:</strong> Companionship and practical support</li>
                <li>• <strong>Bereavement Coordinators:</strong> Grief and loss support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Network className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              Team Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Communication Strategies</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Regular interdisciplinary team meetings</li>
                <li>• Structured communication tools (SBAR)</li>
                <li>• Shared documentation systems</li>
                <li>• Family conferences and care planning</li>
                <li>• Conflict resolution processes</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Care Coordination</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Care plan development and updates</li>
                <li>• Role clarification and boundaries</li>
                <li>• Handoff communication</li>
                <li>• Crisis response coordination</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Quality Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Quality Metrics</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Pain and symptom control outcomes</li>
                <li>• Patient and family satisfaction</li>
                <li>• Length of stay and readmission rates</li>
                <li>• Advance directive completion</li>
                <li>• Bereavement follow-up rates</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Integration Strategies</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Primary palliative care education</li>
                <li>• Specialty consultation models</li>
                <li>• Electronic health record integration</li>
                <li>• Performance improvement initiatives</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
          Team Effectiveness Factors
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-green-700 dark:text-green-300">
          <div>
            <strong>Communication:</strong>
            <ul className="ml-4 mt-1">
              <li>• Open and honest dialogue</li>
              <li>• Regular team meetings</li>
              <li>• Conflict resolution skills</li>
            </ul>
          </div>
          <div>
            <strong>Collaboration:</strong>
            <ul className="ml-4 mt-1">
              <li>• Shared decision-making</li>
              <li>• Mutual respect and trust</li>
              <li>• Role clarity and flexibility</li>
            </ul>
          </div>
          <div>
            <strong>Support:</strong>
            <ul className="ml-4 mt-1">
              <li>• Team building activities</li>
              <li>• Continuing education</li>
              <li>• Staff well-being programs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}