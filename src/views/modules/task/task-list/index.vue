acl<template>
  <div class="task-list">
    <div class="header">
      <div class="task-list-buttons">
        <new-button
          type="network"
          @click="$refs[operateRef].show({ title: '新增主动扫描任务' })"
          >主动扫描</new-button
        >
        <!-- <new-button
        type="network"
        margin
        @click="$refs[passiveOperateRef].show({ title: '新增被动流量任务' })"
        >被动流量</new-button
      >
      <new-button type="network" margin @click="$refs[deepScanRef].show()"
        >深度扫描</new-button
      > -->
        <new-button
          type="filter"
          margin
          @click="handle({ action: 'toggleFilter' })"
          >筛选</new-button
        >
        <new-search
          class="task-list-buttons-search"
          v-model="queryParams.keyword"
          @click="handle({ action: 'getTasks' })"
        />
      </div>
      <search-filter
        ref="filter"
        :form="queryParams"
        @sure="handle({ action: 'getTasks' })"
      />
    </div>
    <!-- 卡片形式 -->
    <div class="task-list-container">
      <div class="task-list-container-card">
        <div
          class="task-list-container-box"
          v-for="task in taskList"
          :key="task.taskUuiad"
        >
          <div class="task-name">
            <div class="flex-center">
              <span class="task-name-i"></span>
              <span
                class="task-name-text"
                @click="
                  handle({ action: 'goSearchList', value: task.taskName })
                "
                >{{ task.taskName }}</span
              >
            </div>
            <div
              class="task-name-close"
              @click="handle({ action: 'deleteTasks', value: task.taskUuid })"
            >
              X
            </div>
          </div>
          <div class="task-progress">
            <div class="task-progress-title">
              <div>进度</div>
              <div class="task-progress-title-buttons">
                <span
                  :class="{
                    disabled:
                      ['PREPARING', 'RUNNING'].includes(task.statusKey) ||
                      processDisabled
                  }"
                  @click="
                    handle({
                      action: 'operateTemplate',
                      value: { method: startTask, id: task.taskUuid }
                    })
                  "
                  >开始</span
                >
                <span
                  :class="{
                    disabled:
                      ['SUCCESS', 'STOPPED', 'DELETE'].includes(
                        task.statusKey
                      ) || processDisabled
                  }"
                  @click="
                    handle({
                      action: 'operateTemplate',
                      value: { method: pauseTask, id: task.taskUuid }
                    })
                  "
                  >暂停</span
                >
              </div>
            </div>
            <el-progress
              :percentage="task.progress"
              :stroke-width="8"
            ></el-progress>
            <div
              class="task-progress-remainder-time"
              v-html="taskStatus(task.statusKey, task.resumeTime)"
            ></div>
          </div>
          <div class="task-start-time">
            <span v-if="task.statusKey === 'SUCCESS'"
              >完成时间：{{ task.completeTime }}</span
            >
            <span v-else> 开始时间：{{ task.startTime }}</span>
          </div>
          <div class="task-count">
            <div class="task-count-box">
              <img src="./mixins/images/ip.png" alt="" />
              <div class="task-count-box-count">
                <div>IP数</div>
                <div>{{ task.ipSum || 0 }}</div>
              </div>
            </div>
            <div class="task-count-box">
              <img src="./mixins/images/port.png" alt="" />
              <div class="task-count-box-count">
                <div>端口数</div>
                <div>{{ task.portSum || 0 }}</div>
              </div>
            </div>
            <div class="task-count-box">
              <img src="./mixins/images/server.png" alt="" />
              <div class="task-count-box-count">
                <div>服务数</div>
                <div>{{ task.serviceSum || 0 }}</div>
              </div>
            </div>
            <div class="task-count-box">
              <img src="./mixins/images/vul.png" alt="" />
              <div class="task-count-box-count">
                <div>漏洞数</div>
                <div>{{ task.vulSum || 0 }}</div>
              </div>
            </div>
          </div>
          <div class="task-detail">
            <!-- <el-button
              class="down-btn"
              type="primary"
              :loading="task.downLoading"
              size="mini"
              @click="handle({ action: 'downloadFile', value: task })"
              >扫描结果下载</el-button
            > -->
            <span
              class="down-btn"
              :class="{ loading: task.downLoading }"
              title="扫描结果下载"
            >
              <i
                class="el-icon-download"
                @click="handle({ action: 'downloadFile', value: task })"
              ></i>
            </span>
            <div
              class="detail-text"
              @click="
                $refs[detailRef].show({ title: '任务详情', id: task.taskUuid })
              "
            >
              任务详情&nbsp;&nbsp;>>
            </div>
          </div>
        </div>
      </div>
      <div class="task-list-container-page">
        <new-page
          :curren-page="pageIndex"
          :total="total"
          :page-size="pageSize"
          :layout="2"
          v-show="total"
          @pagination="handle({ action: 'changePage', value: $event })"
        ></new-page>
      </div>
    </div>
    <operate-task @update="update" :ref="operateRef" />
    <detail-task :ref="detailRef" />
    <deep-scan-task :ref="deepScanRef" @update="update" />
    <passive-operate-task :ref="passiveOperateRef" @update="update" />
  </div>
</template>
<script>
import {
  getTaskList,
  deleteTask,
  startTask,
  pauseTask,
  taskScanDownload
} from "@/api/task/task-list";
import { debounce } from "@/utils/common";
import { deepClone, removeObjEmptyKey } from "@/utils/object";
import OperateTask from "./components/OperateTask.vue";
import DetailTask from "./components/DetailTask.vue";
import DeepScanTask from "./components/DeepScanTask.vue";
import PassiveOperateTask from "./components/PassiveOperateTask.vue";
import { confirm } from "@/utils/element";
import SearchFilter from "./components/SearchFilter.vue";
import { taskStatus, addtasktypeMap } from "./mixins/js/const";
const isCycleTaskMap = new Map([
  ["0", false],
  ["1", true]
]);
export default {
  name: "taskList",
  components: {
    OperateTask,
    DetailTask,
    DeepScanTask,
    PassiveOperateTask,
    SearchFilter
  },
  data() {
    return {
      operateRef: "operate",
      detailRef: "detail",
      deepScanRef: "scanType",
      passiveOperateRef: "passiveOperate",
      taskList: [],
      pageIndex: 1,
      total: 0,
      pageSize: 8,
      timer: null,
      processDisabled: false,
      addtasktypeMap,
      queryParams: {
        keyword: "",
        taskName: "",
        status: [],
        isCycleTask: "",
        taskCreateTime: [],
        taskCompletedTime: [],
        scanTypeEnum: "",
        scanStrategyEnum: ""
      }
    };
  },
  computed: {
    postObj() {
      return {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      };
    },
    // 扫描状态
    taskStatus
  },
  methods: {
    startTask,
    pauseTask,
    handle: debounce(function({ action, value }) {
      this[action] && this[action](value);
    }, 200),
    // 分页
    changePage({ page }) {
      this.pageIndex = page;
      this.getTasks();
    },
    // 新增扫描任务
    batchOperation(value) {
      value === "Active_SCAN"
        ? this.$refs[this.operateRef].show({ title: "新增主动扫描任务" })
        : this.$refs[this.passiveOperateRef].show({
            title: "新增被动流量任务"
          });
    },
    // 删除任务
    deleteTasks(id) {
      confirm("此操作将删除所选任务，是否继续操作?", () => {
        this.operateTemplate({ method: deleteTask, id: id });
      });
    },
    // 开始&暂停&删除
    operateTemplate({ method, id }) {
      this.processDisabled = true;
      method({ taskUuids: [id] })
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.update();
          } else {
            this.$message.error(res.data.errMessage);
          }
          this.processDisabled = false;
        })
        .catch(() => (this.processDisabled = false));
    },
    update() {
      this.pageIndex = 1;
      this.getTasks();
    },
    getParams() {
      const queryParams = deepClone(this.queryParams);
      queryParams.isCycleTask = isCycleTaskMap.get(queryParams.isCycleTask);
      queryParams.taskCreateTime = queryParams.taskCreateTime || [];
      queryParams.taskCreateStartTime = queryParams.taskCreateTime[0];
      queryParams.taskCreateEndTime = queryParams.taskCreateTime[1];
      queryParams.taskCompletedTime = queryParams.taskCompletedTime || [];
      queryParams.taskCompletedStartTime = queryParams.taskCompletedTime[0];
      queryParams.taskCompletedEndTime = queryParams.taskCompletedTime[1];
      if (!queryParams?.status?.length) delete queryParams.status;
      delete queryParams.taskCreateTime;
      delete queryParams.taskCompletedTime;
      return removeObjEmptyKey(queryParams);
    },
    // 获取任务列表
    getTasks() {
      getTaskList({ ...this.postObj, ...this.getParams() }).then(res => {
        if (res.data.success) {
          const { totalCount, data } = res.data;
          for (const item of data) {
            item.downLoading = false;
          }
          this.total = totalCount;
          this.taskList = data;
        }
      });
    },
    goSearchList(taskName) {
      const search = `task.name : "${taskName}"`;
      this.$router.push({
        name: "searchList",
        params: { search }
      });
    },
    toggleFilter() {
      this.$refs["filter"].toggle();
    },
    downloadFile(item) {
      item.downLoading = true;
      taskScanDownload(item.taskUuid)
        .then(res => {
          const { success, data } = res.data;
          if (success) this.$message.success(data);
        })
        .finally(() => {
          item.downLoading = false;
        });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  created() {
    this.getTasks();
    this.timer = setInterval(this.getTasks, 6000);
  }
};
</script>
<style lang="scss" scoped>
@import "./mixins/styles/task-list.scss";
</style>
