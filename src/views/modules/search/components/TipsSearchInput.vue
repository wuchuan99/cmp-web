<template>
  <div class="tips-search-input" @click.stop>
    <el-input
      ref="input"
      type="text"
      v-model="keyword"
      placeholder="请搜索"
      @input="getCurTips"
      @focus="getCurTips"
    />
    <!-- 字段 -->
    <div
      class="fields-list"
      v-if="curTips === 'field' && fieldsList.length > 0"
      ref="fields-list"
    >
      <div
        v-for="(item, index) in fieldsList"
        :key="index"
        :class="[{ active: curIndex === index }, { tips: item.tips }]"
        class="fields-item"
        @click="fieldClick(item)"
        @mousemove="mousemove(index)"
      >
        <span>{{ item.field }}</span>
        <span>{{ item.fieldMeaning ? `（${item.fieldMeaning}）` : "" }}</span>
      </div>
    </div>
    <!-- 操作符 -->
    <div
      class="operators-list"
      v-else-if="curTips === 'operator' && operatorsList.length > 0"
    >
      <div
        v-for="(item, index) in operatorsList"
        :key="index"
        class="operators-item"
        :class="[{ active: curIndex === index }, { tips: item.tips }]"
        @click="operatorClick(item)"
        @mousemove="mousemove(index)"
      >
        <span>{{ item.symbol }}</span>
        <span>{{ item.description ? `（${item.description}）` : "" }}</span>
      </div>
    </div>
    <!-- 连接符 -->
    <div
      class="connects-list"
      v-else-if="curTips === 'connect' && connectsList.length > 0"
    >
      <div
        v-for="(item, index) in connectsList"
        :key="index"
        class="connects-item"
        :class="{ active: curIndex === index }"
        @click="connectClick(item)"
        @mousemove="mousemove(index)"
      >
        <span>{{ item.key }}</span>
        <span>{{ item.value ? `（${item.value}）` : "" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSearchFields,
  getOperators,
  getDict,
  getTips
} from "@/api/search/advanced-search";
import { operatorTypeAll } from "../mixins/const/advanced-search";
export default {
  props: {},
  data() {
    return {
      keyword: "",
      basisOperatorsList: [],
      basisFieldsList: [],
      curTips: "",
      operatorType: "",
      connectsList: [],
      tipsList: [],
      curIndex: -1
    };
  },
  watch: {
    keyword(newVal, oldVal) {
      if (!oldVal && !newVal.trim()) {
        return (this.keyword = "");
      }
      if (newVal.length > oldVal.length && newVal.endsWith("  ")) {
        return (this.keyword = oldVal);
      }
      this.compare(newVal, oldVal);
    },
    curTips() {
      this.curIndex = -1;
    },
    fieldsList(newVal, oldVal) {
      if (newVal.length !== oldVal.length) {
        this.curIndex = -1;
        if (this.$refs["fields-list"]) this.$refs["fields-list"].scrollTop = 0;
      }
    }
  },
  computed: {
    fieldsList() {
      if (this.curTips !== "field") return [];
      const index = this.getIndex();
      const value = this.ignoreparentheses(this.keyword.slice(index));
      if (value.trim()) {
        return this.basisFieldsList
          .concat(this.tipsList)
          .filter(item => item.field.includes(value.trim()));
      }
      return this.basisFieldsList;
    },
    operatorsList() {
      if (this.curTips !== "operator" || !this.operatorType) return [];
      const operatorsItem = this.basisOperatorsList.find(
        operators => operators.operatorType === this.operatorType
      );
      if (!operatorsItem) return [];
      const index = this.getIndex();
      const value = this.ignoreparentheses(this.keyword.slice(index));
      let tips = [];
      if (value.trim()) {
        tips = this.tipsList.filter(item => item.field.includes(value.trim()));
      }
      const operators = operatorsItem?.operators || [];
      return operators.concat(tips);
    },
    visible() {
      if (this.curTips === "field" && this.fieldsList.length > 0) return true;
      if (this.curTips === "operator" && this.operatorsList.length > 0)
        return true;
      if (this.curTips === "connect" && this.connectsList.length > 0)
        return true;
      return false;
    }
  },
  async created() {
    this.getTipsList();
    await this.getOperatorsList();
    this.getFieldList();
    this.getConnects();
  },
  mounted() {
    window.addEventListener("click", this.blurInput);
    window.addEventListener("keyup", this.keyup);
  },
  methods: {
    setKeyword(keyword) {
      if (typeof keyword === "string") {
        this.keyword = keyword;
      } else if (typeof keyword === "object") {
        if (this.keyword) {
          this.keyword += ` && ${keyword.field} : "${keyword.name}"`;
        } else {
          this.keyword = `${keyword.field} : "${keyword.name}"`;
        }
      }
    },
    compare(newVal, oldVal) {
      if (Math.abs(newVal.length - oldVal.length) !== 1) return;
      const symbols = new Map([["(", "()"]]);
      if (newVal.length > oldVal.length) {
        for (let i = 0; i < newVal.length; i++) {
          if (newVal.charAt(i) !== oldVal.charAt(i)) {
            if (newVal.slice(i - 1, i + 1) === symbols.get(newVal.charAt(i)))
              break;
            if (symbols.has(newVal.charAt(i))) {
              this.keyword =
                oldVal.slice(0, i) +
                symbols.get(newVal.charAt(i)) +
                oldVal.slice(i);
              setTimeout(() => {
                this.$refs.input.$refs.input.setSelectionRange(i + 1, i + 1);
              });
            }
            break;
          }
        }
      } else {
        for (let i = 0; i < oldVal.length; i++) {
          if (oldVal.charAt(i) !== newVal.charAt(i)) {
            if (symbols.has(oldVal.charAt(i))) {
              this.keyword = oldVal.slice(0, i) + oldVal.slice(i + 2);
              setTimeout(() => {
                this.$refs.input.$refs.input.setSelectionRange(i, i);
              });
            }
            break;
          }
        }
      }
    },
    isRegion(str) {
      const regionField = [
        "address.country.region_name",
        "address.province.region_name",
        "address.city.region_name"
      ];
      return regionField.some(field => str.includes(field));
    },
    getOperatorsList() {
      getOperators().then(res => {
        this.basisOperatorsList = res.data.data || [];
      });
    },
    getFieldList() {
      getSearchFields().then(res => {
        this.basisFieldsList = res.data.data || [];
      });
    },
    getConnects() {
      getDict("SearchUnionType").then(res => {
        this.connectsList = res.data.data || [];
      });
    },
    getTipsList() {
      getTips().then(res => {
        this.tipsList =
          res.data.data.map(item => ({
            tips: true,
            field: item.tip.replace(/\s+/g, " "),
            fieldMeaning: "",
            symbol: item.tip.replace(/\s+/g, " "),
            description: ""
          })) || [];
      });
    },
    getIndex() {
      let index = -1;
      for (const item of [" || ", " && "]) {
        if (index < this.keyword.lastIndexOf(item)) {
          index = this.keyword.lastIndexOf(item);
        }
      }
      return index === -1 ? 0 : index + 4;
    },
    fieldClick(item) {
      this.setField(item);
      this.operatorType = "";
      this.$refs.input.focus();
      this.setCursorLocation();
    },
    setField(item) {
      const index = this.getIndex();
      let value = this.keyword.slice(0, index);
      let str = this.keyword.slice(index);
      if (this.isParentheses(str)) {
        this.keyword =
          value + "(" + item.field + this.keyword.slice(this.findEndIndex());
      } else {
        if (str.endsWith(")")) {
          this.keyword =
            value + item.field + this.keyword.slice(this.findEndIndex());
        } else {
          this.keyword = value + item.field;
        }
      }
    },
    findEndIndex() {
      let index = this.keyword.length - 1;
      for (let i = this.keyword.length - 1; i > 0; i--) {
        if (this.keyword.charAt(i) === ")") {
          index = i;
        } else {
          break;
        }
      }
      return index;
    },
    setCursorLocation() {
      const index = this.getIndex();
      let str = this.keyword.slice(index);
      let location = this.keyword.length;
      if (this.ignoreparentheses(str).endsWith('""')) {
        const indx = str.indexOf('""', -1);
        if (indx > 0) {
          location = indx + 1 + index;
        }
      } else if (str.endsWith(")")) {
        location = this.findEndIndex();
      }
      setTimeout(() => {
        this.$refs.input.$refs.input.setSelectionRange(location, location);
      });
    },
    isParentheses(str) {
      return str.startsWith("(") && str.endsWith(")");
    },
    getCurTips() {
      if (this.keyword.endsWith("  ")) return;
      const index = this.getIndex();
      let value = this.ignoreparentheses(this.keyword.slice(index));
      if (!value.trim()) {
        return (this.curTips = "field");
      }
      const symbols = operatorTypeAll
        .filter(it => it.needValue)
        .map(it => it.symbol);
      if (value.endsWith(" ")) {
        if (symbols.some(it => value.endsWith(it + " "))) {
          this.curTips = "";
        } else {
          this.curTips = "connect";
        }
      } else {
        const curField = this.basisFieldsList.find(it => it.field === value);
        const curOperators = this.basisOperatorsList.find(
          it => it.operatorType === curField?.fieldType
        );
        this.operatorType = curOperators?.operatorType || "";
        if (this.operatorType) {
          this.curTips = "operator";
        } else {
          const tip = this.tipsList.find(it => it.field === value);
          if (tip) {
            this.curTips = "";
          } else {
            this.curTips = "field";
          }
        }
      }
    },
    ignoreparentheses(value) {
      return value.replace(/\(|\)/g, "");
    },
    operatorClick(item) {
      console.log(item);
      item.tips ? this.setField(item) : this.setOperator(item);
      this.$refs.input.focus();
      this.setCursorLocation();
    },
    setOperator(item) {
      const index = this.getIndex();
      let str = this.keyword.slice(index);
      if (this.isParentheses(str)) {
        this.keyword =
          this.keyword.slice(0, this.findEndIndex()) +
          " " +
          item.symbol +
          " " +
          (item.needValue ? '""' : "") +
          this.keyword.slice(this.findEndIndex());
      } else {
        if (str.endsWith(")")) {
          this.keyword =
            this.keyword.slice(0, this.findEndIndex()) +
            " " +
            item.symbol +
            " " +
            (item.needValue ? '""' : "") +
            this.keyword.slice(this.findEndIndex());
        } else {
          this.keyword +=
            " " + item.symbol + " " + (item.needValue ? '""' : "");
        }
      }
    },
    connectClick(item) {
      console.log(item);
      const index = this.getIndex();
      let str = this.keyword.slice(index);
      if (this.isParentheses(str)) {
        this.keyword =
          this.keyword.slice(0, this.findEndIndex()) +
          item.key +
          " " +
          this.keyword.slice(this.findEndIndex());
      } else {
        if (str.endsWith(")")) {
          this.keyword =
            this.keyword.slice(0, this.findEndIndex()) +
            item.key +
            " " +
            this.keyword.slice(this.findEndIndex());
        } else {
          this.keyword += item.key + " ";
        }
      }
      this.$refs.input.focus();
      this.setCursorLocation();
    },
    blurInput() {
      this.curTips = "";
    },
    keyup(e) {
      if (!this.visible) return;
      const { list, method } = this.getInfo();
      switch (e.keyCode) {
        case 13:
          if (this.curIndex > -1 && method) {
            this.$refs.input.blur();
            this[method](list[this.curIndex]);
          }
          break;
        case 38:
          if (this.curIndex >= 0) this.curIndex--;
          this.setScrollLocation();
          e.preventDefault();
          break;
        case 40:
          if (this.curIndex < list.length - 1) this.curIndex++;
          this.setScrollLocation();
          e.preventDefault();
          break;
        default:
          break;
      }
    },
    getInfo() {
      switch (this.curTips) {
        case "field":
          return { list: this.fieldsList, method: "fieldClick" };
        case "operator":
          return { list: this.operatorsList, method: "operatorClick" };
        case "connect":
          return { list: this.connectsList, method: "connectClick" };
        default:
          return { list: [], method: "" };
      }
    },
    setScrollLocation() {
      if (this.$refs["fields-list"]) {
        const containter = this.$refs["fields-list"];
        const top = containter.scrollTop;
        const containterHeight = containter.clientHeight;
        const item = containter.querySelector(".fields-item");
        const itemHeight = item.clientHeight;
        if (top + containterHeight < (this.curIndex + 1) * itemHeight) {
          this.$refs["fields-list"].scrollTop += itemHeight;
        } else if (top > this.curIndex * itemHeight) {
          this.$refs["fields-list"].scrollTop -= itemHeight;
        }
      }
    },
    mousemove(index) {
      this.curIndex = index;
    }
  },
  beforeDestroy() {
    window.removeEventListener("click", this.blurInput);
    window.removeEventListener("keyup", this.keyup);
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.tips-search-input {
  position: relative;
  :deep(.el-input) {
    height: 100%;
    .el-input__inner {
      background-color: transparent;
      border: 0;
      height: 100%;
      font-size: 16px;
      font-weight: 400;
      color: #e2d3d3;
      transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  .fields-list,
  .operators-list,
  .connects-list {
    overflow: auto;
    @include scroll;
    color: #fff;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    max-height: 300px;
    z-index: 10;
    background-color: #021a56;
    .fields-item,
    .operators-item,
    .connects-item {
      padding: 0 15px;
      text-align: left;
      line-height: 30px;
      cursor: pointer;
      &.tips {
        color: #e2d3d3;
      }
      &.active {
        background-color: #1b3f9a;
      }
    }
  }
}
</style>
