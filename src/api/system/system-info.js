import { http } from "@/plugins/axios";

/**
 * 获取授权信息
 * @param {*} data
 * @returns
 */
export const getSystemLicense = () => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/query",
    method: "get"
  });
};

/**
 * 上传授权文件
 * @param {*} data
 * @returns
 */
export const upLoadSystemLicense = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/auth",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
};

/**
 * 获取升级信息
 * @returns
 */
export const getSystemUpgrade = () => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/update",
    method: "get"
  });
};

/**
 * 上传升级包
 * @param {*} data
 * @returns
 */
export const upLoadSystemUpgrade = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/upload",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
};

/**
 * 获取系统信息
 * @returns
 */
export const getSystemBasic = () => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/querysysinfo",
    method: "get"
  });
};

/**
 * 编辑系统信息
 * @param {*} data
 * @returns
 */
export const updateSystemBasic = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/update/sysinfo",
    method: "post",
    data: data
  });
};

/**
 * 系统升级
 * @param {*} id
 * @returns
 */
export const systemUpgrade = id => {
  return http({
    url: `cmp-systemmanage/systemmanager/info/update/${id}`,
    method: "get"
  });
};

/**
 * 系统回退
 * @param {*} id
 * @returns
 */
export const systemFallback = id => {
  return http({
    url: `cmp-systemmanage/systemmanager/info/fallback/${id}`,
    method: "get"
  });
};

/**
 * 上传产品logo
 * @param {*} data
 * @returns
 */
export const uploadLogo = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/upload/logo",
    method: "post",
    data
  });
};

/**
 * 上传产品ico
 * @param {*} data
 * @returns
 */
export const uploadIco = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/upload/ico",
    method: "post",
    data
  });
};

/**
 * 查询系统更新信息
 * @returns
 */
export const getSystemUpdateinfo = () => {
  return http({
    url: "cmp-systemmanage/systemmanager/info/query/updateinfo",
    method: "get"
  });
};

// 上传授权文件
export const uploadLicenseFile = "cmp-systemmanage/systemmanager/info/auth";

// 上传升级包
export const uploadUpgradeFile = "cmp-systemmanage/systemmanager/info/upload";
