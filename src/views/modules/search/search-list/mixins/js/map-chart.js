import world from "../json/world.json";
import nameMap from "../json/nameMap.json";
import { throttle } from "@/utils/common";
import { init, registerMap } from "echarts";

registerMap("world", world);

export default class WorldMap {
  myChart = null;
  option = {
    backgroundColor: "rgb(241, 242, 250)",
    series: [
      {
        name: "国家统计",
        emphasis: {
          label: {
            show: false
          }
        },
        type: "map",
        map: "world",
        label: {
          show: false
        },
        data: [],
        nameMap: nameMap,
        itemStyle: {}
      }
    ],
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: "right",
      min: 0,
      max: 1000,
      inRange: {
        color: ["white", "lightskyblue", "blue"]
      },
      text: ["High", "Low"],
      calculable: true,
      show: false
    }
  };

  constructor(divId, options) {
    if ([undefined, "", null].includes(divId)) {
      throw new Error("DivId id is empty");
    }
    if (!options) {
      throw new Error("Params is empty");
    }

    // 初始化mychart
    const dom = document.getElementById(divId);
    this.myChart = init(dom);

    const { data, option } = options;

    // 更新option
    this.updateOption(option);

    // 更新数据
    this.updateData(data);

    // 绑定resize事件
    setTimeout(() => {
      window.addEventListener("resize", throttle(this.resize.bind(this)));
    });
  }

  // 更新统计图
  updateData(data = []) {
    if (!data) {
      throw new Error("数据为空");
    }
    const option = this.option;
    option.series[0].data = data;
    this.option.visualMap.maxValue = data[0]?.value || 0;
    this.myChart.setOption(this.option);
  }

  // 更新统计图option
  updateOption() {}

  clear() {
    window.removeEventListener("resize", this.resize);
    this.myChart.off("click");
    if (!this.isExist()) return;
    this.myChart.clear();
    this.myChart.dispose && this.myChart.dispose();
  }

  resize() {
    if (!this.isExist()) return;
    this.myChart.resize();
  }

  isExist() {
    // 判断echarts容器是否在页面中
    const container = this.myChart.getDom();
    const app = document.querySelector("#app");
    return app.contains(container);
  }
}
