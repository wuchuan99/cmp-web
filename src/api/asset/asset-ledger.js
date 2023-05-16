import { http } from "@/plugins/axios";

export const getAssetList = data => {
  return http({
    url: "cmp-assetmanager/asset/manage/page",
    method: "post",
    data: data
  });
};

/**
 * 获取台账Map
 * @param {*} data
 * @returns
 */
export const getLedgerMap = data => {
  return http({
    url: `cmp-assetmanager/asset/ledger/list`,
    method: "post",
    data: data || {}
  });
};

/**
 * 获取统计数map
 * @param {*} key
 * @returns
 */
export const getStatsMap = (key = "AssetLedgerStatsEnum") => {
  return http({
    url: `cmp-assetmanager/asset/ledger/dict/${key}`,
    method: "get"
  });
};

/**
 * 资产台账数据统计
 * @param {*} data
 * *@param {*} type
 * @returns
 */
export const getLedgerStats = (data, type) => {
  return http({
    url: `cmp-assetmanager/asset/ledger/num/${type}`,
    method: "post",
    data
  });
};

/**
 * 合并资产
 * @param {*} data
 * @returns
 */
export const mergeAssets = data => {
  return http({
    url: `cmp-assetmanager/asset/manage/merge`,
    method: "post",
    data: data
  });
};

/**
 * 新增资产台账
 * @param {*} data
 * @returns
 */
export const addAssetLedger = data => {
  return http({
    url: `cmp-assetmanager/asset/ledger/create`,
    method: "post",
    data: data
  });
};

/**
 * 更新资产台账
 * @param {*} data
 * @returns
 */
export const updateAssetLedger = data => {
  return http({
    url: `cmp-assetmanager/asset/ledger/update`,
    method: "post",
    data: data
  });
};

/**
 * 删除资产台账
 * @param {*} data
 * @returns
 */
export const deleteAssetLedger = id => {
  return http({
    url: `cmp-assetmanager/asset/ledger/delete`,
    method: "delete",
    data: { ids: [id] }
  });
};

/**
 * 获取台账详情
 * @param {*} id
 * @returns
 */
export const getAssetLedgerDetail = id => {
  return http({
    url: `cmp-assetmanager/asset/ledger/detail/${id}`,
    method: "get"
  });
};

/**
 * 获取资产详情ipmacs 参数
 * @param {*} id
 * @returns
 */
export const getIpMacs = id => {
  return http({
    url: `cmp-assetmanager/asset/manage/ip-macs/${id}`,
    method: "get"
  });
};

/**
 * 获取资产详情
 * @param {*} id
 * @returns
 */
export const getAssetDetailById = id => {
  return http({
    url: `cmp-assetmanager/asset/manage/detail/${id}`,
    method: "get"
  });
};

/**
 * 模板下载
 * @param {*} data
 * @returns
 */
export const downloadTemplate = id => {
  return http({
    url: `cmp-assetmanager/asset/ledger/${id}/addressrange/download`,
    method: "get",
    responseType: "blob"
  });
};

/**
 * 修改资产
 * @param {*} data
 * @returns
 */
export const updateAssetmanage = data => {
  return http({
    url: "cmp-assetmanager/asset/manage/update",
    method: "post",
    data
  });
};

/**
 * 删除资产
 * @param {*} data
 * @returns
 */
export const deleteAssetmanage = data => {
  return http({
    url: `cmp-assetmanager/asset/manage/delete/${data.assetLedgerId}/${data.assetId}`,
    method: "delete"
  });
};

/**
 * 拆解资产
 * @param {*} id
 * @returns
 */
export const dismantleAssets = id => {
  return http({
    url: `cmp-assetmanager/asset/manage/dismantle/${id}`,
    method: "get"
  });
};

/**
 * 查询设备类型
 * @returns
 */
export const getDeviceTypes = () => {
  return http({
    url: "cmp-assetmanager/asset/device/types",
    method: "get"
  });
};

/**
 * 查询设备厂商
 * @returns
 */
export const getDeviceVendors = () => {
  return http({
    url: "cmp-assetmanager/asset/device/vendors",
    method: "get"
  });
};

/**
 * 创建设备厂商
 * @returns
 */
export const createDeviceVendor = data => {
  return http({
    url: "cmp-assetmanager/asset/device/vendor/create",
    method: "post",
    data
  });
};

/**
 * 查询设备型号
 * @returns
 */
export const getDeviceModels = (vendor, type) => {
  return http({
    url: `cmp-assetmanager/asset/device/model/${vendor}/${type}`,
    method: "get"
  });
};

/**
 * 创建设备型号
 * @param {*} data
 * @returns
 */
export const createDeviceModel = data => {
  return http({
    url: "cmp-assetmanager/asset/device/model/create",
    method: "post",
    data
  });
};

/**
 * 上传台账资产ip模板
 */
export const ipAddruploadUrl =
  "cmp-assetmanager/asset/ledger/addressrange/upload";
