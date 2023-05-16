<template>
  <div class="asteroid"></div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.asteroid {
  top: -200px;
  left: -200px;
  width: 200px;
  height: 200px;
  opacity: 0.8;
  position: absolute;
  animation-name: assteroid;
  animation-timing-function: linease-inear;
  animation-iteration-count: infinite;
  animation-duration: 7s;
  animation-delay: 2s;
}
.asteroid::before {
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  background-clip: padding-box;
  box-shadow: 0px 0px 7px 2px #fff;
  bottom: 0;
  right: 0;
}
.asteroid::after {
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-bottom: 200px solid #fff;
  border-right: 3px solid transparent;
  bottom: -22px;
  right: 75px;
  transform: rotate(-45deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=-1deg);
}
::before,
::after {
  position: absolute;
  content: " ";
  display: block;
}
@keyframes assteroid {
  0% {
    top: -200px;
    left: -200px;
    filter: alpha(opacity=80);
    opacity: 0.8;
  }
  10% {
    top: 200px;
    left: 200px;
    filter: alpha(opacity=0);
    opacity: 0;
  }
  100% {
    filter: alpha(opacity=0);
    opacity: 0;
  }
}
</style>
