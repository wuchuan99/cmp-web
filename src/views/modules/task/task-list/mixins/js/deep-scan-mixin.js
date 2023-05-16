import { getDeepTask, getTaskMap } from "@/api/task/task-list";

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
export const deepScanMixins = {
  data() {
    return {
      deepTaskMap: [],
      deepScantypeMap: [],
      cycleTypeMap: [],
      cycleParametersWeekMap: [],
      cycleParametersMonthMap: []
    };
  },
  methods: {
    // 获取扫描任务map
    getDeepTaskMap() {
      getDeepTask()
        .then(res => {
          if (res.data.success) {
            this.deepTaskMap = changeMap(res.data.data);
          }
        })
        // 假数据
        .catch(() => {
          this.deepTaskMap = [
            { label: 1, value: "假数据任务1" },
            { label: 2, value: "假数据任务2" }
          ];
        });
    },
    // 深度扫描内容
    getDeepScanTypeMap() {
      this.deepScantypeMap = [
        { label: "VUL_SCAN", value: "漏洞扫描" },
        { label: "OS_SCAN", value: "操作系统扫描" }
      ];
    },
    // 时间周期
    getCycleType() {
      getTaskMap("CrontabEnum").then(res => {
        if (res.data.success) {
          this.cycleTypeMap = changeMap(res.data.data);
          // this.form.cycleType = this.cycleTypeMap[0]["label"];
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
    }
  },
  created() {
    this.getCycleType();
    this.getDeepScanTypeMap();
    this.getCycleParametersMap();
  }
};
