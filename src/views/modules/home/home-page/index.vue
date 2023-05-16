<template>
  <div class="home" :class="{ 'full-screen': isFullScreen }">
    <internet-exposed-area
      ref="internet-exposed-area"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <meeting-exposed-area
      ref="meeting-exposed-area"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <control-exposed-area
      ref="control-exposed-area"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <exposed-service-type
      ref="exposed-service-type"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <detection-top
      ref="warn-top"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <high-risk-detection-top
      ref="high-risk-asset-top"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <exposed-device-type
      ref="exposed-device-type"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <exposed-os-type
      ref="exposed-os-type"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <exposed-vendor-type
      ref="exposed-vendor-type"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <exposed-vul-type
      ref="exposed-vul-type"
      :animation="animation"
      :country="curCountryInfo"
      @over-load="init"
    />
    <earth
      ref="earth"
      class="home-earth"
      @resourcesComplete="resourcesComplete"
      @country-click="countryClick($event)"
      :class="{ show: dimension === 'three' }"
      @toggle-screen="toggleScreen"
    />
    <two-dimension-map
      class="home-map"
      v-if="dimension === 'two'"
      :country="curCountryInfo"
      @toggle="toggle"
    />
    <country-detail ref="country-detail" @toggle="toggle" />
  </div>
</template>
<script>
import InternetExposedArea from "./components/InternetExposedArea.vue";
import MeetingExposedArea from "./components/MeetingExposedArea.vue";
import ControlExposedArea from "./components/ControlExposedArea.vue";
import ExposedServiceType from "./components/ExposedServiceType.vue";
import DetectionTop from "./components/DetectionTop.vue";
import HighRiskDetectionTop from "./components/HighRiskDetectionTop.vue";
import ExposedDeviceType from "./components/ExposedDeviceType.vue";
import ExposedOsType from "./components/ExposedOsType.vue";
import ExposedVendorType from "./components/ExposedVendorType.vue";
import ExposedVulType from "./components/ExposedVulType.vue";
import earth from "./components/earth";
import map from "./components/map";
import CountryDetail from "./components/CountryDetail.vue";
export default {
  name: "homePage",
  components: {
    InternetExposedArea,
    MeetingExposedArea,
    ControlExposedArea,
    ExposedServiceType,
    DetectionTop,
    HighRiskDetectionTop,
    ExposedDeviceType,
    ExposedOsType,
    ExposedVendorType,
    ExposedVulType,
    earth,
    twoDimensionMap: map,
    CountryDetail
  },
  data() {
    return {
      animation: false,
      refs: [
        "warn-top",
        "high-risk-asset-top",
        "control-exposed-area",
        "internet-exposed-area",
        "meeting-exposed-area",
        "exposed-device-type",
        "exposed-service-type",
        "exposed-os-type",
        "exposed-vendor-type",
        "exposed-vul-type"
      ],
      dimension: "three",
      curCountryInfo: {},
      isFullScreen: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    resourcesComplete() {
      if (this.animation) return;
      this.animation = true;
      this.init();
    },
    init() {
      setTimeout(() => {
        for (const ref of this.refs) {
          if (!this.$refs?.[ref]) return;
          this.$refs[ref].initData &&
            this.$refs[ref].initData(this.curCountryInfo);
        }
      }, 2000);
    },
    countryClick(data) {
      this.$refs?.["country-detail"].show({ title: "详情", data });
    },
    toggle(data) {
      console.log(data);
      this.dimension = data?.dimension || "";
      this.curCountryInfo = data?.country || {};
    },
    toggleScreen() {
      this.isFullScreen = !this.isFullScreen;
      this.$nextTick(() => {
        this.$refs["earth"].resize();
        this.echartsResize();
      });
    },
    echartsResize() {
      for (const ref of this.refs) {
        if (!this.$refs?.[ref]) return;
        this.$refs[ref].resize && this.$refs[ref].resize();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: -webkit-calc(100% + 60px);
  height: calc(100% + 60px);
  -webkit-transform: translateY(-60px);
  transform: translateY(-60px);
  background: url("./mixins/images/bg.png") no-repeat center;
  background-size: 100% 100%;
  padding-top: 60px;
  position: relative;
  &.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    z-index: 2000;
  }
  .home-earth,
  .home-map {
    position: absolute;
    left: 0;
    top: -50px;
    z-index: 1;
    height: -webkit-calc(100% + 50px);
    height: calc(100% + 50px);
  }
  .home-map {
    z-index: 10;
  }
  .home-earth {
    opacity: 0;
    &.show {
      opacity: 1;
    }
  }
}
</style>
