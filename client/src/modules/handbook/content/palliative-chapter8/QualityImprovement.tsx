import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, Target, Users, BarChart3, CheckCircle, Activity, AlertTriangle, Brain } from "lucide-react";

export default function QualityImprovement() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Chapter 8: Quality Improvement and Program Development
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Quality Metrics</Badge>
            <Badge variant="outline">Program Evaluation</Badge>
            <Badge variant="outline">Outcome Measurement</Badge>
            <Badge variant="outline">PDSA Cycles</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Quality improvement in palliative care focuses on systematic approaches to enhance patient outcomes, family satisfaction, and care delivery processes through evidence-based measurement, analysis, and continuous improvement methodologies.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter covers quality measurement frameworks, improvement methodologies, program development strategies, and sustainability approaches for building high-performing palliative care services across diverse healthcare settings.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Quality Measurement Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Donabedian Model</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Structure</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Resources, organization</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Process</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Care delivery methods</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Outcome</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Patient results</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Key Quality Domains</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Effectiveness:</strong> Evidence-based care delivery</li>
                  <li>• <strong>Safety:</strong> Prevention of harm and adverse events</li>
                  <li>• <strong>Patient-Centeredness:</strong> Respectful, responsive care</li>
                  <li>• <strong>Timeliness:</strong> Prompt access and care delivery</li>
                  <li>• <strong>Efficiency:</strong> Resource optimization</li>
                  <li>• <strong>Equity:</strong> Fair care across populations</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Palliative Care Quality Indicators</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Symptom Control:</strong> Pain, dyspnea, nausea management</li>
                  <li>• <strong>Communication:</strong> Goals of care discussions documented</li>
                  <li>• <strong>Spiritual Assessment:</strong> Screening completion rates</li>
                  <li>• <strong>Family Satisfaction:</strong> Bereavement survey scores</li>
                  <li>• <strong>Care Transitions:</strong> Hospital readmission rates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-green-600" />
              Improvement Methodologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Plan-Do-Study-Act (PDSA) Cycles</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Plan</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Change hypothesis, measures</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Do</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Implement on small scale</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                    <div className="font-medium text-xs">Study</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Analyze results, learnings</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Act</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Adopt, adapt, or abandon</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Lean Six Sigma Principles</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Value Stream Mapping:</strong> Process flow analysis</li>
                  <li>• <strong>Waste Elimination:</strong> Non-value-added activity removal</li>
                  <li>• <strong>Standardization:</strong> Best practice protocols</li>
                  <li>• <strong>Root Cause Analysis:</strong> Problem identification methods</li>
                  <li>• <strong>Statistical Control:</strong> Variation reduction techniques</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Change Management</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Stakeholder Engagement:</strong> Leadership and staff buy-in</li>
                  <li>• <strong>Communication Strategy:</strong> Change rationale sharing</li>
                  <li>• <strong>Training and Education:</strong> Skill development programs</li>
                  <li>• <strong>Resistance Management:</strong> Barrier identification and mitigation</li>
                  <li>• <strong>Sustainability Planning:</strong> Long-term adoption strategies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Program Development and Implementation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Successful palliative care program development requires strategic planning, stakeholder engagement, resource allocation, and phased implementation approaches tailored to organizational context and community needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Needs Assessment
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Population Analysis:</strong> Demographics and disease patterns</li>
                <li>• <strong>Service Gaps:</strong> Unmet palliative care needs</li>
                <li>• <strong>Resource Inventory:</strong> Existing capabilities assessment</li>
                <li>• <strong>Stakeholder Mapping:</strong> Key supporter identification</li>
                <li>• <strong>Competitive Analysis:</strong> Regional service landscape</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Business Planning
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Financial Modeling:</strong> Revenue and cost projections</li>
                <li>• <strong>Staffing Plans:</strong> Team composition and FTE requirements</li>
                <li>• <strong>Space Requirements:</strong> Physical facility needs</li>
                <li>• <strong>Technology Infrastructure:</strong> EHR and communication systems</li>
                <li>• <strong>Marketing Strategy:</strong> Referral source development</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Implementation Phases
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Pilot Testing:</strong> Small-scale service launch</li>
                <li>• <strong>Gradual Expansion:</strong> Phased service line growth</li>
                <li>• <strong>Quality Monitoring:</strong> Performance metric tracking</li>
                <li>• <strong>Continuous Improvement:</strong> Iterative program refinement</li>
                <li>• <strong>Sustainability Planning:</strong> Long-term viability assurance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Data Quality Assurance:</strong> Reliable quality improvement requires accurate, complete, and timely data collection. Establish clear data definitions, collection procedures, and validation processes to ensure measurement integrity and actionable insights.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-600" />
            Performance Measurement and Benchmarking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">National Quality Programs</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Quality Reporting Programs
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Joint Commission:</strong> Advanced Certification for Palliative Care</li>
                    <li>• <strong>NQF Measures:</strong> National Quality Forum endorsed metrics</li>
                    <li>• <strong>CMS Quality Programs:</strong> Medicare reporting requirements</li>
                    <li>• <strong>CAHPS Hospice:</strong> Consumer Assessment surveys</li>
                    <li>• <strong>PEACE Project:</strong> Palliative care quality indicators</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-green-500" />
                    Benchmarking Strategies
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Peer Comparisons:</strong> Similar organization performance</li>
                    <li>• <strong>Best Practice Identification:</strong> Top performer analysis</li>
                    <li>• <strong>Trend Analysis:</strong> Performance over time assessment</li>
                    <li>• <strong>Case Mix Adjustment:</strong> Patient acuity considerations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Patient-Reported Outcomes</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">PROM Implementation</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Tool Selection:</strong> Validated instrument choices</li>
                    <li>• <strong>Collection Methods:</strong> Electronic vs. paper administration</li>
                    <li>• <strong>Response Rates:</strong> Completion optimization strategies</li>
                    <li>• <strong>Data Integration:</strong> EHR and analytics platforms</li>
                    <li>• <strong>Clinical Workflow:</strong> Real-time result utilization</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Outcome Domains</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Symptom Burden:</strong> ESAS, MSAS scores</li>
                    <li>• <strong>Functional Status:</strong> ECOG, Karnofsky ratings</li>
                    <li>• <strong>Quality of Life:</strong> FACT-G, SF-36 measures</li>
                    <li>• <strong>Spiritual Well-being:</strong> FACIT-Sp assessments</li>
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
            <Target className="h-5 w-5 text-teal-600" />
            Research and Evidence Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Research Priorities</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Effectiveness Studies:</strong> Intervention outcome research</li>
                <li>• <strong>Implementation Science:</strong> Care delivery optimization</li>
                <li>• <strong>Health Economics:</strong> Cost-effectiveness analysis</li>
                <li>• <strong>Health Disparities:</strong> Equity and access research</li>
                <li>• <strong>Technology Integration:</strong> Digital health innovation</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Methodological Approaches</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Randomized Trials:</strong> Intervention efficacy testing</li>
                <li>• <strong>Observational Studies:</strong> Real-world effectiveness</li>
                <li>• <strong>Mixed Methods:</strong> Quantitative and qualitative integration</li>
                <li>• <strong>Pragmatic Trials:</strong> Practice-based evidence</li>
                <li>• <strong>Registry Studies:</strong> Large-scale outcome tracking</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Knowledge Translation</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Practice Guidelines:</strong> Evidence-based recommendations</li>
                <li>• <strong>Educational Programs:</strong> Provider competency development</li>
                <li>• <strong>Decision Tools:</strong> Point-of-care support resources</li>
                <li>• <strong>Policy Advocacy:</strong> Healthcare system change</li>
                <li>• <strong>Public Engagement:</strong> Community awareness initiatives</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
        <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">Sustainable Quality Excellence</h4>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          High-performing palliative care programs require systematic quality improvement approaches, 
          robust measurement systems, and commitment to continuous learning. Integration of patient-reported 
          outcomes, team-based improvement initiatives, and evidence-based practice changes drive 
          sustainable excellence in palliative care delivery and patient outcomes.
        </p>
      </div>
    </div>
  );
}