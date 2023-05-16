// const path = require("path");

module.exports = {
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,

  devServer: {
    disableHostCheck: true,
    host: "",
    port: 8080,
    https: false,
    // 配置自动启动浏览器
    open: false,
    // 配置多个代理
    proxy: {
      "/": {
        target: "http://172.18.69.12:8085/", // 吕江波
        // target: "http://172.18.69.21:8085/", // 程学博
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/": ""
        }
      }
    }
  },

  chainWebpack: config => {
    config.plugin("define").tap(args => {
      args[0]["process"] = { ...args[0]["process.env"] };
      return args;
    });
  },

  pluginOptions: {
    // 国际化
    i18n: {
      locale: "zh",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
