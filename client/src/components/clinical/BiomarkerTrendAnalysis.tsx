import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Calendar,
  Target
} from "lucide-react";

interface BiomarkerData {
  date: string;
  value: number;
  normalRange: { min: number; max: number };
  status: 'normal' | 'elevated' | 'critical';
  treatment?: string;
}

interface BiomarkerTrend {
  biomarker: string;
  cancerType: string;
  currentValue: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  trendPercentage: number;
  clinicalSignificance: string;
  recommendation: string;
  nccnReference: string;
  data: BiomarkerData[];
}

const mockBiomarkerTrends: BiomarkerTrend[] = [
  {
    biomarker: 'Alkaline Phosphatase',
    cancerType: 'Osteosarcoma',
    currentValue: 485,
    trend: 'increasing',
    trendPercentage: 23,
    clinicalSignificance: 'May indicate disease progression or inadequate treatment response',
    recommendation: 'Consider restaging imaging and review current chemotherapy regimen',
    nccnReference: 'OSTEO-2',
    data: [
      { date: '2025-06-15', value: 320, normalRange: { min: 44, max: 147 }, status: 'elevated', treatment: 'MAP Cycle 1' },
      { date: '2025-06-22', value: 380, normalRange: { min: 44, max: 147 }, status: 'elevated', treatment: 'MAP Cycle 2' },
      { date: '2025-06-29', value: 485, normalRange: { min: 44, max: 147 }, status: 'critical', treatment: 'MAP Cycle 3' }
    ]
  },
  {
    biomarker: 'LDH',
    cancerType: 'Osteosarcoma',
    currentValue: 420,
    trend: 'decreasing',
    trendPercentage: -15,
    clinicalSignificance: 'Favorable response to treatment, good prognostic indicator',
    recommendation: 'Continue current MAP regimen, monitor for further improvement',
    nccnReference: 'OSTEO-1',
    data: [
      { date: '2025-06-15', value: 580, normalRange: { min: 140, max: 280 }, status: 'critical', treatment: 'MAP Cycle 1' },
      { date: '2025-06-22', value: 490, normalRange: { min: 140, max: 280 }, status: 'elevated', treatment: 'MAP Cycle 2' },
      { date: '2025-06-29', value: 420, normalRange: { min: 140, max: 280 }, status: 'elevated', treatment: 'MAP Cycle 3' }
    ]
  }
];

const BiomarkerTrendAnalysis = () => {
  const [selectedBiomarker, setSelectedBiomarker] = useState<string>('Alkaline Phosphatase');
  const [timeRange, setTimeRange] = useState<string>('30d');

  const currentTrend = mockBiomarkerTrends.find(trend => trend.biomarker === selectedBiomarker);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-600" />;
      default: return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-red-600';
      case 'decreasing': return 'text-green-600';
      default: return 'text-blue-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'elevated': return '#f97316';
      default: return '#22c55e';
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Intelligent Biomarker Trend Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Biomarker</label>
              <Select value={selectedBiomarker} onValueChange={setSelectedBiomarker}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alkaline Phosphatase">Alkaline Phosphatase</SelectItem>
                  <SelectItem value="LDH">LDH (Lactate Dehydrogenase)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {currentTrend && (
            <>
              {/* Current Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Current Value</p>
                        <p className="text-2xl font-bold">{currentTrend.currentValue}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={currentTrend.data[currentTrend.data.length - 1].status === 'critical' ? 'destructive' : 'secondary'}>
                          {currentTrend.data[currentTrend.data.length - 1].status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Trend</p>
                        <p className={`text-2xl font-bold ${getTrendColor(currentTrend.trend)}`}>
                          {Math.abs(currentTrend.trendPercentage)}%
                        </p>
                      </div>
                      <div className="text-right">
                        {getTrendIcon(currentTrend.trend)}
                        <p className="text-xs text-muted-foreground mt-1">
                          {currentTrend.trend}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Normal Range</p>
                        <p className="text-sm text-muted-foreground">
                          {currentTrend.data[0].normalRange.min} - {currentTrend.data[0].normalRange.max}
                        </p>
                      </div>
                      <div className="text-right">
                        <Target className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Biomarker Trend Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentTrend.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value: any, name: string) => [value, 'Value']}
                        />
                        <ReferenceLine 
                          y={currentTrend.data[0].normalRange.max} 
                          stroke="#ef4444" 
                          strokeDasharray="5 5"
                          label="Upper Normal Limit"
                        />
                        <ReferenceLine 
                          y={currentTrend.data[0].normalRange.min} 
                          stroke="#22c55e" 
                          strokeDasharray="5 5"
                          label="Lower Normal Limit"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#2563eb" 
                          strokeWidth={3}
                          dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Clinical Interpretation */}
              <Alert className={currentTrend.trend === 'increasing' ? 'border-orange-500' : 'border-green-500'}>
                <div className="flex items-start gap-3">
                  {currentTrend.trend === 'increasing' ? 
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" /> :
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  }
                  <div className="flex-1">
                    <h4 className="font-medium">Clinical Interpretation</h4>
                    <AlertDescription className="mt-1">
                      <strong>Significance:</strong> {currentTrend.clinicalSignificance}
                    </AlertDescription>
                    <AlertDescription className="mt-2">
                      <strong>Recommendation:</strong> {currentTrend.recommendation}
                    </AlertDescription>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline">
                        NCCN {currentTrend.nccnReference}
                      </Badge>
                      <Badge variant="outline">
                        {currentTrend.cancerType}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Alert>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="default">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Follow-up
                </Button>
                <Button variant="outline">
                  Order Additional Tests
                </Button>
                <Button variant="outline">
                  Generate Alert
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BiomarkerTrendAnalysis;