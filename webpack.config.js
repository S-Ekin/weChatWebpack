const path = require('path');
const fs = require("fs");
const moduleFn = require("./webpackConfig/module");
const pluginFn = require("./webpackConfig/plugin");
const optimizationFn = require("./webpackConfig/optimization");
const devServer = require("./webpackConfig/devServer.js");
const pageSrc = "./src/pages";

const getMenuDir = function () {
    const menu = {
      app: {
        import:"./src/app.ts",
        filename: "app.js"
      },
      tabBar:{
        import: "./src/custom-tab-bar/index.ts",
        filename: "custom-tab-bar/index.js"
      } 
     };
    fs.readdirSync(pageSrc).map(val => {
        const src = `${pageSrc}/${val}`;
        if (fs.statSync(src).isDirectory()) {
            menu[val] =  {
              import: `${pageSrc}/${val}/${val}.ts`,
              filename: `pages/${val}/${val}.js`
            };
        } 
    });
    return menu;
};
module.exports = env => {
  console.log(env)
  const isDev = env.dev === 'dev';
 const menu = getMenuDir();
  return {
    devtool: isDev ? 'eval-cheap-source-map' : false,
    entry: menu,
    output: {
      path: path.join(__dirname, './miniprogram'),
      filename: "[name].js",
     // 要是使用runtimeChunk，这里的文件是runtimeChunk 的运行时分析文件,只能用hash,不能用chunkhash
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
