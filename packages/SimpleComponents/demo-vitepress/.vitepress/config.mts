import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import container from 'markdown-it-container'; 
import { renderSandbox } from 'vitepress-plugin-sandpack'; 
import { createDocPlugin } from '../plugin/vite-plugin-doc';
import vue from '@vitejs/plugin-vue';
const componentsDocsDir = path.resolve(__dirname, '../dist/components');
const getDirectories = (source) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name); 

const generateSidebarConfig = () => {
  const componentDirs = getDirectories(componentsDocsDir);
  const sidebarItems = componentDirs.map((component) => {
    // const srcDir = path.join(componentsDocsDir, component, 'src');
    const srcDir = path.join(componentsDocsDir, component);
    const mdFiles = fs.readdirSync(srcDir).filter((file) => file.endsWith('.md'));
    return mdFiles.map((mdFile) => {
      const fileName = mdFile.replace('.md', '');
      return {
        text: fileName,
        link: `components/${component}/${fileName}`
      };
    });
  }).flat();
  return sidebarItems;
};

const sidebarConfig = generateSidebarConfig();

// const renderNora = (tokenList: any[], index: number, htmlTagName: string) => {
//   const renderFunc = (tokens: any[], idx: number, htmlTag: string) => {
//     if (tokens[idx].nesting === 1) {
//       // 收集 `::: nora` 內的內容
//       let codeContent = '';
//       for (
//         let i = idx + 1;
//         tokens[i] && !(tokens[i].nesting === -1 && tokens[i].type === 'container_nora_close');
//         i++
//       ) {
//         if (tokens[i].type === 'fence' || tokens[i].type === 'html_block' || tokens[i].type === 'text') {
//           codeContent += tokens[i].content + '\n';
//         }
//       }

//       return `<vue-custom-live :get-layout="() => this.$.appContext.components['VueLiveLayout']" :lang="'vue'" :code="\`${codeContent.trim()}\`" :requires="{${[].join(',')}}" />`;
//     }
//     return '';
//   };

//   return renderFunc(tokenList, index, htmlTagName);
// };

const renderNora = (tokenList: any[], index: number, htmlTagName: string) => {
  const renderFunc = (tokens: any[], idx: number, htmlTag: string) => {
    if (tokens[idx].nesting === 1) {
      let codeContent = '';
      let filePath = '';
      let sourceType = 'file';

      // 解析 attrs 取得 source 參數（如果有的話）
      const attrs = tokens[idx].attrs || [];
      console.log('attars', attrs)
      const sourceAttr = attrs.find(([key]) => key === 'source');
      if (sourceAttr) {
        sourceType = sourceAttr[1];
      }

      for (
        let i = idx + 1;
        tokens[i] && !(tokens[i].nesting === -1 && tokens[i].type === 'container_nora_close');
        i++
      ) {
        if (sourceType === 'file' && tokens[i].type === 'inline') {
          filePath = tokens[i].content.trim();
          tokens[i].content = '';
          tokens[i].type = 'html_inline';
          break;
        } else if (sourceType === 'inline' && (tokens[i].type === 'fence' || tokens[i].type === 'html_block' || tokens[i].type === 'text')) {
          codeContent += tokens[i].content + '\n';
        }
      }

      if (sourceType === 'file' && filePath) {
        const fullPath = path.resolve(process.cwd(), `${filePath}.vue`);
        try {
          codeContent = fs.readFileSync(fullPath, 'utf-8');
        } catch (err) {
          console.error(`Error reading file: ${fullPath}`, err);
          codeContent = `<!-- Error: File ${filePath}.vue not found -->`;
        }
      }

      return `<vue-custom-live :get-layout="() => this.$.appContext.components['VueLiveLayout']" :lang="'vue'" :code="\`${codeContent.trim()}\`" :requires="{${[].join(',')}}" />`;
    }
    return '';
  };

  return renderFunc(tokenList, index, htmlTagName);
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Simple Components",
  description: "A VitePress site to demo components",
  cleanUrls: true,
  srcDir: 'dist',
  rewrites: {
    // 'dist/(.*)': '(.*)'
    'dist/(.*)': '(.*)'
  },
  markdown: {
    config: (md) => {
      md.use(container, 'sandbox', {  
          render(tokens: any[], idx: number) { 
              return renderSandbox(tokens, idx, 'sandbox'); 
          } 
      }); 
      md.use(container, 'nora', {
        render(tokens: any[], idx: number) {
          return renderNora(tokens, idx, 'nora')
        }
      })
    }},
  vite: {
    // plugins: [vue(),...(await createDocPlugin({ vuePlugin: vue }))],
    // plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../../'), // resolve at packages/ 
            '@vitepress': path.resolve(__dirname), // .vitepress 目錄
            '@components': path.resolve(__dirname, '../', 'components'),
            '@data': path.resolve(__dirname, '../', 'data'),
            '@hooks': path.resolve(__dirname, '../', 'hooks'),
            '@pages': path.resolve(__dirname, '../', 'pages')

            // '@': new URL('../', import.meta.url).pathname, // docs 當根目錄
            // '@vitepress': new URL('../.vitepress', import.meta.url).pathname, // .vitepress 目錄
            // '@components': new URL('../components', import.meta.url).pathname,
            // '@data': new URL('../data', import.meta.url).pathname,
            // '@pages': new URL('../pages', import.meta.url).pathname
        }
    },
    optimizeDeps: {
      include: [
        `monaco-editor/esm/vs/language/json/json.worker`,
        `monaco-editor/esm/vs/language/css/css.worker`,
        `monaco-editor/esm/vs/language/html/html.worker`,
        `monaco-editor/esm/vs/language/typescript/ts.worker`,
        `monaco-editor/esm/vs/editor/editor.worker`
      ],
    },
  },
  appearance: false,
  head: [
    ['link', { rel: 'icon', href: '/simple-ui.ico' }],
    ['script', {}, `
      console.log('window', window);
      console.log('document', document);
      `
    ]
  ],
  themeConfig: {
    search: { provider: 'local' },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
      { text: 'changelog', items: 
        [
          { text: 'Components', link: '/components' },
          { text: 'Components', link: '/components' },
        ] 
      }
    ],
    sidebar: [
      {
        text: 'Start',
        link: '/'
      }, 
      {
        text: 'Components List',
        items: sidebarConfig,
        // collapsed: true
      },
      {
        text: 'Example',
        link: '/simple-components/button'
      }
    ],
    docFooter: {
      prev: false,
      next: false,
    },
    socialLinks: [
      {
        icon: {
          svg: '<svg fill="#000000" width="256px" height="256px" viewBox="-2 -2.5 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-gitlab"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10.006 18.443L6.326 7.118h7.36l-3.68 11.325zm0 0L1.168 7.118h5.158l3.68 11.325zM1.168 7.118l8.838 11.325-9.68-7.032a.762.762 0 0 1-.276-.852l1.118-3.441zm0 0L3.385.296a.38.38 0 0 1 .724 0l2.217 6.822H1.168zm8.838 11.325l3.68-11.325h5.157l-8.837 11.325zm8.837-11.325l1.119 3.441a.762.762 0 0 1-.277.852l-9.68 7.032 8.838-11.325zm0 0h-5.157L15.902.296a.38.38 0 0 1 .725 0l2.216 6.822z"></path></g></svg>'
        },
        link: 'https://github.com/vuejs/vitepress'
      }
    ],
    outline: {
      level: [2,3],
      label: 'Component'
    }
  }
})
