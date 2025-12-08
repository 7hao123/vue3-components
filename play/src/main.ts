import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@mine/theme-chalk/src/index.scss'
import Icon from '@mine/components/icon'
import Tree from '@mine/components/tree/index'

const plugins = [Icon, Tree]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))
console.log(app)
app.mount('#app')
