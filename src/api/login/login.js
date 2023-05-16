import { http } from "@/plugins/axios";

// export const oauth2_server_url = "http://cmp.authorization.server:9000";
export const oauth2Url = "http://cmp.authorization.server:8085";
// location.origin

// export const logout = () => {
//   window.location.href =
//     "http://cmp.authorization.server:8085/logout?token=" +
//     window.atob(sessionStorage.getItem(window.btoa("token")));
// };

/**
 * 获取用户权限菜单信息
 * @returns
 */
export const getMenuInfo = () => {
  return http({
    url: "cmp-usermanage/user/menuinfo",
    method: "get"
  });
};

export const menus = [
  {
    menuId: "1",
    menuName: "首页",
    vueName: "home",
    childs: [{ menuId: "1-1", name: "首页", vueName: "homePage" }]
  },
  {
    menuId: "2",
    menuName: "搜索引擎",
    vueName: "search",
    childs: [{ menuId: "2-1", menuName: "搜索引擎", vueName: "searchHome" }]
  },
  {
    menuId: "3",
    menuName: "任务中心",
    vueName: "task",
    childs: [{ menuId: "3-1", menuName: "任务列表", vueName: "taskList" }]
  },
  {
    menuId: "4",
    menuName: "资产台账",
    vueName: "asset",
    childs: [{ menuId: "4-1", menuName: "资产台账", vueName: "assetLedger" }]
  },
  {
    menuId: "5",
    menuName: "漏洞管理",
    vueName: "vulnerability",
    childs: [
      { menuId: "5-1", menuName: "漏洞统计", vueName: "vulnerabilityStats" },
      { menuId: "5-2", menuName: "漏洞列表", vueName: "vulnerabilityList" }
      // { name: "漏洞验证", route: "vulnerabilityValidation" },
      // { name: "暴力破解", route: "weakPassword" }
    ]
  },
  // 预留
  {
    menuId: "6",
    menuName: "统计分析",
    vueName: "statistics",
    childs: [{ menuId: "6-1", menuName: "统计分析", vueName: "statisticsList" }]
  },
  {
    menuId: "7",
    menuName: "规则管理",
    vueName: "rule",
    childs: [{ menuId: "7-1", menuName: "规则管理", vueName: "ruleList" }]
  },
  {
    menuId: "8",
    menuName: "报告管理",
    vueName: "report",
    childs: [{ menuId: "8-1", menuName: "报告管理", vueName: "reportList" }]
  },
  {
    menuId: "9",
    menuName: "系统管理",
    vueName: "system",
    childs: [
      { menuId: "9-1", menuName: "系统信息", vueName: "systemInfo" },
      { menuId: "9-2", menuName: "网络配置", vueName: "systemNetwork" },
      { menuId: "9-3", menuName: "Syslog配置", vueName: "systemSyslog" },
      { menuId: "9-4", menuName: "用户管理", vueName: "systemUser" },
      { menuId: "9-5", menuName: "系统监控", vueName: "systemMonitor" },
      { menuId: "9-6", menuName: "日志管理", vueName: "systemLog" }
    ]
  }
];
