import { create } from "zustand";
import Cookies from "js-cookie";
import { authAPI } from "./api";

export const useAuthStore = create((set) => ({
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
        set({ user, token, isLoading: false });
        // Validate token in background
        authAPI.getProfile(token).then((res) => {
          if (res.success && res.data) {
            set({ user: res.data, token, isLoading: false });
            Cookies.set("user", JSON.stringify(res.data), { expires: 7 });
          } else {
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

export const ADMIN_API_KEY = "sk_admin_pravinkumar_2026_secretkey";
