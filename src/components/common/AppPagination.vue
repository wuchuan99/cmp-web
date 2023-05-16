<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layouts"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 30, 50];
      }
    },
    layout: {
      type: [String, Number],
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 自定义layout
    layouts() {
      const layoutType = {
        1: "total, sizes, prev, pager, next, jumper",
        2: "total, prev, pager, next, jumper",
        3: "total, prev, pager, next"
      };
      return typeof this.layout === "string"
        ? this.layout
        : layoutType[this.layout] || layoutType[1];
    },
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit("changeSize", { page: 1, limit: val });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("changePage", { page: val, limit: this.pageSize });
    }
  }
};
</script>

<style scoped>
.pagination-container {
  padding: 32px 16px;
  display: flex;
  justify-content: center;
}
.pagination-container.hidden {
  display: none;
}
</style>
