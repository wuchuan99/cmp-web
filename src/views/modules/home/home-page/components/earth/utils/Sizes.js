/**
 * 屏幕尺寸
 */
import Vue from "vue";

export default class Sizes {
  viewport = { width: 0, height: 0 };
  $sizeViewport;

  /**
   * Constructor
   */
  constructor(options) {
    this.emitter = new Vue();

    // Viewport size
    this.$sizeViewport = options.dom;

    // Resize event
    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);

    this.resize();
  }

  /**
   * 目前用于监听历史记录执行 historyChange
   * @param event 事件
   * @param fun 执行
   */
  $on(event, fun) {
    this.emitter.$on(event, () => {
      fun();
    });
  }

  /**
   * 清除事件
   * @param event 事件
   */
  $off(event) {
    this.emitter.$off(event);
  }

  /**
   * Resize
   */
  resize() {
    // 可视区域大小
    this.viewport.width = this.$sizeViewport.offsetWidth;
    this.viewport.height = this.$sizeViewport.offsetHeight;

    this.emitter.$emit("resize");
  }
}
