<template>
  <div>
    <new-table
      ref="newTable"
      :border="true"
      :columns="columns"
      :data="records"
    />
    <new-page
      v-show="total"
      :total.sync="total"
      :page.sync="pageIndex"
      :limit.sync="pageSize"
    />
  </div>
</template>

<script>
import { debounce } from "@/utils/common";
import paginationMixin from "@/mixins/pagination";
import { reg_ip } from "@/utils/regex";
export default {
  mixins: [paginationMixin],
  props: {
    queryParams: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      records: [],
      columns: [
        { prop: "content", label: "传输内容" },
        { prop: "example", label: "示例" }
      ]
    };
  },
  methods: {
    handle: debounce(function(context) {
      this[context.action] && this[context.action](context);
    }, 200),
    sendTest(row) {
      const params = {
        id: row.id,
        testIp: row.testIp
      };
      console.log(params);
      if (!reg_ip.test(params.testIp)) {
        return this.$message.error("测试IP地址不正确");
      }
    }
  },
  created() {
    this.records = [
      {
        id: 1,
        content: "传输内容",
        example: "示例",
        testIp: ""
      }
    ];
    this.total = this.records.length;
  }
};
</script>
<style scoped></style>
