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
      <el-form-item label="初始密码" prop="initPassword">
        <el-input
          type="text"
          size="medium"
          v-model="form.initPassword"
          placeholder="请输入密码"
          maxlength="32"
          class="no-autofill-pwd"
        ></el-input>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { setInitialPassWord } from "@/api/user";
import { validateFn } from "@/utils/validate-helper";
// 密码
const reg_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#@!~%^&*])[0-9a-zA-Z\\d#@!~%^&*]{8,16}$/;
export default {
  data() {
    return {
      form: {
        initPassword: ""
      },
      rules: {
        initPassword: [
          validateFn("初始密码", reg_password, {
            required: true,
            checkFailMessage: "密码格式不正确"
          })
        ]
      }
    };
  },
  methods: {
    show() {
      this.$refs["drawer"].show("设置初始密码");
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateInitialPassword()
              .then(() => {
                drawer.close();
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
    }),
    operateInitialPassword() {
      return setInitialPassWord(this.form).then(res => {
        const { success, message, errMessage } = res.data;
        if (success) {
          this.$message.success(message);
        } else {
          this.$message.error(errMessage);
        }
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
