import 'vue-toastification/dist/index.css'
import './css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'
import Toast from 'vue-toastification'

import App from './App.vue'
import router from './router'

import 'vuestic-ui/css'

const app = createApp(App)

app.use(router)
app.use(Toast)
app.use(createVuestic())
app.use(createPinia())

app.mount('#app')
