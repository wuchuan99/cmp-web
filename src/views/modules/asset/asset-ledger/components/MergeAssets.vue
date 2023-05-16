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
      <el-form-item label="主资产" prop="assetMainId">
        <new-select
          size="medium"
          :option.sync="form.assetMainId"
          :optionList="ipList"
          style="width: 100%"
        />
      </el-form-item>
    </el-form>
  </new-drawer>
</template>
<script>
import { debounce } from "@/utils/common";
import { required } from "@/utils/validate-helper";
import { mergeAssets } from "@/api/asset/asset-ledger";
export default {
  data() {
    return {
      form: {
        assetMainId: ""
      },
      rules: {
        assetMainId: [required("主资产")]
      },
      ipList: []
    };
  },
  computed: {
    postObj() {
      return {
        ...this.form,
        assetIds: this.ipList
          .filter(ip => ip.label !== this.form.assetMainId)
          .map(ip => ip.label)
      };
    }
  },
  methods: {
    show({ ipList }) {
      if (ipList.length < 2) {
        this.$message.error("至少选择两个资产进行合并");
        return;
      }
      this.$refs["drawer"].show("合并资产");
      this.$nextTick(() => {
        this.ipList = ipList.map(({ assetId, ip }) => {
          return {
            label: assetId,
            value: ip
          };
        });
      });
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateAsset(drawer);
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
        }
      };
      operate[action] && operate[action]();
    }, 200),
    operateAsset(drawer) {
      mergeAssets(this.postObj)
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            drawer.close();
            this.$emit("update");
          } else this.$message.error(res.data.errMessage);
          drawer.closeLoading();
        })
        .catch(() => {
          drawer.closeLoading();
        });
    }
  }
};
</script>
<style scoped></style>
