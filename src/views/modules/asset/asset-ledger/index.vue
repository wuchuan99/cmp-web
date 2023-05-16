<template>
  <div class="asset-ledger">
    <div class="header">
      <div class="operation-box">
        <div class="operation">
          <new-select
            style="width: 100px"
            :option.sync="ledgerId"
            :optionList="ledgerMap"
            @change="ledgerIdChange"
          />
          <new-button
            type="add"
            margin
            @click="$refs['operateLedger'].show({ title: '新增台账' })"
            >新增台账</new-button
          >
          <new-button
            type="edit"
            margin
            :disabled="!ledgerId"
            @click="
              $refs['operateLedger'].show({ title: '编辑台账', id: ledgerId })
            "
            >编辑台账
          </new-button>
          <new-button
            type="delete"
            margin
            :disabled="!ledgerId"
            @click="
              confirm('此操作将删除所选台账，是否继续操作？', () => {
                handle({ action: 'deleteLedger' });
              })
            "
            >删除台账
          </new-button>
        </div>
        <div class="bottons">
          <!-- <new-button
            margin
            @click="handle({ action: 'openDrawer', ref: 'exportAssets' })"
            >导入资产</new-button
          > -->
          <new-button
            margin
            type="rank"
            :disabled="allSelections.length < 2"
            @click="$refs['mergeAssets'].show({ ipList: allSelections })"
            >合并资产</new-button
          >
          <new-button
            type="filter"
            margin
            @click="isShowSeniorSearch = !isShowSeniorSearch"
            >筛选</new-button
          >
          <new-search
            class="search"
            v-model="queryParams.keyword"
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
        <el-form-item label="IP" prop="ip" style="margin-bottom: 0">
          <el-input
            type="text"
            size="medium"
            v-model="queryParams.ip"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="操作系统"
          prop="os"
          label-width="80px"
          style="margin-bottom: 0"
        >
          <el-input
            type="text"
            size="medium"
            v-model="queryParams.os"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="服务"
          prop="services"
          label-width="54px"
          style="margin-bottom: 0"
        >
          <el-input
            type="text"
            size="medium"
            v-model="queryParams.services"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="数据来源"
          prop="sources"
          label-width="80px"
          style="margin-bottom: 0"
        >
          <el-input
            type="text"
            size="medium"
            v-model="queryParams.sources"
            maxlength="32"
          ></el-input>
        </el-form-item>
      </advanced-search-container>
    </div>
    <card-list :ledgerStats.sync="ledgerStats" />
    <div class="table" v-loading="loading">
      <div class="all-selection" v-show="allSelections.length">
        <el-tag
          class="margin-right-5"
          size="mini"
          closable
          v-for="(selection, index) in allSelections"
          :key="selection.id"
          @close="removeSelection(index, selection.id)"
        >
          {{ selection.ip }}
        </el-tag>
      </div>
      <new-table
        :border="true"
        :columns="table.columns"
        :data="records"
        ref="table"
        :options="table.options"
        @selection-change="handleSelectionChange"
      />
      <new-page
        v-show="total"
        :total.sync="total"
        :page.sync="pageIndex"
        :limit.sync="pageSize"
        @changePage="handle({ action: 'changePage', value: $event.page })"
      />
    </div>

    <export-assets ref="exportAssets" @update="update" />
    <merge-assets ref="mergeAssets" @update="update" />
    <operate-ledger
      ref="operateLedger"
      @update="update"
      :ledgerId.sync="ledgerId"
    ></operate-ledger>
    <operate-assets ref="operateAssets" @update="assetsUpdate"></operate-assets>
  </div>
</template>
<script>
import {
  getLedgerMap,
  getLedgerStats,
  getStatsMap,
  deleteAssetLedger,
  getAssetList,
  deleteAssetmanage,
  dismantleAssets
} from "@/api/asset/asset-ledger";
import { debounce } from "@/utils/common";
import CardList from "./components/CardList.vue";
import ExportAssets from "./components/ExportAssets.vue";
import MergeAssets from "./components/MergeAssets.vue";
import OperateLedger from "./components/OperateLedger";
import OperateAssets from "./components/OperateAssets";
import { removeObjEmptyKey } from "@/utils/object";
import { confirm } from "@/utils/element";
export default {
  name: "assetLedger",
  components: {
    CardList,
    ExportAssets,
    MergeAssets,
    OperateLedger,
    OperateAssets
  },
  data() {
    return {
      loading: false,
      table: {
        options: {
          "tree-props": { children: "children", hasChildren: "hasChildren" },
          "row-key": "id"
        },
        columns: [
          // { type: "selection" },
          {
            type: "selection",
            selectable: row => !row.isChild
          },
          { label: "IP", prop: "ip" },
          { label: "MAC", prop: "mac" },
          { label: "操作系统", prop: "os" },
          {
            label: "服务",
            render: scope => (
              <span>
                {scope.row.services
                  ? scope.row.services.map(service => service.service).join(",")
                  : ""}
              </span>
            )
          },
          { label: "应用数", prop: "appNum", width: 120, align: "center" },
          { label: "端口数", prop: "portNum", width: 120, align: "center" },
          { label: "服务数", prop: "serviceNum", width: 120, align: "center" },
          { label: "漏洞数", prop: "vulNum", width: 120, align: "center" },
          {
            label: "数据来源",
            prop: "types",
            width: 160,
            render: scope => (
              <span>{scope.row.types ? scope.row.types.join(",") : ""}</span>
            )
          },
          {
            label: "数据描述",
            prop: "sources",
            render: scope => (
              <span>
                {scope.row.sources ? scope.row.sources.join(",") : ""}
              </span>
            )
          },
          { label: "更新时间", prop: "updateTime", width: 152 },
          {
            label: "操作",
            width: 240,
            align: "center",
            render: scope => {
              const dismantleAssetDom = (
                <span
                  class="click primary margin-left-15"
                  onclick={() => {
                    this.confirm("此操作将拆解该资产，是否继续操作？", () => {
                      this.handle({
                        action: "dismantleAsset",
                        value: scope.row.assetId
                      });
                    });
                  }}
                >
                  拆解资产
                </span>
              );
              const dom = (
                <div>
                  <span
                    class="click primary"
                    onclick={() => {
                      this.$refs["operateAssets"].show({
                        title: "编辑资产",
                        assetId: scope.row.assetId
                      });
                    }}
                  >
                    编辑
                  </span>
                  <span
                    class="click primary margin-left-15"
                    onclick={() => {
                      this.$router.push({
                        name: "ledgerAssetDtail",
                        params: { id: scope.row.assetId }
                      });
                    }}
                  >
                    详情
                  </span>
                  {scope.row?.children?.length ? dismantleAssetDom : null}
                  <span
                    class="click danger margin-left-15"
                    onclick={() => {
                      this.confirm("此操作将删除该资产，是否继续操作？", () => {
                        this.handle({
                          action: "deleteAsset",
                          value: scope.row.assetId
                        });
                      });
                    }}
                  >
                    删除
                  </span>
                </div>
              );
              return scope.row.assetId ? dom : null;
            }
          }
        ]
      },
      records: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      queryParams: {
        keyword: "",
        ip: "",
        os: "",
        services: "",
        sources: ""
      },
      ledgerMap: [],
      ledgerId: "",
      ledgerStats: {
        IP: 0,
        PORT: 0,
        SERVICE: 0,
        VUL: 0
      },
      currenPageSelections: [], //当前页选中参数
      allSelections: [], //全部分页选中参数
      pageFlag: false,
      isShowSeniorSearch: false
    };
  },

  computed: {
    curParameter() {
      return (
        this.parameterList.find(item => item.label === this.parameter) || {}
      );
    },
    postObj() {
      return removeObjEmptyKey({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        assetLedgerId: this.ledgerId,
        ...this.queryParams
      });
    },
    // 当前分页数据全部asset ids
    recordIds() {
      return this.records.map(record => record.assetId);
    },
    allSelectionIds() {
      return this.allSelections.map(record => record.assetId);
    }
  },
  watch: {
    recordIds() {
      this.recordIds.forEach((item, i) => {
        // 切换pageIndex后如果之前有选中数据回显
        if (this.allSelectionIds.includes(item)) {
          setTimeout(() => {
            this.$refs["table"].$table.toggleRowSelection(this.records[i]);
          });
        }
      });
    }
  },
  methods: {
    confirm,
    handle: debounce(function({ action, value }) {
      this[action] && this[action](value);
    }, 200),
    // 切换当前页选中
    handleSelectionChange(value) {
      this.currenPageSelections = value;
      // 更新全选内容
      if (!this.pageFlag) {
        this.allSelections = this.allSelections
          .filter(selection => !this.recordIds.includes(selection.assetId))
          .concat(value);
      } else {
        // this.allSelections.forEach(row => table.toggleRowSelection(row));
      }
    },
    // 移除选中
    removeSelection(index) {
      const removeSelection = this.allSelections.splice(index, 1);
      // 移除当前页状态
      if (this.currenPageSelections.length) {
        this.$refs["table"].$table.toggleRowSelection(removeSelection[0]);
      }
    },
    // 分页
    changePage() {
      this.pageFlag = true;
      this.getAssets();
      this.getStatsMaps();
    },
    update(value) {
      const _ledgerId = value ? value["ledgerId"] : "";
      this.pageIndex = 1;
      this.allSelections = []; //全部分页选中参数
      this.getLedgers(_ledgerId);
    },
    assetsUpdate() {
      setTimeout(() => {
        this.search();
      }, 1500);
    },
    search() {
      this.pageIndex = 1;
      this.getAssets();
      this.getStatsMaps();
    },
    // 删除台账
    deleteLedger() {
      deleteAssetLedger(this.ledgerId).then(res => {
        const { success, message } = res.data;
        if (success) {
          this.$message.success(message);
          this.getLedgers();
        }
      });
    },
    // 获取台账列表
    getLedgers(ledgerId) {
      getLedgerMap().then(res => {
        const { success, data } = res.data;
        if (success) {
          this.ledgerMap = data.map(item => {
            return {
              label: item.id,
              value: item.name
            };
          });
          if (this.ledgerMap.length) {
            this.ledgerId = ledgerId || this.ledgerMap[0]["label"];
            // 查询
            this.getStatsMaps();
            this.getAssets();
          }
        }
      });
    },
    // 获取统计数map
    getStatsMaps() {
      getStatsMap().then(res => {
        const { success, data } = res.data;
        if (success)
          data.forEach(({ key }) => {
            this.getStats(key);
          });
      });
    },
    // 查询统计数
    getStats(type) {
      getLedgerStats(this.postObj, type).then(res => {
        const { success, data } = res.data;
        if (success) this.ledgerStats[type] = data ? parseInt(data) : 0;
      });
    },
    changePageFlag() {
      setTimeout(() => {
        this.pageFlag = false;
      }, 1000);
    },
    ledgerIdChange() {
      this.pageIndex = 1;
      this.allSelections = []; //全部分页选中参数
      this.getStatsMaps();
      this.getAssets();
    },

    // 查询资产列表
    getAssets() {
      this.loading = true;
      getAssetList(this.postObj)
        .then(res => {
          const { success, data, totalCount } = res.data;
          if (success) {
            this.total = totalCount;
            this.records = data.map(item => {
              const { ipDetails, /*mainId,*/ assetId } = item;
              // 无子节点资产
              if (ipDetails.length === 1) {
                return {
                  ...ipDetails[0],
                  assetId
                };
              } else {
                let [_children, _mainAsset] = [[], {}];
                // 找主资产 第一个是主资产
                ipDetails.forEach((asset, index) => {
                  // if (asset.id === mainId) _mainAsset = asset;
                  if (index === 0) _mainAsset = asset;
                  else _children.push({ ...asset, isChild: true });
                });
                // if(_mainAsset)
                return {
                  ..._mainAsset,
                  assetId,
                  children: _children
                };
              }
            });
            // 删除后当前页没有数据执行
            if (this.pageIndex > 1 && this.records.length === 0) {
              this.pageIndex--;
              this.getAssets();
            }
          }
          this.changePageFlag();
        })
        .catch(() => this.changePageFlag)
        .finally(() => {
          this.loading = false;
        });
    },
    //删除资产
    deleteAsset(assetId) {
      const params = {
        assetLedgerId: this.ledgerId,
        assetId
      };
      deleteAssetmanage(params).then(res => {
        const { success, message, errMessage } = res.data;
        if (!success) return this.$message.error(errMessage);
        this.$message.success(message);
        this.getAssets();
      });
    },
    // 拆解资产
    dismantleAsset(id) {
      dismantleAssets(id).then(res => {
        const { success, message, errMessage } = res.data;
        if (!success) return this.$message.error(errMessage);
        this.$message.success(message);
        this.pageIndex = 1;
        this.allSelections = []; //全部分页选中参数
        this.getAssets();
      });
    }
  },
  created() {
    this.getLedgers();
  }
};
</script>
<style lang="scss" scoped>
@import "./mixins/styles/index.scss";
</style>
