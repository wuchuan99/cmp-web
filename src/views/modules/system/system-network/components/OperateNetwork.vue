<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :size="500"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="网卡名称">
        <el-input
          size="medium"
          v-model="form.ethName"
          disabled
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="连接状态">
        <el-input
          size="medium"
          v-model="form.status"
          disabled
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="IP地址" prop="ethIp">
        <el-input
          size="medium"
          v-model="form.ethIp"
          placeholder="请输入网卡IP"
        ></el-input>
      </el-form-item>
      <el-form-item label="子网掩码" prop="ethMask">
        <el-input
          size="medium"
          v-model="form.ethMask"
          placeholder="请输入子网掩码"
        ></el-input>
      </el-form-item>
      <el-form-item label="网关地址" prop="ethGateway">
        <el-input
          size="medium"
          v-model="form.ethGateway"
          placeholder="请输入网关地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="MAC地址">
        <el-input v-model="form.ethMac" type="text" disabled />
      </el-form-item>
      <el-form-item label="DNS1" prop="ethDns1">
        <el-input
          size="medium"
          v-model="form.ethDns1"
          placeholder="请输入DNS"
        ></el-input>
      </el-form-item>
      <el-form-item label="DNS2" prop="ethDns2">
        <el-input
          size="medium"
          v-model="form.ethDns2"
          placeholder="请输入DNS"
        ></el-input>
      </el-form-item>
      <el-form-item label="网卡描述" prop="ethDesc">
        <el-input
          v-model="form.ethDesc"
          type="textarea"
          :rows="4"
          placeholder="请输入网卡描述"
          resize="none"
        ></el-input>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { validateFn } from "@/utils/validate-helper";
import { reg_ip, reg_ip_mask, reg_mac } from "@/utils/regex";
import { assignObject } from "@/utils/object";
import { updateEth } from "@/api/system/syslog-network";
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
      },
      rules: {
        ethIp: [validateFn("网卡IP", reg_ip, { required: true })],
        ethMask: [validateFn("子网掩码", reg_ip_mask, { required: true })],
        ethGateway: [validateFn("网关地址", reg_ip)],
        ethMac: [validateFn("网关地址", reg_mac)],
        ethDns1: [validateFn("DNS1", reg_ip)],
        ethDns2: [validateFn("DNS2", reg_ip)]
      },
      operationInfo: {
        type: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    show({ title, type, data }) {
      this.$refs["drawer"].show(title);
      this.operationInfo.type = type;
      this.$nextTick(() => {
        if (data) assignObject(this.form, data);
      });
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateNetwork(drawer);
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
        }
      };
      operate[action] && operate[action]();
    }, 200),
    operateNetwork(drawer) {
      console.log(this.form);
      updateEth(this.form)
        .then(res => {
          const { success } = res.data;
          if (success) {
            drawer.close();
            this.$emit("update", this.operationInfo);
          }
        })
        .finally(() => {
          drawer.closeLoading();
        });
    }
  }
};
</script>
<style scoped></style>
