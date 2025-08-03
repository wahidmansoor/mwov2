import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Users, Brain, Shield, Target, Activity, AlertTriangle, CheckCircle } from "lucide-react";

export default function SpiritualCare() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-violet-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-violet-600" />
            Chapter 6: Spiritual Care and Meaning-Making
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Spiritual Assessment</Badge>
            <Badge variant="outline">Meaning-Making</Badge>
            <Badge variant="outline">Religious Diversity</Badge>
            <Badge variant="outline">End-of-Life Care</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Spiritual care addresses the search for meaning, purpose, and connection that becomes especially important when facing serious illness, death, and loss. It encompasses religious, spiritual, and existential dimensions of human experience.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter explores spiritual assessment tools, evidence-based interventions, interfaith considerations, and the integration of chaplaincy services within comprehensive palliative care teams.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-blue-600" />
              Spiritual Assessment and Screening
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Assessment Tools</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>FICA Assessment:</strong> Faith, Importance, Community, Address</li>
                  <li>• <strong>HOPE Questions:</strong> Sources of hope, organized religion, personal spirituality, effects</li>
                  <li>• <strong>SPIRIT Assessment:</strong> Comprehensive spiritual history</li>
                  <li>• <strong>Spiritual Pain Assessment Scale:</strong> Quantitative spiritual distress measure</li>
                  <li>• <strong>Functional Assessment of Chronic Illness Therapy-Spiritual (FACIT-Sp):</strong> Validated tool</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Domains of Spiritual Assessment</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Meaning/Purpose</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Life significance, values</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Transcendence</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Connection beyond self</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                    <div className="font-medium text-xs">Hope/Peace</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Inner tranquility, future orientation</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Faith/Beliefs</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Religious traditions, worldview</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Spiritual Distress Indicators</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Existential Questions:</strong> "Why me?" "What's the point?"</li>
                  <li>• <strong>Religious Struggle:</strong> Anger at God, divine abandonment</li>
                  <li>• <strong>Loss of Meaning:</strong> Purposelessness, despair</li>
                  <li>• <strong>Guilt/Shame:</strong> Self-blame, moral distress</li>
                  <li>• <strong>Fear of Death:</strong> Afterlife concerns, unfinished business</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-rose-600" />
              Religious and Cultural Diversity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Major Religious Traditions</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Christianity:</strong> Sacraments, prayer, pastoral care</li>
                  <li>• <strong>Islam:</strong> Salah prayers, facing Mecca, halal considerations</li>
                  <li>• <strong>Judaism:</strong> Shabbat observance, kosher diet, ritual requirements</li>
                  <li>• <strong>Hinduism:</strong> Karma, dharma, ritual purity</li>
                  <li>• <strong>Buddhism:</strong> Meditation, suffering acceptance, mindfulness</li>
                  <li>• <strong>Indigenous Traditions:</strong> Ancestral connections, nature spirituality</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">End-of-Life Practices</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Death Preparation:</strong> Last rites, confession, ritual cleansing</li>
                  <li>• <strong>Family Involvement:</strong> Bedside presence, decision-making roles</li>
                  <li>• <strong>Body Handling:</strong> Cultural requirements, timing considerations</li>
                  <li>• <strong>Mourning Practices:</strong> Grief expressions, memorial traditions</li>
                  <li>• <strong>Afterlife Beliefs:</strong> Heaven, reincarnation, ancestral realm</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Cultural Competence</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Avoid Assumptions:</strong> Individual variation within traditions</li>
                  <li>• <strong>Ask Questions:</strong> Patient/family preferences inquiry</li>
                  <li>• <strong>Respect Practices:</strong> Accommodate religious observances</li>
                  <li>• <strong>Language Barriers:</strong> Interpreter services for spiritual care</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Spiritual Interventions and Therapeutic Approaches
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Evidence-based spiritual interventions address existential distress, enhance coping resources, and support meaning-making processes throughout the illness trajectory.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Meaning-Centered Interventions
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Life Review:</strong> Biographical narrative therapy</li>
                <li>• <strong>Legacy Work:</strong> Meaningful contribution projects</li>
                <li>• <strong>Values Clarification:</strong> Core beliefs identification</li>
                <li>• <strong>Purpose Exploration:</strong> Life mission discernment</li>
                <li>• <strong>Dignity Therapy:</strong> Generativity and wisdom sharing</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Contemplative Practices
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Meditation:</strong> Mindfulness and centering prayer</li>
                <li>• <strong>Contemplative Reading:</strong> Sacred text reflection</li>
                <li>• <strong>Imagery:</strong> Guided spiritual visualization</li>
                <li>• <strong>Music Therapy:</strong> Sacred music and hymns</li>
                <li>• <strong>Art Therapy:</strong> Creative spiritual expression</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Ritual and Ceremony
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Healing Rituals:</strong> Blessing and anointing ceremonies</li>
                <li>• <strong>Transition Rituals:</strong> Life stage acknowledgments</li>
                <li>• <strong>Memorial Practices:</strong> Remembrance and honor rituals</li>
                <li>• <strong>Forgiveness Rituals:</strong> Reconciliation and release</li>
                <li>• <strong>Sacred Space:</strong> Environmental spiritual enhancement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Professional Boundaries:</strong> Spiritual care respects patient autonomy and religious diversity. Healthcare providers should recognize their scope of practice and appropriately refer to qualified chaplains or religious leaders for specialized spiritual interventions.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            Chaplaincy Services and Team Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Professional Chaplaincy</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Chaplain Qualifications
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Educational Requirements:</strong> Master's degree in theology or divinity</li>
                    <li>• <strong>Clinical Training:</strong> CPE (Clinical Pastoral Education) units</li>
                    <li>• <strong>Board Certification:</strong> Professional chaplaincy credentials</li>
                    <li>• <strong>Interfaith Competence:</strong> Multi-religious knowledge and skills</li>
                    <li>• <strong>Continuing Education:</strong> Ongoing professional development</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-500" />
                    Core Competencies
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Spiritual Assessment:</strong> Comprehensive evaluation skills</li>
                    <li>• <strong>Crisis Intervention:</strong> Acute spiritual distress management</li>
                    <li>• <strong>Ritual Leadership:</strong> Ceremonial and sacramental functions</li>
                    <li>• <strong>Ethics Consultation:</strong> Moral and values-based guidance</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Interdisciplinary Collaboration</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Team Integration</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Rounds Participation:</strong> Regular team communication</li>
                    <li>• <strong>Care Planning:</strong> Spiritual dimension integration</li>
                    <li>• <strong>Consultation Services:</strong> Specialist spiritual assessment</li>
                    <li>• <strong>Staff Support:</strong> Healthcare team spiritual wellness</li>
                    <li>• <strong>Family Meetings:</strong> Values clarification facilitation</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Outcome Measures</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Spiritual Well-being:</strong> FACIT-Sp scores improvement</li>
                    <li>• <strong>Quality of Life:</strong> Existential dimension enhancement</li>
                    <li>• <strong>Coping Resources:</strong> Spiritual strength mobilization</li>
                    <li>• <strong>Family Satisfaction:</strong> Spiritual care experience ratings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
        <h4 className="font-medium text-violet-800 dark:text-violet-200 mb-2">Holistic Spiritual Care Integration</h4>
        <p className="text-sm text-violet-700 dark:text-violet-300">
          Effective spiritual care requires sensitivity to diverse beliefs, professional chaplaincy services, 
          and integration within multidisciplinary teams. Evidence-based spiritual interventions enhance 
          coping, meaning-making, and quality of life while respecting individual autonomy and religious 
          diversity throughout the palliative care journey.
        </p>
      </div>
    </div>
  );
}