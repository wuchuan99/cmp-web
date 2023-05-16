import {
  dashboardSereisOptions,
  dashboardToolTip,
  lineOptions,
  lineSeriesOptions,
  lineXAxisOptions
} from "./const";

export default {
  data() {
    return {
      cpuOption: {
        tooltip: dashboardToolTip,
        series: [
          {
            ...dashboardSereisOptions,
            name: "CPU",
            data: []
          }
        ]
      },
      intOption: {
        tooltip: dashboardToolTip,
        series: [
          {
            ...dashboardSereisOptions,
            name: "内存",
            data: []
          }
        ]
      },
      diskOption: {
        tooltip: dashboardToolTip,
        series: [
          {
            ...dashboardSereisOptions,
            name: "硬盘",
            data: []
          }
        ]
      },
      cpuLineOption: {
        ...lineOptions("CPU使用率折线图"),
        xAxis: {
          ...lineXAxisOptions,
          data: []
        },
        series: [
          {
            ...lineSeriesOptions,
            data: []
          }
        ]
      },
      intLineOption: {
        ...lineOptions("内存使用率折线图"),
        xAxis: {
          ...lineXAxisOptions,
          data: []
        },
        series: [
          {
            ...lineSeriesOptions,
            data: []
          }
        ]
      }
    };
  },
  methods: {
    // dashbord参数转换
    changeDashbordData(list) {
      const { cpuUse, diskUse, memoryUse } = list[0];
      return {
        useArray: [cpuUse, diskUse, memoryUse]
      };
    },
    // lineData参数
    changeLineData(list) {
      const { cpuGraphs, memoryGraphs } = list[0];
      return {
        lineArray: [
          {
            xAxis: cpuGraphs.map(item => item.value),
            series: cpuGraphs.map(item => item.key)
          },
          {
            xAxis: memoryGraphs.map(item => item.value),
            series: memoryGraphs.map(item => item.key)
          }
        ]
      };
    }
  }
};
