import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const svgVariant = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const chats = [
    "sextortion something",
    "something blackmail questions",
    "some things",
    "Someone"
  ];

  const [selectedChat, setSelectedChat] = useState(-1);

  return (
    <>
      {/* Sidebar */}
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className={`bg-neutral-900 flex flex-col z-10 gap-20 p-5 fixed top-0 left-0 h-full shadow shadow-neutral-600 transition-all ${
          isOpen ? "block" : "hidden"
        } sm:block`}
      >
        <div className="flex flex-col gap-3">
          <p className="mt-40 text-gray-400 text-xs p-1">Chat History</p>
          {chats.length === 0 && (
            <p className="text-gray-400 text-xs p-1">Empty</p>
          )}
          {chats.map((chat, index) => (
            <Link
              key={index}
              onClick={() => setSelectedChat(index)}
              to={"#"}
              className={`p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100 ${
                selectedChat === index
                  ? "p-1 stroke-neutral-400 text-neutral-100 place-items-center gap-3 bg-neutral-700/30"
                  : ""
              }`}
            >
              <p className="text-inherit overflow-clip whitespace-nowrap tracking-wide">
                {chat}
              </p>
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* Toggle Button */}
      <motion.button
        className={`p-2 text-white fixed top-4 z-20 transition-all duration-500 ease-in-out ${
          isOpen ? "left-[16rem]" : "left-4"
        }`}
        onClick={handleOpenClose}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 stroke-neutral-200"
          variants={svgVariant}
          animate={svgControls}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M15 4v16" />
          <path d="M9 10l2 2l-2 2" />
        </motion.svg>
      </motion.button>
    </>
  );
}

export default SideBar;
