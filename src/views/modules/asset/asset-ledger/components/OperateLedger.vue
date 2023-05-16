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
      <el-form-item label="台账名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="台账名称"
          size="medium"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址模板">
        <operate-ledger-file-upload
          :ledgerId.sync="form.id"
          @updateobjectName="change('objectName', $event)"
          @uploadFileError="change('uploadFileError', $event)"
        ></operate-ledger-file-upload>
      </el-form-item>
      <el-form-item
        label="上传模板地址"
        prop="objectName"
        v-show="form.objectName"
      >
        <el-input
          :disabled="true"
          v-model="form.objectName"
          size="medium"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-for="(ip, index) in form.ipSegments"
        :prop="`ipSegments.${index}`"
        :label="index ? '' : 'IP地址范围'"
        :key="index"
        :rules="rules.ipRule"
      >
        <div class="flex-center">
          <el-input
            size="medium"
            v-limit:reg="/[^,.*-\/0-9]/g"
            v-model="form.ipSegments[index]"
            placeholder="请输入地址范围（127.0.0.1-127.0.0.10）"
          ></el-input>
          <span>
            <i
              v-if="index === 0"
              class="el-icon-circle-plus"
              @click="handle('addIpAddr')"
            ></i>
            <i
              v-else
              class="el-icon-delete-solid"
              @click="handle('removeIpAddr', index)"
            ></i>
          </span>
        </div>
      </el-form-item>
      <div></div>
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import {
  addAssetLedger,
  updateAssetLedger,
  getAssetLedgerDetail
} from "@/api/asset/asset-ledger";
import { required, trigger } from "@/utils/validate-helper";
import OperateLedgerFileUpload from "./OperateLedgerFileUpload.vue";
import { assignObject } from "@/utils/object";

export default {
  components: { OperateLedgerFileUpload },
  data() {
    const ipsRule = (rule, value, callback) => {
      if (!this.form.objectName && !this.form.ipSegments.find(ip => ip !== ""))
        callback(new Error("请输入地址范围或上传地址模板"));
      else callback();
    };
    return {
      form: {
        id: "",
        name: "",
        objectName: "",
        ipSegments: [""]
      },
      rules: {
        name: [required("台账名称")],
        objectName: [{ validator: ipsRule, ...trigger }],
        ipSegments: [{ validator: ipsRule, ...trigger }],
        ipRule: [{ validator: ipsRule, ...trigger }]
      }
    };
  },
  props: {
    ledgerId: String
  },
  methods: {
    show({ title, id }) {
      this.$refs["drawer"].show(title);
      this.$nextTick(() => {
        this.form.id = id;
        id && this.getAssetLedgerInfo(id);
      });
    },
    handle: debounce(function(action, value) {
      const operate = {
        download: this.downloadFile,
        addIpAddr: () => {
          this.form.ipSegments.push("");
        },
        removeIpAddr: () => {
          this.form.ipSegments.length > 1 &&
            this.form.ipSegments.splice(value, 1);
        },
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateLedger(
              drawer,
              this.form.id ? updateAssetLedger : addAssetLedger
            );
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
          this.form.ipSegments = [""];
        }
      };
      operate[action] && operate[action]();
    }, 200),
    change(action, value) {
      const operate = {
        objectName: () => {
          // 导入ip返回url
          // this.form.objectName = value["objectName"];
          assignObject(this.form, value);
        },
        uploadFileError: () => {
          this.$refs["objectName"].validate();
        }
      };
      operate[action] && operate[action]();
    },
    // 新增或编辑
    operateLedger(drawer, method) {
      method(this.form)
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            drawer.close();
            this.$emit("update", { ledgerId: res.data.data });
          } else drawer.closeLoading();
        })
        .catch(() => {
          drawer.closeLoading();
        });
    },
    // 获取详情
    getAssetLedgerInfo(id) {
      getAssetLedgerDetail(id).then(res => {
        const { success, data } = res.data;
        if (success) assignObject(this.form, data);
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "~@/style/constant.scss";
.flex-center {
  span {
    margin-left: 5px;
    font-size: 15px;
  }
  i {
    cursor: pointer;
    color: $themeColor;
  }
}
</style>
