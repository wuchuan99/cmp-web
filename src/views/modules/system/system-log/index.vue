<template>
  <div class="system-log">
    <div class="header">
      <div class="operation">
        <new-button
          :type="buttonType"
          :disabled="buttonType === 'loading'"
          @click="handle({ action: 'exportTableData' })"
          >导出</new-button
        >
        <div class="search-box">
          <new-button @click="isShowSeniorSearch = !isShowSeniorSearch"
            >高级搜索</new-button
          >
          <new-search
            v-model="queryParams.keyword"
            class="search"
            @click="handle({ action: 'search' })"
          />
        </div>
      </div>
      <advanced-search-container
        :visible.sync="isShowSeniorSearch"
        :form="queryParams"
        class="senior"
        @sure="handle({ action: 'search' })"
      >
        <el-form-item
          label="操作人"
          prop="operatorName"
          style="margin-bottom: 0"
        >
          <el-input
            type="text"
            size="medium"
            v-model="queryParams.operatorName"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="终端ip"
          prop="terminalIp"
          label-width="54px"
          style="margin-bottom: 0"
        >
          <el-input
            type="text"
            size="medium"
            v-model="queryParams.terminalIp"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="开始时间"
          prop="startTime"
          style="margin-bottom: 0"
        >
          <new-date-time
            type="datetime"
            v-model="queryParams.startTime"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </new-date-time>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime" style="margin-bottom: 0">
          <new-date-time
            type="datetime"
            v-model="queryParams.endTime"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </new-date-time>
        </el-form-item>
      </advanced-search-container>
    </div>
    <div
      class="main"
      :class="{ seniorSearch: isShowSeniorSearch }"
      v-loading="loading"
    >
      <new-table
        ref="newTable"
        :border="true"
        :max-height="485"
        :columns="table.columns"
        :data="records"
      />
      <new-page
        :total.sync="total"
        :page.sync="pageIndex"
        :limit.sync="pageSize"
      />
    </div>
  </div>
</template>
<script>
import { debounce } from "@/utils/common";
import paginationMixin from "@/mixins/pagination";
import { getLogList, exportLog } from "@/api/log";
import { fileExport } from "@/utils/file";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      table: {
        columns: [
          { type: "index", label: "序号", width: 80 },
          { prop: "terminalIp", label: "终端ip" },
          { prop: "operatorName", label: "操作人" },
          { prop: "logType", label: "日志类型" },
          { prop: "logStatus", label: "状态" },
          // { prop: "logLevel", label: "日志级别" },
          { prop: "logContent", label: "日志内容" },
          { prop: "createTime", label: "创建时间" }
        ]
      },
      queryParams: {
        keyword: "",
        operatorName: "",
        terminalIp: "",
        startTime: "",
        endTime: ""
      },
      isShowSeniorSearch: false,
      buttonType: "export"
    };
  },
  created() {
    this.fetchFn = getLogList;
  },
  mounted() {
    this.getRecords();
  },
  methods: {
    handle: debounce(function({ action }) {
      this[action] && this[action]();
    }, 200),
    exportTableData() {
      this.buttonType = "loading";
      exportLog(this.queryParams).then(res => {
        fileExport(res, "application/octet-stream");
        this.buttonType = "export";
        this.$message.success("导出成功");
      });
    },
    search() {
      this.pageIndex = 1;
      this.getRecords();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.system-log {
  height: 100%;
  padding: 25px 0;
  .header {
    background-color: white;
    width: 100%;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.17);
    padding: 20px;
    .operation {
      @include flex-space-between;
      width: 100%;
      .search-box {
        @include flex-start;
        .search {
          margin-left: 15px;
        }
      }
    }
    .senior {
      margin-top: 20px;
    }
  }
  .main {
    padding: 20px;
    margin-top: 16px;
    height: calc(100% - 92px);
    background-color: white;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.17);
    &.seniorSearch {
      height: calc(100% - 190px);
    }
  }
}
</style>
