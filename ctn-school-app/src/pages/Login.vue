<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-5 mx-auto" max-width="400">
      <v-card-title class="text-h5 text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-alert v-if="errorMessage" type="error" class="mt-2">{{
                errorMessage
              }}</v-alert>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn type="submit" color="primary" class="mt-4"
                >Login</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const errorMessage = ref(null);
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = null; // Reset error message
  const success = await authStore.login(username.value, password.value);

  if (success) {
    router.push("/overview");
  } else {
    errorMessage.value = "Invalid username or password.";
  }
};
</script>
