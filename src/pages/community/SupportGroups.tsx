import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  MapPin, 
  Calendar, 
  Heart, 
  Shield, 
  Search,
  Filter,
  Phone,
  Mail,
  MessageCircle,
  UserPlus
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  location: string;
  region: string;
  type: 'in-person' | 'online' | 'hybrid';
  schedule: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  memberCount: number;
  meetingDay: string;
  focus: string[];
  languages: string[];
}

const SupportGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const supportGroups: SupportGroup[] = [
    {
      id: "1",
      name: "Accra Digital Safety Circle",
      description: "Support group for digital safety awareness and recovery from online abuse in the Greater Accra region.",
      location: "Accra Community Center",
      region: "Greater Accra",
      type: "hybrid",
      schedule: "Every Saturday, 2:00 PM - 4:00 PM",
      contactPerson: "Akosua Mensah",
      contactPhone: "+233 24 123 4567",
      contactEmail: "akosua@safeguard.com",
      memberCount: 25,
      meetingDay: "Saturday",
      focus: ["Digital Safety", "Recovery Support", "Prevention"],
      languages: ["English", "Twi", "Ga"]
    },
    {
      id: "2",
      name: "Kumasi Cyber Survivors Network",
      description: "A supportive community for survivors of cybercrime and online harassment in the Ashanti region.",
      location: "Kumasi Youth Center",
      region: "Ashanti",
      type: "in-person",
      schedule: "Bi-weekly Thursdays, 6:00 PM - 8:00 PM",
      contactPerson: "Kwame Asante",
      contactPhone: "+233 20 987 6543",
      contactEmail: "kwame@safeguard.com",
      memberCount: 18,
      meetingDay: "Thursday",
      focus: ["Peer Support", "Counseling", "Legal Guidance"],
      languages: ["English", "Twi"]
    },
    {
      id: "3",
      name: "Northern Region Online Safety Group",
      description: "Dedicated to educating and supporting individuals in Northern Ghana about online safety.",
      location: "Online (Zoom)",
      region: "Northern",
      type: "online",
      schedule: "Monthly - First Sunday, 3:00 PM - 5:00 PM",
      contactPerson: "Fatima Abdul-Rahman",
      contactPhone: "+233 27 555 1234",
      contactEmail: "fatima@safeguard.com",
      memberCount: 32,
      meetingDay: "Sunday",
      focus: ["Education", "Prevention", "Community Awareness"],
      languages: ["English", "Dagbani", "Hausa"]
    },
    {
      id: "4",
      name: "Takoradi Coastal Safety Network",
      description: "Supporting fishing and coastal communities with digital literacy and safety awareness.",
      location: "Takoradi Community Hall",
      region: "Western",
      type: "in-person",
      schedule: "Weekly Wednesdays, 5:00 PM - 7:00 PM",
      contactPerson: "Ama Koomson",
      contactPhone: "+233 31 456 7890",
      contactEmail: "ama@safeguard.com",
      memberCount: 15,
      meetingDay: "Wednesday",
      focus: ["Digital Literacy", "Mobile Money Safety", "Family Protection"],
      languages: ["English", "Fante"]
    },
    {
      id: "5",
      name: "Ho Volta Digital Guardians",
      description: "Youth-focused group promoting safe internet use and supporting young people in Volta region.",
      location: "Ho Technical University",
      region: "Volta",
      type: "hybrid",
      schedule: "Bi-weekly Fridays, 4:00 PM - 6:00 PM",
      contactPerson: "Edem Sogah",
      contactPhone: "+233 24 789 0123",
      contactEmail: "edem@safeguard.com",
      memberCount: 28,
      meetingDay: "Friday",
      focus: ["Youth Education", "Peer Mentoring", "Technology Safety"],
      languages: ["English", "Ewe"]
    },
    {
      id: "6",
      name: "Cape Coast University SafeSpace",
      description: "Student-led initiative for digital safety awareness and support on campus and surrounding areas.",
      location: "UCC Campus",
      region: "Central",
      type: "in-person",
      schedule: "Weekly Tuesdays, 7:00 PM - 9:00 PM",
      contactPerson: "Kofi Antwi",
      contactPhone: "+233 20 234 5678",
      contactEmail: "kofi@safeguard.com",
      memberCount: 42,
      meetingDay: "Tuesday",
      focus: ["Student Safety", "Academic Support", "Peer Counseling"],
      languages: ["English", "Fante", "Twi"]
    }
  ];

  const regions = ["Greater Accra", "Ashanti", "Northern", "Western", "Volta", "Central", "Eastern", "Upper East", "Upper West", "Brong-Ahafo"];

  const filteredGroups = supportGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || group.region === selectedRegion;
    const matchesType = selectedType === "all" || group.type === selectedType;
    
    return matchesSearch && matchesRegion && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'online':
        return '💻';
      case 'in-person':
        return '🏢';
      case 'hybrid':
        return '🔄';
      default:
        return '📍';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'online':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-person':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'hybrid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <BlurFade delay={0.1}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Support Groups</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with local support groups across Ghana for survivors of digital abuse and those seeking to improve their online safety.
          </p>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-0 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary mb-1">{supportGroups.length}</div>
              <div className="text-sm text-muted-foreground">Active Groups</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent mb-1">
                {supportGroups.reduce((sum, group) => sum + group.memberCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-green-500/5 to-green-500/10">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600 mb-1">{regions.length}</div>
              <div className="text-sm text-muted-foreground">Regions Covered</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {supportGroups.filter(g => g.type === 'online' || g.type === 'hybrid').length}
              </div>
              <div className="text-sm text-muted-foreground">Online Access</div>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Filters */}
      <BlurFade delay={0.3}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Find Support Groups
            </CardTitle>
            <CardDescription>
              Search and filter support groups by location, type, and other criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Meeting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Support Groups List */}
      <div className="space-y-6">
        {filteredGroups.map((group, index) => (
          <BlurFade key={group.id} delay={0.4 + index * 0.1}>
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-foreground mb-2">
                      {group.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getTypeBadgeColor(group.type)}>
                        {getTypeIcon(group.type)} {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {group.region}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {group.memberCount} members
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {group.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Meeting Info */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Meeting Schedule
                      </h4>
                      <p className="text-sm text-muted-foreground">{group.schedule}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Location
                      </h4>
                      <p className="text-sm text-muted-foreground">{group.location}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-primary" />
                        Focus Areas
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {group.focus.map((focus, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-1">
                        {group.languages.map((lang, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Contact Person
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">{group.contactPerson}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <a href={`tel:${group.contactPhone}`} className="text-sm text-primary hover:underline">
                            {group.contactPhone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <a href={`mailto:${group.contactEmail}`} className="text-sm text-primary hover:underline">
                            {group.contactEmail}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Join Group
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <BorderBeam size={40} duration={15} />
            </Card>
          </BlurFade>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <BlurFade delay={0.4}>
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Groups Found</h3>
              <p className="text-muted-foreground mb-4">
                No support groups match your current search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRegion("all");
                  setSelectedType("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </BlurFade>
      )}

      {/* Call to Action */}
      <BlurFade delay={0.6}>
        <Card className="border-0 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold mb-4">Want to Start a New Support Group?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If there's no support group in your area, we can help you start one. Connect with our community coordinators to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Users className="w-5 h-5 mr-2" />
                Start New Group
              </Button>
              <Button size="lg" variant="outline">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Coordinator
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
};

export default SupportGroups;
