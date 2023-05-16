import { init /*graphic*/ } from "echarts";
import { debounce, throttle } from "@/utils/common";
import { getTextWidth } from "@/utils/string";
import { deepMergeObject } from "@/utils/object";

export default class Radar {
  myChart = null;
  option = {
    tooltip: {
      trigger: "item",
      transitionDuration: 0,
      formatter: params => {
        let indicator = this.option.radar.indicator;
        let value = params.value;
        let relVal = params.name;
        indicator.forEach((item, index) => {
          relVal += "<br/>" + item["name"] + " : " + (value[index] || 0);
        });
        return relVal;
      },
      position: function(point, params, dom, rect, size) {
        return [point[0] + 10, point[1] - size.contentSize[1] / 2];
      }
    },
    radar: {
      // shape: "circle",
      radius: "50%",
      startAngle: 90,
      splitNumber: 4,
      axisName: {
        color: "#fff",
        formatter: value => {
          const dom = this.myChart._dom;
          // 通过容器计算左右两侧数据文本最大宽度
          const maxTextWidth =
            (dom.offsetWidth - dom.offsetHeight / 2 - 15) / 2;
          // 文本宽度px
          const textWidth = getTextWidth(value);
          return maxTextWidth - textWidth > 0
            ? value
            : value
                .slice(0, Math.floor((maxTextWidth * value.length) / textWidth))
                .trim() + " ...";
        }
      },
      splitArea: {
        areaStyle: {
          color: "rgb(33, 211, 255)",
          shadowColor: "rgb(33, 211, 255)",
          shadowBlur: 10,
          opacity: 0.045
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgb( 33, 211, 255 )"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba( 33, 211, 255, 0.5)"
        }
      },
      indicator: [],
      triggerEvent: true
    },
    series: [
      {
        type: "radar",
        emphasis: {
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: "rgba(33, 193, 255, 0.3)"
          }
        },
        symbolSize: 5,
        itemStyle: {
          color: "#22d2ff"
        },
        lineStyle: {
          width: 1,
          color: "rgb( 254, 230, 20 )",
          shadowColor: "rgba( 255, 255, 255, 0.11 )"
        },
        areaStyle: {
          color: "rgba(33, 193, 255, 0.18)"
        },
        data: []
      }
    ]
  };
  constructor(divId, options) {
    if ([undefined, "", null].includes(divId)) {
      throw new Error("DivId id is empty");
    }
    if (!options) {
      throw new Error("Params is empty");
    }

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

  // 深色模式 | 白色模式
  updateMode(mode = "dark") {
    const operate = {
      dark: () => {
        this.option.radar.axisName.color = "#fff";
      },
      white: () => {
        this.option.radar.axisName.color = "gray";
      }
    };
    operate[mode] && operate[mode]();
  }

  updateTheme() {}

  // 更新统计图
  updateData(data) {
    if (!data) {
      throw new Error("数据为空");
    }
    const { indicator, series } = data;
    this.option.series[0].data = series;
    this.option.radar.indicator = indicator;
    this.myChart.setOption(this.option);
  }

  // 更新统计图option
  updateOption(dom, data, option) {
    // 自定义option优先级最高
    option && (this.option = deepMergeObject(this.option, option));
  }

  // 清除数据
  clear() {
    window.removeEventListener("resize", this.resize);
    this.myChart.off("click");
    this.myChart.clear();
    setTimeout(() => {
      this.myChart.dispose && this.myChart.dispose();
    }, 1000);
  }

  resize = () => {
    this.myChart.resize();
  };
}
