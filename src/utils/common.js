import { Message } from "element-ui";
/**
 * 防抖
 * @param fn
 * @param wait time
 */
export function debounce(fn, wait) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait || 1);
  };
}

/**
 * 节流
 * @param fn
 * @param wait time
 */
export function throttle(fn, wait) {
  let flag = true,
    timer = null;
  return function() {
    if (!flag) return;
    flag = false;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, wait || 1000);
  };
}

// 判断浏览器是否支持某一方法
export function isNative(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}

/**
 * 复制到粘贴板
 * @param value
 */
export function copy(value) {
  navigator.clipboard.writeText(value).then(() => {
    Message.success("复制成功");
  });
}

/**
 * 生成uuid
 */
export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
