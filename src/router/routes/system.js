import Layout from "@/views/layout";

export default {
  name: "system",
  path: "/system",
  component: Layout,
  redirect: { name: "systemInfo" },
  children: [
    // 统计列表
    {
      name: "systemInfo",
      path: "info",
      component: () => import("@/views/modules/system/system-info/index"),
      meta: {
        root: true
      }
    },
    {
      name: "systemNetwork",
      path: "network",
      component: () => import("@/views/modules/system/system-network/index"),
      meta: {
        root: true
      }
    },
    {
      name: "systemSyslog",
      path: "syslog",
      component: () => import("@/views/modules/system/system-syslog/index"),
      meta: {
        root: true
      }
    },
    {
      name: "systemUser",
      path: "user",
      component: () => import("@/views/modules/system/system-user/index"),
      meta: {
        root: true
      }
    },
    {
      name: "systemMonitor",
      path: "monitor",
      component: () => import("@/views/modules/system/system-monitor/index"),
      meta: {
        root: true
      }
    },
    {
      name: "systemLog",
      path: "log",
      component: () => import("@/views/modules/system/system-log/index"),
      meta: {
        root: true
      }
    }
  ]
};
