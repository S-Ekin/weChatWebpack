/**
 * @author: SEKin 
 * @Date: 2020-12-22 14:28:36 
 * @description:  
 * @Last Modified time: 2020-12-22 14:28:36 
 */
module.exports = function () {
  return {
      historyApiFallback: true,
      // contentBase: path.join(__dirname, '../static'),
      quiet: true, // 控制台中不输出打包的信息
      noInfo: true,
      inline: true, // 开启页面自动刷新,
      hot: true,
      hotOnly: false, // 开启后，页面不会刷新，不然一改页面就会刷新
      lazy: false,
      publicPath: '/',
      compress: true,
      disableHostCheck: true, // 让外网可以访问代理地址
      // host:"0.0.0.0",//让外网可以访问代理地址
      progress: true, // 显示打包的进度
      overlay: {
        // 把编译的错误显示在浏览器上
        errors: true,
        warnings: true,
      },
      watchOptions: {
        aggregateTimeout: 300,
      },
      clientLogLevel: 'none', // cancel console client log
      port: '8035', // 设置端口号
      proxy: {
        '/AdvEventS': {
          target: "http://172.16.13.139:8080",
          secure: false,
          changeOrigin: true,
        },
      },
    };
};
