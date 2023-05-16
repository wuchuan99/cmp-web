<template>
  <div class="system-user">
    <div class="header">
      <div class="operation">
        <new-button type="add" @click="handle('operateDrawer', { type: 'add' })"
          >新建用户</new-button
        >
        <new-button
          type="bind"
          margin
          @click="handle('setInitialPasswordDrawer')"
          >设置初始密码</new-button
        >
        <new-search
          class="search"
          v-model="queryParams.keyword"
          @click="handle('search')"
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
      <new-page
        :total.sync="total"
        :page.sync="pageIndex"
        :limit.sync="pageSize"
      />
    </div>
    <set-initial-password ref="set-initial-password" />
    <operate-user @update="update" ref="operate" />
  </div>
</template>

<script>
import { debounce, copy } from "@/utils/common";
import SetInitialPassword from "./components/SetInitialPassword";
import OperateUser from "./components/OperateUser";
import { confirm, alert } from "@/utils/element";
import { getUserList, resetPassWord, deleteUser } from "@/api/user";
import paginationMixin from "@/mixins/pagination";
const statusClassMap = new Map([
  ["启用", "success"],
  ["禁用", "danger"]
]);
export default {
  components: { SetInitialPassword, OperateUser },
  mixins: [paginationMixin],
  data() {
    return {
      table: {
        columns: [
          // { type: "index", label: "序号", width: 80 },
          // { prop: "roleName", label: "角色" },
          { prop: "userName", label: "用户名称" },
          { prop: "roleName", label: "角色" },
          { prop: "workplace", label: "单位" },
          { prop: "phoneNumber", label: "联系方式" },
          { prop: "emailAddress", label: "邮箱" },
          {
            prop: "userStatus",
            label: "状态",
            render: scope => {
              return (
                <span class={statusClassMap.get(scope.row.userStatus)}>
                  {scope.row.userStatus}
                </span>
              );
            }
          },
          { prop: "createTime", label: "创建时间" },
          { prop: "updateTime", label: "更新时间" },
          {
            label: "操作",
            width: "280",
            showOverflowTooltip: false,
            render: scope => {
              const msg = {
                del: `此操作将永久删除${scope.row.userName}用户, 是否继续?`,
                reset: `此操作将为用户${scope.row.userName}重置密码, 是否继续?`
              };
              return (
                <div class="cell-operation">
                  <el-button
                    type="text"
                    disabled={!scope.row.editFlag}
                    onclick={() =>
                      this.handle("operateDrawer", {
                        type: "edit",
                        row: scope.row
                      })
                    }
                  >
                    编辑信息
                  </el-button>
                  <el-button
                    type="text"
                    class="margin-left-15"
                    onclick={() =>
                      confirm(msg.reset, () => this.reset(scope.row))
                    }
                  >
                    重置密码
                  </el-button>
                  <el-button
                    type="text"
                    class="margin-left-15"
                    onclick={() =>
                      alert(
                        {
                          msg: `<textarea id="userKey" style="border: 0;width: 100%;resize: none;outline: none;" readonly>${scope.row.userSecretKey}</textarea>`,
                          title: "用户密钥",
                          confirmButtonText: "复制",
                          dangerouslyUseHTMLString: true
                        },
                        () => copy(scope.row.userSecretKey)
                      )
                    }
                  >
                    用户密钥
                  </el-button>
                  <el-button
                    type="text"
                    class="danger margin-left-15"
                    onclick={() =>
                      confirm(msg.del, () => this.delUser(scope.row))
                    }
                    disabled={!scope.row.editFlag}
                  >
                    删除
                  </el-button>
                </div>
              );
            }
          }
        ]
      },
      queryParams: {
        keyword: ""
      }
    };
  },
  created() {
    this.fetchFn = getUserList;
  },
  mounted() {
    this.getRecords();
  },
  methods: {
    search() {
      this.pageIndex = 1;
      this.getRecords();
    },
    handle: debounce(function(action, data) {
      const operate = {
        operateDrawer: () => {
          this.$refs["operate"].show(data);
        },
        setInitialPasswordDrawer: () => {
          this.$refs["set-initial-password"].show();
        },
        search: this.search
      };
      operate[action] && operate[action]();
    }, 200),
    delUser(row) {
      deleteUser(row.userId).then(res => {
        const { success, message, errMessage } = res.data;
        if (success) {
          this.$message.success(message);
          this.getRecords();
        } else {
          this.$message.error(errMessage);
        }
      });
    },
    reset(row) {
      console.log(row);
      resetPassWord(row.userId).then(() => {
        this.$message.success("*重置密码成功*");
      });
    },
    update(operateInfo) {
      if (operateInfo.type === "add") this.pageIndex = 1;
      this.getRecords();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./mixins/styles/index.scss";
@import "~@/style/mixin.scss";
@include status;
</style>
