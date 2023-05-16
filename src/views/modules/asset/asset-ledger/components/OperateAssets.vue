<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :size="550"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item
        :label="index ? '' : 'IpMac对'"
        v-for="(item, index) in form.ipMacs"
        :key="index"
        prop="ipMacs"
      >
        <el-row>
          <el-col :span="12" style="padding-right: 5px">
            <el-form-item
              style="margin-bottom: 0"
              :prop="'ipMacs.' + index + '.ip'"
              :rules="rules.ip"
            >
              <el-input
                v-model="item.ip"
                placeholder="IP地址"
                size="medium"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 5px">
            <el-form-item
              style="margin-bottom: 0"
              :prop="'ipMacs.' + index + '.mac'"
              :rules="rules.mac"
            >
              <el-input
                v-model="item.mac"
                placeholder="Mac地址"
                size="medium"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input
          v-model="form.productName"
          placeholder="请输入产品名称"
          size="medium"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备类型" prop="deviceTypeId">
        <el-select
          v-model="form.deviceTypeId"
          placeholder="请选择设备类型"
          style="width: 100%"
          @change="change"
          size="medium"
          filterable
        >
          <el-option-group
            v-for="group in deviceTypeOptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="产品厂商" prop="vendorId">
        <div class="flex-center">
          <new-select
            style="width: 100%"
            :option.sync="form.vendorId"
            :optionList="vendorOptions"
            placeholder="请选择产品厂商"
            @change="change"
            filterable
          ></new-select>
          <i class="el-icon-circle-plus" @click="addVendor"></i>
        </div>
      </el-form-item>
      <el-form-item label="产品型号" prop="modelId">
        <div class="flex-center">
          <new-select
            style="width: 100%"
            :option.sync="form.modelId"
            :optionList="modelOptions"
            placeholder="请选择产品型号"
            :disabled="!form.deviceTypeId || !form.vendorId"
            filterable
          ></new-select>
          <i
            class="el-icon-circle-plus"
            @click="addModel"
            v-show="form.deviceTypeId && form.vendorId"
          ></i>
        </div>
      </el-form-item>
      <el-form-item label="产品版本" prop="version">
        <el-input
          v-model="form.version"
          placeholder="产品版本"
          size="medium"
        ></el-input>
      </el-form-item>
    </el-form>
    <add-vendor ref="add-vendor" @update="update" />
    <add-model ref="add-model" @update="update" />
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { getIpMacs, updateAssetmanage } from "@/api/asset/asset-ledger";
import { required, validateFn } from "@/utils/validate-helper";
import { reg_ip, reg_mac } from "@/utils/regex";
import { operateAssetsMixins } from "../mixins/js/operate-assets-mixin";
import AddVendor from "./AddVendor.vue";
import AddModel from "./AddModel.vue";

export default {
  components: { AddVendor, AddModel },
  mixins: [operateAssetsMixins],
  data() {
    return {
      form: {
        assetId: "",
        ipMacs: [{}],
        productName: "",
        deviceTypeId: "",
        vendorId: "",
        modelId: "",
        version: ""
      },
      rules: {
        ipMacs: [required("IpMac对")],
        ip: [validateFn("IP地址", reg_ip, { required: true })],
        mac: [validateFn("Mac地址", reg_mac, { required: false })],
        productName: [required("产品名称")],
        deviceTypeId: [required("设备类型")],
        vendorId: [required("产品厂商")],
        modelId: [required("产品型号")],
        version: [required("产品版本")]
      }
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    show({ title, assetId }) {
      this.$refs["drawer"].show(title);
      this.$nextTick(() => {
        assetId && this.getAssetsInfo((this.form.assetId = assetId));
      });
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateAssets().then(res => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                drawer.close();
                this.$emit("update");
              } else drawer.closeLoading();
            });
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
          this.form.ipMacs = [{}];
        }
      };
      operate[action] && operate[action]();
    }),
    getAssetsInfo() {
      getIpMacs(this.form.assetId).then(res => {
        const { success, data } = res.data;
        if (success) {
          this.form.ipMacs = data?.ipMacs || [];
          this.form.productName = data?.device?.name || "";
          this.form.deviceTypeId = data?.device?.typeId || "";
          this.form.vendorId = data?.device?.vendorId || "";
          this.form.modelId = data?.device?.modelId || "";
          this.form.version = data?.device?.version || "";
          this.getModels();
        }
      });
    },
    operateAssets() {
      return updateAssetmanage(this.form);
    },
    addVendor() {
      this.$refs["add-vendor"] &&
        this.$refs["add-vendor"].show({ title: "新增产品厂商" });
    },
    addModel() {
      this.$refs["add-model"] &&
        this.$refs["add-model"].show({
          title: "新增产品型号",
          data: {
            typeId: this.form.deviceTypeId,
            vendorId: this.form.vendorId
          }
        });
    },
    update(ref) {
      console.log(ref);
      if (ref === "add-vendor") {
        this.getVendors();
      } else if (ref === "add-model") {
        this.getModels();
      }
    },
    change() {
      this.form.modelId = "";
      this.getModels();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/constant.scss";
.flex-center {
  i {
    cursor: pointer;
    margin-left: 5px;
    font-size: 15px;
    color: $themeColor;
  }
}
</style>
