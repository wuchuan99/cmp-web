const datepickerOption = {
  type: "datepicker",
  size: "medium",
  prop: "content",
  inputOption: {
    type: "daterange",
    "value-format": "yyyy-MM-dd",
    "range-separator": "至",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期"
  }
};

const selectOption = {
  type: "select",
  size: "medium",
  prop: "content",
  inputOption: {
    placeholder: "请选择",
    options: [{ label: "sss", value: 1 }]
  }
};

const cascaderOption = {
  type: "cascader",
  size: "medium",
  prop: "content",
  inputOption: {
    filterable: true,
    "collapse-tags": true,
    options: [
      {
        value: "zhinan",
        label: "指南",
        children: [
          {
            value: "yizhi",
            label: "一致"
          },
          {
            value: "fankui",
            label: "反馈"
          }
        ]
      }
    ],
    props: {
      multiple: true
    }
  }
};

const radioOption = {
  type: "radio",
  size: "medium",
  prop: "content",
  inputOption: {
    options: [
      { label: 1, text: "是" },
      { label: 0, text: "否" }
    ]
  }
};

const inputOption = {
  type: "input",
  size: "medium",
  prop: "content",
  inputOption: {
    placeholder: "请输入"
  }
};

export const elelemtOptions = new Map([
  [1, inputOption],
  [2, inputOption],
  [3, inputOption],
  [4, inputOption],
  [5, inputOption],
  [6, datepickerOption],
  [7, inputOption],
  [8, selectOption],
  [9, inputOption],
  [10, selectOption],
  [11, inputOption],
  [12, inputOption],
  [13, cascaderOption],
  [14, radioOption]
]);
