<template>
  <new-card class="card" title="时间格式说明">
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
            label: "内置时间格式"
          },
          {
            prop: "import",
            label: "输入"
          }
        ]
      },
      records: [
        {
          symbol: "yyyy-MM-dd HH:mm:ss",
          import: "2022-10-10  12:12:12"
        },
        {
          symbol: "yyyy-MM-dd",
          import: "2022-10-10"
        },
        {
          symbol: "yyyyMMdd",
          import: "20221010"
        },
        {
          symbol: "HH:mm:ss",
          import: "12:12:12"
        },
        {
          symbol: "HH:mm:ss.SSS",
          import: "12:12:12.456"
        },
        {
          symbol: "yyyyMMddHHmmss",
          import: "20201010121212"
        },
        {
          symbol: "yyyyMMdd HH:mm:ss",
          import: "20201010 12:12:12"
        }
      ]
    };
  }
};
</script>
