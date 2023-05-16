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
      <el-form-item label="用户名称" prop="userName">
        <el-input
          size="medium"
          v-model="form.userName"
          placeholder="请输入用户名"
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <new-select
          style="width: 100%"
          :option.sync="form.role"
          :optionList="roleTypeList"
        ></new-select>
      </el-form-item>
      <el-form-item label="单位" prop="workplace">
        <el-input
          size="medium"
          v-model="form.workplace"
          placeholder="请输入单位"
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phoneNumber">
        <el-input
          size="medium"
          v-model="form.phoneNumber"
          placeholder="请输入联系方式"
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="emailAddress">
        <el-input
          size="medium"
          v-model="form.emailAddress"
          placeholder="请输入邮箱"
          maxlength="32"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="地址范围" prop="address">
        <new-cascade
          placeholder="请选择地址范围"
          :filterable="true"
          :options="options"
          :option.sync="form.address"
          :props="props"
          collapse-tags
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="text"
          size="medium"
          v-model="form.password"
          placeholder="请输入密码"
          maxlength="32"
          class="no-autofill-pwd"
        ></el-input>
      </el-form-item> -->
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { required, validateFn } from "@/utils/validate-helper";
import { reg_phone, reg_mail } from "@/utils/regex";
import { deepClone, resetObj, assignObject } from "@/utils/object";
import { getDetail, createUser, editUser } from "@/api/user";

// 用户
const reg_username = /^([\w]|[-_]|[.]|[\u4E00-\u9FA5])*$/;
// 密码
// const reg_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#@!~%^&*])[0-9a-zA-Z\\d#@!~%^&*]{8,16}$/;

export default {
  data() {
    return {
      form: {
        userName: "",
        role: "",
        workplace: "",
        phoneNumber: "",
        emailAddress: ""
        // address: [],
        // password: ""
      },
      rules: {
        userName: [validateFn("用户名称", reg_username, { required: true })],
        role: [required("角色")],
        workplace: [required("单位")],
        phoneNumber: [validateFn("联系方式", reg_phone)],
        emailAddress: [validateFn("邮箱", reg_mail)]
        // address: [required("地址范围")],
        // password: [validateFn("密码", reg_password, { msg: "密码格式不正确" })]
      },
      roleTypeList: [
        { label: "sysadmin", value: "超级管理员" },
        { label: "admin", value: "系统操作员" },
        { label: "audit", value: "系统审计员" }
      ],
      options: [],
      props: {
        multiple: true
      },
      operateInfo: {
        type: "",
        userId: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    show({ type, row }) {
      if (!type) return;
      this.operateInfo.type = type;
      // eslint-disable-next-line no-undef
      this.operateInfo.userId = row?.userId || "";
      console.log(this.operateInfo.userId);
      this.$refs["drawer"].show(type === "edit" ? "编辑用户" : "新增用户");
      // this.getRegionTree();
      if (type === "edit") this.getUserDetail(row.userId);
    },
    // getRegionTree() {
    //   getTree().then(res => {
    //     this.options = res.data.data || [];
    //   });
    // },
    getUserDetail(userId) {
      getDetail(userId).then(res => {
        // res.data.data.role = res.data.data.roleName;
        assignObject(this.form, res.data.data);
      });
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateUser()
              .then(() => {
                drawer.close();
                this.$emit("update", deepClone(this.operateInfo));
                this.$message.success("*操作成功*");
              })
              .finally(() => {
                drawer.closeLoading();
              });
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
          this.$nextTick(() => {
            resetObj(this.operateInfo);
          });
        }
      };
      operate[action] && operate[action]();
    }, 200),
    operateUser() {
      if (!this.operateInfo.type) return Promise.reject("没有操作type");
      return this.operateInfo.type === "add" ? this.create() : this.update();
    },
    create() {
      return createUser(this.form);
    },
    update() {
      if (!this.operateInfo.userId) return Promise.reject("没有userId");
      return editUser({ userId: this.operateInfo.userId, ...this.form });
    }
  }
};
</script>
<style lang="scss" scoped>
// :deep(.no-autofill-pwd) {
//   .el-input__inner {
//     -webkit-text-security: disc !important;
//   }
// }
</style>
