<template>
  <div class="sky"></div>
</template>
<script>
import { throttle } from "@/utils/common";

export default {
  methods: {
    init() {
      const styles = ["animate4", "animate1", "animate2", "animate3"];
      const scales = ["scale1", "scale2", "scale3"];
      const opacities = [
        "opacity1",
        "opacity1",
        "opacity1",
        "opacity2",
        "opacity2",
        "opacity3"
      ];
      let stars = "";
      let count = 50;
      let widthWindow = window.innerWidth;
      let heightWindow = window.innerHeight;

      for (var i = 0; i < count; i++) {
        stars +=
          "<span class='star " +
          styles[this.rand(0, 4)] +
          " " +
          opacities[this.rand(0, 6)] +
          " " +
          scales[this.rand(0, 3)] +
          "' style='animation-delay: ." +
          this.rand(0, 9) +
          "s; left: " +
          this.rand(0, widthWindow) +
          "px; top: " +
          this.rand(0, heightWindow) +
          "px;'></span>";
      }
      const sky = document.querySelector(".sky");
      sky && (sky.innerHTML = stars);
      // document.querySelector(".sky").innerHTML = stars;
    },
    rand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", throttle(this.init));
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
  }
};
</script>
<style lang="scss" scoped>
::after,
::before {
  content: " ";
  display: block;
}

.sky {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
<style lang="scss">
.star {
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  animation: shine 800s infinite linear;
}

.star.scale1 {
  transform: scale(1);
}
.star.scale2 {
  transform: scale(0.5);
}
.star.scale3 {
  transform: scale(1.3);
}
.star.animate1 {
  animation-duration: 0.5s;
}
.star.animate2 {
  animation-duration: 1s;
}
.star.animate3 {
  animation-duration: 1.5s;
}
.star.animate4 {
  animation-duration: 2s;
}
.star.opacity1 {
  opacity: 1;
}
.star.opacity2 {
  opacity: 0.5;
}
.star.opacity3 {
  opacity: 0.2;
}
@keyframes shine {
  0% {
    box-shadow: 0 0 15px 0px rgba(255, 255, 255, 0.05);
  }
  50% {
    box-shadow: 0 0 15px 4px rgba(255, 255, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 15px 0px rgba(255, 255, 255, 0.05);
  }
}
</style>
