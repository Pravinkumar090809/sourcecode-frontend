import { create } from "zustand";
import Cookies from "js-cookie";
import { authAPI } from "./api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  loadFromCookies: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setAuth: (user, token) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
    set({ user, token, isLoading: false });
  },

  logout: () => {
    Cookies.remove("token");
    Cookies.remove("user");
    set({ user: null, token: null, isLoading: false });
  },

  loadFromCookies: () => {
    const token = Cookies.get("token");
    const userStr = Cookies.get("user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        // Show cached user immediately
        set({ user, token, isLoading: false });
        // Then validate token against the server in background
        authAPI.getProfile(token).then((res) => {
          if (res.success && res.data) {
            // Token still valid — refresh user data from server
            set({ user: res.data, token, isLoading: false });
            Cookies.set("user", JSON.stringify(res.data), { expires: 7 });
          } else {
            // Token expired or invalid — log out silently
            console.warn("Session expired — please log in again");
            Cookies.remove("token");
            Cookies.remove("user");
            set({ user: null, token: null, isLoading: false });
          }
        });
      } catch {
        Cookies.remove("token");
        Cookies.remove("user");
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },
}));

// Admin key constant
export const ADMIN_API_KEY = "sk_admin_pravinkumar_2026_secretkey";
