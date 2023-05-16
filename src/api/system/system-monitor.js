import { http } from "@/plugins/axios";

/**
 * 获取系统监控节点信息
 * @param {*} data
 * @returns
 */
export const getSystemMonitorList = () => {
  return http({
    url: "cmp-systemmanage/systemmanager/monitor/query",
    method: "get"
  });
};

/**
 * 获取仪表盘cpu，memory，disk
 * @param {*} ids
 * @returns
 */
export const getDashbordList = ids => {
  return http({
    url: "cmp-systemmanage/systemmanager/monitor/query/usage",
    method: "post",
    data: { ids: ids }
  });
};

/**
 * 获取折线图
 * @param {*} ids
 * @returns
 */
export const getLineList = ids => {
  return http({
    url: "cmp-systemmanage/systemmanager/monitor/query/usageline",
    method: "post",
    data: { ids: ids }
  });
};

/**
 * 编辑网卡信息
 * @param {*} ids
 * @returns
 */
export const updateNodeEth = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/monitor/update/nodeethinfo",
    method: "post",
    data: data
  });
};

/**
 * 切换扫描节点
 * @param {*} data
 * @returns
 */
export const updateScanEth = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/monitor/change/nodeeth",
    method: "post",
    data: data
  });
};

/**
 * 获取地区树形结构
 * @returns
 */
export const getMonitorTreeRegion = () => {
  return http({
    url: "cmp-systemmanage/systemmanager/monitor/tree/region",
    method: "get"
  });
};

/**
 * 编辑节点地理位置信息
 * @param {*} data
 * @returns
 */
export const updateNodePostion = data => {
  return http({
    url: "cmp-systemmanage/systemmanager/monitor/update/nodepostion",
    method: "post",
    data
  });
};

export const _monitorList = [
  {
    cpuUse: 36,
    diskUse: 50,
    ethName: "eth0",
    memoryUse: 35,
    osName: "Linux",
    serverNodeId: 0,
    serverNodeName: "",
    serverNodeType: 0,
    status: "1",
    systemMonitorEthVoList: [
      {
        ethDns1: "",
        ethDns2: "",
        ethGateway: "",
        ethId: 0,
        ethIp: "172.12.3.3",
        ethMac: "6c:7e:5a:52:13",
        ethMask: "255.255.255.0",
        ethName: "eth0",
        isScanEthFlag: true,
        status: 1
      },
      {
        ethDns1: "",
        ethDns2: "",
        ethGateway: "",
        ethId: 0,
        ethIp: "172.12.3.4",
        ethMac: "6c:7e:51:52:13",
        ethName: "eth1",
        isScanEthFlag: false,
        status: 0
      }
    ],
    systemServerIp: "172.15.3.3",
    systemServerName: "测绘平台"
  }
];

export const random = (limit = 1000) => {
  return Math.floor(Math.random() * limit);
};

export const _dashbordList = [
  {
    cpuUse: random(100),
    diskUse: random(100),
    memoryUse: random(100),
    nodeId: 0
  }
];

export const _lineList = [
  {
    cpuGraphs: [
      { key: random(), value: "0:00" },
      { key: random(), value: "2:00" },
      { key: random(), value: "4:00" },
      { key: random(), value: "6:00" },
      { key: random(), value: "8:00" },
      { key: random(), value: "10:00" },
      { key: random(), value: "12:00" },
      { key: random(), value: "14:00" },
      { key: random(), value: "16:00" },
      { key: random(), value: "18:00" },
      { key: random(), value: "20:00" },
      { key: random(), value: "22:00" }
    ],
    memoryGraphs: [
      { key: random(), value: "0:00" },
      { key: random(), value: "2:00" },
      { key: random(), value: "4:00" },
      { key: random(), value: "6:00" },
      { key: random(), value: "8:00" },
      { key: random(), value: "10:00" },
      { key: random(), value: "12:00" },
      { key: random(), value: "14:00" },
      { key: random(), value: "16:00" },
      { key: random(), value: "18:00" },
      { key: random(), value: "20:00" },
      { key: random(), value: "22:00" }
    ],
    serverNodeId: 0
  }
];
