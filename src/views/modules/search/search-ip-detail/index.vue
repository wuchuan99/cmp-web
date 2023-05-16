<template>
  <!-- 基本信息 -->
  <div
    class="flex"
    style="padding:15px 0"
    v-if="$route.params.ip || id"
    v-loading="loading"
  >
    <!-- 资产台账详情页面调用 -->
    <slot name="deviceDescriptions"></slot>
    <div>
      <search-ip-basic
        :basic.sync="basic"
        :is-show-back="isShowBack"
      ></search-ip-basic>
      <search-ip-app :apps.sync="apps"></search-ip-app>
      <search-ip-service :services.sync="services"></search-ip-service>
      <search-ip-vul :vuls.sync="vuls"></search-ip-vul>
    </div>
    <div>
      <search-ip-map :mapObj.sync="mapObj"></search-ip-map>
      <search-ip-port :ports.sync="ports"></search-ip-port>
      <search-ip-banner :banners.sync="banners"></search-ip-banner>
    </div>
  </div>
</template>
<script>
import { getAssetDetail } from "@/api/search/search-ip";
import { getAssetDetailById } from "@/api/asset/asset-ledger";
import SearchIpBasic from "./components/SearchIpBasic";
import SearchIpMap from "./components/SearchIpMap";
import SearchIpService from "./components/SearchIpService";
import SearchIpVul from "./components/SearchIpVul";
import SearchIpPort from "./components/SearchIpPort.vue";
import SearchIpBanner from "./components/SearchIpBanner.vue";
import SearchIpApp from "./components/SearchIpApp.vue";

export default {
  components: {
    SearchIpBasic,
    SearchIpMap,
    SearchIpService,
    SearchIpVul,
    SearchIpPort,
    SearchIpBanner,
    SearchIpApp
  },
  props: {
    // 资产台账资产详情
    id: String,
    isShowBack: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    id(val) {
      if (val) {
        this.loading = true;
        val && this.getAssetInfo(getAssetDetailById, val);
      }
    }
  },
  data() {
    return {
      loading: false,
      detail: {
        countryName: "",
        domainName: "",
        ip: "",
        latitude: 0,
        longitude: 0,
        os: "",
        portNum: 0,
        regionName: "",
        serviceNum: 0,
        services: [],
        apps: [],
        updateTime: "",
        vulList: [],
        vulNum: 0
      }
    };
  },
  computed: {
    basic() {
      return {
        ...this.detail
      };
    },
    mapObj() {
      return {
        // 116.404, 39.928
        longitude: this.detail.longitude,
        latitude: this.detail.latitude
      };
    },
    // 应用
    apps() {
      return this.detail.apps;
    },
    // 服务
    services() {
      return this.detail.services;
    },
    // 漏洞
    vuls() {
      return this.detail.exploits || [];
    },
    // 端口
    ports() {
      return this.detail.services.map(item => item.port);
    },
    // banners
    banners() {
      this.detail.services.map(item => {
        item.ip = this.detail.ip;
      });
      return this.detail.services;
    }
  },
  methods: {
    getAssetInfo(method, value) {
      method(value)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.detail = res.data.data;
          }
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    }
  },
  created() {
    // 搜索引擎详情页
    const { ip } = this.$route.params;
    ip && this.getAssetInfo(getAssetDetail, ip);
  }
};
</script>
<style lang="scss" scoped>
.flex {
  flex-wrap: wrap;
}
</style>
