<template>
  <div class="exposedVulType card" :class="{ animation }">
    <div class="title">{{ country?.name || "全球" }}暴露漏洞类型TOP10</div>
    <div class="body">
      <new-chart ref="chart" :option="option" />
    </div>
  </div>
</template>

<script>
import { getRegionVulType } from "@/api/home";
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
          right: "4%",
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
            "弱口令",
            "软件补丁更新",
            "远程访问点",
            "信息泄漏",
            "非必要的服务",
            "配置不当的防火墙",
            "配置不当的服务器",
            "不充分的日志记录",
            "目录访问控制",
            "安全策略"
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
            data: [10, 2, 8, 4, 5, 6, 7, 8, 9, 10],
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
      getRegionVulType(params).then(res => {
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
    this.$emit("over-load", ["exposed-vul-type"]);
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/card.scss";
@import "../mixins/styles/keyframes.scss";
.exposedVulType {
  right: 10px;
  bottom: 10px;
  transform: translateX(100%);
  &.animation {
    animation: rightSlidein 2s;
    transform: translateX(0);
  }
}
</style>
