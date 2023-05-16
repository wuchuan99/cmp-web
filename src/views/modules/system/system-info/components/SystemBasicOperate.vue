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
      <el-form-item label="产品名称" prop="productName">
        <el-input
          size="medium"
          v-model="form.productName"
          placeholder="请输入产品名称称"
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品LOGO" prop="productLogo">
        <el-upload
          ref="logo-upload"
          class="avatar-uploader"
          action="./"
          :http-request="httpRequest"
          accept=".png"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.productLogo" :src="form.productLogo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品ICO" prop="productIco">
        <el-upload
          ref="ico-upload"
          class="avatar-uploader"
          accept=".ico"
          action="./"
          :http-request="httpRequest2"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload2"
        >
          <img v-if="form.productIco" :src="form.productIco" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="版权" prop="productCopyRight">
        <el-input
          size="medium"
          v-model="form.productCopyRight"
          placeholder="请输入版权"
          maxlength="32"
        ></el-input>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>
<script>
import {
  updateSystemBasic,
  uploadLogo,
  uploadIco
} from "@/api/system/system-info";
import { debounce } from "@/utils/common";
import { required } from "@/utils/validate-helper";

export default {
  data() {
    return {
      form: {
        id: "",
        productName: "",
        productLogo: "",
        productIco: "",
        productCopyRight: "",
        theme: "",
        language: ""
      },
      rules: {
        productName: [required("产品名称")],
        productLogo: [required("产品LOGO")],
        productIco: [required("产品ICO")],
        productCopyRight: [required("版权")],
        theme: [required("主题")],
        language: [required("语言")]
      },
      themeMap: [],
      languageMap: []
    };
  },
  methods: {
    show(object) {
      this.form = { ...object };
      this.$refs["drawer"].show("编辑系统信息");
      this.$nextTick(() => {});
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateSystemInfo(drawer);
          });
        },
        close: () => {
          this.taskType = "USER";
          this.$refs["form"].resetFields();
        }
      };
      operate[action] && operate[action]();
    }, 200),
    operateSystemInfo(drawer) {
      const params = {
        id: this.form.id,
        productCopyright: this.form.productCopyRight,
        productName: this.form.productName
      };
      updateSystemBasic(params)
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            drawer.close();
            this.$emit("update", {
              ref: "basicOperate",
              method: "getSystemBasicInfo"
            });
          } else this.$message.error(res.data.errMessage);
        })
        .finally(() => {
          drawer.closeLoading();
        });
    },
    httpRequest({ file }) {
      console.log(file);
      const formData = new FormData();
      formData.append("logo", file);
      uploadLogo(formData).then(res => {
        const { success, errMessage } = res.data;
        if (success) {
          this.form.productLogo = URL.createObjectURL(file);
          this.$refs.form.validateField("productLogo");
        } else {
          this.$message.error(errMessage);
        }
      });
    },
    httpRequest2({ file }) {
      console.log(file);
      const formData = new FormData();
      formData.append("ico", file);
      uploadIco(formData).then(res => {
        const { success, errMessage } = res.data;
        if (success) {
          this.form.productIco = URL.createObjectURL(file);
          this.$refs.form.validateField("productIco");
        } else {
          this.$message.error(errMessage);
        }
      });
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG) {
        this.$message.error("产品LOGO只能是 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("产品LOGO大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
    },
    beforeAvatarUpload2(file) {
      const isICO = file.type === "image/x-icon";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isICO) {
        this.$message.error("产品ICO只能是 ICO 格式!");
      }
      if (!isLt2M) {
        this.$message.error("产品ICO大小不能超过 2MB!");
      }
      return isICO && isLt2M;
    }
  },
  created() {
    this.themeMap = [
      { label: "deepBlue", value: "深蓝色" },
      { label: "dark", value: "黑白色" }
    ];
    this.languageMap = [
      { label: "zh", value: "中文" },
      { label: "en", value: "英文" }
    ];
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  :deep(.el-upload) {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
    }
  }
}
.avatar {
  width: 36px;
  height: 36px;
  display: block;
  margin-right: 10px;
}
</style>
