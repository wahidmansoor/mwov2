import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dna, Shield, Repeat, Clock, Heart, BarChart3 } from 'lucide-react';

const RadiationBiology: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          1.3 Radiation Biology
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Understanding how ionizing radiation affects living organisms from DNA to tissue levels
        </p>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Dna className="w-3 h-3 mr-1" />
          Biological Mechanisms
        </Badge>
      </div>

      {/* Introduction */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-300">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            Radiation biology is the study of the effects of ionizing radiation on living organisms, from 
            DNA-level damage to tissue-level responses. In radiation oncology, understanding how radiation 
            impacts both cancer cells and normal tissues is essential for designing effective and safe treatments. 
            The biological effectiveness depends on dose, dose rate, radiation quality (LET), cellular repair 
            capacity, oxygenation, and cell cycle phase.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="dna-damage" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dna-damage" className="text-xs">DNA Damage</TabsTrigger>
          <TabsTrigger value="cell-cycle" className="text-xs">Cell Cycle</TabsTrigger>
          <TabsTrigger value="let-rbe" className="text-xs">LET & RBE</TabsTrigger>
          <TabsTrigger value="four-rs" className="text-xs">Four R's</TabsTrigger>
          <TabsTrigger value="hypoxia" className="text-xs">Hypoxia</TabsTrigger>
          <TabsTrigger value="survival-models" className="text-xs">Survival Models</TabsTrigger>
        </TabsList>

        <TabsContent value="dna-damage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700 dark:text-red-300">
                <Dna className="w-5 h-5 mr-2" />
                DNA Damage and Repair Mechanisms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Fundamental Target</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The biological impact of ionizing radiation in cancer therapy is fundamentally driven by its 
                  ability to damage DNA. While radiation can interact with many cellular structures, the most 
                  lethal and clinically relevant damage occurs at the level of the genome.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Mechanisms of Damage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="border-l-4 border-l-blue-400 pl-3">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">Direct Effect</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Radiation directly ionizes DNA molecules, causing immediate structural damage
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-l-green-400 pl-3">
                        <h4 className="font-semibold text-green-800 dark:text-green-300">Indirect Effect</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Radiation ionizes water molecules (radiolysis), producing free radicals (hydroxyl radicals) 
                          that damage DNA
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Key Fact</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The indirect effect accounts for ~70% of DNA damage in low LET radiation (X-rays, gamma rays)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      Types of DNA Lesions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-300 text-sm mb-1">Base Damage</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Loss or modification of nucleotides; often repaired efficiently
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">Single-Strand Breaks (SSBs)</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Breaks in one strand; common and usually repaired quickly using undamaged strand
                        </p>
                      </div>

                      <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded border border-red-200 dark:border-red-700">
                        <h4 className="font-semibold text-red-800 dark:text-red-300 text-sm mb-1">Double-Strand Breaks (DSBs)</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Most lethal lesion</strong> - simultaneous breaks in both strands; 
                          can lead to cell death or chromosomal aberrations
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-300 text-sm mb-1">DNA Crosslinks</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Covalent links between strands or DNA-proteins; obstruct replication/transcription
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">
                    Cellular DNA Repair Pathways
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Card className="bg-green-50 dark:bg-green-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-green-700 dark:text-green-300">
                            Base Excision Repair (BER)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Repairs small, non-helix-distorting lesions</li>
                            <li>• Initiated by DNA glycosylases</li>
                            <li>• Active throughout cell cycle</li>
                            <li>• Handles SSBs efficiently</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50 dark:bg-blue-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-blue-700 dark:text-blue-300">
                            Nucleotide Excision Repair (NER)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Removes bulky helix-distorting lesions</li>
                            <li>• More relevant for UV damage</li>
                            <li>• Removes short single-stranded segments</li>
                            <li>• Less important for ionizing radiation</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <Card className="bg-red-50 dark:bg-red-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-red-700 dark:text-red-300">
                            Non-Homologous End Joining (NHEJ)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li><strong>• Dominant DSB repair pathway</strong></li>
                            <li>• Joins broken ends without sequence homology</li>
                            <li>• Error-prone: insertions/deletions possible</li>
                            <li>• Active throughout cell cycle, especially G1</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-purple-50 dark:bg-purple-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-purple-700 dark:text-purple-300">
                            Homologous Recombination (HR)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Uses sister chromatid as template</li>
                            <li>• High-fidelity repair mechanism</li>
                            <li>• Restricted to S and G2 phases</li>
                            <li>• Critical for complex damage repair</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Clinical Note</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Tumors with defective HR (e.g., BRCA1/2 mutations) are more sensitive to radiation and 
                      DNA-damaging agents and may benefit from <strong>PARP inhibitors</strong> through synthetic lethality.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cell-cycle" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                <Repeat className="w-5 h-5 mr-2" />
                Cell Cycle and Radiosensitivity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  Cellular sensitivity to radiation varies significantly throughout the cell cycle, 
                  influencing treatment timing and fractionation strategies.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 border-2">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800 dark:text-gray-200">
                      Radiosensitivity by Cell Cycle Phase
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-600">
                            <th className="text-left p-2">Phase</th>
                            <th className="text-left p-2">Radiosensitivity</th>
                            <th className="text-left p-2">Characteristics</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 dark:text-gray-400">
                          <tr className="border-b border-gray-100 dark:border-gray-700 bg-red-50 dark:bg-red-900/20">
                            <td className="p-2 font-medium">G2/M</td>
                            <td className="p-2 font-semibold text-red-600">Highest</td>
                            <td className="p-2">Condensed chromatin, limited repair time</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-700 bg-yellow-50 dark:bg-yellow-900/20">
                            <td className="p-2 font-medium">G1</td>
                            <td className="p-2 font-semibold text-yellow-600">Intermediate</td>
                            <td className="p-2">NHEJ repair predominant</td>
                          </tr>
                          <tr className="bg-green-50 dark:bg-green-900/20">
                            <td className="p-2 font-medium">S phase</td>
                            <td className="p-2 font-semibold text-green-600">Most resistant</td>
                            <td className="p-2">High DNA repair activity</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="bg-red-50 dark:bg-red-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-red-700 dark:text-red-300">
                        Mitosis (M Phase) - Most Sensitive
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Chromatin highly condensed</li>
                        <li>• Limited time for DNA repair</li>
                        <li>• Cell division machinery vulnerable</li>
                        <li>• Critical for cell survival</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-900/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-green-700 dark:text-green-300">
                        S Phase - Most Resistant
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Active DNA replication machinery</li>
                        <li>• Enhanced repair protein activity</li>
                        <li>• HR repair pathway available</li>
                        <li>• Sister chromatids present for repair</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Clinical Implications for Fractionation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    This variation explains the use of fractionation to expose different cell populations 
                    during radiosensitive phases over time, optimizing treatment effectiveness.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Redistribution Benefits</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Cells move into sensitive phases between fractions</li>
                        <li>• Enhances overall treatment effectiveness</li>
                        <li>• Synchronizes tumor cell populations</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Treatment Optimization</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Daily fractionation captures cycling cells</li>
                        <li>• Multiple exposures during sensitive phases</li>
                        <li>• Improved tumor control probability</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="let-rbe" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700 dark:text-purple-300">
                <BarChart3 className="w-5 h-5 mr-2" />
                Linear Energy Transfer (LET) and Relative Biological Effectiveness (RBE)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      Linear Energy Transfer (LET)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Definition</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Energy deposited per unit path length (keV/μm). Influences complexity and reparability of DNA damage.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="border-l-4 border-l-blue-400 pl-3">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">Low LET Radiation</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• X-rays, gamma rays, electrons</li>
                          <li>• Sparse ionization patterns</li>
                          <li>• More repairable damage</li>
                          <li>• Standard clinical radiation</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-l-red-400 pl-3">
                        <h4 className="font-semibold text-red-800 dark:text-red-300">High LET Radiation</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Neutrons, carbon ions, alpha particles</li>
                          <li>• Dense ionization tracks</li>
                          <li>• Complex, less repairable damage</li>
                          <li>• Specialized applications</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-700 dark:text-orange-300">
                      Relative Biological Effectiveness (RBE)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Formula</h4>
                      <div className="font-mono text-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        RBE = Dose of reference radiation / Dose of test radiation
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        (for same biological effect; reference typically 250 kVp X-rays)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300">Clinical RBE Values</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between bg-white dark:bg-gray-800 p-2 rounded">
                          <span>Protons:</span>
                          <span className="font-mono">RBE ~1.1</span>
                        </div>
                        <div className="flex justify-between bg-white dark:bg-gray-800 p-2 rounded">
                          <span>Carbon ions:</span>
                          <span className="font-mono">RBE ~2–3</span>
                        </div>
                        <div className="flex justify-between bg-white dark:bg-gray-800 p-2 rounded">
                          <span>Fast neutrons:</span>
                          <span className="font-mono">RBE ~3–10</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">
                    LET-RBE Relationship and Clinical Factors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-300">LET-RBE Curve Characteristics</h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• RBE increases with LET up to ~100 keV/μm</li>
                          <li>• Peak efficiency around 100 keV/μm</li>
                          <li>• "Overkill" occurs at very high LET</li>
                          <li>• Optimal LET for biological effect</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-300">RBE Influencing Factors</h4>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Tissue type and radiosensitivity</li>
                          <li>• Radiation quality and energy</li>
                          <li>• Dose level and fractionation</li>
                          <li>• Biological endpoint measured</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Clinical Implications</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Understanding LET and RBE is crucial for particle therapy planning, where different radiation 
                      types require different dose prescriptions to achieve equivalent biological effects. High LET 
                      radiation is particularly valuable for treating radioresistant or hypoxic tumors.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="four-rs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <Shield className="w-5 h-5 mr-2" />
                The Four R's of Radiobiology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Foundation of Fractionation</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The Four R's describe the biological rationale for delivering radiation over multiple fractions, 
                  exploiting differences between tumor and normal tissue responses to optimize therapeutic outcomes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      1. Repair
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Mechanism</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Normal cells repair sublethal damage better than tumor cells between fractions
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Clinical Benefit</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Normal tissue sparing</li>
                        <li>• Improved therapeutic ratio</li>
                        <li>• Allows higher total doses</li>
                        <li>• Reduces late effects</li>
                      </ul>
                    </div>

                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                      <p className="text-xs text-blue-800 dark:text-blue-300">
                        <strong>Key:</strong> Fractionation allows normal tissue repair between treatments
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      2. Repopulation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Mechanism</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Both normal and tumor cells can repopulate between fractions
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Clinical Considerations</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Accelerated tumor repopulation after ~3–4 weeks</li>
                        <li>• Most significant in head and neck cancers</li>
                        <li>• Can reduce treatment efficacy</li>
                        <li>• Drives accelerated fractionation schedules</li>
                      </ul>
                    </div>

                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                      <p className="text-xs text-red-800 dark:text-red-300">
                        <strong>Challenge:</strong> Tumor repopulation can counteract treatment effects
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      3. Redistribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Mechanism</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cells move into more radiosensitive phases (G2/M) between fractions
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Clinical Benefit</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Synchronizes tumor cell populations</li>
                        <li>• Enhances overall treatment effectiveness</li>
                        <li>• Optimizes cell cycle targeting</li>
                        <li>• Improves tumor control probability</li>
                      </ul>
                    </div>

                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                      <p className="text-xs text-purple-800 dark:text-purple-300">
                        <strong>Advantage:</strong> More cells in sensitive phases over time
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-700 dark:text-orange-300">
                      4. Reoxygenation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300">Mechanism</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Hypoxic tumor regions become reoxygenated between fractions
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300">Clinical Benefit</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Overcomes hypoxic radioresistance</li>
                        <li>• Improves radiosensitivity over time</li>
                        <li>• Enhances DNA damage fixation</li>
                        <li>• Critical for tumor control</li>
                      </ul>
                    </div>

                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded">
                      <p className="text-xs text-orange-800 dark:text-orange-300">
                        <strong>Key:</strong> Previously hypoxic cells become radiosensitive
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Clinical Integration of the Four R's
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Together, these principles justify the delivery of radiotherapy in multiple fractions and form 
                    the foundation of standard treatment regimens. They enable the design of fractionation schedules 
                    that maximize tumor control while minimizing normal tissue toxicity.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Conventional Fractionation</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 1.8–2 Gy per fraction daily</li>
                        <li>• Optimizes all four R's</li>
                        <li>• Standard of care for most tumors</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Alternative Schedules</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Hypofractionation: larger doses, fewer fractions</li>
                        <li>• Hyperfractionation: smaller doses, more fractions</li>
                        <li>• Accelerated: shortened overall time</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hypoxia" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700 dark:text-red-300">
                <Heart className="w-5 h-5 mr-2" />
                Tumor Hypoxia and the Oxygen Effect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Clinical Significance</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Hypoxic tumor regions are more radioresistant and often correlate with poor prognosis. 
                  Understanding the oxygen effect is crucial for optimizing radiation therapy effectiveness 
                  and developing strategies to overcome radioresistance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Oxygen Enhancement Effect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Mechanism</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Oxygen enhances low LET radiation effectiveness via the oxygen fixation hypothesis:
                        </p>
                        <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-2 ml-3">
                          <li>1. Radiation-induced free radicals cause DNA damage</li>
                          <li>2. In presence of oxygen, radicals form permanent damage</li>
                          <li>3. Without oxygen, damage can be chemically repaired</li>
                        </ol>
                      </div>

                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                          Oxygen Enhancement Ratio (OER)
                        </h4>
                        <div className="font-mono text-center bg-white dark:bg-gray-800 p-2 rounded mb-2">
                          OER = Dose under hypoxia / Dose under oxygenated conditions
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Typically ~2.5–3 for low LET radiation (X-rays, gamma rays)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-700 dark:text-orange-300">
                      Clinical Hypoxia Characteristics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="border-l-4 border-l-red-400 pl-3">
                        <h4 className="font-semibold text-red-800 dark:text-red-300">Chronic Hypoxia</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Result of poor tumor vasculature</li>
                          <li>• Cells distant from blood vessels</li>
                          <li>• Stable hypoxic regions</li>
                          <li>• Most clinically significant</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-l-orange-400 pl-3">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-300">Acute Hypoxia</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Temporary vascular shutdown</li>
                          <li>• Intermittent perfusion</li>
                          <li>• Variable oxygen levels</li>
                          <li>• Can benefit from reoxygenation</li>
                        </ul>
                      </div>

                      <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">
                          Prognostic Impact
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Hypoxic tumors correlate with poor prognosis, increased metastatic potential, 
                          and resistance to both radiation and chemotherapy
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    Strategies to Overcome Hypoxic Radioresistance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Card className="bg-green-50 dark:bg-green-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-green-700 dark:text-green-300">
                            Oxygenation Enhancement
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• <strong>Hyperbaric oxygen:</strong> Increase tissue oxygen</li>
                            <li>• <strong>Carbogen breathing:</strong> CO₂ + O₂ mixture</li>
                            <li>• <strong>Angiogenesis modulation:</strong> Normalize vasculature</li>
                            <li>• <strong>Hemoglobin optimization:</strong> Treat anemia</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50 dark:bg-blue-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-blue-700 dark:text-blue-300">
                            Radiosensitizers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• <strong>Nimorazole:</strong> Hypoxic cell radiosensitizer</li>
                            <li>• <strong>Tirapazamine:</strong> Selectively toxic to hypoxic cells</li>
                            <li>• <strong>Metronidazole:</strong> Electron affinic compounds</li>
                            <li>• <strong>Clinical trials:</strong> Various agents under investigation</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <Card className="bg-red-50 dark:bg-red-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-red-700 dark:text-red-300">
                            High LET Radiation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• <strong>Carbon ions:</strong> Less oxygen dependent</li>
                            <li>• <strong>Neutrons:</strong> Reduced OER (~1.5–2)</li>
                            <li>• <strong>Direct DNA damage:</strong> Bypasses oxygen requirement</li>
                            <li>• <strong>Complex lesions:</strong> Harder to repair</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-purple-50 dark:bg-purple-900/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm text-purple-700 dark:text-purple-300">
                            Fractionation Benefits
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• <strong>Reoxygenation:</strong> Between fractions</li>
                            <li>• <strong>Vascular changes:</strong> Improved perfusion</li>
                            <li>• <strong>Cell kill:</strong> Reduces oxygen demand</li>
                            <li>• <strong>Redistribution:</strong> Sensitizes remaining cells</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                      Future Directions
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Research continues into hypoxia imaging (PET, MRI), targeted therapies for hypoxic cells, 
                      and combination approaches integrating radiation with immunotherapy and antiangiogenic agents. 
                      Understanding tumor microenvironment heterogeneity is crucial for personalized treatment approaches.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="survival-models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-700 dark:text-gray-300">
                <BarChart3 className="w-5 h-5 mr-2" />
                Cell Survival Curves and Linear-Quadratic Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">Quantitative Radiobiology</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Cell survival curves and mathematical models like the Linear-Quadratic (LQ) model provide 
                  quantitative frameworks for understanding dose-response relationships and comparing different 
                  fractionation schedules in radiation therapy.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Cell Survival Curves
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Definition</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Radiation dose-response relationships showing the fraction of surviving cells vs. dose
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Semi-logarithmic plot (log survival vs. linear dose)</li>
                          <li>• Characteristic curved shape for mammalian cells</li>
                          <li>• Reflects multiple mechanisms of cell death</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">Curve Components</h4>
                        <div className="space-y-1 text-sm">
                          <div className="border-l-4 border-l-green-400 pl-2">
                            <strong>Initial shoulder:</strong> Sublethal damage repair
                          </div>
                          <div className="border-l-4 border-l-red-400 pl-2">
                            <strong>Linear portion:</strong> Logarithmic cell kill
                          </div>
                          <div className="border-l-4 border-l-purple-400 pl-2">
                            <strong>Exponential survival:</strong> Single-hit kinetics
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      Linear-Quadratic (LQ) Model
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                      <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Mathematical Formula</h4>
                      <div className="font-mono text-center bg-gray-100 dark:bg-gray-700 p-3 rounded text-lg">
                        S = e^(-αD - βD²)
                      </div>
                      <div className="mt-3 space-y-1 text-sm">
                        <div><strong>S:</strong> Surviving fraction</div>
                        <div><strong>D:</strong> Dose</div>
                        <div><strong>α:</strong> Linear component (single-hit killing)</div>
                        <div><strong>β:</strong> Quadratic component (two-event killing)</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Model Components</h4>
                      <div className="space-y-1 text-sm">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                          <strong>α term:</strong> Direct, irreparable damage (linear with dose)
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                          <strong>β term:</strong> Sublethal damage interaction (quadratic with dose)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    α/β Ratio: Clinical Significance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                      The α/β Ratio Determines Fractionation Sensitivity
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      The α/β ratio represents the dose at which linear and quadratic components contribute equally 
                      to cell killing. It is the key parameter for comparing fractionation schedules and 
                      understanding tissue responses.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-red-50 dark:bg-red-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-red-700 dark:text-red-300">
                          High α/β Ratio (~10 Gy)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-red-800 dark:text-red-300 text-sm">Tissues:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Most tumors</li>
                            <li>• Early-responding normal tissues</li>
                            <li>• Mucosa, skin, bone marrow</li>
                          </ul>
                          <h5 className="font-semibold text-red-800 dark:text-red-300 text-sm">Characteristics:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Less sensitive to fractionation</li>
                            <li>• Linear component dominates</li>
                            <li>• Conventional fractionation effective</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-blue-700 dark:text-blue-300">
                          Low α/β Ratio (~2–3 Gy)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Tissues:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Late-responding normal tissues</li>
                            <li>• Spinal cord, kidney, lung</li>
                            <li>• Some tumors (prostate ~1.5 Gy)</li>
                          </ul>
                          <h5 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Characteristics:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• More sensitive to fractionation</li>
                            <li>• Quadratic component important</li>
                            <li>• Benefits from smaller fractions</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                      Clinical Applications of LQ Model
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-gray-300 text-sm mb-1">
                          BED and EQD2 Calculations
                        </h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Compare different fractionation schedules</li>
                          <li>• Plan hypofractionation and SBRT</li>
                          <li>• Re-irradiation dose calculations</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-gray-300 text-sm mb-1">
                          Treatment Optimization
                        </h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Normal tissue tolerance prediction</li>
                          <li>• Optimal fractionation selection</li>
                          <li>• Combination therapy planning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">
                    Late Effects and Normal Tissue Tolerance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-green-700 dark:text-green-300">
                          Early-Responding Tissues
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-green-800 dark:text-green-300 text-sm">Examples:</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Mucosa, skin, bone marrow, GI tract
                          </p>
                          <h5 className="font-semibold text-green-800 dark:text-green-300 text-sm">Characteristics:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Acute toxicity during/soon after treatment</li>
                            <li>• Typically reversible</li>
                            <li>• High cell turnover rate</li>
                            <li>• High α/β ratio (~10 Gy)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-red-50 dark:bg-red-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-red-700 dark:text-red-300">
                          Late-Responding Tissues
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-red-800 dark:text-red-300 text-sm">Examples:</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Spinal cord, lung, kidney, brain, heart
                          </p>
                          <h5 className="font-semibold text-red-800 dark:text-red-300 text-sm">Characteristics:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Delayed toxicity (months to years)</li>
                            <li>• Often irreversible and dose-limiting</li>
                            <li>• Low cell turnover rate</li>
                            <li>• Low α/β ratio (~2–3 Gy)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                      Tolerance Dose Guidelines
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Accurate prediction of normal tissue tolerance is critical in treatment planning and 
                      is guided by dose constraints from organizations like QUANTEC and RTOG.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-gray-300 text-sm mb-1">
                          Factors Affecting Tolerance:
                        </h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Total dose and fraction size</li>
                          <li>• Volume of tissue irradiated</li>
                          <li>• Patient age and comorbidities</li>
                          <li>• Previous radiation exposure</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-gray-300 text-sm mb-1">
                          Clinical Applications:
                        </h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Treatment planning constraints</li>
                          <li>• Re-irradiation considerations</li>
                          <li>• Risk-benefit assessment</li>
                          <li>• Quality of life preservation</li>
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
                    Radiation biology provides the scientific rationale behind the clinical application of radiotherapy. 
                    From DNA damage and repair pathways to oxygenation and fractionation strategies, these biological 
                    principles shape every aspect of treatment design. As techniques evolve and become more personalized, 
                    an in-depth understanding of how radiation interacts with cells and tissues remains central to 
                    achieving optimal therapeutic outcomes while minimizing harm.
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

export default RadiationBiology;