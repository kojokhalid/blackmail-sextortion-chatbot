import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/Chat";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTP from "./pages/OTP";
import ResourceHub from "./pages/ResourceHub";
// import PrivateRoute from "@/utils/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";
import Report from "./pages/Report";
import { Toaster } from "@/components/ui/toaster";
import ChatSession from "./pages/ChatSession";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    index:true,
    element: <MainLayout children={<ResourceHub />}/>,
  },
  {
    path: "/resourcehub",
    index:true,
    element: <MainLayout children={<ResourceHub />}/>,
  },
      {
        path: "/chat",
        element: <MainLayout children={<Chat />}/>,
      },
      {
        path: "/chat/:sessionId",
        element: <MainLayout children={<ChatSession />} />,
      },
      {
        path: "/report",
        element: <MainLayout children={<Report />} />,
      },
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verify-otp",
    element: <OTP />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
