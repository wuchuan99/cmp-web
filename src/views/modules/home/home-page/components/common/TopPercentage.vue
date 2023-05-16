<template>
  <div class="topPercentage">
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="item.id">
        <div class="index" :style="getRankStyle(index)">{{ index + 1 }}</div>
        <div class="result">
          <div class="name">{{ item.name }}</div>
          <div class="percentage-box">
            <div
              class="percentage"
              :style="getStyle(item.percentage, index)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    getRankStyle(index) {
      switch (index) {
        case 0:
          return { backgroundColor: "#e22f33" };
        case 1:
          return { backgroundColor: "#e9a85b" };
        case 2:
          return { backgroundColor: "#3e9df8" };
        default:
          return { backgroundColor: "rgba(7, 177, 248, 0.2)" };
      }
    },
    getStyle(percentage, index) {
      let backgroundImage = "linear-gradient(to right, #214be0, #5da7e6)";
      if (index === 0) {
        backgroundImage = "linear-gradient(to right, #e82514, #eb9521)";
      }
      return { width: percentage + "%", backgroundImage };
    }
  }
};
</script>
<style lang="scss" scoped>
.topPercentage {
  height: 100%;
  .list {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    .item {
      display: flex;
      align-items: center;
      width: 100%;
      padding-left: 10px;
      .index {
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        color: rgba(255, 255, 255);
        border-radius: 2px;
        margin-right: 10px;
        font-size: 14px;
        flex-shrink: 0;
      }
      .result {
        flex: 1;
        .name {
          font-size: 12px;
          color: rgba(255, 255, 255);
        }
        .percentage-box {
          height: 8px;
          background-color: #061949;
          border-radius: 5px;
          margin-top: 2px;
          .percentage {
            height: 100%;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
