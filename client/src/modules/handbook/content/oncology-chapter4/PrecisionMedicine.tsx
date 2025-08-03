import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dna, Target, Zap, BarChart3, Microscope, Activity, Brain, Shield } from "lucide-react";

export default function PrecisionMedicine() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-purple-600" />
            Chapter 4: Precision Medicine in Oncology
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Genomic Profiling</Badge>
            <Badge variant="outline">Biomarkers</Badge>
            <Badge variant="outline">Targeted Therapy</Badge>
            <Badge variant="outline">Companion Diagnostics</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Precision medicine represents a paradigm shift in cancer care, moving from one-size-fits-all treatments to individualized therapy based on the molecular characteristics of each patient's tumor, germline genetics, and host factors. This approach has revolutionized oncology practice and outcomes.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter explores the foundations of precision oncology, including comprehensive genomic profiling, biomarker discovery and validation, targeted therapy development, and the integration of artificial intelligence in treatment selection and outcome prediction.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Microscope className="h-5 w-5 text-blue-600" />
              Comprehensive Genomic Profiling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Next-Generation Sequencing (NGS)</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Whole Exome Sequencing (WES):</strong> Protein-coding regions analysis</li>
                  <li>• <strong>Whole Genome Sequencing (WGS):</strong> Complete genomic landscape</li>
                  <li>• <strong>Targeted Panels:</strong> Focused gene sets for specific cancers</li>
                  <li>• <strong>RNA Sequencing:</strong> Gene expression and fusion detection</li>
                  <li>• <strong>Liquid Biopsy:</strong> Circulating tumor DNA analysis</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Mutation Types and Clinical Significance</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <div className="font-medium text-xs">Driver Mutations</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">EGFR, KRAS, BRAF, PIK3CA</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Tumor Suppressors</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">TP53, RB1, PTEN, APC</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">DNA Repair Genes</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">BRCA1/2, MLH1, MSH2</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Fusion Genes</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ALK, ROS1, NTRK</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Pharmacogenomics</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Drug Metabolism:</strong> CYP2D6, CYP3A4 polymorphisms</li>
                  <li>• <strong>Drug Transport:</strong> ABCB1, SLCO1B1 variants</li>
                  <li>• <strong>Drug Targets:</strong> DPYD for 5-FU toxicity prediction</li>
                  <li>• <strong>HLA Typing:</strong> Immune-related adverse event risk</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-orange-600" />
              Actionable Biomarkers and Targeted Therapies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">EGFR Mutations (NSCLC)</h4>
                  <Badge variant="secondary" className="text-xs">Level 1 Evidence</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Mutations:</strong> Exon 19 deletions, L858R point mutation</li>
                  <li>• <strong>Therapies:</strong> Osimertinib, erlotinib, gefitinib, afatinib</li>
                  <li>• <strong>Resistance:</strong> T790M mutation, C797S mutation</li>
                  <li>• <strong>Monitoring:</strong> Liquid biopsy for resistance detection</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">HER2 Amplification</h4>
                  <Badge variant="secondary" className="text-xs">Multiple Cancers</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Testing:</strong> IHC, FISH, NGS confirmation</li>
                  <li>• <strong>Breast Cancer:</strong> Trastuzumab, pertuzumab, T-DM1, T-DXd</li>
                  <li>• <strong>Gastric Cancer:</strong> Trastuzumab combination therapy</li>
                  <li>• <strong>Novel Targets:</strong> HER2-low expression populations</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">Microsatellite Instability (MSI)</h4>
                  <Badge variant="secondary" className="text-xs">Pan-Cancer</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Testing:</strong> PCR, IHC for MMR proteins, NGS</li>
                  <li>• <strong>Immunotherapy:</strong> Pembrolizumab, nivolumab</li>
                  <li>• <strong>Response Rates:</strong> 40-60% across tumor types</li>
                  <li>• <strong>Germline Testing:</strong> Lynch syndrome screening</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">BRCA1/2 Mutations</h4>
                  <Badge variant="secondary" className="text-xs">Homologous Recombination</Badge>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>PARP Inhibitors:</strong> Olaparib, rucaparib, niraparib</li>
                  <li>• <strong>Platinum Sensitivity:</strong> Enhanced chemotherapy response</li>
                  <li>• <strong>Germline vs Somatic:</strong> Testing and counseling implications</li>
                  <li>• <strong>Companion Diagnostics:</strong> HRD testing expansion</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-600" />
            Artificial Intelligence and Machine Learning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            AI and machine learning technologies are transforming precision oncology by enabling analysis of complex, multi-dimensional datasets and identifying patterns beyond human capability.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Predictive Modeling
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Treatment Response:</strong> Multi-omics integration</li>
                <li>• <strong>Toxicity Prediction:</strong> Pharmacovigilance algorithms</li>
                <li>• <strong>Survival Analysis:</strong> Deep learning prognostic models</li>
                <li>• <strong>Drug Resistance:</strong> Evolutionary pathway prediction</li>
                <li>• <strong>Biomarker Discovery:</strong> Novel target identification</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Clinical Decision Support
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Treatment Matching:</strong> Automated therapy selection</li>
                <li>• <strong>Clinical Trial Matching:</strong> Patient-trial compatibility</li>
                <li>• <strong>Dosing Optimization:</strong> Individualized dose selection</li>
                <li>• <strong>Risk Stratification:</strong> Dynamic risk assessment</li>
                <li>• <strong>Quality Assurance:</strong> Automated error detection</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Drug Development
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Target Discovery:</strong> Network analysis approaches</li>
                <li>• <strong>Drug Repurposing:</strong> Computational screening</li>
                <li>• <strong>Patient Stratification:</strong> Trial design optimization</li>
                <li>• <strong>Real-World Evidence:</strong> Outcomes research</li>
                <li>• <strong>Regulatory Science:</strong> AI-assisted approvals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Clinical Implementation Considerations:</strong> Successful precision medicine programs require robust quality assurance, standardized reporting, multidisciplinary molecular tumor boards, and comprehensive genetic counseling services. Turnaround time optimization and cost-effectiveness analysis are critical for sustainable implementation.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            Future Directions and Emerging Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Multi-Omics Integration</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    Proteomics and Metabolomics
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Protein expression profiling and post-translational modifications</li>
                    <li>• Metabolic pathway analysis and biomarker discovery</li>
                    <li>• Integration with genomic data for functional insights</li>
                    <li>• Mass spectrometry and proteome arrays</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    Epigenetic Profiling
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• DNA methylation patterns and chromatin modifications</li>
                    <li>• MicroRNA expression and regulatory networks</li>
                    <li>• Epigenetic therapy target identification</li>
                    <li>• Single-cell epigenomic analysis</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Emerging Diagnostic Technologies</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Liquid Biopsy Advances</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Ultra-sensitive ctDNA detection methods</li>
                    <li>• Circulating tumor cell single-cell analysis</li>
                    <li>• Extracellular vesicle and exosome profiling</li>
                    <li>• Minimal residual disease monitoring</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Spatial Biology</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Spatial transcriptomics and proteomics</li>
                    <li>• Tumor microenvironment mapping</li>
                    <li>• Single-cell spatial analysis</li>
                    <li>• Immune infiltration characterization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Precision Medicine Implementation</h4>
        <p className="text-sm text-purple-700 dark:text-purple-300">
          Successful precision medicine implementation requires integration of advanced diagnostics, 
          bioinformatics infrastructure, clinical expertise, and patient engagement. The future promises 
          real-time adaptive treatments based on dynamic biomarker monitoring, AI-driven drug discovery, 
          and personalized combination therapies tailored to individual tumor evolution patterns.
        </p>
      </div>
    </div>
  );
}