import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileText, Mail, User, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResourceDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  resourceType: string;
  resourceDescription: string;
}

const ResourceDownloadModal = ({ isOpen, onClose, resourceTitle, resourceType, resourceDescription }: ResourceDownloadModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agreeToTerms: false,
    subscribeUpdates: false
  });
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!formData.name || !formData.email || !formData.agreeToTerms) {
      return;
    }

    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      // In a real app, this would trigger the actual download
      const link = document.createElement('a');
      link.href = `/api/download/${resourceTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      link.download = `${resourceTitle}.pdf`;
      link.click();
      
      setIsDownloading(false);
      onClose();
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        agreeToTerms: false,
        subscribeUpdates: false
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Download Resource
          </DialogTitle>
          <DialogDescription>
            Please provide your details to download this resource and receive important updates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Resource Info */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{resourceTitle}</h4>
                <Badge variant="outline" className="mt-1 mb-2">
                  {resourceType}
                </Badge>
                <p className="text-sm text-muted-foreground">{resourceDescription}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email address"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number (Optional)
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                className="mt-1"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and{" "}
                  <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span> *
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="updates"
                  checked={formData.subscribeUpdates}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, subscribeUpdates: checked as boolean }))
                  }
                />
                <Label htmlFor="updates" className="text-sm leading-relaxed">
                  Subscribe to safety updates and new resource notifications
                </Label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isDownloading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDownload}
              className="flex-1"
              disabled={!formData.name || !formData.email || !formData.agreeToTerms || isDownloading}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Now
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDownloadModal;
