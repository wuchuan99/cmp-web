<template>
  <div class="system-monitor" :class="{ center: monitorList.length === 1 }">
    <div
      class="system-monitor-card"
      v-for="(item, index) in monitorList"
      :key="`monitor-card-${index + 1}`"
    >
      <!-- baisc -->
      <div>
        <el-descriptions
          class="margin-top"
          :column="2"
          size="medium"
          :border="true"
          :labelStyle="{ width: '150px' }"
          :contentStyle="{ width: '200px' }"
        >
          >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              服务器IP
            </template>
            {{ item["systemServerIp"] }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-coin"></i>
              扫描网卡
            </template>
            {{ item["ethName"] }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-postcard"></i>
              操作系统
            </template>
            {{ item["osName"] }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-time"></i>
              系统启动时间
            </template>
            {{ item["systemStartTime"] }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-discover"></i>
              运行状态
            </template>
            <el-tag
              size="small"
              :type="nodeStatusMap.get(item['nodeStatus'])?.type"
            >
              {{ nodeStatusMap.get(item["nodeStatus"])?.text }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-information"></i>
              地址选择
            </template>
            <new-cascade
              placeholder="请选择地址"
              :filterable="true"
              :options="options"
              :option.sync="item.address"
              @change="
                handle({
                  action: 'updateAddress',
                  value: item
                })
              "
            />
          </el-descriptions-item>
          <el-descriptions-item v-if="item['nodeStatus'] === 'ALARM'">
            <template slot="label">
              <i class="el-icon-tickets"></i>
              运行异常原因
            </template>
            {{ item["abnormalOperationReason"] }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 网卡列表 -->
      <new-table
        class="system-monitor-list"
        :border="true"
        size="small"
        :max-height="200"
        :columns="columns"
        :data="item.systemMonitorEthVoList"
      />

      <!-- cpu memory disk -->
      <div class="system-monitor-chart">
        <div class="dashboard-item">
          <new-chart
            :ref="`${refs[0]}${item['serverNodeId']}`"
            :option="cpuOption"
            :export-btn="false"
          />
        </div>
        <div class="dashboard-item">
          <new-chart
            :ref="`${refs[1]}${item['serverNodeId']}`"
            :option="intOption"
            :export-btn="false"
          />
        </div>
        <div class="dashboard-item">
          <new-chart
            :ref="`${refs[2]}${item['serverNodeId']}`"
            :option="diskOption"
            :export-btn="false"
          />
        </div>
      </div>
      <!-- line -->
      <div class="system-monitor-line">
        <new-chart
          :ref="`${refs[3]}${item['serverNodeId']}`"
          class="intLineChartContainer"
          :option="cpuLineOption"
          :export-btn="false"
        />
        <new-chart
          :ref="`${refs[4]}${item['serverNodeId']}`"
          class="intLineChartContainer"
          :option="intLineOption"
          :export-btn="false"
        />
      </div>
    </div>
    <detail-eth ref="detail" @update="getSystemMonitors(true)"></detail-eth>
  </div>
</template>
<script>
import {
  getSystemMonitorList,
  getDashbordList,
  getLineList,
  updateScanEth,
  getMonitorTreeRegion,
  updateNodePostion
} from "@/api/system/system-monitor";
import DetailEth from "./components/DetailNodeEth.vue";
import charOptionsMixin from "./mixins/js/chart-options";
import { debounce } from "@/utils/common";
import { confirm } from "@/utils/element";

export default {
  components: { DetailEth },
  mixins: [charOptionsMixin],
  data() {
    return {
      monitorList: [],
      nodeIds: [],
      refs: [
        "cpuChart",
        "memoryChart",
        "diskChart",
        "cpuLineChart",
        "intLineChart"
      ],
      timer: null,
      columns: [
        { label: "网卡名称", prop: "ethName" },
        { label: "网卡IP", prop: "ethIp" },
        { label: "MAC地址", prop: "ethMac" },
        { label: "子网掩码", prop: "ethMask" },
        // { label: "网卡状态", prop: "ethStatus" },
        {
          label: "连接状态",
          width: 80,
          align: "center",
          render: scope => (
            <span class={this.getColor(scope.row.status)}>
              {scope.row.status ? "已连接" : "未连接"}
            </span>
          )
        },
        {
          label: "扫描网卡",
          width: 80,
          align: "center",
          render: scope => (
            <el-switch
              //        disabled={!scope.row.status}
              value={scope.row.isScanEthFlag}
              onchange={() => {
                this.handle({
                  action: "changeScanEth",
                  value: scope.row
                });
              }}
            ></el-switch>
          )
        },
        {
          label: "操作",
          width: 60,
          align: "center",
          render: scope => {
            return (
              <i
                class="el-icon-view"
                onclick={() => this.$refs["detail"].show(scope.row)}
              ></i>
            );
          }
        }
      ],
      options: [],
      nodeStatusMap: new Map([
        ["ONLINE", { type: "success", text: "在线" }],
        ["OFFLINE", { type: "info", text: "离线" }],
        ["ALARM", { type: "danger", text: "异常" }]
      ])
    };
  },
  computed: {
    getColor() {
      return status => {
        return status ? "active" : "inactive";
      };
    }
  },
  methods: {
    handle: debounce(function({ action, value }) {
      this[action] && this[action](value);
    }, 200),
    changeScanEth(value) {
      if (value.isScanEthFlag)
        return this.$message.info("已是扫描网卡，不能切换！");
      const { ethName, systemNodeId } = value;
      confirm("此操作将切换网卡，是否继续操作？", () => {
        updateScanEth({ ethName, systemNodeId }).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.getSystemMonitors(true);
            // value.isScanEthFlag = !value.isScanEthFlag;
          }
        });
      });
    },
    // 统计图init
    initChart(serverNodeId, loading = true) {
      this.refs.forEach(ref => {
        this.$refs?.[`${ref}${serverNodeId}`][0]?.initChart(loading);
      });
    },
    // 更新统计图
    updateChart(ids = this.nodeIds) {
      this.getDashboards(ids);
      this.getLines(ids);
    },
    // 详情查询
    getSystemMonitors(updateFlag) {
      getSystemMonitorList().then(res => {
        const { data, success } = res.data;
        if (success) {
          this.monitorList = data && data.length ? data : [];
          let _nodeIds = [];
          this.monitorList.forEach(
            ({ serverNodeId, systemMonitorEthVoList }) => {
              _nodeIds.push(serverNodeId);
              // 记录节点id
              systemMonitorEthVoList.forEach(
                eth => (eth["systemNodeId"] = serverNodeId)
              );
              // 延时更新
              setTimeout(() => {
                !updateFlag && this.initChart(serverNodeId, !updateFlag);
              });
            }
          );
          this.nodeIds = _nodeIds;
          // 更新拓扑图
          !updateFlag && this.updateChart(_nodeIds);
        }
      });
    },
    // 获取仪表盘信息
    getDashboards(ids) {
      getDashbordList(ids).then(res => {
        const { data, success } = res.data;
        if (success) {
          this.updateDashbords(
            data && data.length ? this.changeDashbordData(data) : []
          );
        }
      });
    },
    // 获取折线图信息
    getLines(ids) {
      getLineList(ids).then(res => {
        const { data, success } = res.data;
        if (success) {
          this.updateLines(
            data && data.length ? this.changeLineData(data) : []
          );
        }
      });
    },
    // 更新仪表盘
    updateDashbords(list) {
      list.forEach(({ nodeId, useArray }) => {
        this.refs.slice(0, 3).forEach((ref, index) => {
          const _ref = this.$refs?.[`${ref}${nodeId}`][0];
          _ref.option.series[0].data = [
            { value: useArray[index], name: _ref.option.series[0].name }
          ];
          _ref.updateChart();
        });
      });
    },
    // 更新折线图
    updateLines(list) {
      list.forEach(({ lineArray, serverNodeId }) => {
        this.refs.slice(3).forEach((ref, index) => {
          const _ref = this.$refs?.[`${ref}${serverNodeId}`][0];
          _ref.option.xAxis.data = lineArray[index].xAxis;
          _ref.option.series[0].data = lineArray[index].series;
          _ref.updateChart();
        });
      });
    },
    getTree() {
      getMonitorTreeRegion().then(res => {
        const { success, data } = res.data;
        if (success) this.options = data;
      });
    },
    updateAddress(item) {
      const params = {
        nodeId: item.serverNodeId,
        addressIds: item.address
      };
      updateNodePostion(params);
    }
  },
  mounted() {
    this.getTree();
    this.getSystemMonitors();
    this.timer = setInterval(this.updateChart, 10000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
<style lang="scss" scoped>
@import "./mixins/styles/index.scss";
</style>
