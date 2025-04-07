import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// creates vue application
const app = createApp(App)

app.use(createPinia())
app.use(router)

// SPA - single page application
// mounts the app to the DOM
app.mount('#app')
