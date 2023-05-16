// import * as echarts from "echarts";
import { registerMap, init as echartsInit } from "echarts";
import { cityMap } from "../../json/map/china-main-city-map.js";

// 定义mapJson，存放所有省市数据
let mapJson = new Map();
Promise.resolve().then(() => {
  const requireModules = require.context("../../json", true, /.json/);
  requireModules.keys().forEach(filePath => {
    mapJson.set(
      filePath.replace(/(\.\/map\/|\.json)/g, ""),
      requireModules(filePath)
    );
  });
});

// ecahrts 地图配置
export default class Maps {
  myChart = null;
  chinaId = "100000";
  chinaName = "china";
  chinaJson = null;
  // 记录父级ID、Name
  mapStack = [];
  parentId = null;
  parentName = null;
  // 地图高度
  height = 0;
  // 地图宽度
  width = 0;
  // 地理坐标系组件
  geo = {
    // 地图颜色渐变方向 0 1 2 3
    mapColordirection: 2,
    // 地图背景色 0% - 100%
    mapColorArray: ["#32ff75", "#791bb7"],
    // 地图省市边界颜色
    mapBorderColor: "#64e6d5",
    // 地图边界宽度
    mapBorderWidth: 1,
    // 地图背影色
    shadowColor: "#2cefef",
    // 地图背影size
    shadowSize: 0
  };
  // 地理坐标系组件背景
  geoBack = {
    // 地图背景色 0% - 100%
    mapColorArray: ["#32ff75", "#791bb7"],
    // 地图省市边界颜色
    mapBorderColor: "#64e6d5",
    // 地图边界宽度
    mapBorderWidth: 1,
    // 地图背影图层
    show: true,
    // 地图背影色
    shadowColor: "#2cefef",
    // 地图背影size
    shadowSize: 25
  };
  // 连续型视觉映射组件配置
  visualMap = {
    min: 0,
    max: 100,
    // 是否显示拖拽用的手柄
    calculable: true,
    // 是否显示visualMap
    show: false,
    // 颜色渐变盘
    color: [
      "#ff0000",
      "#e95306",
      "#ff9800",
      "#edff00",
      "#00ff77",
      "#00fff1",
      "#00a2ff"
    ],
    // 文字颜色
    textColor: "#fff"
  };
  // 悬浮框提示
  tooltip = {
    show: true,
    backgroundColor: "rgba(31, 162, 179, 0.82)",
    textColor: "#fff",
    textFontSize: 12
  };
  // 散点（气泡）图
  scatter = {
    // 鼠标悬浮窗字体大小
    fontSize: 12,
    // 图形大小
    symbolSize: 6,
    // 展示省市名称
    labelShow: false,
    // 悬浮提示
    emphasisShow: true
  };
  // 带有涟漪特效动画的散点（气泡）图
  effectScatter = {
    // 图标样式 circle pin 等
    symbol: "cirlce",
    // 动画中波纹的最大缩放比例 4 1.6
    rippleEffectScale: 4,
    // 鼠标悬浮窗字体大小
    fontSize: 12,
    // 图形大小
    symbolSize: 6,
    // 展示省市名称
    labelShow: true,
    // 悬浮提示
    emphasisShow: true
  };
  // 热力图
  heatmap = {
    pointSize: 30,
    blurSize: 50
  };
  // 路径图
  lines = {
    // 图标 https://echarts.apache.org/zh/option.html#series-line.markLine.data.0.symbol
    effectSymbol: "arrow",
    effectSymbolSize: 26,
    // 尾迹线条宽度
    lineWidth: 1,
    // 尾迹线条透明度
    lineOpacity: 1,
    // 尾迹线条曲直度
    curveness: 0.3,
    lineColor: "purple"
  };

  /**
   * @param {*} divId
   * @param {*} param1: options: 配置项 data: 散点图、折线图等数据
   */
  constructor(divId, { options = {}, data = {} }) {
    if ([undefined, "", null].includes(divId)) {
      throw new Error("dom id is empty");
    }
    const hasOwnProperty = (obj, key) =>
      Object.prototype.hasOwnProperty.call(obj, key);
    // 更新options
    for (let item in options) {
      if (toString.call(options[item]) === "[object Object]") {
        const option = options[item];
        for (let key in option) {
          if (hasOwnProperty(this[item], key)) {
            this[item][key] = option[key];
          }
        }
      } else {
        if (hasOwnProperty(this, item)) {
          this[item] = options[item];
        }
      }
    }
    // 获取容器宽高
    this.heightAndWidth(divId);
    // 获取地图数据
    this.chinaJson = mapJson.get(this.chinaId);
    // 初始化
    this.myChart = echartsInit(document.getElementById(divId));

    // this.myChart.showLoading();

    this.registerAndsetOption(
      this.chinaId,
      this.chinaName,
      this.chinaJson,
      data,
      false
    );

    this.parentId = this.chinaId;
    this.parentName = this.chinaName;

    // 绑定下钻事件
    this.myChart.on("click", ({ name }) => {
      const cityId = cityMap[name];
      if (cityId) {
        this.registerAndsetOption(
          cityId,
          name,
          mapJson.get(cityId),
          data,
          true
        );
      } else {
        // 如果没有子集 默认返回中国地图
        this.registerAndsetOption(
          this.chinaId,
          this.chinaName,
          this.chinaJson,
          data,
          false
        );
      }
    });

    // this.myChart.hideLoading();
  }

  /**
   *
   * @param {*} id       省市县Id
   * @param {*} name     省市县名称
   * @param {*} mapJson  地图Json数据
   * @param {*} data     散点图、路径图等
   * @param {*} flag     是否往mapStack里添加parentId，parentName
   */
  registerAndsetOption(id, name, mapJson, data = {} /*,flag*/) {
    registerMap(name, mapJson);
    this.myChart.setOption({
      tooltip: this.getTooltip(),
      visualMap: this.getVisualMap(),
      geo: this.getGeo(name),
      series: this.getSeries(data)
    });

    /* if (flag) {
      //往mapStack里添加parentId，parentName,返回上一级使用
      mapStack.push({
        mapId: parentId,
        mapName: parentName,
      });
      parentId = id;
      parentName = name;
    }*/
  }

  // 容器高度和宽度
  heightAndWidth(divId) {
    const dom = document.getElementById(divId);
    this.height = dom.clientHeight;
    this.width = dom.clientWidth;
  }
  // geo地图颜色渐变方向 四种结构
  colordirectionArray() {
    return [
      [0, 0, this.width, 0],
      [0, 0, this.width, this.height],
      [0, 0, 0, this.height],
      [this.width, 0, 0, this.height]
    ];
  }

  // 地图注册组件
  getSeries({ effectScatter, scatter, heatmap, lines }) {
    let _series = [];
    effectScatter && _series.push(this.getEffectScatter(effectScatter));
    scatter && _series.push(this.getScatter(scatter));
    heatmap && _series.push(this.getHeatmap(heatmap));
    lines && _series.push(this.getLines(lines));
    return _series;
  }
  getTooltip() {
    const tooltip = this.tooltip;
    return {
      show: tooltip.show,
      trigger: "item",
      backgroundColor: tooltip.backgroundColor,
      borderColor: "#FFFFCC",
      textStyle: {
        color: tooltip.textColor,
        fontSize: tooltip.textFontSize
      },
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: "z-index:100"
    };
  }
  // 视觉映射组件
  getVisualMap() {
    const visualMap = this.visualMap;
    return {
      min: visualMap.min,
      max: visualMap.max,
      // 是否显示拖拽用的手柄
      calculable: visualMap.calculable,
      // 是否显示visualMap
      show: visualMap.show,
      // 颜色渐变盘
      color: visualMap.color,
      // 文字样式
      textStyle: {
        color: "#fff"
      }
    };
  }
  // 获取地图geo对象
  getGeo(mapName) {
    const geo = this.geo;
    const geoBack = this.geoBack;
    const colorArray = this.colordirectionArray()[geo.mapColordirection];
    let _geoArray = [
      {
        layoutCenter: ["50%", "50%"],
        type: "map",
        layoutSize: "100%",
        map: mapName,
        zoom: mapName === "china" ? 1.2 : 1.0,
        zlevel: 1,
        emphasis: {
          itemStyle: {
            color: "rgba(43, 195, 218, 0.7)"
          }
        },
        itemStyle: {
          color: {
            type: "linear",
            x: colorArray[0],
            y: colorArray[1],
            x2: colorArray[2],
            y2: colorArray[3],
            colorStops: [
              { offset: 0, color: geo.mapColorArray[0] },
              { offset: 1, color: geo.mapColorArray[1] }
            ],
            global: true // 缺省为 false
          },
          borderColor: geo.mapBorderColor, // 省市边界线
          borderWidth: geo.mapBorderWidth,
          shadowColor: geo.shadowColor,
          shadowBlur: geo.shadowSize
        }
      }
    ];
    geoBack.show &&
      _geoArray.push({
        // type: "map",
        layoutCenter: ["50.5%", "50.5%"],
        map: mapName,
        layoutSize: "100%",
        zlevel: -1,
        zoom: mapName === "china" ? 1.2 : 1.0,
        label: {
          normal: {
            show: false,
            textStyle: {
              color: "#fff"
            }
          },
          emphasis: {
            show: false,
            textStyle: {
              color: "green"
            }
          }
        },
        emphasis: {
          itemStyle: {
            areaColor: "transparent", // 悬浮背景
            color: "#fff"
          }
        },
        itemStyle: {
          color: {
            type: "linear",
            x: colorArray[0],
            y: colorArray[1],
            x2: colorArray[2],
            y2: colorArray[3],
            colorStops: [
              { offset: 0, color: geoBack.mapColorArray[0] },
              { offset: 1, color: geoBack.mapColorArray[1] }
            ],
            global: true // 缺省为 false
          },
          borderColor: geoBack.mapBorderColor, // 省市边界线
          borderWidth: geoBack.mapBorderWidth,
          shadowColor: geoBack.shadowColor,
          shadowBlur: geoBack.shadowSize
        }
      });
    return _geoArray;
  }
  // 静态散点图
  getScatter(data) {
    const scatter = this.scatter;
    const visualMap = this.visualMap;
    return {
      type: "scatter",
      symbol: "circle",
      coordinateSystem: "geo",
      zlevel: 8,
      symbolSize: function(val) {
        return (
          scatter.symbolSize + (val[2] / visualMap.max) * scatter.symbolSize
        ); // 圆环大小
      },
      label: {
        show: scatter.labelShow,
        position: "right", // 显示位置
        offset: [5, 10, 5, 5], // 偏移设置
        formatter: function(params) {
          // 圆环显示文字
          return params.data.name;
        },
        fontSize: scatter.fontSize
      },
      itemStyle: {
        color: scatter.itemColor
      },
      emphasis: {
        label: {
          show: scatter.emphasisShow
        }
      },
      data: data
    };
  }
  // 波纹散点图   [{name: "黑龙江",value: [127, 45, 65]}]
  getEffectScatter(data) {
    const effectScatter = this.effectScatter;
    const visualMap = this.visualMap;
    return {
      type: "effectScatter",
      coordinateSystem: "geo",
      legendHoverLink: true,
      showEffectOn: "render",
      zlevel: 8,
      rippleEffect: {
        // 涟漪特效
        period: 4, // 动画时间，值越小速度越快
        brushType: "stroke", // 波纹绘制方式 stroke, fill
        scale: effectScatter.rippleEffectScale // 波纹圆环最大限制，值越大波纹越大
      },
      label: {
        show: effectScatter.labelShow,
        position: "right", // 显示位置
        offset: [5, 10, 5, 5], // 偏移设置
        formatter: function(params) {
          // 圆环显示文字
          return params.data.name;
        },
        fontSize: effectScatter.fontSize
      },
      emphasis: {
        show: effectScatter.emphasisShow
      },
      symbol: effectScatter.symbol,
      symbolSize: function(val) {
        return (
          effectScatter.symbolSize +
          (val[2] / visualMap.max) * effectScatter.symbolSize
        ); // 圆环大小
      },
      itemStyle: {
        show: false,
        color: "#f00"
      },
      data: data
    };
  }
  // 热力图
  getHeatmap(data) {
    const heatmap = this.heatmap;
    return {
      type: "heatmap",
      coordinateSystem: "geo",
      pointSize: heatmap.pointSize,
      blurSize: heatmap.blurSize,
      progressive: 1000,
      zlevel: 5,
      data: data
    };
  }
  // 路径图
  getLines(data) {
    const lines = this.lines;
    return {
      type: "lines",
      zlevel: 10,
      effect: {
        show: true,
        period: 3, // 箭头指向速度，值越小速度越快
        trailLength: 1, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: lines.effectSymbol,
        symbolSize: lines.effectSymbolSize
      },
      lineStyle: {
        width: lines.lineWidth,
        opacity: lines.lineOpacity,
        curveness: lines.curveness,
        color: lines.lineColor
      },
      data: data
    };
  }

  // resize
  resize() {
    this.myChart.resize();
  }
}
