import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'

import { Mind } from 'vue3-jsmind'
const app = createApp(App)

installElementPlus(app)
app
    .use(store)
    .use(router)
    .component('jsMind',Mind)
    .mount('#app') //把id为app的挂载上去