<template>
  <el-select
    v-model="value"
    :placeholder="placeholder"
    :reserve-keyword="reserveKeyword"
    :remote-method="debounce(remoteMethod, 350)"
    :loading="loading"
    :size="size"
    @change="change"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="item in options"
      :key="item.label"
      :value="item.label"
      :label="item.value"
      :disabled="item.disabled"
    >
      <!--  如果需求slot自定义内容， 应添加slot及html参数    -->
      <slot v-if="item.slot && item.html">
        <div v-html="item.html"></div>
      </slot>
    </el-option>
  </el-select>
</template>
<script>
import { debounce } from "@/utils/common";
export default {
  data() {
    return {
      item: null
    };
  },
  props: {
    // 输入框占位文本
    placeholder: {
      type: String,
      default: "请选择"
    },

    reserveKeyword: {
      type: Boolean,
      default: true
    }
  },
  // 使用计算属性用于回显问题
  computed: {
    value: {
      get() {
        return this.$attrs.option || "";
      },
      set() {}
    },
    options() {
      return this.$attrs.optionList;
    },
    // 输入框尺寸，只在 type!="textarea" 时有效 medium / small / mini 默认值最大
    size() {
      return ["medium", "small", "mini"].indexOf(this.$attrs.size) > -1
        ? this.$attrs.size
        : "medium";
    },
    loading() {
      return !!this.$attrs.loading;
    }
  },
  methods: {
    debounce,
    remoteMethod(val) {
      this.remote && this.$emit("remoteMethod", val);
    },
    change(val) {
      // 存放当前选中对象
      this.item = this.options.find(item => val === item.label);
      // :option.sync="xxx"
      this.$emit("update:option", val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
