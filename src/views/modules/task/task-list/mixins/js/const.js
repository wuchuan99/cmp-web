/**
 * 任务状态computed
 * @returns
 */
export function taskStatus() {
  return (statusKey, time) => {
    const status = {
      SUCCESS: ["完成", "green"],
      PREPARING: ["准备中...", "blue"],
      RUNNING: time ? [`剩余时间：${time}秒`, "gray"] : ["扫描中", "gray"],
      STOPPED: ["暂停", "orange"],
      FAIL: ["扫描失败", "red"]
    };
    return statusKey
      ? `<span style="color:${status[statusKey][1]}">${status[statusKey][0]}</span>`
      : "";
  };
}

/**
 * 任务状态枚举
 */
export const taskStatusMap = [
  { label: "SUCCESS", value: "SUCCESS" },
  { label: "PREPARING", value: "PREPARING" },
  { label: "RUNNING", value: "RUNNING" },
  { label: "STOPPED", value: "STOPPED" },
  { label: "FAIL", value: "FAIL" }
];

/**
 * 是否是周期任务枚举
 */
export const isCycleTaskMap = [
  { label: "1", value: "是" },
  { label: "0", value: "否" }
];

/**
 * 新增任务类型
 */
export const addtasktypeMap = [
  { label: "Active_SCAN", value: "主动扫描" },
  { label: "PASSIVE_SCAN", value: "被动流量" }
];
