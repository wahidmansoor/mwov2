import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, FileText, Heart } from "lucide-react";

export default function CommunicationDecisionMakingIntroduction() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chapter 3: Communication and Decision-Making
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Effective Communication in Palliative Care
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">SPIKES Protocol</Badge>
          <Badge variant="secondary">Shared Decision-Making</Badge>
          <Badge variant="secondary">Cultural Competence</Badge>
        </div>
      </div>

      <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Communication Fundamentals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Effective communication is central to palliative care, facilitating 
            understanding, trust, and shared decision-making between healthcare providers, 
            patients, and families. This chapter covers essential communication skills 
            and frameworks for difficult conversations.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Communication Frameworks
              </h3>
              <div className="grid gap-3">
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    SPIKES Protocol
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 ml-5 space-y-1">
                    <li>• <strong>S</strong>etting preparation</li>
                    <li>• <strong>P</strong>erception assessment</li>
                    <li>• <strong>I</strong>nvitation to share information</li>
                    <li>• <strong>K</strong>nowledge sharing</li>
                    <li>• <strong>E</strong>motions addressing</li>
                    <li>• <strong>S</strong>trategy and summary</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Goals of Care Conversations
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 ml-5 space-y-1">
                    <li>• Understanding patient values</li>
                    <li>• Clarifying treatment goals</li>
                    <li>• Discussing prognosis</li>
                    <li>• Planning future care</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Key Components
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Active Listening:</strong> Giving full attention to patient concerns</li>
                <li>• <strong>Empathetic Responses:</strong> Acknowledging emotions and experiences</li>
                <li>• <strong>Clear Information:</strong> Using understandable language</li>
                <li>• <strong>Shared Decision-Making:</strong> Collaborative treatment planning</li>
                <li>• <strong>Cultural Sensitivity:</strong> Respecting diverse backgrounds</li>
                <li>• <strong>Family Dynamics:</strong> Understanding relationships and roles</li>
                <li>• <strong>Advance Care Planning:</strong> Future care preferences</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Communication Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Essential Techniques</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Open-ended questions</li>
                <li>• Reflective listening</li>
                <li>• Emotion recognition</li>
                <li>• Nonverbal awareness</li>
                <li>• Silence utilization</li>
                <li>• Summarization skills</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Challenging Situations</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Delivering bad news</li>
                <li>• Discussing prognosis</li>
                <li>• Managing unrealistic expectations</li>
                <li>• Addressing family conflicts</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              Cultural Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Cultural Factors</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Religious beliefs and practices</li>
                <li>• Family decision-making patterns</li>
                <li>• Language and interpretation needs</li>
                <li>• Death and dying perspectives</li>
                <li>• Pain expression variations</li>
                <li>• Treatment preferences</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Spiritual Dimensions</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• FICA spiritual assessment</li>
                <li>• HOPE framework</li>
                <li>• Chaplain collaboration</li>
                <li>• Meaning-making support</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}