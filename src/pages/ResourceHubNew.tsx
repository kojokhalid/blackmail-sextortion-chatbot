import BlurFade from "@/components/ui/blur-fade";
import { Timeline } from "antd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Meteors } from "@/components/ui/meteors";
import { Shield, AlertTriangle, Phone, MessageCircle, Lock, Users, Eye, Heart, Star, CheckCircle, ArrowRight, ExternalLink, HelpCircle, Info, Lightbulb, Zap } from "lucide-react";
import { useState } from "react";
import { AnimatedListDemo } from "@/components/AnimatedList";

const StatsSection = () => {
  const stats = [
    { icon: Shield, label: "People Protected", value: "10,000+", color: "text-green-500" },
    { icon: Users, label: "Support Cases", value: "2,500+", color: "text-blue-500" },
    { icon: Phone, label: "24/7 Helpline", value: "Active", color: "text-purple-500" },
    { icon: Star, label: "Success Rate", value: "94%", color: "text-yellow-500" },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary font-syne">
            Our Impact in Ghana
          </h2>
        </BlurFade>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <BlurFade key={index} delay={0.2 + index * 0.1}>
              <MagicCard className="p-6 text-center border-0 bg-card/50 backdrop-blur-sm">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <BorderBeam size={60} duration={12} />
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color, delay }: any) => (
  <BlurFade delay={delay}>
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      <Meteors number={5} />
      <BorderBeam size={40} duration={15} />
    </Card>
  </BlurFade>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern"></div>
      <Meteors number={20} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <BlurFade delay={0.1}>
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
            <Shield className="w-4 h-4 mr-2" />
            Protecting Ghana's Digital Future
          </Badge>
        </BlurFade>
        
        <BlurFade delay={0.2}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-primary-foreground mb-6 font-syne leading-tight">
            Your Shield Against
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent block">
              Digital Threats
            </span>
          </h1>
        </BlurFade>
        
        <BlurFade delay={0.3}>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Comprehensive resources, immediate support, and expert guidance to protect you from sextortion and blackmail in Ghana.
          </p>
        </BlurFade>
        
        <BlurFade delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold rounded-full group">
              <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Get Immediate Help
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg font-semibold rounded-full">
              <Info className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </BlurFade>
      </div>
      
      <BorderBeam size={250} duration={12} />
    </section>
  );
};

const QuickActions = () => {
  const actions = [
    {
      icon: MessageCircle,
      title: "Emergency Chat",
      description: "Get immediate support from our AI-powered chatbot",
      color: "bg-red-500",
      href: "/chat",
      urgent: true
    },
    {
      icon: Phone,
      title: "Report Incident",
      description: "Securely report threats to authorities",
      color: "bg-blue-500",
      href: "/report",
      urgent: false
    },
    {
      icon: HelpCircle,
      title: "Get Resources",
      description: "Access guides and educational materials",
      color: "bg-green-500",
      href: "#resources",
      urgent: false
    },
    {
      icon: Users,
      title: "Find Support",
      description: "Connect with support groups and counselors",
      color: "bg-purple-500",
      href: "#support",
      urgent: false
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-syne">
              Need Help Right Now?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the support option that best fits your situation. Help is available 24/7.
            </p>
          </div>
        </BlurFade>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <BlurFade key={index} delay={0.2 + index * 0.1}>
              <Card className={`relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 ${
                action.urgent ? 'ring-2 ring-red-500 ring-opacity-50' : ''
              }`}>
                <CardHeader className="pb-3">
                  {action.urgent && (
                    <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
                      URGENT
                    </Badge>
                  )}
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {action.description}
                  </CardDescription>
                  <Button size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {action.urgent ? 'Get Help Now' : 'Learn More'}
                  </Button>
                </CardContent>
                <Meteors number={3} />
                <BorderBeam size={40} duration={20} />
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState("Sextortion");
  
  const faqData = {
    Sextortion: {
      icon: Shield,
      color: "from-red-500 to-pink-500",
      questions: [
        {
          question: "What is sextortion?",
          answer:
            "Sextortion is a form of blackmail where someone threatens to share explicit images, videos, or information unless the victim complies with their demands, which often include money or more explicit content.",
        },
        {
          question: "How can I protect myself from sextortion?",
          answer:
            "Protect yourself by avoiding sharing explicit content online, using strong privacy settings on social media, and being cautious about whom you communicate with. Never respond to threats—seek help from the Ghana Police Service or trusted organizations.",
        },
        {
          question: "What should I do if I've already shared explicit content?",
          answer:
            "Stay calm and don't engage further with the perpetrator. Save all communications as evidence, block their contact, and report to the Ghana Police Service's Cybercrime Unit. Support is available to help you navigate this.",
        },
        {
          question: "Can sextortion happen on social media platforms?",
          answer:
            "Yes, sextortion often occurs on social media through fake profiles or hacked accounts. Use strong privacy settings, avoid accepting unknown friend requests, and report suspicious activity to the platform and Ghana Police Service.",
        },
        {
          question: "How can I support someone experiencing sextortion?",
          answer:
            "Listen without judgment, encourage them to save evidence, and help them contact the Ghana Police Service or support services. Reassure them they're not alone in Ghana and that help is available.",
        },
        {
          question: "What platforms are commonly used for sextortion scams?",
          answer:
            "Sextortion scams often occur on social media (e.g., Instagram, Snapchat), dating apps, email, or messaging platforms like WhatsApp, which is widely used in Ghana. Scammers may use fake or compromised accounts to target victims.",
        },
        {
          question: "Should I pay the sextortion demands to make it stop?",
          answer:
            "No, paying demands often encourages scammers to continue or escalate their threats. Instead, stop communication, save evidence, and report to the Ghana Police Service or Cybercrime Unit.",
        },
        {
          question: "How can I recognize a sextortion scam early?",
          answer:
            "Look for red flags like unsolicited messages, requests for explicit content, or threats from unknown contacts. Trust your instincts and verify the identity of anyone you communicate with online.",
        },
        {
          question: "How do sextortion scams target Ghanaians on mobile platforms?",
          answer:
            "Scammers often use WhatsApp or Telegram to contact victims, posing as friends or romantic partners. They may request explicit content or claim to have hacked your phone. Block and report such contacts to your mobile provider or the Ghana Police Service.",
        },
        {
          question: "What should I do if I've sent money via mobile money in a sextortion scam?",
          answer:
            "Immediately contact your mobile money provider (e.g., MTN, Vodafone) to report the transaction. File a complaint with the Ghana Police Service's Cybercrime Unit and provide evidence like transaction IDs.",
        },
      ]
    },
    Blackmail: {
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
      questions: [
        {
          question: "What is blackmail?",
          answer:
            "Blackmail is the act of threatening to reveal harmful or sensitive information about someone to force them into meeting certain demands, often for money or favors.",
        },
        {
          question: "How is blackmail different from sextortion?",
          answer:
            "Sextortion specifically involves threats related to explicit content, while blackmail can involve any type of sensitive information, such as financial or personal secrets.",
        },
        {
          question: "What are common signs of online blackmail?",
          answer:
            "Common signs include threats to expose personal information, demands for money or favors, and persistent messages from unknown or suspicious accounts. Trust your instincts and seek help from the Ghana Police Service.",
        },
        {
          question: "Can blackmailers follow through on their threats?",
          answer:
            "While some blackmailers may have access to sensitive information, many rely on fear rather than action. Don't pay demands, as this can escalate the situation. Report to the Ghana Police Service and seek professional advice.",
        },
        {
          question: "How can I protect my personal information online?",
          answer:
            "Use strong, unique passwords, enable two-factor authentication, avoid sharing sensitive details online, and regularly review your privacy settings on social media and mobile money apps like MTN Mobile Money.",
        },
        {
          question: "What should I do if I'm being blackmailed over email?",
          answer:
            "Don't respond to the email. Save a copy of the message, including headers, as evidence. Report it to your email provider and the Ghana Police Service's Cybercrime Unit.",
        },
        {
          question: "Can blackmail affect my mental health?",
          answer:
            "Yes, blackmail can cause significant stress, anxiety, or shame. Reach out to a trusted friend, family member, or mental health professional in Ghana for support. You're not alone, and help is available.",
        },
        {
          question: "How can I educate others about blackmail risks?",
          answer:
            "Share resources from trusted organizations like the Ghana Police Service, encourage strong online privacy practices, and discuss the importance of reporting threats. Awareness campaigns like Project SafeGuard can help spread knowledge in Ghana.",
        },
        {
          question: "Are blackmail scams common in Ghana?",
          answer:
            "Yes, blackmail scams are prevalent in Ghana, often involving threats to expose personal information via WhatsApp, email, or social media. Scammers may target mobile money accounts or demand payments in cedis. Never pay, and report to the Ghana Police Service.",
        },
        {
          question: "How can I secure my mobile money account from blackmailers?",
          answer:
            "Use a strong PIN, enable two-factor authentication if available, and avoid sharing your mobile money details. Report suspicious calls or messages to your provider (e.g., MTN, Vodafone) and the Ghana Police Service's Cybercrime Unit.",
        },
      ]
    },
  };

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-muted/30 via-background to-muted/50">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-syne">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to the most common questions about digital threats and protection
            </p>
          </div>
        </BlurFade>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(faqData).map(([key, data]) => {
              const IconComponent = data.icon;
              return (
                <BlurFade key={key} delay={0.2}>
                  <Button
                    onClick={() => setActiveCategory(key)}
                    variant={activeCategory === key ? "default" : "outline"}
                    size="lg"
                    className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeCategory === key 
                        ? `bg-gradient-to-r ${data.color} text-white shadow-lg` 
                        : 'hover:shadow-md'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {key}
                    {activeCategory === key && <BorderBeam size={30} duration={8} />}
                  </Button>
                </BlurFade>
              );
            })}
          </div>
        </div>

        <BlurFade delay={0.3}>
          <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
            <div className={`absolute inset-0 bg-gradient-to-br ${faqData[activeCategory as keyof typeof faqData].color} opacity-5`}></div>
            <CardContent className="p-8 relative z-10">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqData[activeCategory as keyof typeof faqData].questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border/50 rounded-lg overflow-hidden bg-background/50"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary px-6 py-4 hover:no-underline">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${faqData[activeCategory as keyof typeof faqData].color} flex items-center justify-center mr-3 text-white text-sm font-bold`}>
                          {index + 1}
                        </div>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground px-6 pb-4 leading-relaxed">
                      <div className="ml-11 pl-4 border-l-2 border-accent/30">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <BorderBeam size={80} duration={15} />
          </Card>
        </BlurFade>
      </div>
    </section>
  );
};

const ResourceHub = () => {
  return (
    <div className="bg-background dark:bg-background min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Quick Actions Section */}
      <QuickActions />

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-8 md:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-syne">
                Comprehensive Protection Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our platform provides end-to-end support from prevention to recovery, specifically designed for the Ghanaian digital landscape.
              </p>
            </div>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Lock}
              title="Privacy Protection"
              description="Advanced encryption and secure reporting systems to protect your identity and sensitive information throughout the support process."
              color="bg-gradient-to-r from-blue-500 to-cyan-500"
              delay={0.2}
            />
            <FeatureCard
              icon={Zap}
              title="Instant Response"
              description="24/7 AI-powered chatbot and emergency contact system for immediate assistance when you need help the most."
              color="bg-gradient-to-r from-yellow-500 to-orange-500"
              delay={0.3}
            />
            <FeatureCard
              icon={Users}
              title="Community Support"
              description="Connect with trained counselors and support groups who understand the cultural context of Ghana and can provide locally relevant guidance."
              color="bg-gradient-to-r from-purple-500 to-pink-500"
              delay={0.4}
            />
            <FeatureCard
              icon={Eye}
              title="Education & Awareness"
              description="Comprehensive resources about digital threats, prevention strategies, and recognition of common scam patterns in Ghana."
              color="bg-gradient-to-r from-green-500 to-emerald-500"
              delay={0.5}
            />
            <FeatureCard
              icon={Phone}
              title="Direct Reporting"
              description="Streamlined reporting system that connects directly with Ghana Police Service Cybercrime Unit and other relevant authorities."
              color="bg-gradient-to-r from-red-500 to-rose-500"
              delay={0.6}
            />
            <FeatureCard
              icon={Heart}
              title="Mental Health Support"
              description="Professional counseling resources and mental health support specifically trained to help victims of digital threats and extortion."
              color="bg-gradient-to-r from-indigo-500 to-purple-500"
              delay={0.7}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Action Timeline */}
      <section className="py-16 px-4 sm:px-8 md:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-syne">
                What To Do If You're Threatened
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Follow these essential steps to protect yourself and get the help you need in Ghana.
              </p>
            </div>
          </BlurFade>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <BlurFade delay={0.2}>
              <Card className="relative overflow-hidden h-full border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-bold text-primary">
                    <CheckCircle className="w-8 h-8 mr-3 text-green-500" />
                    Immediate Actions
                  </CardTitle>
                  <CardDescription>
                    Critical steps to take right now to protect yourself
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Timeline
                    items={[
                      {
                        children: (
                          <MagicCard className="p-4 border-0 bg-green-50 dark:bg-green-950/20">
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                                1
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Stay Calm & Don't Panic</h4>
                                <p className="text-sm text-muted-foreground">
                                  Take deep breaths. Remember that you're not alone and help is available in Ghana.
                                </p>
                              </div>
                            </div>
                          </MagicCard>
                        ),
                      },
                      {
                        children: (
                          <MagicCard className="p-4 border-0 bg-blue-50 dark:bg-blue-950/20">
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                                2
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Don't Pay or Engage</h4>
                                <p className="text-sm text-muted-foreground">
                                  Never pay demands or continue communication. Block the perpetrator immediately.
                                </p>
                              </div>
                            </div>
                          </MagicCard>
                        ),
                      },
                      {
                        children: (
                          <MagicCard className="p-4 border-0 bg-purple-50 dark:bg-purple-950/20">
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                                3
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Save Evidence</h4>
                                <p className="text-sm text-muted-foreground">
                                  Screenshot all messages, save phone numbers, and document mobile money transaction details.
                                </p>
                              </div>
                            </div>
                          </MagicCard>
                        ),
                      },
                      {
                        children: (
                          <MagicCard className="p-4 border-0 bg-orange-50 dark:bg-orange-950/20">
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                                4
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Seek Support</h4>
                                <p className="text-sm text-muted-foreground">
                                  Contact a trusted friend, family member, or use our emergency chat feature.
                                </p>
                              </div>
                            </div>
                          </MagicCard>
                        ),
                      },
                    ]}
                    className="space-y-6"
                  />
                </CardContent>
                <BorderBeam size={60} duration={12} />
              </Card>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <div className="space-y-6">
                <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-bold text-primary">
                      <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
                      Common Threat Examples
                    </CardTitle>
                    <CardDescription>
                      Real examples to help you recognize threats (for awareness only)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatedListDemo className="h-[350px]" />
                  </CardContent>
                  <BorderBeam size={40} duration={15} />
                </Card>
                
                <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-bold text-primary">
                      <Phone className="w-6 h-6 mr-2 text-green-500" />
                      Emergency Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                      <div>
                        <div className="font-semibold text-foreground">Ghana Police Emergency</div>
                        <div className="text-sm text-muted-foreground">Call: 191 or 18555</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <div className="font-semibold text-foreground">Cybercrime Unit</div>
                        <div className="text-sm text-muted-foreground">Report online crimes</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <div className="font-semibold text-foreground">SafeGuard Chat</div>
                        <div className="text-sm text-muted-foreground">24/7 AI Support</div>
                      </div>
                    </div>
                  </CardContent>
                  <BorderBeam size={40} duration={18} />
                </Card>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <Faq />

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-accent py-16 px-4 sm:px-8 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
        <Meteors number={15} />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="text-xl font-bold text-primary-foreground mb-6 font-syne flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
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
                    { label: "Emergency Chat", href: "/chat", icon: MessageCircle },
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
                  {[
                    { 
                      label: "Ghana Police Cybercrime Unit", 
                      href: "https://police.gov.gh/en/index.php/cybercrime-unit/",
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
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                  <Button variant="outline" className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
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
                © {new Date().getFullYear()} Project SafeGuard, University of Mines and Technology, Ghana. 
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> | </span>
                All rights reserved. Protecting Ghana's digital future.
              </p>
            </div>
          </BlurFade>
        </div>
        
        <BorderBeam size={200} duration={20} />
      </footer>
    </div>
  );
};

export default ResourceHub;
