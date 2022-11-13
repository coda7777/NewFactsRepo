import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Lightbox from "vue-my-photos";
import VueUploadComponent from "vue-upload-component";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SideBar from "./components/layout/sidebar";
import Chartist from "chartist";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import "./assets/StyleFile.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "chartist/dist/chartist";
import "chartist/dist/chartist.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueToast);
// Vue.use(UploaderPlugin);
Vue.component("lightbox", Lightbox);
Vue.use(Lightbox);
Vue.use(VueUploadComponent);
Vue.use(SideBar);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

/* #Vue3 mounting app
import { createApp, h } from "vue";
const app = createApp({
  render: () => h(App),
});
app.use(router);
app.use(store);
app.mount("#app"); */

new Vue({
  router,
  store,
  data: {
    Chartist: Chartist,
  },
  render: (h) => h(App),
}).$mount("#app");
