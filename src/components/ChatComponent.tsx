import React, { useState, useRef, useContext, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import ChatMessage from "./ChatMessage";
import AuthContext from "../context/AuthContext";
import Markdown from 'react-markdown'
import Dialog from "./Alert-Dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";

type Message = {
  sender: "user" | "bot";
  text: string;
  timestamp?: string;
};

const ChatComponent = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "AuthContext is not available. Please wrap your component in AuthProvider."
    );
  }

  const { fetchWithAuth, username, setrefreshConversations } = context;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isNewChat, setIsNewChat] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setisDisabled(!inputValue.trim());
  }, [inputValue, isBotTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setLoading(true);
    setIsBotTyping(true);

    // User Message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "user",
        text: inputValue,
        // timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    const messageToSend = inputValue;
    setInputValue("");
    if (isNewChat) setIsNewChat(false);

    const url = username
      ? "https://eve-chatbot-stmh.onrender.com/api/chat/auth"
      : "https://eve-chatbot-stmh.onrender.com/api/chat/noauth";

    const payload: any = {
      message: messageToSend,
    };
    if (sessionId) {
      payload.sessionId = sessionId;
    }

    try {
      const response = await (username ? fetchWithAuth : fetch)(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: { bot: string; sessionId: string } = await response.json();

      setTimeout(() => {
        setIsBotTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: data.bot,
            // timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }, 1000);

      if (data.sessionId) {
        setSessionId(data.sessionId);
        navigate(`/chat/${data.sessionId}`);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setIsBotTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Failed to connect, check internet connection.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDisabled && e.key === "Enter") {
      handleSendMessage();
    }
  };

  // New Chat Screen
  if (isNewChat) {
    setrefreshConversations(true);
    return (
      <>
        <div className="overflow-y-auto flex flex-col h-screen w-full max-w-5xl mx-auto text-black relative justify-center align-center items-center">
          <div className="w-full absolute mx-auto md:bottom-1/4 justify-center lg:w-[900px] lg:h-[400px] max-w-[90%] max-h-[50%] md:max-w-[90%] md:h-[400px] border rounded-xl p-10 md:py-36 md:px-24 shadow">
            {!username && <Dialog />}
            <div className="flex flex-col items-center justify-center content-center">
              <p className="text-neutral-800 md:text-4xl">
                Hello, What can I help with?
              </p>
              <div className="mt-6 flex items-center w-full">
                <input
                  type="text"
                  className="flex-1 text-neutral-950 rounded-full p-3 border focus:outline-none focus:ring-0"
                  placeholder="e.g., What do I do when someone threatens to leak my photos?"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleInputKeyPress}
                  disabled={isLoading}
                />
                <button
                  className="px-2 py-2 rounded-lg"
                  onClick={handleSendMessage}
                  disabled={isDisabled || isLoading}
                >
                  <ArrowUp
                    className={`text-white rounded-full p-2 ${isDisabled || isLoading ? "bg-slate-400" : "bg-mblue"}`}
                    size={40}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
{/* Messages Area */}
<div className="overflow-y-scroll flex flex-col w-full max-w-3xl mx-auto text-black relative h-[700px] sm:h-[700px] lg:h-[700px] md:h-[1200px] py-4 pb-28">
  <div className="px-6">
    {messages.map((message, index) => (
      <ChatMessage
        key={index}
        sender={message.sender}
        text={message.sender === "bot" ? (
          <Markdown>{message.text}</Markdown>
        ) : (
          message.text
        )}
        sessionId={sessionId ? sessionId : "none"}
        timestamp={message.timestamp}
      />
    ))}
    {isBotTyping && (
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>
    )}
    <div ref={messageEndRef} />
  </div>
</div>

{/* Fixed Input Area */}
<div className="flex justify-center">
  <div className="fixed bottom-6 p-4 flex items-center w-full max-w-3xl rounded-t-2xl">
    <input
      type="text"
      className="flex-1 text-neutral-950 rounded-full p-3 pl-5 pr-14 border border-primary focus:outline-none focus:ring-2 focus:ring-[#1313bc] focus:border-[#1313bc] placeholder-gray-500"
      placeholder="Type your message..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleInputKeyPress}
      disabled={isLoading}
    />
    <button
      className="absolute right-8 flex items-center justify-center rounded-full p-2"
      onClick={handleSendMessage}
      disabled={isDisabled || isLoading}
    >
      <ArrowUp
        className={`text-white rounded-full p-2 ${isDisabled || isLoading ? "bg-slate-400" : "bg-mblue"}`}
        size={40}
      />
    </button>
  </div>
</div>

      <div className="flex flex-1 m-4 justify-center items-center">
        <div className="fixed p-4 bottom-0 text-slate-400">
          <p className="text-xs">
            © 2025 Safeguard Chatbot. All Rights Reserved. This is a beta version of Safeguard Chatbot and is subject to change.
          </p>
        </div>
      </div>

    </>
  );
};

export default ChatComponent;
