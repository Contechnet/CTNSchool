import { defineStore } from "pinia";
import { loginUser } from "../api/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(username, password) {
      const response = await loginUser(username, password);

      if (response.success) {
        this.user = response.user;
        this.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(response.user));
        return true;
      } else {
        console.error(response.message);
        return false;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});
