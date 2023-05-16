<!-- 关键字搜索框 -->
<template>
  <div class="keyword" :class="[computedMarginLeft]">
    <el-input
      :placeholder="placeholder"
      v-model.trim="keyword"
      :disabled="disabled"
      v-on:keyup.enter.native="goSearch"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="goSearch"
      ></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入关键字"
    },
    margin: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    keyword: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    computedMarginLeft() {
      return this.margin ? "margin-left" : "";
    }
  },
  data() {
    return {};
  },
  methods: {
    goSearch() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
$btnBackground: linear-gradient(180deg, #135bd2 0%, #4e7fe2 100%);
$btnBackgroundHover: linear-gradient(180deg, #4e7fe2 0%, #135bd2 100%);
.margin-left {
  margin-left: 15px;
}
:deep(.el-input-group__append) {
  background: $btnBackground;
  &:hover {
    background: $btnBackgroundHover;
  }
  button {
    color: white;
  }
}
</style>
