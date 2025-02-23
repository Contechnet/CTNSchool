
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from "vuetify/components"; // ✅ Register components manually
import * as directives from "vuetify/directives"; // ✅ Register directives manually
import { createVuetify } from 'vuetify'

const light = {
  dark: false,
  colors: {
    toolbar: '#052126',
    primary: '#2196F3',
    secondary: '#9E9E9E',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#1867c0',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#F5F5F5',
    borderColor: '#e0e0e0',
    darkText: '#212121',
    lightText: '#8c8c8c',
  }
};

export default createVuetify({
  components, // ✅ Explicitly add components
  directives, // ✅ Explicitly add directives
  theme: {
    defaultTheme: 'light',
    themes: {
      light
    }
  },
})
