<template>
  <div class="search">
    <!-- 星星特效 -->
    <starts></starts>
    <!-- 小行星划过 -->
    <asteroid></asteroid>
    <search-input></search-input>
  </div>
</template>
<script>
import Starts from "./components/Starts.vue";
import Asteroid from "./components/Asteroid.vue";
import SearchInput from "./components/SearchInput.vue";
export default {
  components: { Starts, Asteroid, SearchInput }
};
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  height: calc(100% + 60px);
  transform: translateY(-60px);
  background: url("./mixin/images/search-home-bg2.png") no-repeat center;
  background-size: 100% 100%;
  padding-top: 60px;
  position: relative;
}
</style>
