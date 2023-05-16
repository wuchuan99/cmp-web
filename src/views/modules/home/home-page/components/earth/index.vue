<template>
  <div class="earth">
    <div id="loading">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
      <div>加载资源中...</div>
    </div>
    <div id="html2canvas" class="css3d-wapper">
      <div class="fire-div"></div>
    </div>
    <div id="earth-canvas" ref="earth-canvas"></div>
    <untils
      ref="untils"
      :world="world"
      @toggle-screen="$emit('toggle-screen')"
    />
  </div>
</template>

<script>
import World from "./mixins/js/World";
import untils from "./components/untils.vue";
export default {
  components: { untils },
  data() {
    return {
      world: null
    };
  },
  mounted() {
    // earth-canvas
    const container = this.$refs["earth-canvas"];
    this.world = new World({
      dom: container,
      // 资源加载完成的回调函数
      callBack: () => {
        setTimeout(() => {
          this.$refs.untils.visible = true;
        }, 2000);
        this.$emit("resourcesComplete");
      },
      // 点击城市的回调
      onCountryClick: data => {
        this.$emit("country-click", data);
      }
    });
    console.log(this.world);
    container.addEventListener("mousewheel", this.mousewheel);
  },
  methods: {
    mousewheel(e) {
      if (!this.$refs["untils"]) return;
      console.log(e);
      if (e.wheelDelta > 0) {
        // 向上滚动
        this.$refs["untils"].zoomIn(false);
      } else if (e.wheelDelta < 0) {
        // 向下滚动
        this.$refs["untils"].zoomOut(false);
      }
    },
    resize() {
      this.world.sizes.resize();
    }
  },
  beforeDestroy() {
    // 清除事件
    const container = this.$refs["earth-canvas"];
    container.removeEventListener("mousewheel", this.mousewheel);
    this.world.clearEventAll();
    // 清除场景释放内存
    this.world.clearScene();
    this.world = null;
  }
};
</script>
<style lang="scss" scoped>
@import "./mixins/style/index.scss";
</style>
