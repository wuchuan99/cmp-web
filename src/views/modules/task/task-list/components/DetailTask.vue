<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :sureButton="false"
    :size="600"
  >
    <el-descriptions :column="2" :border="true" v-loading="loading">
      <el-descriptions-item label="任务名称">
        <new-tooltip :content="form['taskName']" />
      </el-descriptions-item>
      <el-descriptions-item label="地址范围">
        <new-tooltip :content="form['ipAddresses']" />
      </el-descriptions-item>
      <el-descriptions-item label="扫描类型">
        <new-tooltip :content="getMapValue(scanTypeMap, form['scanType'])" />
      </el-descriptions-item>
      <el-descriptions-item label="扫描策略">
        <new-tooltip
          :content="
            getMapValue(scanStrategyMap, form['scanStrategy']['strategyId'])
          "
        />
      </el-descriptions-item>
      <el-descriptions-item label="扫描速度">
        <new-tooltip :content="getMapValue(scanSpeedMap, form['speed'])" />
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        <new-tooltip :content="form['createTime']" />
      </el-descriptions-item>
      <el-descriptions-item label="开始时间">
        <new-tooltip :content="form['startTime']" />
      </el-descriptions-item>
      <el-descriptions-item label="完成时间">
        <new-tooltip :content="form['completeTime']" />
      </el-descriptions-item>
      <el-descriptions-item
        label="任务状态"
        :span="form['statusKey'] === 'FAIL' ? 1 : 2"
      >
        <div v-html="taskStatus(form['statusKey'], form['consumeTime'])"></div>
      </el-descriptions-item>
      <el-descriptions-item
        label="失败原因"
        v-if="form['statusKey'] === 'FAIL'"
      >
        <div>{{ form["failMessage"] }}</div>
      </el-descriptions-item>
      <el-descriptions-item label="TCP端口" :span="2">
        <div>
          <span v-for="port in form['scanStrategy']['tcpPorts']" :key="port">
            <el-tag size="mini" class="margin-right-5">{{ port }}</el-tag>
          </span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="UDP端口" :span="2">
        <div>
          <span v-for="port in form['scanStrategy']['udpPorts']" :key="port">
            <el-tag size="mini" class="margin-right-5">{{ port }}</el-tag>
          </span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="允许扫描时间：">
        {{ form["taskRunTimeCommand"]["startTime"] }} ~
        {{ form["taskRunTimeCommand"]["endTime"] }}
      </el-descriptions-item>
      <el-descriptions-item label="执行方式">
        {{ form["taskRunTimeCommand"]["isCycle"] ? "周期执行" : "立即执行" }}
      </el-descriptions-item>
      <template v-if="form.taskRunTimeCommand.isCycle">
        <el-descriptions-item label="时间间隔">
          {{
            getMapValue(cycleTypeMap, form["taskRunTimeCommand"]["cycleType"])
          }}
        </el-descriptions-item>
        <!-- 每周 -->
        <template v-if="form.taskRunTimeCommand.cycleType === 2">
          <el-descriptions-item label="允许扫描日期" :span="2">
            <span
              v-for="date in getDateValue(
                cycleParametersWeekMap,
                form['taskRunTimeCommand']['cycleParameters']
              )"
              :key="date"
            >
              <el-tag size="mini" class="margin-right-5">{{ date }}</el-tag>
            </span>
          </el-descriptions-item>
        </template>
        <!-- 每月 -->
        <template v-else-if="form.taskRunTimeCommand.cycleType === 3">
          <el-descriptions-item label="允许扫描日期" :span="2">
            <span
              v-for="date in getDateValue(
                cycleParametersMonthMap,
                form['taskRunTimeCommand']['cycleParameters']
              )"
              :key="date"
            >
              <el-tag size="mini" class="margin-right-5">{{ date }}</el-tag>
            </span>
          </el-descriptions-item>
        </template>
      </template>
    </el-descriptions>
  </new-drawer>
</template>

<script>
import { getTaskInfo } from "@/api/task/task-list";
import { operateTaskMixins } from "../mixins/js/operate-mixin";
import { debounce } from "@/utils/common";
import { taskStatus } from "../mixins/js/const";
export default {
  data() {
    return {
      form: {
        taskName: "",
        scanType: "",
        ipAddresses: "",
        scanStrategy: {
          strategyId: ""
        },
        speed: "",
        taskAddressCommand: {
          address: [],
          // ipAddresses: {},
          objectName: ""
        },
        taskRunTimeCommand: {
          cycleParameters: [],
          cycleType: "",
          duration: "",
          durationType: "",
          endTime: "23:59:59",
          isCycle: false,
          startTime: "00:00:00"
        },
        tcpPorts: "",
        udpPorts: ""
      },
      loading: false
    };
  },
  mixins: [operateTaskMixins],
  computed: {
    getMapValue() {
      return (map, label) => {
        const list = map.filter(item => item.label == label);
        return list.length ? list[0]["value"] : "";
      };
    },
    getDateValue() {
      return (map, labels) => {
        return map
          .filter(item => labels.includes(item.label))
          .map(item => item.value);
      };
    },
    getPorts() {
      return port => {
        return port ? port.join(",") : "";
      };
    },
    taskStatus
  },
  methods: {
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          const drawer = this.$refs["drawer"];
          drawer.close();
        },
        close: () => {}
      };
      operate[action] && operate[action]();
    }, 200),
    show(object) {
      const { title, id } = object;
      this.$refs["drawer"].show(title);
      this.$nextTick(() => {
        this.getTaskDetail(id);
      });
    },
    // 详情
    getTaskDetail(id) {
      this.loading = true;
      getTaskInfo(id)
        .then(res => {
          if (res.data.success) {
            this.form = res.data.data;
          }
        })
        .finally(() => (this.loading = false));
    }
  },
  created() {
    this.mapInit();
  }
};
</script>
<style lang="scss" scoped>
:deep(.el-descriptions-item__label) {
  width: 80px;
}
</style>
