<template>
  <div class="untils">
    <div class="back" @click="goBack">
      <i class="el-icon-back"></i>
      <span>{{ countryName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countryName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$emit("go-back");
    }
  }
};
</script>
<style lang="scss" scoped>
.untils {
  display: flex;
  flex-flow: column;
  align-items: center;
  position: absolute;
  right: 425px;
  bottom: calc((100% - 218px) / 3 + 10px);
  .back {
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    color: #ffffff;
    cursor: pointer;
    font-size: 18px;
    i {
      margin-right: 10px;
      font-size: 20px;
    }
  }
}
</style>
