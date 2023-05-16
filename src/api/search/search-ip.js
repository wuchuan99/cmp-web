import { http } from "@/plugins/axios";

/**
 * 获取ip详情
 * @param {*} ip
 * @returns
 */
export const getAssetDetail = ip => {
  return http({
    url: `cmp-assetmanager/search/result/detail/${ip}`,
    method: "get"
  });
};
