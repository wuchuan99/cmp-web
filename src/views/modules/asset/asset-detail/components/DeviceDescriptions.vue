<template>
  <div class="deviceDescriptions">
    <new-card class="card">
      <template v-slot:header>
        <i
          type="primary"
          class="el-icon-back"
          @click="$router.replace({ name: 'assetLedger' })"
        ></i>
        <span class="title">基本信息</span>
      </template>
      <new-table
        style="margin-top: 15px"
        :border="true"
        :columns="table.columns"
        :data="records"
      />
    </new-card>
  </div>
</template>

<script>
import { isObjectEmpty } from "@/utils/object";
export default {
  props: {
    device: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      table: {
        columns: [
          {
            prop: "desc",
            label: "设备类型描述"
          },
          {
            prop: "deviceType",
            label: "设备类型"
          },
          {
            prop: "model",
            label: "产品型号"
          },
          {
            prop: "moduleNum",
            label: "产品数"
          },
          {
            prop: "name",
            label: "产品名称"
          },
          {
            prop: "os",
            label: "操作系统"
          },
          {
            prop: "vendor",
            label: "产品生产商"
          },
          {
            prop: "version",
            label: "产品版本号"
          }
        ]
      }
    };
  },
  computed: {
    records() {
      const props = this.table.columns.map(column => column.prop);
      const item = {};
      for (const prop of props) {
        if (this.device?.[prop]) {
          item[prop] = this.device[prop];
        }
      }
      if (isObjectEmpty(item)) return [];
      return [item];
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.deviceDescriptions {
  @include shadow;
  width: 100%;
  margin-bottom: 15px;
  background-color: white;
  .el-icon-back {
    font-weight: 700;
    font-size: 22px;
    margin-right: 10px;
    cursor: pointer;
    color: #456bea;
  }
  .title {
    width: auto !important;
    display: inline-block !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    margin: 8px 0;
    border-left: 0 !important;
    position: relative;
    color: #4d5056;
    &::before {
      content: "";
      position: absolute;
      width: 2px;
      height: 15px;
      background: #456bea;
      left: 0;
      top: -1px;
    }
  }
  :deep(.card) {
    .card__header {
      padding-bottom: 12px;
    }
  }
}
</style>
