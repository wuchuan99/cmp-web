<template>
  <span
    class="btn"
    :class="[type, computedDisabled, computedMarginLeft]"
    :style="{ width: width }"
    @click="clickEvent"
  >
    <span class="btn-content" :class="{ left: left }">
      <span
        v-if="!['primary', 'loading', 'close'].includes(type)"
        class="btn-content-img"
      >
        <i :class="computedIcon"></i>
      </span>
      <!-- 文件加载loading -->
      <span v-if="type === 'loading'" class="btn-content-img loading">
        <i class="el-icon-loading"></i>
      </span>
      <span class="btn-content-slot">
        <slot>按钮</slot>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    // 按钮类型（图标）
    type: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ""
    },
    // 按钮名称过短
    left: {
      type: Boolean,
      default: false
    },
    // 左侧margin
    margin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedDisabled() {
      return this.disabled ? "disabled" : "";
    },
    computedMarginLeft() {
      return this.margin ? "margin-left" : "";
    },
    // 字体图标
    computedIcon() {
      return `icon-${this.type}`;
    }
  },
  methods: {
    clickEvent() {
      return this.disabled ? false : this.$emit("click"); // 如果是禁用，禁止访问
    }
  }
};
</script>

<style lang="scss" scoped>
$btnBackground: linear-gradient(180deg, #135bd2 0%, #4e7fe2 100%);
$btnBackgroundHover: linear-gradient(180deg, #4e7fe2 0%, #135bd2 100%);
$themeColor: #135bd2;
.btn {
  display: inline-block;
  height: 36px;
  min-width: 80px;
  padding: 0 16px;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  transition: color 0.2s linear;
  background: $btnBackground;
  .btn-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: 13px;
    .btn-content-img {
      padding-right: 6px;
      padding-top: 2px;
      i {
        font-size: 12px;
        &::before {
          color: white;
        }
      }
      &.loading {
        padding-top: 0px;
      }
    }
  }
  .left {
    padding-left: 55px !important;
  }
  &:hover,
  &:focus {
    background: $btnBackgroundHover;
  }
  &:active {
    background: $btnBackground;
  }
}
.default {
  &:hover,
  &:focus {
    background: $btnBackgroundHover;
  }
  &:active {
    background: $btnBackground;
  }
}
/* 取消 */
.cancel {
  width: 90px;
  min-width: 90px;
  border: 1px solid $themeColor; //#1ab394;
  background: #ffffff;
  color: $themeColor; //#1ab394;
  &:hover,
  &:focus {
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &:active {
    //border-color: #3a8ee6;
    outline: 0;
  }
}
/* 确定 */
.sure {
  width: 90px;
  min-width: 90px;

  &:hover,
  &:focus {
    background: $btnBackgroundHover;
  }
  &:active {
    background: $themeColor; //#1ab394;
  }
}
.disabled {
  color: #fff;
  opacity: 0.5;
  pointer-events: none;
}
.close {
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  &:hover,
  &:focus,
  &:active {
    color: #409eff;
    border-color: #c6e2ff;
    background: #ecf5ff;
  }
}
.margin-left {
  margin-left: 15px;
}
.btn.delete {
  background: linear-gradient(180deg, #f84c4c 0%, #f56c6c 100%);
  &:hover,
  &:active,
  &:focus {
    background: linear-gradient(180deg, #f56c6c 0%, #f84c4c 100%);
  }
}
</style>
