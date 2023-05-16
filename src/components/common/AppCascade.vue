<template lang="html">
  <div class="block" :title="title">
    <el-cascader
      ref="cascader"
      v-model="selectedOptions"
      :options="options"
      @change="handleChange"
      style="width: 100%"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <span class="span-ellipsis" slot-scope="{ node }">
        <span :title="node.label">{{ node.label }} </span>
      </span>
    </el-cascader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      node: "", //返回当前选中节点
      title: ""
    };
  },
  props: {
    options: {
      type: Array
    }
  },
  computed: {
    selectedOptions: {
      get() {
        return this.$attrs.option || [];
      },
      set() {}
    }
  },
  watch: {
    selectedOptions() {
      if (this.filterable) {
        this.$refs.cascader.toggleDropDownVisible(false); //监听值发生变化就关闭它
      }
    }
  },
  mounted() {
    if (this.$attrs.title) {
      setTimeout(() => {
        if (
          this.$refs.cascader.getCheckedNodes(true) &&
          this.$refs.cascader.getCheckedNodes(true)[0]
        ) {
          this.title = this.$refs.cascader
            .getCheckedNodes(true)[0]
            .pathLabels.join("/"); //title
        } else {
          this.title = " ";
        }
      }, 1000);
    }
  },
  methods: {
    handleChange(value) {
      // 可搜索输入无法获取节点
      if (this.$refs.cascader.getCheckedNodes()[0]) {
        this.node = this.$refs.cascader.getCheckedNodes()[0].data;
      }
      this.$emit("update:option", value);
      this.$emit("change", value);
    }
  }
};
</script>

<style lang="css" scoped>
.span-ellipsis {
  /*width: 100%;*/
  max-width: 350px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*display: block;*/
}
</style>
