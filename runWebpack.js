const Webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const optionFn = require('./webpack.config.js');
// const optionFn = require('./webpack.config.js');
const optionFn = require("./webpack.config.js");

const config = optionFn({
    pro:"pro"
});
const compiler = Webpack(config);
compiler.run();

// api 调用 webpack-dev-server
//  const config = optionFn("development");
// const compiler = Webpack(config);
// const devConfig = Object.assign({}, config.devServer, {
//     hot: true,
//     publicPath: '/web/',
// });
// const server = new WebpackDevServer(compiler, devConfig);
// server.listen(8282, "0.0.0.0");
