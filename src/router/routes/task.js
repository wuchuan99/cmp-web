import Layout from "@/views/layout";

export default {
  name: "task",
  path: "/task",
  component: Layout,
  redirect: { name: "taskList" },
  children: [
    // 任务列表
    {
      name: "taskList",
      path: "list",
      component: () => import("@/views/modules/task/task-list/index"),
      meta: {
        root: true
      }
    }
  ]
};
