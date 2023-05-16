<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :size="450"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="IP地址" prop="ip">
        <el-input
          size="medium"
          v-model="form.ip"
          placeholder="请输入IP地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="MAC地址" prop="mac">
        <el-input
          size="medium"
          v-model="form.mac"
          placeholder="请输入MAC地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="facilityName">
        <el-input
          size="medium"
          v-model="form.facilityName"
          placeholder="请输入设备名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备类型" prop="facilityType">
        <new-select
          size="medium"
          :option.sync="form.facilityType"
          :optionList="facilityTypeList"
          placeholder="请选择设备类型"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="设备厂商" prop="facilityVendor">
        <new-select
          size="medium"
          :option.sync="form.facilityVendor"
          :optionList="facilityVendorList"
          placeholder="请选择设备厂商"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="设备型号" prop="facilityModel">
        <new-select
          size="medium"
          :option.sync="form.facilityModel"
          :optionList="facilityModelList"
          placeholder="请选择设备型号"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="设备版本" prop="facilityVersion">
        <el-input
          size="medium"
          v-model="form.facilityVersion"
          placeholder="请输入设备版本"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作系统" prop="operatSystem">
        <el-input
          size="medium"
          v-model="form.operatSystem"
          placeholder="请输入操作系统"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作系统版本" prop="operatSystemVersion">
        <el-input
          size="medium"
          v-model="form.operatSystemVersion"
          placeholder="请输入操作系统版本"
        ></el-input>
      </el-form-item>
      <el-form-item label="固件" prop="firmware">
        <el-input
          size="medium"
          v-model="form.firmware"
          placeholder="请输入固件"
        ></el-input>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { required } from "@/utils/validate-helper";
import { resetObj, deepClone } from "@/utils/object";
export default {
  data() {
    return {
      form: {
        ip: "",
        mac: "",
        facilityName: "",
        facilityType: "",
        facilityVendor: "",
        facilityModel: "",
        facilityVersion: "",
        operatSystem: "",
        operatSystemVersion: "",
        firmware: ""
      },
      rules: {
        ip: [required("IP地址")],
        mac: [required("MAC地址")],
        facilityName: [required("设备名称")],
        facilityType: [required("设备类型")],
        facilityVendor: [required("设备厂商")],
        facilityModel: [required("设备型号")],
        facilityVersion: [required("设备版本")],
        operatSystem: [required("操作系统")],
        operatSystemVersion: [required("操作系统版本")],
        firmware: [required("固件")]
      },
      facilityTypeList: [{ label: 1, value: "类型一" }],
      facilityVendorList: [{ label: 1, value: "厂商一" }],
      facilityModelList: [{ label: 1, value: "型号一" }],
      operateInfo: {
        ref: "",
        type: "",
        id: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    show({ ref }) {
      this.operateInfo.ref = ref;
      this.$refs["drawer"].show("导入资产");
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operate(drawer).then(() => {
              drawer.close();
              drawer.closeLoading();
              this.$emit("update", deepClone(this.operateInfo));
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
    operate() {
      console.log(this.form);
      return Promise.resolve();
    }
  }
};
</script>
<style scoped></style>
