/**
 * 仪表盘series配置
 */
export const dashboardSereisOptions = {
  type: "gauge",
  radius: "100%",
  detail: { show: false },
  title: {
    show: true,
    offsetCenter: [0, "60%"],
    fontWeight: "bold",
    fontSize: 14
  },
  splitLine: {
    distance: 5,
    length: 8
  },
  axisTick: {
    distance: 5
  },
  axisLabel: {
    distance: 12
  },
  center: ["50%", "56%"]
};

/**
 * 仪表盘tooltip配置
 */
export const dashboardToolTip = {
  formatter: "{b} : {c}%"
};

/**
 * 折线图基本配置
 * @param {*} title 标题
 * @returns
 */
export const lineOptions = title => {
  return {
    title: {
      left: "center",
      text: title,
      textStyle: {
        fontSize: 15
      },
      top: 5
    },
    grid: {
      left: 60,
      right: 25,
      top: 45,
      bottom: 35
    },
    tooltip: {
      trigger: "axis",
      position: function(pt) {
        return [pt[0], "10%"];
      }
    },
    yAxis: {
      type: "value"
    }
  };
};

/**
 * 折线图xAxis配置
 */
export const lineXAxisOptions = {
  type: "category",
  axisTick: {
    show: false
  },
  axisLine: {
    show: false
  }
};

/**
 * 折线图series配置
 */
export const lineSeriesOptions = {
  type: "line",
  smooth: true
};
