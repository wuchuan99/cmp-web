<template>
  <div class="exposedDeviceType card" :class="{ animation }">
    <div class="title">{{ country?.name || "全球" }}暴露设备类型TOP10</div>
    <div class="body">
      <new-chart ref="chart" :option="option" />
    </div>
  </div>
</template>

<script>
import { getRegionDeviceType } from "@/api/home";
export default {
  props: {
    animation: {
      type: Boolean,
      default: false
    },
    country: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    country() {
      this.getData(true);
    }
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item"
        },
        color: ["#ff4c4c", "#ff7f00", "#ffc100", "#008dff"],
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            label: {
              formatter: "{b}: {@2012}",
              fontFamily: "Microsoft YaHei",
              color: "#fff"
            },
            data: [
              { value: 1, name: "WEB服务器" },
              { value: 2, name: "数据库" },
              { value: 3, name: "虚拟专用网络" },
              { value: 4, name: "路由器" },
              { value: 5, name: "交换机" },
              { value: 6, name: "防火墙" },
              { value: 7, name: "网卡" },
              { value: 8, name: "光猫" },
              { value: 9, name: "无线AP" },
              { value: 10, name: "流量控制设备" }
            ]
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    initData() {
      if (!this.$refs.chart) return;
      this.getData();
    },
    getData(update = false) {
      const params = { topN: 10 };
      if (this.country?.regionId) params.regionId = this.country.regionId;
      getRegionDeviceType(params).then(res => {
        const { success, data } = res.data;
        if (success) {
          if (data?.pieDatas) this.option.series[0].data = data?.pieDatas;
        }
        if (update) {
          this.$refs.chart.loading = true;
          this.$refs.chart.updateChart();
        } else {
          this.$refs.chart.initChart();
        }
      });
    },
    resize() {
      this.$refs["chart"].$_resizeHandler &&
        this.$refs["chart"].$_resizeHandler();
    }
  },
  beforeDestroy() {
    // 修复组件改动，热更新后组件数据不重载的问题
    this.$emit("over-load", ["exposed-device-type"]);
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/card.scss";
@import "../mixins/styles/keyframes.scss";
.exposedDeviceType {
  right: 10px;
  top: 70px;
  transform: translateX(100%);
  &.animation {
    animation: rightSlidein 2s;
    transform: translateX(0);
  }
}
</style>
