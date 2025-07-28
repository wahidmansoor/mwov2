import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Target, MapPin, Clock, User, AlertTriangle } from "lucide-react";

export function InterventionalOptions() {
  const interventionalProcedures = [
    {
      category: "Nerve Blocks",
      icon: Target,
      procedures: [
        {
          name: "Celiac Plexus Block",
          indication: "Upper abdominal cancer pain",
          success_rate: "70-90%",
          duration: "3-6 months",
          complications: "Hypotension, diarrhea",
          evidence: "Category 1"
        },
        {
          name: "Neurolytic Splanchnic Block",
          indication: "Pancreatic cancer pain",
          success_rate: "80-95%", 
          duration: "4-8 months",
          complications: "Minimal",
          evidence: "Category 1"
        },
        {
          name: "Intrathecal Block",
          indication: "Pelvic cancer pain",
          success_rate: "60-80%",
          duration: "2-4 months",
          complications: "Bowel/bladder dysfunction",
          evidence: "Category 2A"
        }
      ]
    },
    {
      category: "Spinal Interventions",
      icon: MapPin,
      procedures: [
        {
          name: "Intrathecal Pump",
          indication: "Refractory cancer pain",
          success_rate: "85-95%",
          duration: "Permanent device",
          complications: "Infection, catheter issues",
          evidence: "Category 1"
        },
        {
          name: "Epidural Catheter",
          indication: "Localized spinal pain",
          success_rate: "70-85%",
          duration: "Weeks to months",
          complications: "Infection, dural puncture",
          evidence: "Category 2A"
        },
        {
          name: "Vertebroplasty/Kyphoplasty",
          indication: "Vertebral compression fractures",
          success_rate: "80-90%",
          duration: "Permanent",
          complications: "Cement leakage",
          evidence: "Category 1"
        }
      ]
    },
    {
      category: "Ablative Procedures",
      icon: Zap,
      procedures: [
        {
          name: "Radiofrequency Ablation",
          indication: "Bone metastases",
          success_rate: "60-80%",
          duration: "6-12 months",
          complications: "Thermal injury",
          evidence: "Category 2A"
        },
        {
          name: "Cryoablation",
          indication: "Peripheral nerve pain",
          success_rate: "70-85%",
          duration: "3-6 months",
          complications: "Skin damage",
          evidence: "Category 2B"
        },
        {
          name: "Chemical Neurolysis",
          indication: "Trigeminal neuralgia",
          success_rate: "75-90%",
          duration: "6-18 months",
          complications: "Numbness, dysesthesia",
          evidence: "Category 1"
        }
      ]
    }
  ];

  const radiationTherapy = [
    {
      technique: "External Beam Radiotherapy",
      indications: ["Bone metastases", "Soft tissue masses", "Neuropathic pain"],
      fractionation: "Single fraction 8 Gy or 20 Gy in 5 fractions",
      response_rate: "70-80%",
      onset: "1-4 weeks"
    },
    {
      technique: "Stereotactic Body Radiotherapy",
      indications: ["Spinal metastases", "Oligometastatic disease"],
      fractionation: "1-5 fractions, 18-24 Gy",
      response_rate: "80-90%",
      onset: "2-6 weeks"
    },
    {
      technique: "Radiopharmaceuticals",
      indications: ["Widespread bone metastases", "Prostate cancer"],
      fractionation: "Single injection (Ra-223, Sr-89)",
      response_rate: "60-80%",
      onset: "4-8 weeks"
    }
  ];

  const surgicalOptions = [
    {
      procedure: "Cordotomy",
      indication: "Unilateral cancer pain",
      success: "80-90%",
      duration: "6-12 months",
      risks: "Respiratory compromise, weakness"
    },
    {
      procedure: "Rhizotomy",
      indication: "Trigeminal neuralgia",
      success: "85-95%", 
      duration: "12-24 months",
      risks: "Numbness, corneal anesthesia"
    },
    {
      procedure: "Sympathectomy",
      indication: "Visceral pain, CRPS",
      success: "60-80%",
      duration: "Variable",
      risks: "Compensatory hyperhidrosis"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Selection Criteria */}
      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Patient Selection Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Indications for Interventional Procedures</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                  <span>Pain score &gt;7/10 despite optimal medical management</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                  <span>Unacceptable opioid-related side effects</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                  <span>Localized pain amenable to targeted intervention</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                  <span>Life expectancy &gt;3 months</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Contraindications</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                  <span>Coagulopathy or bleeding disorders</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                  <span>Active infection at injection site</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                  <span>Severe cardiopulmonary compromise</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                  <span>Poor performance status (ECOG &gt;3)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interventional Procedures */}
      <div className="space-y-6">
        {interventionalProcedures.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-4">
                  {category.procedures.map((procedure, index) => (
                    <Card key={index} className="border-slate-200 dark:border-slate-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{procedure.name}</CardTitle>
                          <Badge variant={procedure.evidence === "Category 1" ? "default" : "secondary"}>
                            {procedure.evidence}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm">
                          <p className="font-medium text-slate-700 dark:text-slate-300">Indication:</p>
                          <p className="text-slate-600 dark:text-slate-400">{procedure.indication}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="font-medium">Success Rate</p>
                            <p className="text-green-600 dark:text-green-400">{procedure.success_rate}</p>
                          </div>
                          <div>
                            <p className="font-medium">Duration</p>
                            <p>{procedure.duration}</p>
                          </div>
                        </div>
                        
                        <div className="text-xs">
                          <p className="font-medium text-amber-700 dark:text-amber-400">Complications:</p>
                          <p className="text-slate-600 dark:text-slate-400">{procedure.complications}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Radiation Therapy Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Palliative Radiation Therapy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-4">
            {radiationTherapy.map((treatment, index) => (
              <Card key={index} className="border-blue-200 dark:border-blue-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{treatment.technique}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium mb-1">Indications:</p>
                    <ul className="space-y-0.5">
                      {treatment.indications.map((indication, idx) => (
                        <li key={idx} className="text-slate-600 dark:text-slate-400">• {indication}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-medium">Fractionation:</p>
                      <p className="text-slate-600 dark:text-slate-400">{treatment.fractionation}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-medium">Response Rate</p>
                        <p className="text-green-600 dark:text-green-400">{treatment.response_rate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Onset</p>
                        <p>{treatment.onset}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Surgical Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Neurosurgical Interventions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-4">
            {surgicalOptions.map((surgery, index) => (
              <Card key={index} className="border-red-200 dark:border-red-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{surgery.procedure}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-slate-700 dark:text-slate-300">Indication:</p>
                    <p className="text-slate-600 dark:text-slate-400">{surgery.indication}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="font-medium">Success Rate</p>
                      <p className="text-green-600 dark:text-green-400">{surgery.success}</p>
                    </div>
                    <div>
                      <p className="font-medium">Duration</p>
                      <p>{surgery.duration}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs">
                    <p className="font-medium text-red-700 dark:text-red-400">Risks:</p>
                    <p className="text-slate-600 dark:text-slate-400">{surgery.risks}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Decision Support */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>NCCN 2025 Recommendations:</strong> Consider interventional procedures when systemic analgesics 
          are inadequate or cause unacceptable side effects. Multidisciplinary consultation recommended for 
          complex cases. Document informed consent including procedure risks, benefits, and alternatives.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1">
          <Clock className="h-4 w-4 mr-2" />
          Schedule Consultation
        </Button>
        <Button variant="outline" className="flex-1">
          Generate Referral
        </Button>
        <Button variant="outline">
          Print Guidelines
        </Button>
      </div>
    </div>
  );
}