<template>
  <v-app>
    <Sidebar v-if="authStore.isAuthenticated" />
    <Header v-if="authStore.isAuthenticated" />

    <v-main class="page-wrapper">
      <router-view />
    </v-main>
    <Notivue class="notification" v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </v-app>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import { Notivue, Notification, push } from "notivue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
</script>
<style lang="scss">
.notification {
  z-index: 1000 !important;
}
</style>
