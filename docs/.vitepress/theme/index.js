import DefaultTheme from "vitepress/theme";
import SimpleUI from "@simple-ui/components";
import "@simple-ui/theme-simple/index.less";
import Preview from "./preview/index.vue";
import "highlight.js/styles/base16/summerfruit-light.css";
import hljsVuePlugin from "@highlightjs/vue-plugin";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.use(SimpleUI);
    app.component('preview', Preview);
    app.use(hljsVuePlugin);
  },
};
