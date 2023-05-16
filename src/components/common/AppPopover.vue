<template>
  <el-popconfirm
    confirmButtonText="好的"
    cancelButtonText="不用了"
    icon="el-icon-info"
    iconColor="red"
    title="这是一段内容确定删除吗？"
  >
    <el-button slot="reference">删除</el-button>
  </el-popconfirm>
</template>
<script>
export default {
  computed: {
    content() {
      return this.$attrs.content || "";
    }
  }
};
</script>
