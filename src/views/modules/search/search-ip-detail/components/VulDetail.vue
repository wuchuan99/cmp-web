<template>
  <new-drawer ref="drawer" :size="600" :sureButton="false" @close="vul = {}">
    <el-descriptions :column="2" :border="true" :labelStyle="{ width: '95px' }">
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-menu"></i>
          漏洞名称
        </template>
        <div class="vul-title">
          {{ vul.name
          }}{{
            vul.cveCode || vul.cnnvdCode
              ? `（${vul.cveCode || vul.cnnvdCode}）`
              : ""
          }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-bank-card"></i>
          漏洞类型
        </template>
        {{ vul.type }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-warning-outline"></i>
          危害等级
        </template>
        <span :style="{ color: getVulLevelColor(vul.level) }">
          {{ vul.level }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-monitor"></i>
          厂商
        </template>
        {{ vul.vendor }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          收录时间
        </template>
        {{ vul.publishTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          漏洞简介
        </template>
        <span v-html="vul.desc"></span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          更新时间
        </template>
        {{ vul.updateTime }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" v-if="vul.data">
        <template slot="label">
          <i class="el-icon-document"></i>
          验证信息
        </template>
        <span>{{ vul.data }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2" v-if="vul.referUrl">
        <template slot="label">
          <i class="el-icon-connection"></i>
          参考网址
        </template>
        <span v-for="(item, index) in vul.referUrl" :key="index">
          {{ item }}
          <br v-if="index !== vul.referUrl.length - 1" />
        </span>
      </el-descriptions-item>
      <el-descriptions-item :span="2" v-if="vul.patch">
        <template slot="label">
          <i class="el-icon-link"></i>
          补丁
        </template>
        <span v-for="(item, index) in vul.patch" :key="index">
          {{ item }}
          <br v-if="index !== vul.referUrl.length - 1" />
        </span>
      </el-descriptions-item>
    </el-descriptions>
  </new-drawer>
</template>
<script>
import { getVulLevelColor } from "../mixins/js/const";
export default {
  data() {
    return {
      vul: {}
    };
  },
  computed: {
    getVulLevelColor() {
      return str => {
        return getVulLevelColor(str);
      };
    }
  },
  methods: {
    show({ title, data }) {
      this.$refs["drawer"].show(title);
      this.$nextTick(() => {
        this.vul = data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.vul-title {
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
}
</style>
