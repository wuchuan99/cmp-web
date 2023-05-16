<template>
  <div class="ip-basic">
    <div class="ip-name">
      <i class="el-icon-back" @click="$router.go(-1)" v-if="isShowBack"></i>
      <span>{{ basic["ip"] }}</span>
    </div>
    <div class="ip-stats">
      <div class="flex">
        <img src="../mixins/images/port.png" alt="" />
        <div>
          <div>端口数</div>
          <div>{{ basic["portNum"] }}</div>
        </div>
      </div>
      <div class="flex">
        <img src="../mixins/images/service.png" alt="" />
        <div>
          <div>服务数</div>
          <div>{{ basic["portNum"] }}</div>
        </div>
      </div>
      <div class="flex">
        <img src="../mixins/images/app.png" alt="" />
        <div>
          <div>应用数</div>
          <div>{{ basic["portNum"] }}</div>
        </div>
      </div>
      <div class="flex">
        <img src="../mixins/images/vul.png" alt="" />
        <div>
          <div>漏洞数</div>
          <div>{{ basic["portNum"] }}</div>
        </div>
      </div>
    </div>
    <div class="ip-items">
      <div v-for="item in itemList" :key="item.img" class="ip-item">
        <img :src="getImg(item.img)" alt="" />
        <!-- <img :src="`../mixins/images/${item.img}.png`" alt="" /> -->
        <span>{{ item.name }}：</span>
        <span :title="item.value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    basic: { type: Object, required: true },
    isShowBack: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getImg() {
      return img => {
        return require(`../mixins/images/${img}.png`);
      };
    },
    itemList() {
      const basic = this.basic;
      return [
        {
          name: "位置",
          value: `${basic.address}`,
          img: "location"
        },
        {
          name: "经纬度",
          value: `(${basic.longitude},${basic.latitude})`,
          img: "website"
        },
        { name: "操作系统", value: this.basic.os, img: "type" },
        { name: "更新时间", value: this.basic.updateTime, img: "time" },
        { name: "Mac", value: this.basic.mac, img: "product" }
      ];
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.ip-basic {
  margin-right: 10px;
  width: 701px;
  // height: 200px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(188, 188, 188, 0.5);
  padding: 10px 15px 15px;
  .ip-name {
    // width: 189px;
    height: 42px;
    font-size: 26px;
    // font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #4d5056;
    line-height: 47px;
    i {
      cursor: pointer;
      font-weight: 700;
      margin-right: 10px;
    }
  }
  .ip-stats {
    display: flex;
    padding: 20px 0 0 0;
    .flex {
      width: 188px;
      img {
        margin-right: 25px;
      }
      & > div {
        height: 25px;
        font-size: 17px;
        font-weight: 600;
        color: #4e5056;
        line-height: 25px;
      }
    }
  }
  .ip-items {
    margin-top: 20px;
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: rgba(222, 230, 253, 0.23);
    .ip-item {
      height: 42px;
      line-height: 42px;
      width: calc(50% - 5px);
      position: relative;
      display: flex;
      align-items: center;
      &:nth-of-type(2n + 1) {
        margin-right: 10px;
      }
      img {
        margin-right: 12px;
        position: relative;
        top: 2px;
        flex-shrink: 0;
      }
      span:nth-of-type(1) {
        // width: 50px;
        font-size: 16px;
        font-weight: 600;
        color: #4d5056;
        flex-shrink: 0;
      }
      span:nth-of-type(2) {
        flex: 1;
        font-size: 16px;
        font-weight: 400;
        color: #4d5056;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
