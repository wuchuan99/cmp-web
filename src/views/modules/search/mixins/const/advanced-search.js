export const operatorTypeAll = [
  {
    symbol: ":",
    description: "等于某个值",
    needValue: true
  },
  {
    symbol: "!=",
    description: "不等于某个值",
    needValue: true
  },
  {
    symbol: ": *",
    description: "存在该字段",
    needValue: false
  },
  {
    symbol: ":=",
    description: "包含某个值",
    needValue: true
  },
  {
    symbol: ">",
    description: "大于某个值",
    needValue: true
  },
  {
    symbol: ">=",
    description: "大于等于某个值",
    needValue: true
  },
  {
    symbol: "<",
    description: "小于某个值",
    needValue: true
  },
  {
    symbol: "<=",
    description: "小于等于某个值",
    needValue: true
  },
  {
    symbol: "= true",
    description: "条件为真",
    needValue: false
  },
  {
    symbol: "= false",
    description: "条件为假",
    needValue: false
  }
];
