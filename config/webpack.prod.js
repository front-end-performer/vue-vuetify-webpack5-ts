const paths = require("./paths");
const pathtoresolve = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = merge(common, {
	entry: {
		app: ["./src/main.ts"],
	},
	mode: "production",
	devtool: false,

	output: {
		filename: "[name].[contenthash].js?v=" + process.env.PACKAGE_VERSION,
		clean: true,
	},

	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: pathtoresolve.resolve("public", "manifest.json"),
					to: pathtoresolve.resolve("dist"),
				},
				{
					from: pathtoresolve.resolve("public", "style.css"),
					to: pathtoresolve.resolve("dist"),
				},
				{
					from: pathtoresolve.resolve("public", "robots.txt"),
					to: pathtoresolve.resolve("dist"),
				},
				{
					from: pathtoresolve.resolve("src", "assets"),
					to: pathtoresolve.resolve("dist", "assets"),
				},
			],
		}),
		new HtmlWebpackPlugin({
            title: "VUE2-WEBPACK5-PROD",
			template: paths.public + "/index.html", // template file
			inject: "body",
			output: {
				filename: "[name].[contenthash].js?v=" + process.env.PACKAGE_VERSION,
			},
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
			},
			// Cache the generated webpack modules and chunks to improve build speed - should be disable in prod
			cache: false,
		}),
		// Extracts CSS into separate files
		// Note: style-loader is for development, MiniCssExtractPlugin is for production
		new MiniCssExtractPlugin({
			filename: "style.[contenthash].css?v=" + process.env.PACKAGE_VERSION,
			ignoreOrder: true,
		}),
		new GenerateSW({
			cacheId: "qscr",
			swDest: pathtoresolve.resolve(process.cwd(), "dist/service-worker.js"),
			runtimeCaching: [
				{
					//https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.StaleWhileRevalidate
					handler: "StaleWhileRevalidate",
					urlPattern: /\.(?:js|ts|css|html)$/,
					options: {
						cacheName: "static-assets-cache",
						cacheableResponse: {
							statuses: [0, 200],
						},
						expiration: {
							maxEntries: 10,
							maxAgeSeconds: 24 * 60 * 60 * 60,
						},
					},
				},
				{
					//https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.CacheFirst
					handler: "CacheFirst",
					urlPattern: /\.(?:jp?g|png|svg|gif|raw|webp)$/,
					options: {
						cacheName: "images-assets-cache",
						cacheableResponse: {
							statuses: [200],
						},
						expiration: {
							maxEntries: 10,
							maxAgeSeconds: 24 * 60 * 60 * 180,
						},
					},
				},
				{
					handler: "CacheFirst",
					urlPattern: /\.(?:woff|woff2|eot|ttf|otf)$/,
					options: {
						cacheName: "fonts-assets-cache",
						cacheableResponse: {
							statuses: [200],
						},
						expiration: {
							maxEntries: 10,
							maxAgeSeconds: 24 * 60 * 60 * 180,
						},
					},
				},
			],
			clientsClaim: true,
			skipWaiting: true,
			cleanupOutdatedCaches: true,
			maximumFileSizeToCacheInBytes: 8000000,
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{
						loader: "css-loader",
						options: {
							modules: {
								mode: "global",
							},
						},
					},
					"sass-loader",
				],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
				parallel: true,
			}),
			"...",
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: "node_vendors",
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
				},
			},
		},
		// Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
		// instead of having their own. This also helps with long-term caching, since the chunks will only
		// change when actual code changes, not the webpack runtime.
		runtimeChunk: {
			name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
		},
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
