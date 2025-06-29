import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Zap, Target, Globe, Award, TrendingUp } from 'lucide-react';

const HistoryEvolution: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          1.1 History and Evolution of Radiation Therapy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          From the discovery of X-rays to modern precision radiation therapy techniques
        </p>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Clock className="w-3 h-3 mr-1" />
          Historical Perspective
        </Badge>
      </div>

      {/* Introduction */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="text-purple-700 dark:text-purple-300">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Radiation therapy (RT) is a cornerstone of modern cancer treatment, employed in over 50% of all cancer 
            patients during their care. Its evolution has been shaped by advances in physics, biology, engineering, 
            and clinical medicine. Understanding the historical development of radiation therapy provides essential 
            context for the techniques, technologies, and clinical strategies in use today.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="early-discoveries" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="early-discoveries" className="text-xs">Early Discoveries</TabsTrigger>
          <TabsTrigger value="radium-era" className="text-xs">Radium Era</TabsTrigger>
          <TabsTrigger value="external-beam" className="text-xs">External Beam</TabsTrigger>
          <TabsTrigger value="linacs" className="text-xs">Linear Accelerators</TabsTrigger>
          <TabsTrigger value="modern-techniques" className="text-xs">Modern Techniques</TabsTrigger>
          <TabsTrigger value="future-directions" className="text-xs">Future Directions</TabsTrigger>
        </TabsList>

        <TabsContent value="early-discoveries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                <Award className="w-5 h-5 mr-2" />
                Early Discoveries and Foundations (1895-1900)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-blue-700 dark:text-blue-300">1895</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-2">Wilhelm Conrad Röntgen</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Discovered X-rays, revolutionizing diagnostic medicine
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-green-700 dark:text-green-300">1896</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-2">Henri Becquerel</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Discovered natural radioactivity in uranium
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-purple-700 dark:text-purple-300">1898</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-2">Marie and Pierre Curie</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Isolated radium, paving the way for therapeutic applications
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="border-l-4 border-l-orange-400 pl-4 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-r">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">First Clinical Application</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  In 1896, the first documented use of X-rays for skin cancer was reported, 
                  initiating the era of therapeutic radiology.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radium-era" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <Zap className="w-5 h-5 mr-2" />
                The Radium Era and Early Clinical Use (1900-1950)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Brachytherapy Development</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    The early 20th century saw rapid adoption of radium for intracavitary and surface applications:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Radium was initially applied without shielding or dose regulation</li>
                    <li>• Led to frequent injuries and complications</li>
                    <li>• Term "brachytherapy" (from Greek "brachy" meaning "short") emerged</li>
                    <li>• Used for both malignant and benign conditions with crude methods</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border border-yellow-200 dark:border-yellow-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-yellow-700 dark:text-yellow-300">Challenges</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Dosimetry was poorly understood</li>
                        <li>• Biological effects were underappreciated</li>
                        <li>• No standardized safety protocols</li>
                        <li>• High complication rates</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border border-blue-200 dark:border-blue-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-blue-700 dark:text-blue-300">Advances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Development of applicators</li>
                        <li>• Introduction of protective shielding</li>
                        <li>• Emergence of treatment protocols</li>
                        <li>• Recognition of dose-response relationships</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external-beam" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                <Target className="w-5 h-5 mr-2" />
                Rise of External Beam Therapy and Cobalt Machines (1950s)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                  Major Shift in Radiation Oncology
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  The 1950s marked a major shift with the development of teletherapy units, 
                  particularly cobalt-60 machines, which emitted gamma rays and allowed for deeper tumor treatment.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-green-700 dark:text-green-300">Advantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Better skin sparing</li>
                      <li>• Greater dose delivery to internal malignancies</li>
                      <li>• Replaced radium and orthovoltage machines</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-purple-700 dark:text-purple-300">Global Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Reliability and lower cost</li>
                      <li>• Widespread global use</li>
                      <li>• Especially valuable in resource-limited settings</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-orange-700 dark:text-orange-300">Clinical Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Improved dose distribution</li>
                      <li>• Enhanced treatment precision</li>
                      <li>• Better patient outcomes</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linacs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700 dark:text-purple-300">
                <TrendingUp className="w-5 h-5 mr-2" />
                Advent of Linear Accelerators (1960s-1970s)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
                  Medical Linear Accelerators (LINACs)
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  The introduction of medical linear accelerators in the 1960s–1970s allowed production of 
                  high-energy X-rays (megavoltage), offering multiple advantages over previous technologies.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Key Advantages</h4>
                  <div className="space-y-3">
                    <Card className="border border-green-200 dark:border-green-700">
                      <CardContent className="p-3">
                        <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                          Improved Dose Distribution
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Better dose distribution and normal tissue sparing
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-200 dark:border-blue-700">
                      <CardContent className="p-3">
                        <h5 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                          Dual Capability
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Capability to generate electron beams for superficial treatment
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border border-purple-200 dark:border-purple-700">
                      <CardContent className="p-3">
                        <h5 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
                          Beam Shaping
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Enabled beam shaping and depth targeting
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Global Adoption</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      LINACs quickly became the global standard for external beam radiation therapy (EBRT), 
                      replacing cobalt-based systems in most advanced centers.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">Standard of Care</Badge>
                      <Badge variant="outline" className="text-xs">Global Adoption</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modern-techniques" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                  <Target className="w-5 h-5 mr-2" />
                  Imaging and Simulation Advances (1980s-1990s)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">CT Simulation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Allowed 3D visualization of anatomy and precise treatment planning
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">3D-CRT</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        CT-based treatment planning systems introduced 3D conformal radiation therapy
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 dark:bg-purple-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Image Fusion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Integration with MRI and PET further refined target delineation
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-700 dark:text-orange-300">
                  Modern Precision Techniques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Card className="border border-blue-200 dark:border-blue-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-blue-700 dark:text-blue-300">
                          IMRT (Late 1990s)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Dynamic multileaf collimators (MLCs)</li>
                          <li>• Modulated beam intensity</li>
                          <li>• Conformal dose distributions</li>
                          <li>• Reduced OAR exposure</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-green-200 dark:border-green-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-green-700 dark:text-green-300">
                          IGRT
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Real-time imaging during treatment</li>
                          <li>• Cone-beam CT integration</li>
                          <li>• Accurate targeting of mobile tumors</li>
                          <li>• Enhanced safety protocols</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Card className="border border-purple-200 dark:border-purple-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-purple-700 dark:text-purple-300">
                          SRS/SBRT
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• High-dose radiation in 1–5 fractions</li>
                          <li>• Sub-millimeter precision</li>
                          <li>• Brain, spine, lung, liver applications</li>
                          <li>• Rigid immobilization required</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-orange-200 dark:border-orange-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-orange-700 dark:text-orange-300">
                          Adaptive RT
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Treatment plan modification during therapy</li>
                          <li>• AI and deformable registration</li>
                          <li>• Daily imaging integration</li>
                          <li>• Personalized dosing</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-300">
                  Particle Therapy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-blue-700 dark:text-blue-300">Proton Therapy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Bragg peak energy delivery</li>
                        <li>• Minimal exit dose</li>
                        <li>• Ideal for pediatric tumors</li>
                        <li>• Select adult applications</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 dark:bg-purple-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-purple-700 dark:text-purple-300">Carbon Ion Therapy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• High-LET radiation</li>
                        <li>• Greater biological effect</li>
                        <li>• Limited to specialized centers</li>
                        <li>• Ongoing comparative trials</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="future-directions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700 dark:text-red-300">
                <Globe className="w-5 h-5 mr-2" />
                Safety, QA, and Global Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Quality Assurance Evolution</h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>• Multi-disciplinary safety checks</li>
                      <li>• Standardized training programs</li>
                      <li>• AAPM, ESTRO, IAEA guidelines</li>
                      <li>• Formal certification requirements</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Global Access Challenges</h4>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      The Lancet Oncology Commission highlighted a large global deficit in RT infrastructure:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Limited access in low-middle income regions</li>
                      <li>• Ongoing efforts to improve availability</li>
                      <li>• Focus on affordability and equity</li>
                      <li>• Technology dissemination initiatives</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Radiation therapy has evolved dramatically over the past century, transitioning from unshielded 
                    radium applications to highly precise, image-guided, and biologically informed treatments. 
                    Continued innovation in physics, imaging, biology, and informatics promises to further refine 
                    cancer care. However, global disparities in access remain a challenge, underscoring the 
                    importance of technology dissemination and policy support.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoryEvolution;