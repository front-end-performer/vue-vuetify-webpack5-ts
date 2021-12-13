const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { VuetifyLoaderPlugin } = require("vuetify-loader");
const fs = require("fs");
const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version || 0;
// to be able to get version in dev or prod mode
process.env.PACKAGE_VERSION = version;

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/,
        options: { esModule: true, presets: ["@babel/preset-env"] },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        // For pure CSS (without CSS modules)
        test: /\.css$/i,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: { implementation: require("dart-sass") },
          },
        ],
      },
      { test: /\.(?:svg)$/i, type: "asset/inline" },
      { test: /\.(?:ico|gif|png|jpg|jpeg|txt)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new webpack.ProvidePlugin({
      Vue: ["vue/dist/vue.esm.js", "default"],
    }),
    new ESLintPlugin(),
    new webpack.DefinePlugin({
      "process.env": { PACKAGE_VERSION: '"' + version + '"' },
    }), //https://medium.com/hceverything/how-to-show-your-app-version-from-package-json-in-your-vue-application-11e882b97d8c
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve("src/"),
    },
    extensions: [".js", ".ts", ".vue"],
  },
};
