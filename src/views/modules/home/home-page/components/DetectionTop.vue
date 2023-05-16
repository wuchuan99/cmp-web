<template>
  <div class="warnTop card" :class="{ animation }">
    <div class="title">{{ country?.name || "全球" }}最新探测结果</div>
    <div class="body">
      <new-table
        ref="new-table"
        :border="true"
        :columns="table.columns"
        :data="records"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import { getRegionResultNewly } from "@/api/home";
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
            prop: "vulNum",
            label: "漏洞数",
            width: "70px"
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
  methods: {
    initData(countryInfo) {
      console.log(countryInfo);
      this.getData();
    },
    getData() {
      this.loading = true;
      const params = { topN: 10 };
      if (this.country?.regionId) params.regionId = this.country.regionId;
      getRegionResultNewly(params)
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
    const container = document.querySelector(".el-table__body-wrapper");
    container.scrollTop = this.scrollTop;
  },
  beforeDestroy() {
    // 修复组件改动，热更新后组件数据不重载的问题
    this.$emit("over-load", ["warn-top"]);
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/card.scss";
@import "../mixins/styles/keyframes.scss";
@import "../mixins/styles/table.scss";
.warnTop {
  left: 420px;
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
