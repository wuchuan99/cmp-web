import { http } from "@/plugins/axios";

/**
 * 获取搜索字段
 * @returns
 */
export const getSearchFields = () => {
  return http({
    url: "cmp-assetmanager/search/bar/fields",
    method: "get"
  });
};

/**
 * 获取操作说明
 * @returns
 */
export const getOperators = () => {
  return http({
    url: "cmp-assetmanager/search/bar/operators",
    method: "get"
  });
};

/**
 * 获取键值列表
 * @returns
 */
export const getDict = key => {
  return http({
    url: `cmp-assetmanager/search/bar/dict/${key}`,
    method: "get"
  });
};

/**
 * 高级搜索转搜索字符串
 * @param {*} data
 * @returns
 */
export const advanceToQuery = data => {
  return http({
    url: "cmp-assetmanager/search/bar/advance-to-query",
    method: "post",
    data
  });
};

/**
 * 搜索提示
 * @returns
 */
export const getTips = () => {
  return http({
    url: "cmp-assetmanager/search/bar/tips",
    method: "get"
  });
};
