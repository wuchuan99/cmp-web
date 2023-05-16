/**
 * 文字随机color
 */
const randomcolor = {
  bind(el) {
    el.style.color =
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8);
  }
};

export default randomcolor;
