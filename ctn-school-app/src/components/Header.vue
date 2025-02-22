<template>
  <v-app-bar elevation="0" height="60" class="bg-color">
    <v-btn
      class="hidden-md-and-down text-secondary mr-3"
      color="darkText"
      icon
      rounded="sm"
      variant="text"
      @click.stop="appStore.setMiniSidebar(!appStore.mini_sidebar)"
      size="small"
    >
      <v-icon color="black">mdi-backburger</v-icon>
    </v-btn>

    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="darkText"
      icon
      rounded="sm"
      variant="text"
      size="small"
      @click.stop="appStore.setSidebarDrawer"
    >
      <v-icon>mdi-backburger</v-icon>
    </v-btn>

    <v-spacer />

    <v-menu :close-on-content-click="false" offset="8, 0">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn" variant="text" rounded="sm" v-bind="props">
          <div class="d-flex align-center">
            <v-avatar class="mr-sm-2 mr-0 py-2">
              <img src="@/assets/avatar.png" alt="user" />
            </v-avatar>
            <h6 class="text-subtitle-1 mb-0 d-sm-block font-weight-bold d-none">
              {{ authStore.user?.login }}
            </h6>
          </div>
        </v-btn>
      </template>
      <v-sheet rounded="md"  width="290">
        <div>
          <div class="d-flex align-center pa-3">
            <v-avatar size="32" class="mr-2">
              <img src="@/assets/avatar.png" alt="user" width="32" />
            </v-avatar>
            <div>
              <h6 class="text-h6 mb-0">{{ authStore.user?.login }}</h6>
              <!-- <p class="text-caption mb-0">UI/UX Designer</p> -->
            </div>
            <div class="ml-auto">
              <v-btn
                variant="text"
                color="primary"
                rounded="sm"
                icon
                size="small"
                @click="handleLogout"
              >
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useAppStore } from "../stores/appStore";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const appStore = useAppStore();
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
