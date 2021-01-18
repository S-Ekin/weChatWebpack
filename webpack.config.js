const path = require('path');
const fs = require("fs");
const moduleFn = require("./webpackConfig/module");
const pluginFn = require("./webpackConfig/plugin");
const optimizationFn = require("./webpackConfig/optimization");
const devServer = require("./webpackConfig/devServer.js");
const pageSrc = "./src/PageJs";

const getMenuDir = function () {
    const menu = {};
    const main = [];

    fs.readdirSync(pageSrc).map(val => {
        const src = `${pageSrc}/${val}`;
        if (fs.statSync(src).isFile()) {
          main.push(val);
        } else {
          menu[val] = fs.readdirSync(src).filter(menu => {
            const src = `${pageSrc}/${val}/${menu}`;
            return fs.statSync(src).isDirectory();
          });
        }
    });
    return {
      menu,
      main,
    };
};
module.exports = env => {
  const isDev = env === 'development';
 const allPage = getMenuDir();
  const { menu, main } = allPage;

  const entryObj = { };
  const parCatalogObj = {};
  main.forEach(val => {
    const name = val.split(".")[0];
    entryObj[name] = path.join(__dirname, `${pageSrc}/${val}`);
    parCatalogObj[name] = "";
  });

  for (const key in menu) {
    if (Object.hasOwnProperty.call(menu, key)) {
       const child = menu[key];
        child.forEach(val => {
        parCatalogObj[val] = key;
        entryObj[`${val}`] = path.join(__dirname, `${pageSrc}/${key}/${val}/index.js`);
      });
    }
  }
  console.log(entryObj, "--------------");
  return {
    devtool: isDev ? 'source-map' : '',
    entry: entryObj,
    output: {
      path: path.join(__dirname, '../static'),
     // 要是使用runtimeChunk，这里的文件是runtimeChunk 的运行时分析文件,只能用hash,不能用chunkhash
     filename: "runtime/[name].[hash:5].js", 
      // filename: isDev ? "runtime/[name].[hash:5].js" : function (pathData) {
      //   // 只会解析运行时文件时调用
      //   const fileName = pathData.chunk.name;
      //   const moduleName = fileName.split("~")[1];
      //    const par = parCatalogObj[moduleName] ? parCatalogObj[moduleName] + "/" : "";
      //    console.log(`runtime/${par}${fileName}.[hash:5].js`);
      //    console.log(`---------------------------------------------------------------------------`);
      //    return `runtime/${par}${fileName}.[hash:5].js`;
      // },
      publicPath: './', 
      // 使用chunkhash 能保证只变动修改的 文件的 chunkhash值
      // 要是不使用 chunkFilename,这会把chunk 出来的文件用filename 的格式
      chunkFilename: 'PageJs/[name].[chunkhash:5].js', // 不能单独针对特定文件，这里只能是字符串，跟filename不一样
    },
    mode: env,
    resolve: {
      extensions: ['.js', '.css', '.json', '.scss'],
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
    module: moduleFn(),
    plugins: pluginFn(isDev, allPage),
    devServer: devServer(),
  };
};
