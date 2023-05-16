<template>
  <el-drawer
    :visible.sync="dialog"
    direction="rtl"
    :title="title"
    :wrapperClosable="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    ref="drawer"
    v-bind="$attrs"
    @close="close"
  >
    <div class="demo-drawer__content">
      <div class="slot">
        <!-- 这里是slot插入数据 -->
        <slot></slot>
      </div>
      <div class="demo-drawer__footer" v-if="buttons">
        <new-button type="close" @click="close">取消</new-button>
        <!-- 额外的按钮插槽 -->
        <slot name="buttons"></slot>
        <new-button
          v-if="sureButton"
          :disabled="sureBtnType === 'loading'"
          :type="sureBtnType"
          class="margin-left-30"
          @click="sure"
          >{{ sureBtnType === "loading" ? "提交中" : "确定" }}
        </new-button>
      </div>
    </div>
  </el-drawer>
</template>
<script>
export default {
  data() {
    return {
      sureBtnType: "primary",
      dialog: false,
      title: ""
    };
  },
  props: {
    // 展示默认按钮组
    buttons: {
      type: Boolean,
      default: true
    },
    sureButton: {
      type: Boolean,
      default: true
    }
  },
  // 自定义关闭时的回调
  emits: ["close", "sure"],
  methods: {
    // object： 传入title
    show(title) {
      [this.title, this.dialog] = [title || "", true];
    },
    close() {
      this.dialog = false;
      this.sureBtnType = "primary";
      this.$emit("close");
    },
    sure() {
      // this.sureBtnType = "loading";
      this.$emit("sure");
    },
    loading() {
      this.sureBtnType = "loading";
    },
    closeLoading() {
      this.sureBtnType = "sure";
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.el-drawer__body) {
  padding: 10px 0;
}
.demo-drawer__content {
  display: flex;
  flex-direction: column;
  height: 100%;
  // margin-bottom: 20px;
  .slot {
    flex: 1;
    padding: 0 20px;
    overflow: auto;
    margin-bottom: 20px;
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
      background: #ededed;
    }
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
  }
  .demo-drawer__footer {
    text-align: center;
    height: 50px;
  }
}
</style>
