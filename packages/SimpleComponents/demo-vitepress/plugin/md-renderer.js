const hljs = require('highlight.js');
const marked = require('marked');
const heading = require('./heading');
const escape = require('lodash/escape');

function createRenderer(options) {
    const renderer = new marked.Renderer(options);
    const overrides = {
        table(header, body) {
            return `
                <v-table>
                    <thead>
                    ${header}
                    </thead>
                    <tbody>
                    ${body}
                    </tbody>
                </v-table>
            `;
        },

        tablerow(content) {
            return '<tr>\n' + content + '</tr>\n';
        },

        tablecell(content, flags) {
            const type = flags.header ? 'th' : 'td';
            const tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
            return tag + content + '</' + type + '>\n';
        },

        code: (code, language) => {
            const isLanguageValid = !!(language && hljs.getLanguage(language));
            if (!isLanguageValid) {
                throw new Error(`MdRendererError: ${language} is not valid for code - ${code}`);
            }
            const highlighted = hljs.highlight(code, { language }).value;
            return `
<v-card :has-header="false">
<template #body>
<v-code class="svc-doc-code">
<pre>
${highlighted}
</pre>
</v-code>
</template>
</v-card>
                `;
        },
        heading: (text, level) => {
            return heading(text, level);
        },
        blockquote: (quote) => {
            return `<v-blockquote class="svc-doc-blockquote">${quote}</v-blockquote>`;
        },
        hr: () => '<v-hr />',
        paragraph: (text) => {
            return `<v-p class="svc-doc-p">${text}</v-p>`;
        },
        link(href, title, text) {
            if (/^(http:|https:)/.test(href)) {
                return `<v-a class="svc-doc-a" href="${href}" target="_blank">${text}</v-a>`;
            }
            return `<router-link to="${href}" #default="{ navigate, href }" custom><v-a :href="href" @click="navigate" class="svc-doc-a">${text}</v-a></router-link>`;
        },
        list(body, ordered, start) {
            start = ordered ? start : false;
            return `
            <v-list :ordered="${ordered}" :start="${start}">
              ${body}
            </v-list>
            `;
        },
        listitem(text) {
            return `<v-li class="svc-doc-list">${text}</v-li>`;
        },
        codespan(code) {
            return `<v-typo-text class="svc-doc-codespan" code>${code}</v-typo-text>`;
        },
        strong(text) {
            return `<v-typo-text class="svc-doc-strong" strong>${text}</v-typo-text>`;
        },
        checkbox(checked) {
            return `<v-typo-text>${checked}</v-typo-text>`;
        },
    };
    Object.keys(overrides).forEach((key) => {
        renderer[key] = overrides[key];
    });
    return renderer;
}

module.exports = createRenderer;

