import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Bell,
  X,
  ExternalLink
} from "lucide-react";

interface ClinicalAlert {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: 'protocol_deviation' | 'drug_interaction' | 'biomarker_alert' | 'referral_urgent' | 'quality_metric';
  title: string;
  description: string;
  module: string;
  patientContext?: string;
  actionRequired: boolean;
  timestamp: string;
  nccnReference?: string;
  dismissed?: boolean;
}

const mockAlerts: ClinicalAlert[] = [
  {
    id: '1',
    priority: 'critical',
    type: 'protocol_deviation',
    title: 'NCCN Protocol Deviation Detected',
    description: 'Osteosarcoma patient age <40 not referred to orthopedic oncologist within 24 hours per BONE-1 guidelines',
    module: 'OPD',
    patientContext: 'Demographics: 19 y/o male, symptomatic bone lesion',
    actionRequired: true,
    timestamp: '2025-06-29T00:15:00Z',
    nccnReference: 'BONE-1'
  },
  {
    id: '2',
    priority: 'high',
    type: 'biomarker_alert',
    title: 'Critical Biomarker Results',
    description: 'Alkaline phosphatase >500 U/L in osteosarcoma patient - consider disease progression',
    module: 'CDU',
    patientContext: 'Current treatment: MAP chemotherapy cycle 3',
    actionRequired: true,
    timestamp: '2025-06-29T00:10:00Z',
    nccnReference: 'OSTEO-2'
  },
  {
    id: '3',
    priority: 'high',
    type: 'referral_urgent',
    title: 'Urgent Genetic Counseling Required',
    description: 'Ampullary adenocarcinoma patient with positive family history - NCCN Category 1 recommendation for genetic testing',
    module: 'Clinical Tools',
    patientContext: 'Family Hx: Multiple cancers, BRCA testing pending',
    actionRequired: true,
    timestamp: '2025-06-29T00:05:00Z',
    nccnReference: 'AMP-1'
  },
  {
    id: '4',
    priority: 'medium',
    type: 'quality_metric',
    title: 'Fertility Consultation Overdue',
    description: 'Young adult osteosarcoma patient - fertility consultation should be considered per updated NCCN guidelines',
    module: 'CDU',
    patientContext: 'Age: 22, starting MAP chemotherapy',
    actionRequired: false,
    timestamp: '2025-06-29T00:00:00Z',
    nccnReference: 'OSTEO-1'
  }
];

const ClinicalAlertSystem = () => {
  const [alerts, setAlerts] = useState<ClinicalAlert[]>(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'actionRequired'>('all');

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-900 dark:bg-red-900/20 dark:text-red-300';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-900 dark:bg-orange-900/20 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-300';
      default: return 'bg-blue-100 border-blue-500 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'protocol_deviation': return <AlertTriangle className="h-4 w-4" />;
      case 'biomarker_alert': return <Bell className="h-4 w-4" />;
      case 'referral_urgent': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (alert.dismissed) return false;
    if (filter === 'all') return true;
    if (filter === 'actionRequired') return alert.actionRequired;
    return alert.priority === filter;
  });

  const criticalCount = alerts.filter(a => !a.dismissed && a.priority === 'critical').length;
  const highCount = alerts.filter(a => !a.dismissed && a.priority === 'high').length;
  const actionRequiredCount = alerts.filter(a => !a.dismissed && a.actionRequired).length;

  return (
    <Card className="border-l-4 border-l-red-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Real-Time Clinical Alert System
          </div>
          <div className="flex gap-2">
            {criticalCount > 0 && (
              <Badge variant="destructive">{criticalCount} Critical</Badge>
            )}
            {highCount > 0 && (
              <Badge variant="outline" className="border-orange-500 text-orange-600">
                {highCount} High Priority
              </Badge>
            )}
            {actionRequiredCount > 0 && (
              <Badge variant="secondary">{actionRequiredCount} Action Required</Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All Alerts ({alerts.filter(a => !a.dismissed).length})
            </Button>
            <Button 
              variant={filter === 'critical' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('critical')}
            >
              Critical ({criticalCount})
            </Button>
            <Button 
              variant={filter === 'high' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('high')}
            >
              High Priority ({highCount})
            </Button>
            <Button 
              variant={filter === 'actionRequired' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('actionRequired')}
            >
              Action Required ({actionRequiredCount})
            </Button>
          </div>

          {/* Alert List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <p>No alerts matching current filter</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <Alert key={alert.id} className={`${getPriorityColor(alert.priority)} relative`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <AlertDescription className="mt-1 text-xs">
                            {alert.description}
                          </AlertDescription>
                          {alert.patientContext && (
                            <div className="mt-2 p-2 bg-white/50 dark:bg-black/20 rounded text-xs">
                              <strong>Context:</strong> {alert.patientContext}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {alert.module}
                            </Badge>
                            {alert.nccnReference && (
                              <Badge variant="outline" className="text-xs">
                                NCCN {alert.nccnReference}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          {alert.actionRequired && (
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="default">
                                Take Action
                              </Button>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View Guidelines
                              </Button>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                          className="flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalAlertSystem;