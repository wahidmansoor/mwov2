import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Heart, Globe, Award, BookOpen, TrendingUp } from 'lucide-react';

const HistoryEvolution: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          1.2 History and Evolution
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          From ancient traditions of caring for the sick and dying to the modern hospice movement 
          and specialty recognition
        </p>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Clock className="w-3 h-3 mr-1" />
          Historical Perspective
        </Badge>
      </div>

      {/* Introduction */}
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader>
          <CardTitle className="text-amber-700 dark:text-amber-300">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            The evolution of palliative care reflects a long-standing human response to suffering, illness, 
            and death. While the formal discipline of palliative medicine is relatively modern, the core 
            tenets—compassion, comfort, dignity—are deeply rooted in history. From ancient caregiving 
            traditions to the hospice movement and the emergence of a medical specialty, palliative care 
            has developed as a response to the growing realization that technological medicine alone cannot 
            meet all the needs of seriously ill patients.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="ancient-traditions" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ancient-traditions" className="text-xs">Ancient Traditions</TabsTrigger>
          <TabsTrigger value="modern-hospice" className="text-xs">Modern Hospice</TabsTrigger>
          <TabsTrigger value="global-spread" className="text-xs">Global Spread</TabsTrigger>
          <TabsTrigger value="medical-specialty" className="text-xs">Medical Specialty</TabsTrigger>
          <TabsTrigger value="modern-trends" className="text-xs">Modern Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="ancient-traditions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700 dark:text-purple-300">
                <Heart className="w-5 h-5 mr-2" />
                Ancient Traditions of Caring for the Sick and Dying
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  Long before the advent of modern medicine, civilizations and religious communities practiced 
                  compassionate care for the sick and dying. These traditions laid the spiritual and moral 
                  foundation for what we now recognize as palliative care.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Ancient Greek and Roman Traditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Emphasized hospitality and mercy, often tied to spiritual and community obligations
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• <strong>Hippocratic Oath:</strong> "First, do no harm" principle</li>
                        <li>• <strong>Xenodochia:</strong> Early hospitals for strangers and pilgrims</li>
                        <li>• <strong>Community care:</strong> Civic duty to care for the sick</li>
                        <li>• <strong>Philosophical approach:</strong> Stoic acceptance of suffering</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-orange-700 dark:text-orange-300">
                      Buddhist and Eastern Traditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Buddhist monasteries in Asia offered rest and solace to the dying as part of spiritual mandate
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• <strong>Compassion (Karuna):</strong> Central Buddhist principle</li>
                        <li>• <strong>Monastery care:</strong> Temples as places of healing</li>
                        <li>• <strong>Meditation practices:</strong> Pain and suffering management</li>
                        <li>• <strong>Mindful dying:</strong> Preparation for death as spiritual practice</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      Islamic Traditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Islamic teachings incorporated care for the dying into religious practice
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• <strong>Bimaristan:</strong> Early Islamic hospitals (8th century)</li>
                        <li>• <strong>Charitable duty:</strong> Zakat obligation to care for sick</li>
                        <li>• <strong>Holistic care:</strong> Physical, mental, and spiritual healing</li>
                        <li>• <strong>End-of-life rituals:</strong> Spiritual preparation for death</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-900/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      Christian Medieval Hospices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Early Christian hospices established along pilgrimage routes in medieval Europe
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• <strong>Hospitaller orders:</strong> Knights caring for pilgrims</li>
                        <li>• <strong>Monasteries:</strong> Infirmaries for monks and travelers</li>
                        <li>• <strong>Charitable works:</strong> Christian duty to care for poor and sick</li>
                        <li>• <strong>Spiritual care:</strong> Sacraments and last rites</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Common Threads in Ancient Traditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Shared Values</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Compassion and mercy</li>
                        <li>• Community responsibility</li>
                        <li>• Spiritual accompaniment</li>
                        <li>• Dignity in suffering</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Care Approaches</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Holistic view of person</li>
                        <li>• Presence and accompaniment</li>
                        <li>• Family and community involvement</li>
                        <li>• Integration of spiritual care</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Legacy</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Foundation for modern hospice</li>
                        <li>• Emphasis on comfort care</li>
                        <li>• Interdisciplinary approach</li>
                        <li>• Respect for dying process</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modern-hospice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-rose-700 dark:text-rose-300">
                <Award className="w-5 h-5 mr-2" />
                The Birth of the Modern Hospice Movement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  The modern development of palliative care began in the mid-20th century, led by pioneers who 
                  recognized that terminally ill patients were being neglected by hospital-based, cure-oriented medicine.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Dame Cicely Saunders (1918–2005)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center mb-4">
                      <Badge className="bg-blue-600 text-white">Founder of Modern Hospice Movement</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Background:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        British nurse, social worker, and physician widely regarded as the founder of the modern hospice movement
                      </p>
                      
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Key Contributions:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Founded St. Christopher's Hospice in London (1967)</li>
                        <li>• Introduced concept of "total pain"</li>
                        <li>• Integrated research with clinical care</li>
                        <li>• Emphasized dignity in dying</li>
                        <li>• Developed interdisciplinary team model</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      St. Christopher's Hospice (1967)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      The first institution to integrate pain and symptom control, psychological and spiritual 
                      support, and clinical research into one model of care.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Innovations:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Regular opioid dosing for pain control</li>
                        <li>• 24/7 nursing presence</li>
                        <li>• Family involvement in care</li>
                        <li>• Bereavement support programs</li>
                        <li>• Medical student and resident training</li>
                        <li>• Research into pain management</li>
                      </ul>
                      
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Philosophy:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Dying patients deserved the same level of medical, emotional, and human care as 
                        anyone else in the healthcare system.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    The Concept of "Total Pain"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded mb-4">
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      Dame Cicely Saunders introduced the revolutionary concept of "total pain," recognizing that 
                      suffering encompasses more than physical symptoms.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="bg-red-50 dark:bg-red-900/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-red-700 dark:text-red-300">Physical Pain</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Nociceptive pain</li>
                          <li>• Neuropathic pain</li>
                          <li>• Visceral discomfort</li>
                          <li>• Procedural pain</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-blue-700 dark:text-blue-300">Emotional Pain</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Anxiety and fear</li>
                          <li>• Depression</li>
                          <li>• Grief and loss</li>
                          <li>• Anger and frustration</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-green-700 dark:text-green-300">Social Pain</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Isolation and loneliness</li>
                          <li>• Financial burden</li>
                          <li>• Role changes</li>
                          <li>• Family conflict</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-amber-50 dark:bg-amber-900/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-amber-700 dark:text-amber-300">Spiritual Pain</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Loss of meaning</li>
                          <li>• Existential distress</li>
                          <li>• Religious concerns</li>
                          <li>• Unfinished business</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global-spread" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                <Globe className="w-5 h-5 mr-2" />
                Global Spread of Hospice and Early Palliative Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  Following the establishment of St. Christopher's, the hospice model spread rapidly across 
                  the globe, adapting to different healthcare systems and cultural contexts.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">
                      1970s–1980s: International Expansion
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Key Developments:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Community and inpatient hospices across U.K.</li>
                        <li>• First U.S. hospice: Connecticut Hospice (1974)</li>
                        <li>• Canadian hospice movement begins</li>
                        <li>• Australian hospice programs established</li>
                        <li>• European expansion across multiple countries</li>
                      </ul>
                      
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Common Features:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Interdisciplinary care teams</li>
                        <li>• Family involvement and support</li>
                        <li>• Home-based service options</li>
                        <li>• Volunteer program integration</li>
                        <li>• Bereavement support services</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      United States: Medicare Hospice Benefit (1982)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Significance:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Hospice gained formal recognition with introduction of Medicare Hospice Benefit, 
                        creating structure for reimbursement and standardized eligibility.
                      </p>
                      
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Requirements:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Physician certification of ≤6 months prognosis</li>
                        <li>• Election of comfort care over curative treatment</li>
                        <li>• Comprehensive interdisciplinary services</li>
                        <li>• 24/7 on-call availability</li>
                        <li>• Bereavement support for 13 months</li>
                      </ul>
                      
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Impact:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Standardized hospice care across the U.S. and provided sustainable funding model
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">
                    International Hospice and Palliative Care Association (IAHPC)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Founded: 1982</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Global association promoting hospice and palliative care development worldwide
                      </p>
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Mission:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Advance hospice and palliative care globally</li>
                        <li>• Support developing programs</li>
                        <li>• Promote best practices</li>
                        <li>• Advocate for policy change</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Key Activities:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Educational conferences and training</li>
                        <li>• Resource development and sharing</li>
                        <li>• Research collaboration</li>
                        <li>• Advocacy for opioid access</li>
                        <li>• Cultural adaptation guidelines</li>
                        <li>• Quality standards development</li>
                      </ul>
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2 mt-3">Impact:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Facilitated global spread of palliative care principles and practices
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-specialty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                <BookOpen className="w-5 h-5 mr-2" />
                Emergence of Palliative Care as a Medical Specialty
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  As healthcare evolved and life-prolonging technologies advanced, the need for specialized 
                  care to address symptom burden and quality of life grew, leading to formal recognition 
                  of palliative medicine as a medical specialty.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      WHO Definition Evolution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">1990 Definition:</h4>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-l-blue-400">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Initial WHO definition emphasized cancer care and end-of-life focus
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">2002 Updated Definition:</h4>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-l-green-400">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Expanded scope beyond cancer, emphasized early integration and broad application
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded">
                      <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">Key Changes:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• "Life-threatening illness" vs. "terminal disease"</li>
                        <li>• Early identification and integration</li>
                        <li>• Prevention and relief of suffering</li>
                        <li>• Comprehensive assessment approach</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      Specialty Recognition Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="border-l-4 border-l-purple-400 pl-4">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-300">2006: U.S. Board Recognition</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          American Board of Medical Specialties recognized <strong>Hospice and Palliative Medicine</strong> 
                          as a subspecialty available to multiple primary specialties
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-l-blue-400 pl-4">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">Global Fellowship Programs</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Residency and fellowship programs established worldwide to train specialists in palliative care
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-l-green-400 pl-4">
                        <h4 className="font-semibold text-green-800 dark:text-green-300">National Guidelines and Standards</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Development of national palliative care guidelines, quality metrics, and certification processes
                        </p>
                      </div>
                    </div>

                    <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                        Academic and Research Development
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• University palliative care programs and chairs</li>
                        <li>• Peer-reviewed journals dedicated to palliative care</li>
                        <li>• Research funding from national institutes</li>
                        <li>• Evidence-based practice guidelines</li>
                        <li>• Quality improvement initiatives</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 dark:bg-amber-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-700 dark:text-amber-300">
                      Professional Organizations and Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Key Organizations:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• American Academy of Hospice and Palliative Medicine (AAHPM)</li>
                          <li>• Hospice and Palliative Nurses Association (HPNA)</li>
                          <li>• European Association for Palliative Care (EAPC)</li>
                          <li>• International Association for Hospice and Palliative Care (IAHPC)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Standards Development:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Clinical practice guidelines</li>
                          <li>• Quality metrics and indicators</li>
                          <li>• Competency frameworks</li>
                          <li>• Certification processes</li>
                          <li>• Continuing education requirements</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modern-trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-teal-700 dark:text-teal-300">
                <TrendingUp className="w-5 h-5 mr-2" />
                Modern Trends and Global Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  Palliative care is now recognized as a global health priority with ongoing efforts to improve 
                  access, quality, and integration across healthcare systems worldwide.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Global Expansion and WHO Priority
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">Current Status:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Over <strong>100 countries</strong> have palliative care services</li>
                      <li>• WHO includes palliative care in Universal Health Coverage</li>
                      <li>• Integration into national health policies</li>
                      <li>• Global health system priority</li>
                    </ul>
                    
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">Challenges:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Wide variation in access and quality</li>
                      <li>• Limited opioid availability in many regions</li>
                      <li>• Healthcare infrastructure gaps</li>
                      <li>• Training and workforce shortages</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">
                      Lancet Commission (2018)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h4 className="font-semibold text-red-800 dark:text-red-300">Key Findings:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      "Global Access to Palliative Care and Pain Relief" emphasized global inequity in access 
                      to basic palliative interventions
                    </p>
                    
                    <h4 className="font-semibold text-red-800 dark:text-red-300">Statistics:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• 25.5 million people die annually with serious suffering</li>
                      <li>• 80% lack access to opioid medications</li>
                      <li>• Most need is in low- and middle-income countries</li>
                      <li>• Economic burden of unrelieved suffering</li>
                    </ul>
                    
                    <h4 className="font-semibold text-red-800 dark:text-red-300">Recommendations:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Essential package of palliative care interventions</li>
                      <li>• Integration into health systems</li>
                      <li>• Workforce development and training</li>
                      <li>• Policy and regulatory reform</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">
                    Contemporary Developments and Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-green-700 dark:text-green-300">
                          Early Integration Models
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Concurrent with disease-directed care</li>
                          <li>• Outpatient palliative care clinics</li>
                          <li>• Embedded in specialty programs</li>
                          <li>• Primary palliative care training</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-orange-50 dark:bg-orange-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-orange-700 dark:text-orange-300">
                          Expanded Disease Focus
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Heart failure and cardiovascular disease</li>
                          <li>• Dementia and neurodegenerative diseases</li>
                          <li>• Kidney disease and organ failure</li>
                          <li>• Pediatric palliative care programs</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 dark:bg-purple-900/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-purple-700 dark:text-purple-300">
                          Technology Integration
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Telepalliative care platforms</li>
                          <li>• Mobile health applications</li>
                          <li>• Remote symptom monitoring</li>
                          <li>• Electronic health record integration</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-3">
                      COVID-19 Pandemic Impact
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-700 dark:text-gray-400 mb-1">Challenges:</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Visitor restrictions and isolation</li>
                          <li>• Delayed referrals and care</li>
                          <li>• Healthcare workforce strain</li>
                          <li>• Increased end-of-life care needs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-700 dark:text-gray-400 mb-1">Innovations:</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Rapid telehealth adoption</li>
                          <li>• Virtual family meetings</li>
                          <li>• Home-based care expansion</li>
                          <li>• Digital bereavement support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Conclusion */}
      <Card className="bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-900/20 dark:to-rose-900/20">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Conclusion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            The history of palliative care is a testament to the enduring human commitment to compassion in the 
            face of suffering. From ancient caregiving traditions to the modern interdisciplinary teams of today, 
            palliative care has evolved into a cornerstone of person-centered medicine. It fills a critical gap in 
            healthcare by addressing the needs of those for whom cure is not possible, or not the primary goal. 
            Understanding this evolution equips clinicians to appreciate the values, responsibilities, and potential 
            of palliative care in contemporary healthcare delivery.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryEvolution;