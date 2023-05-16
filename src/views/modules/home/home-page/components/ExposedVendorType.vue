<template>
  <div class="exposedVendorType card" :class="{ animation }">
    <div class="title">{{ country?.name || "全球" }}暴露设备厂商TOP10</div>
    <div class="body">
      <new-chart ref="chart" :option="option" />
    </div>
  </div>
</template>

<script>
import { getRegionDeviceVendor } from "@/api/home";
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
              { value: 1048, name: "华为" },
              { value: 735, name: "思科" },
              { value: 580, name: "爱立信" },
              { value: 484, name: "诺基亚" },
              { value: 145, name: "中兴" },
              { value: 235, name: "北电" },
              { value: 127, name: "四方继保" },
              { value: 523, name: "巴赫曼" },
              { value: 123, name: "锐捷" },
              { value: 58, name: "H3C" }
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
      getRegionDeviceVendor(params).then(res => {
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
    this.$emit("over-load", ["exposed-vendor-type"]);
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/card.scss";
@import "../mixins/styles/keyframes.scss";
.exposedVendorType {
  right: 10px;
  top: calc((100% - 110px) / 2 + 90px);
  transform: translateX(100%);
  &.animation {
    animation: rightSlidein 2s;
    transform: translateX(0);
  }
}
</style>
