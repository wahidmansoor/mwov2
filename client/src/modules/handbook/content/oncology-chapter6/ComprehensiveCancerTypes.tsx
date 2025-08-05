import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, Brain, Heart, Activity, Users, Shield, CheckCircle, Zap } from "lucide-react";

export default function ComprehensiveCancerTypes() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Comprehensive Cancer Types: NCCN/ASCO/ESMO Guidelines 2024-2025
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">All Cancer Types</Badge>
            <Badge variant="outline">Current Guidelines</Badge>
            <Badge variant="outline">Biomarker-Driven</Badge>
            <Badge variant="outline">Precision Medicine</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            This comprehensive reference includes all major cancer types with current evidence-based treatment protocols from NCCN, ASCO, and ESMO guidelines (2024-2025), incorporating molecular biomarkers, immunotherapy combinations, and precision medicine approaches.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-red-600" />
              Thoracic Malignancies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Non-Small Cell Lung Cancer (NSCLC)</h4>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Driver Mutations</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">EGFR, ALK, ROS1, BRAF, KRAS G12C, MET Exon 14, RET, NTRK</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Immunotherapy Biomarkers</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">PD-L1, TMB-H, MSI-H, STK11, KEAP1</div>
                  </div>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>EGFR+:</strong> Osimertinib first-line, Amivantamab second-line</li>
                  <li>• <strong>ALK+:</strong> Alectinib/Brigatinib first-line, Lorlatinib second-line</li>
                  <li>• <strong>KRAS G12C:</strong> Sotorasib/Adagrasib (2nd+ line)</li>
                  <li>• <strong>PD-L1 ≥50%:</strong> Pembrolizumab monotherapy</li>
                  <li>• <strong>PD-L1 1-49%:</strong> Pembrolizumab + chemotherapy</li>
                  <li>• <strong>PD-L1 &lt;1%:</strong> Chemotherapy ± bevacizumab</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Small Cell Lung Cancer (SCLC)</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Extensive Stage:</strong> Carboplatin/etoposide + atezolizumab → maintenance atezolizumab</li>
                  <li>• <strong>Limited Stage:</strong> Concurrent chemoradiation + durvalumab maintenance</li>
                  <li>• <strong>Second-line:</strong> Lurbinectedin, topotecan, or immune checkpoint inhibitors</li>
                  <li>• <strong>DLL3+:</strong> Tarlatamab (BiTE therapy) for relapsed disease</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Mesothelioma</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>First-line:</strong> Pemetrexed + cisplatin/carboplatin + bevacizumab</li>
                  <li>• <strong>PD-L1+:</strong> Nivolumab + ipilimumab (CheckMate 743)</li>
                  <li>• <strong>Maintenance:</strong> Bevacizumab continuation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-pink-200 bg-pink-50 dark:border-pink-800 dark:bg-pink-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-pink-600" />
              Breast Cancer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Hormone Receptor-Positive</h4>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Early Stage</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">CDK4/6i + AI, Abemaciclib high-risk</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Metastatic</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">CDK4/6i + fulvestrant, capivasertib</div>
                  </div>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Adjuvant:</strong> Abemaciclib + endocrine therapy (high-risk Ki67 ≥20%)</li>
                  <li>• <strong>First-line Metastatic:</strong> CDK4/6 inhibitor + AI or fulvestrant</li>
                  <li>• <strong>PIK3CA+:</strong> Alpelisib + fulvestrant</li>
                  <li>• <strong>ESR1+:</strong> Elacestrant, capivasertib + fulvestrant</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">HER2-Positive</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Neoadjuvant:</strong> TCHP (docetaxel + carboplatin + trastuzumab + pertuzumab)</li>
                  <li>• <strong>Adjuvant:</strong> 1-year trastuzumab ± pertuzumab</li>
                  <li>• <strong>Metastatic First-line:</strong> Pertuzumab + trastuzumab + chemotherapy</li>
                  <li>• <strong>Second-line:</strong> T-DM1 or T-DXd (trastuzumab deruxtecan)</li>
                  <li>• <strong>HER2-Low:</strong> T-DXd for IHC 1+ or 2+/ISH-</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Triple-Negative (TNBC)</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Neoadjuvant:</strong> Pembrolizumab + chemotherapy</li>
                  <li>• <strong>Adjuvant:</strong> Pembrolizumab (residual disease post-neoadjuvant)</li>
                  <li>• <strong>BRCA+:</strong> Olaparib adjuvant, platinum-based chemotherapy</li>
                  <li>• <strong>PD-L1+ Metastatic:</strong> Pembrolizumab + chemotherapy</li>
                  <li>• <strong>Trop-2+:</strong> Sacituzumab govitecan</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-600" />
            Gastrointestinal Malignancies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Colorectal Cancer
              </h4>
              <div className="space-y-2">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2">
                  <div className="font-medium text-xs">Biomarkers (Universal Testing)</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">MSI/MMR, RAS/RAF, HER2, NTRK, POLE</div>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Adjuvant Stage III:</strong> FOLFOX, CAPOX</li>
                  <li>• <strong>MSI-H:</strong> Pembrolizumab adjuvant (high-risk Stage II/III)</li>
                  <li>• <strong>RAS/BRAF WT:</strong> Anti-EGFR + chemotherapy</li>
                  <li>• <strong>BRAF V600E:</strong> Encorafenib + cetuximab</li>
                  <li>• <strong>HER2+ (3+ or 2+/ISH+):</strong> Trastuzumab + pertuzumab</li>
                  <li>• <strong>KRASG12C:</strong> Adagrasib combination therapy</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Gastric/GEJ Cancer
              </h4>
              <div className="space-y-2">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                  <div className="font-medium text-xs">Key Biomarkers</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">HER2, PD-L1, MSI, Claudin18.2</div>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Perioperative:</strong> FLOT (5-FU/leucovorin/oxaliplatin/docetaxel)</li>
                  <li>• <strong>HER2+:</strong> Trastuzumab + chemotherapy</li>
                  <li>• <strong>PD-L1+:</strong> Nivolumab + chemotherapy</li>
                  <li>• <strong>MSI-H:</strong> Pembrolizumab monotherapy</li>
                  <li>• <strong>Claudin18.2+:</strong> Zolbetuximab + chemotherapy</li>
                  <li>• <strong>Second-line:</strong> Ramucirumab + paclitaxel</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Pancreatic Cancer
              </h4>
              <div className="space-y-2">
                <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                  <div className="font-medium text-xs">Biomarker Testing</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">BRCA1/2, PALB2, ATM, MMR, KRAS G12C</div>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Adjuvant:</strong> mFOLFIRINOX vs modified gemcitabine/capecitabine</li>
                  <li>• <strong>Metastatic BRCA+:</strong> Platinum-based → olaparib maintenance</li>
                  <li>• <strong>Metastatic First-line:</strong> FOLFIRINOX vs gemcitabine/abraxane</li>
                  <li>• <strong>MSI-H:</strong> Pembrolizumab monotherapy</li>
                  <li>• <strong>KRAS G12C:</strong> Adagrasib + chemotherapy (investigational)</li>
                  <li>• <strong>Germline BRCA:</strong> Family cascade testing</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Genitourinary Cancers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Prostate Cancer</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2 mb-2">
                  <div className="font-medium text-xs">Biomarker Testing</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">HRR genes, MSI, TMB, PSMA expression</div>
                </div>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>High-Risk Localized:</strong> Radiation + ADT + abiraterone</li>
                  <li>• <strong>mCRPC First-line:</strong> Abiraterone, enzalutamide, or docetaxel</li>
                  <li>• <strong>HRR+ mCRPC:</strong> Olaparib, rucaparib (BRCA+)</li>
                  <li>• <strong>MSI-H:</strong> Pembrolizumab</li>
                  <li>• <strong>PSMA+:</strong> ¹⁷⁷Lu-PSMA-617 (Pluvicto)</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Renal Cell Carcinoma</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Clear Cell RCC:</strong> Nivolumab + ipilimumab or Pembrolizumab + axitinib</li>
                  <li>• <strong>Intermediate/Poor Risk:</strong> Nivolumab + cabozantinib</li>
                  <li>• <strong>Second-line:</strong> Cabozantinib, nivolumab, or TKIs</li>
                  <li>• <strong>Non-clear Cell:</strong> Cabozantinib or sunitinib</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Bladder Cancer</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Muscle-Invasive:</strong> Neoadjuvant chemotherapy → surgery</li>
                  <li>• <strong>PD-L1+ Cisplatin-ineligible:</strong> Pembrolizumab</li>
                  <li>• <strong>Metastatic First-line:</strong> Enfortumab vedotin + pembrolizumab</li>
                  <li>• <strong>FGFR2/3+:</strong> Erdafitinib</li>
                  <li>• <strong>Nectin-4+:</strong> Enfortumab vedotin</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Testicular Cancer</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Good Risk:</strong> 3×BEP or 4×EP</li>
                  <li>• <strong>Intermediate Risk:</strong> 4×BEP</li>
                  <li>• <strong>Poor Risk:</strong> 4×BEP or high-dose chemotherapy</li>
                  <li>• <strong>Relapsed:</strong> Conventional vs high-dose chemotherapy</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Gynecologic Cancers</h4>
                <div className="space-y-2">
                  <div className="bg-pink-50 dark:bg-pink-900/20 rounded p-2">
                    <div className="font-medium text-xs">Ovarian Cancer</div>
                    <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• <strong>HRD+:</strong> Olaparib, niraparib maintenance</li>
                      <li>• <strong>BRCA+:</strong> PARP inhibitor first-line maintenance</li>
                      <li>• <strong>Bevacizumab:</strong> First-line + maintenance</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Endometrial Cancer</div>
                    <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• <strong>dMMR/MSI-H:</strong> Pembrolizumab + lenvatinib</li>
                      <li>• <strong>POLE Ultra-mutated:</strong> Excellent prognosis</li>
                      <li>• <strong>p53 Abnormal:</strong> Aggressive treatment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Guidelines Integration:</strong> All treatment recommendations reflect current NCCN Guidelines® (2024.3-2025.1), ASCO Clinical Practice Guidelines, and ESMO Clinical Practice Guidelines. Biomarker testing should follow precision oncology protocols with comprehensive genomic profiling when indicated.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-teal-600" />
            Hematologic Malignancies & Rare Cancers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Hematologic Malignancies</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    Acute Leukemias
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>AML FLT3+:</strong> Midostaurin or gilteritinib + chemotherapy</li>
                    <li>• <strong>AML IDH1/2+:</strong> Ivosidenib or enasidenib</li>
                    <li>• <strong>ALL Ph+:</strong> TKI + chemotherapy (dasatinib, ponatinib)</li>
                    <li>• <strong>ALL CD19+:</strong> Blinatumomab, CAR-T therapy</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    Lymphomas
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>DLBCL First-line:</strong> R-CHOP, R-EPOCH</li>
                    <li>• <strong>DLBCL Relapsed:</strong> CAR-T (axi-cel, tisa-cel)</li>
                    <li>• <strong>Hodgkin Lymphoma:</strong> ABVD, escalated BEACOPP</li>
                    <li>• <strong>Mantle Cell:</strong> BTK inhibitors (ibrutinib, acalabrutinib)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Rare & CNS Tumors</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">CNS Tumors</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Glioblastoma IDH-WT:</strong> Temozolomide + radiation → TTFields</li>
                    <li>• <strong>IDH-mutant Glioma:</strong> RT → PCV or temozolomide</li>
                    <li>• <strong>MGMT Methylated:</strong> Enhanced temozolomide benefit</li>
                    <li>• <strong>H3K27M Glioma:</strong> Radiation + investigational agents</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Sarcomas & Others</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>GIST:</strong> Imatinib → sunitinib → regorafenib</li>
                    <li>• <strong>NTRK+ Tumors:</strong> Larotrectinib, entrectinib</li>
                    <li>• <strong>Melanoma BRAF+:</strong> Dabrafenib + trametinib</li>
                    <li>• <strong>MSI-H Any Tumor:</strong> Pembrolizumab tissue-agnostic</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
        <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Precision Oncology Excellence</h4>
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          Modern cancer care requires comprehensive biomarker testing, molecular tumor boards, and precision medicine approaches. This reference incorporates the latest evidence from NCCN Guidelines®, ASCO/ESMO recommendations, and FDA approvals to ensure optimal treatment selection and patient outcomes across all cancer types.
        </p>
      </div>
    </div>
  );
}