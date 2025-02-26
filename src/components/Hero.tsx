import { TextAnimate } from "@/components/ui/text-animate";
import heroimg from "../../src/assets/heroimg.png";

import { BorderBeam } from "@/components/ui/border-beam.tsx";

const Hero: React.FC = () => {
  return (
    <div id="drag-shuffle-hero" className="mb-8 md:mb-12">
      <div className="relative w-full bg-mwhite px-8 py-4 ">
        <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            {
              <h1
                className=" text-mblue text-5xl font-black leading-[1.25] md:text-7xl"
               
              >
                <TextAnimate animation="slideUp" by="word">
                You Are Not Alone
                </TextAnimate>
              </h1>
            }

          
            <div className="relative w-2xl rounded-xl">  
              <p className="mt-4 text-lg max-w-2xl mx-auto p-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Awareness is the first step in defending against online blackmail
              and sextortion. Stay informed and take control.
            </p>
      <BorderBeam />
    </div>
          </div>
          <div className="relative w-full h-[450px]">
            <img src={heroimg} alt="hero image" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
