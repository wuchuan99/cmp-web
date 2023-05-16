<template>
  <section>
    <!-- logo -->
    <logo-and-name></logo-and-name>
    <!-- menus -->
    <menus></menus>
    <!-- user -->
    <user-info></user-info>
  </section>
</template>
<script>
import LogoAndName from "./componens/LogoAndName.vue";
import Menus from "./componens/Menus.vue";
import UserInfo from "./componens/user-info";
export default {
  components: { LogoAndName, Menus, UserInfo }
};
</script>
<style lang="scss" scoped>
section {
  height: 100%;
  display: flex;
  color: #d7d7d7;
  justify-content: space-between;
  padding: 0 20px;
}
</style>
