import { createApp } from "vue";
import App from "./app.vue";
import SimpleUI from "@simple-ui/components";
import "@simple-ui/theme-simple/index.less";

const app = createApp(App);
app.use(SimpleUI);
app.mount("#app");
