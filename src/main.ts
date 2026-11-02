import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { vReveal } from './composables/motion'
import './styles/tokens.css'
import './styles/base.css'

createApp(App).use(router).directive('reveal', vReveal).mount('#app')
