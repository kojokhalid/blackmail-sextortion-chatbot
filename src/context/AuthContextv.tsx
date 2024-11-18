import React, { createContext, useState, ReactNode, FormEvent } from "react";
import jwtDecode from "jwt-decode";

// Define the types for the decoded JWT and context state

// User type based on JWT payload
interface User {
  username: string;
  email?: string; // Optional fields, you can extend this with more properties from the JWT
}

// Response type when logging in
interface ResponseData {
  access: string; // The JWT token
  refresh: string; // Optional, if your API returns a refresh token
}

// AuthContextType describes the context value that will be provided
interface AuthContextType {
  user: { username: string } | null;
  authTokens: { access: string; refresh: string } | null;
  loginUser: (values: { email: string; password: string }) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
