import { http } from "@/plugins/axios";

/**
 * 根据报告Id下载报告
 * @param {*} data
 * @returns
 */
export const downReportById = data => {
  return http({
    url: "cmp-report/report/downreport",
    method: "post",
    data: data,
    responseType: "blob"
  });
};

/**
 * 获取键值列表
 * @param {*} key
 * @returns
 */
export const getReportDict = key => {
  return http({
    url: `cmp-report/report/dict/${key}`,
    method: "get"
  });
};

/**
 * 获取分页查询报告
 * @param {*} data
 * @returns
 */
export const getReportQuerypage = data => {
  return http({
    url: "cmp-report/report/querypage",
    method: "post",
    data
  });
};
