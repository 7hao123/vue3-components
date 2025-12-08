import DefaultTheme from 'vitepress/theme'

import ZIcon from '@mine/components/icon'
import '@mine/theme-chalk/src/index.scss'
console.log(ZIcon)
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon) //在vitePress中注册全局组件
  }
}
