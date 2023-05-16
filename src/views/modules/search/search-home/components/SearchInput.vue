<template>
  <div class="search-input">
    <div class="search-input-buttons">
      <tips-search-input ref="tips-search-input" class="tips-search" />
      <!-- <img src="../mixin/images/ip-search.png" alt="" class="ip-input-icon" /> -->
      <img
        src="../mixin/images/search.png"
        alt=""
        class="input-icon"
        @click="handle('search')"
      />
      <div class="search-tips">
        <span
          :class="{ active: active === 'searchGrammar' }"
          @click="handle('operateDrawer')"
          >搜索语法（Shift+/）</span
        >
        <span>|</span>
        <span
          :class="{ active: active === 'advancedSearch' }"
          @click="handle('openAdvancedSearch')"
          >高级搜索</span
        >
      </div>
      <advanced-search
        ref="advanced-search"
        class="advanced-search"
        :visible.sync="visible"
        popper-class="advanced-search-home"
        @sure="handle('sure', $event)"
        @close="active = ''"
      />
      <search-grammar
        ref="searchGrammar"
        theme="dark-blue"
        @close="active = ''"
      />
    </div>
  </div>
</template>
<script>
import { debounce } from "@/utils/common";
import TipsSearchInput from "../../components/TipsSearchInput.vue";
import AdvancedSearch from "../../components/AdvancedSearch.vue";
import SearchGrammar from "../../components/grammar";

export default {
  components: { TipsSearchInput, AdvancedSearch, SearchGrammar },
  data() {
    return {
      visible: false,
      active: ""
    };
  },
  mounted() {
    window.addEventListener("keydown", this.keydown);
  },
  methods: {
    handle: debounce(function(item, val) {
      const operate = {
        search: () => {
          this.$router.push({
            name: "searchList",
            params: {
              search: this.$refs["tips-search-input"].keyword
            }
          });
        },
        operateDrawer: () => {
          this.active = "searchGrammar";
          this.visible = this.active === "advancedSearch";
          this.$refs.searchGrammar.show();
        },
        openAdvancedSearch: () => {
          this.active =
            this.active === "advancedSearch" ? "" : "advancedSearch";
          this.visible = this.active === "advancedSearch";
        },
        sure: () => {
          this.$router.push({
            name: "searchList",
            params: { search: val }
          });
        }
      };
      operate[item] && operate[item]();
    }, 200),
    keydown(e) {
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
          this.handle("search");
        }
      } else if ([38, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keydown);
  }
};
</script>
<style lang="scss" scoped>
.search-input {
  position: relative;
  z-index: 1;
  top: 50%;
  transform: translateY(-150%);
  .search-input-buttons {
    text-align: center;
    position: relative;

    .tips-search {
      width: 950px;
      height: 50px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid #ffffff;
      margin: 0 auto;
    }
    .ip-input-icon {
      top: 12px;
      right: calc(50% - 430px);
    }
    .input-icon {
      top: 13px;
      right: calc(50% - 460px);
    }
    img {
      position: absolute;
      cursor: pointer;
      transition: transform 0.2s linear;
      &:hover {
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        transform: scale(1.05) translate(-1px, -1px);
      }
    }
    .search-tips {
      position: absolute;
      left: calc(50% - 472px);
      top: 60px;
      color: #ddd7d7;
      font-size: 15px;
      // left: -950px;
      span:nth-child(2n-1) {
        cursor: pointer;
        display: inline-block;
        transition: transform 0.2s linear;
        &:hover {
          color: #4e7fe2;
        }
        &.active {
          color: #4e7fe2;
        }
      }

      span:nth-of-type(2) {
        padding: 0 10px;
      }
    }
  }
}
:deep(.advanced-search) {
  width: 950px;
  position: absolute;
  left: 50%;
  top: 86px;
  transform: translateX(-50%);
  .list {
    .item {
      input {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
      }
    }
  }

  .operator {
    i {
      color: #fff;
    }
  }
}
</style>
