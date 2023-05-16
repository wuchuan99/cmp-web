<template>
  <section class="app-wrapper">
    <header
      class="header"
      :class="{ 'is-search-header': specialRoutes.includes($route.name) }"
    >
      <my-header></my-header>
    </header>
    <main
      class="main"
      :class="{ 'is-search-main': specialRoutes.includes($route.name) }"
    >
      <my-main></my-main>
    </main>
  </section>
</template>
<script>
import MyHeader from "./header";
import MyMain from "./main";
import { mapState } from "vuex";
export default {
  components: { MyHeader, MyMain },
  computed: {
    ...mapState("app", ["specialRoutes"])
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.app-wrapper {
  width: 100%;
  height: 100%;

  .header {
    height: 60px;
    background: #0a2064;
    position: relative;
    // z-index不能超过弹窗大小
    z-index: 1000;
  }
  .main {
    height: calc(100% - 60px);
    min-width: 1600px;
    position: relative;
    overflow: auto;
    @include scroll;
    // background: rgba(239, 243, 250, 0.69);
    background-color: rgb(233 234 235);
  }
  .is-search-header {
    background: transparent;
  }
  .is-search-main {
    overflow: inherit;
    background: transparent;
  }
}
</style>
