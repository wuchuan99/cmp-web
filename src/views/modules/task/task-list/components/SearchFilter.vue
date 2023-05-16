<template>
  <advanced-search-container
    :visible.sync="isShowFilter"
    :form="form"
    class="senior"
    @sure="handle({ action: 'search' })"
    style="margin-top: 20px"
  >
    <el-form-item
      label="任务名称"
      prop="taskName"
      label-width="106px"
      style="margin-bottom: 12px"
    >
      <el-input
        type="text"
        size="medium"
        v-model="form.taskName"
        maxlength="32"
        clearable
        style="width: 230px"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="任务状态"
      prop="status"
      label-width="86px"
      style="margin-bottom: 12px"
    >
      <new-select
        :option.sync="form.status"
        :optionList="taskStatusMap"
        multiple
        collapse-tags
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item
      label="是否周期任务"
      prop="isCycleTask"
      label-width="116px"
      style="margin-bottom: 12px"
    >
      <new-select
        :option.sync="form.isCycleTask"
        :optionList="isCycleTaskMap"
        clearable
        style="width: 165px"
      />
    </el-form-item>
    <el-form-item
      label="扫描类型"
      prop="scanTypeEnum"
      label-width="86px"
      style="margin-bottom: 12px"
    >
      <new-select
        :option.sync="form.scanTypeEnum"
        :optionList="scanTypeMap"
        clearable
        style="width: 165px"
      />
    </el-form-item>
    <el-form-item
      label="扫描策略"
      prop="scanStrategyEnum"
      label-width="86px"
      style="margin-bottom: 12px"
    >
      <new-select
        :option.sync="form.scanStrategyEnum"
        :optionList="scanStrategyMap"
        clearable
        style="width: 226px"
      />
    </el-form-item>
    <el-form-item
      label="任务创建时间"
      prop="taskCreateTime"
      label-width="106px"
      style="margin-bottom: 0"
    >
      <el-date-picker
        v-model="form.taskCreateTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item
      label="任务完成时间"
      prop="taskCompletedTime"
      label-width="116px"
      style="margin-bottom: 0;margin-right: 20px"
    >
      <el-date-picker
        v-model="form.taskCompletedTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
    </el-form-item>
  </advanced-search-container>
</template>
<script>
import { debounce } from "@/utils/common";
import { taskStatusMap, isCycleTaskMap } from "../mixins/js/const";
import { getTaskMap, getScanTypeMap } from "@/api/task/task-list";
const changeMap = list => {
  if (Array.isArray(list)) {
    return list.map(item => {
      return {
        label: item.key,
        value: item.value
      };
    });
  }
};
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isShowFilter: false,
      taskStatusMap,
      isCycleTaskMap,
      scanTypeMap: [],
      scanStrategyMap: []
    };
  },
  methods: {
    toggle() {
      this.isShowFilter = !this.isShowFilter;
    },
    handle: debounce(function({ action }) {
      this[action] && this[action]();
    }, 200),
    search() {
      this.$emit("sure");
    },
    // 扫描类型
    getScanType() {
      getScanTypeMap().then(res => {
        if (res.data.success) {
          this.scanTypeMap = changeMap(res.data.data);
        }
      });
    },
    // 扫描策略
    getScanStrategy() {
      getTaskMap("ScanStrategyEnum").then(res => {
        if (res.data.success) {
          this.scanStrategyMap = changeMap(res.data.data);
        }
      });
    }
  },
  created() {
    this.getScanType();
    this.getScanStrategy();
  }
};
</script>
