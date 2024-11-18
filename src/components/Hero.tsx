import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
const Hero: React.FC = () => {
  const [cards, ] = useState([
    {
      id: 1,
      image:
        "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/c173/live/37c38fc0-5000-11ef-9d77-3188ef18c534.jpg.webp",
      name: "Breach of multiple laws",
      text: "As sextortion can involve a combination of theft, blackmail, sexual exploitation, and cybercrime, offenders may face multiple charges, each carrying its own set of penalties including imprisonment.",
    },
    {
      id: 2,
      image:
        "https://ocdn.eu/pulscms-transforms/1/hbvktkuTURBXy8wZDMwYWRmNi00OGYzLTQwZGYtYTNmMi1hNWJkMDlkNjJkZmEuanBlZ5KVAwDNASzNFOfNC8WTBc0BWcys",
      name: "sextortion can land you in jail",
      text: "Sextortion cases are taken very seriously by law enforcement agencies worldwide due to their deeply violating nature and the significant harm they cause to victims",
    },
    {
      id: 3,
      image:
        "https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/d8/images/canvas/2023/09/13/bc599b41-11ed-4e9b-afd4-85db95c6ad04_050c25b3.jpg?itok=nZcwxeWG&v=1694608207",
      name: "Child pornography laws",
      text: "If the victim is a minor, the severity of legal penalties increases significantly, encompassing the production, possession, and distribution of child pornography.",
    },
  ]);
  const [zIndexOrder, setZIndexOrder] = useState([0, 1, 2]); // Track the zIndex order
  const [isUserInteracting, setIsUserInteracting] = useState(false); // Track user interaction state
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isUserInteracting) {
      intervalRef.current = setInterval(() => {
        setZIndexOrder((prevOrder) => {
          const newOrder = [...prevOrder];
          newOrder.push(newOrder.shift()!); // Move the first element to the end of the array
          return newOrder;
        });
      }, 8000); // Change the zIndex order every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear the interval while interacting
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Cleanup interval on unmount
      }
    };
  }, [isUserInteracting]);

  const handleDragStart = () => {
    setIsUserInteracting(true); // Set to true when dragging starts
  };

  const handleDragEnd = () => {
    setIsUserInteracting(false); // Set to false when dragging ends
  };

  const handleClick = () => {
    setIsUserInteracting(true); // Pause the interval if the card is clicked
  };
  return (
    <div id="drag-shuffle-hero" className="mb-8 md:mb-12">
      <div className="relative w-full overflow-hidden overflow-y-scroll bg-mwhite px-8 py-4 text-mblack">
        <section className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-5xl font-black leading-[1.25] md:text-7xl 4 text-mblue">
              Awareness is the First Step Against Online Blackmail and
              Sextortion
            </h3>

            <p className="mt-4 text-lg text-mblack">
              In today’s digital world,
              <b className="text-mred"> online blackmail </b> and
              <b className="text-mred"> sextortion</b> are growing threats that
              affect individuals of all ages. It's important to recognize the
              signs early and understand how to protect yourself.
            </p>
            {/* <p className="mt-4 text-2xl text-slate-400">
              <TextRevealDemo text="Get Educated. Stay Safe>. Empower Yourself." />
            </p> */}
          </div>
          <div className="relative w-full h-[450px]">
            {/* Image cards */}
            {cards.map((card, index) => {
              const x = useMotionValue(0);
              const y = useMotionValue(0);
              const rotate = useTransform(x, [-200, 200], [-15, 15]); // Optional: Keep rotation for card tilt during drag
              const scale = 1; // Keep all cards at the same size
              const zIndex = cards.length - zIndexOrder.indexOf(index); // Get the zIndex based on the current order

              // Horizontal stack offset
              const leftPosition = `${index * 60}px`; // Adjust this value to control the stack spacing
              const rotateAngle = (index - 1) * 5; // Tweak the angle for each card for a rotated effect

              return (
                <motion.div
                  key={card.id}
                  className="absolute top-0 grid h-[450px] lg:w-[350px] xl:w-[350px] w-auto select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-100 bg-mwhite p-auto md:px-6 lg:px-6 shadow-xl backdrop-blur-md text-mblue"
                  style={{
                    x,
                    y,
                    rotate,
                    scale,
                    zIndex,
                    left: leftPosition,
                    transform: `rotate(${rotateAngle}deg)`,
                  }}
                  drag="x"
                  dragConstraints={{ left: -150, right: 150 }} // Removed strict limits, adjusted for better drag range
                  onDragStart={handleDragStart} // Start interaction on drag
                  onDragEnd={handleDragEnd} // End interaction on drag
                  onClick={handleClick} // Pause on click
                  whileDrag={{ scale: 1.1 }}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="mx-auto h-32 w-32 rounded-full border-1 border-slate-700 bg-slate-200 object-cover"
                  />
                  <p className="text-center text-lg italic text-mblack">
                    "{card.text}"
                  </p>
                  <p className="text-center text-sm font-medium text-mred">
                    {card.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
