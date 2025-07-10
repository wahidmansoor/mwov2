import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Eye, 
  Moon, 
  Sun, 
  Monitor,
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2
} from 'lucide-react';

interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    drugInteractions: boolean;
    criticalValues: boolean;
    protocolUpdates: boolean;
    systemMaintenance: boolean;
  };
  clinical: {
    autoSaveInterval: number;
    defaultUnits: 'metric' | 'imperial';
    confidenceThreshold: number;
    showDebugInfo: boolean;
  };
  interface: {
    compactMode: boolean;
    showTooltips: boolean;
    autoExpandCards: boolean;
    sidebarCollapsed: boolean;
  };
  privacy: {
    analyticsOptIn: boolean;
    usageTracking: boolean;
    crashReporting: boolean;
  };
}

const SettingsModule = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'system',
    notifications: {
      drugInteractions: true,
      criticalValues: true,
      protocolUpdates: true,
      systemMaintenance: false,
    },
    clinical: {
      autoSaveInterval: 30,
      defaultUnits: 'metric',
      confidenceThreshold: 0.8,
      showDebugInfo: false,
    },
    interface: {
      compactMode: false,
      showTooltips: true,
      autoExpandCards: false,
      sidebarCollapsed: false,
    },
    privacy: {
      analyticsOptIn: true,
      usageTracking: true,
      crashReporting: true,
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('oncovistaSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  const updateSettings = (path: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current: any = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newSettings;
    });
    setHasChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('oncovistaSettings', JSON.stringify(settings));
    setHasChanges(false);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully.",
    });
  };

  const resetSettings = () => {
    setSettings({
      theme: 'system',
      notifications: {
        drugInteractions: true,
        criticalValues: true,
        protocolUpdates: true,
        systemMaintenance: false,
      },
      clinical: {
        autoSaveInterval: 30,
        defaultUnits: 'metric',
        confidenceThreshold: 0.8,
        showDebugInfo: false,
      },
      interface: {
        compactMode: false,
        showTooltips: true,
        autoExpandCards: false,
        sidebarCollapsed: false,
      },
      privacy: {
        analyticsOptIn: true,
        usageTracking: true,
        crashReporting: true,
      },
    });
    setHasChanges(true);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'oncovista-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          setHasChanges(true);
          toast({
            title: "Settings Imported",
            description: "Settings have been imported successfully.",
          });
        } catch (error) {
          toast({
            title: "Import Failed",
            description: "Invalid settings file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Settings className="h-8 w-8 text-blue-600" />
            OncoVista Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Configure your clinical decision support platform preferences
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              Unsaved Changes
            </Badge>
          )}
          <Button onClick={saveSettings} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="interface">Interface</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure your basic platform preferences and display options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme Preference</Label>
                <Select value={settings.theme} onValueChange={(value: any) => updateSettings('theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-gray-500">Reduce spacing for more content</p>
                  </div>
                  <Switch
                    checked={settings.interface.compactMode}
                    onCheckedChange={(checked) => updateSettings('interface.compactMode', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Tooltips</Label>
                    <p className="text-sm text-gray-500">Display helpful tooltips</p>
                  </div>
                  <Switch
                    checked={settings.interface.showTooltips}
                    onCheckedChange={(checked) => updateSettings('interface.showTooltips', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Clinical Settings
              </CardTitle>
              <CardDescription>
                Configure clinical decision support and calculation preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Auto-save Interval (seconds)</Label>
                  <Select 
                    value={settings.clinical.autoSaveInterval.toString()} 
                    onValueChange={(value) => updateSettings('clinical.autoSaveInterval', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Units</Label>
                  <Select 
                    value={settings.clinical.defaultUnits} 
                    onValueChange={(value: any) => updateSettings('clinical.defaultUnits', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, cm, L)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs, ft, gal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>AI Confidence Threshold</Label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0.5"
                    max="1"
                    step="0.05"
                    value={settings.clinical.confidenceThreshold}
                    onChange={(e) => updateSettings('clinical.confidenceThreshold', parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">
                    {Math.round(settings.clinical.confidenceThreshold * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Minimum confidence level for AI recommendations
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Debug Information</Label>
                  <p className="text-sm text-gray-500">Display technical details for troubleshooting</p>
                </div>
                <Switch
                  checked={settings.clinical.showDebugInfo}
                  onCheckedChange={(checked) => updateSettings('clinical.showDebugInfo', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure which clinical alerts and notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Drug Interaction Alerts</Label>
                  <p className="text-sm text-gray-500">Critical drug interaction warnings</p>
                </div>
                <Switch
                  checked={settings.notifications.drugInteractions}
                  onCheckedChange={(checked) => updateSettings('notifications.drugInteractions', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Critical Lab Values</Label>
                  <p className="text-sm text-gray-500">Alerts for laboratory values requiring immediate attention</p>
                </div>
                <Switch
                  checked={settings.notifications.criticalValues}
                  onCheckedChange={(checked) => updateSettings('notifications.criticalValues', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Protocol Updates</Label>
                  <p className="text-sm text-gray-500">Notifications when NCCN/ASCO guidelines are updated</p>
                </div>
                <Switch
                  checked={settings.notifications.protocolUpdates}
                  onCheckedChange={(checked) => updateSettings('notifications.protocolUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>System Maintenance</Label>
                  <p className="text-sm text-gray-500">Platform maintenance and downtime notifications</p>
                </div>
                <Switch
                  checked={settings.notifications.systemMaintenance}
                  onCheckedChange={(checked) => updateSettings('notifications.systemMaintenance', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interface">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Interface Settings
              </CardTitle>
              <CardDescription>
                Customize the user interface to match your workflow preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-expand Cards</Label>
                  <p className="text-sm text-gray-500">Automatically expand protocol cards on page load</p>
                </div>
                <Switch
                  checked={settings.interface.autoExpandCards}
                  onCheckedChange={(checked) => updateSettings('interface.autoExpandCards', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Sidebar Collapsed by Default</Label>
                  <p className="text-sm text-gray-500">Start with sidebar in collapsed state</p>
                </div>
                <Switch
                  checked={settings.interface.sidebarCollapsed}
                  onCheckedChange={(checked) => updateSettings('interface.sidebarCollapsed', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Data Settings
              </CardTitle>
              <CardDescription>
                Control how your usage data is collected and used (no patient data is ever stored)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Analytics Opt-in</Label>
                  <p className="text-sm text-gray-500">Help improve OncoVista with anonymous usage analytics</p>
                </div>
                <Switch
                  checked={settings.privacy.analyticsOptIn}
                  onCheckedChange={(checked) => updateSettings('privacy.analyticsOptIn', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Usage Tracking</Label>
                  <p className="text-sm text-gray-500">Track feature usage to improve platform design</p>
                </div>
                <Switch
                  checked={settings.privacy.usageTracking}
                  onCheckedChange={(checked) => updateSettings('privacy.usageTracking', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Crash Reporting</Label>
                  <p className="text-sm text-gray-500">Automatically report errors to help fix issues</p>
                </div>
                <Switch
                  checked={settings.privacy.crashReporting}
                  onCheckedChange={(checked) => updateSettings('privacy.crashReporting', checked)}
                />
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Privacy Notice</h4>
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                  OncoVista is designed as a clinical decision support tool only. No patient-identifiable information is collected, stored, or transmitted. All data processed is for educational and guidance purposes only.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System & Data Management</CardTitle>
              <CardDescription>
                Backup, restore, and manage your OncoVista settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={exportSettings} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Settings
                </Button>
                
                <div className="relative">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Import Settings
                  </Button>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSettings}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                
                <Button onClick={resetSettings} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset to Defaults
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Platform Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>Version</Label>
                    <p className="text-gray-600 dark:text-gray-300">OncoVista AI v2.1.0</p>
                  </div>
                  <div>
                    <Label>Last Updated</Label>
                    <p className="text-gray-600 dark:text-gray-300">January 10, 2025</p>
                  </div>
                  <div>
                    <Label>Guidelines Database</Label>
                    <p className="text-gray-600 dark:text-gray-300">NCCN 2025, ASCO 2024, ESMO 2024</p>
                  </div>
                  <div>
                    <Label>Protocols</Label>
                    <p className="text-gray-600 dark:text-gray-300">142 Active Protocols</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModule;