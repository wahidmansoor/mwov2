import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, Heart, Users, Star } from "lucide-react";

export default function PediatricPalliativeCareIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 6: Pediatric Palliative Care
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Specialized Care for Children and Families
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">Pediatric Focus</Badge>
          <Badge variant="secondary">Family-Centered</Badge>
          <Badge variant="secondary">Developmental Care</Badge>
        </div>
      </div>

      <Card className="border-pink-200 bg-pink-50 dark:border-pink-800 dark:bg-pink-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            Pediatric Palliative Care Principles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Pediatric palliative care addresses the unique physical, emotional, social, 
            and spiritual needs of children with life-limiting conditions and their 
            families. This specialized approach considers developmental stages, family 
            dynamics, and the profound impact of childhood illness.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Core Principles
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2">Family-Centered Care</div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Recognize family as constant in child's life</li>
                    <li>• Respect family culture and values</li>
                    <li>• Support family decision-making</li>
                    <li>• Provide comprehensive family support</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2">Developmental Approach</div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Age-appropriate communication</li>
                    <li>• Developmental understanding of illness</li>
                    <li>• Support normal development</li>
                    <li>• Maintain childhood experiences</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Special Considerations
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Communication:</strong> Age-appropriate explanations and honesty</li>
                <li>• <strong>Pain Assessment:</strong> Developmentally appropriate tools</li>
                <li>• <strong>Medication Dosing:</strong> Weight-based and age-adjusted</li>
                <li>• <strong>School Integration:</strong> Educational continuity</li>
                <li>• <strong>Sibling Support:</strong> Care for entire family unit</li>
                <li>• <strong>Legacy Creation:</strong> Memory-making activities</li>
                <li>• <strong>Transition Planning:</strong> Adult care transition when appropriate</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Communication Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Age-Appropriate Communication</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• <strong>Preschool (2-5 years):</strong> Simple, concrete language</li>
                <li>• <strong>School age (6-11 years):</strong> Logical explanations</li>
                <li>• <strong>Adolescent (12+ years):</strong> Abstract thinking inclusion</li>
                <li>• <strong>All ages:</strong> Honest, age-appropriate information</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Family Communication</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Include parents in all discussions</li>
                <li>• Respect family communication preferences</li>
                <li>• Support sibling understanding</li>
                <li>• Address extended family needs</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
              Common Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Life-Limiting Conditions</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Cancer and hematologic malignancies</li>
                <li>• Congenital heart disease</li>
                <li>• Genetic and metabolic disorders</li>
                <li>• Neurologic conditions</li>
                <li>• Congenital anomalies</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Care Settings</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Children's hospitals</li>
                <li>• Home-based care</li>
                <li>• Pediatric hospice</li>
                <li>• Outpatient clinics</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}