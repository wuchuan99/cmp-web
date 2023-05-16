<template>
  <div class="ip-map">
    <div class="ip-map-title">
      地理位置
    </div>
    <div class="ip-map-container">
      <div id="map"></div>
    </div>
  </div>
</template>
<script>
import { mapInit } from "../mixins/js/map";
export default {
  props: {
    mapObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = mapInit({ id: "map", ...this.mapObj });
  },
  beforeDestroy() {
    console.log("----销毁地图----", this.map);
    this.map && this.map.destroy();
  }
};
</script>
<style lang="scss" scoped>
.ip-map {
  width: 888px;
  height: 343px;
  margin-bottom: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(183, 183, 183, 0.5);
  $titleHeight: 60px;
  .ip-map-title {
    height: $titleHeight;
    line-height: $titleHeight;
    font-weight: 600;
    padding-left: 20px;
    color: #4d5056;
    position: relative;
    border-bottom: 1px solid #eaeaea;
    &::before {
      content: "";
      position: absolute;
      width: 2px;
      height: 15px;
      background: #456bea;
      left: 12px;
      top: 21px;
    }
  }
  .ip-map-container {
    width: 100%;
    height: calc(100% - $titleHeight);
    padding: 10px 16px;
    #map {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
<style>
/* .BMap_cpyCtrl,
.anchorBL
 {
  display: none;
} */
</style>
