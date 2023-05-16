<template>
  <new-card class="card" title="搜索连接符">
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
            label: "连接符号"
          },
          {
            prop: "description",
            label: "符号含义"
          }
        ]
      },
      records: [
        {
          symbol: "&&",
          description: "并且"
        },
        {
          symbol: "||",
          description: "或者"
        }
      ]
    };
  }
};
</script>
