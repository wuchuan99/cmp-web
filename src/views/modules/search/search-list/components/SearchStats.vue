<template>
  <div class="search-stats">
    <div class="country-stats">
      <div class="stats-title">国家统计</div>
      <div class="stats-tree" v-show="regionList?.length">
        <el-tree
          ref="tree"
          node-key="key"
          :data="regionList"
          empty-text=" "
          :props="{ children: 'children', label: 'key' }"
          :expand-on-click-node="false"
        >
          <div
            class="stats-tree-item"
            slot-scope="{ node, data }"
            @click="handle('nodeClick', node)"
          >
            <span>{{ node.label }}</span>
            <span>{{ data.value }}</span>
          </div>
        </el-tree>
      </div>
      <div class="stats-map" id="map-chart" v-show="regionList?.length"></div>
    </div>
    <div class="device-stats">
      <div class="stats-title">设备统计</div>
      <div class="stats-list">
        <div
          class="stats-item"
          v-for="device in deviceList"
          :key="device.key"
          tabindex="-1"
          @click="
            handle('statsItemClick', {
              item: device,
              field: 'device.name'
            })
          "
        >
          <span :title="device.key">{{ device.key }}</span>
          <span>{{ device.value }}</span>
        </div>
      </div>
    </div>
    <div class="service-stats">
      <div class="stats-title">服务统计</div>
      <div class="stats-list">
        <div
          class="stats-item"
          v-for="service in serviceList"
          :key="service.key"
          tabindex="-1"
          @click="
            handle('statsItemClick', {
              item: service,
              field: 'device.service'
            })
          "
        >
          <span>{{ service.key }}</span>
          <span>{{ service.value }}</span>
        </div>
      </div>
    </div>
    <div class="os-stats">
      <div class="stats-title">操作系统统计</div>
      <div class="stats-list">
        <div
          class="stats-item"
          v-for="os in osList"
          :key="os.key"
          tabindex="-1"
          @click="
            handle('statsItemClick', {
              item: os,
              field: 'device.os'
            })
          "
        >
          <span>{{ os.key }}</span>
          <span>{{ os.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDeviceStats,
  getOsStats,
  getRegionStats,
  getServiceStats
} from "@/api/search/search-list";
import WorldMap from "../mixins/js/map-chart";
import EventBus from "@/utils/event-bus";
import { debounce } from "@/utils/common";

const fieldMap = new Map([
  [1, "address.country.region_name"],
  [2, "address.province.region_name"],
  [3, "address.city.region_name"]
]);
export default {
  data() {
    return {
      deviceList: [],
      osList: [],
      regionList: [],
      serviceList: [],
      map: null,
      mapList: [],
      search: null,
      currentKey: null,
      expandedKey: []
    };
  },
  computed: {
    postObj() {
      return {
        search: this.search
      };
    }
  },
  watch: {
    search: {
      handler() {
        this.statsInit();
      }
    }
  },
  methods: {
    handle: debounce(function(action, data) {
      this[action] && this[action](data);
    }, 200),
    statsItemClick({ item, field }) {
      EventBus.$emit("search-change", {
        field,
        name: item.key
      });
    },
    nodeClick(node) {
      console.log(node);
      const { level, data } = node;
      this.currentKey = data.key;
      const field = fieldMap.get(level) || "";
      EventBus.$emit("search-change", {
        field,
        name: data.key
      });
    },
    getExpandedKey() {
      if (!this.currentKey) return [];
      const curNode = this.$refs.tree.getNode(this.currentKey);
      if (curNode) {
        const parentNode = curNode?.parent;
        if (parentNode?.data?.key) return [parentNode.data.key];
        else this.foldTree();
      }
      return [];
    },
    // 折叠所有节点
    foldTree() {
      const nodes = this.$refs.tree.store._getAllNodes();
      for (const node of nodes) {
        node.expanded = false;
      }
    },
    // 设备统计
    getDeviceList() {
      getDeviceStats(this.postObj).then(res => {
        if (res.data.success) {
          this.deviceList = res.data.data.datas;
        }
      });
    },
    // 操作系统
    getOsList() {
      getOsStats(this.postObj).then(res => {
        if (res.data.success) this.osList = res.data.data.datas;
      });
    },
    // 地区统计
    getRegionList() {
      getRegionStats(this.postObj).then(res => {
        if (res.data.success) this.regionList = res.data.data?.datas || [];
        this.mapList = this.regionList.map(region => {
          return {
            name: region.key,
            value: region.value
          };
        });
        // this.$nextTick(() => {
        //   this.$refs.tree.setCurrentKey(this.currentKey);
        //   this.expandedKey = this.getExpandedKey();
        // });
        if (this.map) this.map.updateData(this.mapList);
        else
          setTimeout(() => {
            this.map = new WorldMap("map-chart", { data: this.mapList });
          });
      });
    },
    // 服务排名
    getServiceList() {
      getServiceStats(this.postObj).then(res => {
        if (res.data.success) this.serviceList = res.data.data.datas;
      });
    },
    // 初始化数据
    statsInit() {
      this.getDeviceList();
      this.getOsList();
      this.getRegionList();
      this.getServiceList();
    },
    setSearch(search) {
      this.search = search;
    }
  },
  created() {},
  activated() {
    if (this.map) this.map.resize();
  },
  beforeDestroy() {
    if (this?.map) {
      this.map.clear();
      this.map = null;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../mixins/styles/search-stats.scss";
</style>
