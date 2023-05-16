<template>
  <div class="untils" :class="{ animation: visible }">
    <div class="toggle-screen">
      <i
        class="el-icon-full-screen"
        @click="handle({ action: 'toggleScreen' })"
      ></i>
    </div>
    <div class="zoom-box">
      <div class="zoom">
        <i class="el-icon-zoom-in" @click="handle({ action: 'zoomIn' })"></i>
        <i class="el-icon-zoom-out" @click="handle({ action: 'zoomOut' })"></i>
      </div>
      <div class="scale-value">
        <span>当前比例：</span>
        <span>{{ scale }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/common";
export default {
  props: {
    world: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      scale: "100%"
    };
  },
  methods: {
    handle: debounce(function({ action }) {
      this[action] && this[action]();
    }, 200),
    zoomIn(showMessage = true) {
      const STEP = 0.1;
      const scale = this.world.earth.earthGroup.scale;
      if (scale.x >= 1.6)
        return showMessage && this.$message.info("缩放比不能大于140%");
      this.world.earth.earthGroup.scale.set(
        scale.x + STEP,
        scale.y + STEP,
        scale.z + STEP
      );
      console.log(scale);
      this.setScale(((scale.x - 0.2) * 100).toFixed());
    },
    zoomOut(showMessage = true) {
      const STEP = 0.1;
      const scale = this.world.earth.earthGroup.scale;
      if (scale.x <= 0.8)
        return showMessage && this.$message.info("缩放比不能小于60%");
      this.world.earth.earthGroup.scale.set(
        scale.x - STEP,
        scale.y - STEP,
        scale.z - STEP
      );
      console.log(this.world.earth.earthGroup.scale);
      this.setScale(((scale.x - 0.2) * 100).toFixed());
    },
    setScale(scale) {
      this.scale = scale + "%";
    },
    toggleScreen() {
      this.$emit("toggle-screen");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../mixins/styles/keyframes.scss";
.untils {
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  position: absolute;
  right: 425px;
  bottom: calc((100% - 218px) / 3 + 10px);
  opacity: 0;
  color: #fff;
  &.animation {
    animation: fadeIn 2s;
    opacity: 1;
  }
  .toggle-screen {
    font-size: 26px;
    i {
      cursor: pointer;
    }
  }
  .zoom-box {
    margin-top: 10px;
    .zoom {
      display: flex;
      flex-flow: column;
      align-items: flex-end;
      font-size: 26px;

      > i {
        cursor: pointer;
        &:last-of-type {
          margin-top: 10px;
        }
      }
    }
    .scale-value {
      margin-top: 10px;
    }
  }
}
</style>
