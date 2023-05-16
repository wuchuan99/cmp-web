export const hasOwnProperty = Object.hasOwnProperty;

export function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}
/**
 * 深度合并对象
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
export function deepMergeObject(obj1, obj2) {
  for (let key in obj2) {
    obj1[key] =
      toString.call(obj1[key]) === "[object Object]"
        ? deepMergeObject(obj1[key], obj2[key])
        : obj2[key];
  }
  return obj1;
}
/**
 * 对象value值更新:非深层对象
 * assignObjToObj({key: 1, value: 2}, {key:2, value: 0, data: 3}) => {key: 2, value: 0}
 * @param {*} obj1 被赋值对象
 * @param {*} obj2 赋值对象
 */
export function assignObject(obj1, obj2) {
  for (let key in obj1) {
    if (hasOwnProperty.call(obj2, key)) {
      obj1[key] = obj2[key];
    }
  }
}

/**
 * 移除对象空属性值 {a:1, b:2, c: ''} => {a:1, b:2}
 * @param {*} param 对象
 * @param {*} emptyArray 空校验数组 default: ['']
 * @returns
 */
export function rmEmptyKeyObject(param, emptyArray) {
  let obj = {};
  if (emptyArray && !Array.isArray(emptyArray)) {
    throw new Error("emptyArray is not Array");
  }
  let empty = emptyArray || [""];
  for (let key in param) {
    if (Object.prototype.hasOwnProperty.call(param, key)) {
      if (!empty.includes(param[key])) {
        obj[key] = param[key];
      }
    }
  }
  return obj;
}

/**
 * 移除对象空值属性
 * @param param
 */
export function removeObjEmptyKey(param) {
  let obj = {};
  for (let key in param) {
    if (Object.prototype.hasOwnProperty.call(param, key)) {
      if (![null, undefined, ""].includes(param[key])) {
        obj[key] = param[key];
      }
    }
  }
  return obj;
}

export function objParamsTrim(obj) {
  let object = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      object[key] = typeof obj[key] === "string" ? obj[key].trim() : obj[key];
    }
  }
  return object;
}

/**
 * 深拷贝
 * @param source
 * @returns {Array}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * 设置对象的所有属性为empty
 * @param obj
 */
export function resetObj(obj) {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = "";
    }
  }
  return obj;
}

/**
 * map转对象
 * @param m
 */
export function mapToSelectionOptions(m) {
  return Array.from(m).map(v => {
    return { label: v[0], value: v[1] };
  });
}

/**
 * 判断对象是否为空对象
 * @param obj
 */
export function isObjectEmpty(obj) {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}
