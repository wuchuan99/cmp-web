import Layout from "@/views/layout";

export default {
  name: "search",
  path: "/search",
  component: Layout,
  redirect: { name: "searchHome" },
  children: [
    // 搜索首页
    {
      name: "searchHome",
      path: "home",
      component: () => import("@/views/modules/search/search-home/index"),
      meta: {
        root: true
      }
    },
    // 搜索结果列表
    {
      name: "searchList",
      path: "list",
      component: () => import("@/views/modules/search/search-list/index"),
      meta: {
        keepAlive: true
      }
    },

    // 搜索指定IP详情
    {
      name: "searchIpDetail",
      path: "detail/:ip",
      component: () => import("@/views/modules/search/search-ip-detail/index")
    }
  ]
};
