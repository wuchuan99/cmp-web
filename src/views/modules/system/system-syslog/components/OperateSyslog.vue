<template>
  <new-drawer
    ref="drawer"
    @sure="handle('sure')"
    @close="handle('close')"
    :size="500"
  >
    <el-form
      ref="form"
      label-width="auto"
      :model="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="服务器IP" prop="syslogIp">
        <el-input
          size="medium"
          v-model="form.syslogIp"
          placeholder="请输入服务器IP"
        ></el-input>
      </el-form-item>
      <el-form-item label="传输协议" prop="protocol">
        <el-radio-group
          v-model="form.protocol"
          @change="form.syslogPort = form.protocol === 'UDP' ? 514 : 1468"
        >
          <el-radio label="UDP">UDP</el-radio>
          <el-radio label="TCP">TCP</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务器端口" prop="syslogPort">
        <el-input
          size="medium"
          v-model.number="form.syslogPort"
          placeholder="请输入服务器端口"
        ></el-input>
      </el-form-item>
      <el-form-item label="传输内容" prop="transTypes">
        <el-checkbox-group v-model="form.transTypes">
          <el-checkbox
            :label="transTypes.label"
            v-for="transTypes in transTypesMap"
            :key="transTypes.label"
            >{{ transTypes.value }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </new-drawer>
</template>

<script>
import {
  getSyslogtransTypesMap,
  addSyslog,
  updateSyslog,
  getSyslogDetail
} from "@/api/system/syslog";
import { debounce } from "@/utils/common";
import { required, validateFn } from "@/utils/validate-helper";
import { reg_ip, reg_port } from "@/utils/regex";
import { assignObject } from "@/utils/object";
export default {
  data() {
    return {
      form: {
        syslogId: null,
        syslogIp: "",
        syslogPort: 514,
        protocol: "UDP",
        transTypes: []
      },
      rules: {
        syslogIp: [validateFn("服务器IP", reg_ip, { required: true })],
        syslogPort: [validateFn("服务器端口", reg_port, { required: true })],
        protocol: [required("传输协议")],
        transTypes: [required("传输内容")]
      },
      transTypesMap: []
    };
  },
  created() {
    this.getSyslogtransTypes();
  },

  methods: {
    show({ title, syslogId }) {
      this.$refs["drawer"].show(title);
      this.$nextTick(() => {
        this.getSyslogInfo((this.form.syslogId = syslogId));
      });
    },
    handle: debounce(function(action) {
      const operate = {
        sure: () => {
          this.$refs["form"].validate(valid => {
            if (!valid) return;
            const drawer = this.$refs["drawer"];
            drawer.loading();
            this.operateSyslog(
              drawer,
              this.form.syslogId ? updateSyslog : addSyslog
            );
          });
        },
        close: () => {
          this.$refs["form"].resetFields();
        }
      };
      operate[action] && operate[action]();
    }, 200),
    operateSyslog(drawer, method) {
      method(this.form)
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
    getSyslogInfo(syslogId) {
      syslogId &&
        getSyslogDetail(syslogId).then(res => {
          const { success, data } = res.data;
          if (success) assignObject(this.form, data);
        });
    },
    getSyslogtransTypes() {
      getSyslogtransTypesMap().then(res => {
        const { success, data } = res.data;
        if (success)
          this.transTypesMap = data.map(transTypes => {
            return {
              label: transTypes.value,
              value: transTypes.value
            };
          });
        this.form.transTypes = this.transTypesMap.map(type => type.label);
      });
    }
  }
};
</script>
