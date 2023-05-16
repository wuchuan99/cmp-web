<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :size="700"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <new-card class="new-card" title="规则信息">
        <el-form-item label="规则名称" prop="rulesName">
          <el-input
            size="medium"
            v-model="form.rulesName"
            placeholder="请输入规则名称"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="规则描述" prop="rulesDesc">
          <el-input
            type="textarea"
            size="medium"
            v-model="form.rulesDesc"
            placeholder="请输入规则描述"
            :rows="4"
            resize="none"
          ></el-input>
        </el-form-item>
        <el-form-item label="标记方法" prop="tagType">
          <new-select
            style="width: 100%;margin-bottom: 10px"
            :option.sync="form.tagType"
            :optionList="tagList"
            @change="tagTypeChange"
          />
          <el-input
            size="medium"
            v-model="form.tagContent"
            placeholder="请输入语法"
            v-if="form.tagType === 1"
          ></el-input>
          <select-list
            v-model="form.tagContent"
            v-else-if="form.tagType === 2"
          />
        </el-form-item>
      </new-card>
      <new-card class="new-card" title="产品信息">
        <el-form-item label="产品分类" prop="productClassify">
          <new-select
            style="width: 100%"
            :option.sync="form.productClassify"
            :optionList="productClassifyList"
          />
        </el-form-item>
        <el-form-item label="产品层级" prop="productHierarchy">
          <new-select
            style="width: 100%"
            :option.sync="form.productHierarchy"
            :optionList="productHierarchyList"
          />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input
            size="medium"
            v-model="form.productName"
            placeholder="请输入产品名称"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品版本" prop="productVersion">
          <el-input
            size="medium"
            v-model="form.productVersion"
            placeholder="请输入产品版本"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品描述" prop="productDesc">
          <el-input
            type="textarea"
            size="medium"
            v-model="form.productDesc"
            placeholder="请输入产品描述"
            :rows="4"
            resize="none"
          ></el-input>
        </el-form-item>
      </new-card>
      <new-card class="new-card" title="厂商信息">
        <el-form-item label="厂商名称" prop="vendorName">
          <el-input
            size="medium"
            v-model="form.vendorName"
            placeholder="请输入厂商名称"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="厂商描述" prop="vendorDesc">
          <el-input
            type="textarea"
            size="medium"
            v-model="form.vendorDesc"
            placeholder="请输入厂商描述"
            :rows="4"
            resize="none"
          ></el-input>
        </el-form-item>
      </new-card>
    </el-form>
  </new-drawer>
</template>

<script>
import { debounce, guid } from "@/utils/common";
import {
  assignObject,
  deepClone,
  resetObj,
  mapToSelectionOptions
} from "@/utils/object";
import { required } from "@/utils/validate-helper";
import { tagTypes, productHierarchys } from "@/const/rules";
import SelectList from "./SelectList.vue";
import { elelemtOptions } from "../mixins/js/selectList";
export default {
  components: { SelectList },
  data() {
    return {
      form: {
        rulesName: "",
        rulesDesc: "",
        tagType: "",
        productClassify: "",
        productHierarchy: "",
        productName: "",
        productVersion: "",
        productDesc: "",
        vendorName: "",
        vendorDesc: "",
        tagContent: ""
      },
      rules: {
        rulesName: required("规则名称"),
        rulesDesc: required("规则描述"),
        tagType: required("标记方法"),
        productClassify: required("产品分类"),
        productVersion: required("产品版本"),
        productHierarchy: required("产品层级"),
        productName: required("产品名称"),
        productDesc: required("产品描述"),
        vendorName: required("厂商名称"),
        vendorDesc: required("厂商描述")
      },
      tagList: mapToSelectionOptions(tagTypes),
      productClassifyList: [
        {
          label: 1,
          value: "分类一"
        },
        {
          label: 2,
          value: "分类二"
        }
      ],
      productHierarchyList: mapToSelectionOptions(productHierarchys),
      operateInfo: {
        type: "",
        id: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    show({ type, row }) {
      if (!type) return;
      this.operateInfo.type = type;
      this.operateInfo.id = row?.id || "";
      this.$refs["drawer"].show(type === "edit" ? "编辑规则" : "新增规则");
      if (type === "edit") this.getDetail(row);
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operate()
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
          this.form.tagContent = "";
          this.$refs["form"].resetFields();
          this.$nextTick(() => {
            resetObj(this.operateInfo);
          });
        }
      };
      operate[action] && operate[action]();
    }, 200),
    getDetail(row) {
      console.log(row);
      Promise.resolve().then(() => {
        const tagContent = [
          {
            id: guid(),
            operator: "",
            type: 1,
            content: "xxx"
          },
          {
            id: guid(),
            operator: 1,
            type: 2,
            content: "xxx"
          },
          {
            id: guid(),
            operator: 1,
            type: 6,
            content: ["2022-10-05", "2022-11-02"]
          },
          {
            id: guid(),
            operator: 2,
            type: 8,
            content: 1
          },
          {
            id: guid(),
            operator: 2,
            type: 10,
            content: ""
          },
          {
            id: guid(),
            operator: 3,
            type: 13,
            content: [["zhinan", "yizhi"]]
          },
          {
            id: guid(),
            operator: 1,
            type: 14,
            content: 1
          }
        ];
        for (const item of tagContent) {
          item.option = elelemtOptions.get(item.type);
        }
        assignObject(this.form, {
          rulesName: "xxx",
          rulesDesc: "xxx",
          tagType: 2,
          productClassify: 2,
          productHierarchy: 3,
          productName: "fff",
          productVersion: "10.3",
          productDesc: "666",
          vendorName: "ddss",
          vendorDesc: "999",
          tagContent
        });
      });
    },
    operate() {
      return Promise.resolve();
    },
    tagTypeChange(val) {
      if (val === 1) {
        this.form.tagContent = "";
      } else {
        const item = {
          id: guid(),
          operator: 1,
          type: 1,
          content: ""
        };
        item.option = elelemtOptions.get(item.type);
        this.form.tagContent = [item];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.new-card) {
  padding: 0;
  .card__header {
    padding: 0 0 20px 0;
    border-bottom: none;
  }
}
</style>
