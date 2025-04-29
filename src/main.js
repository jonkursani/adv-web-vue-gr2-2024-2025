import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import global i komponentes
import ChildComp from '@/components/ChildComp.vue'

// creates vue application
const app = createApp(App)

// parametri i pare eshte emri qysh i referohemi ne html, i dyti eshte komponenta
app.component('ChildComp', ChildComp)
app.use(createPinia()) // perdore store
app.use(router) // perdore routerin

// SPA - single page application
// mounts the app to the DOM
app.mount('#app')
