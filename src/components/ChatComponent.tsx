import React, { useState, useEffect, useRef } from "react";
import { SendHorizontal, Paperclip } from "lucide-react"; // Icons
import { motion } from "framer-motion"; // Animation
import ChatMessage from "./ChatMessage"; // Adjust the path based on your folder structure

type Message = {
  sender: "user" | "bot";
  text: string;
};

function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [typing, setTyping] = useState(false);
  const [botMessage, setBotMessage] = useState<string>("");

  useEffect(() => {
    // Scroll to the bottom whenever a new message is added
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Bot typing effect
    const typeBotMessage = (text: string) => {
      setTyping(true);
      setBotMessage("");
      let index = 0;
      const typingInterval = setInterval(() => {
        setBotMessage((prev) => prev + text.charAt(index));
        index++;
        if (index === text.length) {
          clearInterval(typingInterval);
          setTyping(false);
        }
      }, 100);
    };

    // Only trigger typing effect for the latest bot message
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "bot" &&
      !typing
    ) {
      const lastMessage = messages[messages.length - 1];
      typeBotMessage(lastMessage.text);
    }
  }, [messages, typing]); // Removed typing dependency to avoid endless loop

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputValue },
    ]);

    setInputValue("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: { bot_response: string } = await response.json();

      // Add the bot response after a short delay to simulate typing
      setTyping(true); // Set typing to true before sending the message
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.bot_response },
        ]);
        setTyping(false); // Reset typing state after adding the message
      }, 1000); // Delay to simulate typing effect
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, I couldn't connect to the server." },
      ]);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-3xl mx-auto text-black">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            text={
              message.sender === "bot" &&
              typing &&
              index === messages.length - 1
                ? botMessage
                : message.text
            } // Show typing text only for the latest bot message
          />
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 flex items-center">
        <button className="mr-2" onClick={() => console.log("Attach image")}>
          <Paperclip />
        </button>
        <input
          type="text"
          className="flex-1 text-neutral-950 rounded-full p-3 outline-none"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <button className="px-2 py-2 rounded-lg" onClick={handleSendMessage}>
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
