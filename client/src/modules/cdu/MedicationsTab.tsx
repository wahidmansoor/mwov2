import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Search, 
  Filter, 
  Pill, 
  AlertTriangle, 
  Heart, 
  Shield, 
  Zap,
  Eye,
  Clock,
  Brain,
  Droplets,
  Activity,
  Target,
  Microscope,
  Syringe
} from "lucide-react";

interface OncologyMedication {
  id: string;
  name: string;
  brandNames: string[];
  classification: string;
  mechanism: string;
  administration: string;
  indications: {
    cancer_types: string[];
  };
  dosing: {
    standard: string;
  };
  sideEffects: any;
  monitoring: any;
  interactions: any;
  referenceSources: string[];
  summary: string;
  blackBoxWarning?: string;
  specialConsiderations: any;
  pharmacokinetics: any;
  contraindications: string[];
  routineMonitoring: string[];
  preTreatmentTests: string[];
  isChemotherapy: boolean;
  isImmunotherapy: boolean;
  isTargetedTherapy: boolean;
  isOrphanDrug: boolean;
  createdAt: string;
  updatedAt: string;
}

const MedicationDetailDialog = ({ medication }: { medication: OncologyMedication }) => (
  <DialogContent className="max-w-5xl max-h-[90vh]">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Pill className="h-5 w-5" />
        {medication.name} {medication.brandNames?.[0] && `(${medication.brandNames[0]})`}
      </DialogTitle>
    </DialogHeader>
    <ScrollArea className="max-h-[75vh]">
      <div className="space-y-6 p-4">
        {/* Header Info */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-2">Classification</h4>
            <Badge variant="outline" className="bg-blue-50 text-blue-800">
              {medication.classification}
            </Badge>
          </div>
          <div>
            <h4 className="font-medium mb-2">Administration</h4>
            <span className="text-sm">{medication.administration}</span>
          </div>
          <div>
            <h4 className="font-medium mb-2">Drug Type</h4>
            <div className="flex flex-wrap gap-1">
              {medication.isChemotherapy && (
                <Badge className="bg-red-100 text-red-800">
                  <Droplets className="h-3 w-3 mr-1" />
                  Chemotherapy
                </Badge>
              )}
              {medication.isImmunotherapy && (
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Immunotherapy
                </Badge>
              )}
              {medication.isTargetedTherapy && (
                <Badge className="bg-purple-100 text-purple-800">
                  <Target className="h-3 w-3 mr-1" />
                  Targeted
                </Badge>
              )}
              {medication.isOrphanDrug && (
                <Badge className="bg-orange-100 text-orange-800">
                  <Microscope className="h-3 w-3 mr-1" />
                  Orphan Drug
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Black Box Warning */}
        {medication.blackBoxWarning && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h4 className="font-semibold text-red-800 dark:text-red-200">Black Box Warning</h4>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">{medication.blackBoxWarning}</p>
          </div>
        )}

        {/* Summary */}
        <div>
          <h4 className="font-medium mb-2">Summary</h4>
          <p className="text-sm text-muted-foreground">{medication.summary}</p>
        </div>

        <Separator />

        {/* Clinical Information */}
        <Accordion type="multiple" className="space-y-2">
          {/* Indications */}
          <AccordionItem value="indications">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                Cancer Indications
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {medication.indications?.cancer_types?.map((cancer: string, i: number) => (
                  <Badge key={i} variant="secondary">
                    {cancer}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Mechanism of Action */}
          <AccordionItem value="mechanism">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                Mechanism of Action
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">{medication.mechanism}</p>
            </AccordionContent>
          </AccordionItem>

          {/* Dosing */}
          <AccordionItem value="dosing">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Syringe className="h-4 w-4 text-green-500" />
                Standard Dosing
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {medication.dosing?.standard}
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Side Effects */}
          {medication.sideEffects && (
            <AccordionItem value="side-effects">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Side Effects
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {medication.sideEffects.common && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">Common</h5>
                      <div className="flex flex-wrap gap-1">
                        {medication.sideEffects.common.map((effect: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {medication.sideEffects.serious && (
                    <div>
                      <h5 className="font-medium text-sm mb-2 text-red-600">Serious</h5>
                      <div className="flex flex-wrap gap-1">
                        {medication.sideEffects.serious.map((effect: string, i: number) => (
                          <Badge key={i} variant="destructive" className="text-xs">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Monitoring */}
          {medication.monitoring && (
            <AccordionItem value="monitoring">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Monitoring Requirements
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {medication.monitoring.labs && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">Laboratory Tests</h5>
                      <div className="flex flex-wrap gap-1">
                        {medication.monitoring.labs.map((lab: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {lab}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {medication.monitoring.frequency && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">Frequency</h5>
                      <p className="text-sm">{medication.monitoring.frequency}</p>
                    </div>
                  )}
                  {medication.monitoring.precautions && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">Precautions</h5>
                      <ul className="text-sm space-y-1">
                        {medication.monitoring.precautions.map((precaution: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            {precaution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Pharmacokinetics */}
          {medication.pharmacokinetics && (
            <AccordionItem value="pharmacokinetics">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-500" />
                  Pharmacokinetics
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {medication.pharmacokinetics.half_life && (
                    <div>
                      <h5 className="font-medium mb-1">Half-life</h5>
                      <p>{medication.pharmacokinetics.half_life}</p>
                    </div>
                  )}
                  {medication.pharmacokinetics.metabolism && (
                    <div>
                      <h5 className="font-medium mb-1">Metabolism</h5>
                      <p>{medication.pharmacokinetics.metabolism}</p>
                    </div>
                  )}
                  {medication.pharmacokinetics.excretion && (
                    <div>
                      <h5 className="font-medium mb-1">Excretion</h5>
                      <p>{medication.pharmacokinetics.excretion}</p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Contraindications */}
          {medication.contraindications && medication.contraindications.length > 0 && (
            <AccordionItem value="contraindications">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-500" />
                  Contraindications
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-sm space-y-1">
                  {medication.contraindications.map((contraindication: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      {contraindication}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>

        {/* References */}
        {medication.referenceSources && medication.referenceSources.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h4 className="font-medium mb-2">References</h4>
            <div className="flex flex-wrap gap-2">
              {medication.referenceSources.map((source: string, i: number) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  </DialogContent>
);

const MedicationCard = ({ medication }: { medication: OncologyMedication }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-lg flex items-center gap-2">
            <Pill className="h-5 w-5 text-blue-600" />
            {medication.name}
          </CardTitle>
          {medication.brandNames && medication.brandNames.length > 0 && (
            <CardDescription className="text-sm mt-1">
              Brand: {medication.brandNames.join(", ")}
            </CardDescription>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {medication.isChemotherapy && (
            <Badge className="bg-red-100 text-red-800 text-xs">
              Chemo
            </Badge>
          )}
          {medication.isImmunotherapy && (
            <Badge className="bg-green-100 text-green-800 text-xs">
              Immuno
            </Badge>
          )}
          {medication.isTargetedTherapy && (
            <Badge className="bg-purple-100 text-purple-800 text-xs">
              Targeted
            </Badge>
          )}
          {medication.isOrphanDrug && (
            <Badge className="bg-orange-100 text-orange-800 text-xs">
              Orphan
            </Badge>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-sm mb-1">Classification</h4>
          <Badge variant="outline" className="text-xs">
            {medication.classification}
          </Badge>
        </div>
        
        <div>
          <h4 className="font-medium text-sm mb-1">Indications</h4>
          <div className="flex flex-wrap gap-1">
            {medication.indications?.cancer_types?.slice(0, 3).map((cancer: string, i: number) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {cancer}
              </Badge>
            ))}
            {medication.indications?.cancer_types?.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{medication.indications.cancer_types.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-1">Standard Dose</h4>
          <p className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
            {medication.dosing?.standard}
          </p>
        </div>

        {medication.blackBoxWarning && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2">
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-red-600" />
              <span className="text-xs font-medium text-red-800 dark:text-red-200">
                Black Box Warning
              </span>
            </div>
          </div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </DialogTrigger>
          <MedicationDetailDialog medication={medication} />
        </Dialog>
      </div>
    </CardContent>
  </Card>
);

export default function MedicationsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classificationFilter, setClassificationFilter] = useState("");
  const [routeFilter, setRouteFilter] = useState("");
  const [cancerTypeFilter, setCancerTypeFilter] = useState("");

  const { data: medications = [], isLoading } = useQuery({
    queryKey: ["/api/oncology-medications", { 
      search: searchTerm, 
      classification: classificationFilter,
      route: routeFilter,
      cancerType: cancerTypeFilter
    }],
    enabled: true
  });

  // Extract unique values for filters
  const medicationsArray = Array.isArray(medications) ? medications : [];
  const classificationsSet = new Set<string>();
  const routesSet = new Set<string>();
  const cancerTypesSet = new Set<string>();
  
  medicationsArray.forEach((med: OncologyMedication) => {
    classificationsSet.add(med.classification);
    
    const route = med.administration.toLowerCase();
    if (route.includes('oral') || route.includes('tablet')) {
      routesSet.add('Oral');
    } else if (route.includes('iv') || route.includes('infusion')) {
      routesSet.add('IV');
    } else if (route.includes('subcutaneous') || route.includes('sc')) {
      routesSet.add('Subcutaneous');
    } else {
      routesSet.add('Other');
    }
    
    med.indications?.cancer_types?.forEach(type => cancerTypesSet.add(type));
  });
  
  const classifications = Array.from(classificationsSet);
  const routes = Array.from(routesSet);
  const cancerTypes = Array.from(cancerTypesSet);

  const filteredMedications = medicationsArray.filter((med: OncologyMedication) => {
    const matchesSearch = !searchTerm || 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.classification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.brandNames?.some(brand => brand.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesClassification = !classificationFilter || classificationFilter === "all" || med.classification === classificationFilter;
    
    const matchesRoute = !routeFilter || routeFilter === "all" || (() => {
      const route = med.administration.toLowerCase();
      if (routeFilter === 'Oral') return route.includes('oral') || route.includes('tablet');
      if (routeFilter === 'IV') return route.includes('iv') || route.includes('infusion');
      if (routeFilter === 'Subcutaneous') return route.includes('subcutaneous') || route.includes('sc');
      return true;
    })();
    
    const matchesCancerType = !cancerTypeFilter || cancerTypeFilter === "all" || 
      med.indications?.cancer_types?.includes(cancerTypeFilter);
    
    return matchesSearch && matchesClassification && matchesRoute && matchesCancerType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Oncology Medications</h2>
          <p className="text-muted-foreground">
            Comprehensive database of cancer treatment medications
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {filteredMedications.length} medications
        </Badge>
      </div>

      {/* Search and Filters */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={classificationFilter} onValueChange={setClassificationFilter}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Classification" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classifications</SelectItem>
            {classifications.map(classification => (
              <SelectItem key={classification} value={classification}>
                {classification}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={routeFilter} onValueChange={setRouteFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Route" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Routes</SelectItem>
            {routes.map(route => (
              <SelectItem key={route} value={route}>
                {route}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={cancerTypeFilter} onValueChange={setCancerTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Cancer Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cancer Types</SelectItem>
            {cancerTypes.map(cancerType => (
              <SelectItem key={cancerType} value={cancerType}>
                {cancerType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {(searchTerm || classificationFilter || routeFilter || cancerTypeFilter) && (
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm("");
            setClassificationFilter("");
            setRouteFilter("");
            setCancerTypeFilter("");
          }}
        >
          Clear All Filters
        </Button>
      )}

      {/* Medications Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredMedications.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedications.map((medication: OncologyMedication) => (
            <MedicationCard key={medication.id} medication={medication} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No medications found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}