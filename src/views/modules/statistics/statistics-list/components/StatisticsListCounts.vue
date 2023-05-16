<template>
  <div class="card-list">
    <div class="card-item ip">
      <div class="info">
        <div class="icon-box">
          <img class="icon" src="../mixins/images/ip.png" alt="" />
          <span class="text">IP</span>
        </div>
        <div class="value">
          <new-animated-number :value="counts['IP'] || 0" />
        </div>
      </div>
    </div>
    <div class="card-item port">
      <div class="info">
        <div class="icon-box">
          <img class="icon" src="../mixins/images/port.png" alt="" />
          <span class="text">端口</span>
        </div>
        <div class="value">
          <new-animated-number :value="counts['PORT'] || 0" />
        </div>
      </div>
    </div>
    <div class="card-item asset">
      <div class="info">
        <div class="icon-box">
          <img class="icon" src="../mixins/images/asset.png" alt="" />
          <span class="text">服务</span>
        </div>
        <div class="value">
          <new-animated-number :value="counts['SERVICE'] || 0" />
        </div>
      </div>
    </div>
    <div class="card-item bug">
      <div class="info">
        <div class="icon-box">
          <img class="icon" src="../mixins/images/bug.png" alt="" />
          <span class="text">漏洞</span>
        </div>
        <div class="value">
          <new-animated-number :value="counts['VUL'] || 0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    counts: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.card-list {
  @include flex-space-between;
  padding: 20px 80px;
  margin-top: 16px;
  background-color: white;
  width: 100%;
  height: 150px;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.17);
  .card-item {
    width: 307px;
    height: 110px;
    padding: 24px 32px;
    .info {
      @include flex-space-between;
      color: #fff;
      .icon-box {
        @include flex-start;
        .icon {
          margin-right: 14px;
        }
        .text {
          font-size: 24px;
        }
      }
      .value {
        font-size: 26px;
        cursor: pointer;
      }
    }
    &.ip {
      background: url("../mixins/images/ip-bg.png") no-repeat;
    }
    &.port {
      background: url("../mixins/images/port-bg.png") no-repeat;
    }
    &.asset {
      background: url("../mixins/images/asset-bg.png") no-repeat;
    }
    &.bug {
      background: url("../mixins/images/bug-bg.png") no-repeat;
    }
  }
}
</style>
