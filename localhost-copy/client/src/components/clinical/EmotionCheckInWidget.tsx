import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Smile, 
  Frown, 
  Meh, 
  Angry, 
  Zap,
  Calendar,
  MessageCircle,
  Phone,
  Users,
  BookOpen,
  Activity
} from "lucide-react";

interface EmotionEntry {
  id: string;
  emotion: string;
  intensity: number;
  notes?: string;
  timestamp: string;
  category: 'patient' | 'provider';
  triggers?: string[];
  copingStrategies?: string[];
}

interface SupportResource {
  type: 'crisis' | 'counseling' | 'peer' | 'educational';
  title: string;
  description: string;
  contact?: string;
  availability: string;
  icon: any;
}

const emotions = [
  { name: 'Happy', icon: Smile, color: 'bg-green-100 text-green-800 border-green-300', value: 'happy' },
  { name: 'Neutral', icon: Meh, color: 'bg-blue-100 text-blue-800 border-blue-300', value: 'neutral' },
  { name: 'Sad', icon: Frown, color: 'bg-yellow-100 text-yellow-800 border-yellow-300', value: 'sad' },
  { name: 'Anxious', icon: Zap, color: 'bg-orange-100 text-orange-800 border-orange-300', value: 'anxious' },
  { name: 'Angry', icon: Angry, color: 'bg-red-100 text-red-800 border-red-300', value: 'angry' }
];

const supportResources: SupportResource[] = [
  {
    type: 'crisis',
    title: '24/7 Crisis Support',
    description: 'Immediate mental health crisis intervention',
    contact: '988 (Suicide & Crisis Lifeline)',
    availability: '24/7',
    icon: Phone
  },
  {
    type: 'counseling',
    title: 'Oncology Social Work',
    description: 'Professional counseling for cancer patients and families',
    contact: 'Hospital Social Services',
    availability: 'Mon-Fri 8AM-5PM',
    icon: MessageCircle
  },
  {
    type: 'peer',
    title: 'Cancer Support Groups',
    description: 'Connect with others facing similar challenges',
    contact: 'American Cancer Society',
    availability: 'Weekly meetings',
    icon: Users
  },
  {
    type: 'educational',
    title: 'Coping Resources',
    description: 'Educational materials and self-help tools',
    contact: 'Patient Education Center',
    availability: 'Always available',
    icon: BookOpen
  }
];

const EmotionCheckInWidget = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');
  const [userType, setUserType] = useState<'patient' | 'provider'>('patient');
  const [recentEntries, setRecentEntries] = useState<EmotionEntry[]>([
    {
      id: '1',
      emotion: 'anxious',
      intensity: 7,
      notes: 'Worried about upcoming scan results',
      timestamp: '2025-06-29T10:30:00Z',
      category: 'patient',
      triggers: ['medical uncertainty', 'scan anxiety'],
      copingStrategies: ['deep breathing', 'family support']
    },
    {
      id: '2',
      emotion: 'sad',
      intensity: 6,
      notes: 'Difficult conversation with family about prognosis',
      timestamp: '2025-06-29T08:15:00Z',
      category: 'provider',
      triggers: ['difficult conversation', 'emotional burden'],
      copingStrategies: ['peer support', 'debriefing']
    }
  ]);

  const submitCheckIn = () => {
    if (!selectedEmotion) return;

    const newEntry: EmotionEntry = {
      id: Date.now().toString(),
      emotion: selectedEmotion,
      intensity,
      notes: notes.trim(),
      timestamp: new Date().toISOString(),
      category: userType,
      triggers: [],
      copingStrategies: []
    };

    setRecentEntries(prev => [newEntry, ...prev.slice(0, 4)]);
    
    // Reset form
    setSelectedEmotion('');
    setIntensity(5);
    setNotes('');
  };

  const getEmotionConfig = (emotionValue: string) => {
    return emotions.find(e => e.value === emotionValue) || emotions[1];
  };

  const getIntensityColor = (level: number) => {
    if (level <= 3) return 'bg-green-500';
    if (level <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getResourcesByPriority = (emotion: string, intensityLevel: number) => {
    if (intensityLevel >= 8 || emotion === 'angry') {
      return supportResources.filter(r => r.type === 'crisis' || r.type === 'counseling');
    }
    if (intensityLevel >= 6) {
      return supportResources.filter(r => r.type === 'counseling' || r.type === 'peer');
    }
    return supportResources.filter(r => r.type === 'educational' || r.type === 'peer');
  };

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-purple-600" />
          Quick Emotion Check-In
          <Badge variant="outline" className="text-purple-600">
            Mental Wellness
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track your emotional well-being and access support resources
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* User Type Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">I am a:</label>
            <div className="flex gap-2">
              <Button
                variant={userType === 'patient' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserType('patient')}
              >
                Patient/Family
              </Button>
              <Button
                variant={userType === 'provider' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserType('provider')}
              >
                Healthcare Provider
              </Button>
            </div>
          </div>

          {/* Emotion Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block">How are you feeling right now?</label>
            <div className="grid grid-cols-5 gap-2">
              {emotions.map((emotion) => {
                const IconComponent = emotion.icon;
                const isSelected = selectedEmotion === emotion.value;
                return (
                  <Button
                    key={emotion.value}
                    variant="ghost"
                    onClick={() => setSelectedEmotion(emotion.value)}
                    className={`h-20 flex-col gap-2 ${
                      isSelected ? emotion.color : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-xs">{emotion.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Intensity Scale */}
          {selectedEmotion && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Intensity Level: {intensity}/10
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Intense</span>
                </div>
                <Progress 
                  value={intensity * 10} 
                  className={`h-2 ${getIntensityColor(intensity)}`}
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Additional notes (optional)
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's contributing to how you're feeling? Any specific triggers or thoughts?"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={submitCheckIn}
            disabled={!selectedEmotion}
            className="w-full"
          >
            <Activity className="h-4 w-4 mr-2" />
            Record Check-In
          </Button>

          {/* Support Resources */}
          {selectedEmotion && intensity >= 6 && (
            <Alert className="border-orange-500">
              <Heart className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-3">
                  <p className="font-medium">Support resources for you:</p>
                  <div className="grid gap-2">
                    {getResourcesByPriority(selectedEmotion, intensity).map((resource, index) => {
                      const IconComponent = resource.icon;
                      return (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded border">
                          <IconComponent className="h-5 w-5 mt-0.5 text-purple-600" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground">{resource.description}</p>
                            {resource.contact && (
                              <p className="text-xs font-medium text-purple-600 mt-1">
                                {resource.contact}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Available: {resource.availability}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Recent Check-ins */}
          {recentEntries.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Recent Check-ins
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentEntries.map((entry) => {
                  const emotionConfig = getEmotionConfig(entry.emotion);
                  const IconComponent = emotionConfig.icon;
                  return (
                    <div key={entry.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="font-medium capitalize">{entry.emotion}</span>
                          <Badge variant="outline" className="text-xs">
                            {entry.intensity}/10
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {entry.category}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-muted-foreground">{entry.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Talk to Counselor
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Join Support Group
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionCheckInWidget;