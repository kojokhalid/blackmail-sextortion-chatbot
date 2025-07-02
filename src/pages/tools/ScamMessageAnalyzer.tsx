import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Upload, 
  MessageSquare,
  Eye,
  Brain,
  Zap,
  Trash2
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

interface ScamAnalysis {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  indicators: {
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    found: boolean;
  }[];
  recommendations: string[];
  messageType: string;
}

const ScamMessageAnalyzer = () => {
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Predefined scam indicators for analysis
  const scamIndicators = [
    {
      type: "Urgency Language",
      keywords: ["urgent", "immediately", "now", "hurry", "expire", "limited time"],
      description: "Uses urgent language to pressure quick action",
      severity: "medium" as const
    },
    {
      type: "Money Requests",
      keywords: ["send money", "mobile money", "bank transfer", "payment", "fee", "charges"],
      description: "Requests money or financial information",
      severity: "high" as const
    },
    {
      type: "Personal Information",
      keywords: ["password", "pin", "otp", "verification code", "login", "account details"],
      description: "Asks for sensitive personal information",
      severity: "high" as const
    },
    {
      type: "Threats",
      keywords: ["arrest", "police", "legal action", "consequences", "trouble", "expose"],
      description: "Contains threats or intimidation",
      severity: "high" as const
    },
    {
      type: "Suspicious Links",
      keywords: ["click here", "verify account", "update profile", "http://", "bit.ly"],
      description: "Contains suspicious links or requests to click",
      severity: "medium" as const
    },
    {
      type: "Prize/Lottery Scam",
      keywords: ["won", "lottery", "prize", "congratulations", "winner", "claim"],
      description: "Claims you've won something unexpectedly",
      severity: "medium" as const
    },
    {
      type: "Romance Scam",
      keywords: ["love", "relationship", "meeting", "lonely", "photos", "video call"],
      description: "Romantic or relationship-focused content from unknown sender",
      severity: "medium" as const
    },
    {
      type: "Authority Impersonation",
      keywords: ["bank", "government", "police", "official", "ministry", "service"],
      description: "Claims to be from official organizations",
      severity: "high" as const
    }
  ];

  const analyzeMessage = async () => {
    if (!message.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const messageText = message.toLowerCase();
      const foundIndicators = scamIndicators.map(indicator => ({
        ...indicator,
        found: indicator.keywords.some(keyword => messageText.includes(keyword))
      }));

      const highRiskCount = foundIndicators.filter(i => i.found && i.severity === 'high').length;
      const mediumRiskCount = foundIndicators.filter(i => i.found && i.severity === 'medium').length;
      
      let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
      let confidence = 65;

      if (highRiskCount >= 2) {
        riskLevel = 'critical';
        confidence = 90 + Math.min(highRiskCount * 2, 10);
      } else if (highRiskCount >= 1) {
        riskLevel = 'high';
        confidence = 80 + Math.min(mediumRiskCount * 3, 15);
      } else if (mediumRiskCount >= 2) {
        riskLevel = 'medium';
        confidence = 70 + Math.min(mediumRiskCount * 2, 20);
      } else if (mediumRiskCount >= 1) {
        riskLevel = 'medium';
        confidence = 60 + Math.min(mediumRiskCount * 5, 25);
      }

      // Generate recommendations based on findings
      const recommendations = [];
      if (riskLevel === 'critical' || riskLevel === 'high') {
        recommendations.push("🚨 Do NOT respond to this message");
        recommendations.push("🚫 Do not click any links or download attachments");
        recommendations.push("📞 Report this to Ghana Police Cybercrime Unit");
        recommendations.push("🗑️ Delete the message immediately");
      } else if (riskLevel === 'medium') {
        recommendations.push("⚠️ Be extremely cautious with this message");
        recommendations.push("🔍 Verify the sender's identity through official channels");
        recommendations.push("❌ Do not provide personal information");
      } else {
        recommendations.push("✅ Message appears relatively safe");
        recommendations.push("🛡️ Still exercise normal online caution");
      }

      // Determine message type
      let messageType = "General Message";
      if (foundIndicators.some(i => i.type === "Money Requests" && i.found)) {
        messageType = "Financial Scam";
      } else if (foundIndicators.some(i => i.type === "Romance Scam" && i.found)) {
        messageType = "Romance Scam";
      } else if (foundIndicators.some(i => i.type === "Authority Impersonation" && i.found)) {
        messageType = "Authority Impersonation";
      } else if (foundIndicators.some(i => i.type === "Prize/Lottery Scam" && i.found)) {
        messageType = "Lottery/Prize Scam";
      }

      setAnalysis({
        riskLevel,
        confidence,
        indicators: foundIndicators,
        recommendations,
        messageType
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return { bg: 'bg-green-50 dark:bg-green-950', border: 'border-green-500', text: 'text-green-700 dark:text-green-300' };
      case 'medium':
        return { bg: 'bg-yellow-50 dark:bg-yellow-950', border: 'border-yellow-500', text: 'text-yellow-700 dark:text-yellow-300' };
      case 'high':
        return { bg: 'bg-orange-50 dark:bg-orange-950', border: 'border-orange-500', text: 'text-orange-700 dark:text-orange-300' };
      case 'critical':
        return { bg: 'bg-red-50 dark:bg-red-950', border: 'border-red-500', text: 'text-red-700 dark:text-red-300' };
      default:
        return { bg: 'bg-muted', border: 'border-muted', text: 'text-muted-foreground' };
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'medium':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'high':
        return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      case 'critical':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Shield className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAnalysis = () => {
    setMessage("");
    setAnalysis(null);
    setUploadedImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <BlurFade delay={0.1}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Scam Message Analyzer</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload or paste suspicious messages to analyze them for potential scam indicators using AI-powered detection.
          </p>
        </div>
      </BlurFade>

      {/* Input Section */}
      <BlurFade delay={0.2}>
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Message Input
            </CardTitle>
            <CardDescription>
              Paste the suspicious message text or upload a screenshot for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Text Input */}
            <div>
              <Textarea
                placeholder="Paste the suspicious message here... (WhatsApp, SMS, Email, etc.)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="border-2 border-dashed border-muted rounded-lg p-6">
              <div className="text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Or upload a screenshot of the message
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    Choose Image
                  </label>
                </Button>
              </div>
              
              {uploadedImage && (
                <div className="mt-4 text-center">
                  <img
                    src={uploadedImage}
                    alt="Uploaded message"
                    className="max-w-full max-h-40 mx-auto rounded border"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Image uploaded successfully
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={analyzeMessage}
                disabled={!message.trim() && !uploadedImage || isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze Message
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={clearAnalysis}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
          <BorderBeam size={60} duration={10} />
        </Card>
      </BlurFade>

      {/* Analysis Results */}
      {analysis && (
        <BlurFade delay={0.3}>
          <div className="space-y-6">
            {/* Risk Assessment */}
            <Card className={`relative overflow-hidden border-2 ${getRiskColor(analysis.riskLevel).border} ${getRiskColor(analysis.riskLevel).bg}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {getRiskIcon(analysis.riskLevel)}
                  <div>
                    <div className="flex items-center gap-2">
                      Risk Level: <Badge variant="outline" className={getRiskColor(analysis.riskLevel).text}>
                        {analysis.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm font-normal text-muted-foreground">
                      Message Type: {analysis.messageType}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Confidence Score</span>
                      <span className="text-sm font-bold">{analysis.confidence}%</span>
                    </div>
                    <Progress value={analysis.confidence} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Indicators Found */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Scam Indicators Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.indicators.filter(indicator => indicator.found).map((indicator, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        indicator.severity === 'high' 
                          ? 'border-red-200 bg-red-50 dark:bg-red-950' 
                          : 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {indicator.severity === 'high' ? (
                          <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        )}
                        <div>
                          <div className="font-medium text-sm">{indicator.type}</div>
                          <div className="text-xs text-muted-foreground">{indicator.description}</div>
                        </div>
                        <Badge variant="outline" className="ml-auto text-xs">
                          {indicator.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {analysis.indicators.filter(indicator => indicator.found).length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      No major scam indicators detected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-lg">{recommendation.charAt(0)}</span>
                      <span className="text-sm">{recommendation.slice(1)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      )}
    </div>
  );
};

export default ScamMessageAnalyzer;
