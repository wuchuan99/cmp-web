import Vue from "vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认样式
// 设置element整体size
import { getSize } from "@/config/configs/element";
Vue.use(Element, { size: getSize() });
