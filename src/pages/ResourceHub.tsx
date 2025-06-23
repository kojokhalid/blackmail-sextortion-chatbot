
import Hero from "@/components/Hero";
import { AnimatedListDemo } from "@/components/AnimatedList";
// import BlurFade from "@/components/ui/blur-fade";
import { Timeline } from "antd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const Faq = () => {
  const faqData = {
    Sextortion: [
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
        question: "What should I do if I’ve already shared explicit content?",
        answer:
          "Stay calm and don’t engage further with the perpetrator. Save all communications as evidence, block their contact, and report to the Ghana Police Service’s Cybercrime Unit. Support is available to help you navigate this.",
      },
      {
        question: "Can sextortion happen on social media platforms?",
        answer:
          "Yes, sextortion often occurs on social media through fake profiles or hacked accounts. Use strong privacy settings, avoid accepting unknown friend requests, and report suspicious activity to the platform and Ghana Police Service.",
      },
      {
        question: "How can I support someone experiencing sextortion?",
        answer:
          "Listen without judgment, encourage them to save evidence, and help them contact the Ghana Police Service or support services. Reassure them they’re not alone in Ghana and that help is available.",
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
        question: "What should I do if I’ve sent money via mobile money in a sextortion scam?",
        answer:
          "Immediately contact your mobile money provider (e.g., MTN, Vodafone) to report the transaction. File a complaint with the Ghana Police Service’s Cybercrime Unit and provide evidence like transaction IDs.",
      },
    ],
    Blackmail: [
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
          "While some blackmailers may have access to sensitive information, many rely on fear rather than action. Don’t pay demands, as this can escalate the situation. Report to the Ghana Police Service and seek professional advice.",
      },
      {
        question: "How can I protect my personal information online?",
        answer:
          "Use strong, unique passwords, enable two-factor authentication, avoid sharing sensitive details online, and regularly review your privacy settings on social media and mobile money apps like MTN Mobile Money.",
      },
      {
        question: "What should I do if I’m being blackmailed over email?",
        answer:
          "Don’t respond to the email. Save a copy of the message, including headers, as evidence. Report it to your email provider and the Ghana Police Service’s Cybercrime Unit.",
      },
      {
        question: "Can blackmail affect my mental health?",
        answer:
          "Yes, blackmail can cause significant stress, anxiety, or shame. Reach out to a trusted friend, family member, or mental health professional in Ghana for support. You’re not alone, and help is available.",
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
          "Use a strong PIN, enable two-factor authentication if available, and avoid sharing your mobile money details. Report suspicious calls or messages to your provider (e.g., MTN, Vodafone) and the Ghana Police Service’s Cybercrime Unit.",
      },
    ],
  };

  return (
    <section className="bg-muted w-full py-16 px-4 sm:px-8 md:px-12 dark:bg-muted">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8 dark:text-primary font-syne">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="mx-auto w-full max-w-4xl rounded-[--radius] p-6 bg-card shadow-md dark:bg-card">
        <Tabs defaultValue="Sextortion" className="space-y-6">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-muted p-2 rounded-[--radius] dark:bg-muted">
            {Object.keys(faqData).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="text-sm md:text-base text-muted-foreground px-4 py-2 rounded-[--radius] hover:bg-secondary hover:text-secondary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:hover:bg-secondary dark:hover:text-secondary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(faqData).map(([key, faqs]) => (
            <TabsContent key={key} value={key} className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-border dark:border-border"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-accent py-4 dark:text-foreground dark:hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-left text-muted-foreground pb-4 dark:text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const ResourceHub = () => {
  return (
    <div className="bg-background dark:bg-background">
      <Hero />

 

      <section className="bg-primary w-full py-16 px-4 sm:px-8 md:px-12 dark:bg-primary">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6 dark:text-primary-foreground font-syne">
            Reach Out for Support
          </h2>
          <p className="text-lg text-primary-foreground mb-8 dark:text-primary-foreground">
            You’re not alone in Ghana. Take the first step toward safety by connecting with trusted resources or reporting an incident.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/chat"
              className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-[--radius] font-semibold hover:bg-background hover:text-foreground transition-colors duration-200 dark:hover:bg-background dark:hover:text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            >
              Chat with bot
            </a>
            <a
              href="/report"
              className="inline-block bg-transparent border border-primary-foreground text-primary-foreground px-6 py-3 rounded-[--radius] font-semibold hover:bg-primary-foreground hover:text-primary transition-colors duration-200 dark:hover:bg-primary-foreground dark:hover:text-primary focus:ring-2 focus:ring-ring focus:outline-none"
            >
              Report an Incident
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-8 py-10 md:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center dark:text-primary font-syne">
          Take Action Against Threats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-semibold text-secondary dark:text-secondary mb-4 font-syne">
              Steps to Take
            </h3>
            <Timeline
              items={[
                {
                  children: (
                    <div className="bg-card p-4 rounded-[--radius] shadow-sm border border-border dark:bg-card dark:border-border">
                      <p className="text-muted-foreground text-base dark:text-muted-foreground">
                        Contact a trusted friend or family member for support.
                      </p>
                    </div>
                  ),
                },
                {
                  children: (
                    <div className="bg-card p-4 rounded-[--radius] shadow-sm border border-border dark:bg-card dark:border-border">
                      <p className="text-muted-foreground text-base dark:text-muted-foreground">
                        Report the incident to the Ghana Police Service’s Cybercrime Unit or local police station.
                      </p>
                    </div>
                  ),
                },
                {
                  children: (
                    <div className="bg-card p-4 rounded-[--radius] shadow-sm border border-border dark:bg-card dark:border-border">
                      <p className="text-muted-foreground text-base dark:text-muted-foreground">
                        Save evidence of the communication (e.g., screenshots, messages, mobile money transaction IDs).
                      </p>
                    </div>
                  ),
                },
                {
                  children: (
                    <div className="bg-card p-4 rounded-[--radius] shadow-sm border border-border dark:bg-card dark:border-border">
                      <p className="text-muted-foreground text-base dark:text-muted-foreground">
                        Block the perpetrator’s contact and secure your mobile money account (e.g., MTN, Vodafone).
                      </p>
                    </div>
                  ),
                },
              ]}
              className="space-y-4 border-l-2 border-accent pl-4 dark:border-accent"
            />
          </div>
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-semibold text-secondary dark:text-secondary mb-4 font-syne">
              Common Threats
            </h3>
            <p className="text-xs text-muted-foreground mb-4 dark:text-muted-foreground">
              These are example threats to raise awareness in Ghana. If you’re experiencing this, help is available.
            </p>
            <AnimatedListDemo className="bg-card p-6 rounded-[--radius] shadow-sm border border-border dark:bg-card dark:border-border h-[350px] sm:h-[400px] md:h-[450px]" />
          </div>
        </div>
      </section>

      <Separator className="my-10 bg-border dark:bg-border" />

      <Faq />

      <Separator className="my-10 bg-border dark:bg-border" />




      <footer className="bg-muted w-full py-10 px-4 sm:px-8 md:px-12 dark:bg-muted">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-primary dark:text-primary mb-4 font-syne">
              About Us
            </h4>
            <p className="text-muted-foreground text-sm dark:text-muted-foreground">
              Project SafeGuard, led by the University of Mines and Technology Cybersecurity class, is dedicated to raising awareness about online blackmail and sextortion in Ghana.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary dark:text-primary mb-4 font-syne">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-muted-foreground hover:text-accent dark:text-muted-foreground dark:hover:text-accent"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/report"
                  className="text-muted-foreground hover:text-accent dark:text-muted-foreground dark:hover:text-accent"
                >
                  Reporting
                </a>
              </li>
              <li>
                <a
                  href="/chat"
                  className="text-muted-foreground hover:text-accent dark:text-muted-foreground dark:hover:text-accent"
                >
                  Chatbot
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary dark:text-primary mb-4 font-syne">
              External Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://police.gov.gh/en/index.php/cybercrime-unit/"
                  className="text-muted-foreground hover:text-accent dark:text-muted-foreground dark:hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ghana Police Service Cybercrime Unit
                </a>
              </li>
              <li>
                <a
                  href="https://www.dataprotection.org.gh/"
                  className="text-muted-foreground hover:text-accent dark:text-muted-foreground dark:hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Data Protection Commission Ghana
                </a>
              </li>
            
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground dark:text-muted-foreground">
          <p>© {new Date().getFullYear()} Project SafeGuard, University of Mines and Technology, Ghana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ResourceHub;