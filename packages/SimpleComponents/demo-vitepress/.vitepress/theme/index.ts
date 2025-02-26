// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import SimpleUI from "@simple-ui/SimpleComponents";
import SimpleUI from '../../../src/components';
import "@simple-ui/theme-simple/index.less";
import './style.css'
import './style/index.css'

import { VueLive } from 'vue-live';
import TabSwitcher from '../../components/TabSwitcher.vue';
import VueCustomLive from '../../components/vue-custom-live.vue';
import VueCustomLiveLayout from '../../components/vue-custom-live-layout.vue';
import Outline from '../../components/Outline.vue';
import Layout from './Layout.vue';
import LayoutWithTab from './LayoutWithTab.vue';
import Sandbox from '../../components/Sandbox.vue'; 
import Tab from '../../components/Tab.vue'; 
import 'vitepress-plugin-sandpack/dist/style.css'; 

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(SimpleUI);
    app.component('VueLive', VueLive);
    app.component('VueCustomLive', VueCustomLive);
    app.component('VueLiveLayout', VueCustomLiveLayout);
   // app.component('custom', LayoutWithTab);
    app.component('TabSwitcher', TabSwitcher);
    app.component('Sandbox', Sandbox);
    app.component('Outline', Outline);
    app.component('Tab', Tab);
  }
} satisfies Theme
