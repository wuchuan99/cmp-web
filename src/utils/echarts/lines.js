/**
 * 折线图（多折线）
 */

import { init } from "echarts";
import { debounce, throttle } from "@/utils/common";
import { deepMergeObject } from "@/utils/object";

export default class Lines {
  myChart = null;
  option = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      itemWidth: 10,
      itemStyle: {},
      textStyle: {
        color: ""
      },
      icon: "circle"
      // data: [],
    },
    graphic: {
      type: "text", // 类型：文本
      left: "center",
      top: "middle",
      silent: true, // 不响应事件
      invisible: false, // 有数据就隐藏
      style: {
        fill: "#9d9d9d",
        fontWeight: "bold",
        text: "暂无数据",
        fontFamily: "Microsoft YaHei",
        fontSize: "15px"
      }
    },
    grid: [
      {
        left: 60,
        right: 25,
        top: 40,
        bottom: 40
      }
    ],
    xAxis: {
      boundaryGap: false, //
      triggerEvent: true,
      type: "category",
      axisLabel: {
        color: ""
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: ""
      },
      splitLine: {
        lineStyle: {
          color: "#484753"
        }
      }
    },
    // 多个series数据
    series: []
  };
  maxValue = 0;
  seriesOption = {
    type: "line",
    lineStyle: {},
    smooth: true,
    data: []
  };

  constructor(divId, options) {
    if ([undefined, "", null].includes(divId)) {
      throw new Error("DivId id is empty");
    }
    if (!options) {
      throw new Error("Params is empty");
    }
    // todo option额外配置
    const { data, theme, click, mode, option } = options;

    // 初始化mychart
    const dom = document.getElementById(divId);
    this.myChart = init(dom);

    // 绑定主题色
    this.updateTheme(theme || "blue");

    // 绑定模式
    this.updateMode(mode);

    // 更新option配置
    this.updateOption(dom, data, option);

    // 更新数据
    this.updateData(data);

    // 绑定点击事件
    click && this.myChart.on("click", debounce(click));

    // 绑定resize事件
    setTimeout(() => {
      window.addEventListener("resize", throttle(this.resize));
    });
  }

  // 更新统计图
  updateData(data) {
    if (!data) {
      throw new Error("数据为空");
    }

    const { xAxis, series } = data;
    const option = this.option;
    option.xAxis.data = xAxis || [];

    option.series = [];

    series &&
      series.forEach((serie, index) => {
        option.series[index] = {
          ...this.seriesOption,
          data: serie.data,
          name: serie.name
        };
      });

    // 暂无数据
    option.graphic.invisible = xAxis ? !!xAxis.length : false;

    this.myChart.setOption(this.option);
  }

  // 深色模式 | 白色模式
  updateMode(mode = "dark") {
    let { xAxis, yAxis, legend } = this.option;
    const operate = {
      dark: () => {
        xAxis["axisLabel"]["color"] = "#fff";
        yAxis["axisLabel"]["color"] = "#fff";
        legend["textStyle"]["color"] = "#fff";
      },
      white: () => {
        xAxis["axisLabel"]["color"] = "gray";
        yAxis["axisLabel"]["color"] = "gray";
        legend["textStyle"]["color"] = "gray";
      }
    };
    operate[mode] && operate[mode]();
  }

  // 更新柱状图颜色
  updateTheme() {}

  // 更新统计图option
  updateOption(dom, { series }, option) {
    this.updateGrid(series);
    this.updateColor(series);

    // 自定义option
    option && (this.option = deepMergeObject(this.option, option));
  }

  // 更新颜色盘
  updateColor(series) {
    this.option.color = [];
    series.forEach(item => {
      this.option.color.push(item.color || randomColor());
    });
  }

  // 更新grid参数
  updateGrid(series) {
    // 计算最大数值
    if (Array.isArray(series) && series.length) {
      series.forEach(item => {
        this.maxValue = Math.max(...item.data, this.maxValue);
      });
    }

    let leng = String(this.maxValue).length;
    leng = leng + (leng % 3);

    // 定义每数字长度为6
    this.option["grid"][0].left = 6 * leng + 30;

    // console.log(this.option.grid);
  }
  // 清除数据
  clear() {
    window.removeEventListener("resize", this.resize);
    this.myChart.clear();
    this.myChart.off("click");
    setTimeout(() => {
      this.myChart.dispose && this.myChart.dispose();
    }, 1000);
  }
  resize = () => {
    this.myChart.resize();
  };
}

const randomParams = () => Math.floor(Math.random() * 256);
export function randomColor() {
  return `rgb(${randomParams()}, ${randomParams()}, ${randomParams()})`;
}
