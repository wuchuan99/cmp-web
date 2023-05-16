// 展示连接器相关功能
export const isShowTc = true;

// 新引入config
{
  const requireModules = require.context("./configs", true, /.js/);
  requireModules.keys().forEach(filePath => {
    const module = requireModules(filePath);
    // 引入config配置
    module.init();
  });
}
