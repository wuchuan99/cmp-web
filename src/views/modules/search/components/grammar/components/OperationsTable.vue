<template>
  <new-card class="card" title="逻辑运算符">
    <new-table :border="true" :columns="table.columns" :data="records" />
  </new-card>
</template>

<script>
export default {
  data() {
    return {
      table: {
        columns: [
          {
            prop: "symbol",
            label: "逻辑符号"
          },
          {
            prop: "description",
            label: "符号含义"
          }
        ]
      },
      records: [
        {
          symbol: "()",
          description: "优先级"
        },
        {
          symbol: "*",
          description: "模糊匹配"
        }
      ]
    };
  }
};
</script>
