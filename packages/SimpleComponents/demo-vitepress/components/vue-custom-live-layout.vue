<template>
    <div class="preview-code">
        <div class="preview block">
            <slot name="preview" />
        </div>
        <div>
            <button class="show-code-btn" type="styleless" @click="onToggle"
                >Show Code</button
            >
            <button class="show-code-btn" type="styleless" @click="goToPlayground"
                >Playground</button
            >
        </div>
              <div>
            <div v-if="expanded" :class="`language-${lang} editor block`">
                <slot name="editor" />
            </div>
              </div>
    </div>
</template>

<script>
import { utoa } from '../utils/encode';
import 'prismjs/themes/prism-tomorrow.css';
import 'vue-prism-editor/dist/prismeditor.min.css';
const UPDATE_DELAY = 300;

export default {
    props: {
        lang: {
            type: String,
            default: 'vue',
        },
        /**
         * code rendered in the preview and the editor
         */
        code: {
            type: String,
            required: true,
        },
        /**
         * Layout vue component with 2 slots named `editor` & `preview`
         */
        layout: {
            type: Object,
            default: undefined,
        },
        /**
         * Hashtable of auto-registered components
         * @example { DatePicker: VueDatePicker }
         * @example { VueDatePicker }
         */
        components: {
            type: Object,
            default: () => {},
        },
        /**
         * Hashtable of modules available in require and import statements
         * in the Preview component
         * @example { lodash: require("lodash") }
         * @example { moment: require("moment") }
         */
        requires: {
            type: Object,
            default: () => {},
        },
        /**
         * Time in ms debouncing updates to the preview
         */
        delay: {
            type: Number,
            default: UPDATE_DELAY,
        },
        /**
         * Do the code contain JSX rendered functions
         */
        jsx: {
            type: Boolean,
            default: false,
        },
        /**
         * These props will be passed as a spreat to your layout
         * They can be used to change the style
         */
        layoutProps: {
            type: Object,
            default: undefined,
        },
        /**
         * Props of vue-prism-editor
         * @example { lineNumbers: true }
         * @see https://github.com/koca/vue-prism-editor
         */
        editorProps: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Outside data to the preview
         * @example { count: 1 }
         */
        dataScope: {
            type: Object,
            default: () => {},
        },
        /**
         * Set if checking variables for availability
         * when used in template
         * NOTE: if this is not checked, undefined vars will yield a blank output
         */
        checkVariableAvailability: {
            type: Boolean,
            default: true,
        },
        /**
         * Show the red markings
         * where the compiler found errors
         */
        squiggles: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            expanded: false,
        };
    },
    methods: {
        onToggle() {
            this.expanded = !this.expanded;
        },
        goToPlayground() {
          console.log('open Playground')
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
.editor.block {
    border: 1px solid #e2e2e2;
}
.preview.block {
    border: 1px solid #e2e2e2;
}
.show-code-btn.v-btn.v-btn-styleless {
    color: grey;
    &:hover,
    &:active {
        color: black;
    }
}
.preview-code .block {
    flex-grow: 1;
    width: 100%;
    border-radius: 0;
}
.preview-code .preview {
    background-color: white;
    box-sizing: border-box;
    padding: 12px;
    overflow: hidden;
    font-size: 18px; 
    line-height: 1.15;
}
@media only screen and (max-width: 568px) {
    .preview-code {
        display: block;
    }
    .preview-code .block {
        width: auto;
    }
}
@media only screen and (max-width: 419px) {
    .preview-code {
        border-radius: 0;
    }
}
</style>

