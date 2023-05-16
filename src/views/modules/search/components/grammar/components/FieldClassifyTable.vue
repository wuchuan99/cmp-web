<template>
  <new-card class="card" title="搜索字段说明">
    <div class="search-field-classify">
      <div class="field-classify-class">
        <div class="tabs">
          <div class="head">字段分类</div>
          <div class="tab-list">
            <div
              class="tab"
              :class="{ active: activeIndex === index }"
              v-for="(item, index) in tabList"
              :key="index"
              @click="activeIndex = index"
            >
              {{ item.classification }}
            </div>
          </div>
        </div>
        <div class="content">
          <new-table
            :columns="table.columns"
            :data="records"
            style="height: 100%"
          />
        </div>
      </div>
    </div>
  </new-card>
</template>

<script>
import { getSearchGrammar } from "@/api/search/search-grammar";
export default {
  data() {
    return {
      table: {
        columns: [
          {
            prop: "field",
            label: "字段名称"
          },
          {
            prop: "fieldType",
            label: "字段类型",
            width: 80
          },
          {
            prop: "fieldMeaning",
            label: "字段含义"
          }
        ]
      },
      tabList: [],
      activeIndex: 0
    };
  },
  created() {
    getSearchGrammar().then(res => {
      this.tabList = res.data.data || [];
    });
  },
  mounted() {},
  computed: {
    records() {
      return this.tabList[this.activeIndex]?.searchFields || [];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
@import "../mixins/style/fieldClassifyTable.scss";
</style>
