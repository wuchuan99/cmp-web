<template>
  <new-drawer ref="drawer" :size="500" :sureButton="false">
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-descriptions
        class="margin-top"
        :column="2"
        size="medium"
        :border="true"
        :labelStyle="{ width: '85px' }"
      >
        <el-descriptions-item label="网卡名称">
          {{ form["ethName"] }}
        </el-descriptions-item>
        <el-descriptions-item label="网卡IP">
          {{ form["ethIp"] }}
        </el-descriptions-item>
        <el-descriptions-item label="MAC地址">
          {{ form["ethMac"] }}
        </el-descriptions-item>
        <el-descriptions-item label="子网掩码">
          {{ form["ethMask"] }}
        </el-descriptions-item>
        <el-descriptions-item label="连接状态">
          <span :class="statusClass">{{
            form.status ? "已连接" : "未连接"
          }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="网关地址">
          {{ form["ethGateway"] }}
        </el-descriptions-item>
        <el-descriptions-item label="DNS1">
          {{ form["ethDns1"] }}
        </el-descriptions-item>
        <el-descriptions-item label="DNS2">
          {{ form["ethDns2"] }}
        </el-descriptions-item>
        <el-descriptions-item label="网卡描述">
          {{ form["ethDesc"] }}
        </el-descriptions-item>
      </el-descriptions>
    </el-form>
  </new-drawer>
</template>
<script>
import { assignObject } from "@/utils/object";
export default {
  data() {
    return {
      form: {
        ethDns1: "",
        ethDns2: "",
        ethGateway: "",
        ethId: 0,
        ethIp: "",
        ethMac: "",
        ethMask: "",
        ethName: "",
        nodeId: 0,
        status: 0,
        ethDesc: ""
      },
      rules: {}
    };
  },
  computed: {
    statusClass() {
      return this.form.status ? "active" : "inactive";
    },
    postObj() {
      const obj = Object.assign({}, this.form);
      delete obj["status"];
      return obj;
    }
  },
  methods: {
    show(object) {
      this.$refs["drawer"].show("查看扫描节点网卡信息");
      this.$nextTick(() => {
        assignObject(this.form, object);
        // this.form["nodeId"] = object["systemNodeId"];
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.active {
  color: #67c23a;
}
.inactive {
  color: #f56c6c;
}
</style>
