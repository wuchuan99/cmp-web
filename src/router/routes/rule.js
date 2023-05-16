import Layout from "@/views/layout";

export default {
  name: "rule",
  path: "/rule",
  redirect: { name: "ruleList" },
  component: Layout,
  children: [
    // 统计列表
    {
      name: "ruleList",
      path: "list",
      component: () => import("@/views/modules/rule/rule-list/index"),
      meta: {
        root: true
      }
    }
  ]
};
