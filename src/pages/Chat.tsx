import ChatComponent from "../components/ChatComponent";
import Header from "../components/Header";
const Chat = () => {
  return (
    <>
      <Header />
      <main className="w-full h-screen flex-col md:flex-row relative">
        {/* Chatbot component goes here */}
        <ChatComponent />
      </main>
    </>
  );
};

export default Chat;
