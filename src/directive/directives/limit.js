/**
 * 用法：v-limit:digit
 * v-limip:reg="your reg expression" 支持传正则表达式，处理一些特殊的场景
 */
// 内置一些输入正则
const typeMap = {
  // 只输入数字
  digit: /\D/g,
  // 只输入正整数
  positiveInteger: /^(0+)|\D+/g,
  // 只输入基本中文
  chinese: /[^\u4E00-\u9FA5]/g,
  // 只输入中文英文字母
  chineseAlphabet: /[^\u4E00-\u9FA5A-Za-z]/g,
  // 只输入大写字母及数字
  uppercaseLetterDigit: /[^A-Z0-9]/g,
  // 只输入字母及数字
  letterDigit: /[^0-9a-zA-Z]/
};

const limitinput = {
  bind(el, binding) {
    const { arg, value } = binding;
    if (!arg) {
      throw Error("one arg is required");
    }
    // 'reg' 参数标识为传入自定义正则表达式
    if (arg && arg !== "reg" && !typeMap[arg]) {
      throw Error("arg is not in typeMap");
    }
    if (arg === "reg" && !value) {
      throw Error("reg arg requires a reg expression value");
    }
    const tagName = el.tagName.toLowerCase();
    // 输入可能为input或者textarea
    const input =
      tagName === "input" || tagName === "textarea"
        ? el
        : el.querySelector("input") || el.querySelector("textarea");
    const regKey = arg || (arg === "reg" && value);
    // 输入法气泡窗弹出，开始拼写
    el.compositionstartHandler = function() {
      el.inputLocking = true;
    };
    // 输入法气泡窗关闭，输入结束
    el.compositionendHandler = function() {
      el.inputLocking = false;
      input.dispatchEvent(new Event("input"));
    };

    el.inputHandler = function(e) {
      if (el.inputLocking) return;
      const oldValue = e.target.value;
      const newValue = oldValue.replace(typeMap[regKey] || value, "");

      // 判断是否需要更新，避免进入死循环
      if (newValue !== oldValue) {
        input.value = newValue;
        input.dispatchEvent(new Event("input")); // 通知v-model更新
      }
    };
    input.addEventListener("compositionstart", el.compositionstartHandler);
    input.addEventListener("compositionend", el.compositionendHandler);
    input.addEventListener("input", el.inputHandler);
  },
  unbind(el) {
    const tagName = el.tagName.toLowerCase();
    const input =
      tagName === "input" || tagName === "textarea"
        ? el
        : el.querySelector("input") || el.querySelector("textarea");
    input.removeEventListener("compositionstart", el.compositionstartHandler);
    input.removeEventListener("compositionend", el.compositionendHandler);
    input.removeEventListener("input", el.inputHandler);
  }
};

export default limitinput;
