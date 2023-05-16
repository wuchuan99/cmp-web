<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :size="500"
    :custom-class="theme"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="账户名" prop="userName">
        <el-input
          type="text"
          size="medium"
          v-model="form.userName"
          disabled
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="permission">
        <el-input
          type="text"
          size="medium"
          v-model="form.permission"
          disabled
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          type="text"
          size="medium"
          v-model="form.oldPassword"
          placeholder="请输入旧密码"
          maxlength="32"
          class="no-autofill-pwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="text"
          size="medium"
          v-model="form.newPassword"
          placeholder="请输入新密码"
          maxlength="32"
          class="no-autofill-pwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword" required>
        <el-input
          type="text"
          size="medium"
          v-model="form.confirmPassword"
          placeholder="请确认新密码"
          maxlength="32"
          class="no-autofill-pwd"
        ></el-input>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { required } from "@/utils/validate-helper";
import { assignObject } from "@/utils/object";
import { userInfoMaintaining } from "@/api/user";
export default {
  data() {
    const _this = this;
    const confirmPassword = (rule, value, cb) => {
      if (value) {
        if (_this.form.confirmPassword === _this.form.newPassword) {
          cb();
        } else {
          cb(new Error(`密码和新密码不一致`));
        }
      } else {
        cb(new Error(`密码不能为空`));
      }
    };
    return {
      form: {
        userName: "",
        permission: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [required("旧密码")],
        newPassword: [required("新密码")],
        confirmPassword: [
          {
            trigger: ["blur", "change"],
            validator: confirmPassword
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  computed: {
    theme() {
      let customClass = "default";
      if (["homePage", "searchHome"].includes(this.$route.name)) {
        customClass = "dark-blue";
      }
      return customClass;
    }
  },
  watch: {
    "form.newPassword": function(newPassword) {
      if (!this.form.confirmPassword) return;
      if (newPassword === this.form.confirmPassword) {
        this.$refs.form.clearValidate(["confirmPassword"]);
      } else {
        this.$refs.form.validateField(["confirmPassword"]);
      }
    }
  },
  methods: {
    show() {
      this.$refs["drawer"].show("个人信息维护");
      this.getUserInfo();
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateUserInfo()
              .then(() => {
                drawer.close();
                this.$message.success("*重置密码成功*");
              })
              .finally(() => {
                drawer.closeLoading();
              });
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
        }
      };
      operate[action] && operate[action]();
    }, 200),
    operateUserInfo() {
      const { oldPassword, newPassword } = this.form;
      return userInfoMaintaining({ userId: 1, oldPassword, newPassword });
    },
    getUserInfo() {
      return Promise.resolve({
        userName: "admin",
        permission: "超级管理员"
      }).then(res => {
        assignObject(this.form, res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.no-autofill-pwd) {
  .el-input__inner {
    -webkit-text-security: disc !important;
  }
}
</style>
