<template>
    <div class="vue-monaco-editor" @wheel.capture="onWheel">
        <div ref="editor" class="inner" />
    </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import debounce from 'lodash/debounce';
import theme from './monaco-theme';
self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker();
        }
        return new editorWorker();
    },
};

monaco.editor.defineTheme('svc-theme', theme);
monaco.editor.setTheme('vs');

export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        lang: {
            type: String,
            default: 'html',
        },
        delay: {
            type: Number,
            default: 100,
        },
    },
    emits: ['change', 'input'],
    mounted() {
        this.onChange = debounce((e) => {
            this.$emit('change', this.monaco.getValue());
            this.$emit('input', this.monaco.getValue());
        }, this.delay);
        this.monaco = monaco.editor.create(this.$refs.editor, {
            value: this.value,
            language: this.lang,
            automaticLayout: true,
            scrollbar: {
                verticalSliderSize: 5,
                verticalScrollbarSize: 5,
                horizontalSliderSize: 5,
                horizontalScrollbarSize: 5,
            },
        });
        this.monaco.onDidChangeModelContent(this.onChange);
    },
    methods: {
        onWheel(e) {
            if (!this.$el.contains(document.activeElement)) {
                e.stopPropagation();
            }
        },
    },
};
</script>
<style lang="scss">
.vue-monaco-editor {
    height: 450px;
    .inner {
        height: 100%;
    }
}
</style>

