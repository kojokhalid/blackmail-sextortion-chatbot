import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route
            path="/chat"
            element={
              <MainLayout >
                <Chat></Chat>
              </MainLayout>
            }
          ></Route>
            <Route
            path="/chat/:sessionId"
            element={
              <MainLayout>
                <ChatSession></ChatSession>
              </MainLayout>
            }
          ></Route>
          <Route
            index
            path="/resourcehub"
            element={
              <MainLayout>
                <ResourceHub></ResourceHub>
              </MainLayout>
            }
          ></Route>
          <Route
            index
            path="/"
            element={
              <MainLayout>
                <ResourceHub></ResourceHub>
              </MainLayout>
            }
          ></Route>
          <Route
            path="/report"
            element={
              <MainLayout>
                <Report></Report>
              </MainLayout>
            }
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/verify-otp" element={<OTP></OTP>}></Route>
          <Route path={"*"} element={<NotFound></NotFound>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
