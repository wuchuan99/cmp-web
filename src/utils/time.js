import Moment from "moment";

/**
 *  时间转换 YYYY-MM-DD HH:mm:ss
 * @param time
 * @returns {*}
 */
export function getDateTime(time) {
  return time && Moment(time).format("YYYY-MM-DD HH:mm:ss");
}

/**
 *  时间转换 YYYY-MM-DD
 * @param time
 * @returns {*}
 */
export function getDate(time) {
  return time && Moment(time).format("YYYY-MM-DD");
}

/**
 *  时间转换 HH:mm:ss
 * @param time
 * @returns {*}
 */
export function getTime(time) {
  return time ? Moment(time).format("HH:mm:ss") : "";
}

/**
 * java.util.Date
 * @param time
 * @returns {*|Function|string}
 */
export function getMoment(time) {
  return time && Moment(time).format();
}

/**
 * es存储时间
 * @param time
 * @returns {*}
 */
export function getUtcToBeijingDateTime(time) {
  return (
    time &&
    Moment(time)
      .subtract(8, "hours")
      .format("YYYY-MM-DD HH:mm:ss")
  );
}

// 当前时间戳 yyyyMMddHHmmss
export function generateTimeReqestNumber() {
  const pad2 = n => (n < 10 ? "0" + n : n);
  const date = new Date();
  return (
    date.getFullYear().toString() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds())
  );
}
