<template>
  <div class="user-info">
    <div class="user-info-container" @click="handle('operateUserInfoDrawer')">
      <i class="icon-user"></i>
      <span @click="handle('operateUserInfoDrawer')">{{
        userInfo.username || ""
      }}</span>
    </div>
    <div class="logout" title="退出" @click="logout">
      <i class="el-icon-switch-button"></i>
    </div>
    <operate-user-info ref="operateUserInfoDrawer" />
  </div>
</template>
<script>
import { debounce } from "@/utils/common";
import { confirm } from "@/utils/element";
import OperateUserInfo from "./OperateUserInfo.vue";
export default {
  components: { OperateUserInfo },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    //用户信息
    userInfo() {
      return this.$store.state.user.userInfo?.user || {};
    }
  },
  methods: {
    handle: debounce(function(action, data) {
      const operate = {
        operateUserInfoDrawer: () => {
          this.$refs[action].show(data || {});
        }
      };
      operate[action] && operate[action]();
    }, 200),
    logout() {
      let theme = "";
      if (["homePage", "searchHome"].includes(this.$route.name)) {
        theme = "dark-blue";
      }
      confirm(
        "确定要退出吗?",
        () => {
          sessionStorage.clear();
          window.location.href = "http://172.18.69.21:8085";
        },
        null,
        theme
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.user-info {
  width: 250px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .user-info-container {
    cursor: pointer;
    span {
      margin-left: 10px;
    }
  }
  .logout {
    margin-left: 10px;
    .el-icon-switch-button {
      cursor: pointer;
      font-size: 18px;
    }
  }
}
</style>
