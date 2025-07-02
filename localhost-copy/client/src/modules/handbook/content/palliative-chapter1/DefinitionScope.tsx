import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Target, Globe, AlertCircle, CheckCircle } from 'lucide-react';

const DefinitionScope: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          1.1 Definition and Scope
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Understanding palliative care as a specialized discipline focused on improving quality of life 
          for individuals facing serious illness
        </p>
        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
          <Heart className="w-3 h-3 mr-1" />
          WHO Definition
        </Badge>
      </div>

      {/* WHO Definition */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
            <Globe className="w-5 h-5 mr-2" />
            WHO Definition of Palliative Care (2002)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-l-blue-400">
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              "Palliative care is an approach that improves the quality of life of patients and their families 
              facing the problems associated with life-threatening illness, through the prevention and relief of 
              suffering by means of early identification and impeccable assessment and treatment of pain and 
              other problems, physical, psychosocial and spiritual."
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              — World Health Organization, 2002
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="scope" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scope">Scope of Care</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="misconceptions">Misconceptions</TabsTrigger>
          <TabsTrigger value="principles">Core Principles</TabsTrigger>
        </TabsList>

        <TabsContent value="scope" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700 dark:text-purple-300">
                <Target className="w-5 h-5 mr-2" />
                Scope of Palliative Care
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  Palliative care is not defined by diagnosis but by the <strong>presence of serious health-related suffering</strong>. 
                  Its application is broad and includes patients across age groups and disease stages.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      Chronic and Life-Limiting Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Advanced cancer (all types)</li>
                      <li>• Heart failure and cardiovascular disease</li>
                      <li>• Chronic obstructive pulmonary disease (COPD)</li>
                      <li>• Interstitial lung disease (ILD)</li>
                      <li>• Chronic kidney disease (CKD)</li>
                      <li>• Advanced liver disease</li>
                      <li>• Progressive neurologic disorders (ALS, Parkinson's, MS)</li>
                      <li>• Dementia and cognitive impairment syndromes</li>
                      <li>• Pediatric congenital and genetic disorders</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-orange-700 dark:text-orange-300">
                      Complex Medical Situations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Multimorbidity and frailty in older adults</li>
                      <li>• Complex symptom burden requiring coordination</li>
                      <li>• Serious acute illness (ICU admissions)</li>
                      <li>• Sudden catastrophic events (massive stroke)</li>
                      <li>• Trauma with poor prognosis</li>
                      <li>• End-stage organ failure</li>
                      <li>• Recurrent hospitalizations</li>
                      <li>• Functional decline with suffering</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-300">
                    Timing and Trajectory of Palliative Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left p-3">Illness Phase</th>
                          <th className="text-left p-3">Role of Palliative Care</th>
                          <th className="text-left p-3">Key Activities</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-400">
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Diagnosis</td>
                          <td className="p-3">Supportive counseling, symptom relief</td>
                          <td className="p-3">Care planning, emotional support</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Active treatment</td>
                          <td className="p-3">Management of side effects, decision support</td>
                          <td className="p-3">Symptom control, goals of care discussions</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Progressive decline</td>
                          <td className="p-3">Reassessment of goals, enhanced symptom control</td>
                          <td className="p-3">Advanced care planning, family support</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">End of life</td>
                          <td className="p-3">Intensive comfort-focused care</td>
                          <td className="p-3">Hospice transition, death preparation</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Bereavement</td>
                          <td className="p-3">Grief counseling and emotional support</td>
                          <td className="p-3">Family support, memorial services</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domains" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <Users className="w-5 h-5 mr-2" />
                Five Domains of Palliative Care
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-50 dark:bg-red-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      1. Physical Domain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Common Symptoms:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Pain (acute and chronic)</li>
                        <li>• Dyspnea and respiratory distress</li>
                        <li>• Nausea and vomiting</li>
                        <li>• Fatigue and weakness</li>
                        <li>• Anorexia and weight loss</li>
                        <li>• Constipation and bowel issues</li>
                        <li>• Sleep disturbances</li>
                      </ul>
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Approach:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Evidence-based symptom management through pharmacologic and non-pharmacologic interventions
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      2. Psychological and Emotional Domain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Common Issues:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Anxiety and panic disorders</li>
                        <li>• Depression and mood disorders</li>
                        <li>• Adjustment disorders</li>
                        <li>• Existential distress</li>
                        <li>• Fear and uncertainty</li>
                        <li>• Grief and anticipatory grief</li>
                        <li>• Cognitive impairment</li>
                      </ul>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Interventions:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Counseling, behavioral interventions, pharmacologic support, and psychological assessment
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      3. Social Domain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Key Areas:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Impact on roles and relationships</li>
                        <li>• Work and career disruption</li>
                        <li>• Financial strain and insurance issues</li>
                        <li>• Healthcare system navigation</li>
                        <li>• Caregiving resources and support</li>
                        <li>• Community and social isolation</li>
                        <li>• Housing and transportation needs</li>
                      </ul>
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Support:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Social work intervention, resource coordination, and family system assessment
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 dark:bg-amber-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-amber-700 dark:text-amber-300">
                      4. Spiritual Domain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300">Components:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Meaning and purpose in suffering</li>
                        <li>• Hope and transcendence</li>
                        <li>• Religious and spiritual beliefs</li>
                        <li>• Legacy and life review</li>
                        <li>• Forgiveness and reconciliation</li>
                        <li>• Connection to the sacred</li>
                        <li>• End-of-life rituals</li>
                      </ul>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300">Approach:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Spiritual assessment, chaplaincy involvement, and respect for diverse beliefs
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-700 dark:text-gray-300">
                    5. Ethical and Legal Domain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">Key Elements:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Advance care planning and directives</li>
                        <li>• Shared decision-making processes</li>
                        <li>• Capacity assessment and surrogate decision-makers</li>
                        <li>• Patient advocacy and rights</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">Ethical Principles:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Autonomy and self-determination</li>
                        <li>• Beneficence and non-maleficence</li>
                        <li>• Justice and fair distribution of resources</li>
                        <li>• Truth-telling and informed consent</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="misconceptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700 dark:text-red-300">
                <AlertCircle className="w-5 h-5 mr-2" />
                Common Misconceptions and Clarifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Despite growing recognition, misconceptions about palliative care persist and may delay 
                  appropriate referrals, reducing potential benefits for patients and families.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="border border-red-200 dark:border-red-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      ❌ Misconception: "Palliative care = end-of-life care"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">✓ Reality:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Palliative care can and should be introduced <strong>early in illness</strong>, even during 
                        active treatment. It includes end-of-life care but begins much earlier in the disease trajectory.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-red-200 dark:border-red-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      ❌ Misconception: "It means giving up on treatment"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">✓ Reality:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Palliative care <strong>coexists with active treatment</strong> and enhances outcomes. 
                        It focuses on improving quality of life alongside curative or life-prolonging therapies.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-red-200 dark:border-red-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      ❌ Misconception: "Only for cancer patients"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">✓ Reality:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Palliative care serves <strong>all serious illnesses</strong>, including cardiac, pulmonary, 
                        renal, neurologic, and other chronic conditions with significant symptom burden.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-red-200 dark:border-red-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      ❌ Misconception: "Requires a specialist referral"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">✓ Reality:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Primary palliative care</strong> can be delivered by any trained clinician. 
                        Specialty palliative care is reserved for complex cases requiring expert intervention.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-300">
                    Settings of Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Palliative care is <strong>not confined to one location</strong>. It is provided across:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• <strong>Inpatient:</strong> hospitals, ICUs, acute palliative care units</li>
                      <li>• <strong>Outpatient:</strong> ambulatory clinics for chronic disease management</li>
                      <li>• <strong>Home-based care:</strong> home visits and telepalliative services</li>
                    </ul>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• <strong>Long-term care:</strong> nursing facilities, assisted living</li>
                      <li>• <strong>Hospice:</strong> for patients near end of life who forego curative intent</li>
                      <li>• <strong>Community:</strong> support groups, respite care</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="principles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <CheckCircle className="w-5 h-5 mr-2" />
                Core Principles of Palliative Care
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-rose-50 dark:bg-rose-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-rose-700 dark:text-rose-300">
                      Relief of Suffering
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Primary objective to relieve suffering in all dimensions—physical, psychological, 
                      social, emotional, and existential distress.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Evidence-based symptom interventions</li>
                      <li>• Patient comfort as clinical outcome</li>
                      <li>• Urgent treatment of uncontrolled symptoms</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Affirmation of Life
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Affirms life as valuable and meaningful at every stage, including end of life. 
                      Does not seek to hasten or prolong life at all costs.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Dying recognized as personal experience</li>
                      <li>• Quality of life over quantity</li>
                      <li>• Respectful approach to death</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      Interdisciplinary Team Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Diverse team of professionals works together to address multiple facets of suffering and support.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Physicians, nurses, social workers</li>
                      <li>• Chaplains, pharmacists, psychologists</li>
                      <li>• Integrated care plans and continuity</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      Early Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Most effective when introduced early in disease trajectory, ideally at diagnosis 
                      of serious illness.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Improves quality of life outcomes</li>
                      <li>• May extend survival in some populations</li>
                      <li>• Reduces stigma through normalization</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-rose-50 to-blue-50 dark:from-rose-900/20 dark:to-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Palliative Care vs. Curative Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left p-3">Aspect</th>
                          <th className="text-left p-3">Curative Treatment</th>
                          <th className="text-left p-3">Palliative Care</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-400">
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Goal</td>
                          <td className="p-3">Eliminate disease</td>
                          <td className="p-3">Relieve suffering, improve quality of life</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Timing</td>
                          <td className="p-3">Often early in disease</td>
                          <td className="p-3">Any stage, often early and in parallel</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Success metrics</td>
                          <td className="p-3">Tumor response, survival</td>
                          <td className="p-3">Symptom relief, functional improvement, dignity</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Compatibility</td>
                          <td className="p-3 text-green-600 dark:text-green-400">Can be combined</td>
                          <td className="p-3 text-green-600 dark:text-green-400">Complementary, not exclusive</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Conclusion */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Conclusion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            Palliative care is a dynamic and essential discipline that prioritizes the well-being of patients 
            and their families facing serious illness. It shifts the focus from disease alone to the whole person, 
            emphasizing dignity, comfort, and quality of life. Understanding its broad scope, early applicability, 
            and integrative model is crucial for clinicians in every specialty and setting. As healthcare 
            increasingly values patient-centered care, palliative care stands as a cornerstone of compassionate, 
            evidence-based medicine.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DefinitionScope;