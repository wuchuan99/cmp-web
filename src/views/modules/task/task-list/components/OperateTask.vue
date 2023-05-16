<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :size="600"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="任务类型">
        <new-select
          style="width: 100%"
          :option="taskType"
          :optionList="taskTypeMap"
          @change="
            changeTaskType($event);
            $refs['taskAddressCommand'].clearValidate();
          "
        ></new-select>
      </el-form-item>
      <el-form-item label="任务名称" prop="taskName">
        <el-input
          size="medium"
          v-model="form.taskName"
          placeholder="请输入任务名称"
          maxlength="32"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="地址范围"
        prop="taskAddressCommand"
        ref="taskAddressCommand"
      >
        <operate-task-file-upload
          v-if="taskType === 'USER'"
          ref="operate-task-file-upload"
          @updateTaskAddressCommand="change('taskAddressCommand', $event)"
          @uploadFileError="change('uploadFileError', $event)"
        />
        <!-- 国家map -->
        <div v-else>
          <new-cascade
            ref="regions"
            size="medium"
            :option.sync="form.taskAddressCommand.address"
            :options="taskAddressMap"
            filterable
            :props="{ checkStrictly: true }"
            :clearable="true"
          ></new-cascade>
        </div>
      </el-form-item>
      <el-form-item label="扫描类型" prop="scanType">
        <new-select
          :option.sync="form.scanType"
          :optionList="scanTypeMap"
          placeholder="请选择扫描类型"
        ></new-select>
      </el-form-item>
      <el-form-item label="扫描策略" prop="strategy">
        <new-select
          :option="form.strategy"
          :optionList="scanStrategyMap"
          placeholder="请选择扫描策略"
          @change="
            form.strategy = $event;
            getTaskScanPorts($event);
          "
        ></new-select>
      </el-form-item>
      <el-form-item label="扫描速度" prop="speed">
        <new-select
          :option="form.speed"
          :optionList="scanSpeedMap"
          placeholder="请选择扫描速度"
          @change="form.speed = $event"
        ></new-select>
      </el-form-item>
      <el-form-item label="TCP端口" prop="tcpPorts" ref="tcpPortsFormItem">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入TCP端口"
          v-model.trim="form.tcpPorts"
        ></el-input
      ></el-form-item>
      <el-form-item label="UDP端口" prop="udpPorts" ref="udpPortsFormItem">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入TCP端口"
          v-model="form.udpPorts"
        ></el-input
      ></el-form-item>
      <el-form-item label="允许扫描时间" prop="taskRunTimeCommand.timeRange">
        <el-time-picker
          size="medium"
          is-range
          v-model="form.taskRunTimeCommand.timeRange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          @change="change('timeRange', $event)"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="执行方式" prop="taskRunTimeCommand.isCycle">
        <el-radio-group
          v-model="form.taskRunTimeCommand.isCycle"
          @change="change('isCycle', $event)"
        >
          <el-radio :label="false">立即执行</el-radio>
          <el-radio :label="true">周期执行</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 周期执行额外参数 -->
      <div v-if="form.taskRunTimeCommand.isCycle">
        <el-form-item label="时间间隔" prop="taskRunTimeCommand.cycleType">
          <new-select
            :option="form.taskRunTimeCommand.cycleType"
            :optionList="cycleTypeMap"
            placeholder="请选择时间间隔"
            @change="
              form.taskRunTimeCommand.cycleType = $event;
              form.taskRunTimeCommand.cycleParameters = [];
            "
          ></new-select>
        </el-form-item>
        <!-- 每周 -->
        <div v-if="form.taskRunTimeCommand.cycleType === 2">
          <el-form-item
            label="允许扫描日期"
            prop="taskRunTimeCommand.cycleParameters"
          >
            <new-select
              multiple
              :option="form.taskRunTimeCommand.cycleParameters"
              :optionList="cycleParametersWeekMap"
              placeholder="请选择"
              @change="form.taskRunTimeCommand.cycleParameters = $event"
            ></new-select>
          </el-form-item>
        </div>
        <!-- 每月 -->
        <div v-else-if="form.taskRunTimeCommand.cycleType === 3">
          <el-form-item
            label="允许扫描日期"
            prop="taskRunTimeCommand.cycleType"
          >
            <new-select
              multiple
              :option="form.taskRunTimeCommand.cycleParameters"
              :optionList="cycleParametersMonthMap"
              placeholder="请选择"
              @change="form.taskRunTimeCommand.cycleParameters = $event"
            ></new-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </new-drawer>
</template>
<script>
import { addTask } from "@/api/task/task-list";
import { debounce } from "@/utils/common";
import { operateTaskMixins } from "../mixins/js/operate-mixin";
import OperateTaskFileUpload from "./OperateTaskFileUpload";
import { getTime } from "@/utils/time";
import { required } from "@/utils/validate-helper";

export default {
  components: { OperateTaskFileUpload },
  data() {
    const addressRule = (rule, value, callback) => {
      // 地址范围
      if (
        this.taskType !== "USER" &&
        !this.form.taskAddressCommand.address.length
      ) {
        callback(new Error("请选择地址"));
      } else if (
        this.taskType === "USER" &&
        !this.form.taskAddressCommand.objectName
      ) {
        callback(new Error(this.addressErrorMsg));
      } else callback();
    };
    const tcpPortRule = (rule, value, callback) => {
      if (!value && !this.form.udpPorts) {
        this.$nextTick(() => {
          if (this.$refs["udpPortsFormItem"].validateState !== "error") {
            this.$refs.form.validateField("udpPorts");
          }
        });
        callback(new Error("TCP端口和UDP端口至少一个不能为空"));
      } else {
        this.$refs.form.clearValidate("udpPorts");
        callback();
      }
    };
    const udpPortRule = (rule, value, callback) => {
      if (!value && !this.form.tcpPorts) {
        this.$nextTick(() => {
          if (this.$refs["tcpPortsFormItem"].validateState !== "error") {
            this.$refs.form.validateField("tcpPorts");
          }
        });
        callback(new Error("TCP端口和UDP端口至少一个不能为空"));
      } else {
        this.$refs.form.clearValidate("tcpPorts");
        callback();
      }
    };
    return {
      addressErrorMsg: "请选择文件",
      form: {
        taskName: "",
        scanType: "",
        strategy: "",
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
          startTime: "00:00:00",
          timeRange: [
            new Date(2022, 1, 1, 0, 0, 0),
            new Date(2022, 1, 1, 23, 59, 59)
          ] //扫描时间
        },
        tcpPorts: "",
        udpPorts: ""
      },
      rules: {
        taskName: [required("任务名称")],
        scanType: [required("扫描类型")],
        strategy: [required("扫描策略")],
        speed: [required("扫描速度")],
        taskAddressCommand: [{ required: true, validator: addressRule }],
        tcpPorts: [{ validator: tcpPortRule }],
        udpPorts: [{ validator: udpPortRule }],
        "taskRunTimeCommand.isCycle": [required("执行方式")],
        "taskRunTimeCommand.timeRange": [required("允许扫描时间")],
        "taskRunTimeCommand.cycleType": [required("时间间隔")],
        "taskRunTimeCommand.cycleParameters": [required("允许扫描日期")]
      }
    };
  },
  watch: {
    "form.taskAddressCommand.objectName": {
      deep: true,
      immediate: true,
      handler(val) {
        val && this.$refs["taskAddressCommand"].clearValidate();
      }
    }
  },
  mixins: [operateTaskMixins],
  computed: {
    postObj() {
      return {
        ...this.form,
        tcpPorts: this.form.tcpPorts.split(","),
        udpPorts: this.form.udpPorts.split(",")
      };
    }
  },
  methods: {
    show(object) {
      const { title } = object;
      this.$refs["drawer"].show(title);
      this.$nextTick(() => {});
    },
    change(action, value) {
      const operate = {
        taskAddressCommand: () => {
          // 导入ip返回url
          this.form.taskAddressCommand.objectName = value["objectName"];
          this.addressErrorMsg = "请选择文件";
        },
        // 时间范围
        timeRange: () => {
          this.form.taskRunTimeCommand.startTime = getTime((value || [])[0]);
          this.form.taskRunTimeCommand.endTime = getTime((value || [])[1]);
        },
        isCycle: () => {
          if (!value) {
            this.form.taskRunTimeCommand.cycleType = "";
            this.form.taskRunTimeCommand.cycleParameters = [];
          }
        },
        uploadFileError: value => {
          this.addressErrorMsg = value;
          this.$refs["taskAddressCommand"].validate();
        }
      };
      operate[action] && operate[action]();
    },

    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateTask(drawer);
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
          this.resetFormData();
        }
      };
      operate[action] && operate[action]();
    }, 200),
    // 新增或编辑策略
    operateTask(drawer) {
      addTask(this.postObj)
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
    },
    resetFormData() {
      //重置任务类型及名称
      this.getTaskType();

      this.$nextTick(() => {
        //允许扫描时间
        this.change("timeRange", this.form.taskRunTimeCommand.timeRange);
        //地址范围
        if (this.$refs["operate-task-file-upload"])
          this.$refs["operate-task-file-upload"].fileList = [];
        this.form.taskAddressCommand.objectName = "";
        this.form.taskAddressCommand.address = [];
        //允许扫描日期
        this.form.taskRunTimeCommand.cycleType = "";
        this.form.taskRunTimeCommand.cycleParameters = [];
      });
    }
  },
  created() {
    this.mapInit();
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
