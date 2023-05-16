/**
 * el-form 非空校验
 * @param {*} fieldName
 * @param {*} option
 * @returns
 */
export function required(fieldName = "", option = {}) {
  const defaultOpt = {
    required: true,
    message: `${fieldName}不能为空`,
    ...trigger
  };

  return {
    ...defaultOpt,
    ...option
  };
}

/**
 * el-form 正则校验
 * @param {*} fieldName
 * @param {*} reg
 * @param {*} option
 * @returns
 */
export function validateFn(fieldName = "", reg, option = {}) {
  const defaultOpt = {
    ...trigger,
    validator: (rule, value, cb) => {
      if (value) {
        if (reg.test(value)) {
          cb();
        } else {
          cb(new Error(option.checkFailMessage || `${fieldName}不正确`));
        }
      } else {
        option.required ? cb(new Error(`${fieldName}不能为空`)) : cb();
      }
    }
  };

  return {
    ...defaultOpt,
    ...option
  };
}

export const trigger = { trigger: ["blur", "change"] };
