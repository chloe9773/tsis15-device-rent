import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from '@/assets/js/common.js'

createApp(App)
  .use(store)
  .use(router)
  .use(common)
  .mount('#app')
