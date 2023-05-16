import { http } from "@/plugins/axios";

/**
 * 获取漏洞列表
 * @param {*} data
 * @returns
 */
export const getVulList = data => {
  return http({
    url: "cmp-loophole/loophole/info/page",
    method: "post",
    data: data
  });
};

export const _vulList = [
  {
    id: "f1ed25dfd61c409280b5dd23a522496f",
    vulName: "PingCAP TiDB 格式化字符串错误漏洞",
    cnnvdCode: "CNNVD-202211-2079",
    cveCode: "CVE-2022-3023",
    hazardLevel: 1,
    createTime: "2022-11-07",
    publishTime: "2022-11-04",
    updateTime: "2022-11-07",
    typeName: "格式化字符串错误",
    vulType: "0"
  },
  {
    id: "aacbb80411cf4cee83877b988192ffed",
    vulName: "Nokia ASIK AirScale 5G Common System Module 安全漏洞",
    cnnvdCode: "CNNVD-202211-2065",
    cveCode: "CVE-2022-2484",
    hazardLevel: 1,
    createTime: "2022-11-04",
    publishTime: "2022-11-04",
    updateTime: "2022-11-07",
    typeName: "其他",
    vulType: "0"
  },
  {
    id: "473ded4002c548e78b2b14cb9317cdf9",
    vulName: "Tenda AC23 缓冲区错误漏洞",
    cnnvdCode: "CNNVD-202211-1994",
    cveCode: "CVE-2022-43103",
    hazardLevel: 1,
    createTime: "2022-11-04",
    publishTime: "2022-11-03",
    updateTime: "2022-11-04",
    typeName: "缓冲区错误",
    vulType: "0"
  },
  {
    id: "710a52f1d25d4b159578de417e83b094",
    vulName: "GLPI SQL注入漏洞",
    cnnvdCode: "CNNVD-202211-1983",
    cveCode: "CVE-2022-39323",
    hazardLevel: 1,
    createTime: "2022-11-04",
    publishTime: "2022-11-03",
    updateTime: "2022-11-04",
    typeName: "SQL注入",
    vulType: "0"
  },
  {
    id: "2fb0081529af410b91a0e2a221fd05ee",
    vulName: "Tenda AC23 缓冲区错误漏洞",
    cnnvdCode: "CNNVD-202211-2005",
    cveCode: "CVE-2022-43101",
    hazardLevel: 1,
    createTime: "2022-11-04",
    publishTime: "2022-11-03",
    updateTime: "2022-11-07",
    typeName: "缓冲区错误",
    vulType: "0"
  },
  {
    id: "6a8e87cf2139469b8b3fbae042e8a18d",
    vulName: "Keystone 注入漏洞",
    cnnvdCode: "CNNVD-202211-1996",
    cveCode: "CVE-2022-39382",
    hazardLevel: 1,
    createTime: "2022-11-04",
    publishTime: "2022-11-03",
    updateTime: "2022-11-07",
    typeName: "注入",
    vulType: "0"
  },
  {
    id: "10f2c815f3824b41b8015d499a0e408c",
    vulName: "D-Link DIR-823G 命令注入漏洞",
    cnnvdCode: "CNNVD-202211-1987",
    cveCode: "CVE-2022-43109",
    hazardLevel: 1,
    createTime: "2022-11-04",
    publishTime: "2022-11-03",
    updateTime: "2022-11-07",
    typeName: "命令注入",
    vulType: "0"
  },
  {
    id: "8ff0d69f48464ee08e8f6aebc3651278",
    vulName: "Tenda AC23 缓冲区错误漏洞",
    cnnvdCode: "CNNVD-202211-2003",
    cveCode: "CVE-2022-43106",
    hazardLevel: 1,
    createTime: "2022-11-04",
    publishTime: "2022-11-03",
    updateTime: "2022-11-04",
    typeName: "缓冲区错误",
    vulType: "0"
  },
  {
    id: "3d63563e28fe4f4da09c79efe3753ee2",
    vulName: "Tenda AC23 缓冲区错误漏洞",
    cnnvdCode: "CNNVD-202211-1991",
    cveCode: "CVE-2022-43108",
    hazardLevel: 1,
    createTime: "2022-11-04",
    publishTime: "2022-11-03",
    updateTime: "2022-11-04",
    typeName: "缓冲区错误",
    vulType: "0"
  }
];
