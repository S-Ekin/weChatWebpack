/**
 * @name SEkin
 * @description 
 * @time 2020-07-10
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin: CleanDistPlugin } = require('clean-webpack-plugin'); // 清理指定文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 打包时分离css
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin');// 查看打包进度
const IdeaFormatter = require('../plugins/MyWebpackPlugin');// 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = function (isDev, allPage) {
    const { menu, main } = allPage;
    const templateSrc = !isDev ? "../templates/" : "";
    const parCatalogObj = { };
    const htmlMain = main.map(val => {
      const name = val.split(".")[0];
      const src = "../src/router/" + name + ".html";
      parCatalogObj[name] = "";
      return new HtmlWebpackPlugin({
        filename: `${templateSrc}${name}.html`,
        inject: 'body',
        hash: true,
        template: path.join(__dirname, src), // 这里是 以这个 plugin.js 文件的路径为基础
        chunks: [name, 'vendor', 'commonMain', `runtime`],
      });
    });

    const htmlMenu = [];
    for (const key in menu) {
      const child = menu[key];
      child.forEach(file => {
        const src = `../src/router/${key}/${file}.html`;
        const enterModuleName = `${file}`;
        parCatalogObj[file] = key;
        const item = new HtmlWebpackPlugin({
            filename: isDev ? `${file}.html` : `${templateSrc}${key}/${file}.html`,
            inject: 'body',
            hash: true,
            template: path.join(__dirname, src), // 这里是 以这个 plugin.js 文件的路径为基础
            chunks: [enterModuleName, 'commonMain', 'vendor', `runtime`],
        });
        htmlMenu.push(item);
      });
    }

    return [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:5].css', 
        // moduleFilename: (chunks) => {
        //   console.log(chunks);
        // const name = chunks.name;
        //   const par = parCatalogObj[name] ? parCatalogObj[name] + "/" : "";
        //   return `css/${par}${name}.[hash:5].css`;
        // },	
        chunkFilename: ({ chunk }) => {
          const name = chunk.id;
          const par = parCatalogObj[name] ? parCatalogObj[name] + "/" : "";
          return `css/${par}${name}.[chunkhash:5].css`;
        }, 
      }),
      ...htmlMain,
      ...htmlMenu,
      new ProgressBarPlugin(),
      new CopyWebpackPlugin([{ from: './src/assert', to: './assert' }]),
      isDev ? function () {} : new CleanDistPlugin(),
      isDev ? function () {} : new IdeaFormatter(), // 格式化html 成为Idea 的模板
      new webpack.HotModuleReplacementPlugin(), // 模块的热替换
      new webpack.NamedModulesPlugin(), // 热更新时显示更新的模块的名字，默认是模块的id
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
      // isDev ? function () {} : new BundleAnalyzerPlugin(
      //    {
      //         analyzerMode: 'server',
      //         analyzerHost: '127.0.0.1',
      //         analyzerPort: 8889,
      //         reportFilename: 'report.html',
      //         defaultSizes: 'parsed',
      //         openAnalyzer: true,
      //         generateStatsFile: false,
      //         statsFilename: 'stats.json',
      //         statsOptions: null,
      //         logLevel: 'info',
      //     },
      // ),
    ];
};
