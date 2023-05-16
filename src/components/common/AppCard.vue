<template>
  <div class="card">
    <!-- <i class="el-icon-caret-right" /> -->
    <div class="card__header">
      <slot v-if="$slots.header" name="header" />
      <div v-else class="card__header_default">
        <span style="font-size:20px;" class="title">{{ title }}</span>
      </div>
    </div>
    <div class="card__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  color: #333;
  position: relative;
  background-color: #fff;
  padding: 15px 0;
  .card__header {
    position: relative;
    padding: 0 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(234, 234, 234, 1);
    .title {
      position: relative;
      display: block;
      width: 100%;
      font-size: 18px;
      font-weight: 500;
      line-height: 1;
      padding-left: 10px;
      border-left: 3px solid rgba(69, 107, 234, 1);
    }
  }
  .card__body {
    position: relative;
    padding: 0 20px;
  }
}
</style>
