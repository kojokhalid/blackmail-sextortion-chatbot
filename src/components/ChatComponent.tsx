import React, { useState, useRef, useContext } from "react";
import { SendHorizontal, Paperclip } from "lucide-react";
import ChatMessage from "./ChatMessage"; // Ensure you have a `ChatMessage` component for displaying messages
import { BorderBeam } from "@/components/ui/border-beam.tsx"; // Your border component (adjust as necessary)
import AuthContext from "../context/AuthContext";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatComponent = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthContext is not available. Please wrap your component in AuthProvider."
    );
  }

  const { authTokens  } = context;

  // State for profile info, messages, and input value
  // const [profile, setProfile] = useState<any[]>([""]);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [typing, setTyping] = useState(false);
  const [isNewChat, setIsNewChat] = useState(true);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch profile once when the component mounts
  // useEffect(() => {
  //   getProfile();
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // const getProfile = async () => {
  //   try {
  //     const response = await fetchWithAuth(
  //       "https://djangoredeploy.onrender.com/api/profile"
  //     );
  //     if (response.status === 200) {
  //       const data = await response.json();
  //       setProfile(data);
  //     } else if (response.status === 401) {
  //       logoutUser();
  //     }
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //     // logoutUser();
  //   }
  // };

  // Helper function to send authorized fetch requests
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = authTokens?.access;
    if (!token) {
      throw new Error("No access token found");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    };

    const response = await fetch(url, { ...options, headers });
    return response;
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputValue },
    ]);
    setInputValue("");
    if (isNewChat) setIsNewChat(false);

    try {
      const response = await fetchWithAuth(
        "https://djangoredeploy.onrender.com:8000/api/chat/",
        {
          method: "POST",
          body: JSON.stringify({ message: inputValue }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: { bot_response: string } = await response.json();

      setTyping(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.bot_response },
        ]);
        setTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, I couldn't connect to the server." },
      ]);
    }
  };

  // Handle input key press (Enter key)
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Return a new chat UI
  if (isNewChat) {
    return (
      <div className="flex flex-col h-screen w-full max-w-5xl mx-auto text-black relative">
        <div className="absolute bottom-1/3 md:bottom-1/4 justify-center lg:w-[900px] lg:h-[400px] max-w-[90%] max-h-[50%] md:max-w-[90%] md:h-[400px] border rounded-xl p-10 md:py-36 md:px-24 shadow">
          <BorderBeam />
          <div className="flex flex-col items-center justify-center content-center">
            <p className="font-normal md:text-4xl ">
              Hello, What can I help with?
            </p>
            <div className="mt-6 flex items-center w-full">
              <input
                type="text"
                className="flex-1 text-neutral-950 bg-transparent rounded-xl p-3 outline outline-1"
                placeholder="e.g., What do I do when someone threatens to leak my photos?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleInputKeyPress}
                disabled={typing}
              />
              <button
                className="px-2 py-2 rounded-lg"
                onClick={handleSendMessage}
                disabled={typing}
              >
                <SendHorizontal />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-3xl mx-auto text-black relative">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            text={
              message.sender === "bot" &&
              typing &&
              index === messages.length - 1
                ? "Typing..."
                : message.text
            }
          />
        ))}
        <div ref={messageEndRef} />
      </div>
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
          disabled={typing}
        />
        <button
          className="px-2 py-2 rounded-lg"
          onClick={handleSendMessage}
          disabled={typing}
        >
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
