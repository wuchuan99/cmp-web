<template>
  <new-drawer
    ref="drawer"
    @sure="handle({ action: 'addDeepTask' })"
    @close="handle({ action: 'close' })"
    :size="600"
  >
    <el-form ref="form" label-width="auto" :model="form" size="small">
      <el-form-item label="任务" prop="taskId">
        <new-select
          :option.sync="form.taskId"
          :optionList="deepTaskMap"
          placeholder="请选择任务"
        ></new-select>
      </el-form-item>
      <el-form-item label="扫描内容" prop="scanTypes">
        <new-select
          multiple
          :option.sync="form.scanTypes"
          :optionList="deepScantypeMap"
          placeholder="请选择扫描内容"
        ></new-select>
      </el-form-item>
      <el-form-item label="允许扫描时间" prop="timeRange">
        <el-time-picker
          size="medium"
          is-range
          v-model="form.timeRange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          @change="
            form.startTime = getTime(($event || [])[0]);
            form.endTime = getTime(($event || [])[1]);
          "
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="执行方式" prop="isCycle">
        <el-radio-group
          v-model="form.isCycle"
          @change="
            if (!$event) {
              form.cycleType = '';
              form.cycleParameters = [];
            }
          "
        >
          <el-radio :label="false">立即执行</el-radio>
          <el-radio :label="true">周期执行</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.isCycle">
        <el-form-item label="时间间隔" prop="cycleType">
          <new-select
            :option="form.cycleType"
            :optionList="cycleTypeMap"
            placeholder="请选择时间间隔"
            @change="
              form.cycleType = $event;
              form.cycleParameters = [];
            "
          ></new-select>
        </el-form-item>
        <!-- 每周 -->
        <div v-if="form.cycleType === 2">
          <el-form-item label="允许扫描日期" prop="cycleParameters">
            <new-select
              multiple
              :option.sync="form.cycleParameters"
              :optionList="cycleParametersWeekMap"
              placeholder="请选择"
            ></new-select>
          </el-form-item>
        </div>
        <!-- 每月 -->
        <div v-else-if="form.cycleType === 3">
          <el-form-item label="允许扫描日期" prop="cycleType">
            <new-select
              multiple
              :option.sync="form.cycleParameters"
              :optionList="cycleParametersMonthMap"
              placeholder="请选择"
            ></new-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </new-drawer>
</template>
<script>
import { debounce } from "@/utils/common";
import { deepScanMixins } from "../mixins/js/deep-scan-mixin";
import { addDeepScanTask } from "@/api/task/task-list";
import { getTime } from "@/utils/time";

export default {
  mixins: [deepScanMixins],
  data() {
    return {
      form: {
        taskId: null,
        scanTypes: [],
        endTime: "23:59:59",
        isCycle: false,
        startTime: "00:00:00",
        cycleType: "",
        cycleParameters: [],
        timeRange: [
          new Date(2022, 1, 1, 0, 0, 0),
          new Date(2022, 1, 1, 23, 59, 59)
        ] //扫描时间,
      }
    };
  },
  methods: {
    getTime,
    show() {
      this.$refs["drawer"].show("深度扫描");
      this.$nextTick(() => {
        this.init();
      });
    },
    handle: debounce(function({ action }) {
      this[action] && this[action]();
    }, 200),
    // 新增深度扫描
    addDeepTask() {
      this.$refs["form"].validate(valid => {
        if (!valid) return;
        const drawer = this.$refs["drawer"];
        drawer.loading();
        addDeepScanTask(this.form)
          .then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              drawer.close();
              this.$emit("update");
            } else this.$message.error(res.data.errMessage);
            drawer.closeLoading();
          })
          .catch(() => {
            drawer.closeLoading();
          });
      });
    },
    close() {
      this.$refs.form.resetFields();
      this.resetFormData();
    },
    resetFormData() {
      this.form.startTime = getTime(this.form.timeRange[0]);
      this.form.endTime = getTime(this.form.timeRange[1]);
      this.form.cycleType = "";
      this.form.cycleParameters = [];
    },
    init() {
      // 任务map
      this.getDeepTaskMap();
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.el-select) {
  width: 100%;
}
:deep(.el-cascader) {
  width: 100%;
}
:deep(.el-textarea__inner) {
  resize: none;
}
:deep(.el-date-editor) {
  width: 100%;
}
</style>
