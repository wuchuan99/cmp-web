<template>
  <div>
    <el-input
      v-model="input"
      :type="type"
      :maxlength="maxlength"
      :minlength="minlength"
      :show-word-limit="showWordLimit"
      :placeholder="placeholder"
      :clearable="clearable"
      :showPassword="showPassword"
      :disabled="disabled"
      :size="size"
      :prefix-icon="prefixIcon || search"
      :suffix-icon="suffixIcon"
    ></el-input>
  </div>
</template>
<script>
export default {
  props: {
    // 类型
    type: {
      type: String,
      default: "text"
    },
    // 原生属性，最大输入长度
    maxlength: {
      type: Number,
      default: Infinity
    },
    // 原生属性，最小输入长度
    minlength: {
      type: Number,
      default: -Infinity
    },
    // 是否显示输入字数统计
    showWordLimit: {
      type: Boolean,
      default: false
    },
    // 输入框占位文本
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    // 是否显示切换密码图标
    showPassword: {
      type: Boolean,
      default: false
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: true
    },
    // 输入框头部图标
    prefixIcon: {
      type: String,
      default: ""
    },
    // 输入框尾部图标
    suffixIcon: {
      type: String,
      default: ""
    }
  },
  computed: {
    // 绑定值
    input: {
      get() {
        return this.$attrs.value || "";
      },
      // v-model 等价于 :value="" + @input=""
      set(val) {
        this.$emit("input", val);
      }
    },
    // 输入框尺寸，只在 type!="textarea" 时有效 medium / small / mini 默认值最大
    size() {
      return ["medium", "small", "mini"].indexOf(this.$attrs.size) > -1
        ? this.$attrs.size
        : "";
    },
    // 输入框头部图标search
    search() {
      return this.$attrs.search ? "el-icon-search" : "";
    }
  }
};
</script>
