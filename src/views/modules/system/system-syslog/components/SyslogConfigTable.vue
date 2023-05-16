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
    <operate-syslog ref="operateSyslogDrawer" @update="update" />
  </div>
</template>

<script>
import { debounce } from "@/utils/common";
import paginationMixin from "@/mixins/pagination";
import { getSyslogList, deleteSyslog } from "@/api/system/syslog";
import OperateSyslog from "./OperateSyslog.vue";
import { confirm } from "@/utils/element";
export default {
  mixins: [paginationMixin],
  components: { OperateSyslog },
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
        // { type: "selection" },
        // { type: "index", label: "序号", width: 80 },
        { prop: "syslogIp", label: "服务器IP" },
        { prop: "syslogPort", label: "服务器端口" },
        {
          prop: "protocol",
          label: "传输协议",
          render: scope => <span>{scope.row.protocol}</span>
        },
        {
          prop: "transTypes",
          label: "传输内容",
          render: scope => <span>{scope.row.transTypes.join("，")}</span>
        },
        {
          label: "操作",
          width: "80",
          showOverflowTooltip: false,
          align: "center",
          render: scope => {
            const msg = { del: "此操作将永久删除该配置, 是否继续?" };
            return (
              <div class="cell-operation">
                {/* <span
                  class="primary"
                  onclick={() =>
                    this.handle({
                      action: "operateSyslogDrawer",
                      syslogId: scope.row.syslogId
                    })
                  }
                >
                  编辑
                </span> */}
                <span
                  class="click danger"
                  onclick={() =>
                    confirm(msg.del, () =>
                      this.handle({
                        action: "delSyslog",
                        syslogId: scope.row.syslogId
                      })
                    )
                  }
                >
                  删除
                </span>
              </div>
            );
          }
        }
      ]
    };
  },
  methods: {
    handle: debounce(function(context) {
      this[context.action] && this[context.action](context);
    }, 200),
    operateSyslogDrawer(syslogId) {
      let title = syslogId ? "编辑syslog配置" : "新增syslog配置";
      this.$refs["operateSyslogDrawer"].show({ title, syslogId });
    },
    delSyslog({ syslogId }) {
      deleteSyslog(syslogId).then(res => {
        const { success, message, errMessage } = res.data;
        if (success) {
          this.update();
          this.$message.success(message);
        } else this.$message.error(errMessage);
      });
    },
    update() {
      this.pageIndex = 1;
      this.getRecords();
    }
  },
  created() {
    this.fetchFn = getSyslogList;
    this.getRecords();
  }
};
</script>
<style scoped></style>
