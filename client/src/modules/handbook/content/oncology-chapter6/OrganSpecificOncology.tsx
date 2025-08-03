import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Brain, Activity, Target, Users, Stethoscope } from "lucide-react";

export default function OrganSpecificOncology() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-cyan-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-600" />
            Chapter 6: Organ-Specific Oncology
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Breast Cancer</Badge>
            <Badge variant="outline">Lung Cancer</Badge>
            <Badge variant="outline">GI Cancers</Badge>
            <Badge variant="outline">GU Cancers</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Organ-specific oncology encompasses the detailed management of cancers arising from specific anatomical sites, integrating molecular subtypes, staging systems, and evidence-based treatment protocols tailored to each tumor type.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter provides comprehensive coverage of major cancer types including breast, lung, gastrointestinal, genitourinary, gynecologic, and hematologic malignancies with focus on molecular classification, staging, and personalized treatment approaches.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
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
                <h4 className="font-semibold text-sm mb-2">Molecular Subtypes</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Luminal A</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ER+/PR+, HER2-, Low Ki67</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Luminal B</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ER+, HER2+ or High Ki67</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">HER2-Enriched</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ER-, PR-, HER2+</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <div className="font-medium text-xs">Triple Negative</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ER-, PR-, HER2-</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Treatment Approaches</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Neoadjuvant:</strong> HER2+ and TNBC, large tumors</li>
                  <li>• <strong>Adjuvant:</strong> Risk-based selection, genomic assays</li>
                  <li>• <strong>Targeted Therapy:</strong> Trastuzumab, pertuzumab, CDK4/6i</li>
                  <li>• <strong>Immunotherapy:</strong> Pembrolizumab for TNBC</li>
                  <li>• <strong>Endocrine Therapy:</strong> Tamoxifen, aromatase inhibitors</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-slate-600" />
              Lung Cancer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">NSCLC Biomarkers</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>EGFR:</strong> Osimertinib first-line</li>
                  <li>• <strong>ALK:</strong> Alectinib, brigatinib</li>
                  <li>• <strong>ROS1:</strong> Entrectinib, crizotinib</li>
                  <li>• <strong>BRAF V600E:</strong> Dabrafenib + trametinib</li>
                  <li>• <strong>KRAS G12C:</strong> Sotorasib, adagrasib</li>
                  <li>• <strong>MET Exon 14:</strong> Capmatinib, tepotinib</li>
                  <li>• <strong>RET:</strong> Selpercatinib, pralsetinib</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Immunotherapy</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>PD-L1 Testing:</strong> Companion diagnostic</li>
                  <li>• <strong>First-line:</strong> Pembrolizumab &gt;50% PD-L1</li>
                  <li>• <strong>Combination:</strong> Chemo-immunotherapy</li>
                  <li>• <strong>TMB High:</strong> Pembrolizumab regardless of PD-L1</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-600" />
            Gastrointestinal Cancers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Colorectal Cancer
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>MSI Testing:</strong> Universal screening</li>
                <li>• <strong>RAS/BRAF:</strong> Anti-EGFR therapy selection</li>
                <li>• <strong>Adjuvant:</strong> FOLFOX, CAPOX</li>
                <li>• <strong>Metastatic:</strong> FOLFIRI, FOLFOX + biologics</li>
                <li>• <strong>Immunotherapy:</strong> MSI-H tumors</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Gastric Cancer
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>HER2 Testing:</strong> Trastuzumab therapy</li>
                <li>• <strong>PD-L1/MSI:</strong> Immunotherapy biomarkers</li>
                <li>• <strong>Perioperative:</strong> FLOT regimen</li>
                <li>• <strong>Advanced:</strong> Combination chemotherapy</li>
                <li>• <strong>Targeted:</strong> Ramucirumab second-line</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Pancreatic Cancer
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>BRCA Testing:</strong> PARP inhibitors</li>
                <li>• <strong>Adjuvant:</strong> mFOLFIRINOX vs gemcitabine</li>
                <li>• <strong>Metastatic:</strong> FOLFIRINOX, gem/abraxane</li>
                <li>• <strong>Germline:</strong> Family history screening</li>
                <li>• <strong>Maintenance:</strong> Olaparib for BRCA+</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Stethoscope className="h-4 w-4" />
        <AlertDescription>
          <strong>Personalized Medicine Integration:</strong> Modern oncology practice requires comprehensive molecular profiling, multidisciplinary tumor boards, and integration of emerging biomarkers. Treatment selection increasingly depends on tumor genomics rather than histology alone.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-600" />
            Genitourinary and Gynecologic Cancers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Genitourinary Cancers</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Prostate Cancer</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Risk Stratification:</strong> D'Amico, NCCN criteria</li>
                    <li>• <strong>ADT:</strong> LHRH agonists/antagonists</li>
                    <li>• <strong>mCRPC:</strong> Abiraterone, enzalutamide</li>
                    <li>• <strong>PARP Inhibitors:</strong> HRR mutations</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Renal Cell Carcinoma</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Clear Cell:</strong> VEGF, mTOR inhibitors</li>
                    <li>• <strong>Immunotherapy:</strong> Nivolumab + ipilimumab</li>
                    <li>• <strong>Combination:</strong> IO + TKI approaches</li>
                    <li>• <strong>Risk Models:</strong> IMDC, MSKCC</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Gynecologic Cancers</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Ovarian Cancer</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>BRCA Testing:</strong> Germline and somatic</li>
                    <li>• <strong>PARP Inhibitors:</strong> Maintenance therapy</li>
                    <li>• <strong>Bevacizumab:</strong> Anti-angiogenic therapy</li>
                    <li>• <strong>Platinum Sensitivity:</strong> Treatment selection</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Endometrial Cancer</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>MMR Testing:</strong> Lynch syndrome screening</li>
                    <li>• <strong>Molecular Classification:</strong> POLE, MSI, p53</li>
                    <li>• <strong>Immunotherapy:</strong> dMMR tumors</li>
                    <li>• <strong>Hormonal Therapy:</strong> Early-stage disease</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4">
        <h4 className="font-medium text-cyan-800 dark:text-cyan-200 mb-2">Multidisciplinary Cancer Care</h4>
        <p className="text-sm text-cyan-700 dark:text-cyan-300">
          Optimal cancer care requires integration of surgery, medical oncology, radiation oncology, 
          pathology, radiology, and supportive care services. Molecular tumor boards facilitate 
          precision medicine approaches, while patient navigation ensures coordinated care delivery 
          and optimal outcomes across the cancer care continuum.
        </p>
      </div>
    </div>
  );
}