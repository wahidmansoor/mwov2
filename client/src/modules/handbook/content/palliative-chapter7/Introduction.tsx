import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, FileText, AlertTriangle, Shield } from "lucide-react";

export default function EthicalLegalIssuesIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 7: Ethical and Legal Issues
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Navigating Complex Ethical and Legal Decisions
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">Ethics</Badge>
          <Badge variant="secondary">Legal Framework</Badge>
          <Badge variant="secondary">Decision-Making</Badge>
        </div>
      </div>

      <Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            Ethical and Legal Framework
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Palliative care involves complex ethical and legal considerations that require 
            careful navigation of patient autonomy, beneficence, non-maleficence, and 
            justice. This chapter addresses key ethical principles and legal frameworks 
            that guide end-of-life decision-making.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Ethical Principles
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Autonomy
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Respecting patient's right to make informed decisions about their care
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Beneficence
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Acting in the patient's best interest to promote well-being
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    Non-maleficence
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    "Do no harm" - avoiding treatments that cause more suffering
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    Justice
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Fair distribution of benefits and burdens in healthcare
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Legal Considerations
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Informed Consent:</strong> Adequate disclosure and understanding</li>
                <li>• <strong>Capacity Assessment:</strong> Decision-making ability evaluation</li>
                <li>• <strong>Advance Directives:</strong> Living wills and healthcare proxies</li>
                <li>• <strong>POLST/MOLST:</strong> Physician orders for life-sustaining treatment</li>
                <li>• <strong>Surrogate Decision-Making:</strong> Substitute judgment standards</li>
                <li>• <strong>Confidentiality:</strong> Patient privacy protection</li>
                <li>• <strong>Documentation:</strong> Legal record requirements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              Complex Decisions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Life-Sustaining Treatment</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Mechanical ventilation decisions</li>
                <li>• Artificial nutrition and hydration</li>
                <li>• Dialysis continuation or withdrawal</li>
                <li>• Cardiopulmonary resuscitation preferences</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">End-of-Life Decisions</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Palliative sedation considerations</li>
                <li>• Medical aid in dying (where legal)</li>
                <li>• Withholding vs. withdrawing treatment</li>
                <li>• Futility determinations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Resource Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Healthcare Justice</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Equitable access to palliative care</li>
                <li>• Cultural and socioeconomic considerations</li>
                <li>• Geographic disparities in care</li>
                <li>• Insurance and payment issues</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Ethical Consultation</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• When to involve ethics committees</li>
                <li>• Conflict resolution processes</li>
                <li>• Mediation and facilitation</li>
                <li>• Policy development and review</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}