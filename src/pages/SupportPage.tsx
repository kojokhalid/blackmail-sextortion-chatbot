import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, Mail, MessageCircle, Clock, Shield, Users, AlertTriangle, CheckCircle } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

const SupportPage = () => {
  const supportOptions = [
    {
      title: "24/7 Crisis Support",
      description: "Immediate help for urgent situations and emergencies",
      icon: AlertTriangle,
      contact: "Call 191",
      availability: "Available 24/7",
      type: "emergency",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    },
    {
      title: "Counseling Services",
      description: "Professional counseling and emotional support",
      icon: Heart,
      contact: "+233 20 123 4567",
      availability: "Mon-Fri 9AM-6PM",
      type: "counseling",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    },
    {
      title: "Legal Aid",
      description: "Legal assistance and guidance for digital abuse cases",
      icon: Shield,
      contact: "legal@safeguard.com",
      availability: "Mon-Fri 8AM-5PM",
      type: "legal",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    },
    {
      title: "Peer Support",
      description: "Connect with trained peer supporters who understand your experience",
      icon: Users,
      contact: "peer@safeguard.com",
      availability: "Daily 2PM-10PM",
      type: "peer",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    }
  ];

  const resources = [
    {
      title: "Crisis Intervention Guide",
      description: "Step-by-step guide for handling crisis situations",
      downloadUrl: "/resources/crisis-guide.pdf"
    },
    {
      title: "Safety Planning Worksheet",
      description: "Create a personalized safety plan",
      downloadUrl: "/resources/safety-plan.pdf"
    },
    {
      title: "Support Group Directory",
      description: "Find local support groups in your area",
      downloadUrl: "/resources/support-groups.pdf"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <BlurFade delay={0.1}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Crisis Support & Counseling</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You are not alone. Get professional support, counseling, and resources to help you through difficult times.
          </p>
        </div>
      </BlurFade>

      {/* Emergency Banner */}
      <BlurFade delay={0.2}>
        <Card className="border-2 border-red-500 bg-red-50 dark:bg-red-950">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-lg font-bold text-red-700 dark:text-red-300">Emergency Assistance</h3>
                <p className="text-red-600 dark:text-red-400">
                  If you're in immediate danger, call the Ghana Police: <strong>191</strong> or <strong>999</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Support Options */}
      <div className="space-y-6">
        <BlurFade delay={0.3}>
          <h2 className="text-2xl font-bold text-foreground mb-6">Support Services</h2>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportOptions.map((option, index) => (
            <BlurFade key={index} delay={0.4 + index * 0.1}>
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <option.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold mb-2">
                        {option.title}
                      </CardTitle>
                      <Badge className={option.color}>
                        {option.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    {option.description}
                  </CardDescription>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {option.contact.includes('@') ? (
                        <Mail className="w-4 h-4 text-primary" />
                      ) : (
                        <Phone className="w-4 h-4 text-primary" />
                      )}
                      <span className="font-medium">{option.contact}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{option.availability}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </CardContent>
                <BorderBeam size={40} duration={15} />
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Resources */}
      <BlurFade delay={0.7}>
        <Card className="border-0 bg-muted/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Support Resources</CardTitle>
            <CardDescription>
              Download helpful resources and guides for crisis support and safety planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="p-4 bg-background rounded-lg border">
                  <h4 className="font-semibold mb-2">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Download PDF
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Additional Information */}
      <BlurFade delay={0.8}>
        <Card className="border-0 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold mb-4">Remember</h3>
            <div className="max-w-2xl mx-auto space-y-3 text-muted-foreground">
              <p>• You are not alone in this situation</p>
              <p>• What happened to you is not your fault</p>
              <p>• There are people who understand and want to help</p>
              <p>• Your safety and wellbeing are the top priority</p>
              <p>• Recovery is possible with the right support</p>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
};

export default SupportPage;
