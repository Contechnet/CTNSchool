<template>
  <v-navigation-drawer app>
    <!-- Menu Items -->
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.text"
        :to="item.route"
        link
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- <v-spacer></v-spacer> -->
    <!-- Push logout button to bottom -->

    <!-- Logout Button -->
    <v-list>
      <v-list-item @click="handleLogout">
        <template v-slot:prepend>
          <v-icon color="red">mdi-logout</v-icon>
        </template>
        <v-list-item-title class="text-red">Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

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
