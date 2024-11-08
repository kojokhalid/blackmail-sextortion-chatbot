

// import { motion, useAnimationControls } from "framer-motion";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// // Variants for sidebar animations
// const sidebarVariants = {
//   closed: {
//     width: "5rem",
//     transition: {
//       type: "spring",
//       duration: 0.5,
//       stiffness: 100,
//     },
//   },
//   open: {
//     width: "16rem",
//     transition: {
//       type: "spring",
//       duration: 0.5,
//       stiffness: 100,
//     },
//   },
// };

// // Variants for the toggle button icon
// const iconVariants = {
//   closed: { rotate: 360 },
//   open: { rotate: 180 },
// };

// function SideBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(-1);

//   const sidebarControls = useAnimationControls();
//   const iconControls = useAnimationControls();

//   // Toggle sidebar and icon animations
//   useEffect(() => {
//     if (isOpen) {
//       sidebarControls.start("open");
//       iconControls.start("open");
//     } else {
//       sidebarControls.start("closed");
//       iconControls.start("closed");
//     }
//   }, [isOpen]);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const chats = [
//     "Sextortion Incident",
//     "Blackmail Case",
//     "Discussion with Client",
//     "Anonymous Report",
//     "Sextortion and Blackmail",
//   ];

//   return (
//     <>
//       {/* Sidebar */}
//       <motion.nav
//         variants={sidebarVariants}
//         animate={sidebarControls}
//         initial="closed"
//         className={`bg-neutral-900 flex flex-col z-10 gap-20 p-5 fixed top-0 left-0 h-full shadow shadow-neutral-600 transition-all ${
//           isOpen ? "block" : "hidden"
//         } sm:block`}
//       >
//         <div className="flex flex-col gap-2 mt-40">
//           <p className="text-neutral-100 text-xs p-1">Today</p>
//           {chats.length === 0 ? (
//             <p className="text-gray-400 text-xs p-1">
//               No chat history available
//             </p>
//           ) : (
//             chats.map((chat, index) => (
//               <Link
//                 key={index}
//                 to="#"
//                 onClick={() => setSelectedChat(index)}
//                 className={`p-1 rounded-md cursor-pointer hover:bg-neutral-700/30 transition-colors duration-200 text-neutral-400 hover:text-neutral-100 ${
//                   selectedChat === index
//                     ? "bg-neutral-700/30 text-neutral-100"
//                     : ""
//                 }`}
//               >
//                 <p className="truncate">{chat}</p>
//               </Link>
//             ))
//           )}
//         </div>
//       </motion.nav>

//       {/* Toggle Button */}
//       <motion.button
//         className={`p-2 text-white fixed top-4 z-20 transition-all duration-500 ${
//           isOpen ? "left-[13.5rem]" : "left-12"
//         }`}
//         onClick={toggleSidebar}
//       >
//         <motion.svg
//           xmlns="http://www.w3.org/2000/svg"
//           width={24}
//           height={24}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={1}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="w-6 h-6 stroke-neutral-200"
//           variants={iconVariants}
//           animate={iconControls}
//           transition={{ duration: 0.5 }}
//         >
//           <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
//           <path d="M15 4v16" />
//           <path d="M9 10l2 2l-2 2" />
//         </motion.svg>
//       </motion.button>

//       {/* New Chat Button */}
//       <motion.button
//         className={`flex p-2 mt-10 text-white fixed z-20 transition-all duration-500 items-center gap-3 text-md rounded-md cursor-pointer hover:bg-neutral-700/30 hover:text-neutral-100 ${
//           isOpen ? "left-[1rem]" : "left-4"
//         } mt-[1rem]`}
//         onClick={() => {}}
//       >
//         {isOpen && <span>New Chat</span>}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
//           />
//         </svg>
//       </motion.button>
//     </>
//   );
// }

// export default SideBar;
