/**
 * 判断是否为字符串
 * @param {*} str
 * @returns
 */
export const isString = str => typeof str === "string";

// base64编码
export const btoa = window.btoa;

// base64解码
export const atob = window.atob;

// 获取sessionStorage
export const getSessionStorage = item =>
  JSON.parse(sessionStorage.getItem(item));

// 设置sessionStorage
export const setSessionStorage = (item, value) =>
  sessionStorage.setItem(item, JSON.stringify(value));

// 设置localStorage
export const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorage = key => JSON.parse(localStorage.getItem(key));
