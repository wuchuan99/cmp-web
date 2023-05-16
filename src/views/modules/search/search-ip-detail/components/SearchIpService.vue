<template>
  <div class="ip-service" v-if="services.length">
    <div class="ip-service-title">服务</div>
    <div class="ip-service-container">
      <new-table :border="true" :columns="columns" :data="services" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { type: "index", label: "序号", align: "center", width: 50 },
        { label: "端口", prop: "port" },
        { label: "服务", prop: "service" },
        { label: "产品名称", prop: "productName" },
        { label: "厂商", prop: "vendorName" },
        { label: "类型", prop: "deviceType" },
        { label: "版本号", prop: "version" }
      ]
    };
  },
  props: {
    services: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.ip-service {
  width: 701px;
  // height: 327px;
  // max-height: 327px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(187, 187, 187, 0.5);
  margin: 13px 10px 13px 0;
  $titleHeight: 60px;
  .ip-service-title {
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
  .ip-service-container {
    width: 100%;
    max-height: calc(327px - $titleHeight);
    padding: 5px 9px;
    overflow-y: scroll;
    @include scroll;
  }
}
</style>
