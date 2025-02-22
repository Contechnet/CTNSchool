<template>
  <v-navigation-drawer
    app
    cl
    left
    v-model="appStore.sidebar_drawer"
    elevation="0"
    rail-width="60"
    mobile-breakpoint="lg"
    class="leftSidebar bg-color"
    :rail="appStore.mini_sidebar"
    expand-on-hover
  >
    <div class="pa-4">
      <Logo />
    </div>
    <!-- Menu Items -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          :to="item.route"
          link
        >
          <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
          <v-list-item-title
            class="font-weight-bold text-caption"
            v-text="item.text"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/appStore";
import Logo from "../components/Logo.vue";

const authStore = useAuthStore();
const router = useRouter();
const appStore = useAppStore();

const menuItems = ref([
  { text: "Overview", route: "/overview", icon: "mdi-view-dashboard" },
  { text: "Students", route: "/students", icon: "mdi-account-group" },
  { text: "Teachers", route: "/teachers", icon: "mdi-school" },
  { text: "Classes", route: "/classes", icon: "mdi-book-open" },
  {
    text: "Assign Students",
    route: "/assign-students",
    icon: "mdi-account-plus",
  },
  {
    text: "Assign Teachers",
    route: "/assign-teachers",
    icon: "mdi-account-check",
  },
]);

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
