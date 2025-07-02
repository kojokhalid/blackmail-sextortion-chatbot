import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import safeguardchatdark from "../assets/safeguardchatdark.png";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ChatMessageProps {
  sender: "user" | "bot";
  text: string | JSX.Element | boolean;
  typing?: boolean;
  sessionId?: string;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, typing, sessionId, timestamp }) => {
  const typingControls = useAnimationControls();
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  React.useEffect(() => {
    if (typing && sender === "bot") {
      typingControls.start({ width: "100%", transition: { duration: 2, ease: "linear" } });
    }
  }, [typing, sender, typingControls]);

  const handleFeedback = async (feedback: string) => {
    if (submittedFeedback) return;

    try {
      await axios.post("https://eve-chatbot-stmh.onrender.com/api/feedback/v1/chat", {
        feedback,
        sessionId,
      });
      toast({ title: "Response submitted", description: "Thank you for your feedback" });
      setSubmittedFeedback(feedback);
    } catch {
      toast({ title: "Error", description: "Something went wrong" });
    }
  };

  return (
    <div className={`flex flex-col mt-4 ${sender === "user" ? "items-end" : "items-start"}`} aria-label={sender === "user" ? "User message" : "Bot message"}>
      <motion.div
        className={`max-w-xs md:max-w-2xl p-3 rounded-2xl text-sm font-normal antialiased 
        ${sender === "user"
            ? "bg-[#3be424] text-gray-900 rounded-tr-none"
            : "bg-[#1313bc] text-white rounded-tl-none"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {sender === "bot" && typing ? (
          <motion.div
            className="flex items-center font-mono text-white"
            initial={{ width: 0 }}
            animate={typingControls}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              borderRight: "3px solid",
            }}
            aria-label="Bot is typing..."
            role="status"
          >
            Typing...
          </motion.div>
        ) : (
          <>
            <div className="flex items-start">
              {sender === "bot" && (
                <Avatar className="mr-3 mt-1 w-8 h-8">
                  <AvatarImage src={safeguardchatdark} alt="Project SafeGuard Chatbot Avatar" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <span className="whitespace-pre-wrap">
              {sender === "bot" && typeof text === "string" ? (
  <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className="markdown-content">
    {/* {console.log("Markdown text:", text)} */}
    {text}
  </Markdown>
) : (
  text
)}
              </span>
            </div>
            {timestamp && (
              <div className={`text-[12px] mt-1 ${sender === "user" ? "text-gray-700" : "text-gray-300"}`} aria-label={`Sent at ${timestamp}`} role="note">
                {timestamp}
              </div>
            )}
            {sender === "bot" && (
              <div className="flex justify-start mt-3 space-x-4 pl-10">
                <button
                  onClick={() => handleFeedback("positive")}
                  disabled={!!submittedFeedback}
                  aria-label="Thumbs Up Feedback"
                  className={`transition-colors ${submittedFeedback === "positive"
                      ? "text-green-500"
                      : "text-gray-500 hover:text-[#3be424]"
                    }`}
                >
                  <ThumbsUp size={18} />
                </button>
                <button
                  onClick={() => handleFeedback("negative")}
                  disabled={!!submittedFeedback}
                  aria-label="Thumbs Down Feedback"
                  className={`transition-colors ${submittedFeedback === "negative"
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                    }`}
                >
                  <ThumbsDown size={18} />
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