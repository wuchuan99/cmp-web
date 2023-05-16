<template>
  <div class="highRiskAssetTop card" :class="{ animation }">
    <div class="title">{{ country?.name || "全球" }}高危探测结果TOP10</div>
    <div class="body">
      <new-table
        :border="true"
        :columns="table.columns"
        :data="records"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import { getRegionResultRisk } from "@/api/home";
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
      this.getData();
    }
  },
  data() {
    return {
      table: {
        columns: [
          {
            prop: "ip",
            label: "IP",
            render: scope => (
              <span
                style="cursor: pointer;color: #07b1f8"
                onclick={() => this.goSearchList(scope.row)}
              >
                {scope.row.ip}
              </span>
            )
          },
          {
            prop: "port",
            label: "端口",
            width: "55px"
          },
          {
            prop: "exploitScore",
            label: "漏洞分数",
            width: "80px"
          },
          {
            prop: "updateTime",
            label: "发现时间",
            width: "160px"
          }
        ]
      },
      records: [],
      loading: false,
      scrollTop: 0
    };
  },
  mounted() {},
  methods: {
    initData(countryInfo) {
      console.log(countryInfo);
      this.getData();
    },
    getData() {
      this.loading = true;
      const params = { topN: 10 };
      if (this.country?.regionId) params.regionId = this.country.regionId;
      getRegionResultRisk(params)
        .then(res => {
          const { success, data } = res.data;
          if (success) this.records = data || [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goSearchList(row) {
      //记录滚动条位置
      const container = this.$el.querySelector(".el-table__body-wrapper");
      this.scrollTop = container.scrollTop;
      //跳转详情
      const search = `ip.address : "${row.ip}" && device.port : "${row.port}"`;
      this.$router.push({
        name: "searchList",
        params: { search }
      });
    }
  },
  activated() {
    const container = this.$el.querySelector(".el-table__body-wrapper");
    container.scrollTop = this.scrollTop;
  },
  beforeDestroy() {
    // 修复组件改动，热更新后组件数据不重载的问题
    this.$emit("over-load", ["high-risk-asset-top"]);
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/card.scss";
@import "../mixins/styles/keyframes.scss";
@import "../mixins/styles/table.scss";
.highRiskAssetTop {
  right: 420px;
  bottom: 10px;
  width: calc(50% - 425px);
  height: calc((100% - 218px) / 3);
  transform: translateY(100%);
  &.animation {
    animation: bottomSlidein 2s;
    transform: translateY(0);
  }
}
</style>
