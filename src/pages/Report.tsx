import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon, Shield, AlertTriangle, Phone, Lock, FileText, Upload, Check, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Meteors } from "@/components/ui/meteors";
import BlurFade from "@/components/ui/blur-fade";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    incidentType: "",
    description: "",
    platform: "",
    evidence: null as File | null,
    anonymous: false,
    urgent: false,
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAnonymousInfo, setShowAnonymousInfo] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const incidentTypes = [
    { value: "sextortion", label: "Sextortion" },
    { value: "blackmail", label: "Blackmail" },
    { value: "cyberbullying", label: "Cyberbullying" },
    { value: "identity_theft", label: "Identity Theft" },
    { value: "financial_fraud", label: "Financial Fraud" },
    { value: "romance_scam", label: "Romance Scam" },
    { value: "other", label: "Other" }
  ];

  const platforms = [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter/X" },
    { value: "snapchat", label: "Snapchat" },
    { value: "telegram", label: "Telegram" },
    { value: "dating_app", label: "Dating App" },
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS/Text Message" },
    { value: "other", label: "Other" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.anonymous) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    }

    if (!formData.incidentType) newErrors.incidentType = "Please select an incident type";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.description.length < 50) newErrors.description = "Please provide more details (minimum 50 characters)";
    if (!date) newErrors.date = "Please select the incident date";
    if (!formData.consent) newErrors.consent = "You must agree to the terms to submit the report";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for validation errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your backend
      console.log("Report submitted:", { ...formData, date });
      
      setShowSuccess(true);
      toast({
        title: "Report submitted successfully",
        description: "Your report has been received. We will follow up within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        incidentType: "",
        description: "",
        platform: "",
        evidence: null,
        anonymous: false,
        urgent: false,
        consent: false
      });
      setDate(undefined);
      
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-green-50 flex items-center justify-center p-4">
        <BlurFade delay={0.1}>
          <Card className="max-w-2xl w-full border-0 bg-card/50 backdrop-blur-sm text-center">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Report Submitted Successfully</h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Thank you for reporting this incident. Your report has been received and will be reviewed by our team. 
                {!formData.anonymous && " We will contact you within 24 hours."}
              </p>
              <div className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>What happens next?</AlertTitle>
                  <AlertDescription>
                    Your report will be forwarded to the Ghana Police Cybercrime Unit and our support team will begin working on your case immediately.
                  </AlertDescription>
                </Alert>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setShowSuccess(false)} variant="outline">
                    Submit Another Report
                  </Button>
                  <Button onClick={() => window.location.href = "https://chat.cysafeguard.com"} >
                    Get Support Chat
                  </Button>
                </div>
              </div>
            </CardContent>
            <BorderBeam size={100} duration={12} />
          </Card>
        </BlurFade>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-8 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
        <Meteors number={10} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1}>
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Secure & Confidential Reporting
            </Badge>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-syne leading-tight">
              Report a Digital Threat
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Your safety is our priority. Report incidents of sextortion, blackmail, or other digital threats securely. 
              All reports are handled confidentially by trained professionals.
            </p>
          </BlurFade>
        </div>
        
        <BorderBeam size={150} duration={15} />
      </section>

      {/* Emergency Alert */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 -mt-8 relative z-10">
        <BlurFade delay={0.4}>
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertTitle className="text-red-700 dark:text-red-400">Need Immediate Help?</AlertTitle>
            <AlertDescription className="text-red-600 dark:text-red-300">
              If you're in immediate danger, call Ghana Police Emergency: <strong>191</strong> or <strong>18555</strong>
              <br />
              For urgent digital threats, use our <a href="https://chat.cysafeguard.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">emergency chat</a>
            </AlertDescription>
          </Alert>
        </BlurFade>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-16">
        <BlurFade delay={0.5}>
          <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-3">
                <FileText className="w-6 h-6" />
                Incident Report Form
              </CardTitle>
              <CardDescription className="text-base">
                Please provide as much detail as possible. All information is encrypted and handled securely.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Anonymous Reporting Toggle */}
                <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="anonymous"
                    checked={formData.anonymous}
                    onCheckedChange={(checked: boolean) => {
                      handleInputChange("anonymous", checked);
                      setShowAnonymousInfo(!showAnonymousInfo);
                    }}
                  />
                  <div className="flex-1">
                    <Label htmlFor="anonymous" className="text-sm font-medium cursor-pointer">
                      Submit this report anonymously
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      We won't be able to follow up directly, but your report will still help authorities
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAnonymousInfo(!showAnonymousInfo)}
                  >
                    {showAnonymousInfo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                {showAnonymousInfo && (
                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertTitle>Anonymous Reporting</AlertTitle>
                    <AlertDescription>
                      Anonymous reports are still valuable for tracking patterns and helping other victims. 
                      However, we cannot provide direct follow-up or support without contact information.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Personal Information */}
                {!formData.anonymous && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                  </div>
                )}

                {/* Incident Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="incidentType">Type of Incident *</Label>
                    <Select
                      value={formData.incidentType}
                      onValueChange={(value) => handleInputChange("incidentType", value)}
                    >
                      <SelectTrigger className={errors.incidentType ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.incidentType && <p className="text-red-500 text-sm">{errors.incidentType}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform/Method Used</Label>
                    <Select
                      value={formData.platform}
                      onValueChange={(value) => handleInputChange("platform", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Where did this occur?" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform.value} value={platform.value}>
                            {platform.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="incidentDate">Date of Incident *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                            errors.date && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate);
                            if (errors.date) {
                              setErrors(prev => ({ ...prev, date: "" }));
                            }
                          }}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={formData.urgent}
                        onCheckedChange={(checked: boolean) => handleInputChange("urgent", checked)}
                      />
                      <Label htmlFor="urgent" className="text-sm font-medium cursor-pointer">
                        This is an urgent situation
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Detailed Description * 
                    <span className="text-xs text-muted-foreground ml-2">
                      ({formData.description.length}/50 minimum)
                    </span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Please describe what happened in as much detail as possible. Include dates, times, usernames, phone numbers, and any other relevant information."
                    className={cn("min-h-32", errors.description ? "border-red-500" : "")}
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  <p className="text-xs text-muted-foreground">
                    Include: What happened, when it happened, who was involved, what platforms were used, 
                    any demands made, and steps you've already taken.
                  </p>
                </div>

                {/* Evidence Upload */}
                <div className="space-y-2">
                  <Label htmlFor="evidence">Evidence (Screenshots, Messages, etc.)</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <Input
                      id="evidence"
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={(e) => handleInputChange("evidence", e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Label htmlFor="evidence" className="cursor-pointer">
                      <p className="text-sm text-muted-foreground">
                        Click to upload files or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, PDF, DOC up to 10MB
                      </p>
                    </Label>
                    {formData.evidence && (
                      <p className="text-sm text-green-600 mt-2">
                        File selected: {formData.evidence.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked: boolean) => handleInputChange("consent", checked)}
                      className={errors.consent ? "border-red-500" : ""}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="consent" className="text-sm cursor-pointer">
                        I consent to the processing of this report *
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I understand that this report may be shared with law enforcement agencies 
                        including the Ghana Police Service Cybercrime Unit for investigation purposes.
                      </p>
                    </div>
                  </div>
                  {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Submit Secure Report
                  </>
                )}
              </Button>
            </CardFooter>
            
            <BorderBeam size={100} duration={15} />
          </Card>
        </BlurFade>

        {/* Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <BlurFade delay={0.6}>
            <MagicCard className="p-6 text-center border-0 bg-card/30 backdrop-blur-sm">
              <Phone className="w-8 h-8 mx-auto mb-3 text-red-500" />
              <h3 className="font-semibold mb-2 text-card-foreground">Emergency Help</h3>
              <p className="text-sm text-muted-foreground mb-3">
                If you're in immediate danger
              </p>
              <Button size="sm" variant="outline" className="w-full text-card-foreground" onClick={() => window.location.href = "tel:191"}>
                Call 191 or 18555
              </Button>
            </MagicCard>
          </BlurFade>
          
        
          
          <BlurFade delay={0.8}>
            <MagicCard className="p-6 text-center border-0 bg-card/30 backdrop-blur-sm">
              <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-green-500" />
              <h3 className="font-semibold mb-2 text-card-foreground">Get Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Talk to our trained counselors
              </p>
              <Button size="sm" variant="outline" className="w-full text-card-foreground">
                Start Chat
              </Button>
            </MagicCard>
          </BlurFade>
            <BlurFade delay={0.7}>
            <MagicCard className="p-6 text-center border-0 bg-card/30 backdrop-blur-sm">
              <Shield className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2 text-card-foreground">Secure Reporting</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Your information is encrypted and protected
              </p>
              {/* <Button size="sm" variant="outline" className="w-full text-card-foreground">
                Learn More
              </Button> */}
            </MagicCard>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default Report;
