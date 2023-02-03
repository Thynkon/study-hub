import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(VueFire, {
    firebaseApp: firebaseApp,
    modules: [
        // ... other modules
        VueFireAuth(),
    ],
})

app.use(createPinia())
app.use(router)

app.mount('#app')
