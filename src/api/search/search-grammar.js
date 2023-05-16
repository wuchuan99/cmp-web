import { http } from "@/plugins/axios";

/**
 * 获取搜索语法
 * @returns
 */
export const getSearchGrammar = () => {
  return http({
    url: "cmp-assetmanager/search/bar/grammar",
    method: "get"
  });
};
