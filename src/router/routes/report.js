import Layout from "@/views/layout";

export default {
  name: "report",
  path: "/report",
  component: Layout,
  redirect: { name: "reportList" },
  children: [
    // 报告管理
    {
      name: "reportList",
      path: "list",
      component: () => import("@/views/modules/report/report-list/index"),
      meta: {
        root: true
      }
    }
  ]
};
