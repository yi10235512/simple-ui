import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme, type HeadConfig } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// https://vitepress.dev/reference/site-config

function inlineScript(file: string): HeadConfig {
  return [
    'script',
    {},
    fs.readFileSync(
      path.resolve(__dirname, `./inlined-scripts/${file}`),
      'utf-8'
    )
  ]
}
export default defineConfig({
// export default defineConfigWithTheme<ThemeConfig>({
  // extends: baseConfig,
  title: "My Awesome Project",
  description: "A VitePress Site",
  markdown: {
    headers: {
      level: [2, 3]
    },
     config: (md) => {
       md.use(headerPlugin)
    }
  },
  head: [
    inlineScript('restorePreference.js'),
    inlineScript('uwu.js')
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'components', link: '/components/button/' }
    ],
    sidebar: {
     "/components/": [
        {
          text: "基本",
          items: [{ text: "Button 按钮", link: "/components/button/" }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPDocOutlineItem\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomOutlineItem.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPDocAsideOutline\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomOutline.vue', import.meta.url)
          )
        }
      ]
    }
  }
})
