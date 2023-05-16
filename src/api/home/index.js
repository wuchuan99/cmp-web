import { http } from "@/plugins/axios";

/**
 * 获取物联网系统暴露地区TOP10
 * @param {*} data
 * @returns
 */
export const getRegionIot = data => {
  return http({
    url: "cmp-assetmanager/home/region/iot",
    method: "post",
    data: data
  });
};

/**
 * 获取视频会议系统暴露地区TOP10
 * @param {*} data
 * @returns
 */
export const getRegionIt = data => {
  return http({
    url: "cmp-assetmanager/home/region/it",
    method: "post",
    data: data
  });
};

/**
 * 获取工控系统暴露地区TOP10
 * @param {*} data
 * @returns
 */
export const getRegionIcs = data => {
  return http({
    url: "cmp-assetmanager/home/region/ics",
    method: "post",
    data: data
  });
};

/**
 * 获取暴露服务类型TOP10
 * @param {*} data
 * @returns
 */
export const getRegionService = data => {
  return http({
    url: "cmp-assetmanager/home/service",
    method: "post",
    data: data
  });
};

/**
 * 获取全球最新探测结果
 * @param {*} data
 * @returns
 */
export const getRegionResultNewly = data => {
  return http({
    url: "cmp-assetmanager/home/result/newly",
    method: "post",
    data: data
  });
};

/**
 * 获取高危探测结果TOP10
 * @param {*} data
 * @returns
 */
export const getRegionResultRisk = data => {
  return http({
    url: "cmp-assetmanager/home/result/risk",
    method: "post",
    data: data
  });
};

/**
 * 获取暴露设备类型TOP10
 * @param {*} data
 * @returns
 */
export const getRegionDeviceType = data => {
  return http({
    url: "cmp-assetmanager/home/device/type",
    method: "post",
    data: data
  });
};

/**
 * 获取暴露操作系统TOP10
 * @param {*} data
 * @returns
 */
export const getRegionOs = data => {
  return http({
    url: "cmp-assetmanager/home/os",
    method: "post",
    data: data
  });
};

/**
 * 获取暴露设备厂商TOP10
 * @param {*} data
 * @returns
 */
export const getRegionDeviceVendor = data => {
  return http({
    url: "cmp-assetmanager/home/device/vendor",
    method: "post",
    data: data
  });
};

/**
 * 获取暴露漏洞类型TOP10
 * @param {*} data
 * @returns
 */
export const getRegionVulType = data => {
  return http({
    url: "cmp-assetmanager/home/vul/type",
    method: "post",
    data: data
  });
};

/**
 * 获取地图统计
 * @param {*} data
 * @returns
 */
export const getRegionMap = data => {
  return http({
    url: "cmp-assetmanager/home/region/map",
    method: "post",
    data: data
  });
};
