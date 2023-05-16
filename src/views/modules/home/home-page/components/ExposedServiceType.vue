<template>
  <div class="exposedDeviceType card" :class="{ animation }">
    <div class="title">{{ country?.name || "全球" }}暴露服务类型TOP10</div>
    <div class="body">
      <new-chart ref="chart" :option="option" />
    </div>
  </div>
</template>

<script>
import { getRegionService } from "@/api/home";
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
        grid: {
          left: "4%",
          right: "6%",
          bottom: "6%",
          top: "8%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          data: [
            "ftp",
            "http",
            "https",
            "snmp",
            "ssh",
            "sip",
            "telnet",
            "mysql",
            "netbios-ns",
            "tcp"
          ],
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255, 255, 255)"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255)"
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)"
            }
          }
        },
        series: [
          {
            data: [7, 6, 5, 4, 3, 2, 1, 1, 5, 1],
            type: "bar",
            barWidth: 10,
            barMinHeight: 5,
            itemStyle: {
              color: "#07b1f8"
            }
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
      getRegionService(params).then(res => {
        const { success, data } = res.data;
        if (success) {
          if (data?.dataAxis) this.option.xAxis.data = data.dataAxis;
          if (data?.data) this.option.series[0].data = data.data;
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
    this.$emit("over-load", ["exposed-service-type"]);
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/card.scss";
@import "../mixins/styles/keyframes.scss";
.exposedDeviceType {
  left: 10px;
  bottom: 10px;
  transform: translateX(-100%);
  &.animation {
    animation: leftSlidein 2s;
    transform: translateX(0);
  }
}
</style>
