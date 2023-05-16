<!-- oauth2认证后路由重定向到此页面 只加载一次 页面刷新也不更新-->
<template>
  <div></div>
</template>
<script>
import { mapActions } from "vuex";
// import { getMenuList } from "@/router/permission";
export default {
  methods: {
    ...mapActions("login", ["setToken"])
  },
  created() {
    const { token } = this.$route.query;
    token && this.setToken(token);
    // todo 路由跳转
    // 根据权限菜单动态加载路由
    // getMenuList().then(() => {
    this.$router.push({ name: "searchHome" });
    // });
  }
};
</script>
