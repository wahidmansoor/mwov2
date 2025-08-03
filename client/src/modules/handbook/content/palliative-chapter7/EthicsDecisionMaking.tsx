import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Scale, Users, Brain, Shield, Target, AlertTriangle, CheckCircle, FileText } from "lucide-react";

export default function EthicsDecisionMaking() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-600" />
            Chapter 7: Ethics and Decision-Making in Palliative Care
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Bioethics</Badge>
            <Badge variant="outline">Advance Directives</Badge>
            <Badge variant="outline">Shared Decision-Making</Badge>
            <Badge variant="outline">End-of-Life Ethics</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Ethical decision-making in palliative care involves navigating complex moral challenges related to end-of-life care, treatment limitations, family dynamics, and resource allocation while respecting patient autonomy and promoting beneficence.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter explores fundamental bioethical principles, advance care planning, shared decision-making processes, and ethical frameworks for addressing common dilemmas in palliative and end-of-life care.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-blue-600" />
              Fundamental Bioethical Principles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">The Four Principles</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <div className="font-medium text-xs">Autonomy</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Self-determination, informed consent</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                    <div className="font-medium text-xs">Beneficence</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Promoting good, patient benefit</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2">
                    <div className="font-medium text-xs">Non-maleficence</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">"Do no harm" principle</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                    <div className="font-medium text-xs">Justice</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Fairness, resource distribution</div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Additional Ethical Considerations</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Veracity:</strong> Truthfulness in communication</li>
                  <li>• <strong>Fidelity:</strong> Promise-keeping and loyalty</li>
                  <li>• <strong>Confidentiality:</strong> Privacy protection</li>
                  <li>• <strong>Dignity:</strong> Respect for human worth</li>
                  <li>• <strong>Proportionality:</strong> Benefits vs. burdens assessment</li>
                  <li>• <strong>Double Effect:</strong> Intended vs. unintended consequences</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Ethical Frameworks</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Principlism:</strong> Four principles approach</li>
                  <li>• <strong>Consequentialism:</strong> Outcome-based ethics</li>
                  <li>• <strong>Deontological:</strong> Duty-based moral reasoning</li>
                  <li>• <strong>Virtue Ethics:</strong> Character-based approach</li>
                  <li>• <strong>Narrative Ethics:</strong> Story-centered moral understanding</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-green-600" />
              Advance Care Planning and Directives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Types of Advance Directives</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Living Will:</strong> Treatment preferences documentation</li>
                  <li>• <strong>Healthcare Power of Attorney:</strong> Surrogate decision-maker designation</li>
                  <li>• <strong>DNR/DNI Orders:</strong> Resuscitation preferences</li>
                  <li>• <strong>POLST/MOLST:</strong> Portable medical orders</li>
                  <li>• <strong>Psychiatric Directives:</strong> Mental health treatment preferences</li>
                  <li>• <strong>Values Statements:</strong> Personal beliefs and priorities</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Advance Care Planning Process</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Values Exploration:</strong> What matters most assessment</li>
                  <li>• <strong>Goals Clarification:</strong> Treatment objectives discussion</li>
                  <li>• <strong>Scenario Planning:</strong> Future state considerations</li>
                  <li>• <strong>Surrogate Selection:</strong> Decision-maker identification</li>
                  <li>• <strong>Documentation:</strong> Legal directive completion</li>
                  <li>• <strong>Communication:</strong> Family and provider notification</li>
                </ul>
              </div>

              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Implementation Challenges</h4>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Accessibility:</strong> Document availability during crises</li>
                  <li>• <strong>Interpretation:</strong> Ambiguous directive language</li>
                  <li>• <strong>Surrogate Disagreement:</strong> Family conflicts resolution</li>
                  <li>• <strong>Changed Preferences:</strong> Evolving patient wishes</li>
                  <li>• <strong>Cultural Barriers:</strong> Family-centered vs. individual autonomy</li>
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
            Shared Decision-Making and Communication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Shared decision-making represents a collaborative process between patients, families, and healthcare teams, integrating medical evidence with patient values and preferences to achieve optimal care decisions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Information Sharing
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Prognostic Disclosure:</strong> Honest, compassionate communication</li>
                <li>• <strong>Treatment Options:</strong> Benefits and risks explanation</li>
                <li>• <strong>Uncertainty Acknowledgment:</strong> Limitations of predictions</li>
                <li>• <strong>Hope and Realism:</strong> Balanced perspective maintenance</li>
                <li>• <strong>Cultural Sensitivity:</strong> Communication preferences respect</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Values Elicitation
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Quality vs. Quantity:</strong> Life priorities assessment</li>
                <li>• <strong>Functional Goals:</strong> Meaningful activity preservation</li>
                <li>• <strong>Burden Tolerance:</strong> Acceptable treatment intensity</li>
                <li>• <strong>Family Considerations:</strong> Relational values importance</li>
                <li>• <strong>Spiritual Beliefs:</strong> Religious and existential factors</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Decision Support
              </h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Decision Aids:</strong> Visual and numerical tools</li>
                <li>• <strong>Scenario Exploration:</strong> "What if" discussions</li>
                <li>• <strong>Time Allowance:</strong> Processing period provision</li>
                <li>• <strong>Second Opinions:</strong> Additional expertise access</li>
                <li>• <strong>Reversible Decisions:</strong> Trial period considerations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Ethical Consultation:</strong> Complex ethical dilemmas may require formal ethics consultation services. Healthcare institutions should have clear processes for accessing ethics committee support when conflicts arise or guidance is needed for challenging decisions.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-600" />
            Common Ethical Dilemmas in Palliative Care
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Treatment Decision Conflicts</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Target className="h-4 w-4 text-red-500" />
                    Futility Determinations
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Medical Futility:</strong> Physiologically ineffective treatments</li>
                    <li>• <strong>Qualitative Futility:</strong> Outcomes inconsistent with goals</li>
                    <li>• <strong>Process Guidelines:</strong> Institutional futility policies</li>
                    <li>• <strong>Communication Strategies:</strong> Family engagement approaches</li>
                    <li>• <strong>Legal Considerations:</strong> Jurisdictional requirements</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Withholding vs. Withdrawing
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Ethical Equivalence:</strong> No moral distinction principle</li>
                    <li>• <strong>Psychological Barriers:</strong> Emotional differences recognition</li>
                    <li>• <strong>Time-Limited Trials:</strong> Reversible decision approach</li>
                    <li>• <strong>Family Dynamics:</strong> Guilt and regret mitigation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Special Populations and Contexts</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Pediatric Ethics</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Assent vs. Consent:</strong> Age-appropriate involvement</li>
                    <li>• <strong>Family-Centered Care:</strong> Parent-child-provider triangle</li>
                    <li>• <strong>Best Interest Standard:</strong> Proxy decision-making</li>
                    <li>• <strong>Emancipated Minors:</strong> Independent decision capacity</li>
                    <li>• <strong>Developmental Considerations:</strong> Cognitive and emotional factors</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Resource Allocation</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>ICU Bed Allocation:</strong> Triage decision criteria</li>
                    <li>• <strong>Cost-Effectiveness:</strong> Healthcare resource stewardship</li>
                    <li>• <strong>Geographic Disparities:</strong> Access equity concerns</li>
                    <li>• <strong>Insurance Coverage:</strong> Financial barrier navigation</li>
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
            <Brain className="h-5 w-5 text-teal-600" />
            Legal and Regulatory Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Legal Framework</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Informed Consent:</strong> Legal requirements documentation</li>
                <li>• <strong>Advance Directive Laws:</strong> State-specific regulations</li>
                <li>• <strong>Surrogate Decision Laws:</strong> Hierarchy and authority</li>
                <li>• <strong>Professional Liability:</strong> Malpractice considerations</li>
                <li>• <strong>Mandatory Reporting:</strong> Child/elder abuse obligations</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Regulatory Compliance</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Joint Commission:</strong> Patient rights standards</li>
                <li>• <strong>CMS Conditions:</strong> Participation requirements</li>
                <li>• <strong>HIPAA Privacy:</strong> Protected health information</li>
                <li>• <strong>ADA Accommodations:</strong> Disability considerations</li>
                <li>• <strong>Quality Measures:</strong> Outcome reporting requirements</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Professional Standards</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Medical Society Guidelines:</strong> Best practice recommendations</li>
                <li>• <strong>Licensure Requirements:</strong> Professional competency standards</li>
                <li>• <strong>Continuing Education:</strong> Ethics training mandates</li>
                <li>• <strong>Peer Review:</strong> Quality assurance processes</li>
                <li>• <strong>Research Ethics:</strong> Human subjects protection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Ethical Excellence in Practice</h4>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          Ethical palliative care requires ongoing commitment to moral reasoning, cultural sensitivity, 
          and patient-centered decision-making. Regular ethics education, consultation availability, 
          and reflective practice support healthcare providers in navigating complex moral challenges 
          while maintaining therapeutic relationships and professional integrity.
        </p>
      </div>
    </div>
  );
}