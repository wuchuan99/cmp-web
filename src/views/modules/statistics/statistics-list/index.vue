<template>
  <div class="statistics-list">
    <div class="statistics-list-header">
      <new-select
        multiple
        collapse-tags
        style="width: 160px"
        :option.sync="ledgerIds"
        :optionList="ledgerMap"
      ></new-select>
      <new-button
        :type="exportBtnType"
        :disabled="exportBtnType === 'loading'"
        margin
        @click="exportStatistics"
        >导出</new-button
      >
    </div>
    <statistics-list-counts :counts.sync="counts"></statistics-list-counts>
    <!-- 统计图 -->
    <div class="statistics-list-charts">
      <!-- ip分布top10 -->
      <div class="chart">
        <new-chart
          :ref="ipRef"
          :option="ipOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 端口分布top10 -->
      <div class="chart">
        <new-chart
          :ref="portRef"
          :option="portOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 服务分布top10 -->
      <div class="chart">
        <new-chart
          :ref="serviceRef"
          :option="serviceOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 漏洞分布top10 -->
      <div class="chart">
        <new-chart
          :ref="vulRef"
          :option="vulOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>

      <!-- 设备类型Top -->
      <div class="chart">
        <new-chart
          :ref="deviceTypeRef"
          :option="deviceTypeOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 设备厂商分布 -->
      <div class="chart">
        <new-chart
          :ref="deviceVendorRef"
          :option="deviceVendorOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 系统组件 -->
      <div class="chart">
        <new-chart
          :ref="systemComponentRef"
          :option="systemComponentOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 操作系统 -->
      <div class="chart">
        <new-chart
          :ref="osRef"
          :option="osOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 漏洞等级 -->
      <div class="chart">
        <new-chart
          :ref="vulLevelRef"
          :option="vulLevelOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>

      <!-- 存在漏洞的设备分布 -->
      <div class="chart">
        <new-chart
          :ref="vulnerableDeviceRef"
          :option="vulnerableDeviceOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 存在漏洞的设备厂商分布 -->
      <div class="chart">
        <new-chart
          :ref="vulnerableDeviceVendorRef"
          :option="vulnerableDeviceVendorOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
      <!-- 高危资产 -->
      <div class="chart">
        <new-chart
          :ref="highRiskAssetRef"
          :option="highRiskAssetOption"
          :exportBtn="true"
          :isClick="true"
        ></new-chart>
      </div>
    </div>
  </div>
</template>
<script>
import StatisticsListCounts from "./components/StatisticsListCounts";
import { optionsMinxis } from "./mixins/js/chart-options";
import { getLedgerMap, getStatsMap } from "@/api/asset/asset-ledger";
import { getstatsNum } from "@/api/statistics/statistics-list";
import { chartMap } from "./mixins/js/chart-list";
import { debounce } from "@/utils/common";
import { deepClone } from "@/utils/object";

export default {
  components: { StatisticsListCounts },
  mixins: [optionsMinxis],
  data() {
    return {
      ledgerIds: [],
      oldLedgerIds: [],
      counts: {},
      ledgerMap: [],
      ipRef: "ipChart",
      vulRef: "vulChart",
      portRef: "portChart",
      serviceRef: "serviceChart",
      vulLevelRef: "vulTyepChart",
      deviceTypeRef: "deviceTypeChart",
      deviceVendorRef: "deviceVendorChart",
      systemComponentRef: "systemComponentChart",
      osRef: "osChart",
      vulnerableDeviceRef: "vulnerableDeviceChart",
      vulnerableDeviceVendorRef: "vulnerableDeviceVendorChart",
      highRiskAssetRef: "highRiskAssetChart",
      exportBtnType: "export"
    };
  },
  watch: {
    ledgerIds: {
      deep: true,
      handler(val, oldVal) {
        if (oldVal.length === 1 && val.length === 0) {
          this.ledgerIds = oldVal;
          return this.$message.error("必须选择一个台账");
        }
        // 重新获取数据
        this.initData();
      }
    }
  },
  methods: {
    // 获取台账列表
    getLedgers() {
      getLedgerMap().then(res => {
        const { success, data } = res.data;
        if (success) {
          this.ledgerMap = data.map(item => {
            return {
              label: item.id,
              value: item.name
            };
          });
          if (this.ledgerMap.length) {
            this.ledgerIds = [this.ledgerMap[0].label] || "";
            // 初始化数据
            this.initData();
          }
        }
      });
    },
    initData: debounce(function() {
      if (this.ledgerIds.length === this.oldLedgerIds.length) return;
      this.oldLedgerIds = deepClone(this.ledgerIds);
      this.getStatsMaps();
      this.chartInit();
    }, 800),
    // 获取统计数map
    getStatsMaps() {
      getStatsMap().then(res => {
        const { success, data } = res.data;
        if (success)
          data.forEach(({ key }) => {
            this.getStats(key);
          });
      });
    },
    // 查询统计数
    getStats(type) {
      const params = {
        type,
        assetLedgerIds: this.ledgerIds
      };
      getstatsNum(params).then(res => {
        const { success, data } = res.data;
        if (success) this.$set(this.counts, type, data ? parseInt(data) : 0);
      });
    },
    chartInit() {
      for (const [ref, { seriesType, method, option }] of chartMap) {
        if (!seriesType || !this[ref] || !method || !this[option]) continue;
        if (!this.$refs[this[ref]]) continue;
        this.$refs[this[ref]].loading = true;
        const params = { assetLedgerIds: this.ledgerIds, topN: 10 };
        method(params).then(res => {
          const { success, data } = res.data;
          if (success) {
            if (seriesType === "bar") this.setBarOption(option, data);
            else if (seriesType === "pie") this.setPieOption(option, data);
            this.$refs[this[ref]].initChart();
          }
        });
      }
    },
    setBarOption(option, data) {
      if (data?.dataAxis) this[option].xAxis.data = data?.dataAxis;
      if (data?.data) this[option].series[0].data = data?.data;
    },
    setPieOption(option, data) {
      if (data?.pieDatas) this[option].series[0].data = data?.pieDatas;
    },
    exportStatistics() {
      this.exportBtnType = "loading";
      setTimeout(() => {
        this.exportBtnType = "export";
        this.$message.success("导出成功");
      }, 2000);
    }
  },
  mounted() {},
  created() {
    this.getLedgers();
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.statistics-list {
  height: 100%;
  padding: 25px 0;
  // overflow-y: auto;
  // @include scroll;
  .statistics-list-header {
    @include flex-start;
    @include shadow;
    background-color: white;
    height: 75px;
    width: 100%;
    padding: 20px;
    .address-range {
      padding-left: 20px;
    }
    :deep(.el-select__tags-text) {
      max-width: 40px;
    }
  }

  .statistics-list-charts {
    padding: 20px 0 30px;
    @include flex-wrap;
    .chart {
      margin-right: 26.6px;
      margin-bottom: 20px;
      width: 380px;
      @include shadow;
      background-color: white;
      height: 260px;
      // padding-top: 10px;
      overflow: hidden;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
