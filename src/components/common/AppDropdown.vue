<template>
  <div class="new-dropdown" :class="[computedMarginLeft]">
    <el-dropdown trigger="click" @click="changeCheck">
      <new-button>
        <i class="el-icon-arrow-down" style="margin-right: 5px"></i>
        <slot>批量操作</slot>
      </new-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in list"
          :key="item.label"
          @click.native="click(item.label)"
          >{{ item.value }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <!--    <el-dropdown split-button @click="changeCheck" trigger="click">
      <slot>批量操作</slot>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in list"
          :key="item.label"
          @click.native="click(item.label)"
          >{{ item.value }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>-->
  </div>
</template>
<script>
export default {
  props: {
    margin: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    computedMarginLeft() {
      return this.margin ? "margin-left" : "";
    }
  },
  methods: {
    changeCheck() {
      this.$emit("click", "check");
    },
    click(val) {
      this.$emit("click", val);
    }
  }
};
</script>
<style lang="scss">
// 样式覆盖
.new-dropdown {
  display: inline-flex;
  $btnBackground: linear-gradient(180deg, #3198f8 0%, #165fee 100%);
  $btnBackgroundHover: linear-gradient(180deg, #165fee 0%, #3198f8 100%);
  height: 36px;
  span {
    font-weight: 500;
    font-size: 13px;
  }
  .el-dropdown {
    font-size: 13px;
  }
  .el-button {
    height: 36px;
    color: #ffffff;
    border-radius: 4px;
    background: $btnBackground;

    &:hover,
    &:focus {
      background: $btnBackgroundHover;
    }
    &:active {
      border: 1px solid white;
      background: $btnBackground;
    }
  }
}
/* margin-left */
.margin-left {
  margin-left: 20px;
}
// 样式覆盖
.new-dropdown {
  span {
    font-size: 13px;
  }
  .el-dropdown {
    font-size: 13px;
  }
  .el-button {
    height: 36px;
    border-radius: 4px;
  }
}
.margin-left {
  margin-left: 20px;
}
</style>
