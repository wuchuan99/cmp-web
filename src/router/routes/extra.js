export const extraRoutes = [
  // 认证跳转
  {
    name: "redirect",
    path: "/redirect",
    component: () => import("@/views/modules/login/redirect/index.vue")
  }
];
