import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Microscope, Dna, Shield } from "lucide-react";

const IntroductionToOncology = () => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Introduction to Chapter 1: Principles of Oncology
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Foundational Concepts</Badge>
            <Badge variant="outline">Cancer Biology</Badge>
            <Badge variant="outline">Carcinogenesis</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Oncology is the field of medicine dedicated to the study, diagnosis, and treatment of cancer—a disease that remains a leading cause of death globally. A solid understanding of the biological principles underlying cancer is essential for effective clinical care, research, and the development of new therapies.
          </p>
          
          <p className="text-sm leading-relaxed">
            This chapter introduces the foundational concepts of oncology, including cancer biology, carcinogenesis, and tumor immunology, which collectively provide the framework for modern cancer medicine.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Microscope className="h-5 w-5 text-green-600" />
              Cancer Transformation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Cancer arises from normal cells that acquire the ability to grow uncontrollably, evade regulatory signals, and ultimately invade surrounding tissues and metastasize to distant organs. This transformation results from a series of molecular and cellular alterations, often involving both genetic mutations and epigenetic changes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Dna className="h-5 w-5 text-purple-600" />
              Molecular Basis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              The molecular basis of cancer involves activation of oncogenes—genes that promote cell growth—and inactivation of tumor suppressor genes, which normally inhibit proliferation or promote repair and apoptosis. Mutations may occur spontaneously or as a result of carcinogenic exposures.
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Hallmarks Framework:</strong> A central framework in understanding cancer biology is the concept of the hallmarks of cancer, which describes the key capabilities acquired during tumor development. These include sustained proliferative signaling, resistance to cell death, evasion of growth suppressors, replicative immortality, angiogenesis, and the ability to invade and metastasize.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Concepts Covered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Biological Foundations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Hallmarks of cancer</li>
                <li>• Tumor microenvironment</li>
                <li>• Genetic and epigenetic alterations</li>
                <li>• Clonal evolution</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Clinical Applications</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Carcinogenesis and risk factors</li>
                <li>• Tumor immunology</li>
                <li>• Immune surveillance</li>
                <li>• Therapeutic implications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-lg">Learning Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed mb-3">
            By the end of this chapter, clinicians and students will understand:
          </p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              The biological and conceptual foundation for understanding cancer pathophysiology
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              The rationale behind diagnostic and therapeutic strategies in modern oncology
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              How tumor immunology insights have led to breakthrough immunotherapies
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              The multifactorial nature of carcinogenesis and prevention strategies
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntroductionToOncology;