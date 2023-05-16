<template>
  <new-drawer ref="drawer" :sureButton="false" :size="600">
    <el-descriptions :column="2" :border="true" :labelStyle="{ width: '85px' }">
      <el-descriptions-item label="网卡名称">
        <new-tooltip :content="form['ethName']" />
      </el-descriptions-item>
      <el-descriptions-item label="连接状态">
        <span :class="getColor(form['status'])">{{ form["status"] }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="IP地址">
        <new-tooltip :content="form['ethIp']" />
      </el-descriptions-item>
      <el-descriptions-item label="子网掩码">
        <new-tooltip :content="form['ethMask']" />
      </el-descriptions-item>
      <el-descriptions-item label="网关地址">
        <new-tooltip :content="form['ethGateway']" />
      </el-descriptions-item>
      <el-descriptions-item label="MAC地址">
        <new-tooltip :content="form['ethMac']" />
      </el-descriptions-item>
      <el-descriptions-item label="DNS1">
        <new-tooltip :content="form['ethDns1']" />
      </el-descriptions-item>
      <el-descriptions-item label="DNS2">
        <new-tooltip :content="form['ethDns2']" />
      </el-descriptions-item>
      <el-descriptions-item label="网卡描述" :span="2">
        {{ form["ethDesc"] }}
      </el-descriptions-item>
    </el-descriptions>
  </new-drawer>
</template>

<script>
import { assignObject } from "@/utils/object";
export default {
  data() {
    return {
      form: {
        ethId: "",
        ethName: "",
        status: "",
        ethIp: "",
        ethMask: "",
        ethGateway: "",
        ethMac: "",
        ethDns1: "",
        ethDns2: "",
        ethDesc: ""
      }
    };
  },
  computed: {
    getColor() {
      return status => {
        return status === "已连接" ? "active" : "inactive";
      };
    }
  },
  methods: {
    show({ title, data }) {
      this.$refs["drawer"].show(title);
      this.$nextTick(() => {
        if (data) assignObject(this.form, data);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.el-descriptions-item__label) {
  width: 80px;
}
.active {
  color: #67c23a;
}
.inactive {
  color: #f56c6c;
}
</style>
