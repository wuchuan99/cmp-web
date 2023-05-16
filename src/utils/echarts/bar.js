/**
 * echarts 柱状图
 */
import { init, graphic } from "echarts";
import { debounce, throttle } from "@/utils/common";
import { deepMergeObject } from "@/utils/object";

export default class Bar {
  myChart = null;
  option = {
    tooltip: {},
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
        top: 25,
        bottom: 40
      }
    ],
    xAxis: {
      type: "category",
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: "#fff"
      },
      data: []
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          color: "#484753"
        }
      },
      axisLabel: {
        color: "#fff"
      }
    },
    series: [
      {
        type: "bar",
        // showBackground: true,
        barMaxWidth: 20,
        itemStyle: {
          color: ""
        },
        emphasis: {
          itemStyle: {
            color: ""
          }
        },

        data: []
      }
    ]
  };
  maxValue = 1000;

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
    option.series[0].data = series || [];
    option.graphic.invisible = xAxis ? !!xAxis.length : false;
    this.myChart.setOption(this.option);
  }

  // 深色模式 | 白色模式
  updateMode(mode = "dark") {
    const operate = {
      dark: () => {
        this.option.xAxis.axisLabel.color = "#fff";
        this.option.yAxis.axisLabel.color = "#fff";
      },
      white: () => {
        this.option.xAxis.axisLabel.color = "#999999";
        this.option.yAxis.axisLabel.color = "#999999";
        this.option.yAxis.splitLine.lineStyle.color = "#EEEEEE";
      }
    };
    operate[mode] && operate[mode]();
  }

  // 更新柱状图颜色
  updateTheme(theme) {
    const getColorArray = (color1, color2) => {
      return [
        new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: color1 },
          { offset: 0.5, color: color2 },
          { offset: 1, color: color2 }
        ]),
        new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: color2 },
          { offset: 0.7, color: color2 },
          { offset: 1, color: color1 }
        ])
      ];
    };
    const themeOption = {
      blue: getColorArray("#83bff6", "#2378f7"),
      purple: getColorArray("rgb(126,109,255)", "rgb(102,86,218)"),
      red: getColorArray("rgb(233,98,64)", "rgb(255,142,114)")
    };
    if (themeOption[theme]) {
      const series = this.option.series[0];
      series.itemStyle.color = themeOption[theme][0];
      series.emphasis.itemStyle.color = themeOption[theme][1];
    }
  }

  // 更新grid参数
  updateGrid(series) {
    // 计算最大数值
    if (
      Array.isArray(series) &&
      series.length &&
      typeof series[0] === "number"
    ) {
      this.maxValue = Math.max(...series);
    }

    let leng = String(this.maxValue).length;
    leng = leng + (leng % 3);

    // 定义每数字长度为6
    this.option["grid"][0].left = 6 * leng + 30;
  }

  // 更新bar样式
  updateSeriesBar(dom, series) {
    const { clientWidth } = dom;
    const length = series ? series.length : 1;
    const grid = this.option.grid[0];
    const contentWidth = clientWidth - grid.left - grid.right;

    // bar间距
    const space = 25;

    // bar宽度计算
    let barWidth = Math.floor((contentWidth - space * (length + 1)) / length);
    if (barWidth >= 30) {
      barWidth = 30;
    } else if (barWidth <= 15) {
      barWidth = 15;
    }
    this.option["series"][0].barMaxWidth = barWidth;
  }

  // 更新统计图option
  updateOption(dom, { series }, option) {
    this.updateGrid(series);
    this.updateSeriesBar(dom, series);

    // 自定义option
    option && (this.option = deepMergeObject(this.option, option));
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
