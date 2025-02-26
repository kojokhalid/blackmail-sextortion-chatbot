// src/auth/authService.ts
import axios from "axios";

// Refresh the token
export async function refreshToken(): Promise<string | null> {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;

  try {
    const response = await axios.post<{ access: string }>(
      "/api/token/refresh/",
      { refresh }
    );
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (error) {
    localStorage.clear(); // Clear tokens if refresh fails
    return null;
  }
}
