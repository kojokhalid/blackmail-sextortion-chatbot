// src/auth/useAuth.ts
import { useState } from "react";
import axiosInstance from "./axiosInstance";
import { refreshToken as refreshAccessToken } from "./authService";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: !!localStorage.getItem("accessToken"),
    accessToken: localStorage.getItem("accessToken"),
  });

  async function login(email: string, password: string) {
    try {
      const response = await axiosInstance.post<{
        access: string;
        refresh: string;
      }>("/api/sign-in/", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      setAuth({
        isAuthenticated: true,
        accessToken: response.data.access,
      });
    } catch (error) {
      console.error("Login failed:", error);
      setAuth({
        isAuthenticated: false,
        accessToken: null,
      });
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuth({
      isAuthenticated: false,
      accessToken: null,
    });
  }

  async function refreshAccessTokenIfExpired() {
    const newToken = await refreshAccessToken();
    if (newToken) {
      setAuth((prev) => ({ ...prev, accessToken: newToken }));
    }
  }

  return { auth, login, logout, refreshAccessTokenIfExpired };
}
