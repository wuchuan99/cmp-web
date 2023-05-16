import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locales/i18n";

// 自定义字体图标
import "./assets/fonts";

// 全局插件
import "./plugins";

// 全局css样式
import "./style/index.scss";

// 全局自定义指令
import "./directive";

// todo 全局config配置
import "./config";

// 全局注册组件
import "./components";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
