import Layout from "@/views/layout";

export default {
  name: "statistics",
  path: "/statistics",
  component: Layout,
  redirect: { name: "statisticsList" },
  children: [
    // 统计列表
    {
      name: "statisticsList",
      path: "list",
      component: () =>
        import("@/views/modules/statistics/statistics-list/index"),
      meta: {
        root: true
      }
    }
  ]
};
