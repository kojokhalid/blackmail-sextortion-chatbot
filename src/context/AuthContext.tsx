// AuthContext.tsx
import React, { createContext, useState, ReactNode,} from "react";

interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthContextType {
  authTokens: AuthTokens | null;
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokens | null>>;
  logoutUser: () => void;
  loginUser: (values: { username: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fix here: Type children as ReactNode (which represents any valid React children)
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"; // Redirect to login page
  };

  const loginUser = async (values: { username: string; password: string }) => {
    try {
      const response = await fetch(
        "https://djangoredeploy.onrender.com/api/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        setAuthTokens({
          access: data.access,
          refresh: data.refresh,
        });
      } else {
        const errorData = await response.json(); // Extract error
        throw new Error(errorData.detail || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{ authTokens, setAuthTokens, logoutUser, loginUser }}
    >
      {children} {/* Render the children passed into this provider */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
