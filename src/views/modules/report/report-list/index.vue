<template>
  <div class="task-report">
    <!-- <div class="header">
      <div class="tabs">
        <el-radio-group
          class="radio-group"
          v-model="activeId"
          size="medium"
          @change="tabChange"
        >
          <el-radio-button
            :label="item.key"
            v-for="item in tabs"
            :key="item.key"
            >{{ item.value }}</el-radio-button
          >
        </el-radio-group>
      </div>
    </div> -->
    <div class="main">
      <new-table
        ref="newTable"
        :border="true"
        :columns="table.columns"
        :data="records"
        :loading="loading"
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
import { deepClone } from "@/utils/object";
import {
  getReportDict,
  getReportQuerypage,
  downReportById
} from "@/api/report";
import paginationMixin from "@/mixins/pagination";
import { fileExport } from "@/utils/file";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      tabs: [],
      activeId: 1,
      table: {
        columns: [
          // { type: "selection" },
          { type: "index", label: "序号", width: 80 },
          { prop: "taskName", label: "任务名称" },
          {
            prop: "taskType",
            label: "任务类型",
            width: "100px"
          },
          { prop: "generateTime", label: "生成时间", width: "160px" },
          {
            label: "原始数据",
            align: "center",
            render: scope => {
              let className = ["theme"];
              if (scope.row.original_download_1) {
                className.push("disabled");
              }
              return (
                <span
                  class={className}
                  onclick={() => {
                    this.handle({
                      action: "originalDownload",
                      data: { reportType: 1, row: scope.row }
                    });
                  }}
                >
                  {scope.row.original_download_1 ? (
                    <i class="el-icon-loading"></i>
                  ) : null}
                  <span>{scope.row.originalData.originalFileName}</span>
                </span>
              );
            }
          },
          {
            prop: "report",
            label: "综合报告（word）",
            render: scope => {
              let className = ["theme"];
              if (scope.row.original_download_2) {
                className.push("disabled");
              }
              return (
                <span
                  class={className}
                  onclick={() =>
                    this.handle({
                      action: "originalDownload",
                      data: { reportType: 2, row: scope.row }
                    })
                  }
                >
                  {scope.row.original_download_2 ? (
                    <i class="el-icon-loading"></i>
                  ) : null}
                  {scope.row.summaryReportWord.originalFileName}
                </span>
              );
            }
          },
          {
            prop: "report",
            label: "综合报告（pdf）",
            render: scope => {
              let className = ["theme"];
              if (scope.row.original_download_3) {
                className.push("disabled");
              }
              return (
                <span
                  class={className}
                  onclick={() =>
                    this.handle({
                      action: "originalDownload",
                      data: { reportType: 3, row: scope.row }
                    })
                  }
                >
                  {scope.row.original_download_3 ? (
                    <i class="el-icon-loading"></i>
                  ) : null}
                  {scope.row.summaryReportPdf.originalFileName}
                </span>
              );
            }
          },
          {
            label: "操作",
            width: "140",
            showOverflowTooltip: false,
            align: "center",
            render: scope => {
              let className = ["theme"];
              if (scope.row.original_download_4) {
                className.push("disabled");
              }
              return (
                <span
                  class={className}
                  onclick={() =>
                    this.handle({
                      action: "originalDownload",
                      data: { reportType: 4, row: scope.row }
                    })
                  }
                >
                  {scope.row.original_download_4 ? (
                    <i class="el-icon-loading"></i>
                  ) : null}
                  <span>下载（打包）</span>
                </span>
              );
            }
          }
        ]
      },
      reportDownTypes: [],
      queryParams: {
        reportClassifyId: 2
      }
    };
  },
  created() {
    this.fetchFn = getReportQuerypage;
  },
  async mounted() {
    await this.getReportClassify();
    await this.getReportType();
    await this.getRecords();
    for (const item of this.records) {
      for (const { key } of this.reportDownTypes) {
        this.$set(item, `original_download_${key}`, false);
      }
    }
  },
  methods: {
    handle: debounce(function(context) {
      this[context.action] && this[context.action](context);
    }, 200),
    originalDownload({ data }) {
      console.log(data);
      if (data.row[`original_download_${data.reportType}`]) return;
      data.row[`original_download_${data.reportType}`] = true;
      const params = {
        reportId: data.row.reportId,
        reportType: data.reportType
      };
      downReportById(params)
        .then(res => {
          fileExport(res);
          this.$message.success("下载成功");
        })
        .finally(() => {
          data.row[`original_download_${data.reportType}`] = false;
        });
    },
    tabChange() {
      this.loading = true;
      this.records = [];
      setTimeout(() => {
        this.loading = false;
        this.records = deepClone(this.source);
      }, 500);
    },
    getReportClassify() {
      return getReportDict("ReportClassifyEnum").then(res => {
        const { success, data } = res.data;
        if (success) {
          this.tabs = data;
          this.activeId = this.tabs[0].key;
        }
      });
    },
    getReportType() {
      return getReportDict("ReportTypeEnum").then(res => {
        const { success, data } = res.data;
        if (success) this.reportDownTypes = data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/constant.scss";
.task-report {
  height: 100%;
  padding: 25px 0;
  .header {
    background-color: white;
    height: 75px;
    width: 100%;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.17);
    padding: 20px;
  }
  .main {
    // margin-top: 16px;
    padding: 20px;
    // height: calc(100% - 92px);
    height: 100%;
    background-color: white;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.17);
  }
  .theme {
    color: $themeColor;
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
      i,
      span {
        pointer-events: none;
      }
    }
  }
}
</style>
