<template>
  <new-card class="card" title="搜索字段类型">
    <div class="search-field-type">
      <div class="field-type-class">
        <div class="tabs">
          <div class="head">字段类型</div>
          <div class="tab-list">
            <div
              class="tab"
              :class="{ active: activeIndex === index }"
              v-for="(item, index) in tabList"
              :key="index"
              @click="activeIndex = index"
            >
              {{ item.operatorType }}
            </div>
          </div>
        </div>
        <div class="content">
          <new-table height="100%" :columns="table.columns" :data="records" />
        </div>
      </div>
    </div>
  </new-card>
</template>

<script>
import { getOperators } from "@/api/search/advanced-search";
export default {
  data() {
    return {
      table: {
        columns: [
          {
            prop: "symbol",
            label: "支持的操作符"
          },
          {
            prop: "description",
            label: "操作符含义"
          }
        ]
      },
      tabList: [],
      activeIndex: 0
    };
  },
  created() {
    getOperators().then(res => {
      this.tabList = res.data.data || [];
    });
  },
  mounted() {},
  computed: {
    records() {
      return this.tabList[this.activeIndex]?.operators || [];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
@import "../mixins/style/fieldTypeTable.scss";
</style>
