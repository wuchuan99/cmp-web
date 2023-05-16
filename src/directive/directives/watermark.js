/**
 * 水印
 */
const watermark = {
  bind(el, binding) {
    binding.value = binding.value || {};
    addWatermark(
      binding.value.text,
      el,
      binding.value.font,
      binding.value.textColor
    );
  }
};

/**
 *
 * @param {*} str         水印文本
 * @param {*} parentNode  父元素
 * @param {*} font        文字字体
 * @param {*} textColor   文字颜色
 */
function addWatermark(str, parentNode, font, textColor) {
  let _canvas = document.createElement("canvas");
  parentNode.appendChild(_canvas);
  _canvas.width = 200;
  _canvas.height = 150;
  _canvas.style.display = "none";
  let _canvases = _canvas.getContext("2d");
  _canvases.rotate((-20 * Math.PI) / 180);
  _canvases.font = font || "15px Microsoft JhengHei";
  _canvases.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
  _canvases.textBaseline = "middle";
  _canvases.textAlign = "left";
  _canvases.fillText(
    str || "这里是水印",
    _canvas.width / 10,
    _canvas.height / 2
  );
  parentNode.style.backgroundImage =
    "url(" + _canvas.toDataURL("image/png") + ")";
}
export default watermark;
