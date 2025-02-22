<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card flat class="pa-3 mx-auto outlined" max-width="400">
      <v-card-title class="text-h5 text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username"
                hide-details
                variant="outlined"
                density="comfortable"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                hide-details
                label="Password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                placeholder="Enter your password"
                @click:append-inner="visible = !visible"
                variant="outlined"
                density="comfortable"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-alert
                v-if="errorMessage"
                type="error"
                variant="tonal"
                class="mt-1"
                >{{ errorMessage }}</v-alert
              >
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn type="submit" color="primary" class="mt-4">Login</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const visible = ref(false);

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
onMounted(async () => {
  if (authStore.user?.id) {
    router.push("/overview");
  }
});
</script>
