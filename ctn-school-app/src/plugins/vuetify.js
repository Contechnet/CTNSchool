
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from "vuetify/components"; // ✅ Register components manually
import * as directives from "vuetify/directives"; // ✅ Register directives manually
import { createVuetify } from 'vuetify'

export default createVuetify({
  components, // ✅ Explicitly add components
  directives, // ✅ Explicitly add directives
  theme: {
    defaultTheme: "light",
  },
})
