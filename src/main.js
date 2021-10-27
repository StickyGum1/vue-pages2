import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/root.css'
import './assets/css/iconlibrary.css'
import './assets/css/navigation.css'
import './assets/css/base.css'
import './assets/css/header.css'
import './assets/css/grid.css'
import './assets/css/playerbar.css'


createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
