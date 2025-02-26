// AuthProvider.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthTokens {
  access: string;
}

interface AuthContextType {
  authTokens: AuthTokens | null;
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokens | null>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  logoutUser: () => void;
  loginUser: (values: { username: string; password: string }) => Promise<"User not verified" | undefined | void>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
  getUserdata: () => void;
  refreshConversations: boolean | null;
  setrefreshConversations:React.Dispatch<React.SetStateAction<boolean | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [refreshConversations, setrefreshConversations]= useState<boolean | null>(null);
  // Restore tokens from localStorage on page load\
  const fetchToken = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setAuthTokens({ access: token });
    }
  };
  useEffect(() => {
    fetchToken();
    
  }, []);

  const logoutUser = () => {
    setAuthTokens(null);
    setUsername(null); // Clear username on logout
    localStorage.removeItem("accessToken");
    // window.location.href = "/resourcehub";
  };

  const loginUser = async (values: { username: string; password: string }) => {
    try {
      const response = await fetch("https://eve-chatbot-stmh.onrender.com/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        if (data.verified==false) {
          // navigate("/verify-otp");
          // throw new Error("User not verified");
          localStorage.setItem("uname", values.username);
          localStorage.setItem("upass", values.password);
          return "User not verified";
        }
        localStorage.setItem("accessToken", data.accessToken);
        setAuthTokens({ access: data.accessToken });
        setUsername(values.username); // Set username immediately on login

      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Fetch user data
  const getUserdata = async () => {
    if (!authTokens) return; // Avoid fetching if no token
    try {
      const response = await fetchWithAuth(
        "https://eve-chatbot-stmh.onrender.com/api/user/dashboard",
        { method: "POST" }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsername(data.data.username); // Update username dynamically
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Cannot fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  // Helper function to send authorized fetch requests
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      ...(options.headers || {}),
    };

    const response = await fetch(url, { ...options, headers });
    return response;
  };

  // Fetch user data on page load or when authTokens change
  useEffect(() => {
    if (authTokens) {
      getUserdata();
    }
  }, [authTokens]); // Depend on authTokens

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens,
        fetchWithAuth,
        getUserdata,
        username,
        setUsername,
        logoutUser,
        loginUser,
        refreshConversations,
        setrefreshConversations,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
