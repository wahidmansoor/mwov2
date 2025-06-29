import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Home, Hospital, Stethoscope, Video, Globe } from 'lucide-react';

const ModelsOfCare: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          1.3 Models of Palliative Care Delivery
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Flexible and scalable approaches to meet palliative care needs across diverse clinical settings 
          and patient populations
        </p>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Users className="w-3 h-3 mr-1" />
          Care Models
        </Badge>
      </div>

      {/* Introduction */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-300">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            Palliative care is not confined to a single specialty or location—it is a flexible and scalable 
            model of care that can be adapted to meet the needs of patients across diverse clinical settings. 
            To meet growing demand, modern palliative care is delivered through a variety of models that 
            reflect differences in disease trajectory, resource availability, care setting, and provider expertise.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="primary-specialty" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="primary-specialty" className="text-xs">Primary vs Specialty</TabsTrigger>
          <TabsTrigger value="care-settings" className="text-xs">Care Settings</TabsTrigger>
          <TabsTrigger value="specialized-models" className="text-xs">Specialized Models</TabsTrigger>
          <TabsTrigger value="integration" className="text-xs">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="primary-specialty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700 dark:text-purple-300">
                <Stethoscope className="w-5 h-5 mr-2" />
                Primary vs. Specialty Palliative Care
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  A two-tiered model has emerged to meet growing patient needs: <strong>primary palliative care</strong> 
                  and <strong>specialty palliative care</strong>. This division ensures essential palliative care 
                  aspects are integrated into routine practice while allowing escalation to specialist teams for complex cases.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      Primary Palliative Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Basic palliative skills and practices</strong> provided by non-specialist clinicians 
                      as part of standard medical care.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Providers Include:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Primary care physicians</li>
                        <li>• Hospitalists and internists</li>
                        <li>• Oncologists and subspecialists</li>
                        <li>• Nurses and physician assistants</li>
                        <li>• Allied health professionals</li>
                      </ul>

                      <h4 className="font-semibold text-green-800 dark:text-green-300">Core Components:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Basic symptom management (pain, nausea, dyspnea)</li>
                        <li>• Goals of care discussions</li>
                        <li>• Advance care planning</li>
                        <li>• Psychosocial and emotional support</li>
                        <li>• Appropriate referral to specialty care</li>
                      </ul>

                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded">
                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">Training Focus:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Increasingly included in medical school, residency, and nursing curricula. 
                          Tools like VitalTalk and EPEC support training.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Specialty Palliative Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Delivered by an <strong>interdisciplinary team</strong> of clinicians with 
                      <strong>formal training and expertise</strong> in complex symptom management and communication.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Team Members:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Palliative care physicians and nurse practitioners</li>
                        <li>• Registered nurses and case managers</li>
                        <li>• Social workers and chaplains</li>
                        <li>• Pharmacists and psychologists</li>
                        <li>• Grief counselors and spiritual care providers</li>
                      </ul>

                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Referral Indications:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Complex or refractory symptoms</li>
                        <li>• High emotional or existential distress</li>
                        <li>• Family conflict or decisional uncertainty</li>
                        <li>• Advanced care planning for complex cases</li>
                        <li>• Hospice transitions or life support withdrawal</li>
                      </ul>

                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Training Requirements:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Fellowship programs in Hospice and Palliative Medicine with board certification. 
                          Advanced skills in complex symptom management and ethics.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">
                    When to Use Primary vs. Specialty Palliative Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left p-3">Category</th>
                          <th className="text-left p-3">Primary Palliative Care</th>
                          <th className="text-left p-3">Specialty Palliative Care</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-400">
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Symptoms</td>
                          <td className="p-3">Mild to moderate, stable</td>
                          <td className="p-3">Refractory pain, severe dyspnea, intractable nausea</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Disease trajectory</td>
                          <td className="p-3">Predictable chronic illness</td>
                          <td className="p-3">Prognostic uncertainty, late-stage illness</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Decision-making</td>
                          <td className="p-3">Basic advance care planning</td>
                          <td className="p-3">High-risk surgery decisions, ethical dilemmas</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Psychosocial</td>
                          <td className="p-3">Routine emotional support</td>
                          <td className="p-3">Depression, existential suffering, family conflict</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Healthcare use</td>
                          <td className="p-3">Stable outpatient management</td>
                          <td className="p-3">Frequent hospitalizations, caregiver burnout</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="care-settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <Hospital className="w-5 h-5 mr-2" />
                Care Settings and Delivery Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-red-50 dark:bg-red-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      Inpatient Palliative Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Delivered to hospitalized patients either as <strong>consult service</strong> or within 
                      <strong>dedicated palliative care units (PCUs)</strong>.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Consultation Services:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Embedded in tertiary and community hospitals</li>
                        <li>• Interdisciplinary teams available</li>
                        <li>• Refractory symptom management</li>
                        <li>• Goals of care discussions</li>
                        <li>• End-of-life planning and hospice transitions</li>
                      </ul>

                      <h4 className="font-semibold text-red-800 dark:text-red-300">Dedicated PCUs:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Complex symptom control units</li>
                        <li>• Alternative to ICU for appropriate patients</li>
                        <li>• Family presence and communication emphasis</li>
                        <li>• 24/7 palliative care coverage</li>
                      </ul>

                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                        <p className="text-xs text-red-800 dark:text-red-300">
                          <strong>Outcomes:</strong> High patient satisfaction, fewer invasive procedures, 
                          decreased ICU utilization
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Outpatient Palliative Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Provides <strong>longitudinal support</strong> for patients not currently hospitalized. 
                      Increasingly recognized as <strong>proactive model</strong> ideal for early integration.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Structure:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Stand-alone clinics or embedded in specialty centers</li>
                        <li>• Cancer centers, heart failure programs</li>
                        <li>• Primary care integration</li>
                        <li>• Regular scheduled appointments</li>
                      </ul>

                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Services Include:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Symptom assessment and treatment titration</li>
                        <li>• Advance care planning conversations</li>
                        <li>• Coordination with other specialties</li>
                        <li>• Social services coordination</li>
                      </ul>

                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                        <p className="text-xs text-blue-800 dark:text-blue-300">
                          <strong>Evidence:</strong> Improves quality of life, reduces hospitalizations, 
                          may improve survival (Temel et al., 2010)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      Home-Based Palliative Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Brings services directly to patients who are homebound, prefer to remain at home, 
                      or are at the end of life.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Providers:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Home health agencies with palliative training</li>
                        <li>• Specialty palliative teams doing home visits</li>
                        <li>• Hospice providers (if qualified)</li>
                        <li>• Virtual support through telehealth</li>
                      </ul>

                      <h4 className="font-semibold text-green-800 dark:text-green-300">Services Offered:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Assessment and symptom management</li>
                        <li>• Medication management and education</li>
                        <li>• Psychosocial support and counseling</li>
                        <li>• Coordination with hospice services</li>
                      </ul>

                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                        <p className="text-xs text-green-800 dark:text-green-300">
                          <strong>Benefits:</strong> Familiar environment, empowers caregivers, 
                          reduces ED visits, promotes dignified dying
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    Comparative Overview of Care Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left p-3">Aspect</th>
                          <th className="text-left p-3">Inpatient</th>
                          <th className="text-left p-3">Outpatient</th>
                          <th className="text-left p-3">Home-Based</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-400">
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Setting</td>
                          <td className="p-3">Hospital (ward, ICU, PCU)</td>
                          <td className="p-3">Clinic or ambulatory setting</td>
                          <td className="p-3">Patient's home</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Focus</td>
                          <td className="p-3">Acute issues, high symptom burden</td>
                          <td className="p-3">Longitudinal care, early integration</td>
                          <td className="p-3">End-of-life or homebound support</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Team</td>
                          <td className="p-3">Full interdisciplinary team</td>
                          <td className="p-3">Smaller teams or co-located</td>
                          <td className="p-3">Virtual or visiting staff</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Continuity</td>
                          <td className="p-3">Episodic, tied to admission</td>
                          <td className="p-3">High continuity over time</td>
                          <td className="p-3">High continuity, supports dying</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Ideal For</td>
                          <td className="p-3">Uncontrolled symptoms, crisis</td>
                          <td className="p-3">Stable symptoms, planning</td>
                          <td className="p-3">Bedbound, end-stage patients</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specialized-models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-teal-700 dark:text-teal-300">
                <Users className="w-5 h-5 mr-2" />
                Specialized and Innovative Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-amber-50 dark:bg-amber-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-700 dark:text-amber-300">
                      Long-Term Care Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Palliative care increasingly embedded in skilled nursing facilities (SNFs) 
                      and assisted living environments.
                    </p>
                    
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300">Services:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Continuity for residents with complex needs</li>
                      <li>• Staff support in symptom management</li>
                      <li>• Goals of care addressing</li>
                      <li>• Smooth transitions to hospice</li>
                      <li>• Embedded nurse practitioners</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-700 dark:text-orange-300">
                      Pediatric Palliative Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Specialized models recognizing unique developmental, emotional, and family needs 
                      of children with serious illness.
                    </p>
                    
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300">Features:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Hospital, outpatient, and home delivery</li>
                      <li>• Child life specialists integration</li>
                      <li>• Developmental counselors</li>
                      <li>• Support throughout illness, not just end-of-life</li>
                      <li>• Collaboration with neonatology, oncology, genetics</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      Community-Based Models
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Innovative models extending palliative care beyond traditional venues, 
                      particularly valuable in resource-limited settings.
                    </p>
                    
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300">Examples:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Community paramedic programs for symptom crises</li>
                      <li>• Public health initiatives training volunteers</li>
                      <li>• Integrated delivery networks (IDNs)</li>
                      <li>• Risk stratification and automated flagging</li>
                      <li>• Community health worker programs</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Telepalliative Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      COVID-19 pandemic accelerated adoption of telehealth platforms for 
                      delivering palliative care services.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Benefits:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Improved access in remote areas</li>
                          <li>• Flexibility for mobility limitations</li>
                          <li>• Ongoing monitoring between visits</li>
                          <li>• Cost-effective delivery</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Challenges:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Technological barriers</li>
                          <li>• Licensing restrictions</li>
                          <li>• Virtual communication training</li>
                          <li>• Digital divide issues</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">
                    Benefits of Tiered and Diverse Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">For Patients</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Timely access to supportive care</li>
                        <li>• Fewer delays due to workforce shortages</li>
                        <li>• Enhanced quality of life and communication</li>
                        <li>• Choice in care settings and providers</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">For Clinicians</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Efficient allocation of specialty resources</li>
                        <li>• Reduced burnout among generalists</li>
                        <li>• Improved confidence in end-of-life care</li>
                        <li>• Professional development opportunities</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">For Health Systems</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Fewer avoidable hospitalizations</li>
                        <li>• Greater hospice utilization when appropriate</li>
                        <li>• Earlier identification of unmet needs</li>
                        <li>• Cost-effective care delivery</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-rose-700 dark:text-rose-300">
                <Globe className="w-5 h-5 mr-2" />
                Integration and Coordination of Care
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  Palliative care is most effective when <strong>fluidly integrated</strong> across settings. 
                  Effective systems ensure patients receive the right level of care, in the right place, 
                  at the right time.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-300">
                    Seamless Care Transitions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Typical Care Pathway:</h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge className="bg-red-100 text-red-800 border-red-300">Inpatient Consultation</Badge>
                      <span className="text-gray-400">→</span>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">Outpatient Follow-up</Badge>
                      <span className="text-gray-400">→</span>
                      <Badge className="bg-green-100 text-green-800 border-green-300">Home-based Care</Badge>
                      <span className="text-gray-400">→</span>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300">Hospice Transition</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Essential Elements:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Communication between teams and systems</li>
                        <li>• Electronic health record integration</li>
                        <li>• Case manager coordination</li>
                        <li>• Standardized handoff protocols</li>
                        <li>• Family communication continuity</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Quality Measures:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Care plan portability and updates</li>
                        <li>• Medication reconciliation</li>
                        <li>• Goals of care documentation</li>
                        <li>• Family satisfaction scores</li>
                        <li>• Transition time metrics</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-300">
                    Collaboration and Continuity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-green-700 dark:text-green-300">
                          Shared Responsibility
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Primary clinicians address routine issues while palliative specialists 
                          provide targeted support for complex cases.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-blue-700 dark:text-blue-300">
                          Relationship Continuity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Primary clinicians maintain longitudinal relationships while specialists 
                          provide short-term consults or shared care.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 dark:bg-purple-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-purple-700 dark:text-purple-300">
                          Education and Mentorship
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Specialists train and support generalists, improving overall 
                          system capability and confidence.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">
                    Barriers and Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left p-3">Challenge</th>
                          <th className="text-left p-3">Response/Solution</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-400">
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Lack of generalist confidence</td>
                          <td className="p-3">Provide structured training and mentorship programs</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Misconceptions about palliative care</td>
                          <td className="p-3">Clarify that palliative care is not limited to dying patients</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Limited specialty access in rural areas</td>
                          <td className="p-3">Use telehealth platforms and support primary care training</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Fragmented care coordination</td>
                          <td className="p-3">Integrate EMR alerts and develop shared care plans</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Workforce shortages</td>
                          <td className="p-3">Expand fellowship programs and improve primary palliative care skills</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Future Directions and Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Emerging Models:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• AI-assisted symptom monitoring</li>
                        <li>• Mobile palliative care units</li>
                        <li>• Integrated health system approaches</li>
                        <li>• Population health management</li>
                        <li>• Precision palliative care</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Quality Improvement:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Patient-reported outcome measures</li>
                        <li>• Real-time feedback systems</li>
                        <li>• Continuous quality improvement</li>
                        <li>• Evidence-based practice implementation</li>
                        <li>• Health equity initiatives</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Conclusion */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Conclusion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            Primary and specialty palliative care are complementary, not competing, components of a comprehensive 
            care system for patients with serious illness. Whether provided by a primary care clinician managing 
            basic symptoms or a specialty team navigating complex ethical decisions, the goal remains the same: 
            to relieve suffering and support patients and families through the course of serious illness. 
            Understanding and implementing various models of delivery allows health systems to extend palliative 
            care equitably, sustainably, and effectively across all populations and settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelsOfCare;