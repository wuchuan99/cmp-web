<template>
  <new-drawer
    ref="drawer"
    @sure="handle({ action: 'addPassiveTasks' })"
    @close="handle({ action: 'close' })"
    :size="600"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="任务名称" prop="taskName">
        <el-input
          size="medium"
          v-model.trim="form.taskName"
          placeholder="请输入任务名称"
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="被动IP范围" prop="objectName">
        <file-upload
          ref="file-upload"
          @updateTaskAddressCommand="change('taskAddressCommand', $event)"
          @uploadFileError="change('uploadFileError', $event)"
        />
      </el-form-item>
      <el-form-item label="允许扫描时间" prop="timeRange">
        <el-time-picker
          size="medium"
          is-range
          v-model="form.timeRange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="change('timeRange', $event)"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="任务扫描时长" prop="taskScanTime">
        <new-select
          :option.sync="form.taskScanTime"
          :optionList="taskScanTimeMap"
        ></new-select>
      </el-form-item>
      <el-form-item label="任务流量" prop="taskTraffic">
        <new-select
          :option.sync="form.taskTraffic"
          :optionList="taskTrafficMap"
        ></new-select>
      </el-form-item>
      <el-form-item label="网卡" prop="taskEthName">
        <new-select
          :option.sync="form.taskEthName"
          :optionList="taskEthMap"
        ></new-select>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>
<script>
import { debounce } from "@/utils/common";
import { passvieOperateMixins } from "../mixins/js/passive-operate-mixin";
import { addPassiveTask } from "@/api/task/task-list";
import FileUpload from "./PassiveOperateTaskFileUpload.vue";
import { getTime } from "@/utils/time";
import { required } from "@/utils/validate-helper";

export default {
  components: { FileUpload },
  mixins: [passvieOperateMixins],
  data() {
    return {
      form: {
        taskName: "",
        endTime: "23:59:59",
        startTime: "00:00:00",
        timeRange: [
          new Date(2022, 1, 1, 0, 0, 0),
          new Date(2022, 1, 1, 23, 59, 59)
        ],
        taskScanTime: "",
        taskTraffic: "",
        taskEthName: "",
        objectName: ""
      },
      rules: {
        taskName: [required("任务名称")],
        taskScanTime: [required("任务扫描时长")],
        taskTraffic: [required("任务流量")],
        taskEthName: [required("网卡")],
        objectName: [required("上传文件")],
        timeRange: [required("允许扫描时间")]
      }
    };
  },
  methods: {
    show() {
      this.$refs["drawer"].show("新增被动流量扫描");
      this.$nextTick(() => {
        this.init();
      });
    },
    handle: debounce(function({ action }) {
      this[action] && this[action]();
    }, 200),
    change(action, value) {
      const operation = {
        taskAddressCommand: () => {
          // 导入ip返回url
          this.form.objectName = value["objectName"];
          this.addressErrorMsg = "请选择文件";
        },
        // 时间范围
        timeRange: () => {
          this.form.startTime = getTime((value || [])[0]);
          this.form.endTime = getTime((value || [])[1]);
        },
        uploadFileError: () => {
          this.addressErrorMsg = value;
          this.$refs["taskAddressCommand"].validate();
        }
      };
      operation[action] && operation[action]();
    },
    // 新增深度扫描
    addPassiveTasks() {
      this.$refs["form"].validate(valid => {
        if (!valid) return;
        const drawer = this.$refs["drawer"];
        drawer.loading();
        addPassiveTask(this.form)
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
      this.change("timeRange", this.form.timeRange);
      if (this.$refs["file-upload"]) {
        this.$refs["file-upload"].fileList = [];
      }
    },
    init() {
      // 任务名称
      this.getTaskName();
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
