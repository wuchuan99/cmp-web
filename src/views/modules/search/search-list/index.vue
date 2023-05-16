<template>
  <div class="search-list">
    <search-input
      ref="search-input"
      @search-change="searchHandle($event)"
    ></search-input>
    <div>
      <search-stats ref="search-stats" class="float-left"></search-stats>
      <div class="search-list-right float-right">
        <search-time></search-time>
        <search-list-page ref="searchList"></search-list-page>
      </div>
    </div>
  </div>
</template>
<script>
import SearchInput from "./components/SearchInput.vue";
import SearchStats from "./components/SearchStats.vue";
import SearchTime from "./components/SearchTime.vue";
import SearchListPage from "./components/SearchList.vue";
export default {
  name: "searchList",
  components: { SearchInput, SearchStats, SearchTime, SearchListPage },
  data() {
    return {};
  },
  watch: {},
  methods: {
    searchHandle(val) {
      this.$refs.searchList.setSearch(val);
      this.$refs["search-stats"].setSearch(val);
    }
  },
  mounted() {
    const { search } = this.$route.params;
    this.$refs["search-input"].setSearch(search);
  }
};
</script>
<style lang="scss" scoped>
.search-list {
  width: 100%;
  height: 100%;
  .search-list-right {
    width: calc(100% - 377px);
    padding-bottom: 30px;
  }
}
</style>
