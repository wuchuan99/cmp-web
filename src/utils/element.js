import { MessageBox, Message } from "element-ui";

/**
 * element 确认提交
 * @param {*} msg
 * @param {*} sure
 * @param {*} cancel
 */
export const confirm = (msg, sure, cancel, customClass = null) => {
  const catchFn = cancel
    ? () => {
        cancel();
        Message.info("已取消操作");
      }
    : () => Message.info("已取消操作");
  MessageBox.confirm(msg, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    customClass
  })
    .then(sure)
    .catch(catchFn);
};

/**
 * element 消息提示
 * @param {*} attrs
 * @param {*} sure
 * @param {*} cancel
 */
export const alert = (attrs, sure, cancel) => {
  const catchFn = cancel
    ? () => {
        cancel();
        Message.info("已取消操作");
      }
    : () => Message.info("已取消操作");
  MessageBox.alert(attrs.msg, attrs.title, {
    confirmButtonText: attrs.confirmButtonText,
    dangerouslyUseHTMLString: attrs.dangerouslyUseHTMLString || false
  })
    .then(sure)
    .catch(catchFn);
};
