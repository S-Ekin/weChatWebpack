const path = require('path');
const fs = require("fs");
const moduleFn = require("./webpackConfig/module");
const pluginFn = require("./webpackConfig/plugin");
const optimizationFn = require("./webpackConfig/optimization");
const devServer = require("./webpackConfig/devServer.js");
const pageSrc = "./src/pages";

const getMenuDir = function () {
    const menu = {
      app: `./src/app.ts`,
      tabBar: "./src/custom-tab-bar/index.ts"
     };
    fs.readdirSync(pageSrc).map(val => {
        const src = `${pageSrc}/${val}`;
        if (fs.statSync(src).isDirectory()) {
            const src = `${pageSrc}/${val}/${val}.ts`;
            menu[val] =  src;
        } 
    });
    return {
      menu,
    };
};
module.exports = env => {
  console.log(env)
  const isDev = env.dev === 'dev';
 const allPage = getMenuDir();
  const { menu } = allPage;
  return {
    devtool: isDev ? 'cheap-source-map' : 'none',
    entry: menu,
    output: {
      path: path.join(__dirname, './miniprogram'),
     // 要是使用runtimeChunk，这里的文件是runtimeChunk 的运行时分析文件,只能用hash,不能用chunkhash
     filename: "pages/[name]/[name].js", 
     publicPath: './', 
    },
    mode: isDev ? "development" : "production",
    resolve: {
      extensions: ['.js', '.css', '.ts', '.scss'],
      modules: ['node_modules'],
      alias: {
        // 配置绝对路径的文件名
        css: path.join(__dirname, 'src/css'),
        component: path.join(__dirname, 'src/Common/component'),
        api: path.join(__dirname, 'src/api'),
        assert: path.join(__dirname, 'src/assert'),
      },
    },
    optimization: optimizationFn(),
    module: moduleFn(isDev),
    plugins: pluginFn(isDev),
    devServer: devServer(),
  };
};
