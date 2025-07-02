import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, Phone, User, MessageSquare, Clock, Send } from "lucide-react";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSupportModal = ({ isOpen, onClose }: ContactSupportModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
    urgency: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Technical Support",
    "Report Incident",
    "Resource Request",
    "General Inquiry",
    "Account Issues",
    "Safety Concern",
    "Feedback",
    "Other"
  ];

  const urgencyLevels = [
    { value: "low", label: "Low Priority", color: "bg-green-500" },
    { value: "medium", label: "Medium Priority", color: "bg-yellow-500" },
    { value: "high", label: "High Priority", color: "bg-orange-500" },
    { value: "urgent", label: "Urgent", color: "bg-red-500" }
  ];

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      // In a real app, this would send the support request
      console.log("Support request submitted:", formData);
      
      setIsSubmitting(false);
      onClose();
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        subject: "",
        message: "",
        urgency: "medium"
      });
      
      // Show success message (you could use a toast here)
      alert("Your support request has been submitted successfully. We'll get back to you within 24 hours.");
    }, 2000);
  };

  const getUrgencyColor = (urgency: string) => {
    return urgencyLevels.find(level => level.value === urgency)?.color || "bg-gray-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Contact Support
          </DialogTitle>
          <DialogDescription>
            Get help from our support team. We're here to assist you with any questions or concerns.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <Phone className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs font-medium">Emergency</p>
            <p className="text-xs text-muted-foreground">191</p>
          </div>
          <div className="text-center">
            <Mail className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs font-medium">Email</p>
            <p className="text-xs text-muted-foreground">support@safeguard.com</p>
          </div>
          <div className="text-center">
            <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs font-medium">Response Time</p>
            <p className="text-xs text-muted-foreground">Within 24hrs</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="support-name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="support-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="support-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="support-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email address"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="support-phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number (Optional)
            </Label>
            <Input
              id="support-phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter your phone number"
              className="mt-1"
            />
          </div>

          {/* Request Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="support-category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="support-urgency">Priority Level</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${level.color}`}></div>
                        {level.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="support-subject" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Subject
            </Label>
            <Input
              id="support-subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Brief description of your issue"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="support-message">Message *</Label>
            <Textarea
              id="support-message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Please provide detailed information about your request or issue..."
              className="mt-1 min-h-[120px]"
            />
          </div>

          {/* Current Priority Display */}
          {formData.urgency && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Priority:</span>
              <Badge variant="outline" className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getUrgencyColor(formData.urgency)}`}></div>
                {urgencyLevels.find(level => level.value === formData.urgency)?.label}
              </Badge>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={!formData.name || !formData.email || !formData.category || !formData.message || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupportModal;
