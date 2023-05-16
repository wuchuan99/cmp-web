<template>
  <new-drawer
    @close="$emit('close')"
    ref="drawer"
    :size="750"
    :sureButton="false"
    :custom-class="theme"
  >
    <operations-table />
    <connect-table />
    <field-type-table />
    <field-classify-table />
    <time-format-table />
    <example-table />
  </new-drawer>
</template>

<script>
import OperationsTable from "./components/OperationsTable.vue";
import ConnectTable from "./components/ConnectTable.vue";
import FieldTypeTable from "./components/FieldTypeTable.vue";
import FieldClassifyTable from "./components/FieldClassifyTable.vue";
import TimeFormatTable from "./components/TimeFormatTable.vue";
import ExampleTable from "./components/ExampleTable.vue";
export default {
  components: {
    OperationsTable,
    ConnectTable,
    FieldTypeTable,
    FieldClassifyTable,
    TimeFormatTable,
    ExampleTable
  },
  props: {
    theme: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    show() {
      this.$refs["drawer"].show("搜索语法");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
@import "./mixins/style/index.scss";
</style>
