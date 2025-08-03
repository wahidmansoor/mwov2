import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dna, 
  FlaskConical, 
  Target, 
  Activity, 
  Zap,
  Microscope,
  BookOpen,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

const GeneticEpigeneticMechanisms = () => {
  const epigeneticModifications = [
    {
      type: "DNA Methylation",
      mechanism: "CpG dinucleotide methylation",
      effects: [
        "Global hypomethylation → genomic instability",
        "Promoter hypermethylation → tumor suppressor silencing",
        "Activates oncogenes and transposable elements"
      ],
      clinical: "SEPT9 screening (CRC), GSTP1 (prostate), DNMT inhibitors",
      icon: Dna,
      color: "bg-blue-100 text-blue-800 border-blue-300"
    },
    {
      type: "Histone Modifications",
      mechanism: "Post-translational modifications of histone tails",
      effects: [
        "Acetylation → transcriptional activation",
        "Methylation → context-dependent regulation",
        "EZH2 overexpression in various cancers"
      ],
      clinical: "HDAC inhibitors (vorinostat), EZH2 inhibitors (tazemetostat)",
      icon: Activity,
      color: "bg-green-100 text-green-800 border-green-300"
    },
    {
      type: "Noncoding RNAs",
      mechanism: "miRNAs, lncRNAs regulate gene expression",
      effects: [
        "miR-21 oncogenic (targets PTEN)",
        "miR-34a tumor suppressor (targets BCL2)",
        "HOTAIR recruits chromatin modifiers"
      ],
      clinical: "miRNA profiling for diagnosis, therapeutic targeting",
      icon: Target,
      color: "bg-purple-100 text-purple-800 border-purple-300"
    },
    {
      type: "Genomic Imprinting",
      mechanism: "Monoallelic expression based on parental origin",
      effects: [
        "Loss of imprinting (LOI)",
        "IGF2 overexpression in Wilms tumor",
        "Beckwith-Wiedemann syndrome"
      ],
      clinical: "Tumor risk assessment, genetic counseling",
      icon: BookOpen,
      color: "bg-orange-100 text-orange-800 border-orange-300"
    }
  ];

  const histoneModifications = [
    { modification: "Acetylation", enzyme: "HATs/HDACs", effect: "Activation (open chromatin)" },
    { modification: "Methylation", enzyme: "HMTs/HDMs", effect: "Activation or repression (context)" },
    { modification: "Phosphorylation", enzyme: "Kinases", effect: "DNA repair, signaling" },
    { modification: "Ubiquitination", enzyme: "E3 ligases", effect: "Regulation or degradation" },
    { modification: "Sumoylation", enzyme: "SUMO ligases", effect: "Repression" }
  ];

  const approvedTherapies = [
    { agent: "Azacitidine", target: "DNMT", indication: "MDS, AML" },
    { agent: "Decitabine", target: "DNMT", indication: "AML" },
    { agent: "Vorinostat", target: "HDAC", indication: "Cutaneous T-cell lymphoma" },
    { agent: "Romidepsin", target: "HDAC", indication: "Peripheral T-cell lymphoma" },
    { agent: "Tazemetostat", target: "EZH2", indication: "EZH2-mutant follicular lymphoma" }
  ];

  const genomicImprinting = [
    { syndrome: "Beckwith-Wiedemann", genes: "IGF2, CDKN1C", tumors: "Wilms tumor, hepatoblastoma" },
    { syndrome: "Silver-Russell", genes: "IGF2 hypomethylation", tumors: "Reduced growth, low cancer risk" },
    { syndrome: "Prader-Willi/Angelman", genes: "Chr 15q11–13", tumors: "Rare malignancies" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-blue-600" />
            Section 1.2.1: Genetic and Epigenetic Mechanisms
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Reversible Modifications</Badge>
            <Badge variant="outline">Therapeutic Targets</Badge>
            <Badge variant="outline">Clinical Applications</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            Epigenetics encompasses heritable yet reversible modifications to gene expression that do not alter the DNA sequence. In cancer, aberrant epigenetic regulation contributes directly to initiation, progression, immune evasion, and resistance to therapy. Unlike fixed genetic mutations, epigenetic changes are reversible, making them attractive targets for diagnostics and therapy.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dna-methylation">DNA Methylation</TabsTrigger>
          <TabsTrigger value="histone">Histone Mods</TabsTrigger>
          <TabsTrigger value="ncrnas">ncRNAs</TabsTrigger>
          <TabsTrigger value="imprinting">Imprinting</TabsTrigger>
          <TabsTrigger value="therapeutics">Therapeutics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {epigeneticModifications.map((mod, index) => {
              const IconComponent = mod.icon;
              return (
                <Card key={index} className={`border-l-4 border-l-gray-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="h-5 w-5" />
                      {mod.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm font-medium">{mod.mechanism}</p>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Key Effects</h4>
                      <ul className="text-xs space-y-1">
                        {mod.effects.map((effect, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <p className="text-xs"><strong>Clinical:</strong> {mod.clinical}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Alert>
            <Zap className="h-4 w-4" />
            <AlertDescription>
              <strong>Reversibility Advantage:</strong> Unlike genetic mutations, epigenetic changes are reversible—opening avenues for targeted therapies and precision medicine through epigenetic reprogramming.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="dna-methylation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5 text-blue-600" />
                DNA Methylation in Cancer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-red-50 dark:bg-red-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Global Hypomethylation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Induces genomic instability</li>
                      <li>• Activates oncogenes and transposable elements</li>
                      <li>• Associated with aneuploidy and CIN</li>
                      <li>• Early event in carcinogenesis</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Promoter Hypermethylation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Silences tumor suppressor genes</li>
                      <li>• MLH1 → microsatellite instability (MSI)</li>
                      <li>• BRCA1 → hereditary breast cancer</li>
                      <li>• CDKN2A → cell cycle control loss</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Clinical Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Diagnostics</h4>
                      <ul className="text-sm space-y-1">
                        <li>• SEPT9 → colorectal cancer screening</li>
                        <li>• GSTP1 → prostate cancer detection</li>
                        <li>• MGMT → glioblastoma prognosis</li>
                        <li>• CpG island methylator phenotype (CIMP)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Therapeutics</h4>
                      <ul className="text-sm space-y-1">
                        <li>• DNMT inhibitors: Azacitidine, decitabine</li>
                        <li>• Approved for MDS and AML</li>
                        <li>• Combination with HDAC inhibitors</li>
                        <li>• Predictive biomarkers development</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="histone" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Histone Modifications in Cancer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Modification</th>
                      <th className="text-left p-2">Enzyme</th>
                      <th className="text-left p-2">Effect on Transcription</th>
                    </tr>
                  </thead>
                  <tbody>
                    {histoneModifications.map((mod, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{mod.modification}</td>
                        <td className="p-2">{mod.enzyme}</td>
                        <td className="p-2">{mod.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-purple-50 dark:bg-purple-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Oncogenic Dysregulation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>EZH2</strong> (H3K27 methylation): Overexpressed in various cancers</li>
                      <li>• <strong>H3 mutations</strong>: Pediatric gliomas (H3F3A), chondroblastoma</li>
                      <li>• <strong>H3K27M mutation</strong>: Loss of H3K27me3 in DIPG</li>
                      <li>• <strong>BRD4</strong>: Super-enhancer regulation in cancer</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Therapeutic Targets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>HDAC inhibitors</strong>: Vorinostat, romidepsin</li>
                      <li>• <strong>EZH2 inhibitor</strong>: Tazemetostat</li>
                      <li>• <strong>BET inhibitors</strong>: Under trial (NUT carcinoma)</li>
                      <li>• <strong>Combination therapies</strong>: Epigenetic + immunotherapy</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ncrnas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Noncoding RNAs and Epigenetic Regulation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">MicroRNAs (miRNAs)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">~22-nt RNAs that degrade mRNAs or inhibit translation</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>miR-21</strong>: Oncogenic (targets PTEN)</li>
                      <li>• <strong>miR-34a</strong>: Tumor suppressor (targets BCL2, CDK6)</li>
                      <li>• <strong>let-7</strong>: Growth suppressor family</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Long ncRNAs (lncRNAs)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Greater than 200 nt; regulate transcription and chromatin</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>HOTAIR</strong>: Recruits PRC2, LSD1</li>
                      <li>• <strong>MALAT1</strong>: Correlates with metastasis</li>
                      <li>• <strong>XIST</strong>: X chromosome inactivation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">PIWI-interacting RNAs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Silence transposable elements</p>
                    <ul className="text-sm space-y-1">
                      <li>• Emerging roles in somatic tumors</li>
                      <li>• Genome stability maintenance</li>
                      <li>• Therapeutic potential</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Target className="h-4 w-4" />
                <AlertDescription>
                  <strong>Clinical Utility:</strong> miRNA profiles aid in cancer diagnosis and classification. miRNA-targeting drugs (e.g., MRX34) are in development for therapeutic applications.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imprinting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                Genomic Imprinting and Cancer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Monoallelic gene expression based on parental origin, maintained by differential methylation. Loss of imprinting (LOI) leads to overexpression of growth genes.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Syndrome</th>
                      <th className="text-left p-2">Genes Affected</th>
                      <th className="text-left p-2">Tumor Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genomicImprinting.map((syndrome, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{syndrome.syndrome}</td>
                        <td className="p-2">{syndrome.genes}</td>
                        <td className="p-2">{syndrome.tumors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Card className="bg-orange-50 dark:bg-orange-950/20">
                <CardHeader>
                  <CardTitle className="text-lg">X Chromosome Inactivation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>XIST</strong> lncRNA silences one X chromosome in females</li>
                    <li>• Loss of XIST → reactivation of oncogenes</li>
                    <li>• Linked to breast, ovarian cancers, hematologic malignancies</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="therapeutics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-green-600" />
                Epigenetic Therapies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Agent</th>
                      <th className="text-left p-2">Target</th>
                      <th className="text-left p-2">Indication</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedTherapies.map((therapy, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{therapy.agent}</td>
                        <td className="p-2">{therapy.target}</td>
                        <td className="p-2">{therapy.indication}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Emerging Therapies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• BET inhibitors (e.g., molibresib)</li>
                      <li>• IDH1/2 inhibitors (e.g., ivosidenib)</li>
                      <li>• Combination therapies (epigenetics + immunotherapy)</li>
                      <li>• CRISPR epigenome editing</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Predictive Biomarkers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>MGMT methylation</strong> → temozolomide response</li>
                      <li>• <strong>IDH mutations</strong> → CIMP phenotype</li>
                      <li>• <strong>EZH2 mutation</strong> → tazemetostat sensitivity</li>
                      <li>• <strong>MSI status</strong> → immunotherapy response</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <strong>Future Directions:</strong> CRISPR epigenome editing, organoid models for therapy screening, multi-omics integration, AI tools for predictive epigenetics, and reversible reprogramming for regenerative oncology.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeneticEpigeneticMechanisms;