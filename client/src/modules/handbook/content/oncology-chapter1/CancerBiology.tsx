import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dna, 
  Microscope, 
  Zap, 
  Activity, 
  Target, 
  Shield,
  TrendingUp,
  RefreshCw
} from "lucide-react";

const CancerBiology = () => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-green-600" />
            Section 1.1: Cancer Biology
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Fundamental Concepts</Badge>
            <Badge variant="outline">Molecular Mechanisms</Badge>
            <Badge variant="outline">Clinical Relevance</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            Cancer is a heterogeneous group of diseases driven by uncontrolled cell proliferation, genetic mutations, and a progressive disruption of normal cellular regulation. Understanding cancer biology provides the foundation for modern oncology, informing diagnostic, prognostic, and therapeutic strategies.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="genetics">Genetics</TabsTrigger>
          <TabsTrigger value="evolution">Evolution</TabsTrigger>
          <TabsTrigger value="microenvironment">TME</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Core Definition and Concept
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Dna className="h-4 w-4" />
                <AlertDescription>
                  <strong>Cancer Definition:</strong> A collection of diseases characterized by the autonomous and unregulated growth of cells with the potential to invade surrounding tissues and metastasize to distant organs.
                </AlertDescription>
              </Alert>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Key Characteristics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Uncontrolled cell proliferation</li>
                      <li>• Invasion of surrounding tissues</li>
                      <li>• Metastasis to distant organs</li>
                      <li>• Disrupted cellular homeostasis</li>
                      <li>• Genetic and epigenetic alterations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Transformation Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Normal cell → Initiated cell</li>
                      <li>• Accumulation of mutations</li>
                      <li>• Loss of growth control</li>
                      <li>• Acquisition of invasive properties</li>
                      <li>• Metastatic capability</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genetics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5 text-purple-600" />
                Genetic Basis of Cancer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      Oncogenes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Proto-oncogenes become oncogenes when mutated, promoting uncontrolled cell division.</p>
                    <div className="text-xs space-y-1">
                      <p><strong>Examples:</strong> RAS, MYC, ERBB2</p>
                      <p><strong>Function:</strong> Growth promotion</p>
                      <p><strong>Effect:</strong> Gain of function</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-4 w-4 text-red-600" />
                      Tumor Suppressors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Genes that normally inhibit proliferation or promote repair and apoptosis.</p>
                    <div className="text-xs space-y-1">
                      <p><strong>Examples:</strong> TP53, RB1, BRCA1</p>
                      <p><strong>Function:</strong> Growth inhibition</p>
                      <p><strong>Effect:</strong> Loss of function</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-4 w-4 text-orange-600" />
                      DNA Repair
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Defects in DNA repair pathways accelerate mutation accumulation.</p>
                    <div className="text-xs space-y-1">
                      <p><strong>Examples:</strong> MMR, BRCA1/2</p>
                      <p><strong>Function:</strong> Genome stability</p>
                      <p><strong>Effect:</strong> Genomic instability</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Activity className="h-4 w-4" />
                <AlertDescription>
                  <strong>Mutation Types:</strong> Mutations can be inherited (germline) or acquired (somatic) due to environmental exposures like carcinogens, radiation, or viruses. Genomic instability from DNA repair defects accelerates this process.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-orange-600" />
                Clonal Evolution and Heterogeneity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Clonal Evolution Process</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <h5 className="font-medium text-sm">1. Monoclonal Origin</h5>
                      <p className="text-xs text-muted-foreground">Tumors arise from single transformed cell</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                      <h5 className="font-medium text-sm">2. Clonal Expansion</h5>
                      <p className="text-xs text-muted-foreground">Initial cell undergoes rapid proliferation</p>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <h5 className="font-medium text-sm">3. Further Mutations</h5>
                      <p className="text-xs text-muted-foreground">Additional genetic alterations accumulate</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <h5 className="font-medium text-sm">4. Heterogeneity</h5>
                      <p className="text-xs text-muted-foreground">Genetically diverse tumor mass emerges</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Clinical Implications</h4>
                  <div className="space-y-3">
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>Intratumoral Heterogeneity:</strong> Creates genetically diverse cell populations within the same tumor
                      </AlertDescription>
                    </Alert>
                    <div className="text-sm space-y-2">
                      <p><strong>Consequences:</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-xs ml-2">
                        <li>Therapeutic resistance</li>
                        <li>Treatment failure</li>
                        <li>Disease relapse</li>
                        <li>Metastatic potential</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="microenvironment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Tumor Microenvironment (TME)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                The TME consists of stromal fibroblasts, immune cells, endothelial cells, and extracellular matrix that actively support tumor progression.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Cellular Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs space-y-1">
                      <li>• Cancer-associated fibroblasts (CAFs)</li>
                      <li>• Tumor-associated macrophages (TAMs)</li>
                      <li>• Regulatory T cells (Tregs)</li>
                      <li>• Endothelial cells</li>
                      <li>• Myeloid-derived suppressor cells</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Functions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs space-y-1">
                      <li>• Immune evasion support</li>
                      <li>• Angiogenesis promotion</li>
                      <li>• Therapeutic resistance</li>
                      <li>• Metastasis facilitation</li>
                      <li>• Growth factor secretion</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Clinical Relevance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Diagnosis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs space-y-1">
                      <li>• Biomarker identification</li>
                      <li>• Histologic classification</li>
                      <li>• Molecular profiling</li>
                      <li>• Genetic testing</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Prognosis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs space-y-1">
                      <li>• Mutation burden analysis</li>
                      <li>• Immune infiltration scoring</li>
                      <li>• Clonal evolution tracking</li>
                      <li>• Risk stratification</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Treatment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs space-y-1">
                      <li>• Targeted therapies</li>
                      <li>• Immunotherapies</li>
                      <li>• Personalized medicine</li>
                      <li>• Combination strategies</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Future Directions:</strong> Advancements in genomics, proteomics, and single-cell technologies continue to refine our understanding and expand therapeutic possibilities in precision oncology.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CancerBiology;