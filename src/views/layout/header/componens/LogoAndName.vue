<template>
  <div class="flex-center">
    <img src="@/assets/images/logo/logo.png" alt="" />
    <span class="product-name">{{ productName }}</span>
  </div>
</template>
<script>
import { getProductName } from "@/config/configs/product";
export default {
  computed: {
    productName() {
      return getProductName();
    }
  }
};
</script>
<style lang="scss" scoped>
.flex-center {
  height: 100%;
  .product-name {
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 2px;
    margin-left: 13px;
    white-space: nowrap;
    width: 180px;
  }
}
</style>
