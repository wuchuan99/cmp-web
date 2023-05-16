/**
 * 全局混入
 */
import Vue from "vue";

Vue.mixin({
  methods: {
    // 日志打印
    log() {
      const array = [];
      const style = "color: #03A9F4; font-weight: blod";
      const style2 = "color: #4CAF50; font-weight: bold";

      [...arguments].forEach(item => {
        // const color = `rgb(${Math.random() * 255},${Math.random() * 255}, ${
        //   Math.random() * 255
        // })`;
        array.push(`%c ${item} `, array.length % 4 ? style2 : style);
      });
      console.log(...array);
    }
  }
});
