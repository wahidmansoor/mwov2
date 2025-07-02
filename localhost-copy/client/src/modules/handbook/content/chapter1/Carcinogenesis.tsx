import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Dna, 
  Zap, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  Microscope,
  FileText,
  Target,
  Activity,
  Bug,
  Flame,
  FlaskConical
} from "lucide-react";

const Carcinogenesis = () => {
  const carcinogenPhases = [
    {
      phase: "Initiation",
      icon: Zap,
      color: "bg-red-100 text-red-800 border-red-300",
      description: "Irreversible genetic mutations in key regulatory genes",
      mechanisms: [
        "Point mutations in proto-oncogenes (RAS, MYC)",
        "Tumor suppressor gene inactivation (TP53, RB1)",
        "DNA repair gene defects (BRCA1/2, MLH1)",
        "Chromosomal translocations and deletions"
      ],
      characteristics: "Single cell transformation event, permanent genetic damage",
      reversible: false
    },
    {
      phase: "Promotion",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-800 border-orange-300",
      description: "Proliferation stimulation of initiated cell populations",
      mechanisms: [
        "Epigenetic modifications (DNA methylation)",
        "Altered signaling pathways",
        "Growth factor overexpression",
        "Hormonal stimulation"
      ],
      characteristics: "Clonal expansion, premalignant lesion formation",
      reversible: true
    },
    {
      phase: "Progression",
      icon: Target,
      color: "bg-purple-100 text-purple-800 border-purple-300",
      description: "Acquisition of invasive and metastatic properties",
      mechanisms: [
        "Additional genetic alterations",
        "Loss of cell-cell adhesion",
        "Angiogenesis activation",
        "Immune evasion capabilities"
      ],
      characteristics: "Malignant transformation, clinical cancer",
      reversible: false
    }
  ];

  const riskFactors = [
    {
      category: "Chemical Carcinogens",
      icon: FlaskConical,
      examples: [
        "Tobacco smoke (benzopyrene, nitrosamines)",
        "Asbestos (mesothelioma, lung cancer)",
        "Aflatoxin B1 (hepatocellular carcinoma)",
        "Aromatic amines (bladder cancer)"
      ],
      mechanism: "DNA adduct formation, oxidative stress"
    },
    {
      category: "Physical Carcinogens",
      icon: Zap,
      examples: [
        "UV radiation (skin cancers)",
        "Ionizing radiation (leukemia, solid tumors)",
        "Radon exposure (lung cancer)"
      ],
      mechanism: "Direct DNA damage, thymine dimer formation"
    },
    {
      category: "Biological Carcinogens",
      icon: Bug,
      examples: [
        "HPV (cervical, oropharyngeal cancer)",
        "EBV (Burkitt lymphoma, nasopharyngeal)",
        "HBV/HCV (hepatocellular carcinoma)",
        "H. pylori (gastric cancer)"
      ],
      mechanism: "Viral integration, chronic inflammation"
    },
    {
      category: "Lifestyle Factors",
      icon: Activity,
      examples: [
        "Alcohol consumption (liver, breast, head/neck)",
        "Processed meat (colorectal cancer)",
        "Obesity (multiple cancer types)",
        "Hormonal factors (breast, endometrial)"
      ],
      mechanism: "Metabolic dysregulation, chronic inflammation"
    }
  ];

  const molecularMechanisms = [
    {
      type: "Genetic Alterations",
      mechanisms: [
        "Point mutations (single nucleotide changes)",
        "Chromosomal translocations (BCR-ABL, MYC)",
        "Gene amplifications (HER2, MYC)",
        "Large deletions (tumor suppressor loss)"
      ]
    },
    {
      type: "Epigenetic Changes",
      mechanisms: [
        "DNA hypermethylation (tumor suppressor silencing)",
        "Histone modifications (chromatin remodeling)",
        "microRNA dysregulation",
        "Long non-coding RNA alterations"
      ]
    },
    {
      type: "Genomic Instability",
      mechanisms: [
        "DNA repair defects (MMR, HR, NHEJ)",
        "Chromosomal instability (CIN)",
        "Microsatellite instability (MSI)",
        "Mitotic checkpoint failure"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-orange-600" />
            Section 1.2: Carcinogenesis
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Multistep Process</Badge>
            <Badge variant="outline">Risk Factors</Badge>
            <Badge variant="outline">Molecular Mechanisms</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            Carcinogenesis is the multistep process by which normal cells acquire the ability to grow uncontrollably and form malignant tumors. This transformation is driven by the gradual accumulation of genetic and epigenetic alterations that disrupt cellular regulation, particularly pathways controlling proliferation, differentiation, DNA repair, and apoptosis.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="phases">Phases</TabsTrigger>
          <TabsTrigger value="mechanisms">Mechanisms</TabsTrigger>
          <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
          <TabsTrigger value="infectious">Infectious Agents</TabsTrigger>
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-blue-600" />
                  Key Concepts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <h4 className="font-medium text-sm">Multistep Process</h4>
                  <p className="text-xs text-muted-foreground">Sequential accumulation of genetic alterations over time</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                  <h4 className="font-medium text-sm">Intrinsic vs Extrinsic</h4>
                  <p className="text-xs text-muted-foreground">Inherited mutations vs environmental exposures</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                  <h4 className="font-medium text-sm">Clonal Evolution</h4>
                  <p className="text-xs text-muted-foreground">Progressive selection of increasingly malignant cells</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Contributing Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Intrinsic Factors</h4>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• Inherited genetic mutations</li>
                    <li>• Spontaneous replication errors</li>
                    <li>• Age-related cellular senescence</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Extrinsic Factors</h4>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• Chemical carcinogens</li>
                    <li>• Physical agents (UV, radiation)</li>
                    <li>• Infectious agents</li>
                    <li>• Lifestyle factors</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Clinical Relevance:</strong> Understanding carcinogenesis is critical for identifying cancer risk factors, developing preventive strategies, and informing targeted therapeutic interventions in modern oncology practice.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Three-Phase Model of Carcinogenesis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {carcinogenPhases.map((phase, index) => {
                  const IconComponent = phase.icon;
                  return (
                    <Card key={phase.phase} className={`border-l-4 border-l-gray-300`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <IconComponent className="h-5 w-5" />
                            Phase {index + 1}: {phase.phase}
                          </CardTitle>
                          <Badge variant={phase.reversible ? "default" : "destructive"}>
                            {phase.reversible ? "Reversible" : "Irreversible"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">{phase.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Key Mechanisms</h4>
                            <ul className="text-sm space-y-1">
                              {phase.mechanisms.map((mechanism, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                  {mechanism}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Characteristics</h4>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                              <p className="text-sm">{phase.characteristics}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mechanisms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5 text-purple-600" />
                Molecular Mechanisms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {molecularMechanisms.map((category, index) => (
                <Card key={index} className="bg-purple-50 dark:bg-purple-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{category.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-2">
                      {category.mechanisms.map((mechanism, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 bg-white dark:bg-gray-900 rounded">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-sm">{mechanism}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Genomic Instability:</strong> Accelerates mutation accumulation and clonal evolution through defective DNA repair pathways or mitotic checkpoint failure, promoting tumor heterogeneity and therapeutic resistance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-factors" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {riskFactors.map((factor, index) => {
              const IconComponent = factor.icon;
              return (
                <Card key={index} className="border-l-4 border-l-orange-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="h-5 w-5 text-orange-600" />
                      {factor.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Examples</h4>
                      <ul className="text-sm space-y-1">
                        {factor.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <p className="text-xs"><strong>Mechanism:</strong> {factor.mechanism}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-red-50 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-600" />
                Tumor Microenvironment & Inflammation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Chronic Inflammation Effects</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Reactive oxygen species (ROS) generation</li>
                    <li>• Enhanced DNA damage accumulation</li>
                    <li>• Selection for aggressive phenotypes</li>
                    <li>• Immune surveillance evasion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">TME Contributions</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Growth factor secretion</li>
                    <li>• Angiogenesis promotion</li>
                    <li>• Immunosuppressive environment</li>
                    <li>• Metastasis facilitation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infectious" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-red-600" />
                Infectious Agents in Carcinogenesis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Agent</th>
                      <th className="text-left p-2">Cancer Type</th>
                      <th className="text-left p-2">Mechanism</th>
                      <th className="text-left p-2">Prevention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">HPV (16, 18)</td>
                      <td className="p-2">Cervical, oropharyngeal</td>
                      <td className="p-2">E6/E7 proteins inactivate p53/Rb</td>
                      <td className="p-2">Vaccination, screening</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">EBV</td>
                      <td className="p-2">Burkitt lymphoma, nasopharyngeal</td>
                      <td className="p-2">Viral integration, immune dysregulation</td>
                      <td className="p-2">Limited options</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">HBV/HCV</td>
                      <td className="p-2">Hepatocellular carcinoma</td>
                      <td className="p-2">Chronic inflammation, viral integration</td>
                      <td className="p-2">Vaccination, antiviral therapy</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">H. pylori</td>
                      <td className="p-2">Gastric adenocarcinoma, MALT lymphoma</td>
                      <td className="p-2">Chronic gastritis, DNA damage</td>
                      <td className="p-2">Antibiotic eradication</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Bug className="h-4 w-4" />
            <AlertDescription>
              <strong>Clinical Impact:</strong> Infectious agents cause approximately 15-20% of human cancers worldwide. Understanding viral mechanisms provides insight into both tumor biology and cancer prevention strategies through vaccination and antiviral therapy.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="prevention" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="text-lg">Primary Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Tobacco cessation programs</li>
                  <li>• UV protection and sun safety</li>
                  <li>• Vaccination (HPV, HBV)</li>
                  <li>• Occupational safety measures</li>
                  <li>• Dietary modifications</li>
                  <li>• Physical activity promotion</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-lg">Secondary Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Cervical cancer screening (Pap smear)</li>
                  <li>• Mammography for breast cancer</li>
                  <li>• Colonoscopy for colorectal cancer</li>
                  <li>• Low-dose CT for lung cancer (high-risk)</li>
                  <li>• Genetic counseling and testing</li>
                  <li>• Chemoprevention in high-risk groups</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Clinical Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Risk Assessment</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Family history evaluation</li>
                    <li>• Genetic risk stratification</li>
                    <li>• Environmental exposure assessment</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Early Detection</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Biomarker identification</li>
                    <li>• Premalignant lesion detection</li>
                    <li>• Liquid biopsy development</li>
                  </ul>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Targeted Intervention</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Precision prevention strategies</li>
                    <li>• Molecular-based therapies</li>
                    <li>• Personalized screening protocols</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Carcinogenesis;