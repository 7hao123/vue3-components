import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'z-ui 组件库',
  description: '基于 Vue 3 的组件库',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/quieStart' },
      { text: '组件', link: '/components' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '快速开始', link: '/guide/quieStart' }]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [{ text: 'Icon 图标', link: '/components/icon' }]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com' }]
  }
})
