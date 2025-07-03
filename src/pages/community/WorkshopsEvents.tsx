import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  Award, 
  Search,
  Filter,
  BookOpen,
  Zap,
  Heart,
  CheckCircle,
  ExternalLink,
  Plus,
  Loader2,
  AlertTriangle
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { useWorkshopEvents } from "@/hooks/useResources";

const WorkshopsEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Fetch events from Contentful
  const { events, loading, error, refetch } = useWorkshopEvents();
  // Handle loading and error states
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading workshop events...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-destructive" />
            <h3 className="text-lg font-semibold mb-2">Unable to Load Events</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={refetch} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesFormat = selectedFormat === "all" || event.format === selectedFormat;
    const matchesLevel = selectedLevel === "all" || event.level === selectedLevel || event.level === "all-levels";
    
    return matchesSearch && matchesType && matchesFormat && matchesLevel;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop':
        return BookOpen;
      case 'webinar':
        return Video;
      case 'training':
        return Award;
      case 'seminar':
        return Users;
      case 'conference':
        return Calendar;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'webinar':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'training':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'seminar':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'conference':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'all-levels':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Helper function to show toast notifications
  const showAlert = (message: string, type: 'info' | 'warning' | 'success' = 'info') => {
    switch (type) {
      case 'warning':
        toast.warning(message);
        break;
      case 'success':
        toast.success(message);
        break;
      case 'info':
      default:
        toast.info(message);
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <BlurFade delay={0.1}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Workshops & Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our educational workshops, training sessions, and events to strengthen your digital safety knowledge and connect with the community.
          </p>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-0 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary mb-1">{events.length}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-green-500/5 to-green-500/10">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {events.filter(e => e.status === 'registration-open').length}
              </div>
              <div className="text-sm text-muted-foreground">Open for Registration</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {events.filter(e => e.price === 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Free Events</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {events.filter(e => e.format === 'online' || e.format === 'hybrid').length}
              </div>
              <div className="text-sm text-muted-foreground">Online Available</div>
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
              Find Events
            </CardTitle>
            <CardDescription>
              Search and filter workshops and events by type, format, and difficulty level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((event, index) => {
          const TypeIcon = getTypeIcon(event.type);
          return (
            <BlurFade key={event.id} delay={0.4 + index * 0.1}>
              <Card className={`relative overflow-hidden hover:shadow-lg transition-shadow ${
                event.featured ? 'ring-2 ring-primary/20' : ''
              }`}>
                {event.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white z-10">
                    Featured
                  </Badge>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                        <TypeIcon className="w-5 h-5 text-primary" />
                        {event.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getTypeColor(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                        <Badge className={getLevelColor(event.level)}>
                          {event.level === 'all-levels' ? 'All Levels' : event.level.charAt(0).toUpperCase() + event.level.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.registered}/{event.capacity}
                        </Badge>
                        {event.price === 0 ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Free
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            GHS {event.price}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Event Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-medium">{formatDate(event.date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{formatTime(event.time)} ({event.duration})</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                        {event.format === 'online' && (
                          <Badge variant="outline" className="ml-2">
                            <Video className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        )}
                        {event.format === 'hybrid' && (
                          <Badge variant="outline" className="ml-2">
                            <Zap className="w-3 h-3 mr-1" />
                            Hybrid
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-primary" />
                        <span>{event.instructor} - {event.instructorTitle}</span>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-sm">Topics Covered:</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-sm">Target Audience:</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.targetAudience.map((audience, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-sm">Languages:</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.language.map((lang, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Registration */}
                    <div className="flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-muted/20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {event.capacity - event.registered}
                            </div>
                            <div className="text-sm text-muted-foreground">spots remaining</div>
                          </div>
                        </div>

                        {event.status === 'registration-open' && (
                          <div className="space-y-2">
                            <Button 
                              size="lg" 
                              className="w-full"
                              onClick={() => {
                                if (event.registrationUrl) {
                                  window.open(event.registrationUrl, '_blank');
                                } else {
                                  // Fallback - could open a contact modal or form
                                  showAlert('Registration will be available soon. Please check back later.', 'info');
                                }
                              }}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Register Now
                            </Button>
                            <Button 
                              size="lg" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => {
                                if (event.moreInfoUrl) {
                                  window.open(event.moreInfoUrl, '_blank');
                                } else {
                                  // Fallback - could show event details modal
                                  showAlert('More details will be available soon.', 'info');
                                }
                              }}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              More Details
                            </Button>
                          </div>
                        )}

                        {event.status === 'sold-out' && (
                          <Button size="lg" className="w-full" disabled>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Sold Out
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <BorderBeam size={40} duration={15} />
              </Card>
            </BlurFade>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <BlurFade delay={0.4}>
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
              <p className="text-muted-foreground mb-4">
                No workshops or events match your current search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("all");
                  setSelectedFormat("all");
                  setSelectedLevel("all");
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
            <h3 className="text-xl font-bold mb-4">Want to Host an Event?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Are you an expert in digital safety? Partner with us to host workshops and share your knowledge with the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Host Event
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5 mr-2" />
                Become Instructor
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
};

export default WorkshopsEvents;
