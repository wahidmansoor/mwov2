import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Atom, Zap, Calculator, Target, Activity, BarChart3 } from 'lucide-react';

const BasicRadiationPhysics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          1.2 Basic Radiation Physics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Fundamental principles of radiation generation, interaction, and measurement in oncology
        </p>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Atom className="w-3 h-3 mr-1" />
          Physics Fundamentals
        </Badge>
      </div>

      {/* Introduction */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-300">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            Radiation oncology relies on the application of ionizing radiation to treat malignant diseases by 
            inducing damage to the DNA of cancer cells. The safe and effective use of radiation therapy requires 
            a foundational understanding of radiation physics—how radiation is generated, how it interacts with 
            matter, and how it is measured and controlled. These principles underpin every step of the treatment 
            process, from simulation and planning to delivery and quality assurance.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="types-radiation" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="types-radiation" className="text-xs">Types of Radiation</TabsTrigger>
          <TabsTrigger value="dose-units" className="text-xs">Dose & Units</TabsTrigger>
          <TabsTrigger value="interactions" className="text-xs">Interactions</TabsTrigger>
          <TabsTrigger value="bed-eqd2" className="text-xs">BED & EQD2</TabsTrigger>
          <TabsTrigger value="quality-assurance" className="text-xs">Quality Assurance</TabsTrigger>
        </TabsList>

        <TabsContent value="types-radiation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700 dark:text-purple-300">
                <Atom className="w-5 h-5 mr-2" />
                Types of Radiation Used in Oncology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Electromagnetic Radiation (Photons)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="border-l-4 border-l-blue-400 pl-3">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">X-rays</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                          <li>• Produced by linear accelerators (LINACs)</li>
                          <li>• Energy range: 4 to 25 megavolts (MV)</li>
                          <li>• Mainstay of external beam radiation therapy</li>
                          <li>• Travel at speed of light, no mass or charge</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-l-green-400 pl-3">
                        <h4 className="font-semibold text-green-800 dark:text-green-300">Gamma Rays</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                          <li>• Emitted by radioactive isotopes (cobalt-60)</li>
                          <li>• Discrete energy levels (1.17 and 1.33 MeV)</li>
                          <li>• Used in brachytherapy and Gamma Knife</li>
                          <li>• Stochastic tissue interactions</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      Particulate Radiation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="border-l-4 border-l-purple-400 pl-3">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-300">Electrons</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                          <li>• Energy range: 6–20 MeV</li>
                          <li>• Limited penetration (~4–6 cm)</li>
                          <li>• Superficial tumors (skin, chest wall)</li>
                          <li>• Rapid dose fall-off beyond target</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-l-orange-400 pl-3">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-300">Protons</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                          <li>• Energy range: 70–250 MeV</li>
                          <li>• Bragg Peak energy deposition</li>
                          <li>• Minimal exit dose</li>
                          <li>• Pediatric and critical-structure tumors</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-l-red-400 pl-3">
                        <h4 className="font-semibold text-red-800 dark:text-red-300">Carbon Ions</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                          <li>• High linear energy transfer (LET)</li>
                          <li>• Enhanced biological effectiveness</li>
                          <li>• RBE 2–3 compared to photons</li>
                          <li>• Specialized centers only</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">
                    Clinical Characteristics Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left p-2">Radiation Type</th>
                          <th className="text-left p-2">Mass</th>
                          <th className="text-left p-2">Charge</th>
                          <th className="text-left p-2">LET</th>
                          <th className="text-left p-2">Penetration</th>
                          <th className="text-left p-2">Clinical Use</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-400">
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-2 font-medium">X-rays</td>
                          <td className="p-2">No</td>
                          <td className="p-2">No</td>
                          <td className="p-2">Low</td>
                          <td className="p-2">Deep</td>
                          <td className="p-2">Standard EBRT, IMRT, VMAT</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-2 font-medium">Gamma rays</td>
                          <td className="p-2">No</td>
                          <td className="p-2">No</td>
                          <td className="p-2">Low</td>
                          <td className="p-2">Deep</td>
                          <td className="p-2">Brachytherapy, radiosurgery</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-2 font-medium">Electrons</td>
                          <td className="p-2">Yes</td>
                          <td className="p-2">Yes</td>
                          <td className="p-2">Low-Medium</td>
                          <td className="p-2">Superficial</td>
                          <td className="p-2">Skin, chest wall, boosts</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-2 font-medium">Protons</td>
                          <td className="p-2">Yes</td>
                          <td className="p-2">Yes</td>
                          <td className="p-2">Medium</td>
                          <td className="p-2">Modulated</td>
                          <td className="p-2">Pediatric, CNS, spinal tumors</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Carbon ions</td>
                          <td className="p-2">Yes</td>
                          <td className="p-2">Yes</td>
                          <td className="p-2">High</td>
                          <td className="p-2">Modulated</td>
                          <td className="p-2">Resistant tumors (sarcomas)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dose-units" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <Calculator className="w-5 h-5 mr-2" />
                Radiation Dose and Units
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      Absorbed Dose
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                      <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Definition</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Energy deposited by radiation in a unit mass of tissue
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          1 Gray (Gy) = 1 joule/kilogram
                        </div>
                        <div className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          1 Gy = 100 centigray (cGy)
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Clinical Example</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Standard prostate cancer treatment: 78 Gy delivered in daily 2 Gy fractions
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Dose Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3">
                      <div className="border-l-4 border-l-blue-400 pl-3">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">Conventional</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">1–6 Gy/min (LINAC treatments)</p>
                      </div>
                      
                      <div className="border-l-4 border-l-green-400 pl-3">
                        <h4 className="font-semibold text-green-800 dark:text-green-300">Low-Dose-Rate (LDR)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">0.4–2 Gy/h (permanent seed implants)</p>
                      </div>
                      
                      <div className="border-l-4 border-l-orange-400 pl-3">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-300">High-Dose-Rate (HDR)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Greater than 12 Gy/h (short sessions)</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Clinical Impact</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Higher rates cause more immediate DNA damage; lower rates allow sublethal repair
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    Clinical Dose Ranges by Site
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left p-3">Site/Tumor Type</th>
                          <th className="text-left p-3">Typical Total Dose</th>
                          <th className="text-left p-3">Fraction Size</th>
                          <th className="text-left p-3">Treatment Approach</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-400">
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Breast (whole)</td>
                          <td className="p-3">45–50 Gy</td>
                          <td className="p-3">1.8–2 Gy</td>
                          <td className="p-3">Conventional fractionation</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Head and Neck (definitive)</td>
                          <td className="p-3">66–70 Gy</td>
                          <td className="p-3">2 Gy</td>
                          <td className="p-3">Standard fractionation</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Prostate (conventional)</td>
                          <td className="p-3">76–80 Gy</td>
                          <td className="p-3">1.8–2 Gy</td>
                          <td className="p-3">Standard fractionation</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="p-3 font-medium">Prostate (hypofractionated)</td>
                          <td className="p-3">60 Gy</td>
                          <td className="p-3">3 Gy</td>
                          <td className="p-3">Moderate hypofractionation</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Brain Metastases (SRS)</td>
                          <td className="p-3">18–24 Gy</td>
                          <td className="p-3">Single fraction</td>
                          <td className="p-3">Stereotactic radiosurgery</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700 dark:text-orange-300">
                <Target className="w-5 h-5 mr-2" />
                Interaction of Radiation with Matter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  The therapeutic effects of radiation depend on how energy from ionizing radiation is transferred 
                  to biological tissues. These interactions initiate molecular damage, particularly to DNA, which 
                  underpins the efficacy of radiation therapy in cancer treatment.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Photon Interactions (X-rays and Gamma Rays)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="bg-red-50 dark:bg-red-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-red-700 dark:text-red-300">
                            Photoelectric Effect
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Occurs at low energies (less than 30 keV)</li>
                            <li>• Photon transfers all energy to inner-shell electron</li>
                            <li>• Strongly dependent on atomic number (Z³)</li>
                            <li>• Important in diagnostic imaging</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-green-50 dark:bg-green-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-green-700 dark:text-green-300">
                            Compton Scattering
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Dominant in megavoltage therapy</li>
                            <li>• Photon transfers partial energy to outer electron</li>
                            <li>• Weakly dependent on atomic number</li>
                            <li>• Produces recoil electrons for local dose</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-purple-50 dark:bg-purple-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-purple-700 dark:text-purple-300">
                            Pair Production
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Requires energy greater than 1.022 MeV</li>
                            <li>• Photon converts to electron-positron pair</li>
                            <li>• Increases with energy and atomic number</li>
                            <li>• Minimal at standard treatment energies</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      Charged Particle Interactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-blue-50 dark:bg-blue-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-blue-700 dark:text-blue-300">
                            Electrons
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <h5 className="text-xs font-semibold text-blue-800 dark:text-blue-300">Interactions:</h5>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              <li>• Collisional losses (ionization/excitation)</li>
                              <li>• Radiative losses (bremsstrahlung)</li>
                            </ul>
                            <h5 className="text-xs font-semibold text-blue-800 dark:text-blue-300">Characteristics:</h5>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              <li>• Sharp dose falloff at finite depth</li>
                              <li>• Useful for superficial treatments</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-orange-50 dark:bg-orange-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-orange-700 dark:text-orange-300">
                            Protons
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <h5 className="text-xs font-semibold text-orange-800 dark:text-orange-300">Bragg Peak:</h5>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              <li>• Minimal dose along entry path</li>
                              <li>• Sharp peak at defined depth</li>
                              <li>• Rapid dose drop to near zero</li>
                            </ul>
                            <h5 className="text-xs font-semibold text-orange-800 dark:text-orange-300">Clinical Benefits:</h5>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              <li>• Highly conformal dose delivery</li>
                              <li>• Spares structures beyond tumor</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      High LET Particles and Neutrons
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-red-50 dark:bg-red-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-red-700 dark:text-red-300">
                            Carbon Ions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• High linear energy transfer (LET)</li>
                            <li>• Dense ionization tracks</li>
                            <li>• Complex, irreparable DNA damage</li>
                            <li>• Higher RBE than photons/protons</li>
                            <li>• Effective for radioresistant tumors</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-gray-700 dark:text-gray-300">
                            Neutrons
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Uncharged particles</li>
                            <li>• Interact via nuclear reactions</li>
                            <li>• Produce recoil protons with high LET</li>
                            <li>• High RBE but poor conformality</li>
                            <li>• Limited use due to complexity</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Clinical Implications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Photon Therapy</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Versatile but deposits exit dose beyond target
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Protons/Carbon Ions</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Enable normal tissue sparing beyond tumor
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Electrons</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Ideal for superficial targets, limited depth
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bed-eqd2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700 dark:text-red-300">
                <BarChart3 className="w-5 h-5 mr-2" />
                Biologically Effective Dose (BED) and EQD2
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Purpose</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Fractionation delivers radiation in multiple smaller doses to exploit normal tissue repair capacity. 
                  To compare different fractionation regimens, the biologically effective dose (BED) and equivalent 
                  dose in 2 Gy fractions (EQD2) are used.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      BED Formula
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                      <div className="font-mono text-center text-lg mb-3">
                        BED = nd × (1 + d/(α/β))
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-semibold">n:</span> Number of fractions</div>
                        <div><span className="font-semibold">d:</span> Dose per fraction</div>
                        <div><span className="font-semibold">α/β:</span> Tissue-specific radiosensitivity ratio</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Typical α/β Ratios</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Tumors (acute-responding):</span>
                          <span className="font-mono">~10 Gy</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Late-responding tissues:</span>
                          <span className="font-mono">~2–3 Gy</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prostate cancer:</span>
                          <span className="font-mono">~1.5 Gy</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      EQD2 Formula
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                      <div className="font-mono text-center text-lg mb-3">
                        EQD2 = BED / (1 + 2/(α/β))
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Converts BED values into equivalent dose delivered in 2 Gy fractions
                      </p>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Clinical Use</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Particularly useful in re-irradiation scenarios or when combining treatment 
                        schedules using different fractionation patterns
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    Clinical Example: BED and EQD2 Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
                      Standard Fractionation: 60 Gy in 30 fractions (2 Gy/fraction)
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-300">BED Calculation (α/β = 10):</h5>
                        <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded text-sm">
                          BED = 60 × (1 + 2/10)<br/>
                          BED = 60 × 1.2 = 72 Gy
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-300">EQD2 Calculation:</h5>
                        <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded text-sm">
                          EQD2 = 72 / (1 + 2/10)<br/>
                          EQD2 = 72 / 1.2 = 60 Gy
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-green-100 dark:bg-green-900/30 rounded">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        This confirms that 60 Gy in 30 fractions is biologically equivalent to 60 Gy EQD2, 
                        validating the standard fractionation approach.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality-assurance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-700 dark:text-gray-300">
                <Activity className="w-5 h-5 mr-2" />
                Quality Assurance and Calibration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">Critical Importance</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Accurate dose delivery is critical in radiation therapy. Quality assurance protocols ensure 
                  safe, precise, and reproducible treatment delivery across all radiation modalities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Dosimetry Systems
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Ion Chambers</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Used to calibrate output in water phantoms</li>
                        <li>• Primary standard for dose measurement</li>
                        <li>• Traceable to national standards</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">TG-51 Protocol (AAPM)</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Standard method for calibrating LINACs</li>
                        <li>• Absorbed dose to water protocol</li>
                        <li>• Annual calibration requirements</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      Treatment Planning Systems
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Calculation Algorithms</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Monte Carlo simulations</li>
                        <li>• Convolution-superposition methods</li>
                        <li>• Accurate dose distribution modeling</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Validation</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Phantom measurements</li>
                        <li>• Independent dose calculations</li>
                        <li>• Patient-specific QA</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    ICRU Guidelines and Dose Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">ICRU Standards</h4>
                      <div className="space-y-2">
                        <div className="border-l-4 border-l-blue-400 pl-3">
                          <h5 className="text-sm font-semibold text-blue-700 dark:text-blue-300">ICRU 50/62</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Established terminology for target volumes (GTV, CTV, PTV) and dose coverage
                          </p>
                        </div>
                        
                        <div className="border-l-4 border-l-green-400 pl-3">
                          <h5 className="text-sm font-semibold text-green-700 dark:text-green-300">ICRU 83</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Updated guidance for IMRT, emphasizing volume-based prescription and DVH analysis
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Dose-Volume Histograms</h4>
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded">
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Graphical representation of dose distribution</li>
                          <li>• Assess target coverage and OAR constraints</li>
                          <li>• Essential for plan evaluation and comparison</li>
                          <li>• Quality metric for treatment delivery</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Basic radiation physics serves as the foundation of clinical radiation oncology. From understanding 
                    the physical nature of radiation to mastering how it interacts with tissue and how dose is quantified 
                    and controlled, physics informs every clinical decision. As treatments become increasingly personalized 
                    and precise, mastery of these principles remains essential for safe, effective, and innovative cancer care.
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

export default BasicRadiationPhysics;