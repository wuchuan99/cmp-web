import { http } from "@/plugins/axios";

/**
 * 下载搜索结果数据
 * @param {*} data
 * @returns
 */
export const downloadSearchResult = data => {
  return http({
    url: "cmp-assetmanager/search/result/download",
    method: "post",
    data: data
  });
};

/**
 * 搜索结果ip列表
 * @param {*} data
 * @returns
 */
export const getSearchIpList = data => {
  return http({
    url: "cmp-assetmanager/search/result/page",
    method: "post",
    data: data
  });
};

/**
 * 设备统计列表
 * @param {*} data
 * @returns
 */
export const getDeviceStats = data => {
  return http({
    url: "cmp-assetmanager/search/stats/device",
    method: "post",
    data: data
  });
};

/**
 * 操作系统统计
 * @param {*} data
 * @returns
 */
export const getOsStats = data => {
  return http({
    url: "cmp-assetmanager/search/stats/os",
    method: "post",
    data: data
  });
};

/**
 * 国家地区统计
 * @param {*} data
 * @returns
 */
export const getRegionStats = data => {
  return http({
    url: "cmp-assetmanager/search/stats/region",
    method: "post",
    data: data
  });
};

/**
 * 服务统计
 * @param {*} data
 * @returns
 */
export const getServiceStats = data => {
  return http({
    url: "cmp-assetmanager/search/stats/service",
    method: "post",
    data: data
  });
};
