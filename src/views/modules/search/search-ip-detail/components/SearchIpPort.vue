<template>
  <div class="ip-port">
    <div class="ip-port-title">
      开放端口列表
    </div>
    <div class="ip-port-container">
      <div v-for="(port, index) in ports" :key="index">
        <span @click="goPort(`#port${port}`)"> {{ port }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ports: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 端口转跳
    goPort(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ip-port {
  width: 888px;
  margin-bottom: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(183, 183, 183, 0.5);
  $titleHeight: 60px;
  .ip-port-title {
    height: $titleHeight;
    line-height: $titleHeight;
    font-weight: 600;
    padding-left: 20px;
    color: #4d5056;
    position: relative;
    border-bottom: 1px solid #eaeaea;
    &::before {
      content: "";
      position: absolute;
      width: 2px;
      height: 15px;
      background: #456bea;
      left: 12px;
      top: 21px;
    }
  }
  .ip-port-container {
    width: 100%;
    padding: 10px 13px;
    display: flex;
    flex-wrap: wrap;
    div {
      text-align: center;
      width: 130px;
      height: 40px;
      line-height: 40px;
      background: rgba(69, 107, 234, 0.51);
      border-radius: 3px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      margin: 8px 20px;
      cursor: pointer;
      a {
        color: white;
      }
    }
  }
}
</style>
