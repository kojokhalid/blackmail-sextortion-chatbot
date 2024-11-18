import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTP from "./pages/OTP";
import ResourceHub from "./pages/ResourceHub";
import PrivateRoute from "@/utils/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";
import Report from "./pages/Report";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />

        <Routes>
          <Route
            path="/chat"
            element={
              <MainLayout>
                <PrivateRoute>
                  <Chat></Chat>
                </PrivateRoute>
              </MainLayout>
            }
          ></Route>
          <Route index path="/" element={<Login></Login>}></Route>
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
            path="/report"
            element={
              <MainLayout>
                <Report></Report>
              </MainLayout>
            }
          ></Route>

          <Route index path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/verify-otp" element={<OTP></OTP>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
