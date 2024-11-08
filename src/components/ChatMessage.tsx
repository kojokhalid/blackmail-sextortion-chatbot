import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  sender: "user" | "bot";
  text: string;
  typing?: boolean; // Optional prop for typing indicator
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, typing }) => {
  return (
    <div
      className={`flex mt-4 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <motion.div
        className={`max-w-xs md:max-w-md p-3 rounded-xl text-sm ${
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
          <span>Typing...</span>
        ) : (
          <div className="flex items-center">
            {sender === "bot" && (
              <Avatar className="mr-2">
                {" "}
                {/* Add margin to space out the avatar */}
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <span>{text}</span> {/* Use span for text to keep it inline */}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatMessage;
