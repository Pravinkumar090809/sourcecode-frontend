import { create } from "zustand";
import Cookies from "js-cookie";
import { authAPI } from "./api";

export const ADMIN_API_KEY = "sk_admin_pravinkumar_2026_secretkey";

export const useAuthStore = create((set, get) => ({
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

  loadFromCookies: async () => {
    const token = Cookies.get("token");
    const userStr = Cookies.get("user");
    if (!token || !userStr) {
      set({ isLoading: false });
      return;
    }
    try {
      const user = JSON.parse(userStr);
      set({ user, token, isLoading: false });
      const res = await authAPI.getProfile(token);
      if (res.success) {
        set({ user: res.user || res.data });
        Cookies.set("user", JSON.stringify(res.user || res.data), { expires: 7 });
      } else {
        Cookies.remove("token");
        Cookies.remove("user");
        set({ user: null, token: null });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));
