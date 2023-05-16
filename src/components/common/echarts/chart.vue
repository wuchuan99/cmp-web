<template>
  <div class="echarts" :class="{ loading }" v-loading="loading">
    <div class="chart-container" />
  </div>
</template>

<script>
import resize from "./mixins/resize";
import { init } from "echarts";
import { debounce } from "@/utils/common";

export default {
  mixins: [resize],
  props: {
    option: Object,
    isClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      theme: "chalk",
      loading: true
    };
  },
  mounted() {},
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    handle: debounce(function({ action }) {
      this[action] && this[action]();
    }, 200),
    initChart(loading = false) {
      const container = this.$el.querySelector(".chart-container");
      this.chart = init(container, this.theme);
      this.loading = loading;
      this.chart.setOption(this.option);
      this.isClick && this.initEvent();
    },
    updateChart() {
      this.loading = false;
      this.chart.setOption(this.option);
    },
    initEvent() {
      this.chart.on("click", params => {
        console.log(params);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  position: relative;
  &.loading {
    > div {
      visibility: hidden;
    }
  }
  .chart-container {
    width: 100%;
    height: 100%;
  }
  .export-chart-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    min-width: auto;
    height: 26px;
    padding: 0 10px;
    background: #008dff;
    color: #ffffff;
    border-radius: 4px;
    .btn-content {
      font-size: 13px;
      .btn-content-img {
        i {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
