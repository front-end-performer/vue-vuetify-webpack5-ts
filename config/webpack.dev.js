const paths = require("./paths");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  // Where webpack looks to start building the bundle
  entry: {
    app: ["./src/main.ts", "webpack-hot-middleware/client"],
  },

  // // Set the mode to development or production
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",

  output: {
    path: paths.build,
    filename: "[name].js",
    publicPath: "/",
    clean: true,
  },

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: paths.src + "/assets",
    path: paths.build,
    open: true,
    compress: true,
    hot: true,
    publicPath: "/",
    port: 8080,
    host: "0.0.0.0",
    disableHostCheck: true,
  },
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      title: "VUE2-WEBPACK5-DEV",
      inject: "body",
      template: "public/index.html", // template file
      output: {
        filename: "[name].js",
      },
      // Cache the generated webpack modules and chunks to improve build speed - disable in prod
      cache: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
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
  stats: {
    colors: true,
    // Tells stats to add information about the reasons of why modules are included
    // reasons: true,
    errorDetails: true,
  },
});
