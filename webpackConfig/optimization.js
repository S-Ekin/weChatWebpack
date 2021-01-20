/**
 * @name SEkin
 * @description description
 * @time 2020-07-10
 */
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = function () {
    return {
      minimize: false,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
      chunkIds: 'named',
      moduleIds: 'named',
      // 优化持久化缓存的, runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单, 模块信息清单在每次有模块变更(hash 变更)时都会变更, 所以我们想把这部分代码单独打包出来, 配合后端缓存策略, 这样就不会因为某个模块的变更导致包含模块信息的模块(通常会被包含在最后一个 bundle 中)缓存失效. optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.
      // runtimeChunk: {
      //    // 包清单
      //    name: "runtime",
      //  },
      splitChunks: {
        automaticNameDelimiter: '~', // 分隔符 yong * 可能会导致报错
        chunks: 'all', 
        minSize: 0,
        name: false, 
        // maxSize: 0,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3, // 很重要不然会导致有的js不能打包进去 // 每个入口并行加载的最大请求数（最多能拆分的包）是用来限制入口的拆分数量
        cacheGroups: {
          default: {
            // 检查初始化时，自己的源码的公共代码
            test: /src/,
            chunks: 'initial',
            name: 'commonMain', // 这里要是指定了名字那么，那会把所有这个拆分条件的全放在commonMain这个文件下
            priority: 4,
            minChunks: 5,
            // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
            reuseExistingChunk: true, 
          },
          vendors: {
            // 检查初始化的，同步加载的第三方库 (也就是entry里的js第一次加载时引入的)
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            name: 'vendor',
            // filename: '[name].bundle.js',
            priority: -10,
            enforce: true, // 强制检查打包，不管最小或最大的chunk限制
            minChunks: 1,
            reuseExistingChunk: true, 
          },
        },
      },
    };
};
