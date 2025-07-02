import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Users, 
  Shield, 
  Heart, 
  Zap, 
  Target,
  Activity,
  Microscope,
  FlaskConical,
  TrendingUp
} from "lucide-react";

const TumorMicroenvironment = () => {
  const cellularComponents = [
    {
      type: "Cancer-Associated Fibroblasts (CAFs)",
      origin: "Resident fibroblasts, mesenchymal stem cells, endothelial–mesenchymal transition",
      functions: [
        "Secrete ECM proteins (collagen, tenascin-C, fibronectin)",
        "Produce cytokines (TGF-β, IL-6) and chemokines (CXCL12)",
        "Promote angiogenesis and tumor stemness",
        "Suppress cytotoxic lymphocytes via IL-6, CXCL9/10 sequestration"
      ],
      icon: Network,
      color: "bg-blue-100 text-blue-800 border-blue-300"
    },
    {
      type: "Tumor-Associated Macrophages (TAMs)",
      origin: "M2-polarized macrophages",
      functions: [
        "Secrete IL-10, ARG1, VEGF",
        "Inhibit T cells and promote angiogenesis",
        "Support tumor progression and metastasis",
        "Create immunosuppressive environment"
      ],
      icon: Shield,
      color: "bg-red-100 text-red-800 border-red-300"
    },
    {
      type: "Regulatory T Cells (Tregs)",
      origin: "CD4+ T cell subset",
      functions: [
        "Suppress effector T cells",
        "Inhibit dendritic cell maturation",
        "Maintain immune tolerance",
        "Express FOXP3 transcription factor"
      ],
      icon: Users,
      color: "bg-orange-100 text-orange-800 border-orange-300"
    },
    {
      type: "Myeloid-Derived Suppressor Cells (MDSCs)",
      origin: "Immature myeloid cells",
      functions: [
        "Inhibit T-cell responses via nitric oxide and ROS",
        "Express arginase and other suppressive factors",
        "Promote tumor angiogenesis",
        "Support metastatic niche formation"
      ],
      icon: Target,
      color: "bg-purple-100 text-purple-800 border-purple-300"
    }
  ];

  const therapeuticTargets = [
    { target: "VEGF", drug: "Bevacizumab", indication: "CRC, NSCLC, RCC", mechanism: "Anti-angiogenic" },
    { target: "PD-1/PD-L1", drug: "Nivolumab, Atezolizumab", indication: "Melanoma, NSCLC, RCC, bladder", mechanism: "Checkpoint inhibition" },
    { target: "CSF-1R", drug: "Pexidartinib", indication: "Tenosynovial giant cell tumor", mechanism: "TAM depletion" },
    { target: "CXCR4", drug: "Plerixafor", indication: "Stem cell mobilization in heme CA", mechanism: "Chemokine blockade" },
    { target: "TGF-β", drug: "Galunisertib (trial)", indication: "Overcoming immune resistance", mechanism: "Immunomodulation" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-green-600" />
            Section 1.1.3: Tumor Microenvironment (TME)
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Cellular Ecosystem</Badge>
            <Badge variant="outline">Therapeutic Target</Badge>
            <Badge variant="outline">Immune Interactions</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            The tumor microenvironment encompasses the cellular and acellular milieu in which tumor cells exist and evolve. This dynamic ecosystem plays a critical role in all stages of tumor development—from early neoplastic transformation to metastasis, immune escape, and resistance to therapy.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cellular">Cellular Components</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
          <TabsTrigger value="targeting">Therapeutic Targeting</TabsTrigger>
          <TabsTrigger value="future">Future Directions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-blue-600" />
                  TME Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                    <h4 className="font-medium text-sm">Cellular Components</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Immune cells, fibroblasts, endothelial cells, mesenchymal stromal cells
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                    <h4 className="font-medium text-sm">Acellular Components</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      ECM, cytokines, chemokines, growth factors, metabolites, vasculature
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Dynamic Interactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                    <h4 className="font-medium text-sm">Bidirectional Signaling</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tumor cells reshape microenvironment; stroma supports tumor progression
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                    <h4 className="font-medium text-sm">Evolutionary Pressure</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Co-evolution of tumor and stroma drives malignant progression
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Network className="h-4 w-4" />
            <AlertDescription>
              <strong>Clinical Significance:</strong> The TME is increasingly recognized as a therapeutic target. Strategies that reprogram the TME—such as anti-angiogenics, immune checkpoint inhibitors, and TGF-β blockade—are key components of modern cancer therapy.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="cellular" className="space-y-4">
          {cellularComponents.map((component, index) => {
            const IconComponent = component.icon;
            return (
              <Card key={index} className={`border-l-4 border-l-gray-300`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    {component.type}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {component.origin}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium">Key Functions</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {component.functions.map((func, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-sm">{func}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Card className="bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Endothelial Cells and Vasculature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Characteristics</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Abnormal vessel structure and function</li>
                    <li>• Endothelial anergy impairs immune cell trafficking</li>
                    <li>• Pericyte detachment leads to vessel leakiness</li>
                    <li>• Creates hypoxic and acidic environment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Clinical Impact</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Impaired drug delivery</li>
                    <li>• Reduced immune cell infiltration</li>
                    <li>• Supports metastatic dissemination</li>
                    <li>• Target for anti-angiogenic therapy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="functions" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Invasion and Metastasis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm space-y-2">
                  <li>• CAFs and TAMs secrete MMPs → ECM degradation</li>
                  <li>• EMT promotes cell migration</li>
                  <li>• Pre-metastatic niche: exosomes condition distant tissue</li>
                  <li>• Facilitates intravasation and extravasation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Angiogenesis Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm space-y-2">
                  <li>• VEGF secretion by stromal cells</li>
                  <li>• Tumor vessels: disorganized, leaky, poorly perfused</li>
                  <li>• Anti-VEGF therapy normalizes vessels</li>
                  <li>• Improves immune cell access to tumors</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Immune Evasion Mechanisms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Suppressive Factors</h4>
                  <ul className="text-xs space-y-1">
                    <li>• IL-10, TGF-β secretion</li>
                    <li>• IDO expression</li>
                    <li>• PD-L1 upregulation</li>
                    <li>• Galectin-9 expression</li>
                  </ul>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Physical Barriers</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Dense ECM excludes T cells</li>
                    <li>• Abnormal vessels impair trafficking</li>
                    <li>• Fibrotic capsule formation</li>
                    <li>• Spatial sequestration</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Metabolic Suppression</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Nutrient depletion (arginine, tryptophan)</li>
                    <li>• Acidification from lactate</li>
                    <li>• Hypoxia-induced dysfunction</li>
                    <li>• Competition for glucose</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targeting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-green-600" />
                TME-Targeted Therapies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Target</th>
                      <th className="text-left p-2">Drug/Class</th>
                      <th className="text-left p-2">Indication</th>
                      <th className="text-left p-2">Mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    {therapeuticTargets.map((therapy, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{therapy.target}</td>
                        <td className="p-2">{therapy.drug}</td>
                        <td className="p-2">{therapy.indication}</td>
                        <td className="p-2">{therapy.mechanism}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-lg">Combination Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Anti-VEGF + checkpoint inhibitors</li>
                  <li>• TGF-β blockade + immunotherapy</li>
                  <li>• CAF depletion + cytotoxic therapy</li>
                  <li>• Metabolic modulators + T cell therapy</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="text-lg">Resistance Mechanisms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• ECM and vessels exclude immune cells</li>
                  <li>• Alternative angiogenic pathways</li>
                  <li>• Compensatory immunosuppression</li>
                  <li>• Metabolic adaptation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="future" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Future Directions and Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3">Emerging Technologies</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <h5 className="font-medium text-sm">scRNA-seq</h5>
                      <p className="text-xs text-muted-foreground">Cellular TME deconvolution at single-cell resolution</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <h5 className="font-medium text-sm">Spatial Transcriptomics</h5>
                      <p className="text-xs text-muted-foreground">Maps gene expression in tissue context</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                      <h5 className="font-medium text-sm">Multiplex Imaging</h5>
                      <p className="text-xs text-muted-foreground">Visualizes dozens of markers simultaneously</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Clinical Applications</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <h5 className="font-medium text-sm">Organoids</h5>
                      <p className="text-xs text-muted-foreground">Mimic native TME for drug testing</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <h5 className="font-medium text-sm">AI Integration</h5>
                      <p className="text-xs text-muted-foreground">Histology-based therapy prediction</p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <h5 className="font-medium text-sm">Precision TME Targeting</h5>
                      <p className="text-xs text-muted-foreground">Patient-specific microenvironment profiling</p>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Clinical Impact:</strong> The tumor microenvironment is a complex and dynamic driver of cancer progression, immune escape, and treatment resistance. Targeting and remodeling the TME is a promising avenue to enhance existing therapies and develop new strategies for precision oncology.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TumorMicroenvironment;