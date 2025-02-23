// Plugins
import vuetify from './vuetify'
import router from '@/router'
import { createPinia } from "pinia";
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import { createNotivue } from 'notivue'

const notivue = createNotivue({
  position: 'top-right',
})

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(PerfectScrollbarPlugin)
    .use(createPinia())
    .use(notivue)

}
