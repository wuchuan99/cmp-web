<template>
  <div class="menu">
    <div
      v-for="menu in menuList"
      :key="menu.menuId"
      :class="{ 'menu-active': menuActive(menu) }"
      @click="changeRoute(menu.vueName, menu.childs)"
    >
      {{ menu.menuName }}
      <!-- 二级菜单 -->
      <ul v-if="menu.childs && menu.childs.length > 1">
        <li
          v-for="sMenu in menu.childs"
          :key="sMenu.menuId"
          :class="{ 's-menu-active': sMenuActive(sMenu) }"
          @click="changeRoute(sMenu.vueName)"
        >
          {{ sMenu.menuName }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    // 一级菜单
    menuActive() {
      return ({ vueName, childs }) => {
        if (
          vueName === this.routeName ||
          (childs && childs.some(item => item.route === this.routeName))
        )
          return true;
        else {
          const myRoutes = this.$router.options.routes.find(
            option => option.name === vueName
          );
          if (!myRoutes) return false;
          const routeList = this.getRoutes(myRoutes);
          if (routeList.includes(this.routeName)) return true;
          else return false;
        }
      };
    },
    // 二级菜单
    sMenuActive() {
      return ({ vueName }) => {
        return vueName === this.routeName;
      };
    },
    //菜单
    menuList() {
      return this.$store.state.user.userInfo?.menu || [];
    }
  },
  methods: {
    changeRoute(vueName, childs) {
      if (childs && childs.length > 1) return;
      this.$router.push({ name: vueName });
    },
    getRoutes(myRoutes) {
      return [myRoutes.name].concat(
        ...(myRoutes.children
          ? myRoutes.children.map(item => this.getRoutes(item))
          : [])
      );
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.menu-active {
  background: rgba(0, 0, 0, 0.28);
  color: white;
}
.s-menu-active {
  background-color: #ffffff;
  color: #0a2064;
}

.menu {
  display: flex;
  height: 100%;
  & > div {
    // color: white;
    width: 110px;
    text-align: center;
    font-size: 16px;
    letter-spacing: 2px;
    line-height: 60px;
    transition: all 0.3s linear;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.18);
      color: #ffffff;
      ul {
        visibility: visible;
        transition: transform 0.5s ease;
        transform: translateX(10px);
        li {
        }
      }
    }
    ul {
      visibility: hidden;
      background-color: #0a2064;
      border-radius: 0;
      box-shadow: 0 0 10px rgb(0 0 0 / 10%);
      position: relative;
      left: -10px;
      padding: 10px 0;
      li {
        height: 35px;
        line-height: 35px;
        font-size: 15px;
        transition: color 0.3s linear, background-color 0.3s linear;
        &:hover {
          background-color: #ffffff;
          color: #0a2064;
        }
      }
    }
  }
}
</style>
