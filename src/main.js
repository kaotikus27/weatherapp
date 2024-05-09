import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/tailwind.css"
import "./assets/output.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App).use(router).mount('#app')
