<!-- 搜索公用输入 -->
<template>
  <div>
    <el-input
      placeholder="请输入内容"
      v-model="input3"
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      input3: "",
      select: ""
    };
  },
  computed: {
    ...mapGetters("login", {
      userInfo: "userInfo"
    })
  },
  mounted() {}
};
</script>
