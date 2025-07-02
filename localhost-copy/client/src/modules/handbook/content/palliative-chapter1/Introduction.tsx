import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Shield, Target, Book, Clock } from 'lucide-react';

const PalliativeCareIntroduction: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Chapter 1: Foundations of Palliative Care
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Understanding the philosophy, principles, and practice of palliative care across the continuum of serious illness
        </p>
        <div className="flex justify-center space-x-2">
          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
            <Heart className="w-3 h-3 mr-1" />
            Compassionate Care
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Users className="w-3 h-3 mr-1" />
            Family-Centered
          </Badge>
        </div>
      </div>

      {/* Introduction */}
      <Card className="border-l-4 border-l-rose-500">
        <CardHeader>
          <CardTitle className="text-rose-700 dark:text-rose-300">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Palliative care is an essential component of modern healthcare, focusing on the relief of suffering 
            and the enhancement of quality of life for patients facing serious illness. It extends beyond the 
            treatment of disease to address the physical, emotional, psychological, social, and spiritual needs 
            of patients and their families.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            As such, palliative care represents not just a set of clinical practices, but a holistic philosophy 
            that recognizes the inherent dignity of each person throughout their illness journey.
          </p>
        </CardContent>
      </Card>

      {/* Core Values */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
            <Shield className="w-5 h-5 mr-2" />
            Core Values of Palliative Care
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-l-rose-400 pl-4">
                <h4 className="font-semibold text-rose-700 dark:text-rose-300 mb-1">Relief of Suffering</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Addressing physical, emotional, spiritual, and existential distress across all dimensions
                </p>
              </div>
              
              <div className="border-l-4 border-l-blue-400 pl-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Affirmation of Life</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recognizing life as valuable and meaningful at every stage, including end of life
                </p>
              </div>
              
              <div className="border-l-4 border-l-green-400 pl-4">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">Whole-Person Care</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Addressing physical, psychological, social, and spiritual dimensions of illness
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-l-purple-400 pl-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Family-Centered Approach</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Extending care to family members and caregivers as essential partners
                </p>
              </div>
              
              <div className="border-l-4 border-l-orange-400 pl-4">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-1">Communication Excellence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Honest, compassionate dialogue about goals, values, and treatment options
                </p>
              </div>
              
              <div className="border-l-4 border-l-teal-400 pl-4">
                <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-1">Interdisciplinary Care</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Collaborative team approach addressing multiple dimensions of need
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chapter Structure */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-rose-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-rose-700 dark:text-rose-300">
              1.1 Definition and Scope
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              WHO definition, principles of palliative care, and distinction from hospice care
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Target className="w-3 h-3 mr-1" />
                Core principles and philosophy
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Users className="w-3 h-3 mr-1" />
                Patient and family-centered approach
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
              1.2 History and Evolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              From ancient caregiving traditions to modern hospice movement and specialty recognition
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                Dame Cicely Saunders and St. Christopher's
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Book className="w-3 h-3 mr-1" />
                WHO definitions and global expansion
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-700 dark:text-green-300">
              1.3 Models of Care Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Primary vs specialty care, inpatient, outpatient, and home-based models
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Heart className="w-3 h-3 mr-1" />
                Primary and specialty palliative care
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Shield className="w-3 h-3 mr-1" />
                Care settings and coordination
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Concepts */}
      <Card className="bg-gradient-to-r from-rose-50 to-blue-50 dark:from-rose-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Foundational Understanding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            This chapter provides essential knowledge for understanding palliative care as both a philosophy 
            and clinical practice, establishing the groundwork for:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Clinical Applications</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Symptom assessment and management</li>
                <li>• Communication and shared decision-making</li>
                <li>• Advance care planning processes</li>
                <li>• Family support and caregiver education</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">System Integration</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Primary and specialty care coordination</li>
                <li>• Interdisciplinary team collaboration</li>
                <li>• Care transitions and continuity</li>
                <li>• Quality improvement initiatives</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distinctions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-700 dark:text-purple-300">
            Key Distinctions and Clarifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">What Palliative Care IS</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Appropriate at any stage of serious illness</li>
                <li>• Compatible with curative and life-prolonging treatments</li>
                <li>• Focused on quality of life and symptom management</li>
                <li>• Family-centered and culturally sensitive</li>
                <li>• Based on patient goals and values</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">What Palliative Care is NOT</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Only for patients who are dying</li>
                <li>• Limited to cancer patients</li>
                <li>• "Giving up" on treatment</li>
                <li>• The same as hospice care</li>
                <li>• Hastening or prolonging death</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-2 border-dashed border-rose-300 dark:border-rose-600">
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Begin Your Journey in Palliative Care
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Whether you're a clinician seeking to integrate palliative principles into practice, or learning about 
            this essential field, these foundations provide the conceptual framework for compassionate, 
            evidence-based care.
          </p>
          <Badge className="bg-rose-600 text-white hover:bg-rose-700">
            Explore Section 1.1: Definition and Scope
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default PalliativeCareIntroduction;