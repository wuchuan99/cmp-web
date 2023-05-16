import config from "../config";

/**
 * 所有element-ui组件基本配置
 */
export const init = () => {
  config.register("element", {
    // element尺寸 [default, medium, small, mini]
    size: "mini"
  });
};
// 获取element-ui尺寸
export const getSize = () => config.get("element")["size"];
