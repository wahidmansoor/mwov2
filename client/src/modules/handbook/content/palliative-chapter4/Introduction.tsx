import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Shield, Users } from "lucide-react";

export default function EndOfLifeCareIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 4: End-of-Life Care
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Compassionate Care in the Final Days
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">End-of-Life</Badge>
          <Badge variant="secondary">Comfort Care</Badge>
          <Badge variant="secondary">Family Support</Badge>
        </div>
      </div>

      <Card className="border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            End-of-Life Care Principles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            End-of-life care focuses on providing comfort, dignity, and support for 
            patients and families during the final phase of life. This chapter addresses 
            the clinical, ethical, and emotional aspects of caring for dying patients.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recognizing the Dying Process
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2">Physical Signs</div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Decreased oral intake and appetite</li>
                    <li>• Changes in breathing patterns</li>
                    <li>• Altered level of consciousness</li>
                    <li>• Changes in circulation and color</li>
                    <li>• Decreased urine output</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2">Functional Changes</div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Increased sleeping and withdrawal</li>
                    <li>• Difficulty with mobility</li>
                    <li>• Changes in communication</li>
                    <li>• Altered emotional responses</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Comfort Measures
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Symptom Control:</strong> Pain, dyspnea, nausea management</li>
                <li>• <strong>Positioning:</strong> Comfortable positioning and turning</li>
                <li>• <strong>Mouth Care:</strong> Oral hygiene and moistening</li>
                <li>• <strong>Skin Care:</strong> Pressure relief and cleanliness</li>
                <li>• <strong>Environmental:</strong> Quiet, peaceful surroundings</li>
                <li>• <strong>Spiritual Care:</strong> Religious and spiritual support</li>
                <li>• <strong>Presence:</strong> Family and loved ones at bedside</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Final Days Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Care Setting Options</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Hospital-based palliative care</li>
                <li>• Hospice facilities</li>
                <li>• Home-based end-of-life care</li>
                <li>• Long-term care facilities</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Medical Interventions</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Discontinuation of non-comfort measures</li>
                <li>• Palliative sedation considerations</li>
                <li>• Withdrawal of life-sustaining treatment</li>
                <li>• Artificial nutrition and hydration decisions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              Family Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Family Preparation</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Education about the dying process</li>
                <li>• Emotional support and counseling</li>
                <li>• Practical care instruction</li>
                <li>• Anticipatory grief support</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Bereavement Care</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Immediate post-death support</li>
                <li>• Grief counseling services</li>
                <li>• Memorial and ritual support</li>
                <li>• Long-term bereavement follow-up</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}