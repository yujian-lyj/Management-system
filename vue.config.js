module.exports = {
    lintOnSave: true,
    devServer: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8000/addUser", //接口的前缀
          // target:'http://127.0.0.1:3000/',
          ws: true,
          changeOrigin: true, //虚拟的站点需要更管origin
          pathRewrite: {
            "^/api": "", //重写路径
          },
        },
      },
        // 项目运行时候的端口号
        port: 8090,
        //禁用主机检查
        disableHostCheck: true
    }
}
