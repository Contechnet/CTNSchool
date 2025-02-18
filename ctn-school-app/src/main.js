import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles"; // ✅ Ensure styles are imported
import * as components from "vuetify/components"; // ✅ Register components manually
import * as directives from "vuetify/directives"; // ✅ Register directives manually

import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const vuetify = createVuetify({
  components, // ✅ Explicitly add components
  directives, // ✅ Explicitly add directives
  theme: {
    defaultTheme: "light",
  },
});

const app = createApp(App);
app.use(vuetify);
app.use(createPinia());
app.use(router);
app.mount("#app");
