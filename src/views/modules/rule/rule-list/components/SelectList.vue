<template>
  <div class="select-list">
    <div class="item" v-for="(item, index) in list" :key="item.id">
      <el-row :gutter="10">
        <el-col :span="5" style="height: 36px">
          <new-select
            v-if="index !== 0"
            style="width: 100%"
            :option.sync="item.operator"
            :optionList="operatorList"
          />
        </el-col>
        <el-col :span="7">
          <new-select
            style="width: 100%"
            :option.sync="item.type"
            :optionList="typeList"
            @change="typeChange(item, $event)"
          />
        </el-col>
        <el-col :span="7">
          <input-element :option="item.option" :model="item" />
        </el-col>
        <el-col :span="5" style="line-height: 36px">
          <span
            style="margin-right: 10px;color: #135BD2;cursor: pointer;"
            @click="add"
            >添加</span
          >
          <span
            style="color: #f56c6c;cursor: pointer;"
            v-if="index !== 0"
            @click="del(index)"
            >删除</span
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { operators, types } from "@/const/rules";
import { mapToSelectionOptions } from "@/utils/object";
import { guid } from "@/utils/common";
import { elelemtOptions } from "../mixins/js/selectList";
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      operatorList: mapToSelectionOptions(operators),
      typeList: mapToSelectionOptions(types)
    };
  },
  computed: {
    list: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    add() {
      const item = {
        id: guid(),
        operator: 1,
        type: 1,
        content: ""
      };
      item.option = elelemtOptions.get(item.type);
      this.list.push(item);
    },
    del(index) {
      this.list.splice(index, 1);
    },
    typeChange(item, val) {
      if ([6, 13].includes(val)) item.content = [];
      else item.content = "";
      item.option = elelemtOptions.get(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.select-list {
  .item {
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
