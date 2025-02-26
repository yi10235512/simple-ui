const path = require('path');
const hljs = require('highlight.js');
const fs = require('fs');
const marked = require('marked');
const createRenderer = require('./md-renderer');
const exampleDir = path.join(__dirname, '../../examples');
const designTokenDir = path.join(__dirname, '../design-tokens');
const rootDir = path.join(__dirname, '../../');
const sourceDir = path.join(rootDir, './src');
const escape = require('lodash/escape');
const getImports = require('../utils/get-import');
const { parse } = require('@vue/compiler-sfc');

const getScripts = (code) => {
  const parts = parse(code);
  return parts?.descriptor?.script?.content ?? '';
};
async function convertMd2ComponentDocumentation(text, url) {
  const depModules = new Set();
  const include = {
    name: 'include',
    level: 'block',
    start(src) {
      const match = src.match(/\(> include ([^:)(]+)\)/);
      if (match) {
        return match.index;
      }
    },
    tokenizer(src) {
      const rule = /^\(> include ([^:)(]+)\)/;
      const match = rule.exec(src);
      if (match) {
        const filePath = path.join(rootDir, match[1].trim());
        const token = {
          type: 'include',
          path: filePath,
          raw: match[1],
          tokens: [],
        };
        const content = fs.readFileSync(filePath, 'utf-8');
        token.tokens = marked.lexer(content);
        return token;
      }
    },
    renderer(token) {
      depModules.add(token.path);
      return this.parser.parse(token.tokens);
    },
  };
  const tip = {
    name: 'tip',
    level: 'block',
    start(src) {
      const match = src.match(/::: (info|error|warn)/);
      if (match) {
        return match.index;
      }
    },
    tokenizer(src) {
      const rule = /^::: (info|error|warn)\s*([^:]+):::/;
      const match = rule.exec(src);
      if (match) {
        const token = {
          type: 'tip',
          tipType: match[1],
          text: match[2].trim(),
          raw: match[0],
          tokens: [],
        };

        this.lexer.inline(token.text, token.tokens);
        return token;
      }
    },
    renderer(token) {
      return `<v-typo-tip type="${token.tipType}">${this.parser.parseInline(token.tokens)}</v-typo-tip>`;
    },
  };
  const demo = {
    name: 'demo',
    level: 'inline',
    start(src) {
      const match = src.match(/:::\s*demo/);
      if (match) {
        return match.index;
      }
    },
    tokenizer(src) {
      const rule = /:::\s*demo([^:]+):::/;
      const match = rule.exec(src);
      if (match) {
        return {
          type: 'demo',
          file: match[1],
          raw: match[0],
        };
      }
    },
    renderer(token) {
      if (exampleDir && token.type === 'demo') {
        const file = token.file.trim();
        const examplePath = path.join(exampleDir, `${file}.vue`);
        depModules.add(examplePath);
        let content = fs.readFileSync(examplePath, 'utf-8');
        const script = getScripts(content);
        const requires = getImports(script).map((mod) => `'${mod}': require('${mod}')`);
        content = escape(content).replace(/`/g, '\\`').replace(/\$/g, '\\$');

        return `<vue-custom-live :get-layout="getLayout" :lang="'vue'" :code="\`${content}\`" :requires="{${requires.join(
          ','
        )}}" />`;
      }
    },
  };
  const designToken = {
    name: 'design-token',
    level: 'inline',
    start(src) {
      const match = src.match(/:::\s*design-token/);
      if (match) {
        return match.index;
      }
    },
    tokenizer(src) {
      const rule = /:::\s*design-token\s?\((.*)\)([^:]+):::/;
      const match = rule.exec(src);
      if (match) {
        return {
          type: 'design-token',
          file: match[2],
          cssClass: match[1] || '[]',
          raw: match[0],
        };
      }
    },
    renderer(token) {
      if (designTokenDir) {
        const file = token.file.trim();
        let content = fs.readFileSync(path.join(designTokenDir, `${file}.json`), 'utf-8');
        content = escape(content).replace(/`/g, '\\`').replace(/\$/g, '\\$');
        return `<design-token :token="${content}" :css="${token.cssClass}" />`;
      }
    },
  };

  const scssVariables = {
    name: 'scss-variables',
    level: 'inline',
    start(src) {
      const match = src.match(/:::\s*scss-var-file/);
      if (match) {
        return match.index;
      }
    },
    tokenizer(src) {
      const rule = /:::\s*scss-var-file([^:]+):::/;
      const match = rule.exec(src);
      if (match) {
        return {
          type: 'scss-variables',
          file: match[1],
          raw: match[0],
        };
      }
    },
    renderer(token) {
      if (sourceDir) {
        const file = token.file.trim();
        const content = fs.readFileSync(path.join(themeDir, `${file}.scss`), 'utf-8');
        const highlighted = hljs.highlight(content, { language: 'scss' }).value;
        return `
<scss-var>
<pre>
${highlighted}
</pre>
</scss-var>
                    `;
      }
    },
  };

  marked.use({ extensions: [include, tip, demo, designToken, scssVariables], renderer: createRenderer() });
  const tokens = marked.lexer(text);
  const template = marked.parser(tokens);
  const docTemplate = `
<template>
  <div class="doc">
    ${template}
    <doc-toc />
  </div>
</template>
<script>
export default defineComponent({
  data() {
      return { getLayout: () => this.$.appContext.components['VueLiveLayout'] };
  }
});
</script>
`;
  return {
    template: `${docTemplate}`,
    depModules,
  };
}

module.exports = convertMd2ComponentDocumentation;

