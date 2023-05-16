<template>
  <div class="map" :class="{ animation: visible }">
    <new-chart id="map-canvas" ref="map" :option="option" />
    <untils ref="untils" @go-back="goBack" :country-name="country.name" />
  </div>
</template>

<script>
import * as echarts from "echarts";
import untils from "./components/untils.vue";
import geoJson from "./minxins/json";
const zoomMap = new Map([
  ["China", 0.8],
  ["America", 0.5],
  ["Australia", 0.7]
]);
const offset = {
  Alaska: {
    // 把阿拉斯加移到美国主大陆左下方
    left: -131,
    top: 25,
    width: 15
  },
  Hawaii: {
    left: -110, // 夏威夷
    top: 28,
    width: 5
  },
  "Puerto Rico": {
    // 波多黎各
    left: -76,
    top: 26,
    width: 2
  }
};
export default {
  components: { untils },
  props: {
    country: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      option: {
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderColor: "rgba(0, 0, 0, 0.1)",
          textStyle: {
            color: "#fff"
          },
          formatter: function(params) {
            if (params.seriesType === "effectScatter") {
              return params.name + "：" + params.value[2];
            }
          }
        },
        geo: {
          map: this.country.country,
          zoom: zoomMap.get(this.country.country),
          itemStyle: {
            //地图区域的多边形 图形样式
            normal: {
              areaColor: "#013C62", //地区颜色
              shadowColor: "#182f68", //阴影颜色
              shadowOffsetX: 5, //阴影偏移量
              shadowOffsetY: 15 //阴影偏移量
            },
            emphasis: {
              areaColor: "#2ab8ff", //地区颜色
              label: {
                show: false //是否在高亮状态下显示标签
              }
            }
          }
        },
        series: [
          //地图系列
          {
            type: "map", //地图类型
            zlevel: 1,
            label: {
              show: false,
              color: "#fff"
            },
            //地图区域的多边形 图形样式
            itemStyle: {
              borderColor: "#2ab8ff",
              borderWidth: 1.5,
              areaColor: "#12235c"
            },
            emphasis: {
              label: {
                color: "#fff"
              },
              itemStyle: {
                areaColor: "#2ab8ff",
                borderWidth: 0
              }
            },
            select: {
              label: {
                color: "#fff"
              },
              itemStyle: {
                areaColor: "#2ab8ff",
                borderWidth: 0
              }
            },
            zoom: zoomMap.get(this.country.country),
            map: this.country.country //使用地图
          },
          // 带涟漪的散点气泡图
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 10,
            rippleEffect: {
              brushType: "stroke",
              scale: 4, // 波纹缩放比例
              period: 3 // 速度
            },
            itemStyle: {
              normal: {
                color: "#f4e925",
                shadowBlur: 10,
                shadowColor: "#f4e925"
              }
            },
            data: []
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    if (!this.country.country) return;
    this.initMap(this.country.country);
  },
  methods: {
    getMapInfo() {
      const MAX =
        Math.ceil(Math.max(...this.country.mapData.map(it => it.count)) / 100) *
        100;
      const symbolSizeMin = 5;
      const interval = 15;
      for (const item of this.country.mapData) {
        item.value = [item.longitude, item.latitude, item.count];
        item.symbolSize =
          symbolSizeMin + Math.round(interval * (item.count / MAX));
      }
      console.log(this.country.mapData);
      this.initChart();
    },
    initMap(country) {
      const json = geoJson[country];
      if (!json) return (this.visible = true);
      // 注册地图
      echarts.registerMap(country, json, offset);
      this.getMapInfo();
    },
    initChart() {
      this.option.series[1].data = this.country.mapData;
      this.$refs.map.initChart();
      this.initChartEvent();
      this.visible = true;
    },
    initChartEvent() {
      const mapChart = this.$refs.map.chart;
      // 禁用高亮效果
      mapChart.on("mouseover", function(params) {
        if (params.data === undefined) {
          mapChart.dispatchAction({
            type: "downplay"
          });
        }
      });
      // 禁用选中效果
      mapChart.on("click", function(params) {
        if (params.data === undefined) {
          mapChart.dispatchAction({
            type: "unselect",
            dataIndex: params.dataIndex,
            seriesIndex: params.seriesIndex
          });
        }
      });
    },
    goBack() {
      // 切换地图展示
      this.$emit("toggle", {
        dimension: "three",
        country: {}
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../mixins/styles/keyframes.scss";
.map {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  #map-canvas {
    height: 100%;
    width: 100%;
  }
  opacity: 0;
  &.animation {
    animation: fadeIn 2s;
    opacity: 1;
  }
}
</style>
