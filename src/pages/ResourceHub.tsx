import Hero from "@/components/Hero";

import { AnimatedListDemo } from "@/components/AnimatedList";
import BlurFade from "@/components/ui/blur-fade";
import { Timeline } from "antd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          "Protect yourself by avoiding sharing explicit content online, using strong privacy settings on social media, and being cautious about whom you communicate with. Never respond to threats—seek help from trusted authorities or organizations.",
      },
      {
        question: "What should I do if I am a victim of sextortion?",
        answer:
          "Stay calm and do not comply with the demands. Document all interactions, block the perpetrator, and report the incident to local law enforcement or a cybercrime unit. Support organizations are also available to guide you through this.",
      },
      {
        question: "Can sextortion happen if I haven’t shared any images?",
        answer:
          "Yes, perpetrators may use fake or edited content to manipulate victims, even if no images were shared.",
      },
      {
        question: "What should I do if I am a victim of sextortion?",
        answer:
          "Immediately stop all communication with the perpetrator, do not comply with their demands, and report the incident to law enforcement.",
      },
      {
        question: "Who is most at risk of sextortion?",
        answer:
          "Teenagers, young adults, and individuals who share personal content online are often targeted, but anyone can be a victim.",
      },
    ],
    Blackmail: [
      {
        question: "What is blackmail?",
        answer:
          "Blackmail is the act of threatening to reveal harmful or sensitive information about someone to force them into meeting certain demands.",
      },
      {
        question: "How is blackmail different from sextortion?",
        answer:
          "Sextortion specifically involves threats related to explicit content, while blackmail can involve any type of sensitive information.",
      },
      {
        question: "What are common blackmail tactics?",
        answer:
          "Threatening to expose secrets, using stolen information, or exploiting personal relationships to gain leverage.",
      },
      {
        question: "What should I do if I’m being blackmailed?",
        answer:
          "Document all evidence, avoid giving in to the demands, and report the situation to authorities or legal professionals.",
      },
      {
        question: "How can I protect myself from blackmail?",
        answer:
          "Secure your online accounts, avoid sharing sensitive information, and be mindful of who you trust with personal details.",
      },
    ],
  };

  return (
    <section className="bg-mblue w-full py-16">
      <div className="mx-auto text-center">
        <h3 className="text-3xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h3>
      </div>
      <ScrollArea className="mx-auto h-[400px] w-[400px] rounded-md p-4 bg-white shadow-md">
        <Tabs defaultValue="Sextortion" className="space-y-4">
          <TabsList className="flex justify-between">
            {Object.keys(faqData).map((key) => (
              <TabsTrigger key={key} value={key}>
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(faqData).map(([key, faqs]) => (
            <TabsContent key={key} value={key}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-left">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </ScrollArea>
    </section>
  );
};
const ResourceHub = () => {
  return (
    <div className="bg-mwhite">
      <Hero></Hero>

      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center">
        <AnimatedListDemo />
        <div className="reassurance-section relative w-full overflow-hidden overflow-y-scroll bg-mwhite px-8 py-5 text-mblack">
          <BlurFade delay={0.25} inView>
            <h3 className="text-5xl font-black leading-[1.25] md:text-7xl">
              You Are Not Alone
            </h3>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <p className="mt-4 text-lg text-slate-800">
              If you’ve received messages like these, know that help is
              available. Stay calm, and don’t respond or pay the demands.
            </p>
          </BlurFade>
          <h3 className="mt-4 text-lg text-slate-800 font-bold">
            Steps to Take:
          </h3>
          <Timeline
            items={[
              {
                children: "Contact a trusted friend or family member",
              },
              {
                children:
                  "Report the incident to your local authorities or a cybercrime unit",
              },
              {
                children:
                  "Consider reaching out to online safety organizations for support.",
              },
            ]}
            className="mt-4 text-slate-800"
          />
        </div>
      </section>
      <div className="mx-auto max-w-6xl flex flex-col justify-center items-center mt-10">
        <Faq />
      </div>
    </div>
  );
};

export default ResourceHub;
