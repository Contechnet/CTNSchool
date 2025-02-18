<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { useAuthStore } from "./stores/authStore";

const authStore = useAuthStore();
</script>
