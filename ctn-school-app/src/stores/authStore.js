import { defineStore } from "pinia";
import { loginUser } from "../api/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: JSON.parse(localStorage.getItem("token")) || false,
  }),

  actions: {
    async login(username, password) {
      const response = await loginUser(username, password);
      if (response.success) {
        this.user = response.user;
        this.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", JSON.stringify(true));
        return true;
      } else {
        console.error(response.message);
        return false;
      }
    },

    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
