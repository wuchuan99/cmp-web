/**
 * 自定义指令
 */
import Vue from "vue";
try {
  const requireModules = require.context("./directives", true, /.js/);
  requireModules.keys().forEach(filePath => {
    const directive = requireModules(filePath)["default"];
    const name = filePath.replace(/(.\/|\.js)/g, "");
    Vue.directive(name, directive);
  });
} catch (e) {
  throw new Error(e);
}
