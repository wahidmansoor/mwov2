import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, Zap, Calculator, BarChart3, Layers, Monitor, Settings } from "lucide-react";

export default function BeamGeometryDosimetry() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-600" />
            Chapter 3: Beam Geometry and Dosimetry
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Beam Arrangements</Badge>
            <Badge variant="outline">Dose Calculations</Badge>
            <Badge variant="outline">IMRT/VMAT</Badge>
            <Badge variant="outline">Quality Assurance</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Beam geometry and dosimetry form the technical foundation of radiation therapy, encompassing the spatial arrangement of radiation beams, dose calculation algorithms, and quality assurance procedures that ensure accurate and safe treatment delivery.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter covers fundamental concepts from basic beam arrangements through advanced techniques including intensity-modulated radiation therapy (IMRT), volumetric modulated arc therapy (VMAT), and stereotactic techniques, emphasizing both theoretical principles and practical clinical applications.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-blue-600" />
              Fundamental Beam Arrangements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Single Field Techniques</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Anterior-Posterior (AP):</strong> Simple superficial treatments</li>
                  <li>• <strong>Posterior-Anterior (PA):</strong> Reverse AP configuration</li>
                  <li>• <strong>Lateral Fields:</strong> Side-entry beam geometries</li>
                  <li>• <strong>Oblique Angles:</strong> Angled beam arrangements</li>
                  <li>• <strong>Applications:</strong> Palliative treatments, electron therapy</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Parallel Opposed Pairs</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>AP/PA Configuration:</strong> 180° opposed beams</li>
                  <li>• <strong>Lateral Pairs:</strong> Right and left lateral fields</li>
                  <li>• <strong>Advantages:</strong> Simple setup, dose homogeneity</li>
                  <li>• <strong>Disadvantages:</strong> Limited normal tissue sparing</li>
                  <li>• <strong>Clinical Use:</strong> Palliative bone metastases, simple CNS</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Multi-Field Techniques</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Three-Field Box:</strong> AP and two lateral fields</li>
                  <li>• <strong>Four-Field Box:</strong> AP, PA, and two lateral fields</li>
                  <li>• <strong>Multiple Beam Arrangements:</strong> 5-9 field configurations</li>
                  <li>• <strong>Wedged Fields:</strong> Beam modification for dose uniformity</li>
                  <li>• <strong>Optimization:</strong> Beam weight and angle selection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-green-600" />
              Dose Calculation Algorithms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Correction-Based Algorithms</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Pencil Beam:</strong> Fast calculation with limitations</li>
                  <li>• <strong>Collapsed Cone:</strong> Improved lateral scatter modeling</li>
                  <li>• <strong>Tissue Heterogeneity:</strong> Effective path length corrections</li>
                  <li>• <strong>Clinical Applications:</strong> Routine planning workflows</li>
                  <li>• <strong>Limitations:</strong> Accuracy in heterogeneous media</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Model-Based Algorithms</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Convolution/Superposition:</strong> Improved accuracy</li>
                  <li>• <strong>Analytical Anisotropic Algorithm (AAA):</strong> Varian Eclipse</li>
                  <li>• <strong>Acuros XB:</strong> Linear Boltzmann transport equation</li>
                  <li>• <strong>Advantages:</strong> Better heterogeneity handling</li>
                  <li>• <strong>Computational Requirements:</strong> Higher processing time</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Monte Carlo Methods</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Physics Simulation:</strong> Individual particle interactions</li>
                  <li>• <strong>Gold Standard:</strong> Highest accuracy for complex geometries</li>
                  <li>• <strong>Statistical Uncertainty:</strong> Inherent calculation variance</li>
                  <li>• <strong>Clinical Implementation:</strong> Limited by computation time</li>
                  <li>• <strong>Special Applications:</strong> Small fields, heterogeneities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-600" />
            Advanced Delivery Techniques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Modern radiation therapy employs sophisticated delivery techniques that modulate beam intensity and geometry to achieve superior dose distributions while minimizing normal tissue exposure.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                IMRT (Intensity Modulated RT)
              </h4>
              <div className="space-y-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Multileaf Collimator (MLC)</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Dynamic leaf motion during beam delivery</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Inverse Planning</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Computer optimization of fluence maps</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-medium text-xs">Step-and-Shoot vs Sliding Window</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Static vs dynamic MLC delivery</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                VMAT (Volumetric Modulated Arc)
              </h4>
              <div className="space-y-2">
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Continuous Arc Delivery</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Gantry rotation with simultaneous modulation</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Triple Modulation</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">MLC, dose rate, gantry speed variation</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                  <div className="font-medium text-xs">Efficiency Advantages</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Reduced treatment time, similar plan quality</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Stereotactic Techniques
              </h4>
              <div className="space-y-2">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                  <div className="font-medium text-xs">SRS (Stereotactic Radiosurgery)</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Single fraction, sub-millimeter accuracy</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                  <div className="font-medium text-xs">SBRT (Stereotactic Body RT)</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Hypofractionated extracranial treatments</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                  <div className="font-medium text-xs">High Dose Gradients</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Steep dose fall-off outside target</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Settings className="h-4 w-4" />
        <AlertDescription>
          <strong>Dosimetric Accuracy Requirements:</strong> Clinical dosimetry requires ±3% accuracy for absolute dose and ±3mm spatial accuracy for dose distributions. More stringent tolerances (±2%/2mm) apply to stereotactic treatments and small field dosimetry due to steep dose gradients and critical structure proximity.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            Plan Evaluation and Quality Assurance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Dose-Volume Histogram Analysis</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Target Coverage Metrics</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>D95:</strong> Dose to 95% of target volume</li>
                    <li>• <strong>V95:</strong> Volume receiving 95% of prescription dose</li>
                    <li>• <strong>Conformity Index:</strong> Ratio of isodose volume to target volume</li>
                    <li>• <strong>Homogeneity Index:</strong> Dose uniformity within target</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Normal Tissue Constraints</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Serial Organs:</strong> Maximum dose limits (spinal cord, brainstem)</li>
                    <li>• <strong>Parallel Organs:</strong> Mean dose or volume constraints (lung, liver)</li>
                    <li>• <strong>QUANTEC Guidelines:</strong> Evidence-based tolerance doses</li>
                    <li>• <strong>Institution Protocols:</strong> Local constraint modifications</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Quality Assurance Program</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Machine QA</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Daily:</strong> Output, imaging system, safety interlocks</li>
                    <li>• <strong>Monthly:</strong> Beam energy, flatness, symmetry</li>
                    <li>• <strong>Annual:</strong> Comprehensive dosimetric commissioning</li>
                    <li>• <strong>Safety Systems:</strong> Emergency stops, beam monitoring</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Patient-Specific QA</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Pretreatment Verification:</strong> IMRT/VMAT plan delivery</li>
                    <li>• <strong>Measurement Tools:</strong> Ion chambers, film, EPID</li>
                    <li>• <strong>Gamma Analysis:</strong> 3%/3mm or 2%/2mm criteria</li>
                    <li>• <strong>Action Levels:</strong> &gt;95% gamma pass rate typically required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-cyan-600" />
            Emerging Technologies and Future Directions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Adaptive Radiation Therapy</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Online Adaptation:</strong> Real-time plan modification</li>
                <li>• <strong>Offline Adaptation:</strong> Systematic anatomy changes</li>
                <li>• <strong>MR-guided RT:</strong> Superior soft tissue visualization</li>
                <li>• <strong>AI-assisted Planning:</strong> Automated contour and plan generation</li>
                <li>• <strong>Dose Accumulation:</strong> Deformable image registration</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Advanced Imaging Integration</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>4D-CT Planning:</strong> Respiratory motion incorporation</li>
                <li>• <strong>PET-guided Planning:</strong> Biological target volume definition</li>
                <li>• <strong>Functional Imaging:</strong> Perfusion and diffusion weighting</li>
                <li>• <strong>Real-time Tracking:</strong> Electromagnetic and optical systems</li>
                <li>• <strong>Surface Guidance:</strong> SGRT for patient positioning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Clinical Implementation Excellence</h4>
        <p className="text-sm text-orange-700 dark:text-orange-300">
          Successful implementation of advanced beam geometry and dosimetry techniques requires comprehensive 
          staff training, robust quality assurance programs, and continuous performance monitoring. Integration 
          of artificial intelligence and machine learning tools promises to enhance plan optimization, reduce 
          planning time, and improve treatment outcomes while maintaining the highest safety standards.
        </p>
      </div>
    </div>
  );
}