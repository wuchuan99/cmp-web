<template>
  <div>
    <div class="search-input">
      <tips-search-input ref="tips-search-input" class="tips-search" />
      <div class="search-input-button" @click="handle('tipsSearchClick')">
        搜索
      </div>
      <div class="search-input-button" @click="handle('operateDrawer')">
        搜索语法
      </div>
      <search-grammar ref="searchGrammar" />
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/common";
import TipsSearchInput from "../../components/TipsSearchInput.vue";
import SearchGrammar from "../../components/grammar";
import EventBus from "@/utils/event-bus";
export default {
  components: { TipsSearchInput, SearchGrammar },
  data() {
    return {
      visible: false,
      search: null
    };
  },
  watch: {
    search(val) {
      this.$emit("search-change", val);
    }
  },
  created() {},
  mounted() {
    EventBus.$on("search-change", data => {
      if (data?.field) {
        this.$refs["tips-search-input"].setKeyword(data);
        this.search = this.$refs["tips-search-input"]?.keyword || "";
      }
    });

    window.addEventListener("keydown", this.keydown);
  },
  methods: {
    handle: debounce(function(action) {
      const operate = {
        tipsSearchClick: () => {
          this.search = this.$refs["tips-search-input"]?.keyword || "";
        },
        operateDrawer: () => {
          this.$refs.searchGrammar.show();
        }
      };
      operate[action] && operate[action]();
    }, 200),
    keydown(e) {
      if (this.$route.name !== "searchList") return;
      if (e.shiftKey && e.keyCode === 191) {
        if (
          this.$refs?.["tips-search-input"]?.$refs?.input?.$refs?.input ===
          document.activeElement
        )
          return;
        if (this.$refs.searchGrammar.$refs.drawer.dialog) return;
        this.handle("operateDrawer");
      } else if (e.keyCode === 13) {
        if (
          this.$refs?.["tips-search-input"]?.$refs?.input?.$refs?.input ===
          document.activeElement
        ) {
          if (
            this.$refs["tips-search-input"].visible &&
            this.$refs["tips-search-input"].curIndex > -1
          )
            return;
          console.log("to search");
          this.handle("tipsSearchClick");
        }
      } else if ([38, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
    },
    setSearch(search) {
      this.$refs["tips-search-input"].setKeyword(search);
      this.search = search;
    }
  },
  beforeDestroy() {
    EventBus.$off("search-change");
    window.removeEventListener("keydown", this.keydown);
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/search-input.scss";
</style>
