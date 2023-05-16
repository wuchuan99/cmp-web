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
      <el-form-item label="产品型号" prop="model">
        <el-input
          v-model="form.model"
          placeholder="请输入产品型号"
          size="medium"
        ></el-input>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { required } from "@/utils/validate-helper";
import { createDeviceModel } from "@/api/asset/asset-ledger";

export default {
  data() {
    return {
      form: {
        typeId: "",
        vendorId: "",
        model: ""
      },
      rules: {
        model: [required("产品型号")]
      }
    };
  },
  methods: {
    show({ title, data }) {
      this.form.typeId = data.typeId || "";
      this.form.vendorId = data.vendorId || "";
      this.$refs["drawer"].show(title);
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.addModel().then(res => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                drawer.close();
                this.$emit("update", "add-model");
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
    addModel() {
      return createDeviceModel(this.form);
    }
  }
};
</script>
<style scoped></style>
