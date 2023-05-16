<template>
  <div class="nav">
    <!-- :style="{ background: background }" -->
    <ul>
      <li
        class="nav-item"
        :class="{
          'nav-item-active': activedFlag(index)
        }"
        v-for="(menu, index) in menus"
        :key="menu.name"
      >
        <a
          :id="idStr + index"
          :data-attr="false"
          href="javascript:;"
          :class="{
            'nav-item-a-active': activedFlag(index)
          }"
          :style="{ color: computedColor(index) }"
          @click.stop="menuClick(index, idStr + index, menu)"
        >
          <!-- 图标 -->
          <template v-if="!menu.img">
            <i class="nav-icon" :class="[menu.icon]"></i>
          </template>
          <template v-else>
            <!-- 激活时的图片 -->
            <img
              class="nav-icon"
              :src="menu.img"
              alt=""
              v-show="!(menu.activeImg && activedFlag(index))"
            />
            <!-- 非激活时的图片 -->
            <img
              class="nav-icon"
              :src="menu.activeImg"
              v-show="menu.activeImg && activedFlag(index)"
            />
          </template>
          <span>{{ menu.name }}</span>
          <!-- arrow下拉图标可上传 -->
          <img
            class="nav-more"
            :src="arrowImg"
            alt=""
            v-if="arrowImg && menu.children && menu.children.length"
          />
          <i
            class="nav-more el-icon-arrow-right"
            v-else-if="menu.children && menu.children.length"
          ></i>
        </a>
        <ul class="nav-item-ul">
          <li
            v-for="(child, secIndex) in menu.children"
            :key="child.name"
            class="nav-item-2"
            @click="secMenuClick(index, child, secIndex)"
          >
            <a
              href="javascript:;"
              :class="{
                'nav-item-ui-acitive':
                  routeIndex === index && secActiveIndex === secIndex
              }"
              :style="{ color: computedSecColor(index, secIndex) }"
            >
              <span>{{ child.name }}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <!-- slot 插槽可加入自定义插图背景图 -->
    <slot></slot>
  </div>
</template>
<script>
// import "animate.css";
export default {
  name: "my-left-menu",
  data() {
    return {
      idStr: "nemu" + Math.floor(Math.random() * 10000),
      // 展开的一级菜单
      activeIndex: "",
      // 展开的二级菜单索引
      secActiveIndex: "",
      // 当前路由的一级菜单索引
      routeIndex: "",
      // 初始化flag
      isInit: true
    };
  },
  emits: ["changeRoute"],
  props: {
    // 菜单列表（必须满足规则） [{name: '', route: '', icon: '' children: [{name:''}]}]
    menus: {
      default: []
    },
    // 是否只保持一个子菜单的展开
    uniqueOpened: {
      default: true
    },
    // 默认动画时间
    delay: {
      default: 300
    },
    // 下拉图标
    arrowImg: {
      default: ""
    },
    // 背景色
    background: {
      default: "#263238"
    },
    // 文字颜色
    textColor: {
      default: "#abb1b7"
    },
    // 当前激活菜单的文字颜色
    activeTextColor: {
      default: "#ffffff"
    },
    // 默认激活菜单路由名称
    defaultActive: {
      default: ""
    },
    // 激活菜单左侧border颜色
    borderColor: {
      default: "#34a0ce"
    },
    // hover菜单背景色
    hoverBgColor: {
      default: "rgba(0, 0, 0, 0.1)"
    }
  },

  computed: {
    // 一级菜单激活状态
    activedFlag() {
      return index => {
        return [this.routeIndex, this.activeIndex].includes(index);
      };
    },
    // 一级菜单字体颜色
    computedColor() {
      return index => {
        let color = "";
        if (index === this.activeIndex || index === this.routeIndex) {
          color = this.activeTextColor;
        } else {
          color = this.textColor;
        }
        return color;
      };
    },
    // 二级菜单字体颜色
    computedSecColor() {
      return (index, secIndex) => {
        let color = "";
        if (this.routeIndex === index && this.secActiveIndex === secIndex) {
          color = this.activeTextColor;
        } else {
          color = this.textColor;
        }
        return color;
      };
    }
  },
  methods: {
    // 二级菜单点击
    secMenuClick(index, secMenu, secIndex) {
      this.routeIndex = index;
      this.secActiveIndex = secIndex;
      // 判断是否触发父组件点击事件
      this.emitClick(secMenu);
    },

    // 一级菜单张开
    open(ul) {
      let li = this.querySelector(".nav-item-2");
      // 记录高度
      let i = ul.childNodes.length * li.offsetHeight;
      let j = 0;
      // 记录时长
      let delay = this.delay;
      // 记录interval渲染时间（如果为1时浏览器无法迅速渲染，会有延时）
      let interval = 6;
      // 记录渲染速度
      let speed = (i / delay) * interval;

      let timer = null;
      const frameIn = () => {
        if (j >= i) {
          clearInterval(timer);
        } else {
          j = j + speed;
          ul.style.height = j + "px";
        }
      };
      timer = setInterval(frameIn, interval);
    },
    // 一级菜单闭合
    close(ul) {
      let li = this.querySelector(".nav-item-2");
      // 记录高度
      let i = ul.childNodes.length * li.offsetHeight;
      // let j = 0;
      // 记录时长
      let delay = this.delay;
      // 记录interval渲染时间（如果为1时浏览器无法迅速渲染，会有延时）
      let interval = 6;
      // 记录渲染速度
      let speed = (i / delay) * interval;

      let timer = null;
      const frameOut = () => {
        if (i <= 0) {
          clearInterval(timer);
          ul.style.height = 0;
        } else {
          i = i - speed;
          ul.style.height = i + "px";
        }
      };
      timer = setInterval(frameOut, interval);
    },
    menuClick(index, id, menu) {
      const menuChildren = this.menus[index].children;
      // 如果一级菜单有子节点
      if (menuChildren && menuChildren.length) {
        // routeIndex
      } else {
        // 改变路由
        this.routeIndex = index;
        this.secActiveIndex = "";

        // 判断是否触发父组件点击事件
        this.emitClick(menu);
      }

      // 记录展开缩放菜单dom
      let ul = this.getNextSibling(this.getElementById(id));

      // uniqueOpened: 其他展开的自动闭合
      if (
        this.activeIndex !== "" &&
        this.activeIndex !== index &&
        this.uniqueOpened &&
        !ul.offsetHeight
      ) {
        this.close(
          this.getNextSibling(
            this.getElementById(this.idStr + this.activeIndex)
          )
        );
      }

      // 闭合
      if (ul.offsetHeight) {
        this.close(ul);
        this.activeIndex = "";
      }
      // 展开
      else {
        this.open(ul);
        this.activeIndex = index;
      }
    },
    // 获取dom样式
    getElemStyle(elem, attr) {
      // 保证elem是dom节点
      if (!elem || !elem.nodeType || elem.nodeType !== 1) {
        return;
      }
      if (document.currentStyle) {
        return elem.currentStyle[attr];
      } else {
        return window.getComputedStyle(elem, null)[attr];
      }
    },
    // 触发父组件点击事件
    emitClick(value) {
      if (this.isInit) return;
      if (this.$listeners.click) {
        this.$emit("click", value);
      } else {
        this.$router.push({ name: value.route });
      }
    },
    // 初始化激活菜单路由
    defaultActiveInit() {
      if (this.defaultActive) {
        for (let i = 0; i < this.menus.length; i++) {
          let children = this.menus[i].children;
          // 一级菜单路由
          if (this.defaultActive === this.menus[i].route) {
            this.menuClick(i, this.idStr + i, children);
            break;
          }
          if (children && children.length) {
            for (let j = 0; j < children.length; j++) {
              if (children[j].route === this.defaultActive) {
                // 模拟点击
                this.menuClick(i, this.idStr + i, children);
                this.secMenuClick(i, children[j], j);
                // 初始化状态修改
                setTimeout(() => {
                  this.isInit = false;
                }, 1000);
                break;
              }
            }
          }
        }
      }
    },

    // 定义css变量初始化
    propertyInit() {
      const fn = array => {
        const setStyle = window.document.getElementsByTagName("body")[0].style;
        array.forEach(item => {
          setStyle.setProperty(item.name, item.value);
        });
      };
      const propertys = [
        { name: "--nav-border-color", value: this.borderColor },
        { name: "--nav-text-color", value: this.textColor },
        { name: "--nav-active-text-color", value: this.activeTextColor },
        { name: "--nav-bg", value: this.background },
        { name: "--nav-hover-bg-color", value: this.hoverBgColor }
      ];
      fn(propertys);
    },
    // 获取兄弟节点
    getNextSibling(dom) {
      return dom.nextSibling;
    },
    // 通过id获取dom元素
    getElementById(id) {
      return document.getElementById(id);
    },
    querySelector(selector) {
      return document.querySelector(selector);
    }
  },
  mounted() {
    this.defaultActiveInit();
    this.propertyInit();
  }
};
</script>
<style lang="scss" scoped>
$borderColor: var(--nav-border-color);
$textColor: var(--nav-text-color);
$activeTextColor: var(--nav-active-text-color);
$bgColor: var(--nav-bg);
$hoverBgColor: var(--nav-hover-bg-color);
li {
  list-style: none;
}
a {
  text-decoration: none;
}

.nav {
  width: 220px;
  height: 100%;
  background: $bgColor;
  transition: all 0.3s;
  a {
    position: relative;
    display: block;
    overflow: hidden;
    padding-left: 20px;
    line-height: 46px;
    max-height: 46px;
    color: $textColor;
    transition: all 0.3s;
    span {
      margin-left: 30px;
    }
  }
  .nav-item {
    position: relative;
    ul {
      background: $hoverBgColor;
      height: 0;
      overflow: hidden;
    }
  }
  // 一级菜单图标
  .nav-icon {
    font-size: 18px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    max-width: 20px;
    max-height: 20px;
  }
}

// 一级菜单hover
.nav-item > a:hover {
  // color: #fff !important;
  background: $hoverBgColor !important;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    width: 2px;
    height: 46px;
    background: $borderColor;
    opacity: 1;
    transition: all 0.3s;
  }
}
.nav-item li:hover a {
  // color: #fff !important;
  background: $hoverBgColor;
}

// 激活菜单
.nav-item-active {
  & > a {
    // color: #fff;
    background: $hoverBgColor;
    transition: all 0.3s;
  }
  .nav-item-a-active {
    &::before {
      content: "";
      position: absolute;
      left: 0px;
      width: 2px;
      height: 46px;
      background: $borderColor;
      opacity: 1;
      transition: all 0.3s;
    }
  }
}
.nav-item-ui-acitive {
  background: $hoverBgColor !important;
}

// 图标
.nav-more {
  margin-right: 20px;
  font-size: 12px;
  transition: transform 0.3s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  max-width: 13px;
  max-height: 13px;
}
.nav-item-active {
  .nav-more {
    transform: translateY(-50%) rotate(90deg);
  }
}
</style>
