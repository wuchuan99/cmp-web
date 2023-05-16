<template>
  <animated-number
    :value="value"
    :formatValue="formatToPrice"
    :duration="1000"
  ></animated-number>
</template>
<script>
import AnimatedNumber from "animated-number-vue";
export default {
  components: { AnimatedNumber },
  computed: {
    formatToPrice() {
      return value => {
        return `${value.toFixed(this.fix)}`;
      };
    }
  },
  props: {
    // 数值
    value: {
      type: Number,
      default: 0
    },
    // 动画时长
    duration: {
      type: Number,
      default: 1000
    },
    // toFixed 位数
    fix: {
      type: Number,
      default: 0
    }
  }
};
</script>
