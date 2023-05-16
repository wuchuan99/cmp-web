<template>
  <div class="ip-vul" v-if="vuls.length">
    <div class="ip-vul-title">漏洞</div>
    <div class="ip-vul-container">
      <new-table :border="true" :columns="columns" :data="vuls" />
    </div>

    <vul-detail :ref="vulRef"></vul-detail>
  </div>
</template>
<script>
import VulDetail from "./VulDetail";
export default {
  components: { VulDetail },
  data() {
    return {
      vulRef: "vul",
      columns: [
        { type: "index", label: "序号", align: "center", width: 50 },
        { label: "漏洞名称", prop: "name" },
        { label: "危险等级", prop: "level", width: 80, align: "center" },
        { label: "漏洞编号", prop: "cveCode" },
        { label: "漏洞类型", prop: "type" },
        {
          label: "详情",
          width: 50,
          align: "center",
          render: scope => {
            return (
              <i
                class="el-icon-tickets"
                onclick={() =>
                  this.operateVulDrawer({ data: scope.row, title: "漏洞详情" })
                }
              ></i>
            );
          }
        }
      ]
    };
  },
  props: {
    vuls: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 漏洞详情
    operateVulDrawer({ data, title }) {
      this.$refs[this.vulRef].show({ data, title });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
@import "~@/style/constant.scss";
.ip-vul {
  width: 701px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(187, 187, 187, 0.5);
  margin: 13px 10px 13px 0;
  $titleHeight: 60px;
  .ip-vul-title {
    height: $titleHeight;
    line-height: $titleHeight;
    font-weight: 600;
    padding-left: 20px;
    color: #4d5056;
    position: relative;
    border-bottom: 1px solid #eaeaea;
    &::before {
      content: "";
      position: absolute;
      width: 2px;
      height: 15px;
      background: #456bea;
      left: 12px;
      top: 21px;
    }
  }
  .ip-vul-container {
    width: 100%;
    max-height: calc(327px - $titleHeight);
    padding: 5px 9px;
    overflow-y: scroll;
    @include scroll;
    .el-icon-tickets {
      color: $themeColor;
      @include button-click;
    }
  }
}
</style>
