import { http } from "@/plugins/axios";

/**
 * 获取日志列表
 * @param {*} data
 * @returns
 */
export const getLogList = data => {
  return http({
    url: "cmp-systemmanage/system/log/page",
    method: "post",
    data: data
  });
};

/**
 * 导出日志
 * @param {*} data
 * @returns
 */
export const exportLog = data => {
  return http({
    url: "cmp-systemmanage/system/log/download",
    method: "post",
    data: data,
    responseType: "blob"
  });
};
