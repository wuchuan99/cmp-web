<template>
  <div class="system-info">
    <div class="system-license">
      <div class="system-info-title">授权管理</div>
      <div class="system-info-table">
        <new-table
          :border="true"
          :columns="linceseColumns"
          :data="licenseList"
        />
      </div>
    </div>
    <div class="system-basic">
      <div class="system-info-title">系统信息</div>
      <div class="system-info-table">
        <new-table :border="true" :columns="basicColumns" :data="basicList" />
      </div>
    </div>
    <div class="system-upgrade">
      <div class="system-info-title">升级管理</div>
      <div class="system-info-table">
        <new-table
          :border="true"
          :columns="upgradeColumns"
          :data="upgradeList"
        />
      </div>
    </div>
    <system-license-upload-operate
      @update="update"
      ref="licenseOperate"
    ></system-license-upload-operate>
    <system-basic-operate
      @update="update"
      ref="basicOperate"
    ></system-basic-operate>
    <system-upgrade-upload-operate
      @update="update"
      ref="upgradeOperate"
    ></system-upgrade-upload-operate>
  </div>
</template>
<script>
import {
  getSystemLicense,
  getSystemBasic,
  systemUpgrade,
  systemFallback,
  getSystemUpdateinfo
} from "@/api/system/system-info";
import { debounce } from "@/utils/common";
import SystemLicenseUploadOperate from "./components/SystemLicenseUploadOperate.vue";
import SystemBasicOperate from "./components/SystemBasicOperate.vue";
import SystemUpgradeUploadOperate from "./components/SystemUpgradeUploadOperate.vue";
import moment from "moment";
import { confirm } from "@/utils/element";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {
    SystemLicenseUploadOperate,
    SystemBasicOperate,
    SystemUpgradeUploadOperate
  },
  data() {
    const _this = this;
    return {
      color: "success",
      licenseList: [],
      upgradeList: [],
      basicList: [],
      linceseColumns: [
        { prop: "productName", label: "产品名称" },
        { prop: "nodeNum", label: "节点数" },
        { prop: "scanIpNum", label: "总扫描IP数" },
        { prop: "scanTaskNum", label: "总扫描任务创建数" },
        { prop: "userNum", label: "最大用户数" },
        { prop: "authStartTime", label: "授权开始时间" },
        { prop: "authEndTime", label: "授权截止时间" },
        {
          prop: "authStatus",
          label: "授权状态",
          render: scope => {
            const { _color } = _this.getRemainderTime(scope.row);
            return <span class={[_color]}>{scope.row.authStatus}</span>;
          }
        },
        {
          label: "剩余时间",
          render: scope => {
            const { _color, remainderTime } = _this.getRemainderTime(scope.row);
            return <span class={[_color]}> {remainderTime}天</span>;
          }
        },
        {
          label: "操作",
          width: "100",
          showOverflowTooltip: false,
          align: "center",
          render: scope => {
            return (
              <div class="cell-operation">
                <span
                  class="click theme"
                  onclick={() =>
                    this.$refs["licenseOperate"].show(scope.row.id)
                  }
                >
                  授权
                </span>
              </div>
            );
          }
        }
      ],
      basicColumns: [
        { prop: "productName", label: "产品名称" },
        {
          prop: "productLogo",
          label: "产品LOGO",
          showOverflowTooltip: false,
          render: scope => {
            return scope.row.productLogo ? (
              <img
                src={scope.row.productLogo}
                alt=""
                style="display: block;width: 32px;height: 32px"
              />
            ) : null;
          }
        },
        {
          prop: "productIco",
          label: "产品ICO",
          showOverflowTooltip: false,
          render: scope => {
            return scope.row.productIco ? (
              <img
                src={scope.row.productIco}
                alt=""
                style="display: block;width: 32px;height: 32px"
              />
            ) : null;
          }
        },
        { prop: "productCopyRight", label: "版权" },
        // { prop: "theme", label: "主题", width: 150 },
        // { prop: "language", label: "语言", width: 150 },
        {
          label: "操作",
          width: 100,
          showOverflowTooltip: false,
          align: "center",
          render: scope => (
            <span
              class="click theme"
              onclick={() => this.$refs["basicOperate"].show(scope.row)}
            >
              编辑
            </span>
          )
        }
      ],
      upgradeColumns: [
        { prop: "productName", label: "名称" },
        { prop: "currentVersion", label: "当前版本" },
        { prop: "updateVersion", label: "升级包版本" },
        { prop: "updatePackageSize", label: "升级包大小" },
        { prop: "upgradeTime", label: "最后升级时间" },
        {
          label: "操作",
          width: 200,
          align: "center",
          render: scope => {
            return (
              <div>
                <span
                  class="click theme"
                  onclick={() =>
                    this.$refs["upgradeOperate"].show(scope.row.id)
                  }
                >
                  上传升级包
                </span>
                <span
                  class="click theme margin-left-20"
                  onclick={() =>
                    confirm("此操作将升级该系统，是否继续?", () => {
                      this.upgrade(scope.row);
                    })
                  }
                >
                  升级
                </span>
                <span
                  class="click theme margin-left-20"
                  onclick={() =>
                    confirm("此操作将回退该系统，是否继续?", () => {
                      this.fallback(scope.row);
                    })
                  }
                >
                  回退
                </span>
              </div>
            );
          }
        }
      ]
    };
  },
  methods: {
    handle: debounce(function(context) {
      this[context.action] && this[context.action](context);
    }, 200),
    upgrade(data) {
      console.log(data);
      systemUpgrade(data.id).then(res => {
        const { success, message, errMessage } = res.data;
        if (success) {
          this.$message.success(message);
          this.getSystemUpgradeInfo();
        } else this.$message.error(errMessage);
      });
    },
    fallback(data) {
      console.log(data);
      systemFallback(data.id).then(res => {
        const { success, message, errMessage } = res.data;
        if (success) {
          this.$message.success(message);
          this.getSystemUpgradeInfo();
        } else this.$message.error(errMessage);
      });
    },
    // 授权列表
    getSystemLicenseInfo() {
      getSystemLicense().then(res => {
        const { success, data } = res.data;
        if (success) this.licenseList = [data];
      });
    },
    getRemainderTime(row) {
      let remainderTime = moment(row.authEndTime).diff(
        moment(new Date()),
        "days"
      );
      if (remainderTime < 0) remainderTime = 0;
      let _color = "success";
      if (remainderTime >= 7) {
        _color = "success";
      } else if (remainderTime < 7) {
        _color = "warning";
      } else {
        _color = "danger";
      }
      return { _color, remainderTime };
    },
    // 升级管理列表
    getSystemUpgradeInfo() {
      getSystemUpdateinfo().then(res => {
        const { success, data } = res.data;
        if (success) this.upgradeList = data;
      });
    },
    // 系统信息列表
    getSystemBasicInfo() {
      getSystemBasic().then(res => {
        const { success, data } = res.data;
        if (success) {
          data.productLogo = "data:image/png;base64," + data.productLogo;
          data.productIco = "data:image/x-icon;base64," + data.productIco;
          this.basicList = [data];
        }
      });
    },
    update({ method }) {
      this[method] && this[method]();
    }
  },

  created() {
    this.getSystemLicenseInfo();
    this.getSystemUpgradeInfo();
    this.getSystemBasicInfo();
  }
};
</script>
<style lang="scss" scoped>
@import "~@/style/mixin.scss";
@import "~@/style/constant.scss";
.system-info {
  height: 100%;
  padding: 25px 0;
  .system-info-title {
    font-size: 18px;
    font-weight: 600;
    padding: 0 20px;
    line-height: 60px;
    border-bottom: 1px solid #ebeef5;
    // color: $themeColor;
  }
  .system-info-table {
    padding: 20px;
  }
  & > div {
    @include shadow;
    background-color: white;
    &:nth-of-type(1) {
      height: 200px;
    }
    &:nth-of-type(2) {
      height: 200px;
    }
    &:nth-of-type(3) {
      height: calc(100% - 440px);
    }
    // height: calc(50% - 10px);
  }
  .system-basic,
  .system-upgrade {
    margin-top: 20px;
  }
  @include status;
}
</style>
