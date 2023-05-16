<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { getProductName } from "./config/configs/product";
export default {
  data() {
    return {
      link: null
    };
  },
  // head标签内容
  metaInfo() {
    return {
      // 产品名称
      title: getProductName(),
      // 产品icon
      link: [
        {
          rel: "icon",
          // href: require(`./assets/images/logo/${process.env.VUE_APP_ICO}`),
          type: "image/x-icon"
        }
      ]
      // link: this.link,
    };
  },
  created() {}
};
</script>
<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
}
</style>
