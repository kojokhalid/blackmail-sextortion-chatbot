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
          "Protect yourself by avoiding sharing explicit content online, using strong privacy settings on social media, and being cautious about whom you communicate with. Never respond to threats—seek help from trusted authorities or organizations.",
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
    ],
  };

  return (
    <section className="bg-mblue w-full py-16 px-4 sm:px-8 md:px-12">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h3>
      </div>
      <div className="mx-auto w-full max-w-4xl rounded-md p-4 bg-white shadow-md">
        <Tabs defaultValue="Sextortion" className="space-y-4">
          <TabsList className="flex flex-wrap justify-center gap-4">
            {Object.keys(faqData).map((key) => (
              <TabsTrigger key={key} value={key} className="text-sm md:text-base">
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
      </div>
    </section>
  );
};

const ResourceHub = () => {

  return (
    <div className="bg-mwhite">
      <Hero />
      <Separator />

      <section className="flex flex-col mx-auto justify-center items-center max-w-4xl mt-6 px-4 text-center">
        <BlurFade delay={0.25} inView>
          <h1 className="font-medium text-2xl sm:text-3xl text-mblue">
            Empower. Prevent. Protect
          </h1>
        </BlurFade>
        <p className="mb-2 text-md sm:text-lg text-slate-800">
          If you’ve received messages like these, know that help is available.
          Stay calm, and don’t respond or pay the demands.
        </p>
      </section>

      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-8 py-10">
        <div className="w-full">
          <h3 className="text-lg font-bold">Steps to Take:</h3>
          <Timeline
            items={[
              { children: "Contact a trusted friend or family member" },
              { children: "Report the incident to your local authorities" },
            ]}
          />
        </div>
        <AnimatedListDemo />
      </section>

      <div className="mx-auto max-w-6xl mt-10 px-4">
        <Faq />
      </div>
    </div>
  );
};

export default ResourceHub;
