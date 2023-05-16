<template>
  <div class="ip-app" v-if="apps.length">
    <div class="ip-app-title">应用</div>
    <div class="ip-app-container">
      <new-table :border="true" :columns="columns" :data="apps" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { type: "index", label: "序号", align: "center", width: 100 },
        { label: "应用名称", prop: "name" },
        { label: "版本", prop: "version" }
      ]
    };
  },
  props: {
    apps: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.ip-app {
  width: 701px;
  // height: 327px;
  // max-height: 327px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(187, 187, 187, 0.5);
  margin: 13px 10px 13px 0;
  $titleHeight: 60px;
  .ip-app-title {
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
  .ip-app-container {
    width: 100%;
    max-height: calc(327px - $titleHeight);
    padding: 5px 9px;
    overflow-y: scroll;
    @include scroll;
  }
}
</style>
