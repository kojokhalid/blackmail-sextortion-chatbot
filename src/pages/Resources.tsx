import { useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Meteors } from "@/components/ui/meteors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Heart, 
  BookOpen, 
  Download, 
  Play, 
  ExternalLink, 
  FileText, 
  Video, 
  Headphones,
  Smartphone,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Award,
  Lightbulb,
  Target,
  MapPin,
  Calendar,
  Radio,
  Pause,
  Filter,
  Languages
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
      <Meteors number={15} />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <BlurFade delay={0.1}>
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
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
            <Button size="lg" className="px-8 py-4 text-lg font-semibold rounded-full group" asChild>
              <a href="#guides">
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Download Safety Guide
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold rounded-full" asChild>
              <a href="#videos">
                <Play className="w-5 h-5 mr-2" />
                Watch Video Series
              </a>
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

const ResourceTabs = ({ onDownload, onVideoPlay, onAudioPlay }: { 
  onDownload: (title: string, type: string, description: string) => void;
  onVideoPlay: (title: string, description: string, duration: string, instructor?: string, videoUrl?: string, thumbnailUrl?: string) => void;
  onAudioPlay: (title: string, description: string, duration: string, audioUrl: string, languages?: string[], category?: string, instructor?: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState("guides");

  const tabData = {
    guides: {
      title: "Safety Guides",
      description: "Comprehensive guides for digital safety in Ghana",
      icon: Shield,
      resources: [
        {
          title: "Complete Sextortion Prevention Guide",
          description: "Learn how to protect yourself from sextortion attempts with practical tips for Ghanaians.",
          type: "PDF Guide",
          duration: "15 min read",
          level: "Beginner",
          downloads: "2.5K",
          featured: true
        },
        {
          title: "Mobile Money Security Best Practices",
          description: "Secure your MTN, Vodafone, and other mobile money accounts from scammers.",
          type: "Interactive Guide",
          duration: "10 min read",
          level: "Intermediate",
          downloads: "1.8K",
          featured: false
        },
        {
          title: "Social Media Privacy Settings for Ghanaians",
          description: "Step-by-step instructions for securing Facebook, WhatsApp, Instagram, and other platforms.",
          type: "Visual Guide",
          duration: "12 min read",
          level: "Beginner",
          downloads: "3.2K",
          featured: true
        },
        {
          title: "Recognizing Romance Scams",
          description: "Identify and avoid common romance scam tactics used against Ghanaians online.",
          type: "PDF Guide",
          duration: "8 min read",
          level: "Beginner",
          downloads: "1.9K",
          featured: false
        }
      ]
    },
    videos: {
      title: "Video Tutorials",
      description: "Visual learning content in English and local languages",
      icon: Video,
      resources: [
        {
          title: "What to Do If You're Being Blackmailed",
          description: "A step-by-step video guide on handling blackmail situations safely and effectively.",
          type: "Video Tutorial",
          duration: "12 minutes",
          level: "Essential",
          downloads: "8.5K views",
          featured: true
        },
        {
          title: "Setting Up WhatsApp Privacy (Twi)",
          description: "Learn how to secure your WhatsApp account with explanations in Twi language.",
          type: "Tutorial Video",
          duration: "8 minutes",
          level: "Beginner",
          downloads: "5.2K views",
          featured: false
        },
        {
          title: "Mobile Money Safety Tips",
          description: "Protect your mobile money transactions from fraud and scams.",
          type: "Educational Video",
          duration: "15 minutes",
          level: "Intermediate",
          downloads: "6.8K views",
          featured: true
        },
        {
          title: "Cyberbullying Response Strategies",
          description: "How to handle and report cyberbullying incidents in Ghana.",
          type: "Awareness Video",
          duration: "10 minutes",
          level: "Beginner",
          downloads: "4.1K views",
          featured: false
        }
      ]
    },
    tools: {
      title: "Safety Tools",
      description: "Interactive tools and checklists for protection",
      icon: Target,
      resources: [
        {
          title: "Privacy Settings Checker",
          description: "Interactive tool to audit your social media privacy settings across platforms.",
          type: "Web Tool",
          duration: "5 minutes",
          level: "All Levels",
          downloads: "12K uses",
          featured: true
        },
        {
          title: "Scam Message Analyzer",
          description: "Upload suspicious messages to check if they're potential scams or threats.",
          type: "AI Tool",
          duration: "Instant",
          level: "All Levels",
          downloads: "8.7K analyses",
          featured: true
        },
        {
          title: "Emergency Contact Template",
          description: "Pre-formatted templates for reporting incidents to Ghana Police and other authorities.",
          type: "Document Template",
          duration: "2 minutes",
          level: "Essential",
          downloads: "3.4K downloads",
          featured: false
        },
        {
          title: "Digital Safety Checklist",
          description: "Comprehensive checklist to ensure your online accounts and devices are secure.",
          type: "Interactive Checklist",
          duration: "10 minutes",
          level: "Intermediate",
          downloads: "5.9K completed",
          featured: false
        }
      ]
    },
    podcasts: {
      title: "Audio Content",
      description: "Live streams, podcasts and audio resources in multiple languages",
      icon: Headphones,
      liveStreams: [
        {
          title: "SafeGuard Radio Live",
          description: "Live digital safety discussions and Q&A sessions with experts",
          isLive: true,
          listeners: "245 live",
          streamUrl: "https://stream.safeguard.com/live",
          schedule: "Monday-Friday 6:00 PM - 8:00 PM",
          languages: ["English", "Twi"]
        },
        {
          title: "Community Voices Ghana",
          description: "Live community discussions about online safety experiences",
          isLive: false,
          nextShow: "Today 8:00 PM",
          listeners: "1.2K followers",
          streamUrl: "https://stream.safeguard.com/community",
          schedule: "Weekdays 8:00 PM - 9:00 PM",
          languages: ["English", "Ga", "Ewe"]
        }
      ],
      resources: [
        {
          title: "Digital Safety Stories from Ghana",
          description: "Real survivor stories and expert insights on staying safe online.",
          type: "Podcast Series",
          duration: "30 min episodes",
          level: "All Levels",
          downloads: "15K listeners",
          featured: true,
          languages: ["English", "Twi"],
          episodes: 25,
          audioUrl: "/audio/safety-stories-ep1.mp3",
          category: "Stories & Experiences"
        },
        {
          title: "Weekly Cybersecurity Updates",
          description: "Stay informed about the latest threats and safety tips relevant to Ghana.",
          type: "News Podcast",
          duration: "15 min episodes",
          level: "Intermediate",
          downloads: "8.2K listeners",
          featured: false,
          languages: ["English"],
          episodes: 52,
          audioUrl: "/audio/cyber-updates-latest.mp3",
          category: "News & Updates"
        },
        {
          title: "Expert Interviews on Digital Threats",
          description: "Conversations with cybersecurity experts and law enforcement officials.",
          type: "Interview Series",
          duration: "45 min episodes",
          level: "Advanced",
          downloads: "6.5K listeners",
          featured: true,
          languages: ["English"],
          episodes: 18,
          audioUrl: "/audio/expert-interviews-ep1.mp3",
          category: "Expert Insights"
        },
        {
          title: "Youth Digital Safety (Ga/Ewe)",
          description: "Educational content for young people in local Ghanaian languages.",
          type: "Educational Audio",
          duration: "20 min episodes",
          level: "Youth",
          downloads: "4.8K listeners",
          featured: false,
          languages: ["Ga", "Ewe"],
          episodes: 12,
          audioUrl: "/audio/youth-safety-ga-ep1.mp3",
          category: "Youth Education"
        },
        {
          title: "Mobile Money Safety Tips",
          description: "Audio guide for securing mobile money transactions in local languages.",
          type: "Educational Series",
          duration: "10 min episodes",
          level: "Beginner",
          downloads: "6.3K listeners",
          featured: false,
          languages: ["Twi", "Hausa", "Dagbani"],
          episodes: 8,
          audioUrl: "/audio/mobile-money-safety-twi.mp3",
          category: "Financial Safety"
        },
        {
          title: "Parents Guide to Internet Safety",
          description: "Guidance for parents to protect their children online.",
          type: "Parental Guide",
          duration: "25 min episodes",
          level: "All Levels",
          downloads: "3.9K listeners",
          featured: true,
          languages: ["English", "Twi", "Fante"],
          episodes: 10,
          audioUrl: "/audio/parents-guide-ep1.mp3",
          category: "Family Safety"
        }
      ]
    }
  };

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
                <Download className="w-3 h-3 mr-1" />
                {resource.downloads}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              onClick={() => {
                if (tabKey === 'videos') {
                  onVideoPlay(resource.title, resource.description, resource.duration, "Expert Instructor");
                } else if (tabKey === 'tools') {
                  // Navigate to tool page
                  if (resource.title.includes("Privacy Settings Checker")) {
                    window.location.href = "/tools/privacy-checker";
                  } else if (resource.title.includes("Scam Message Analyzer")) {
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
              Access Now
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="px-3"
              onClick={() => onDownload(resource.title, resource.type, resource.description)}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
        
        <Meteors number={3} />
        <BorderBeam size={30} duration={20} />
      </Card>
    </BlurFade>
  );

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-syne">
              Explore Our Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive collection of safety materials, available in multiple formats and languages
            </p>
          </div>
        </BlurFade>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-card/50 backdrop-blur-sm">
            {Object.entries(tabData).map(([key, data]) => {
              const IconComponent = data.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="relative flex items-center gap-2 px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{data.title}</span>
                  {activeTab === key && <BorderBeam size={20} duration={6} />}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(tabData).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-6">
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
                  {data.resources.map((resource, index) => (
                    <ResourceCard 
                      key={index} 
                      resource={resource} 
                      delay={0.3 + index * 0.1}
                      tabKey={key}
                    />
                  ))}
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
                  alert(`We'll notify you when ${stream.title} goes live!`);
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
                  <Button variant="outline" asChild>
                    <a href="/support">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Request Content
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </BlurFade>
    </div>
  );
};

const CommunitySection = () => {
  const communityFeatures = [
    {
      icon: Users,
      title: "Support Groups",
      description: "Join local support groups for survivors and their families across Ghana's regions.",
      action: "Find Groups",
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      icon: MessageCircle,
      title: "Peer Mentorship",
      description: "Connect with trained peer mentors who understand your experience.",
      action: "Get Matched",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Online Forums",
      description: "Participate in safe, moderated discussions about digital safety topics.",
      action: "Join Discussion",
      color: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      title: "Workshops & Events",
      description: "Attend virtual and in-person workshops on cybersecurity and digital wellness.",
      action: "View Events",
      color: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-syne">
              Join Our Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Connect with others, share experiences, and build a stronger, safer digital Ghana together.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityFeatures.map((feature, index) => (
            <BlurFade key={index} delay={0.2 + index * 0.1}>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                    onClick={() => {
                      if (feature.title === "Support Groups") {
                        window.location.href = "/community/support-groups";
                      } else if (feature.title === "Workshops & Events") {
                        window.location.href = "/community/workshops-events";
                      } else if (feature.title === "Peer Mentorship") {
                        window.location.href = "/community/peer-mentorship";
                      } else if (feature.title === "Online Forums") {
                        window.location.href = "/community/forums";
                      }
                    }}
                  >
                    {feature.action}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
                <Meteors number={5} />
                <BorderBeam size={40} duration={15} />
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
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
        { title: "Crisis Counseling", url: "/support", icon: Heart }
      ]
    },
    {
      category: "Educational Content",
      links: [
        { title: "Digital Literacy Course", url: "/resources/course", icon: BookOpen },
        { title: "Privacy Settings Guide", url: "/tools/privacy-checker", icon: Lock },
        { title: "Scam Recognition Quiz", url: "/resources/quiz", icon: Lightbulb },
        { title: "Safety Assessment Tool", url: "/resources/assessment", icon: CheckCircle }
      ]
    },
    {
      category: "Local Resources",
      links: [
        { title: "Ghana Police Service", url: "https://police.gov.gh", icon: Shield },
        { title: "Data Protection Commission", url: "https://dataprotection.org.gh", icon: Lock },
        { title: "National Communications Authority", url: "https://nca.org.gh", icon: Smartphone },
        { title: "University of Mines Tech", url: "https://umat.edu.gh", icon: Award }
      ]
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

  return (
    <div className="bg-background dark:bg-background min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Resource Statistics */}
      <ResourceStats />

      {/* Main Resource Tabs */}
      <ResourceTabs onDownload={openDownloadModal} onVideoPlay={openVideoModal} onAudioPlay={openAudioModal} />

      {/* Community Section */}
      <CommunitySection />

      {/* Quick Links */}
      <QuickLinksSection />

      {/* Call to Action Footer */}
      <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-accent py-16 px-4 sm:px-8 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
        <Meteors number={15} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6 font-syne">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our team is here to help. Reach out for personalized support or to suggest new resources for the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4" onClick={() => setContactModal(true)}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4" asChild>
                <a href="mailto:support@safeguard.com">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Suggest Resource
                </a>
              </Button>
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
