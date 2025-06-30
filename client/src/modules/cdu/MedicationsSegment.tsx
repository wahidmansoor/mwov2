import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Search, Filter, Pill, Heart, Target, Shield, Activity, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface OncologyMedication {
  id: string;
  name: string;
  brandNames: string[];
  classification: string;
  mechanism: string;
  administration: string;
  indications: string[];
  dosing: Record<string, any>;
  sideEffects: string[];
  monitoring: string[];
  interactions: string[];
  referencesSources: string[];
  summary: string;
  blackBoxWarning?: string;
  specialConsiderations: string[];
  pharmacokinetics: Record<string, any>;
  contraindications: string[];
  routineMonitoring: string[];
  pretreatmentTests: string[];
  isChemotherapy: boolean;
  isImmunotherapy: boolean;
  isTargetedTherapy: boolean;
  isOrphanDrug: boolean;
}

interface MedicationsSegmentProps {
  className?: string;
}

export const MedicationsSegment: React.FC<MedicationsSegmentProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMedication, setSelectedMedication] = useState<OncologyMedication | null>(null);

  const { data: medications = [], isLoading, error } = useQuery({
    queryKey: ['/api/cdu/medications', selectedClassification, selectedType, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedClassification) params.append('classification', selectedClassification);
      if (selectedType === 'chemotherapy') params.append('isChemotherapy', 'true');
      if (selectedType === 'immunotherapy') params.append('isImmunotherapy', 'true');
      if (selectedType === 'targeted') params.append('isTargetedTherapy', 'true');
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await fetch(`/api/cdu/medications?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch medications');
      return response.json();
    },
  });

  const getTypeIcon = (medication: OncologyMedication) => {
    if (medication.isChemotherapy) return <Zap className="h-4 w-4 text-orange-500" />;
    if (medication.isImmunotherapy) return <Shield className="h-4 w-4 text-blue-500" />;
    if (medication.isTargetedTherapy) return <Target className="h-4 w-4 text-green-500" />;
    return <Pill className="h-4 w-4 text-gray-500" />;
  };

  const getTypeBadge = (medication: OncologyMedication) => {
    if (medication.isChemotherapy) return <Badge variant="destructive" className="text-xs">Chemotherapy</Badge>;
    if (medication.isImmunotherapy) return <Badge variant="default" className="text-xs bg-blue-500">Immunotherapy</Badge>;
    if (medication.isTargetedTherapy) return <Badge variant="default" className="text-xs bg-green-500">Targeted</Badge>;
    return <Badge variant="secondary" className="text-xs">Supportive</Badge>;
  };

  const classifications = [
    "Antiemetic - 5-HT3 Receptor Antagonist",
    "Antiemetic - NK-1 Receptor Antagonist", 
    "Antiemetic - Dopamine Antagonist/Prokinetic",
    "Antiemetic - Atypical Antipsychotic",
    "Growth Factor - Granulocyte Colony-Stimulating Factor (G-CSF)",
    "Growth Factor - Long-Acting G-CSF",
    "Growth Factor - Erythropoiesis-Stimulating Agent (ESA)",
    "Opioid Analgesic - Strong Opioid",
    "Opioid Analgesic - Synthetic Strong Opioid",
    "Corticosteroid - Anti-inflammatory/Antiemetic",
    "Laxative - Stimulant",
    "Laxative - Stool Softener",
    "Anticonvulsant - Neuropathy Treatment"
  ];

  const filteredMedications = medications.filter((med: OncologyMedication) => {
    // Search term filtering
    const matchesSearch = !searchTerm || 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.classification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Classification filtering
    const matchesClassification = selectedClassification === "all" || 
      med.classification === selectedClassification;
    
    // Type filtering
    const matchesType = selectedType === "all" || 
      (selectedType === "chemotherapy" && med.isChemotherapy) ||
      (selectedType === "immunotherapy" && med.isImmunotherapy) ||
      (selectedType === "targeted" && med.isTargetedTherapy);
    
    return matchesSearch && matchesClassification && matchesType;
  });

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Oncology Medications Database
          </CardTitle>
          <CardDescription>Loading comprehensive medication information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Medications Database Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unable to load medications database. Please check your connection and try again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-blue-600" />
            Comprehensive Oncology Medications Database
          </CardTitle>
          <CardDescription>
            Complete medication reference including treatment, pretreatment, supportive care, symptom control, and palliative care medications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search medications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedClassification} onValueChange={setSelectedClassification}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by classification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classifications</SelectItem>
                  {classifications.map((classification) => (
                    <SelectItem key={classification} value={classification}>
                      {classification}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="chemotherapy">Chemotherapy</SelectItem>
                  <SelectItem value="immunotherapy">Immunotherapy</SelectItem>
                  <SelectItem value="targeted">Targeted Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedClassification !== "all" || selectedType !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedClassification("all");
                  setSelectedType("all");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}

            {/* Medications Count */}
            <div className="text-sm text-gray-600">
              Showing {filteredMedications.length} of {medications.length} medications
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medications List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Medication List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-2 p-4">
                {filteredMedications.map((medication: OncologyMedication) => (
                  <Card
                    key={medication.id}
                    className={`cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      selectedMedication?.id === medication.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedMedication(medication)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(medication)}
                            <h3 className="font-semibold">{medication.name}</h3>
                          </div>
                          {getTypeBadge(medication)}
                        </div>
                        
                        {medication.brandNames && medication.brandNames.length > 0 && (
                          <div className="text-sm text-gray-600">
                            Brand names: {medication.brandNames.join(', ')}
                          </div>
                        )}
                        
                        <div className="text-sm text-blue-600 font-medium">
                          {medication.classification}
                        </div>
                        
                        <div className="text-sm text-gray-700 line-clamp-2">
                          {medication.summary}
                        </div>

                        {medication.blackBoxWarning && (
                          <Alert variant="destructive" className="mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                              Black Box Warning: {medication.blackBoxWarning}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Medication Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedMedication ? `${selectedMedication.name} Details` : 'Select a Medication'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMedication ? (
              <ScrollArea className="h-[600px]">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="dosing">Dosing</TabsTrigger>
                    <TabsTrigger value="safety">Safety</TabsTrigger>
                    <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Mechanism of Action</h4>
                      <p className="text-sm text-gray-700">{selectedMedication.mechanism}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Administration</h4>
                      <p className="text-sm text-gray-700">{selectedMedication.administration}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Indications</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {selectedMedication.indications.map((indication, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {indication}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedMedication.specialConsiderations && selectedMedication.specialConsiderations.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">Special Considerations</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {selectedMedication.specialConsiderations.map((consideration, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                {consideration}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </TabsContent>

                  <TabsContent value="dosing" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Dosing Information</h4>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                        <pre className="whitespace-pre-wrap font-mono text-xs">
                          {JSON.stringify(selectedMedication.dosing, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {selectedMedication.pharmacokinetics && Object.keys(selectedMedication.pharmacokinetics).length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">Pharmacokinetics</h4>
                          <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded text-sm">
                            <pre className="whitespace-pre-wrap font-mono text-xs">
                              {JSON.stringify(selectedMedication.pharmacokinetics, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </>
                    )}
                  </TabsContent>

                  <TabsContent value="safety" className="space-y-4">
                    {selectedMedication.blackBoxWarning && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Black Box Warning:</strong> {selectedMedication.blackBoxWarning}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div>
                      <h4 className="font-semibold mb-2">Side Effects</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {selectedMedication.sideEffects.map((effect, index) => (
                          <Badge key={index} variant="outline" className="text-xs justify-start">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Contraindications</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {selectedMedication.contraindications.map((contraindication, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            {contraindication}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Drug Interactions</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {selectedMedication.interactions.map((interaction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            {interaction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="monitoring" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Pretreatment Tests</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {selectedMedication.pretreatmentTests.map((test, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {test}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Routine Monitoring</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {selectedMedication.routineMonitoring.map((monitor, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {monitor}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">General Monitoring</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {selectedMedication.monitoring.map((monitor, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            {monitor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Pill className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a medication from the list to view detailed information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicationsSegment;