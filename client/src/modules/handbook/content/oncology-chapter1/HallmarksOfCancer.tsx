import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Shield, 
  Skull, 
  RefreshCw, 
  Heart, 
  Navigation,
  Zap,
  Eye,
  Activity,
  AlertTriangle
} from "lucide-react";

const HallmarksOfCancer = () => {
  const hallmarks = [
    {
      id: "proliferation",
      title: "Sustained Proliferative Signaling",
      icon: TrendingUp,
      color: "bg-green-100 text-green-800 border-green-300",
      description: "Cancer cells acquire the ability to continually signal themselves to divide",
      mechanisms: [
        "Mutations in proto-oncogenes (RAS, MYC, ERBB2)",
        "Overexpression of growth factor receptors (EGFR, HER2/neu)",
        "Formation of autocrine signaling loops"
      ],
      clinicalRelevance: "Target for growth factor receptor inhibitors and signal transduction therapies"
    },
    {
      id: "suppressors",
      title: "Evasion of Growth Suppressors",
      icon: Shield,
      color: "bg-red-100 text-red-800 border-red-300",
      description: "Bypass signals that normally inhibit cell proliferation",
      mechanisms: [
        "p53 pathway inactivation (TP53 mutations)",
        "Rb pathway disruption (pRb hyperphosphorylation)",
        "Loss of contact inhibition (altered E-cadherin, NF2)"
      ],
      clinicalRelevance: "Biomarker for prognosis and therapeutic target identification"
    },
    {
      id: "apoptosis",
      title: "Resistance to Cell Death",
      icon: Skull,
      color: "bg-purple-100 text-purple-800 border-purple-300",
      description: "Cancer cells avoid programmed cell death (apoptosis)",
      mechanisms: [
        "Upregulation of anti-apoptotic proteins (BCL-2)",
        "Loss of pro-apoptotic factors (BAX, p53)",
        "Impaired death receptor signaling (Fas-FasL)"
      ],
      clinicalRelevance: "Target for BH3 mimetics and apoptosis-inducing therapies"
    },
    {
      id: "immortality",
      title: "Enabling Replicative Immortality",
      icon: RefreshCw,
      color: "bg-blue-100 text-blue-800 border-blue-300",
      description: "Cancer cells evade senescence and achieve limitless replication",
      mechanisms: [
        "Reactivating telomerase",
        "Maintaining telomere length",
        "Bypassing crisis and senescence phases"
      ],
      clinicalRelevance: "Telomerase inhibitors and immunotherapies targeting telomerase"
    },
    {
      id: "angiogenesis",
      title: "Inducing Angiogenesis",
      icon: Heart,
      color: "bg-pink-100 text-pink-800 border-pink-300",
      description: "Growing tumors require new vasculature for nutrients and oxygen",
      mechanisms: [
        "Upregulation of VEGF and FGF",
        "Suppression of anti-angiogenic signals",
        "Recruitment of endothelial progenitor cells"
      ],
      clinicalRelevance: "Anti-angiogenic therapies (bevacizumab, sunitinib)"
    },
    {
      id: "metastasis",
      title: "Activation of Invasion and Metastasis",
      icon: Navigation,
      color: "bg-orange-100 text-orange-800 border-orange-300",
      description: "Responsible for most cancer-related deaths",
      mechanisms: [
        "Loss of cell-cell adhesion (↓ E-cadherin)",
        "ECM degradation via MMPs and collagenases",
        "Entry into circulation and distant colonization"
      ],
      clinicalRelevance: "Most lethal hallmark - target for anti-metastatic therapies"
    },
    {
      id: "metabolism",
      title: "Reprogramming Cellular Metabolism",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      description: "Cancer cells prefer aerobic glycolysis (Warburg effect)",
      mechanisms: [
        "Increased glucose uptake and lactate production",
        "Supports biosynthesis for proliferation",
        "Driven by oncogenes (MYC) and metabolic mutations"
      ],
      clinicalRelevance: "Used in FDG-PET imaging and metabolic targeting"
    },
    {
      id: "immune",
      title: "Evasion of Immune Destruction",
      icon: Eye,
      color: "bg-indigo-100 text-indigo-800 border-indigo-300",
      description: "Tumors avoid immune detection and elimination",
      mechanisms: [
        "Reducing MHC I expression",
        "Secreting immunosuppressive cytokines (TGF-β, IL-10)",
        "Recruiting suppressor cells (Tregs, MDSCs)"
      ],
      clinicalRelevance: "Target for checkpoint inhibitors (nivolumab, ipilimumab)"
    }
  ];

  const enablingCharacteristics = [
    {
      title: "Genome Instability and Mutation",
      icon: Activity,
      description: "Facilitates acquisition of other hallmarks through defects in DNA repair",
      examples: "BRCA1/2, MMR defects, chromosomal aberrations"
    },
    {
      title: "Tumor-Promoting Inflammation",
      icon: AlertTriangle,
      description: "Chronic inflammation supports carcinogenesis",
      examples: "Ulcerative colitis → CRC, HBV/HCV → HCC, H. pylori → gastric cancer"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Section 1.1.1: Hallmarks of Cancer
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Hanahan & Weinberg</Badge>
            <Badge variant="outline">Conceptual Framework</Badge>
            <Badge variant="outline">Therapeutic Targets</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            Cancer progression involves a constellation of molecular and cellular alterations that enable tumor cells to acquire specific capabilities necessary for malignant growth and dissemination. These shared biological traits provide a conceptual framework that unifies diverse cancer types under common functional themes.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="core">Core Hallmarks</TabsTrigger>
          <TabsTrigger value="enabling">Enabling Factors</TabsTrigger>
          <TabsTrigger value="therapeutic">Therapeutic Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hallmarks.map((hallmark, index) => {
              const IconComponent = hallmark.icon;
              return (
                <Card key={hallmark.id} className={`${hallmark.color} border-2`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      <span className="text-xs font-medium">Hallmark {index + 1}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium text-sm mb-2">{hallmark.title}</h4>
                    <p className="text-xs leading-relaxed">{hallmark.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Alert>
            <Activity className="h-4 w-4" />
            <AlertDescription>
              <strong>Framework Evolution:</strong> Originally proposed by Hanahan and Weinberg, these hallmarks have been refined as research advances. Each hallmark represents essential capabilities tumors acquire during development and offers potential therapeutic targets.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="core" className="space-y-4">
          {hallmarks.map((hallmark) => {
            const IconComponent = hallmark.icon;
            return (
              <Card key={hallmark.id} className="border-l-4 border-l-gray-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconComponent className="h-5 w-5" />
                    {hallmark.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{hallmark.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Mechanisms</h4>
                      <ul className="text-sm space-y-1">
                        {hallmark.mechanisms.map((mechanism, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                            {mechanism}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Clinical Relevance</h4>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                        <p className="text-sm">{hallmark.clinicalRelevance}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="enabling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enabling Characteristics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                These characteristics facilitate acquisition of the core hallmarks and contribute to tumor heterogeneity and progression.
              </p>

              {enablingCharacteristics.map((characteristic, index) => {
                const IconComponent = characteristic.icon;
                return (
                  <Card key={index} className="bg-orange-50 dark:bg-orange-950/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <IconComponent className="h-5 w-5 text-orange-600" />
                        {characteristic.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">{characteristic.description}</p>
                      <div className="p-2 bg-white dark:bg-gray-900 rounded">
                        <p className="text-xs"><strong>Examples:</strong> {characteristic.examples}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="therapeutic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinical and Therapeutic Implications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Therapeutic Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Targeted therapies (EGFR, BRAF, VEGF inhibitors)</li>
                      <li>• Rational combination treatments</li>
                      <li>• Biomarker discovery and validation</li>
                      <li>• Personalized medicine approaches</li>
                      <li>• Immune checkpoint inhibitors</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Clinical Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Stratified medicine and patient selection</li>
                      <li>• Prevention strategies in at-risk populations</li>
                      <li>• Early detection and screening programs</li>
                      <li>• Resistance mechanism understanding</li>
                      <li>• Combination therapy rationale</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <strong>Future Directions:</strong> Each hallmark offers potential therapeutic targets as oncology advances. Understanding these principles continues to evolve, expanding our ability to treat cancer with precision and efficacy through targeted interventions.
                </AlertDescription>
              </Alert>

              <Card className="bg-purple-50 dark:bg-purple-950/20">
                <CardHeader>
                  <CardTitle className="text-lg">Key Takeaways</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      Hallmarks provide unified framework for understanding diverse cancer types
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      Each capability represents potential therapeutic intervention point
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      Framework continues evolving with advancing research and clinical insights
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      Understanding hallmarks guides precision oncology approaches
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HallmarksOfCancer;