import { http } from "@/plugins/axios";

/**
 * 获取统计分析数据
 * @param {*} type
 * @param {*} assetLedgerIds
 * @returns
 */
export const getstatsNum = ({ type, assetLedgerIds }) => {
  return http({
    url: `cmp-assetmanager/asset/stats/num/${type}`,
    method: "post",
    data: { assetLedgerIds }
  });
};

/**
 * 获取IP分布TopN
 * @param {*} data
 * @returns
 */
export const getstatsIpTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/address",
    method: "post",
    data
  });
};

/**
 * 获取端口TopN
 * @param {*} data
 * @returns
 */
export const getstatsPortTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/port",
    method: "post",
    data
  });
};

/**
 * 获取服务TopN
 * @param {*} data
 * @returns
 */
export const getstatsServiceTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/service",
    method: "post",
    data
  });
};

/**
 * 获取漏洞类型TopN
 * @param {*} data
 * @returns
 */
export const getstatsVulTypeTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/vul-type",
    method: "post",
    data
  });
};

/**
 * 获取设备类型TopN
 * @param {*} data
 * @returns
 */
export const getstatsDeviceTypeTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/device-type",
    method: "post",
    data
  });
};

/**
 * 获取设备厂商TopN
 * @param {*} data
 * @returns
 */
export const getstatsVendorTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/vendor",
    method: "post",
    data
  });
};

/**
 * 获取系统组件TopN
 * @param {*} data
 * @returns
 */
export const getstatsAppTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/app",
    method: "post",
    data
  });
};

/**
 * 获取操作系统统计TopN
 * @param {*} data
 * @returns
 */
export const getstatsOsTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/os",
    method: "post",
    data
  });
};

/**
 * 获取漏洞等级TopN
 * @param {*} data
 * @returns
 */
export const getstatsVulLevelTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/vul-level",
    method: "post",
    data
  });
};

/**
 * 获取存在漏洞的设备厂商TopN
 * @param {*} data
 * @returns
 */
export const getstatsVulVendorTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/vul-vendor",
    method: "post",
    data
  });
};

/**
 * 获取存在漏洞的设备类型TopN
 * @param {*} data
 * @returns
 */
export const getstatsVulDeviceTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/vul-device",
    method: "post",
    data
  });
};

/**
 * 获取存在漏洞的系统组件TopN
 * @param {*} data
 * @returns
 */
export const getstatsVulAppTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/vul-app",
    method: "post",
    data
  });
};

/**
 * 获取资产领域TopN
 * @param {*} data
 * @returns
 */
export const getstatsDevicePrimaryTop = data => {
  return http({
    url: "cmp-assetmanager/asset/stats/device-primary",
    method: "post",
    data
  });
};
