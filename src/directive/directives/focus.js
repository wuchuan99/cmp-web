/**
 * dom元素自动聚焦
 */
const focus = {
  inserted(el) {
    el.focus();
  }
};

export default focus;
