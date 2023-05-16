// import { getProduct } from "@/config/configs/product";
import config from "../config";

const VERSION = "main";
/**
 * 产品信息
 */
export const init = () => {
  config.register("product", {
    main: {
      // 版本信息
      version: process.env.VUE_APP_VERSION,
      // 产品名称
      name: process.env.VUE_APP_PRODUCT_NAME,
      // 产品型号
      model: process.env.VUE_APP_PRODUCT_MODEL
    }
  });
};

export const getProduct = (branch = VERSION) => config.get("product")[branch];

export const getProductName = () => getProduct()["name"];

export const getProductVersion = () => getProduct()["version"];

export const getProductModel = () => getProduct()["model"];
