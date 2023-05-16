import { graphic } from "echarts";

export const tooltip = {
  tooltip: {
    trigger: "item",
    axisPointer: {
      type: "shadow"
    }
  }
};
/**
 * title通用属性
 */
export const title = {
  left: "center",
  top: "3%"
};
/**
 * 柱状图x轴通用属性
 */
export const barXAxis = {
  type: "category",
  axisTick: {
    show: false
  },
  axisLine: {
    show: false
  }
};

/**
 * 柱状图grid通用属性
 */
export const barGrid = {
  left: "6%",
  right: "8%",
  bottom: "10%",
  top: "16.5%",
  containLabel: true
};

/**
 * 柱状图y轴通用属性
 */
export const barYAxis = {
  axisLine: {
    show: false
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    color: "#999"
  }
};

export const barSeries = {
  showBackground: true,
  barMaxWidth: 20,
  itemStyle: {
    color: new graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: "#83bff6" },
      { offset: 0.5, color: "#188df0" },
      { offset: 1, color: "#188df0" }
    ])
  },
  emphasis: {
    itemStyle: {
      color: new graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#2378f7" },
        { offset: 0.7, color: "#2378f7" },
        { offset: 1, color: "#83bff6" }
      ])
    }
  }
};

export const toolbox = {
  show: true,
  feature: {
    saveAsImage: {
      show: true,
      title: "导出"
    }
  },
  showTitle: false,
  iconStyle: {
    borderColor: "#666",
    borderWidth: 2
  },
  emphasis: {
    iconStyle: {
      borderColor: "#188df0"
    }
  },
  bottom: "2%",
  right: "2%"
};
