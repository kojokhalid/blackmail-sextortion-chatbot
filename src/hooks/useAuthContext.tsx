// useAuthContext.tsx
import { useContext } from "react";
import AuthContext from "@/context/AuthContext"; // Adjust the path if necessary

// Custom hook to use AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
