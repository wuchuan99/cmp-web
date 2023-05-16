import { http } from "@/plugins/axios";

/**
 * 查询网络配置列表
 * @returns
 */
export const getEthList = () => {
  return http({
    url: "cmp-systemmanage/systemmanager/eth/query",
    method: "get"
  });
};

/**
 * 编辑网络配置
 * @param {*} data
 * @returns
 */
export const updateEth = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/eth/update",
    method: "post",
    data
  });
};
