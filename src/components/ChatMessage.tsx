import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
interface ChatMessageProps {
  sender: "user" | "bot";
  text: string | JSX.Element | boolean; // Allow text
  typing?: boolean; // Optional prop for typing indicator
  sessionId?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  text,
  typing,
  sessionId,
}) => {
  // Controls for the typing animation
  const typingControls = useAnimationControls();
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(
    null
  );
  // Typing animation sequence
  React.useEffect(() => {
    if (typing && sender === "bot") {
      typingControls.start({
        width: "100%", // Animate to full width
        transition: {
          duration: 2, // Duration of the typing animation
          ease: "linear",
        },
      });
    }
  }, [typing, sender, typingControls]);

 const handleFeedback = async (feedback: string) => {
   if (submittedFeedback) return; // Prevent multiple submissions

   let value = {
     feedback: feedback,
     sessionId: sessionId,
   };

   try {
     await axios.post("https://eve-chatbot-stmh.onrender.com/api/feedback/v1/chat", value);
     toast({
       title: "Response submitted",
       description: "Thank you for your feedback",
     });
     setSubmittedFeedback(feedback); // Store submitted feedback
   } catch (err) {
     toast({
       title: "Error",
       description: "Something went wrong",
     });
   }
 };

  return (
    <div
      className={`flex mt-4 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <motion.div
        className={`max-w-xs md:max-w-2xl p-3 rounded-xl text-sm antialized font-normal ${
          sender === "user"
            ? "bg-neutral-200 text-neutral-900"
            : "text-neutral-900"
        }`}
        initial={{ opacity: 0, y: 20 }} // Starting state
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        exit={{ opacity: 0, y: -20 }} // Exit animation
        transition={{ duration: 0.3 }} // Animation duration
      >
        {sender === "bot" && typing ? (
          <motion.div
            className="flex items-center"
            initial={{ width: 0 }} // Start with 0 width
            animate={typingControls} // Use typing animation controls
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              borderRight: "3px solid", // Blinking cursor
              fontFamily: "monospace",
              fontSize: "1em", // Adjust font size as needed
            }}
          >
            Typing...
          </motion.div>
        ) : (
          <>
            <div className="flex items-center">
              {sender === "bot" && (
                <Avatar className="mr-2">
                  {" "}
                  {/* Add margin to space out the avatar */}
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <span>{text}</span>
            </div>
            {sender === "bot" && (
              <div className="flex ml-10 mt-4 space-x-6">
                <button
                  onClick={() => handleFeedback("positive")}
                  disabled={!!submittedFeedback}
                >
                  <ThumbsUp
                    size={17}
                    className={`${
                      submittedFeedback === "positive"
                        ? "text-green-500" // Style for submitted positive feedback
                        : "hover:text-mblue"
                    }`}
                  />
                </button>
                <button
                  onClick={() => handleFeedback("negative")}
                  disabled={!!submittedFeedback}
                >
                  <ThumbsDown
                    size={17}
                    className={`${
                      submittedFeedback === "negative"
                        ? "text-red-500" // Style for submitted negative feedback
                        : "hover:text-mblue"
                    }`}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ChatMessage;
