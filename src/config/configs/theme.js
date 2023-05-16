import config from "../config";
/**
 * 主题色配置
 */
export const init = () => {
  config.register("theme", {
    blue: {
      primary: "#007fff"
    },
    black: {
      primary: "#A83733"
    }
  });
};
