import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import ru from "vuetify/es5/locale/ru";
import Vuetify from "vuetify";

Vue.config.productionTip = false;

const opts = {
  icons: {
    iconfont: "mdi"
  },
  lang: {
    locales: { ru },
    current: "ru"
  }
};

new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount("#app");
