<template>
  <v-app>
    <Sidebar />
    <Header />

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
</script>
<style lang="scss">
.notification {
  z-index: 1000 !important;
}
</style>
