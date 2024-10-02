import React, { useState, useEffect, useRef } from "react";
import { SendHorizontal, Paperclip } from "lucide-react"; // Import Paperclip icon for attachments
import { motion } from "framer-motion"; // Import Framer Motion

function ChatComponent() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);
  const [botMessage, setBotMessage] = useState("");

  useEffect(() => {
    // Scroll to the bottom whenever a new message is added
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Function to simulate typing effect for the bot response
    const typeBotMessage = (text: string) => {
      setTyping(true);
      setBotMessage(""); // Clear previous bot message
      let index = 0;
      const typingInterval = setInterval(() => {
        setBotMessage((prev) => prev + text.charAt(index));
        index++;
        if (index === text.length) {
          clearInterval(typingInterval);
          setTyping(false);
        }
      }, 100); // Adjust the typing speed here (milliseconds)
    };

    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "user"
    ) {
      // Simulate bot response after a delay
      const responseText = "response."; // The bot's message to simulate typing
      setTimeout(() => {
        typeBotMessage(responseText);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: responseText }, // Add the bot message to chat history
        ]);
      }, 1000); // Delay before adding bot message
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add the user message to the chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputValue },
    ]);

    // Clear the input field
    setInputValue("");
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-3xl mx-auto text-neutral-200">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mt-40 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
            >
            <motion.div
              className={`max-w-xs md:max-w-md p-3 rounded-xl text-sm ${
                message.sender === "user"
                  ? "bg-neutral-900 text-white" // User message styling
                  : "text-neutral-200" // Bot message styling
              }`}
              initial={{ opacity: 0, y: 20 }} // Starting state
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              exit={{ opacity: 0, y: -20 }} // Exit animation
              transition={{ duration: 0.3 }} // Animation duration
            >
              {message.sender === "bot" && typing ? botMessage : message.text}
            </motion.div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 flex items-center">
        <button
          className="text-neutral-300 mr-2"
          onClick={() => console.log("Attach image")}
        >
          <Paperclip />
        </button>
        <input
          type="text"
          className="flex-1 bg-neutral-900 text-neutral-200 rounded-full p-3 outline-none"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <button
          className="text-neutral-300 px-2 py-2 rounded-lg"
          onClick={handleSendMessage}
        >
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
