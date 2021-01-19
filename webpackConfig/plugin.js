/**
 * @name SEkin
 * @description 
 * @time 2020-07-10
 */
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin: CleanDistPlugin } = require('clean-webpack-plugin'); // 清理指定文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 打包时分离css
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin');// 查看打包进度
const IdeaFormatter = require('../plugins/MyWebpackPlugin');// 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = function (isDev) {
   
    return [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css', 
        // chunkFilename: ({ chunk }) => {
        //   const name = chunk.id;
        //   const par = parCatalogObj[name] ? parCatalogObj[name] + "/" : "";
        //   return `css/${par}${name}.[chunkhash:5].css`;
        // }, 
      }),
      new ProgressBarPlugin(),
      new CopyWebpackPlugin({
        patterns: [
         { from: './src/image', to: './image' }
        ],
      }),
      isDev ? function () {} : new CleanDistPlugin(),
      isDev ? function () {} : new IdeaFormatter(), // 格式化html 成为Idea 的模板
      // new webpack.HotModuleReplacementPlugin(), // 模块的热替换
     // new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
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
