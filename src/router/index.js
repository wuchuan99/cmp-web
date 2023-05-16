import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { getMenuList } from "./permission";
import { cancelTokenArray } from "@/plugins/axios";
import { extraRoutes } from "./routes/extra";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

/**
 * meta参数详解：
 * title: 名称
 * @type {*[]}
 */

const router = new VueRouter({
  routes: [...extraRoutes]
});

router.beforeEach((to, from, next) => {
  if (store.state.login.token) {
    //频繁请求接口优化处理
    cancelTokenArray.forEach((val, index) => {
      val.cancel();
      delete cancelTokenArray[index];
    });
    // 根据权限菜单动态加载路由
    if (!store.state.user.userInfo.user && to.path !== "/redirect") {
      getMenuList().then(() => {
        next({ ...to, replace: true });
      });
    } else {
      next();
    }
  }
});

export default router;
