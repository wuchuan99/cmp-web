<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :size="550"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="设备厂商中文名称" prop="nameCn">
        <el-input
          v-model="form.nameCn"
          placeholder="请输入设备厂商中文名称"
          size="medium"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备厂商英文名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入设备厂商英文名称"
          size="medium"
        ></el-input>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { required } from "@/utils/validate-helper";
import { createDeviceVendor } from "@/api/asset/asset-ledger";
export default {
  data() {
    return {
      form: {
        nameCn: "",
        name: ""
      },
      rules: {
        nameCn: [required("设备厂商中文名称")],
        name: [required("设备厂商英文名称")]
      }
    };
  },
  methods: {
    show({ title }) {
      this.$refs["drawer"].show(title);
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.addVendor().then(res => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                drawer.close();
                this.$emit("update", "add-vendor");
              } else drawer.closeLoading();
            });
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
        }
      };
      operate[action] && operate[action]();
    }),
    addVendor() {
      return createDeviceVendor(this.form);
    }
  }
};
</script>
<style scoped></style>
