<template>
  <div class="earth">
    <div id="globalArea" ref="globalArea"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const Gio = require("giojs");
      const controller = new Gio.Controller(this.$refs.globalArea);
      controller.configure({
        color: {
          surface: "#1F88CF", //地球表面的颜色
          selected: "#0C3859", //选中国家的颜色
          halo: "#012f59" //光晕的颜色
        },
        brightness: {
          mentioned: 1, //被提及国家的亮度
          related: 1, //有关国家的亮度
          ocean: 1 //海洋的亮度
        }
      });
      controller.lightenMentioned(true);
      // controller.setTransparentBackground(true); //设置背景色为透明色
      controller.addDataAsync("./json/data.json", () => {
        controller.init();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.earth {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  #globalArea {
    width: 100%;
    height: 100%;
  }
}
</style>
