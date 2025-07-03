import { useEffect, useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Meteors } from "@/components/ui/meteors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsold";
import ResourceDownloadModal from "@/components/modals/ResourceDownloadModal";
import VideoPlayerModal from "@/components/modals/VideoPlayerModal";
import ContactSupportModal from "@/components/modals/ContactSupportModal";
import AudioPlayerModal from "@/components/modals/AudioPlayerModal";
import { 
  Shield, 
  AlertTriangle, 
  Phone, 
  MessageCircle, 
  Lock, 
  Users, 
  BookOpen, 
  Download, 
  Play, 
  ExternalLink, 
  FileText, 
  Video, 
  Headphones,
  ArrowRight,
  Star,
  Clock,
  Award,
  MapPin,
  Calendar,
  Radio,
  Pause,
  Filter,
  Languages,
  EyeIcon,
  Info
} from "lucide-react";
import { fetchAllResources, type ResourcesData, type ResourceItem } from "@/services/resourceService";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
// import safeguardLogoDark from "@/assets/safeguardchatdark.png";
import safeguardLogoLight from "@/assets/safeguardchatlight.png";
const HeroSection = ({ onScrollToTab }: { onScrollToTab: (tabKey: string) => void }) => {
  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
      <Meteors number={15} />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <BlurFade delay={0.1}>
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-card text-card-foreground">
            <BookOpen className="w-4 h-4 mr-2" />
            Comprehensive Digital Safety Resources
          </Badge>
        </BlurFade>
        
        <BlurFade delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 font-syne leading-tight">
            Knowledge is Your
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Best Defense
            </span>
          </h1>
        </BlurFade>
        
        <BlurFade delay={0.3}>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Access curated educational materials, prevention guides, and expert resources designed specifically for Ghana's digital landscape. Empower yourself with knowledge to stay safe online.
          </p>
        </BlurFade>
        
        <BlurFade delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold rounded-full group"
              onClick={() => onScrollToTab('guides')}
            >
              <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Download Safety Guide
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold rounded-full bg-card text-card-foreground"
              onClick={() => onScrollToTab('videos')}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Video Series
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-8 py-4 text-lg font-semibold rounded-full"
              onClick={() => window.location.href = '/community/workshops-events'}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Join Workshops
            </Button>
          </div>
        </BlurFade>
      </div>
      
      <BorderBeam size={200} duration={15} />
    </section>
  );
};

const ResourceStats = () => {
  const stats = [
    { icon: FileText, label: "Guides & Articles", value: "50+", color: "text-blue-500" },
    { icon: Video, label: "Video Resources", value: "25+", color: "text-green-500" },
    { icon: Headphones, label: "Audio Content", value: "15+", color: "text-purple-500" },
    { icon: Users, label: "Community Members", value: "5,000+", color: "text-orange-500" },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <BlurFade key={index} delay={0.1 + index * 0.1}>
              <MagicCard className="p-6 text-center border-0 bg-card/50 backdrop-blur-sm justify-center items-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                {/* <BorderBeam size={50} duration={10} /> */}
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResourceTabs = ({ 
  onDownload, 
  onVideoPlay, 
  onAudioPlay, 
  activeTab, 
  setActiveTab,
  // onContactSupport
}: { 
  onDownload: (title: string, type: string, description: string) => void;
  onVideoPlay: (title: string, description: string, duration: string, instructor?: string, videoUrl?: string, thumbnailUrl?: string) => void;
  onAudioPlay: (title: string, description: string, duration: string, audioUrl: string, languages?: string[], category?: string, instructor?: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onContactSupport: () => void;
}) => {
  const [resources, setResources] = useState<ResourcesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadResources = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      
      const resourcesData = await fetchAllResources();
      
      // Debug logging for video resources
      console.log('All fetched resources:', resourcesData);
      console.log('Video resources count:', resourcesData.videos?.resources?.length || 0);
      console.log('Video resources:', resourcesData.videos?.resources);
      
      // Set icons for each category
      resourcesData.guides.icon = FileText;
      resourcesData.videos.icon = Video;
      resourcesData.tools.icon = Lock;
      resourcesData.podcasts.icon = Headphones;
      
      setResources(resourcesData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error loading resources:', err);
      setError('Failed to load resources. Please try again later.');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadResources();

    // Set up automatic refresh every 2 minutes for better responsiveness
    const refreshInterval = setInterval(() => {
      loadResources(false); // Don't show loading spinner for background updates
    }, 2 * 60 * 1000);

    // Also refresh when the page becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Small delay to ensure page is fully visible
        setTimeout(() => {
          loadResources(false);
        }, 1000);
      }
    };

    // Refresh when user comes back to the tab
    const handleFocus = () => {
      loadResources(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(refreshInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const ResourceCard = ({ resource, delay, tabKey }: any) => (
    <BlurFade delay={delay}>
      <Card className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm ${
        resource.featured ? 'ring-2 ring-primary/20' : ''
      }`}>
        {resource.featured && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {resource.type}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {resource.duration}
            </div>
          </div>
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {resource.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
            {resource.description}
          </CardDescription>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Award className="w-3 h-3 mr-1" />
                {resource.level}
              </div>
              <div className="flex items-center">
                {tabKey === 'videos' ? <EyeIcon className="w-3 h-3 mr-1" />: <Download className="w-3 h-3 mr-1" />}
                {resource.downloads}
              </div>
            </div>
          </div>

          {/* Languages */}
          {resource.languages && resource.languages.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {resource.languages.map((lang: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              onClick={() => {
                if (tabKey === 'videos') {
                  onVideoPlay(
                    resource.title, 
                    resource.description, 
                    resource.duration, 
                    resource.instructor || "Expert Instructor",
                    resource.videoUrl,
                    resource.thumbnail?.fields?.file?.url
                  );
                } else if (tabKey === 'tools') {
                  if (resource.externalUrl) {
                    window.open(resource.externalUrl, '_blank');
                  } else if (resource.title.toLowerCase().includes("privacy")) {
                    window.location.href = "/tools/privacy-checker";
                  } else if (resource.title.toLowerCase().includes("scam")) {
                    window.location.href = "/tools/scam-analyzer";
                  } else {
                    onDownload(resource.title, resource.type, resource.description);
                  }
                } else {
                  onDownload(resource.title, resource.type, resource.description);
                }
              }}
            >
              <Play className="w-4 h-4 mr-2" />
             {tabKey === "videos"? "Watch Now" : "Access Now"}
            </Button>
            {tabKey !== "videos" && <Button 
              size="sm" 
              variant="outline" 
              className="px-3"
              onClick={() => {
                if (resource.file?.fields?.file?.url) {
                  const link = document.createElement('a');
                  link.href = `https:${resource.file.fields.file.url}`;
                  link.download = resource.file.fields.file.fileName || `${resource.title}.pdf`;
                  link.click();
                } else {
                  onDownload(resource.title, resource.type, resource.description);
                }
              }}
            >
              <Download className="w-4 h-4" />
            </Button>}

            
          </div>
        </CardContent>
        
        <Meteors number={3} />
        <BorderBeam size={30} duration={20} />
      </Card>
    </BlurFade>
  );

  // Loading state
  if (loading) {
    return (
      <section id="resource-tabs" className="py-16 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-syne">
                Explore Our Resources
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Loading the latest safety materials and resources...
              </p>
            </div>
          </BlurFade>
          
          <div className="text-center py-16">
            <div className="inline-flex items-center px-6 py-3 font-semibold leading-6 text-sm shadow rounded-md text-primary bg-primary/10 transition ease-in-out duration-150">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading resources...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !resources) {
    return (
      <section id="resource-tabs" className="py-16 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <Card className="text-center py-12 border-destructive/20 bg-destructive/5">
            <CardContent>
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
              <h4 className="text-xl font-semibold mb-3 text-destructive">Unable to Load Resources</h4>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {error || "There was a problem loading the resources. Please try again later."}
              </p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="resource-tabs" className="py-16 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6 font-syne">
              Explore Our Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive collection of safety materials, available in multiple formats and languages
              {error && (
                <span className="block text-sm text-orange-600 mt-2">
                  ⚠️ Some content may be limited due to connectivity issues
                </span>
              )}
              {lastUpdated && (
                <span className="block text-xs text-muted-foreground/60 mt-2">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
        </BlurFade>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-6 bg-card/50 backdrop-blur-sm min-h-[56px] sm:min-h-[52px] p-1">
            {Object.entries(resources).map(([key, data]) => {
              const IconComponent = data.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 py-2 sm:px-4 sm:py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm min-h-[48px] sm:min-h-[44px] rounded-md"
                >
                  <IconComponent className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline truncate">{data.title}</span>
                  <span className="sm:hidden text-[10px] leading-tight text-center">{data.title.split(' ')[0]}</span>
                  {activeTab === key && <BorderBeam size={20} duration={6} />}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(resources).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-6 mt-4 sm:mt-0">
              <BlurFade delay={0.2}>
                <Card className="border-0 bg-card/30 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold text-primary">
                      <data.icon className="w-8 h-8" />
                      {data.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {data.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </BlurFade>

              {key === 'podcasts' ? (
                <AudioContentSection data={data} onAudioPlay={onAudioPlay} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.resources && data.resources.length > 0 ? (
                    data.resources.map((resource: ResourceItem, index: number) => (
                      <ResourceCard 
                        key={`${resource.title}-${index}`} 
                        resource={resource} 
                        delay={0.3 + index * 0.1}
                        tabKey={key}
                      />
                    ))
                  ) : (
                    <div className="col-span-full">
                      <Card className="text-center py-12 border-dashed border-2 border-muted-foreground/20">
                        <CardContent>
                          <data.icon className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                          <h4 className="text-xl font-semibold mb-3">No {data.title} Available</h4>
                          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            We're working on adding more {data.title.toLowerCase()} to help you stay safe online.
                          </p>
                          {/* <Button variant="outline" onClick={onContactSupport}>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Request Content
                          </Button> */}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const AudioContentSection = ({ data, onAudioPlay }: { 
  data: any; 
  onAudioPlay: (title: string, description: string, duration: string, audioUrl: string, languages?: string[], category?: string, instructor?: string) => void;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get unique languages and categories
  const allLanguages = [...new Set(data.resources.flatMap((r: any) => r.languages))] as string[];
  const allCategories = [...new Set(data.resources.map((r: any) => r.category))] as string[];

  // Filter resources based on selected language and category
  const filteredResources = data.resources.filter((resource: any) => {
    const matchesLanguage = selectedLanguage === "all" || resource.languages.includes(selectedLanguage);
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesLanguage && matchesCategory;
  });

  const handlePlayAudio = (resource: any) => {
    if (currentlyPlaying === resource.title && isPlaying) {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
      // Pause audio
    } else {
      setCurrentlyPlaying(resource.title);
      setIsPlaying(true);
      onAudioPlay(
        resource.title, 
        resource.description, 
        resource.duration, 
        resource.audioUrl,
        resource.languages,
        resource.category,
        "Expert Instructor"
      );
    }
  };

  const LiveStreamCard = ({ stream }: { stream: any }) => (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
      {stream.isLive && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-red-500 text-white animate-pulse">
            <Radio className="w-3 h-3 mr-1" />
            LIVE
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className={`w-5 h-5 ${stream.isLive ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`} />
          {stream.title}
        </CardTitle>
        <CardDescription>{stream.description}</CardDescription>
        {stream.hostName && (
          <div className="text-xs text-muted-foreground mt-1">
            Hosted by: {stream.hostName}
          </div>
        )}
        {stream.category && (
          <Badge variant="outline" className="w-fit mt-2 text-xs">
            {stream.category}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {stream.listeners}
            </span>
            <span className="flex items-center gap-1">
              <Languages className="w-4 h-4" />
              {stream.languages.join(", ")}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <Clock className="w-3 h-3 inline mr-1" />
            {stream.schedule}
          </div>
          
          {stream.tags && stream.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {stream.tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {stream.isLive ? (
            <Button 
              className="w-full bg-red-500 hover:bg-red-600 text-white"
              onClick={() => window.open(stream.streamUrl, '_blank')}
            >
              <Radio className="w-4 h-4 mr-2" />
              Listen Live Now
            </Button>
          ) : (
            <div className="space-y-2">
              <div className="text-sm font-medium text-center">
                Next Show: {stream.nextShow}
              </div>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Set reminder or subscribe to notifications
                  toast.success(`We'll notify you when ${stream.title} goes live!`, {
                    description: "You'll receive an update when this stream starts."
                  });
                }}
              >
                <Clock className="w-4 h-4 mr-2" />
                Set Reminder
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <BorderBeam size={30} duration={12} />
    </Card>
  );

  const AudioResourceCard = ({ resource, delay }: { resource: any, delay: number }) => (
    <BlurFade delay={delay}>
      <Card className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm ${
        resource.featured ? 'ring-2 ring-primary/20' : ''
      } ${currentlyPlaying === resource.title ? 'ring-2 ring-green-400' : ''}`}>
        {resource.featured && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        
        {currentlyPlaying === resource.title && isPlaying && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-500 text-white animate-pulse">
              <Play className="w-3 h-3 mr-1" />
              Playing
            </Badge>
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {resource.type}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {resource.duration}
            </div>
          </div>
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {resource.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
            {resource.description}
          </CardDescription>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="w-3 h-3" />
                {resource.level}
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-3 h-3" />
                {resource.downloads}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Languages className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">{resource.languages.join(", ")}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {resource.episodes} episodes
              </Badge>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Category: <span className="text-primary font-medium">{resource.category}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className={`flex-1 transition-all duration-300 ${
                currentlyPlaying === resource.title && isPlaying 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'group-hover:bg-primary group-hover:text-primary-foreground'
              }`}
              onClick={() => handlePlayAudio(resource)}
            >
              {currentlyPlaying === resource.title && isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="px-3"
              onClick={() => {
                // Download podcast episodes list or audio file
                const link = document.createElement('a');
                link.href = resource.audioUrl;
                link.download = `${resource.title}.mp3`;
                link.click();
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
        
        <BorderBeam size={30} duration={20} />
      </Card>
    </BlurFade>
  );

  return (
    <div className="space-y-6">
      {/* Live Streams Section */}
      <BlurFade delay={0.2}>
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Live Streams
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.liveStreams.map((stream: any, index: number) => (
              <LiveStreamCard key={index} stream={stream} />
            ))}
          </div>
        </div>
      </BlurFade>

      {/* Filters */}
      <BlurFade delay={0.3}>
        <Card className="border-0 bg-muted/20">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Languages className="w-4 h-4 text-primary" />
                  Filter by Language
                </label>
                <select 
                  value={selectedLanguage} 
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option value="all">All Languages ({allLanguages.length + 1})</option>
                  {allLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang} ({data.resources.filter((r: any) => r.languages.includes(lang)).length})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Filter by Category
                </label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option value="all">All Categories ({allCategories.length + 1})</option>
                  {allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category} ({data.resources.filter((r: any) => r.category === category).length})
                    </option>
                  ))}
                </select>
              </div>
              
              {(selectedLanguage !== "all" || selectedCategory !== "all") && (
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedLanguage("all");
                      setSelectedCategory("all");
                    }}
                    className="px-4 py-3"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
            
            {(selectedLanguage !== "all" || selectedCategory !== "all") && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedLanguage !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Language: {selectedLanguage}
                    <button 
                      onClick={() => setSelectedLanguage("all")}
                      className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory("all")}
                      className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </BlurFade>

      {/* Filtered Results */}
      <BlurFade delay={0.4}>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-primary">
              Audio Resources ({filteredResources.length})
            </h3>
            {filteredResources.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download All
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Play All
                </Button>
              </div>
            )}
          </div>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource: any, index: number) => (
                <AudioResourceCard 
                  key={index} 
                  resource={resource} 
                  delay={0.5 + index * 0.1}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 border-dashed border-2 border-muted-foreground/20">
              <CardContent>
                <Headphones className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h4 className="text-xl font-semibold mb-3">No Audio Content Found</h4>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  No audio resources match your selected filters. Try adjusting your language or category selection to explore more content.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedLanguage("all");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear All Filters
                  </Button>
                  {/* <Button variant="outline" asChild>
                    <a href="/support">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Request Content
                    </a>
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </BlurFade>
    </div>
  );
};

const QuickLinksSection = () => {
  const quickLinks = [
    {
      category: "Emergency Resources",
      links: [
        { title: "Ghana Police Cybercrime Unit", url: "https://police.gov.gh", icon: Shield },
        { title: "Emergency Hotline: 191", url: "tel:191", icon: Phone },
        { title: "Report Online Abuse", url: "/report", icon: AlertTriangle },
        // { title: "Crisis Counseling", url: "/support", icon: Heart }
      ]
    },
    {
      category: "Workshops & Events",
      links: [
        { title: "Upcoming Workshops", url: "/community/workshops-events", icon: Calendar },
        // { title: "Digital Safety Training", url: "/community/workshops-events?filter=training", icon: BookOpen },
        { title: "Cybersecurity Seminars", url: "/community/workshops-events?filter=seminar", icon: Shield },
        { title: "Youth Safety Workshops", url: "/community/workshops-events?filter=youth", icon: Users }
      ]
    },
    // {
    //   category: "Educational Content",
    //   links: [
    //     // { title: "Digital Literacy Course", url: "/resources/course", icon: BookOpen },
    //     { title: "Privacy Settings Guide", url: "/tools/privacy-checker", icon: Lock },
    //     // { title: "Scam Recognition Quiz", url: "/resources/quiz", icon: Lightbulb },
    //     { title: "Safety Assessment Tool", url: "/resources/assessment", icon: CheckCircle }
    //   ]
    // },
    // {
    //   category: "Local Resources",
    //   links: [
    //     { title: "Ghana Police Service", url: "https://police.gov.gh", icon: Shield },
    //     { title: "Data Protection Commission", url: "https://dataprotection.org.gh", icon: Lock },
    //     { title: "National Communications Authority", url: "https://nca.org.gh", icon: Smartphone },
    //     { title: "University of Mines Tech", url: "https://umat.edu.gh", icon: Award }
    //   ]
    // }
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-syne">
              Quick Access Links
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fast access to essential resources, emergency contacts, and trusted organizations
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {quickLinks.map((section, sectionIndex) => (
            <BlurFade key={sectionIndex} delay={0.2 + sectionIndex * 0.1}>
              <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.url}
                          className="flex items-center p-3 rounded-lg bg-background/50 hover:bg-primary/10 transition-colors duration-200 group"
                          target={link.url.startsWith('http') ? '_blank' : '_self'}
                          rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          <link.icon className="w-4 h-4 mr-3 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-foreground group-hover:text-primary transition-colors flex-1">
                            {link.title}
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <BorderBeam size={60} duration={18} />
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

const Resources = () => {
  // Modal states
  const [downloadModal, setDownloadModal] = useState({
    isOpen: false,
    resourceTitle: "",
    resourceType: "",
    resourceDescription: ""
  });
  
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoTitle: "",
    videoDescription: "",
    duration: "",
    instructor: "",
    videoUrl: "",
    thumbnailUrl: ""
  });
  
  const [audioModal, setAudioModal] = useState({
    isOpen: false,
    audioTitle: "",
    audioDescription: "",
    duration: "",
    audioUrl: "",
    languages: [] as string[],
    category: "",
    instructor: ""
  });
  
  const [contactModal, setContactModal] = useState(false);
  
  // Add activeTab state to be controlled from parent
  const [activeTab, setActiveTab] = useState("guides");

  const openDownloadModal = (title: string, type: string, description: string) => {
    setDownloadModal({
      isOpen: true,
      resourceTitle: title,
      resourceType: type,
      resourceDescription: description
    });
  };

  const openVideoModal = (title: string, description: string, duration: string, instructor: string = "", videoUrl: string = "", thumbnailUrl: string = "") => {
    setVideoModal({
      isOpen: true,
      videoTitle: title,
      videoDescription: description,
      duration,
      instructor,
      videoUrl: videoUrl || `/videos/${title.toLowerCase().replace(/\s+/g, '-')}.mp4`,
      thumbnailUrl: thumbnailUrl || `/thumbnails/${title.toLowerCase().replace(/\s+/g, '-')}.jpg`
    });
  };

  const openAudioModal = (title: string, description: string, duration: string, audioUrl: string, languages: string[] = [], category: string = "", instructor: string = "") => {
    setAudioModal({
      isOpen: true,
      audioTitle: title,
      audioDescription: description,
      duration,
      audioUrl: audioUrl || `/audio/${title.toLowerCase().replace(/\s+/g, '-')}.mp3`,
      languages,
      category,
      instructor
    });
  };

  const openContactModal = () => {
    setContactModal(true);
  };

  const scrollToTabSection = (tabKey: string) => {
    // Set the active tab
    setActiveTab(tabKey);
    
    // Scroll to the section after a brief delay
    setTimeout(() => {
      const element = document.getElementById('resource-tabs');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  return (
    <div className="bg-background dark:bg-background min-h-screen">
      {/* Hero Section */}
      <HeroSection onScrollToTab={scrollToTabSection} />

      {/* Resource Statistics */}
      <ResourceStats />

      {/* Main Resource Tabs */}
      <ResourceTabs 
        onDownload={openDownloadModal} 
        onVideoPlay={openVideoModal} 
        onAudioPlay={openAudioModal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onContactSupport={openContactModal}
      />

      {/* Quick Links */}
      <QuickLinksSection />

     {/* Enhanced Footer */}
        <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-accent py-16 px-4 sm:px-8 md:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <Meteors number={15} />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <BlurFade delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div>
                  <h4 className="text-xl font-bold text-primary-foreground mb-6 font-syne flex items-center">
                    {/* <Shield className="w-6 h-6 mr-2" /> */}
                    <img src={safeguardLogoLight} className="size-16 mr-2"/>
                    Project SafeGuard
                  </h4>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">
                    A cybersecurity initiative by the University of Mines and Technology, dedicated to protecting Ghanaians from digital threats and promoting online safety awareness.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-foreground mb-4 font-syne">
                    Quick Access
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {[
                      { label: "Emergency Chat", href: "https://chat.cysafeguard.com", icon: MessageCircle },
                      { label: "Report Incident", href: "/report", icon: AlertTriangle },
                      { label: "Resources", href: "#resources", icon: Info },
                      { label: "Support Groups", href: "#support", icon: Users },
                    ].map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="flex items-center text-primary-foreground/80 hover:text-accent transition-colors duration-200 group"
                        >
                          <link.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          {link.label}
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-foreground mb-4 font-syne">
                    External Resources
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {[ { 
                        label: "Ghana Cyber Security Authority", 
                        href: "https://www.csa.gov.gh/",
                        icon: Shield
                      },
                      { 
                        label: "Data Protection Commission", 
                        href: "https://www.dataprotection.org.gh/",
                        icon: Lock
                      },
                    ].map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-foreground/80 hover:text-accent transition-colors duration-200 group"
                        >
                          <link.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          {link.label}
                          <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-foreground mb-4 font-syne">
                    Get Support Now
                  </h4>
                  <div className="space-y-3">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => window.open("https://chat.cysafeguard.com", "_blank", "noopener,noreferrer")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                    
                    
                      <Button onClick={()=>window.open("/report","_self")} variant="destructive" className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Report Incident
                      </Button>
                <Button
                  onClick={() => window.open("tel:191", "_self")}
                  variant="default"
                  className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency: 191
                </Button>
                  </div>
                </div>
              </div>
            </BlurFade>
            
            <Separator className="my-8 bg-primary-foreground/20" />
            
            <BlurFade delay={0.2}>
              <div className="text-center">
                <p className="text-primary-foreground/60 text-sm">
                 Made with ♥️ by Antoh Shadrack. 
                  <br className="sm:hidden" />
                  
                  <span className="hidden sm:inline"> | </span> © {new Date().getFullYear()} Project SafeGuard, 
                  All rights reserved. Protecting Ghana's digital future.
                </p>
              </div>
            </BlurFade>
          </div>
          
          <BorderBeam size={200} duration={20} />
        </footer>

      {/* Modals */}
      <ResourceDownloadModal
        isOpen={downloadModal.isOpen}
        onClose={() => setDownloadModal(prev => ({ ...prev, isOpen: false }))}
        resourceTitle={downloadModal.resourceTitle}
        resourceType={downloadModal.resourceType}
        resourceDescription={downloadModal.resourceDescription}
      />

      <VideoPlayerModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal(prev => ({ ...prev, isOpen: false }))}
        videoTitle={videoModal.videoTitle}
        videoDescription={videoModal.videoDescription}
        duration={videoModal.duration}
        instructor={videoModal.instructor}
        videoUrl={videoModal.videoUrl}
        thumbnailUrl={videoModal.thumbnailUrl}
      />

      <ContactSupportModal
        isOpen={contactModal}
        onClose={() => setContactModal(false)}
      />

      <AudioPlayerModal
        isOpen={audioModal.isOpen}
        onClose={() => setAudioModal(prev => ({ ...prev, isOpen: false }))}
        audioTitle={audioModal.audioTitle}
        audioDescription={audioModal.audioDescription}
        duration={audioModal.duration}
        audioUrl={audioModal.audioUrl}
        languages={audioModal.languages}
        category={audioModal.category}
        instructor={audioModal.instructor}
      />
    </div>
  );
};

export default Resources;
