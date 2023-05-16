<template>
  <div>
    <div
      :id="`#port${banner.port}`"
      class="ip-banner"
      v-for="(banner, index) in banners"
      :key="`banner${index}`"
    >
      <div class="ip-banner-title">
        <span v-if="banner.port">{{ banner.port }}</span>
        <span v-if="banner.productName">{{ banner.productName }}</span>
        <span v-if="banner.service">{{ banner.service }}</span>
        <img
          v-if="['https', 'http'].includes(banner.service)"
          src="../mixins/images/href.png"
          alt=""
          @click="jumpTo(`${banner.service}://${banner.ip}:${banner.port}`)"
        />
      </div>
      <div class="ip-banner-container">
        <div v-html="banner.banner"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  methods: {
    jumpTo(url) {
      console.log(url);
      window.open(url, "_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.ip-banner {
  width: 888px;
  height: 268px;
  margin-bottom: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(190, 190, 190, 0.5);
  $titleHeight: 60px;
  .ip-banner-title {
    height: $titleHeight;
    line-height: $titleHeight;
    font-weight: 600;
    padding-left: 20px;
    color: #4d5056;
    border-bottom: 1px solid #eaeaea;
    @include flex-center;
    text-align: center;
    span {
      min-width: 63px;
      padding: 0 10px;
      height: 31px;
      line-height: 31px;
      background: #669dff;
      border-radius: 2px;
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
      margin-right: 12px;
    }
    img {
      @include button-click;
    }
  }
  .ip-banner-container {
    width: 100%;
    height: calc(100% - $titleHeight);
    padding: 15px 5px;
    font-size: 14px;
    font-weight: 400;
    color: #6e747d;
    line-height: 22px;
    div {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      overflow: auto;
      white-space: pre-wrap;
      @include scroll;
    }
  }
}
</style>
