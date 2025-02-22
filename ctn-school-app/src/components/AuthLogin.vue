<template>
  <div class="d-flex justify-space-between align-center">
    <h5 class="text-h5 text-center mb-0 font-weight-bold">Login</h5>
    <router-link to="/" class="text-primary text-decoration-none"
      >Don't Have an account?</router-link
    >
  </div>
  <v-form @submit.prevent="handleLogin" class="mt-7 loginForm">
    <div class="mb-6">
      <v-label>Username</v-label>
      <v-text-field
        v-model="username"
        :rules="requiredUsername"
        class="mt-2"
        density="comfortable"
        required
        hide-details="auto"
        variant="outlined"
      ></v-text-field>
    </div>
    <div>
      <v-label>Password</v-label>
      <v-text-field
        v-model="password"
        :rules="requiredPassword"
        required
        variant="outlined"
        density="comfortable"
        @click:append-inner="visible = !visible"
        hide-details="auto"
        :type="visible ? 'text' : 'password'"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        class="mt-2"
      >
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <div class="ml-auto">
        <router-link to="/login" class="text-darkText link-hover"
          >Forgot Password?</router-link
        >
      </div>
    </div>
    <v-btn
      color="primary"
      block
      class="mt-5"
      variant="flat"
      :loading="loader"
      size="large"
      type="submit"
    >
      Login</v-btn
    >
    <div v-if="errorMessage" class="mt-2">
      <v-alert color="error">{{ errorMessage }}</v-alert>
    </div>
  </v-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const visible = ref(false);
const loader = ref(false);
const password = ref("");
const username = ref("");
const errorMessage = ref(null);
const requiredUsername = ref([(v) => !!v || "Username is required"]);
const requiredPassword = ref([(v) => !!v || "Password is required"]);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loader.value = true;
  errorMessage.value = null; // Reset error message
  const success = await authStore.login(username.value, password.value);
  if (success) {
    router.push("/overview");
  } else {
    errorMessage.value = "Invalid username or password.";
  }
  loader.value = false;
};
onMounted(async () => {
  if (authStore.user?.id) {
    router.push("/overview");
  }
});
</script>

<style lang="scss">
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
  .link-hover {
    text-decoration: unset;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
