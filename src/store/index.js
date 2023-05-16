import Vue from "vue";
import Vuex from "vuex";
// import createLogger from "vuex/dist/logger";

import login from "./modules/login";
import search from "./modules/search";
import app from "./modules/app";
import user from "./modules/user";

import logger from "./plugins/logger";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    login,
    search,
    app,
    user
  },
  // vuex 插件 logger打包不要加
  plugins: [logger]
});

export default store;
