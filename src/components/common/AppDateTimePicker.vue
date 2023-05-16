<template lang="html">
  <div>
    <el-date-picker
      v-model="time"
      placeholder="选择日期时间"
      @change="changeTime"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!--:picker-options="pickerOptions"-->
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Array],
      default: ""
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    dateTime: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const data = new Date();
              const dataTwo = new Date(data.toLocaleDateString());
              dataTwo.setTime(dataTwo.getTime());
              picker.$emit("pick", dataTwo);
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              console.log(date.removeYears);
              picker.$emit("pick", date.removeDays(1));
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", date.removeWeeks(1));
            }
          },
          {
            text: "一个月前",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", date.removeMonths(1));
            }
          },
          {
            text: "三个月前",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", date.removeMonths(3));
            }
          },
          {
            text: "半年前",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", date.removeMonths(6));
            }
          },
          {
            text: "一年前",
            onClick(picker) {
              const date = new Date();
              picker.$emit("pick", date.removeYears(1));
            }
          }
        ]
      }
    };
  },
  computed: {
    time: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    changeTime(val) {
      this.$emit("change", val);
    }
  }
};
</script>

<style lang="css"></style>
