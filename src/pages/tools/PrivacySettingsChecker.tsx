import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  Users, 
  Smartphone,
  RefreshCw,
  Download
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

interface PlatformCheck {
  platform: string;
  icon: React.ElementType;
  checks: {
    id: string;
    name: string;
    description: string;
    status: 'secure' | 'warning' | 'danger' | 'unchecked';
    completed: boolean;
  }[];
}

const PrivacySettingsChecker = () => {
  const [platforms, setPlatforms] = useState<PlatformCheck[]>([
    {
      platform: "WhatsApp",
      icon: Smartphone,
      checks: [
        {
          id: "whatsapp-last-seen",
          name: "Last Seen Privacy",
          description: "Control who can see when you were last online",
          status: 'unchecked',
          completed: false
        },
        {
          id: "whatsapp-profile-photo",
          name: "Profile Photo Privacy",
          description: "Limit who can see your profile picture",
          status: 'unchecked',
          completed: false
        },
        {
          id: "whatsapp-status",
          name: "Status Privacy",
          description: "Control who can see your status updates",
          status: 'unchecked',
          completed: false
        },
        {
          id: "whatsapp-groups",
          name: "Group Privacy",
          description: "Control who can add you to groups",
          status: 'unchecked',
          completed: false
        },
        {
          id: "whatsapp-read-receipts",
          name: "Read Receipts",
          description: "Blue ticks showing message read status",
          status: 'unchecked',
          completed: false
        }
      ]
    },
    {
      platform: "Facebook",
      icon: Users,
      checks: [
        {
          id: "facebook-profile-visibility",
          name: "Profile Visibility",
          description: "Who can see your profile information",
          status: 'unchecked',
          completed: false
        },
        {
          id: "facebook-friend-requests",
          name: "Friend Requests",
          description: "Who can send you friend requests",
          status: 'unchecked',
          completed: false
        },
        {
          id: "facebook-posts-privacy",
          name: "Posts Privacy",
          description: "Default privacy for your posts",
          status: 'unchecked',
          completed: false
        },
        {
          id: "facebook-tagging",
          name: "Photo Tagging",
          description: "Control who can tag you in photos",
          status: 'unchecked',
          completed: false
        },
        {
          id: "facebook-location",
          name: "Location Sharing",
          description: "Control location data sharing",
          status: 'unchecked',
          completed: false
        }
      ]
    },
    {
      platform: "Instagram",
      icon: Eye,
      checks: [
        {
          id: "instagram-account-privacy",
          name: "Account Privacy",
          description: "Private vs public account settings",
          status: 'unchecked',
          completed: false
        },
        {
          id: "instagram-story-privacy",
          name: "Story Privacy",
          description: "Who can see your stories",
          status: 'unchecked',
          completed: false
        },
        {
          id: "instagram-dm-privacy",
          name: "Direct Message Privacy",
          description: "Who can send you direct messages",
          status: 'unchecked',
          completed: false
        },
        {
          id: "instagram-activity-status",
          name: "Activity Status",
          description: "Show when you're active",
          status: 'unchecked',
          completed: false
        },
        {
          id: "instagram-location",
          name: "Location Services",
          description: "Location sharing in posts",
          status: 'unchecked',
          completed: false
        }
      ]
    }
  ]);

  const updateCheckStatus = (platformIndex: number, checkId: string, status: 'secure' | 'warning' | 'danger') => {
    setPlatforms(prev => prev.map((platform, pIndex) => {
      if (pIndex === platformIndex) {
        return {
          ...platform,
          checks: platform.checks.map(check => {
            if (check.id === checkId) {
              return { ...check, status, completed: true };
            }
            return check;
          })
        };
      }
      return platform;
    }));
  };

  const getOverallScore = () => {
    const totalChecks = platforms.reduce((total, platform) => total + platform.checks.length, 0);
    const completedChecks = platforms.reduce((total, platform) => 
      total + platform.checks.filter(check => check.completed).length, 0
    );
    const secureChecks = platforms.reduce((total, platform) => 
      total + platform.checks.filter(check => check.status === 'secure').length, 0
    );
    
    return {
      completion: Math.round((completedChecks / totalChecks) * 100),
      security: completedChecks > 0 ? Math.round((secureChecks / completedChecks) * 100) : 0,
      totalChecks,
      completedChecks,
      secureChecks
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'danger':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-muted rounded-full" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
        return 'border-green-500 bg-green-50 dark:bg-green-950';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'danger':
        return 'border-red-500 bg-red-50 dark:bg-red-950';
      default:
        return 'border-muted bg-muted/10';
    }
  };

  const score = getOverallScore();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <BlurFade delay={0.1}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Privacy Settings Checker</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Audit your social media privacy settings to ensure you're protected from potential threats and unwanted contact.
          </p>
        </div>
      </BlurFade>

      {/* Overall Score */}
      <BlurFade delay={0.2}>
        <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Your Privacy Score</CardTitle>
            <CardDescription>
              Complete all checks to get your comprehensive privacy assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{score.completion}%</div>
                <div className="text-sm text-muted-foreground">Completion</div>
                <Progress value={score.completion} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{score.security}%</div>
                <div className="text-sm text-muted-foreground">Security Score</div>
                <Progress value={score.security} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {score.completedChecks}/{score.totalChecks}
                </div>
                <div className="text-sm text-muted-foreground">Checks Complete</div>
              </div>
            </div>
          </CardContent>
          <BorderBeam size={100} duration={12} />
        </Card>
      </BlurFade>

      {/* Platform Checks */}
      <div className="space-y-6">
        {platforms.map((platform, platformIndex) => (
          <BlurFade key={platform.platform} delay={0.3 + platformIndex * 0.1}>
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <platform.icon className="w-6 h-6" />
                  {platform.platform} Privacy Settings
                  <Badge variant="outline">
                    {platform.checks.filter(c => c.completed).length}/{platform.checks.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Review and update your {platform.platform} privacy settings for maximum protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platform.checks.map((check) => (
                    <div
                      key={check.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${getStatusColor(check.status)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(check.status)}
                            <h4 className="font-semibold text-foreground">{check.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {check.description}
                          </p>
                          
                          {!check.completed && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCheckStatus(platformIndex, check.id, 'secure')}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Secure
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCheckStatus(platformIndex, check.id, 'warning')}
                                className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                              >
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Needs Review
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCheckStatus(platformIndex, check.id, 'danger')}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Not Secure
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Actions */}
      <BlurFade delay={0.6}>
        <Card className="border-0 bg-muted/20">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  // Reset all checks
                  setPlatforms(prev => prev.map(platform => ({
                    ...platform,
                    checks: platform.checks.map(check => ({
                      ...check,
                      status: 'unchecked' as const,
                      completed: false
                    }))
                  })));
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Assessment
              </Button>
              <Button
                size="lg"
                disabled={score.completedChecks === 0}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
};

export default PrivacySettingsChecker;
