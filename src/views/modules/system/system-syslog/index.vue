<template>
  <div class="system-syslog">
    <div class="header">
      <div class="tabs">
        <el-radio-group
          class="radio-group"
          v-model="activeId"
          size="medium"
          @change="tabChange"
        >
          <el-radio-button
            :label="item.id"
            v-for="item in tabs"
            :key="item.id"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="operation" v-show="activeId === 1">
        <new-button
          type="add"
          @click="handle({ action: 'openOperateSyslogDrawer' })"
          >新增</new-button
        >
        <new-search
          class="search"
          v-model="queryParams.syslogIp"
          placeholder="请输入服务器IP"
          @click="handle({ action: 'search' })"
        />
      </div>
    </div>
    <div class="main" v-show="activeId === 1">
      <syslog-config-table
        ref="syslog-config-table"
        :query-params="queryParams"
      ></syslog-config-table>
    </div>
    <div class="main" v-show="activeId === 2">
      <syslog-example-table ref="syslog-example-table"></syslog-example-table>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/common";
import SyslogConfigTable from "./components/SyslogConfigTable.vue";
import SyslogExampleTable from "./components/SyslogExampleTable.vue";
export default {
  components: { SyslogConfigTable, SyslogExampleTable },
  data() {
    return {
      queryParams: {
        syslogIp: ""
      },
      tabs: [
        {
          id: 1,
          name: "Syslog配置"
        },
        {
          id: 2,
          name: "Syslog范例"
        }
      ],
      activeId: 1
    };
  },
  methods: {
    handle: debounce(function(context) {
      this[context.action] && this[context.action](context);
    }, 200),
    // 关键字搜索
    search() {
      this.activeId === 1 && this.$refs["syslog-config-table"].update();
    },
    openOperateSyslogDrawer() {
      this.activeId === 1 &&
        this.$refs["syslog-config-table"].operateSyslogDrawer();
    },
    tabChange() {}
  },
  created() {}
};
</script>
<style lang="scss" scoped>
@import "./mixins/styles/index.scss";
</style>
