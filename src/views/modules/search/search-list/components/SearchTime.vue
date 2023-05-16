<template>
  <div class="search-time">
    <div class="search-time-container">
      <div>获取{{ searchTotal }}条匹配结果，耗时{{ searchTime }}ms</div>
      <div class="search-time-button" @click="handle('download')">下载数据</div>
    </div>
  </div>
</template>
<script>
import { downloadSearchResult } from "@/api/search/search-list";
import { debounce } from "@/utils/common";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("search", ["searchTime", "searchTotal"])
  },
  methods: {
    handle: debounce(function(action) {
      const operate = {
        download: () => this.downloadIps()
      };
      operate[action] && operate[action]();
    }, 200),
    // 文件下载
    downloadIps() {
      downloadSearchResult({ search: "" }).then(res => {
        if (res.data.success) this.$message.success(res.data.message);
        else this.$message.error(res.data.message);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/saerch-time.scss";
</style>
