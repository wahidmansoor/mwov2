import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Anchor, Camera, Crosshair, Monitor, Settings, Shield } from "lucide-react";

export default function ImmobilizationSimulation() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-cyan-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5 text-cyan-600" />
            2.1 Patient Immobilization and CT Simulation
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Patient Positioning</Badge>
            <Badge variant="outline">Immobilization Devices</Badge>
            <Badge variant="outline">CT Simulation</Badge>
            <Badge variant="outline">Quality Assurance</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Accurate and reproducible patient positioning is fundamental to successful radiation therapy. The simulation process establishes the treatment position, creates immobilization devices, and acquires planning CT images that serve as the foundation for treatment planning and daily setup verification.
          </p>
          
          <p className="text-sm leading-relaxed">
            Modern simulation incorporates advanced imaging techniques, including 4D-CT for respiratory motion assessment, and utilizes sophisticated immobilization systems to minimize setup uncertainty and organ motion throughout the treatment course.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-blue-600" />
              Immobilization Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Head and Neck Immobilization</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Thermoplastic Masks:</strong> 3-5 point masks with neck extension</li>
                  <li>• <strong>Bite Blocks:</strong> Oral immobilization for intraoral treatments</li>
                  <li>• <strong>Headrest Systems:</strong> Adjustable head and shoulder supports</li>
                  <li>• <strong>Setup Accuracy:</strong> ±2-3mm reproducibility achievable</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Thorax Immobilization</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Breast Boards:</strong> Prone or supine positioning systems</li>
                  <li>• <strong>Wing Boards:</strong> Arm positioning and chest wall access</li>
                  <li>• <strong>Vacuum Cushions:</strong> Custom body contouring</li>
                  <li>• <strong>Respiratory Gating:</strong> Motion management techniques</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Abdomen/Pelvis Immobilization</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Belly Boards:</strong> Small bowel displacement</li>
                  <li>• <strong>Pelvic Immobilizers:</strong> Hip and leg positioning</li>
                  <li>• <strong>Bladder/Rectal Protocols:</strong> Organ filling consistency</li>
                  <li>• <strong>Alpha Cradles:</strong> Whole-body immobilization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Camera className="h-5 w-5 text-green-600" />
              CT Simulation Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Pre-Simulation Preparation</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Patient Consultation:</strong> Procedure explanation and consent</li>
                  <li>• <strong>Positioning Assessment:</strong> Comfort and reproducibility evaluation</li>
                  <li>• <strong>Contrast Protocols:</strong> IV, oral, or rectal contrast as indicated</li>
                  <li>• <strong>Bladder/Bowel Prep:</strong> Site-specific preparation instructions</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Image Acquisition Parameters</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Slice Thickness:</strong> 1.25-3mm depending on treatment site</li>
                  <li>• <strong>Field of View:</strong> Extended to include setup anatomy</li>
                  <li>• <strong>Pixel Size:</strong> 0.5-1.0mm for adequate resolution</li>
                  <li>• <strong>Image Quality:</strong> Optimal contrast-to-noise ratio</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">4D-CT Respiratory Gating</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Respiratory Monitoring:</strong> External markers or spirometry</li>
                  <li>• <strong>Phase Binning:</strong> 8-10 respiratory phases typically acquired</li>
                  <li>• <strong>Motion Assessment:</strong> Tumor and organ displacement analysis</li>
                  <li>• <strong>Gating Windows:</strong> Optimal phase selection for treatment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crosshair className="h-5 w-5 text-purple-600" />
            Reference Point and Coordinate System Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Establishment of reproducible reference points and coordinate systems enables accurate patient setup and treatment delivery verification throughout the treatment course.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Isocenter Placement
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Anatomical Landmarks:</strong> Palpable bony prominences</li>
                <li>• <strong>Geometric Center:</strong> Target volume centroid consideration</li>
                <li>• <strong>Beam Arrangement:</strong> Optimal angle accessibility</li>
                <li>• <strong>Patient Comfort:</strong> Sustainable positioning verification</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Tattoo Placement
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Permanent Marks:</strong> Small tattoo dots for reference</li>
                <li>• <strong>Three-Point System:</strong> Anterior and bilateral marks</li>
                <li>• <strong>Coordinate Documentation:</strong> Distance measurements recorded</li>
                <li>• <strong>Backup References:</strong> Multiple anatomical landmarks</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Image Registration
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>DICOM Coordinates:</strong> Treatment planning system integration</li>
                <li>• <strong>Fusion Protocols:</strong> Multi-modality image registration</li>
                <li>• <strong>Verification Methods:</strong> Anatomy-based confirmation</li>
                <li>• <strong>Quality Checks:</strong> Systematic accuracy verification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Quality Assurance Protocol:</strong> Daily simulation QA includes laser alignment checks, CT scanner calibration verification, and immobilization device integrity assessment. Patient-specific QA involves setup reproducibility testing and immobilization device fitting verification before treatment initiation.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-orange-600" />
            Advanced Simulation Techniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Motion Management</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Respiratory Motion Assessment</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 4D-CT acquisition and analysis</li>
                    <li>• Internal target volume (ITV) determination</li>
                    <li>• Maximum intensity projection (MIP) analysis</li>
                    <li>• Motion amplitude and pattern characterization</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Motion Mitigation Strategies</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Abdominal compression techniques</li>
                    <li>• Respiratory gating and breath-hold protocols</li>
                    <li>• Real-time tracking system integration</li>
                    <li>• Patient coaching and training</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Image Enhancement</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Contrast Optimization</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• IV contrast timing and concentration</li>
                    <li>• Oral contrast for bowel delineation</li>
                    <li>• Rectal contrast for pelvic treatments</li>
                    <li>• Multi-phase acquisition protocols</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Multi-Modality Integration</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• MRI fusion for soft tissue contrast</li>
                    <li>• PET integration for metabolic information</li>
                    <li>• Ultrasound guidance for mobile organs</li>
                    <li>• Cone-beam CT for adaptive planning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4">
        <h4 className="font-medium text-cyan-800 dark:text-cyan-200 mb-2">Future Developments</h4>
        <p className="text-sm text-cyan-700 dark:text-cyan-300">
          Emerging technologies include MRI-guided simulation for superior soft tissue visualization, 
          artificial intelligence-assisted positioning optimization, and automated quality assurance systems. 
          Integration of surface-guided radiation therapy (SGRT) and real-time monitoring systems promise 
          to further improve setup accuracy and reduce setup uncertainties.
        </p>
      </div>
    </div>
  );
}