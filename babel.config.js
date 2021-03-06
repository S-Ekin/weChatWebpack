module.exports = function (api) {
	api.cache(true);

	const presets = [
		[
			"@babel/preset-env",
			{
				useBuiltIns: "entry",
				debug: false, // 可以查看因为兼容浏览器环境而导入的一些polyfill
				corejs: 3,
			},
		],
		"@babel/preset-typescript",
	];

	const plugins = [
		[
			"@babel/plugin-transform-runtime",
			{
				corejs: false, // 默认值，可以不写
				helpers: true, // 默认，可以不写
				regenerator: false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
				useESModules: true, // 使用 es modules helpers, 减少 commonJS 语法代码
			},
		],
		"@babel/proposal-class-properties",
		"@babel/proposal-object-rest-spread",
		"@babel/plugin-proposal-optional-chaining",
	];

	return {
		presets,
		plugins,
	};
};
