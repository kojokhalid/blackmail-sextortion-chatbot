import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Shield, 
  Smartphone, 
  Users, 
  Globe,
  ArrowRight,
  Award,
  Clock,
  PlayCircle,
  FileText,
  Download,
  Star
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  completed: boolean;
  locked: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface CourseProgress {
  totalModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  certificateEarned: boolean;
}

const DigitalLiteracyCourse = () => {
  const [courseProgress, setCourseProgress] = useState<CourseProgress>({
    totalModules: 8,
    completedModules: 2,
    totalLessons: 45,
    completedLessons: 12,
    certificateEarned: false
  });

  const [modules, setModules] = useState<CourseModule[]>([
    {
      id: "1",
      title: "Introduction to Digital Safety",
      description: "Understanding the digital landscape and common online threats in Ghana",
      duration: "45 minutes",
      lessons: 6,
      completed: true,
      locked: false,
      difficulty: "beginner"
    },
    {
      id: "2", 
      title: "Password Security & Account Protection",
      description: "Creating strong passwords and securing your online accounts",
      duration: "60 minutes",
      lessons: 8,
      completed: true,
      locked: false,
      difficulty: "beginner"
    },
    {
      id: "3",
      title: "Social Media Privacy Settings",
      description: "Configuring privacy settings on Facebook, WhatsApp, Instagram, and other platforms",
      duration: "90 minutes",
      lessons: 10,
      completed: false,
      locked: false,
      difficulty: "intermediate"
    },
    {
      id: "4",
      title: "Recognizing Online Scams",
      description: "Identifying common scam tactics including romance scams, lottery scams, and phishing",
      duration: "75 minutes",
      lessons: 9,
      completed: false,
      locked: false,
      difficulty: "intermediate"
    },
    {
      id: "5",
      title: "Mobile Money Security",
      description: "Protecting your mobile money accounts and conducting safe transactions",
      duration: "50 minutes",
      lessons: 7,
      completed: false,
      locked: true,
      difficulty: "intermediate"
    },
    {
      id: "6",
      title: "Handling Digital Harassment",
      description: "Responding to cyberbullying, blackmail, and online harassment",
      duration: "80 minutes",
      lessons: 11,
      completed: false,
      locked: true,
      difficulty: "advanced"
    },
    {
      id: "7",
      title: "Digital Evidence & Reporting",
      description: "Collecting evidence and reporting incidents to authorities",
      duration: "65 minutes",
      lessons: 8,
      completed: false,
      locked: true,
      difficulty: "advanced"
    },
    {
      id: "8",
      title: "Advanced Protection Strategies",
      description: "VPNs, encryption, and advanced security measures for high-risk individuals",
      duration: "95 minutes",
      lessons: 12,
      completed: false,
      locked: true,
      difficulty: "advanced"
    }
  ]);

  const markModuleComplete = (moduleId: string) => {
    setModules(prev => prev.map(module => {
      if (module.id === moduleId) {
        const updatedModule = { ...module, completed: true };
        
        // Unlock next module
        const currentIndex = parseInt(moduleId) - 1;
        if (currentIndex + 1 < prev.length) {
          const nextModule = prev[currentIndex + 1];
          nextModule.locked = false;
        }
        
        return updatedModule;
      }
      return module;
    }));

    // Update progress
    setCourseProgress(prev => ({
      ...prev,
      completedModules: prev.completedModules + 1,
      completedLessons: prev.completedLessons + (modules.find(m => m.id === moduleId)?.lessons ?? 0)
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const completionPercentage = Math.round((courseProgress.completedModules / courseProgress.totalModules) * 100);
  const lessonPercentage = Math.round((courseProgress.completedLessons / courseProgress.totalLessons) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <BlurFade delay={0.1}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Digital Literacy Course</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital safety education designed specifically for Ghanaians. Learn to protect yourself and your family online.
          </p>
        </div>
      </BlurFade>

      {/* Progress Overview */}
      <BlurFade delay={0.2}>
        <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Your Learning Progress</CardTitle>
            <CardDescription className="text-center">
              Track your progress through the digital literacy curriculum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{completionPercentage}%</div>
                <div className="text-sm text-muted-foreground mb-2">Course Complete</div>
                <Progress value={completionPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {courseProgress.completedModules}/{courseProgress.totalModules} modules
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{lessonPercentage}%</div>
                <div className="text-sm text-muted-foreground mb-2">Lessons Complete</div>
                <Progress value={lessonPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {courseProgress.completedLessons}/{courseProgress.totalLessons} lessons
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {courseProgress.certificateEarned ? '✓' : '○'}
                </div>
                <div className="text-sm text-muted-foreground mb-2">Certificate</div>
                <div className="text-xs text-muted-foreground">
                  {courseProgress.certificateEarned ? 'Earned!' : 'Complete course to earn'}
                </div>
              </div>
            </div>
          </CardContent>
          <BorderBeam size={100} duration={12} />
        </Card>
      </BlurFade>

      {/* Course Modules */}
      <div className="space-y-6">
        <BlurFade delay={0.3}>
          <h2 className="text-2xl font-bold text-foreground mb-6">Course Modules</h2>
        </BlurFade>

        {modules.map((module, index) => (
          <BlurFade key={module.id} delay={0.4 + index * 0.1}>
            <Card className={`relative overflow-hidden transition-all duration-300 ${
              module.locked 
                ? 'opacity-60 bg-muted/20' 
                : 'hover:shadow-lg'
            } ${
              module.completed 
                ? 'border-green-500 bg-green-50 dark:bg-green-950' 
                : ''
            }`}>
              {module.completed && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </div>
              )}
              
              {module.locked && (
                <div className="absolute top-4 right-4">
                  <Badge variant="outline">
                    <Lock className="w-3 h-3 mr-1" />
                    Locked
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      module.completed 
                        ? 'bg-green-500' 
                        : module.locked 
                          ? 'bg-muted' 
                          : 'bg-primary'
                    }`}>
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : module.locked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">
                        Module {index + 1}: {module.title}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" />
                          {module.lessons} lessons
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {module.description}
                </CardDescription>

                <div className="flex gap-2">
                  {!module.locked && !module.completed && (
                    <Button 
                      onClick={() => markModuleComplete(module.id)}
                      className="flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Start Module
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {module.completed && (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Review Module
                    </Button>
                  )}
                  
                  {!module.locked && (
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Notes
                    </Button>
                  )}
                </div>
              </CardContent>
              
              {!module.locked && (
                <BorderBeam size={40} duration={15} />
              )}
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Additional Resources */}
      <BlurFade delay={0.8}>
        <Card className="border-0 bg-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Course Resources
            </CardTitle>
            <CardDescription>
              Additional materials to support your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Course Handbook</div>
                    <div className="text-sm text-muted-foreground">Complete reference guide (PDF)</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Safety Checklist</div>
                    <div className="text-sm text-muted-foreground">Quick reference checklist</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Mobile App</div>
                    <div className="text-sm text-muted-foreground">Offline access to course content</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Discussion Forum</div>
                    <div className="text-sm text-muted-foreground">Connect with other learners</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Globe className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Certificate Section */}
      {completionPercentage === 100 && (
        <BlurFade delay={0.9}>
          <Card className="border-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
            <CardContent className="pt-6 text-center">
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                You've completed the Digital Literacy Course. Download your certificate to showcase your digital safety knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600">
                  <Award className="w-5 h-5 mr-2" />
                  Download Certificate
                </Button>
                <Button size="lg" variant="outline">
                  <Star className="w-5 h-5 mr-2" />
                  Rate Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}
    </div>
  );
};

export default DigitalLiteracyCourse;
