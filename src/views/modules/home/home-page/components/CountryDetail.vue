<template>
  <new-drawer
    ref="drawer"
    custom-class="dark-blue"
    :buttons="false"
    :size="400"
    @close="handle({ action: 'close' })"
  >
    <div class="content">
      <div class="name">{{ countryData.name }}</div>
      <div class="info">
        <div class="longitude">
          <span>经度：</span>
          <span>{{ countryData.E }}</span>
        </div>
        <div class="latitude">
          <span>纬度：</span>
          <span>{{ countryData.N }}</span>
        </div>
      </div>
      <div
        class="goDetail"
        @click="handle({ action: 'goDetail' })"
        v-show="countryData.country === 'China'"
      >
        {{ countryData.name }}地图展示
      </div>
      <new-table
        style="margin-top: 15px;max-height: 624px"
        :border="true"
        :columns="table.columns"
        :data="records"
        :loading="loading"
      />
    </div>
  </new-drawer>
</template>

<script>
import { debounce } from "@/utils/common";
import { deepClone } from "@/utils/object";
import { getRegionMap } from "@/api/home";
export default {
  data() {
    return {
      countryData: {},
      table: {
        columns: [
          {
            prop: "name",
            label: "地区"
          },
          {
            prop: "count",
            label: "资产数",
            render: scope => (
              <span
                style="cursor: pointer"
                onclick={() =>
                  this.handle({ action: "goSearchDetail", data: scope.row })
                }
              >
                {scope.row.count}
              </span>
            )
          }
        ]
      },
      records: [],
      loading: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    handle: debounce(function({ action, data }) {
      this[action] && this[action](data);
    }, 200),
    show(object) {
      const { title, data } = object;
      this.$refs["drawer"].show(title);
      // console.log(data);
      this.$nextTick(() => {
        this.countryData = data;
        this.getDetail();
      });
    },
    getDetail() {
      this.loading = true;
      const params = { regionId: this.countryData.regionId, topN: 500 };
      getRegionMap(params).then(res => {
        const { success, data } = res?.data;
        if (success) {
          this.loading = false;
          this.records = data?.datas || [];
          if (this.records?.length) {
            this.records.push({
              name: "总资产数",
              count: data?.info?.count || 0
            });
          }
        }
      });
    },
    goDetail() {
      this.$emit("toggle", {
        dimension: "two",
        country: {
          ...this.countryData,
          mapData: this.records ? deepClone(this.records) : []
        }
      });
      this.$refs["drawer"].close();
    },
    goSearchDetail(row) {
      if (row.num > 0) {
        console.log(row);
      }
    },
    close() {
      this.records = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  color: #d7d7d7;
  .name {
    font-size: 26px;
    margin-bottom: 10px;
  }
  .info {
    width: 100%;
    display: flex;
    align-items: center;
    .latitude {
      margin-left: 20px;
    }
  }
  .goDetail {
    cursor: pointer;
    color: #00b4ff;
    margin-top: 10px;
  }
}
</style>
