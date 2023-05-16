import Layout from "@/views/layout";

export default {
  name: "asset",
  path: "/asset",
  redirect: { name: "assetLedger" },
  component: Layout,
  children: [
    // 资产台账
    {
      name: "assetLedger",
      path: "ledger",
      component: () => import("@/views/modules/asset/asset-ledger/index"),
      meta: {
        root: true,
        keepAlive: true
      }
    },
    {
      name: "ledgerAssetDtail",
      path: "detail/:id",
      component: () => import("@/views/modules/asset/asset-detail/index")
    }
  ]
};
