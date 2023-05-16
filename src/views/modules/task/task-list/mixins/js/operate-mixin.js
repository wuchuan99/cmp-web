import {
  getTaskMap,
  getScanPorts,
  getScanTypeMap,
  getRegionMap
} from "@/api/task/task-list";
import { generateTimeReqestNumber } from "@/utils/time";

const changeMap = list => {
  if (Array.isArray(list)) {
    return list.map(item => {
      return {
        label: item.key,
        value: item.value
      };
    });
  }
};
export const operateTaskMixins = {
  data() {
    return {
      scanTypeMap: [],
      scanStrategyMap: [],
      scanSpeedMap: [],
      taskTypeMap: [],
      taskAddressMap: [],
      cycleTypeMap: [],
      taskType: "",
      cycleParametersWeekMap: [],
      cycleParametersMonthMap: []
    };
  },
  watch: {
    // 区域选择任务名称变化
    "form.taskAddressCommand.address": {
      deep: true,
      immediate: true,
      handler(val) {
        if (val && this.$refs["regions"])
          this.form.taskName = `${
            this.$refs["regions"].node.label
          }_${generateTimeReqestNumber()}`;
      }
    }
  },
  methods: {
    // 扫描类型
    getScanType() {
      getScanTypeMap().then(res => {
        if (res.data.success) {
          this.scanTypeMap = changeMap(res.data.data);
          this.form.scanType = this.scanTypeMap[0]["label"];
        }
      });
    },
    // 扫描策略
    getScanStrategy() {
      getTaskMap("ScanStrategyEnum").then(res => {
        if (res.data.success) {
          this.scanStrategyMap = changeMap(res.data.data);
          this.form.strategy = this.scanStrategyMap[0]["label"];
          // 对应扫描策略端口
          this.getTaskScanPorts(this.form.strategy);
        }
      });
    },
    // 扫描速度
    getScanSpeed() {
      getTaskMap("ScanSpeedEnum").then(res => {
        if (res.data.success) {
          this.scanSpeedMap = changeMap(res.data.data);
          this.form.speed = this.scanSpeedMap[0]["label"];
        }
      });
    },
    // 时间周期
    getCycleType() {
      getTaskMap("CrontabEnum").then(res => {
        if (res.data.success) {
          this.cycleTypeMap = changeMap(res.data.data);
          // this.form["taskRunTimeCommand"]["cycleType"] = this.cycleTypeMap[0][
          //   "label"
          // ];
        }
      });
    },
    // 扫描日期
    getCycleParametersMap() {
      this.cycleParametersWeekMap = "一二三四五六日"
        .split("")
        .map((day, index) => {
          return {
            label: index + 1,
            value: "星期" + day
          };
        });
      this.cycleParametersMonthMap = "1"
        .repeat(31)
        .split("")
        .map((day, index) => {
          return {
            label: index + 1,
            value: index + 1 + "号"
          };
        });
    },
    // 国家城市
    geTaskAddressMap() {
      getRegionMap().then(res => {
        if (res.data.success) {
          this.taskAddressMap = res.data.data;
        }
      });
    },

    // 任务类型
    getTaskType() {
      this.taskTypeMap = [
        { label: "USER", value: "上传IP扫描" },
        { label: "SYSTEM", value: "区域选择扫描" }
      ];
      this.changeTaskType(this.taskTypeMap[0]["label"]);
    },

    // tcp，udp端口
    getTaskScanPorts(strategyId) {
      getScanPorts(strategyId).then(res => {
        if (res.data.success) {
          const data = res.data.data;
          this.form.tcpPorts = data.tcpPorts.join(",");
          this.form.udpPorts = data.udpPorts.join(",");
        }
      });
    },
    // 切换任务类型
    changeTaskType(val) {
      this.taskType = val;
      this.form.taskName = `${
        val === "USER" ? "上传IP" : "区域选择"
      }_${generateTimeReqestNumber()}`;
    },
    mapInit() {
      this.getScanType();
      this.getScanStrategy();
      this.getScanSpeed();
      this.geTaskAddressMap();
      this.getCycleType();
      this.getTaskType();
      this.getCycleParametersMap();
    }
  }
};
