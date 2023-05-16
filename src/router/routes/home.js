import Layout from "@/views/layout";

export default {
  name: "home",
  path: "/home",
  component: Layout,
  redirect: { name: "homePage" },
  children: [
    // 报告管理
    {
      name: "homePage",
      path: "page",
      component: () => import("@/views/modules/home/home-page/index"),
      meta: {
        root: true,
        keepAlive: true
      }
    }
  ]
};
