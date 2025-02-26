<template>
    <component
        :is="getLayout()"
        v-bind="layoutProps"
        :code="stableCode"
        :lang="lang"
        :prism-lang="prismLang"
        :requires="requires"
        :data-scope="dataScope"
        :components="components"
    >
        <template #editor>
            <vue-monaco :value="stableCode" :delay="delay" @change="updatePreview" />
        </template>
        <template #preview>
            <!--
                * Emitted every time the component rendered throws an error
                * Catches runtime and compilation errors
                * @event error
                * @property { Error } - the error thrown
            -->
            <vue-live-preview
                :key="codeKey"
                :code="model"
                :components="components"
                :requires="requires"
                :jsx="jsx"
                :data-scope="dataScope"
                :check-variable-availability="checkVariableAvailability"
                @detect-language="switchLanguage"
                @error="handleError"
                @success="error = undefined"
            />
        </template>
    </component>
</template>
<script>
import hash from 'hash-sum';

import { VueLivePreview } from 'vue-live';
import VueMonaco from './vue-monaco.vue';

const LANG_TO_PRISM = {
    vue: 'html',
    vsg: 'vsg',
};

const UPDATE_DELAY = 300;

export default {
    name: 'VueLive',
    components: { VueLivePreview, VueMonaco },
    props: {
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
        getLayout: {
            type: Function,
            default: () => ({}),
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
            default: () => ({}),
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
            model: this.code,
            lang: 'vue',
            prismLang: 'html',
            /**
             * this data only gets changed when changing language.
             * it allows for copy and pasting without having the code
             * editor repainted every keystroke
             */
            stableCode: this.code,
            error: undefined,
        };
    },
    computed: {
        codeKey() {
            return hash(this.model);
        },
    },
    watch: {
        code(newCode) {
            this.stableCode = newCode;
            this.model = newCode;
        },
    },
    methods: {
        updatePreview(code) {
            this.stableCode = code;
            this.model = code;
            this.$emit('change', code);
        },
        switchLanguage(newLang) {
            this.lang = newLang;
            const newPrismLang = LANG_TO_PRISM[newLang];
            if (this.prismLang !== newPrismLang) {
                this.prismLang = newPrismLang;
                this.stableCode = this.model;
            }
        },
        handleError(e) {
            console.error(e);
            this.error = e;
            this.$emit('error', e);
        },
    },
};
</script>

