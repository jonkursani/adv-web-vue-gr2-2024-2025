import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import './assets/app.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import global i komponentes
import ChildComp from '@/components/ChildComp.vue'
import i18n from '@/locales/i18n.js'

// creates vue application
const app = createApp(App)

// parametri i pare eshte emri qysh i referohemi ne html, i dyti eshte komponenta
app.component('ChildComp', ChildComp)
app.use(createPinia()) // perdore store
app.use(router) // perdore routerin
app.use(i18n)

// SPA - single page application
// mounts the app to the DOM
app.mount('#app')
