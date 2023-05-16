<template>
  <div v-show="visible">
    <div class="search-text" v-show="search">
      <span>搜索语句：</span>
      <span :title="search">{{ search }}</span>
      <span @click="handle('copySearch')">复制</span>
    </div>
    <div class="list" :class="{ scroll: searchUnions.length >= 4 }">
      <el-row
        class="item"
        v-for="(item, index) in searchUnions"
        :key="item.id"
        :gutter="10"
      >
        <el-col :span="3" :offset="getNeedValue(item) ? 0 : 8">
          <new-select
            style="width: 100%"
            :option.sync="item.searchFieldQuery.connect"
            :optionList="connectsList"
            :popper-class="popperClass"
            filterable
            :class="{ hidden: index === 0 }"
          />
        </el-col>
        <el-col :span="7">
          <new-select
            style="width: 100%"
            :option.sync="item.searchFieldQuery.field"
            :optionList="fieldsList"
            :popper-class="popperClass"
            filterable
            :disabled="index !== 0 && !item.searchFieldQuery.connect"
            @change="fieldChange(item, $event)"
            @visible-change="selectVisibleChange"
          />
        </el-col>
        <el-col :span="3">
          <new-select
            style="width: 100%"
            :option.sync="item.searchFieldQuery.operator"
            :optionList="item.operatorsList"
            filterable
            :popper-class="popperClass"
            :disabled="!item.searchFieldQuery.field"
            @change="item.searchFieldQuery.value = ''"
            @visible-change="selectVisibleChange"
          />
        </el-col>
        <el-col :span="8" v-if="getNeedValue(item)">
          <el-input
            size="medium"
            v-model="item.searchFieldQuery.value"
            placeholder="请输入"
            maxlength="32"
            style="width: 100%"
            :disabled="!item.searchFieldQuery.operator"
          ></el-input>
        </el-col>
        <el-col class="operator" :span="3">
          <i class="el-icon-plus" @click="add" v-if="index === 0"></i>
          <i class="el-icon-minus" @click="del(index)" v-else></i>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10">
      <el-col class="search-btn" :span="10" :offset="11">
        <new-button @click="close">关闭</new-button>
        <new-button margin @click="handle('search')">检索</new-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { guid, debounce, copy } from "@/utils/common";
import { deepClone } from "@/utils/object";
import { operatorTypeAll } from "../mixins/const/advanced-search";
import {
  getSearchFields,
  getOperators,
  getDict,
  advanceToQuery
} from "@/api/search/advanced-search";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    popperClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchUnions: [
        {
          id: guid(),
          searchFieldQuery: {
            field: "",
            operator: "",
            value: "",
            connect: ""
          },
          operatorsList: []
        }
      ],
      basisFieldsList: [],
      fieldsList: [],
      basisOperatorsList: [],
      connectsList: [],
      selectVisible: false
    };
  },
  computed: {
    addDisabled() {
      for (let i = 0; i < this.searchUnions.length; i++) {
        const item = this.searchUnions[i];
        if (i !== 0 && !item.searchFieldQuery.connect) return true;
        if (!item.searchFieldQuery.field) return true;
        if (!item.searchFieldQuery.operator) return true;
        if (this.getNeedValue(item) && !item.searchFieldQuery.value)
          return true;
      }
      return false;
    },
    search() {
      let str = "";
      for (let i = 0; i < this.searchUnions.length; i++) {
        const item = this.searchUnions[i];
        const connectStr = item.searchFieldQuery.connect
          ? " " + item.searchFieldQuery.connect + " "
          : "";
        const fieldStr = item.searchFieldQuery.field;
        const operatorStr = item.searchFieldQuery.operator
          ? " " +
            item.searchFieldQuery.operator +
            (this.getNeedValue(item) ? " " : "")
          : "";
        const valueStr =
          item.searchFieldQuery.operator && this.getNeedValue(item)
            ? '"' + item.searchFieldQuery.value + '"'
            : "";
        str += connectStr + fieldStr + operatorStr + valueStr;
      }
      return str;
    }
  },
  async created() {
    await this.getOperatorsList();
    this.getFieldList();
    this.getConnects();
  },
  mounted() {},
  methods: {
    handle: debounce(function(action) {
      const operate = {
        search: () => {
          if (this.selectVisible) return;
          this.$emit("sure", this.search);
        },
        copySearch: () => {
          copy(this.search);
        }
      };
      operate[action] && operate[action]();
    }, 200),
    paramsToString() {
      const params = deepClone(this.searchUnions);
      for (const item of params) {
        delete item.symbolList;
      }
      return advanceToQuery({ searchUnions: params.reverse() });
    },
    getOperatorsList() {
      getOperators().then(res => {
        this.basisOperatorsList = res.data.data || [];
      });
    },
    selectVisibleChange(val) {
      if (val) {
        this.selectVisible = true;
      } else {
        setTimeout(() => {
          this.selectVisible = val;
        }, 500);
      }
    },
    getFieldList() {
      getSearchFields().then(res => {
        this.basisFieldsList = res.data.data || [];
        this.fieldsList =
          res.data.data.map(item => ({
            label: item.field,
            value: item.field,
            slot: true,
            html: `<span>${item.field}</span>
                  <span>（${item.fieldMeaning}）</span>`
          })) || [];
      });
    },
    fieldChange(item, val) {
      item.searchFieldQuery.operator = "";
      item.searchFieldQuery.value = "";
      const fieldItem = this.basisFieldsList.find(it => it.field === val);
      if (!fieldItem) return (item.operatorsList = []);
      const operatorsItem = this.basisOperatorsList.find(
        operators => operators.operatorType === fieldItem.fieldType
      );
      if (!operatorsItem) return (item.operatorsList = []);
      item.operatorsList = operatorsItem.operators.map(item => ({
        label: item.symbol,
        value: item.symbol,
        slot: true,
        html: `<span>${item.symbol}</span>
              <span>（${item.description}）</span>`
      }));
    },
    getConnects() {
      getDict("SearchUnionType").then(res => {
        this.connectsList =
          res.data.data.map(item => ({
            label: item.key,
            value: item.key,
            slot: true,
            html: `<span>${item.key}</span>
                  <span>（${item.value}）</span>`
          })) || [];
      });
    },
    getNeedValue(item) {
      const operatorItem = operatorTypeAll.find(
        it => it.symbol === item.searchFieldQuery.operator
      );
      if (operatorItem) return operatorItem.needValue;
      else return true;
    },
    add() {
      const item = {
        id: guid(),
        searchFieldQuery: {
          field: "",
          operator: "",
          value: "",
          connect: ""
        },
        operatorsList: []
      };
      this.searchUnions.push(item);
    },
    del(index) {
      this.searchUnions.splice(index, 1);
    },
    close() {
      this.$emit("update:visible", false);
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss">
.advanced-search-home {
  &.el-select-dropdown {
    background: #021a56;
    border: 0;
    .el-scrollbar {
      .el-select-dropdown__wrap {
        .el-scrollbar__view {
          .el-select-dropdown__item {
            color: #fff;
            &.selected {
              background: #1b3f9a;
            }
            &.hover,
            &:hover {
              background: #1b3f9a;
            }
          }
        }
      }
    }
    .popper__arrow {
      border-bottom-color: #021a56;
      &::after {
        border-bottom-color: #021a56;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.advanced-search {
  .search-text {
    color: #ddd7d7;
    text-align: left;
    padding-left: 2px;
    span:nth-of-type(1) {
      font-size: 13px;
      line-height: 20px;
      vertical-align: bottom;
    }
    span:nth-of-type(2) {
      display: inline-block;
      max-width: 842px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 20px;
      vertical-align: bottom;
    }

    span:nth-of-type(3) {
      font-size: 13px;
      line-height: 20px;
      vertical-align: bottom;
      margin-left: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
  .list {
    margin-top: 10px;
    position: relative;
    margin-bottom: 12px;
    max-height: 180px;
    &.scroll {
      overflow: auto;
      @include scroll;
    }
    .item {
      margin-left: 0 !important;
      margin-right: 0 !important;
      margin-bottom: 15px;
      &:last-of-type {
        margin-bottom: 0;
      }
      .operator {
        text-align: left;
        i {
          font-size: 24px;
          cursor: pointer;
          line-height: 36px;
          &:first-of-type {
            margin-right: 10px;
          }
        }
      }
      .hidden {
        visibility: hidden;
      }
    }
  }

  .search-btn {
    text-align: right;
  }
}
</style>
