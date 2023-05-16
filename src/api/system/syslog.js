import { http } from "@/plugins/axios";

/**
 * 查询syslog列表
 * @param {*} data
 * @returns
 */
export const getSyslogList = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/syslog/page",
    method: "post",
    data: data
  });
};

/**
 * 查询syslog详情
 * @returns
 */
export const getSyslogDetail = syslogId => {
  return http({
    url: `cmp-systemmanage/systemmanager/syslog/query/${syslogId}`,
    method: "get"
  });
};

/**
 * 编辑syslog
 * @returns
 */
export const updateSyslog = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/syslog/update",
    method: "post",
    data: data
  });
};

/**
 * 新增syslog
 * @returns
 */
export const addSyslog = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/syslog/add",
    method: "post",
    data: data
  });
};

/**
 * 删除syslog
 * @param {*} syslogId
 * @returns
 */
export const deleteSyslog = syslogId => {
  return http({
    url: `cmp-systemmanage/systemmanager/syslog/del/${syslogId}`,
    method: "delete"
  });
};

/**
 *  获取syslog传入内容map
 * @param {*} key
 * @returns
 */
export const getSyslogtransTypesMap = (key = "SystemSyslogResultEnum") => {
  return http({
    url: `cmp-systemmanage/systemmanager/monitor/dict/${key}`,
    method: "get"
  });
};

export const _records = [
  {
    protocol: 1,
    syslogId: 1,
    syslogIp: "172.15.36.36",
    syslogPort: 1468,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 2,
    syslogId: 2,
    syslogIp: "172.15.36.37",
    syslogPort: 1468,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 1,
    syslogId: 3,
    syslogIp: "172.15.36.40",
    syslogPort: 514,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 1,
    syslogId: 4,
    syslogIp: "172.15.36.40",
    syslogPort: 514,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 1,
    syslogId: 5,
    syslogIp: "172.15.36.40",
    syslogPort: 514,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 1,
    syslogId: 6,
    syslogIp: "172.15.36.40",
    syslogPort: 514,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 1,
    syslogId: 7,
    syslogIp: "172.15.36.40",
    syslogPort: 514,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 1,
    syslogId: 8,
    syslogIp: "172.15.36.40",
    syslogPort: 514,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 1,
    syslogId: 9,
    syslogIp: "172.15.36.40",
    syslogPort: 514,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  },
  {
    protocol: 1,
    syslogId: 13,
    syslogIp: "172.15.36.40",
    syslogPort: 514,
    transTypes: "实时扫描资产，已扫描资产，漏洞信息"
  }
];
