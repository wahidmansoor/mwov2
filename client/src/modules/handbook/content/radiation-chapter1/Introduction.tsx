import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Target } from 'lucide-react';

const RadiationOncologyIntroduction: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Chapter 1: Fundamentals of Radiation Oncology
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          A comprehensive foundation in the essential scientific and conceptual frameworks of radiation oncology
        </p>
        <div className="flex justify-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <BookOpen className="w-3 h-3 mr-1" />
            Educational Content
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Target className="w-3 h-3 mr-1" />
            Evidence-Based
          </Badge>
        </div>
      </div>

      {/* Overview Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
            <BookOpen className="w-5 h-5 mr-2" />
            Chapter Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Radiation oncology is a vital discipline within the broader field of oncology, dedicated to the use of 
            ionizing radiation for the treatment of malignant and select benign diseases. Since its inception following 
            the discovery of X-rays and radioactivity in the late 19th century, the field has evolved into a highly 
            specialized and technologically advanced domain.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            This chapter combines fundamental principles of physics, biology, and clinical medicine to achieve 
            effective tumor control while minimizing toxicity to normal tissues.
          </p>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-green-700 dark:text-green-300">
            <Target className="w-5 h-5 mr-2" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Knowledge Goals</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Understand the historical evolution of radiation therapy
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Master basic radiation physics principles and dose concepts
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Comprehend radiation biology and cellular responses
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Clinical Applications</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Apply radiation therapy principles to treatment planning
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Understand dose-response relationships
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Integrate multidisciplinary care principles
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chapter Structure */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
              1.1 History and Evolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              From early X-ray discoveries to modern IMRT, IGRT, and particle therapy innovations
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                Key milestones from 1895 to present
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Users className="w-3 h-3 mr-1" />
                Technology evolution and clinical impact
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
              1.2 Basic Radiation Physics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Types of radiation, dose units, interactions with matter, and dosimetry principles
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                Photons, electrons, and particle beams
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Users className="w-3 h-3 mr-1" />
                Gy, cGy, BED, and EQD2 calculations
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-700 dark:text-green-300">
              1.3 Radiation Biology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              DNA damage mechanisms, cellular repair, and the Four R's of radiobiology
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                Direct and indirect radiation effects
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Users className="w-3 h-3 mr-1" />
                LET, RBE, and fractionation principles
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Concepts */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Foundation for Clinical Practice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            This chapter provides the intellectual foundation for advanced topics including:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Clinical Applications</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Treatment planning and dose optimization</li>
                <li>• Modality selection (photons vs particles)</li>
                <li>• Fractionation schedule design</li>
                <li>• Normal tissue dose constraints</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Advanced Concepts</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Integration with systemic therapy</li>
                <li>• Radiobiological modeling</li>
                <li>• Quality assurance protocols</li>
                <li>• Multidisciplinary team coordination</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ready to Begin Your Learning Journey?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Whether you're a trainee building foundational knowledge or a practicing clinician revisiting key principles,
            these fundamentals underpin the safe and effective use of radiation in cancer treatment.
          </p>
          <Badge className="bg-blue-600 text-white hover:bg-blue-700">
            Start with Section 1.1: History and Evolution
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default RadiationOncologyIntroduction;