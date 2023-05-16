//resize scroll 输入框校验

/**
 * 防抖
 * @param fn
 * @param wait time
 */
export function debounce(fn, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay || 1);
  };
}

/**
 * 节流
 * @param fn
 * @param wait time
 */
export function throttle(fn, delay) {
  let flag = true,
    timer = null;
  return function() {
    if (!flag) return;
    flag = false;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay || 1000);
  };
}
