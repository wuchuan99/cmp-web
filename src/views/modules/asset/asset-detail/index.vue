<template>
  <div class="asset-detail">
    <device-descriptions :device="device" />
    <div class="ip-tabs">
      <el-radio-group class="radio-group" v-model="activeId" size="medium">
        <el-radio-button
          :label="item.id"
          v-for="item in ipList"
          :key="item.id"
          >{{ item.ip }}</el-radio-button
        >
      </el-radio-group>
    </div>
    <search-ip-detail
      :id.sync="activeId"
      :is-show-back="false"
    ></search-ip-detail>
  </div>
</template>
<script>
import { getIpMacs } from "@/api/asset/asset-ledger";
import SearchIpDetail from "@/views/modules/search/search-ip-detail/index.vue";
import DeviceDescriptions from "./components/DeviceDescriptions.vue";

export default {
  components: { SearchIpDetail, DeviceDescriptions },
  data() {
    return {
      ipList: [],
      device: {},
      activeId: ""
    };
  },
  // watch: {
  //   activeId(val) {
  //     val &&
  //       getIpMacs(val).then(res => {
  //         const { success, data } = res.data;
  //         if (success) {
  //           this.device = data.device;
  //         }
  //       });
  //   }
  // },
  methods: {
    getIpList(id) {
      getIpMacs(id).then(res => {
        const { success, data } = res.data;
        if (success) {
          this.ipList = data.ipMacs;
          this.activeId = this.ipList[0]["id"];
          data.device.os = data?.os;
          this.device = data.device;
        }
      });
    }
  },
  created() {
    const { id } = this.$route.params;
    id && this.getIpList(id);
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.asset-detail {
  padding: 25px 0;
  .ip-tabs {
    @include flex-start;
    @include shadow;
    padding: 15px 20px;
    background-color: white;
    .el-button {
      margin-right: 15px;
    }
  }
  :deep(.radio-group) {
    label {
      width: auto !important;
      margin: 0 !important;
      line-height: normal !important;
    }
  }
}
</style>
