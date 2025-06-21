import React, { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import { useAuthContext } from "@/hooks/useAuthContext"; // Adjust the path if necessary

import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import MoonLoader from "react-spinners/MoonLoader";
type Message = {
  sender: "user" | "bot";
  text: string;
};
 export const Feedback = () => {
    return (
      <div>feedback 1</div>
    )
  }
const ChatSession = () => {
  const { username, fetchWithAuth } = useAuthContext();

  const { sessionId } = useParams();
  // const [history, setHistory] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [isBotTyping, setIsBotTyping] = useState(false); // New state to track bot typing
  const [isNewChat, setIsNewChat] = useState(true);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const fetchChatHistory = async () => {
    if (!sessionId)
      throw new Error("sessionId is required to fetch chat history");
    const url = `https://eve-chatbot-stmh.onrender.com/api/chat/auth?sessionId=${sessionId}`;
    try {
      const response = await fetchWithAuth(url);
      if (response.status == 200) {
        const data = await response.json();
        console.log("this is the data", data);
        // setHistory(data.data[0]?.messages || []);
        setMessages(
          data.data[0]?.messages.map((item: any) => ({
            sender: item.sender,
            text: item.message,
          })) || []
        );
        console.log(`new data fetched for ${sessionId}`);
      } else {
        console.warn("Session not found. Starting a new chat.");
        setIsNewChat(true);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };
  // Fetch chat history when the component mounts or when sessionId changes
  useEffect(() => {
    console.log(`sessionId: ${sessionId}`);
    fetchChatHistory();
  }, [sessionId]); // Add sessionId to the dependency array

  // Scroll to the bottom when new message is added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messages);
  }, [messages]);
  // Disable the send button if there is no input
  useEffect(() => {
    setisDisabled(!inputValue.trim());
  }, [inputValue,isBotTyping]);

    // Disable the send button if there is no input
    useEffect(() => {
      setisDisabled(!inputValue.trim());
    }, [inputValue,isBotTyping]);
  
  const handleSendMessage = async () => {

    
    if (!inputValue.trim()) return;

        setLoading(true);
    setIsBotTyping(true); // Show Skeleton while waiting for response

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputValue },
    ]);
    setInputValue("");
    if (isNewChat) setIsNewChat(false);

    const url = username
      ? `https://eve-chatbot-stmh.onrender.com/api/chat/auth`
      : "https://eve-chatbot-stmh.onrender.com/api/chat/noauth";

    const payload: any = { message: inputValue };

    if (sessionId) payload.sessionId = sessionId;

    try {
      const response = await (username ? fetchWithAuth : fetch)(url, {
        method: "POST", // Use POST instead of GET to send data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: { bot: string; sessionId: string } = await response.json();
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.bot },
        ]);
      }, 1000);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to the server.",
        },
      ]);
    }
    finally{
      setIsBotTyping(false);
      setLoading(false);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  
 
  
  return (
    <main className="w-full h-screen flex-col md:flex-row relative">
      {isLoading && <MoonLoader size={50} />}
      <div className="flex flex-col h-screen w-full max-w-3xl mx-auto text-black relative">
         <div className="overflow-y-scroll flex flex-col w-full max-w-3xl mx-auto text-black relative h-[700px] sm:h-[700px] lg:h-[700px] md:h-[1200px]">
        <div className="px-6">
          {messages.map((message, index) => (

            

            <ChatMessage
              key={index}
              sender={message.sender}
              text={
                message.sender === "bot" ?
                   <ReactMarkdown>{message.text}</ReactMarkdown> : message.text
              }

            />
            
            
          ))}
          
           {isBotTyping && (
            <div className="flex items-center space-x-2">
               <Skeleton className="h-4 w-4 rounded-full "/>
               <Skeleton className="h-3 w-3 rounded-full"/> 
               <Skeleton className="h-2 w-2 rounded-full "/>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>
      </div>
      <div className="flex lg:justify-center lg:items-center">
      <div className="fixed bottom-0 p-4 flex items-center w-full mb-8 lg:w-[800px]">
        <button className="mr-2" onClick={() => console.log("Attach image")}>
          {/* <Paperclip /> */}
        </button>
        <input
          type="text"
          className="flex-1 text-neutral-950 rounded-full p-3 border focus:outline-none focus:ring-0"
          placeholder="Type your message..."
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
          <ArrowUp className={`text-white rounded-full p-2 ${isDisabled || isLoading ? "bg-slate-400" : "bg-mblue"}`} size={40} />
        </button>


       
      </div>
      <div>
        
      </div>
      <div className=" flex flex-1 m-4 justify-center items-center">
      <div className="fixed p-4 bottom-0 text-slate-400">
               <p className="text-xs">© 2025 Safeguard Chatbot. All Rights Reserved.
This is a beta version of Safeguard Chatbot and is subject to change.</p>

      </div>
      </div>
      
      </div>
      
      </div>
    </main>
  );
};

export default ChatSession;
