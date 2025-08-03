import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, Brain, Activity, Zap, Monitor, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function TreatmentPlanning() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Chapter 4: Advanced Treatment Planning and Optimization
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">IMRT/VMAT</Badge>
            <Badge variant="outline">SBRT</Badge>
            <Badge variant="outline">SRS</Badge>
            <Badge variant="outline">Adaptive RT</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Advanced treatment planning incorporates sophisticated dose calculation algorithms, inverse planning optimization, and adaptive techniques to maximize tumor control while minimizing normal tissue toxicity through precision dose delivery.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter covers modern treatment planning techniques including intensity-modulated radiation therapy (IMRT), volumetric arc therapy (VMAT), stereotactic techniques, and emerging adaptive radiation therapy approaches for optimal clinical outcomes.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-blue-600" />
              Inverse Planning and Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Optimization Algorithms</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Simulated Annealing:</strong> Global optimization approach</li>
                  <li>• <strong>Gradient Descent:</strong> Local optimization methods</li>
                  <li>• <strong>Linear Programming:</strong> Constrained optimization</li>
                  <li>• <strong>Monte Carlo:</strong> Stochastic optimization techniques</li>
                  <li>• <strong>Genetic Algorithms:</strong> Evolutionary optimization</li>
                  <li>• <strong>Machine Learning:</strong> AI-assisted plan optimization</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Objective Function Design</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <div className="font-medium text-xs">Target Objectives</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Dose uniformity, coverage</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">OAR Constraints</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">DVH constraints, penalties</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Plan Quality</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Conformity, gradient indices</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Delivery Efficiency</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Treatment time, complexity</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">IMRT Techniques</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Step-and-Shoot:</strong> Static multileaf collimator delivery</li>
                  <li>• <strong>Dynamic MLC:</strong> Sliding window technique</li>
                  <li>• <strong>Tomotherapy:</strong> Helical delivery pattern</li>
                  <li>• <strong>VMAT:</strong> Volumetric modulated arc therapy</li>
                  <li>• <strong>Hybrid Techniques:</strong> Combined static and arc fields</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-purple-600" />
              Stereotactic Radiation Therapy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">SRS (Stereotactic Radiosurgery)</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Gamma Knife:</strong> Multiple cobalt sources, helmet-based</li>
                  <li>• <strong>Linear Accelerator SRS:</strong> LINAC-based delivery</li>
                  <li>• <strong>CyberKnife:</strong> Robotic tracking system</li>
                  <li>• <strong>Frame-based:</strong> Invasive stereotactic localization</li>
                  <li>• <strong>Frameless:</strong> Image-guided positioning systems</li>
                  <li>• <strong>Indications:</strong> Brain metastases, AVMs, functional disorders</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">SBRT (Stereotactic Body RT)</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Lung SBRT:</strong> Early-stage NSCLC, oligometastases</li>
                  <li>• <strong>Liver SBRT:</strong> Hepatocellular carcinoma, metastases</li>
                  <li>• <strong>Spine SBRT:</strong> Spinal metastases, paraspinal tumors</li>
                  <li>• <strong>Prostate SBRT:</strong> Ultra-hypofractionated treatment</li>
                  <li>• <strong>Motion Management:</strong> 4D planning, gating, tracking</li>
                  <li>• <strong>Normal Tissue Constraints:</strong> Serial organ sparing</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Quality Assurance</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>End-to-End Testing:</strong> Complete workflow validation</li>
                  <li>• <strong>Patient-Specific QA:</strong> Pre-treatment verification</li>
                  <li>• <strong>Imaging QA:</strong> CBCT accuracy, registration</li>
                  <li>• <strong>Dosimetric QA:</strong> Small field dosimetry challenges</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-green-600" />
            Adaptive Radiation Therapy and AI Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Adaptive radiation therapy represents the next evolution in treatment personalization, utilizing real-time imaging and artificial intelligence to modify treatment plans based on anatomical and physiological changes during the course of therapy.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Online Adaptation
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Real-time Imaging:</strong> CBCT, MR-guided systems</li>
                <li>• <strong>Plan Selection:</strong> Library-based approaches</li>
                <li>• <strong>Plan Modification:</strong> Online re-optimization</li>
                <li>• <strong>Automated Workflows:</strong> AI-assisted adaptation</li>
                <li>• <strong>Quality Control:</strong> Rapid plan verification</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Offline Adaptation
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Systematic Changes:</strong> Weight loss, tumor regression</li>
                <li>• <strong>Replanning Triggers:</strong> Dosimetric thresholds</li>
                <li>• <strong>Accumulated Dose:</strong> Deformable registration</li>
                <li>• <strong>Plan Evaluation:</strong> Revised dose distributions</li>
                <li>• <strong>Decision Support:</strong> Clinical indicators</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                AI and Machine Learning
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Auto-contouring:</strong> Deep learning segmentation</li>
                <li>• <strong>Plan Generation:</strong> Automated treatment planning</li>
                <li>• <strong>Outcome Prediction:</strong> Machine learning models</li>
                <li>• <strong>Quality Assurance:</strong> Automated plan checking</li>
                <li>• <strong>Decision Support:</strong> Clinical decision algorithms</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Clinical Implementation:</strong> Advanced treatment planning techniques require comprehensive training, robust quality assurance programs, and multidisciplinary collaboration. Patient selection criteria and appropriate clinical indications must guide technology adoption to ensure optimal outcomes.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-600" />
            Special Techniques and Emerging Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Advanced Delivery Techniques</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Motion Management
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>4D CT Planning:</strong> Respiratory cycle imaging</li>
                    <li>• <strong>Respiratory Gating:</strong> Breath-hold techniques</li>
                    <li>• <strong>Real-time Tracking:</strong> Tumor motion monitoring</li>
                    <li>• <strong>Breath Hold:</strong> Deep inspiration techniques</li>
                    <li>• <strong>Robotic Tracking:</strong> CyberKnife Synchrony</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Image-Guided RT (IGRT)
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>CBCT Guidance:</strong> Daily setup verification</li>
                    <li>• <strong>Planar Imaging:</strong> Portal imaging systems</li>
                    <li>• <strong>Surface Guidance:</strong> Optical tracking systems</li>
                    <li>• <strong>Implanted Markers:</strong> Fiducial-based guidance</li>
                    <li>• <strong>MR-Guided RT:</strong> Real-time soft tissue imaging</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Emerging Technologies</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Particle Therapy</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Proton Therapy:</strong> Bragg peak dose distribution</li>
                    <li>• <strong>Carbon Ion Therapy:</strong> Enhanced RBE effects</li>
                    <li>• <strong>FLASH Radiotherapy:</strong> Ultra-high dose rates</li>
                    <li>• <strong>Boron Neutron Capture:</strong> Targeted cellular therapy</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Biological Optimization</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Hypoxia Imaging:</strong> PET-guided dose escalation</li>
                    <li>• <strong>Functional Imaging:</strong> fMRI, DTI integration</li>
                    <li>• <strong>Radiomics:</strong> Quantitative image analysis</li>
                    <li>• <strong>Genomic Integration:</strong> DNA repair profiling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
        <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Future of Treatment Planning</h4>
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          The evolution of treatment planning continues toward fully automated, AI-driven systems that integrate 
          multi-modal imaging, biological markers, and real-time adaptation. Machine learning algorithms will 
          enable personalized treatment optimization based on individual patient characteristics, tumor biology, 
          and predicted treatment response, revolutionizing precision radiation therapy delivery.
        </p>
      </div>
    </div>
  );
}