import { TextAnimate } from "@/components/ui/text-animate";
import heroimg from "../../src/assets/heroimg.png";

import { BorderBeam } from "@/components/ui/border-beam.tsx";

const Hero: React.FC = () => {
  return (
    <div id="drag-shuffle-hero" className="mb-8 md:mb-12">
    <div className="relative w-full bg-background px-4 py-8 sm:px-8 md:py-12 dark:bg-background">
      <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <h1 className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.2] tracking-tight dark:text-primary">
            <TextAnimate animation="slideUp" by="word">
              You Are Not Alone
            </TextAnimate>
          </h1>
          <div className="relative max-w-2xl mt-6 rounded-[--radius] bg-card p-6 shadow-sm dark:bg-card">
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed dark:text-muted-foreground" style={{ fontFamily: "Syne, sans-serif" }}>
              Awareness is the first step in defending against online blackmail and sextortion. Stay informed and take control.
            </p>
            <BorderBeam className="absolute inset-0 rounded-[--radius] border border-accent dark:border-accent" />
          </div>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px]">
          <img
            src={heroimg}
            alt="Illustration of support for blackmail and sextortion awareness"
            className="w-full h-full object-cover rounded-[--radius] shadow-md"
          />
        </div>
      </section>
    </div>
  </div>
  );
};

export default Hero;
