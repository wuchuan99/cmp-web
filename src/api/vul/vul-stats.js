import { http } from "@/plugins/axios";

/**
 * 获取设备厂商分布饼状图_TopN
 * @param {*} data
 * @returns
 */
export const getVulBarVendor = data => {
  return http({
    url: "cmp-assetmanager/vul/bar/vendor",
    method: "post",
    data: data
  });
};

/**
 * 获取漏洞类型分布柱状图_TopN
 * @param {*} data
 * @returns
 */
export const getVulBarType = data => {
  return http({
    url: "cmp-assetmanager/vul/bar/type",
    method: "post",
    data: data
  });
};

/**
 * 获取漏洞等级分布饼状图_TopN
 * @param {*} data
 * @returns
 */
export const getVulBarLevel = data => {
  return http({
    url: "cmp-assetmanager/vul/bar/level",
    method: "post",
    data: data
  });
};

/**
 * 获取漏洞分布柱状图_TopN
 * @param {*} data
 * @returns
 */
export const getVulBarName = data => {
  return http({
    url: "cmp-assetmanager/vul/bar/name",
    method: "post",
    data: data
  });
};

/**
 * 获取资产关联Top10
 * @param {*} data
 * @returns
 */
export const getVulAssetbindvul = data => {
  return http({
    url: "cmp-assetmanager/vul/bar/assetbindvul",
    method: "post",
    data: data
  });
};

/**
 * 根据资产id获取漏洞详情
 * @param {*} data
 * @returns
 */
export const getVulAssetbindvulDetail = data => {
  return http({
    url: "cmp-assetmanager/vul/bar/assetbindvul/detail",
    method: "post",
    data: data
  });
};
