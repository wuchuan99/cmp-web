import router from "./index.js";
import store from "@/store";
import { getMenuInfo } from "@/api/login/login";
export function getMenuList() {
  return getMenuInfo().then(res => {
    const { success, data } = res.data;
    if (success) {
      store.dispatch("user/setUserInfo", data);
      const menu = data.menu || [];
      const routes = getRoutes(menu);
      for (const route of routes) {
        router.options.routes.push(route);
        router.addRoute(route);
      }
    }
  });
}

export function getRoutes(menu) {
  const routes = [];
  const requireModules = require.context("./routes", true, /.js/);
  requireModules.keys().forEach(filePath => {
    for (const it of menu) {
      if (filePath.includes(it.vueName)) {
        const defaults = requireModules(filePath)["default"];
        mergeChildren(it.vueName, defaults.children, it.childs);
        routes.push(defaults);
        break;
      }
    }
  });
  return routes;
}

function mergeChildren(routeName, children, menuChildren) {
  if (routeName === "system") filterChildren(children, menuChildren);
}

function filterChildren(children, menuChildren) {
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    if (!menuChildren.some(it => it.vueName === item.name)) {
      children.splice(i, 1);
      i--;
    }
  }
}
