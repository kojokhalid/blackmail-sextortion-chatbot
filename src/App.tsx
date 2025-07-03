import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/Chat";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTP from "./pages/OTP";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
// import PrivateRoute from "@/utils/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";
import Report from "./pages/Report";
import { Toaster } from "@/components/ui/toaster";
import ChatSession from "./pages/ChatSession";
import NotFound from "./pages/NotFound";
import FeedbackPage from "./pages/FeedbackPage";
import Admin from "./pages/Admin";
import AdminLayout from "./layouts/AdminLayout";

// Resource pages
import DigitalLiteracyCourse from "./pages/resources/DigitalLiteracyCourse";
import SupportPage from "./pages/SupportPage";

// Tool pages
import PrivacySettingsChecker from "./pages/tools/PrivacySettingsChecker";
import ScamMessageAnalyzer from "./pages/tools/ScamMessageAnalyzer";

// Community pages
import SupportGroups from "./pages/community/SupportGroups";
import WorkshopsEvents from "./pages/community/WorkshopsEvents";
import { ThemeProvider } from "@/components/theme-provider"
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout children={<Home />} />,
  },
  {
    path: "/home",
    element: <MainLayout children={<Home />} />,
  },
  {
    path: "/resources",
    element: <MainLayout children={<Resources />} />,
  },
  {
    path: "/chat",
    element: <MainLayout children={<Chat />} />,
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
    path: "/feedback",
    element: <MainLayout children={<FeedbackPage />} />,
  },
  {
    path: "/resources/course",
    element: <MainLayout children={<DigitalLiteracyCourse />} />,
  },
  {
    path: "/support",
    element: <MainLayout children={<SupportPage />} />,
  },
  {
    path: "/tools/privacy-checker",
    element: <MainLayout children={<PrivacySettingsChecker />} />,
  },
  {
    path: "/tools/scam-analyzer",
    element: <MainLayout children={<ScamMessageAnalyzer />} />,
  },
  {
    path: "/community/support-groups",
    element: <MainLayout children={<SupportGroups />} />,
  },
  {
    path: "/community/workshops-events",
    element: <MainLayout children={<WorkshopsEvents />} />,
  },
  {
    path: "/admin",
    element: <AdminLayout children={<Admin />} />,
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
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
