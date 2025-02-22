import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    sidebar_drawer: true,
    mini_sidebar: false,
    theme: 'light',
  }),

  actions: {
    setMiniSidebar(payload) {
      this.mini_sidebar = payload;
    },
    setSidebarDrawer() {
      this.sidebar_drawer = !this.sidebar_drawer;
    },
  },
});
