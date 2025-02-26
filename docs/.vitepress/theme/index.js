import DefaultTheme from "vitepress/theme";
import "@simple-ui/theme-simple/index.less";
import Preview from "./preview/index.vue";
import Tab from "./Tab.vue";
import ModeSwitch from "./ModeSwitch.vue";
import Layout from "./Layout.vue";
import "highlight.js/styles/base16/summerfruit-light.css";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import {
  preferComposition,
  filterHeadersByPreference
} from './preferences'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.provide('prefer-composition', preferComposition)
    app.provide('filter-headers', filterHeadersByPreference)
    app.component('preview', Preview);
    app.component('Tab', Tab);
    app.component('ModeSwitch', ModeSwitch);
    app.use(hljsVuePlugin);
  },
};
