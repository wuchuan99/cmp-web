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
      return list.map(({ nodeId, cpuUse, diskUse, memoryUse }) => {
        return {
          nodeId,
          useArray: [cpuUse, diskUse, memoryUse]
        };
      });
    },
    // lineData参数
    changeLineData(list) {
      return list.map(({ serverNodeId, cpuGraphs, memoryGraphs }) => {
        return {
          serverNodeId,
          lineArray: [
            {
              xAxis: cpuGraphs.map(item => item.x),
              series: cpuGraphs.map(item => item.y)
            },
            {
              xAxis: memoryGraphs.map(item => item.x),
              series: memoryGraphs.map(item => item.y)
            }
          ]
        };
      });
    }
  }
};
