import { generateTimeReqestNumber } from "@/utils/time";
export const passvieOperateMixins = {
  data() {
    return {
      taskScanTimeMap: [],
      taskTrafficMap: [],
      taskEthMap: []
    };
  },
  methods: {
    // 任务扫时长限制
    getTaskCanTimeMap() {
      this.taskScanTimeMap = [
        { label: 1, value: "1小时" },
        { label: 2, value: "2小时" },
        { label: 3, value: "3小时" }
      ];
    },
    // 任务流量限制
    getTaskTrafficMap() {
      this.taskTrafficMap = [
        { label: 1, value: "1GB" },
        { label: 2, value: "2GB" },
        { label: 3, value: "3GB" }
      ];
    },
    // 网卡
    getTaskEthMap() {
      this.taskEthMap = [
        { label: 1, value: "eth0" },
        { label: 2, value: "eth1" }
      ];
    },
    getTaskName() {
      return `被动流量任务_${generateTimeReqestNumber()}`;
    }
  },
  created() {
    this.getTaskCanTimeMap();
    this.getTaskTrafficMap();
    this.getTaskEthMap();
  }
};
