<template>
  <new-drawer
    ref="drawer"
    @sure="handle({ action: 'sure' })"
    @close="handle({ action: 'close' })"
    :size="500"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="上传文件" prop="file">
        <el-upload
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept=".lic"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-change="onChange"
        >
          <new-button
            :type="btnType"
            :disabled="btnType === 'loading'"
            class="upload-btn"
            >点击上传</new-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="文件名称" prop="name">
        <el-input v-model="form.name" type="text" disabled />
      </el-form-item>
    </el-form>
  </new-drawer>
</template>

<script>
import { required } from "@/utils/validate-helper";
import { debounce } from "@/utils/common";
import { upLoadSystemUpgrade } from "@/api/system/system-info";
export default {
  data() {
    return {
      form: {
        id: "",
        file: null,
        name: ""
      },
      rules: {
        file: [required("文件")],
        name: [required("文件名称")]
      },
      btnType: "upload"
    };
  },
  methods: {
    show(id) {
      this.form.id = id;
      this.$refs["drawer"].show("升级包文件上传");
      this.$nextTick(() => {});
    },
    handle: debounce(function({ action }) {
      this[action] && this[action]();
    }),
    sure() {
      this.$refs["form"].validate(valid => {
        if (!valid) return;
        const drawer = this.$refs["drawer"];
        drawer.loading();
        this.operateSystemLicense()
          .then(() => {
            drawer.close();
            this.$emit("update", {
              ref: "upgradeOperate",
              method: "getSystemUpgradeInfo"
            });
          })
          .finally(() => {
            drawer.closeLoading();
          });
      });
    },
    close() {
      this.$refs["form"].resetFields();
    },
    operateSystemLicense() {
      const formData = new FormData();
      formData.append("productId", this.form.id);
      formData.append("updateFile", this.form.file);
      return upLoadSystemUpgrade(formData).then(() => {});
    },
    beforeUpload(file) {
      console.log(file);
      const { name } = file;
      const isLicense = name.endsWith(".lic");
      if (!isLicense) {
        this.$message.error("只能上传License的文件");
      }
      return isLicense;
    },
    onChange(file) {
      console.log(file);
      this.btnType = "loading";
      if (file.status === "success") {
        this.btnType = "upload";
        this.form.file = file.raw;
        this.form.name = file.name;
        this.$refs["form"].validate();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.upload {
  height: 32px;
}
.upload-btn {
  height: 32px;
}
</style>
