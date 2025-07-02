import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Download, 
  Printer, 
  Share2, 
  Star,
  Clock,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectedChapter {
  id: string;
  title: string;
  level: number;
  content?: string;
}

interface MarkdownViewerProps {
  chapter: SelectedChapter;
}

// Generate comprehensive educational content based on the chapter selection
const generateChapterContent = (chapter: SelectedChapter): string => {
  const { title, level, id } = chapter;
  
  // Medical Oncology Content
  if (id.includes('medical-oncology') || id.includes('medical-chapter')) {
    if (title.includes('Cancer Biology')) {
      return `# Cancer Biology

## Overview
Cancer biology encompasses the fundamental mechanisms underlying malignant transformation and tumor progression. Understanding these processes is crucial for effective clinical management.

## Hallmarks of Cancer
The hallmarks of cancer represent the biological capabilities acquired during tumor development:

### 1. Self-Sufficiency in Growth Signals
- **Oncogenes**: Mutated or overexpressed normal genes that promote cell growth
- **Growth factor independence**: Tumors produce their own growth signals
- **Clinical relevance**: Targeted therapies against growth factor receptors

### 2. Insensitivity to Growth-Inhibitory Signals
- **Tumor suppressor genes**: p53, Rb, APC
- **Cell cycle checkpoints**: G1/S and G2/M transitions
- **Contact inhibition loss**: Allows unlimited proliferation

### 3. Evasion of Apoptosis
- **p53 pathway disruption**: Most common in human cancers
- **Bcl-2 family dysregulation**: Anti-apoptotic protein overexpression
- **Therapeutic implications**: Targeting apoptotic pathways

### 4. Limitless Replicative Potential
- **Telomerase activation**: Present in 90% of cancers
- **Senescence bypass**: Unlimited cell divisions
- **Immortalization**: Essential for tumor progression

### 5. Sustained Angiogenesis
- **VEGF pathway**: Primary angiogenic stimulus
- **Hypoxia-inducible factors**: HIF-1α regulation
- **Anti-angiogenic therapy**: Bevacizumab and other agents

### 6. Tissue Invasion and Metastasis
- **EMT (Epithelial-Mesenchymal Transition)**: Critical for invasion
- **Matrix metalloproteinases**: Basement membrane degradation
- **Metastatic cascade**: Circulation, extravasation, colonization

## Clinical Applications
Understanding cancer biology informs:
- **Biomarker development**: Predictive and prognostic markers
- **Therapeutic targets**: Precision medicine approaches
- **Resistance mechanisms**: Strategies to overcome drug resistance
- **Prevention strategies**: Risk assessment and screening

## Key Learning Points
1. Cancer is a genetic disease requiring multiple mutations
2. Normal cellular pathways become dysregulated
3. Understanding biology enables targeted interventions
4. Tumor heterogeneity poses therapeutic challenges`;
    }
    
    if (title.includes('Chemotherapy')) {
      return `# Chemotherapy

## Mechanisms of Action
Chemotherapy agents target rapidly dividing cells through various mechanisms:

### Cell Cycle-Specific Agents
- **S-phase**: Antimetabolites (5-FU, methotrexate)
- **M-phase**: Vinca alkaloids, taxanes
- **G2/M checkpoint**: Topoisomerase inhibitors

### Cell Cycle-Nonspecific Agents
- **DNA alkylating agents**: Cyclophosphamide, cisplatin
- **DNA intercalating agents**: Doxorubicin, mitomycin C
- **Protein synthesis inhibitors**: Actinomycin D

## Major Drug Classes

### Alkylating Agents
- **Mechanism**: DNA cross-linking and strand breaks
- **Examples**: Cyclophosphamide, carboplatin, temozolomide
- **Toxicities**: Myelosuppression, secondary malignancies
- **Clinical use**: Lymphomas, sarcomas, brain tumors

### Antimetabolites
- **Mechanism**: Interference with DNA synthesis
- **Examples**: 5-fluorouracil, methotrexate, gemcitabine
- **Toxicities**: Mucositis, hand-foot syndrome
- **Clinical use**: GI cancers, breast cancer, leukemia

### Topoisomerase Inhibitors
- **Type I**: Irinotecan, topotecan
- **Type II**: Etoposide, doxorubicin
- **Mechanism**: DNA strand break formation
- **Clinical use**: Colorectal, lung, ovarian cancers

### Antitubulins
- **Vinca alkaloids**: Vincristine, vinblastine
- **Taxanes**: Paclitaxel, docetaxel
- **Mechanism**: Microtubule disruption
- **Toxicities**: Neuropathy, myelosuppression

## Dosing Principles
- **Body surface area**: Standard dosing method
- **Organ function**: Dose modifications for hepatic/renal impairment
- **Performance status**: Treatment intensity considerations
- **Combination therapy**: Synergistic effects and overlapping toxicities

## Resistance Mechanisms
- **Multidrug resistance**: P-glycoprotein overexpression
- **DNA repair enhancement**: Increased repair capacity
- **Apoptosis evasion**: p53 mutations
- **Drug metabolism**: Altered pharmacokinetics

## Clinical Considerations
1. **Premedications**: Antiemetics, hydration, hypersensitivity prophylaxis
2. **Monitoring**: CBC, chemistry panel, organ function
3. **Supportive care**: Growth factors, antimicrobials
4. **Patient education**: Side effects, when to call team`;
    }
  }
  
  // Radiation Oncology Content
  if (id.includes('radiation') || title.includes('Radiation')) {
    if (title.includes('Basic Radiation Physics')) {
      return `# Basic Radiation Physics

## Types of Radiation

### Electromagnetic Radiation
- **Photons**: X-rays and gamma rays
- **Energy range**: keV to MeV
- **Depth-dose characteristics**: Skin sparing with megavoltage
- **Clinical use**: External beam radiotherapy

### Particulate Radiation
- **Electrons**: Beta particles
- **Range**: Limited penetration depth
- **Clinical use**: Skin and superficial tumors
- **Energy**: 6-20 MeV typical

- **Protons**: Charged particles
- **Bragg peak**: Precise dose deposition
- **Clinical advantage**: Reduced normal tissue dose
- **Indications**: Pediatric tumors, CNS lesions

## Dose and Units

### Gray (Gy)
- **Definition**: 1 Joule per kilogram
- **Conversion**: 1 Gy = 100 cGy = 100 rad
- **Typical doses**: 1.8-2.0 Gy per fraction

### Biologically Effective Dose (BED)
- **Formula**: BED = nd[1 + d/(α/β)]
- **α/β ratio**: Tissue-specific radiosensitivity
- **Clinical use**: Comparing different fractionation schemes

## Interaction with Matter

### Photoelectric Effect
- **Low energy photons**: < 100 keV
- **High atomic number**: Greater probability
- **Clinical relevance**: Contrast enhancement

### Compton Scattering
- **Therapeutic energies**: Predominant interaction
- **Energy range**: 100 keV - 10 MeV
- **Electron production**: Secondary ionization

### Pair Production
- **High energy**: > 1.02 MeV
- **Heavy nuclei**: Required for interaction
- **Clinical significance**: Limited at therapeutic energies

## Clinical Applications
- **Treatment planning**: Dose calculation algorithms
- **Beam characteristics**: Percentage depth dose curves
- **Shielding**: Radiation protection principles
- **Quality assurance**: Physics measurements and calibration

## Key Concepts
1. **Inverse square law**: Dose decreases with distance squared
2. **Half-value layer**: Thickness reducing intensity by 50%
3. **Linear energy transfer**: Energy deposition per unit path
4. **Relative biological effectiveness**: Comparing radiation types`;
    }
  }
  
  // Palliative Care Content
  if (id.includes('palliative') || title.includes('Palliative')) {
    if (title.includes('Pain')) {
      return `# Pain Management in Palliative Care

## Pain Assessment

### Comprehensive Evaluation
- **Location**: Primary and referred pain sites
- **Quality**: Sharp, dull, burning, cramping
- **Intensity**: 0-10 numerical rating scale
- **Temporal pattern**: Constant vs. intermittent
- **Aggravating/relieving factors**

### Pain Types
- **Nociceptive**: Somatic and visceral
- **Neuropathic**: Nerve damage or dysfunction
- **Mixed**: Combination of mechanisms
- **Breakthrough**: Transient pain flares

## WHO Analgesic Ladder

### Step 1: Mild Pain (1-3/10)
- **Non-opioids**: Acetaminophen, NSAIDs
- **Adjuvants**: Topical agents, co-analgesics
- **Dosing**: Regular scheduling preferred

### Step 2: Moderate Pain (4-6/10)
- **Weak opioids**: Codeine, tramadol
- **Combination products**: Hydrocodone/acetaminophen
- **Continue adjuvants**: Optimize non-opioid therapy

### Step 3: Severe Pain (7-10/10)
- **Strong opioids**: Morphine, oxycodone, fentanyl
- **Route selection**: Oral, transdermal, parenteral
- **Dose escalation**: Titrate to effect

## Opioid Management

### Starting Doses (Opioid-naive)
- **Morphine**: 5-10 mg PO q4h
- **Oxycodone**: 5 mg PO q4h
- **Hydromorphone**: 1-2 mg PO q4h
- **Fentanyl patch**: Not for opioid-naive patients

### Dose Conversion
- **Equianalgesic ratios**: Approximate conversions
- **Cross-tolerance**: 25-50% dose reduction
- **Route considerations**: Bioavailability differences

### Breakthrough Pain
- **Immediate-release**: 10-20% of 24-hour dose
- **Frequency**: q1h PRN initially
- **Adjustment**: Based on breakthrough requirements

## Adjuvant Analgesics

### Neuropathic Pain
- **Anticonvulsants**: Gabapentin, pregabalin
- **Antidepressants**: Duloxetine, amitriptyline
- **Topical agents**: Lidocaine, capsaicin

### Bone Pain
- **Bisphosphonates**: Pamidronate, zoledronic acid
- **Corticosteroids**: Dexamethasone
- **Radiotherapy**: Single fraction or fractionated

### Visceral Pain
- **Antispasmodics**: Hyoscyamine, dicyclomine
- **Corticosteroids**: Anti-inflammatory effects
- **Nerve blocks**: Celiac plexus, sympathetic blocks

## Side Effect Management

### Constipation
- **Prevention**: Routine bowel regimen
- **Stimulant laxatives**: Senna, bisacodyl
- **Osmotic agents**: Polyethylene glycol

### Nausea
- **Mechanism-based**: Target specific pathways
- **Prokinetic agents**: Metoclopramide
- **5-HT3 antagonists**: Ondansetron

### Sedation
- **Time-limited**: Usually improves in 3-5 days
- **Dose adjustment**: Consider smaller, more frequent doses
- **Stimulants**: Methylphenidate for persistent sedation

## Special Considerations
1. **Renal impairment**: Avoid morphine metabolite accumulation
2. **Hepatic impairment**: Dose reduction may be needed
3. **Respiratory depression**: Rare in cancer pain with appropriate titration
4. **Addiction concerns**: Distinguish from physical dependence`;
    }
  }
  
  // Default content for any other sections
  return `# ${title}

## Overview
This section covers important clinical concepts and evidence-based approaches in ${title.toLowerCase()}.

## Key Clinical Points
- Evidence-based recommendations from major guidelines
- Practical clinical decision-making frameworks
- Integration with multidisciplinary care
- Patient safety and quality considerations

## Clinical Applications
This knowledge applies to:
- Patient assessment and evaluation
- Treatment planning and implementation
- Monitoring and follow-up care
- Patient and family education

## Educational Objectives
After reviewing this material, learners should be able to:
1. Understand core principles and concepts
2. Apply knowledge to clinical scenarios
3. Make appropriate treatment decisions
4. Recognize potential complications
5. Provide comprehensive patient care

## Further Reading
- Review relevant clinical guidelines
- Consult primary literature and clinical trials
- Consider multidisciplinary perspectives
- Stay current with evolving evidence

*This is an educational resource for clinical decision support. Always verify current guidelines and institutional protocols.*`;
};

export default function MarkdownViewer({ chapter }: MarkdownViewerProps) {
  const [bookmarked, setBookmarked] = useState(false);
  
  const content = useMemo(() => generateChapterContent(chapter), [chapter]);
  
  const getBadgeColor = (level: number) => {
    switch (level) {
      case 1: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case 2: return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 3: return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-6">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3 mt-4">{line.substring(4)}</h3>;
      }
      
      // List items
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
        if (match) {
          return (
            <div key={index} className="flex items-start gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">{match[1]}</span>
                <span className="text-gray-700 dark:text-gray-300">: {match[2]}</span>
              </div>
            </div>
          );
        }
      }
      
      if (line.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start gap-2 mb-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300">{line.substring(2)}</span>
          </div>
        );
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/);
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            {parts.map((part, i) => 
              part.startsWith('**') && part.endsWith('**') ? 
                <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong> : 
                part
            )}
          </p>
        );
      }
      
      // Regular paragraphs
      if (line.trim() && !line.startsWith('#')) {
        return <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{line}</p>;
      }
      
      // Empty lines
      return <div key={index} className="mb-2" />;
    });
  };

  return (
    <Card className="min-h-[600px]">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <Badge className={cn("text-xs", getBadgeColor(chapter.level))}>
                Level {chapter.level}
              </Badge>
            </div>
            <CardTitle className="text-xl text-gray-900 dark:text-white">
              {chapter.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5-10 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Evidence-based</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBookmarked(!bookmarked)}
              className={cn(
                bookmarked && "bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300"
              )}
            >
              <Star className={cn("h-4 w-4", bookmarked && "fill-current")} />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {formatContent(content)}
        </div>
        
        <Separator className="my-8" />
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Clinical Decision Support Note
              </h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                This content is for educational purposes and clinical decision support. 
                Always verify with current institutional protocols, evidence-based guidelines, 
                and consult with senior colleagues for complex clinical decisions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}