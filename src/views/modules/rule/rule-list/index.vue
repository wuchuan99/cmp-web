<template>
  <div class="rule-list">
    <div class="header">
      <div class="operation">
        <new-button
          type="add"
          @click="handle({ action: 'openDrawer', ref: 'operate', type: 'add' })"
          >新增</new-button
        >
        <new-search
          class="search"
          v-model="queryParams.keyword"
          @click="handle({ action: 'search' })"
        />
      </div>
    </div>
    <div class="main">
      <new-table
        :border="true"
        :columns="table.columns"
        :data="records"
        :loading="loading"
      />
    </div>
    <operate ref="operate" @update="update" />
  </div>
</template>
<script>
import { debounce } from "@/utils/common";
import { confirm } from "@/utils/element";
import operate from "./components/operate.vue";
export default {
  components: { operate },
  data() {
    return {
      loading: false,
      table: {
        columns: [
          { type: "index", label: "序号", width: 80 },
          { prop: "id", label: "规则ID" },
          { prop: "name", label: "规则名称" },
          { prop: "detail", label: "详情" },
          { prop: "createTime", label: "创建时间" },
          {
            label: "操作",
            width: "280",
            showOverflowTooltip: false,
            render: scope => {
              const msg = {
                del: `此操作将永久删除该规则, 是否继续?`,
                application: `此操作将应用该规则, 是否继续?`
              };
              return (
                <div class="cell-operation">
                  <span
                    class="primary"
                    onclick={() => {
                      this.handle({
                        action: "openDrawer",
                        ref: "operate",
                        type: "edit",
                        data: scope.row
                      });
                    }}
                  >
                    编辑
                  </span>
                  <span
                    class="primary margin-left-15"
                    onclick={() => {
                      confirm(msg.application, () =>
                        this.application(scope.row)
                      );
                    }}
                  >
                    应用
                  </span>
                  <span
                    class="danger margin-left-15"
                    onclick={() => {
                      confirm(msg.del, () => this.delRules(scope.row));
                    }}
                  >
                    删除
                  </span>
                </div>
              );
            }
          }
        ]
      },
      records: [
        {
          id: 1,
          name: "xxxxx",
          detail: "ffffff",
          createTime: "2022/11/01"
        }
      ],
      queryParams: {
        keyword: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    handle: debounce(function(context) {
      this[context.action] && this[context.action](context);
    }, 200),
    openDrawer({ ref, type, data }) {
      this.$refs[ref] && this.$refs[ref].show({ type, row: data });
    },
    application(row) {
      console.log(row);
    },
    delRules(row) {
      console.log(row);
    },
    update(data) {
      console.log(data);
    },
    search() {
      console.log(this.queryParams.keyword);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.rule-list {
  height: 100%;
  padding: 25px 0;
  .header {
    @include flex-end;
    background-color: white;
    height: 75px;
    width: 100%;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.17);
    padding: 20px;
    .operation {
      @include flex-start;
      .search {
        margin-left: 15px;
      }
    }
  }
  .main {
    padding: 20px;
    margin-top: 16px;
    height: calc(100% - 92px);
    background-color: white;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.17);
  }
}
</style>
