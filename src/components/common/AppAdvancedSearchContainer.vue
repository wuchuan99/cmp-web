<template>
  <div
    class="advanced-search"
    :style="{ background: background }"
    ref="advanced-search"
    v-show="visible"
  >
    <el-form :inline="true" :model="form" ref="form" v-bind="$attrs">
      <!-- slot form表单内容 -->
      <slot></slot>
      <div class="advanced-search-buttons" v-if="button">
        <new-button type="primary" @click="sure">确定</new-button>
        <new-button type="primary" margin @click="close">关闭</new-button>
        <new-button type="primary" margin @click="clear">清除</new-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    // 背景色
    background: {
      type: String,
      default: "#fff"
    },
    // 默认按钮组
    button: {
      type: Boolean,
      default: true
    },
    // 表单
    form: {
      default: {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["sure, clear"],
  methods: {
    // 切换展示
    close() {
      this.$emit("close");
      this.$emit("update:visible", false);
    },
    // 保存
    sure() {
      this.$refs["form"].validate(valid => {
        if (!valid) return;
        // 执行后续内容
        this.$emit("sure");
      });
    },
    // 清除筛选条件
    clear() {
      this.$refs.form.resetFields();
      this.$emit("clear");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";

.advanced-search {
  @include flex-start;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  // transition: cubic-bezier(0.175, 0.885, 0.32, 1) 0.3s;
  // transition-property: padding, max-height, margin; //padding

  .advanced-search-buttons {
    display: inline-flex;
  }
}

.advanced-search.show {
  max-height: 130px;
  margin-bottom: 10px;
  overflow: visible;
  border: 1px solid #eaeefb;
  padding: 15px 0 0 10px;

  // el-form
  :deep(.el-form .el-form-item) {
    margin-bottom: 15px;
    margin-right: 30px;
    max-width: 270px;

    .el-form-item__content {
      padding: 0;
      line-height: 40px;
    }
  }
}
</style>
