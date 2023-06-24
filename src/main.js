import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import store from './store'

import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});

app.mount('#app')