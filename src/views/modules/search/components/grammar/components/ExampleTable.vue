<template>
  <new-card class="card" title="范例">
    <new-table :border="true" :columns="table.columns" :data="records" />
  </new-card>
</template>

<script>
import { debounce, copy } from "@/utils/common";
export default {
  data() {
    return {
      table: {
        columns: [
          {
            prop: "description",
            label: "例子含义"
          },
          {
            prop: "example",
            label: "搜索例子"
          },
          {
            label: "操作",
            showOverflowTooltip: false,
            width: 100,
            render: scope => {
              return (
                <div class="cell-operation">
                  <span
                    class="primary"
                    onclick={() => {
                      this.handle("copyGrammar", scope.row.example);
                    }}
                  >
                    复制范例
                  </span>
                </div>
              );
            }
          }
        ]
      },
      records: [
        {
          description: "创建时间在2022-11-26 14:27:10之后的数据",
          example: "create_time > 2022-11-26 14:27:10"
        },
        {
          description:
            "端口=443 或者 （IP模糊匹配41.*.14 而且 端口是80）的数据",
          example:
            "port.keyword : 443 || (ip_address.ip_address.keyword : 41.*.14 && port.keyword : 80)"
        }
      ]
    };
  },
  methods: {
    handle: debounce(function(action, val) {
      const operate = {
        copyGrammar: () => {
          copy(val);
        }
      };
      operate[action] && operate[action]();
    }, 200)
  }
};
</script>
