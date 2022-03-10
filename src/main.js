import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue3-cookies'
import common from '@/assets/js/common.js'

axios.defaults.baseURL = 'http://133.186.212.200:8080'

const app = createApp(App)
app.config.globalProperties.axios = axios

app.use(store).use(router).use(VueCookies).use(common).mount('#app')

// createApp(App)
//   .use(store)
//   .use(router)
//   .use(VueCookies)
//   .use(common)
//   .config.globalProperties.axios(axios)
//   .mount('#app')
