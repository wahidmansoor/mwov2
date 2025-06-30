import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap } from "lucide-react";

export default function TestEnhancedComponent() {
  const [testScore, setTestScore] = useState([5]);
  
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Activity className="h-5 w-5" />
            🚀 ENHANCED INTERACTIVE COMPONENT LOADED SUCCESSFULLY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Interactive Test Slider</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  Score: {testScore[0]}/10
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0 - None</span>
                  <span className="font-medium text-lg text-blue-600">{testScore[0]}/10</span>
                  <span>10 - Maximum</span>
                </div>
                <Slider
                  value={testScore}
                  onValueChange={setTestScore}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  ✓ Enhanced components are working with interactive sliders
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  Current value: {testScore[0]} - Move the slider to test interactivity
                </p>
              </div>
              
              <Button className="w-full mt-4" onClick={() => alert(`Slider value: ${testScore[0]}`)}>
                Test Interactive Function
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}