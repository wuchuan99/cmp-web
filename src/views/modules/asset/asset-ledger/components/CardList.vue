<template>
  <div class="card-list">
    <div class="card-item ip">
      <div class="info">
        <div class="icon-box">
          <img class="icon" src="../mixins/images/ip.png" alt="" />
          <span class="text">IP</span>
        </div>
        <new-animated-number class="value" :value="ledgerStats['IP'] || 0" />
      </div>
    </div>
    <div class="card-item port">
      <div class="info">
        <div class="icon-box">
          <img class="icon" src="../mixins/images/port.png" alt="" />
          <span class="text">端口</span>
        </div>
        <new-animated-number class="value" :value="ledgerStats['PORT'] || 0" />
      </div>
    </div>
    <div class="card-item asset">
      <div class="info">
        <div class="icon-box">
          <img class="icon" src="../mixins/images/asset.png" alt="" />
          <span class="text">服务</span>
        </div>
        <new-animated-number
          class="value"
          :value="ledgerStats['SERVICE'] || 0"
        />
      </div>
    </div>
    <div class="card-item bug">
      <div class="info">
        <div class="icon-box">
          <img class="icon" src="../mixins/images/bug.png" alt="" />
          <span class="text">漏洞</span>
        </div>
        <new-animated-number class="value" :value="ledgerStats['VUL'] || 0" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ledgerStats: {
      type: Object,
      requred: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.card-list {
  @include flex-space-between;
  padding: 10px 80px;
  margin-top: 16px;
  background-color: white;
  width: 100%;
  height: 100px;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.17);
  .card-item {
    width: 307px;
    height: 100%;
    padding: 0 32px;
    .info {
      @include flex-space-between;
      color: #fff;
      height: 70%;
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
      background-size: 100% 100%;
    }
    &.port {
      background: url("../mixins/images/port-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    &.asset {
      background: url("../mixins/images/asset-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    &.bug {
      background: url("../mixins/images/bug-bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
