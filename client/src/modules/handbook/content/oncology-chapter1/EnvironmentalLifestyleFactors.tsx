import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cigarette, 
  Wine, 
  UtensilsCrossed, 
  Activity, 
  Bug, 
  Zap,
  Building,
  Droplets,
  Shield,
  AlertTriangle,
  TrendingDown
} from "lucide-react";

const EnvironmentalLifestyleFactors = () => {
  const riskFactors = [
    {
      category: "Tobacco Use",
      icon: Cigarette,
      carcinogens: "PAHs, nitrosamines, benzene",
      mechanism: "DNA adduct formation → TP53, KRAS mutations",
      cancers: ["Lung", "Oral cavity", "Larynx", "Esophageal", "Bladder", "Pancreatic", "Cervical"],
      prevention: "Smoking cessation - most effective cancer prevention strategy",
      color: "bg-red-100 text-red-800 border-red-300"
    },
    {
      category: "Alcohol Consumption",
      icon: Wine,
      carcinogens: "Acetaldehyde (Group I carcinogen)",
      mechanism: "DNA damage, oxidative stress, inflammation",
      cancers: ["Esophageal", "Liver", "Breast", "Colorectal", "Oropharyngeal"],
      prevention: "Moderation or abstinence, avoid tobacco co-exposure",
      color: "bg-purple-100 text-purple-800 border-purple-300"
    },
    {
      category: "Diet and Nutrition",
      icon: UtensilsCrossed,
      carcinogens: "Nitrosamines, HCAs, aflatoxins",
      mechanism: "Direct DNA damage, microbiota alteration",
      cancers: ["Colorectal", "Gastric", "Liver (aflatoxins)"],
      prevention: "Mediterranean diet, fruits/vegetables, whole grains",
      color: "bg-green-100 text-green-800 border-green-300"
    },
    {
      category: "Obesity & Inactivity",
      icon: Activity,
      carcinogens: "Chronic inflammation, hormonal imbalances",
      mechanism: "↑insulin, IGF-1, estrogen; altered adipokines",
      cancers: ["Breast", "Colorectal", "Endometrial", "Pancreatic", "Kidney"],
      prevention: "Weight management, ≥150 min/week exercise",
      color: "bg-orange-100 text-orange-800 border-orange-300"
    }
  ];

  const infectiousAgents = [
    { pathogen: "HPV (16, 18)", mechanism: "E6/E7 proteins inactivate p53, Rb", cancers: "Cervical, anal, oropharyngeal", prevention: "Vaccination, screening" },
    { pathogen: "HBV/HCV", mechanism: "Chronic inflammation and cirrhosis", cancers: "Hepatocellular carcinoma", prevention: "Vaccination, antiviral therapy" },
    { pathogen: "H. pylori", mechanism: "Gastric mucosal damage and inflammation", cancers: "Gastric adenocarcinoma, MALT lymphoma", prevention: "Antibiotic eradication" },
    { pathogen: "EBV", mechanism: "B-cell transformation", cancers: "Burkitt lymphoma, nasopharyngeal cancer", prevention: "Limited options" },
    { pathogen: "HHV-8 (KSHV)", mechanism: "Viral cytokines and latency", cancers: "Kaposi sarcoma", prevention: "Immunosuppression management" }
  ];

  const occupationalExposures = [
    { exposure: "Asbestos", source: "Construction, shipbuilding", cancer: "Mesothelioma, lung cancer" },
    { exposure: "Benzene", source: "Chemical industry, gasoline", cancer: "Acute myeloid leukemia (AML)" },
    { exposure: "Arsenic", source: "Contaminated water, smelting", cancer: "Skin, bladder, lung cancer" },
    { exposure: "Vinyl chloride", source: "PVC manufacturing", cancer: "Angiosarcoma of the liver" },
    { exposure: "Diesel exhaust", source: "Transport, mining", cancer: "Lung cancer" }
  ];

  const radiationTypes = [
    {
      type: "Ionizing Radiation",
      sources: ["X-rays", "CT scans", "Nuclear accidents", "Radon gas"],
      mechanism: "Direct DNA double-strand breaks, ROS generation",
      cancers: ["Thyroid", "Leukemia", "Breast", "Brain (children)"],
      prevention: "ALARA principle, medical imaging optimization"
    },
    {
      type: "Ultraviolet (UV) Radiation",
      sources: ["Solar UV", "Tanning beds", "UV lamps"],
      mechanism: "Cyclobutane pyrimidine dimers, TP53 mutations",
      cancers: ["Basal cell carcinoma", "Squamous cell carcinoma", "Melanoma"],
      prevention: "Sun protection, sunscreen, UV exposure minimization"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Section 1.2.2: Environmental and Lifestyle Risk Factors
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Modifiable Factors</Badge>
            <Badge variant="outline">Prevention Strategies</Badge>
            <Badge variant="outline">Public Health</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            Cancer development is influenced by a wide range of environmental exposures and lifestyle choices. These exogenous influences can initiate or promote carcinogenesis by inducing DNA damage, modulating gene expression, disrupting cellular signaling, or shaping the tumor microenvironment. Understanding these risk factors is essential for cancer prevention and public health strategies.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="infectious">Infectious</TabsTrigger>
          <TabsTrigger value="radiation">Radiation</TabsTrigger>
          <TabsTrigger value="occupational">Occupational</TabsTrigger>
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {riskFactors.map((factor, index) => {
              const IconComponent = factor.icon;
              return (
                <Card key={index} className={`border-l-4 border-l-gray-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="h-5 w-5" />
                      {factor.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Carcinogens</h4>
                      <p className="text-xs text-muted-foreground">{factor.carcinogens}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-1">Mechanism</h4>
                      <p className="text-xs text-muted-foreground">{factor.mechanism}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-1">Associated Cancers</h4>
                      <div className="flex flex-wrap gap-1">
                        {factor.cancers.map((cancer, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {cancer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <p className="text-xs"><strong>Prevention:</strong> {factor.prevention}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Alert>
            <TrendingDown className="h-4 w-4" />
            <AlertDescription>
              <strong>Prevention Impact:</strong> Environmental and lifestyle factors are major contributors to cancer incidence globally—and unlike genetic predispositions, many of these factors are modifiable through targeted prevention strategies.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="lifestyle" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cigarette className="h-5 w-5 text-red-600" />
                  Tobacco Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Carcinogenic Components</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Polycyclic aromatic hydrocarbons (PAHs)</li>
                    <li>• Nitrosamines</li>
                    <li>• Benzene and formaldehyde</li>
                    <li>• Heavy metals (cadmium, lead)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Prevention Strategies</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Smoking cessation programs</li>
                    <li>• Nicotine replacement therapy</li>
                    <li>• Bupropion and varenicline</li>
                    <li>• Second-hand smoke avoidance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wine className="h-5 w-5 text-purple-600" />
                  Alcohol Consumption
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Mechanisms of Action</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Acetaldehyde formation (Group I carcinogen)</li>
                    <li>• Oxidative stress and inflammation</li>
                    <li>• Enhanced permeability to carcinogens</li>
                    <li>• Hormonal pathway disruption</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Synergistic Effects</h4>
                  <p className="text-xs">Alcohol and tobacco co-exposure significantly raises risk, especially for head and neck cancers.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-green-600" />
                Diet and Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3">Carcinogenic Components</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="text-sm font-medium">Processed/Red Meats</p>
                      <p className="text-xs">Nitrosamines, heterocyclic amines (HCA)</p>
                    </div>
                    <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <p className="text-sm font-medium">Aflatoxins</p>
                      <p className="text-xs">Aspergillus contamination → hepatocellular carcinoma</p>
                    </div>
                    <div className="p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <p className="text-sm font-medium">High-fat, Low-fiber</p>
                      <p className="text-xs">Gut microbiota alteration → colorectal cancer</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Protective Elements</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <p className="text-sm font-medium">Fruits and Vegetables</p>
                      <p className="text-xs">Antioxidants, phytochemicals (sulforaphane, lycopene)</p>
                    </div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <p className="text-sm font-medium">Whole Grains</p>
                      <p className="text-xs">Fiber and anti-inflammatory agents</p>
                    </div>
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <p className="text-sm font-medium">Mediterranean Diet</p>
                      <p className="text-xs">Lower incidence of many cancers</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infectious" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-red-600" />
                Infectious Agents in Carcinogenesis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Pathogen</th>
                      <th className="text-left p-2">Mechanism</th>
                      <th className="text-left p-2">Associated Cancers</th>
                      <th className="text-left p-2">Prevention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infectiousAgents.map((agent, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{agent.pathogen}</td>
                        <td className="p-2">{agent.mechanism}</td>
                        <td className="p-2">{agent.cancers}</td>
                        <td className="p-2">{agent.prevention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Alert>
                <Bug className="h-4 w-4" />
                <AlertDescription>
                  <strong>Global Impact:</strong> Infectious agents cause approximately 15-20% of human cancers worldwide. Vaccination and antimicrobial therapy represent highly effective prevention strategies.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radiation" className="space-y-4">
          {radiationTypes.map((radiation, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  {radiation.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Sources</h4>
                    <div className="flex flex-wrap gap-1">
                      {radiation.sources.map((source, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Associated Cancers</h4>
                    <div className="flex flex-wrap gap-1">
                      {radiation.cancers.map((cancer, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {cancer}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                  <h4 className="font-medium text-sm mb-1">Mechanism</h4>
                  <p className="text-xs">{radiation.mechanism}</p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                  <h4 className="font-medium text-sm mb-1">Prevention</h4>
                  <p className="text-xs">{radiation.prevention}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="occupational" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Occupational and Environmental Exposures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Exposure</th>
                      <th className="text-left p-2">Source/Occupation</th>
                      <th className="text-left p-2">Cancer Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {occupationalExposures.map((exposure, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{exposure.exposure}</td>
                        <td className="p-2">{exposure.source}</td>
                        <td className="p-2">{exposure.cancer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Air Pollution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>PM2.5 and diesel exhaust</strong>: Group I carcinogens</li>
                      <li>• <strong>Associated cancers</strong>: Lung, bladder</li>
                      <li>• <strong>Urban exposure</strong>: Increased mortality</li>
                      <li>• <strong>Prevention</strong>: Air quality monitoring, clean energy</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Preventive Approaches</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Workplace safety regulations</li>
                      <li>• Personal protective equipment</li>
                      <li>• Environmental remediation</li>
                      <li>• Exposure monitoring programs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prevention" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="text-lg">Primary Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Tobacco cessation</strong>: Programs and pharmacotherapy</li>
                  <li>• <strong>UV protection</strong>: Sun safety and sunscreen</li>
                  <li>• <strong>Vaccination</strong>: HPV, HBV prevention</li>
                  <li>• <strong>Occupational safety</strong>: Regulations and PPE</li>
                  <li>• <strong>Dietary modifications</strong>: Mediterranean diet adoption</li>
                  <li>• <strong>Physical activity</strong>: Regular exercise promotion</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-lg">Secondary Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Cervical screening</strong>: Pap smear and HPV testing</li>
                  <li>• <strong>Breast screening</strong>: Mammography programs</li>
                  <li>• <strong>Colorectal screening</strong>: Colonoscopy and FIT</li>
                  <li>• <strong>Lung screening</strong>: Low-dose CT (high-risk)</li>
                  <li>• <strong>Genetic counseling</strong>: BRCA and Lynch syndrome</li>
                  <li>• <strong>Chemoprevention</strong>: High-risk populations</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-purple-600" />
                Hormonal Factors and Endocrine Disruptors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-pink-50 dark:bg-pink-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Endogenous Factors</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Early menarche, late menopause</li>
                    <li>• Nulliparity</li>
                    <li>• ↑ Estrogen exposure</li>
                    <li>• Breast/endometrial cancer risk</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Exogenous Exposures</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Oral contraceptives</li>
                    <li>• Hormone replacement therapy</li>
                    <li>• ↑ Breast cancer risk</li>
                    <li>• ↓ Ovarian/endometrial risk</li>
                  </ul>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                  <h4 className="font-medium text-sm mb-2">Endocrine Disruptors</h4>
                  <ul className="text-xs space-y-1">
                    <li>• BPA, phthalates</li>
                    <li>• Experimental evidence</li>
                    <li>• Potential cancer promotion</li>
                    <li>• Environmental regulation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Population Impact:</strong> Targeted prevention through lifestyle interventions offers a powerful approach to reduce cancer burden. Integration of these strategies into clinical practice and public health policy is essential for effective cancer control.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnvironmentalLifestyleFactors;