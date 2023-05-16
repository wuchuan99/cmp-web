import { http } from "@/plugins/axios";

/**
 * 获取任务列表
 * @param {*} data
 * @returns
 */
export const getTaskList = data => {
  return http({
    url: "cmp-taskmanager/taskmanager/task/page",
    method: "post",
    data: data
  });
};

/**
 * 新增任务
 * @param {*} data
 * @returns
 */
export const addTask = data => {
  return http({
    url: "cmp-taskmanager/taskmanager/task/create",
    method: "post",
    data: data
  });
};

/**
 * 获取任务详情
 * @param {*} id
 * @returns
 */
export const getTaskInfo = taskUuid => {
  return http({
    url: `cmp-taskmanager/taskmanager/task/${taskUuid}`,
    method: "get"
  });
};

/**
 * 任务Map
 * @returns
 */
export const getTaskMap = content => {
  return http({
    url: "cmp-taskmanager/taskmanager/task/dict/" + content,
    method: "get"
  });
};

/**
 * 扫描类型 主动扫描
 * @returns
 */
export const getScanTypeMap = (scanTypeDefault = "ACTIVE_SCAN") => {
  return http({
    url: `cmp-taskmanager/taskmanager/task/scanType/${scanTypeDefault}`,
    method: "get"
  });
};

// ip文件上传
export const ipAddressfileUploadUrl =
  "cmp-taskmanager/taskmanager/task/addressrange/upload";

/**
 * tcp，upd扫描端口
 * @returns
 */
export const getScanPorts = strategyId => {
  return http({
    url: `cmp-taskmanager/taskmanager/task/scanStrategy/${strategyId}`,
    method: "get"
  });
};

/**
 * 国家城市
 * @returns
 */
export const getRegionMap = () => {
  return http({
    url: "cmp-taskmanager/taskmanager/task/tree/region",
    method: "get"
  });
};

/**
 * 删除任务 taskUuids
 * @param {*} data
 * @returns
 */
export const deleteTask = data => {
  return http({
    url: "cmp-taskmanager/taskmanager/task/delete",
    method: "delete",
    data: data
  });
};

/**
 * 开始任务
 * @param {*} data
 * @returns
 */
export const startTask = data => {
  return http({
    url: "cmp-taskmanager/taskmanager/task/start",
    method: "post",
    data: data
  });
};

/**
 * 暂停任务
 * @param {*} data
 * @returns
 */
export const pauseTask = data => {
  return http({
    url: "cmp-taskmanager/taskmanager/task/stop",
    method: "post",
    data: data
  });
};

/**
 * 获取深度扫描任务map
 * @param {*} data
 * @returns
 */
export const getDeepTask = () => {
  return http({
    url: "",
    method: "post"
  });
};

/**
 * 新增深度扫描任务
 * @param {*} data
 * @returns
 */
export const addDeepScanTask = data => {
  return http({
    url: "",
    method: "post",
    data: data
  });
};

/**
 * 模板下载
 * @param {*} data
 * @returns
 */
export const downloadTemplate = () => {
  return http({
    url: `cmp-taskmanager/taskmanager/task/addressrange/download`,
    method: "get",
    responseType: "blob"
  });
};

// 被动流量
export const addPassiveTask = data => {
  return http({
    url: "cmp-taskmanager/taskmanager/task/create",
    method: "post",
    data: data
  });
};

/**
 * 任务扫描结果下载
 * @param {*} taskUuid
 * @returns
 */
export const taskScanDownload = taskUuid => {
  return http({
    url: `cmp-taskmanager/taskmanager/task/download/${taskUuid}`,
    method: "get"
  });
};
