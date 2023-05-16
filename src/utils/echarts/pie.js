import { init } from "echarts";
import { debounce, throttle } from "@/utils/common";
import { deepMergeObject } from "@/utils/object";

export default class Pie {
  myChart = null;
  option = {
    tooltip: {
      trigger: "item"
      // position: function (pos, params, dom, rect, size) {
      //   let obj = {};
      //   obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      //   return obj;
      // },
      // formatter: "{b}: {c}({d}%)",
    },
    color: [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
      "#0577fe"
    ],
    // color: [ "#31dd3d","#fc8cf2", "#c5ff77","#ffbf00","#0577fe", "#ff6124","#22d1fc", ],
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
    series: [
      {
        type: "pie",
        radius: "50%",
        showEmptyCircle: false,
        label: {
          color: "#fff"
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

    // todo option额外配置
    const { data, theme, click, mode, option } = options;

    // 初始化mychart
    const dom = document.getElementById(divId);
    this.myChart = init(dom);

    // 绑定主题
    this.updateTheme(theme);

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

  // 更新主题
  updateTheme() {}

  // 深色模式
  updateMode(mode = "dark") {
    const modeObj = {
      dark: () => {
        this.option.series[0].label.color = "#fff";
      },
      white: () => {
        this.option.series[0].label.color = "gray";
      }
    };
    modeObj[mode] && modeObj[mode]();
  }

  // 更新统计图option
  updateOption(dom, data, option) {
    // 自定义option优先级最高
    option && (this.option = deepMergeObject(this.option, option));
  }

  // 更新统计图
  updateData(data) {
    if (!Array.isArray(data)) {
      throw new Error("数据格式不对");
    }
    this.option.series[0].data = data;
    // 暂无数据
    this.option.graphic.invisible = !!data.length;
    this.myChart.setOption(this.option);
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
