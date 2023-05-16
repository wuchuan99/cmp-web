<template>
  <div class="system-network">
    <div class="system-network-main">
      <div class="hearder">网络配置</div>
      <div class="body">
        <new-table
          ref="newTable"
          :border="true"
          :columns="table.columns"
          :data="records"
          :loading="loading"
        />
        <!-- cpu memory disk -->
        <div class="system-monitor-chart">
          <div class="dashboard-item">
            <new-chart
              :ref="`${refs[0]}`"
              :option="cpuOption"
              :export-btn="false"
            />
          </div>
          <div class="dashboard-item">
            <new-chart
              :ref="`${refs[1]}`"
              :option="intOption"
              :export-btn="false"
            />
          </div>
          <div class="dashboard-item">
            <new-chart
              :ref="`${refs[2]}`"
              :option="diskOption"
              :export-btn="false"
            />
          </div>
        </div>
        <!-- line -->
        <div class="system-monitor-line">
          <new-chart
            :ref="`${refs[3]}`"
            class="intLineChartContainer"
            :option="cpuLineOption"
            :export-btn="false"
          />
          <new-chart
            :ref="`${refs[4]}`"
            class="intLineChartContainer"
            :option="intLineOption"
            :export-btn="false"
          />
        </div>
      </div>
    </div>

    <operate-network ref="operateNetworkDrawer" @update="update" />
    <detail-network ref="detailNetworkDrawer" />
  </div>
</template>

<script>
import { debounce } from "@/utils/common";
import OperateNetwork from "./components/OperateNetwork.vue";
import DetailNetwork from "./components/DetailNetwork.vue";
import { getEthList } from "@/api/system/syslog-network";
import charOptionsMixin from "./mixins/js/chart-options";
import { _dashbordList, _lineList } from "@/api/system/system-monitor";
export default {
  components: { OperateNetwork, DetailNetwork },
  mixins: [charOptionsMixin],
  data() {
    return {
      loading: false,
      records: [],
      table: {
        columns: [
          // { type: "index", label: "序号", width: 80 },
          { prop: "ethName", label: "网卡名称" },
          // { prop: "ethStatus", label: "网卡状态" },
          {
            prop: "status",
            label: "连接状态",
            render: scope => (
              <span class={this.getColor(scope.row.status)}>
                {scope.row.status}
              </span>
            )
          },
          { prop: "ethIp", label: "IP地址" },
          { prop: "ethMask", label: "子网掩码" },
          { prop: "ethGateway", label: "网关地址" },
          { prop: "ethMac", label: "MAC地址" },
          { prop: "ethDns1", label: "DNS1" },
          { prop: "ethDns2", label: "DNS2" },
          { prop: "ethDesc", label: "网卡描述" },
          {
            label: "操作",
            width: "140",
            showOverflowTooltip: false,
            align: "center",
            render: scope => {
              return (
                <div class="cell-operation">
                  <span
                    class="primary click"
                    onclick={() =>
                      this.handle({
                        action: "openDrawer",
                        ref: "operateNetworkDrawer",
                        payload: {
                          type: "edit",
                          title: "编辑网卡信息",
                          data: scope.row
                        }
                      })
                    }
                  >
                    编辑
                  </span>
                  <span
                    class="primary margin-left-15 click"
                    onclick={() =>
                      this.handle({
                        action: "openDrawer",
                        ref: "detailNetworkDrawer",
                        payload: {
                          type: "view",
                          title: "查看网卡信息",
                          data: scope.row
                        }
                      })
                    }
                  >
                    查看
                  </span>
                </div>
              );
            }
          }
        ]
      },
      refs: [
        "cpuChart",
        "memoryChart",
        "diskChart",
        "cpuLineChart",
        "intLineChart"
      ],
      timer: null
    };
  },
  created() {
    this.getRecords();
  },
  mounted() {
    this.initChart();
    this.updateChart();
    this.timer = setInterval(this.updateChart, 10000);
  },
  computed: {
    getColor() {
      return status => {
        return status === "已连接" ? "active" : "inactive";
      };
    }
  },
  methods: {
    getRecords() {
      getEthList().then(res => {
        const { success, data } = res.data;
        if (success) this.records = data || [];
      });
    },
    ethScanChange(val, row) {
      row.ethScanFlag = val;
    },
    handle: debounce(function(context) {
      const { action } = context;
      if (!action || !this[action]) return;
      this[action](context);
    }, 200),
    openDrawer({ ref, payload }) {
      if (!ref || !payload) return;
      const { title, type, data } = payload;
      this.$refs[ref].show({ title, type, data });
    },
    update() {
      this.getRecords();
    },
    // 统计图init
    initChart() {
      this.refs.forEach(ref => {
        this.$refs?.[ref]?.initChart();
      });
    },
    // 更新统计图
    updateChart() {
      this.getDashboards();
      this.getLines();
    },
    // 获取仪表盘信息
    getDashboards() {
      this.updateDashbords(this.changeDashbordData(_dashbordList));
    },
    // 获取折线图信息
    getLines() {
      this.updateLines(this.changeLineData(_lineList));
    },
    // 更新仪表盘
    updateDashbords({ useArray }) {
      this.refs.slice(0, 3).forEach((ref, index) => {
        const _ref = this.$refs?.[ref];
        _ref.option.series[0].data = [
          { value: useArray[index], name: _ref.option.series[0].name }
        ];
        _ref.updateChart();
      });
    },
    // 更新折线图
    updateLines({ lineArray }) {
      this.refs.slice(3).forEach((ref, index) => {
        const _ref = this.$refs?.[ref];
        _ref.option.xAxis.data = lineArray[index].xAxis;
        _ref.option.series[0].data = lineArray[index].series;
        _ref.updateChart();
      });
    }
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
