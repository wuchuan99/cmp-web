<template>
  <div
    class="main-container"
    :class="{ page: ['searchHome', 'homePage'].includes($route.name) }"
  >
    <keep-alive :include="include">
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      include: []
    };
  },
  created() {
    this.setInclude(this.$route);
  },
  watch: {
    $route(to) {
      this.setInclude(to);
    }
  },
  methods: {
    setInclude(route) {
      if (route.meta.root) this.include = [];
      if (route.meta.keepAlive) {
        !this.include.includes(route.name) && this.include.push(route.name);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.main-container {
  width: 1600px;
  height: 100%;
  margin: auto;
}
.page {
  width: 100%;
}
</style>
