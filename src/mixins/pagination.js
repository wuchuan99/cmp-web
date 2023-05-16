import { removeObjEmptyKey } from "@/utils/object";
export default {
  data() {
    return {
      fetchFn: null,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      records: [],
      loading: false
    };
  },
  watch: {
    pageIndex() {
      this.getRecords();
    },
    pageSize() {
      if (this.pageIndex === 1) this.getRecords();
      else this.pageIndex = 1;
    }
  },
  methods: {
    getRecords() {
      if (!this.fetchFn) return Promise.reject("没有分页接口函数");
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      const queryParams = this.queryParams
        ? removeObjEmptyKey(this.queryParams)
        : {};
      Object.assign(params, queryParams);
      this.loading = true;
      return this.fetchFn(params)
        .then(res => {
          this.records = res.data.data || [];
          this.total = res.data.totalCount || 0;
          if (this.pageIndex > 1 && this.records.length === 0) this.pageIndex--;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
