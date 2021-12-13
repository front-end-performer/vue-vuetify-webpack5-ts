const express = require("express");
const https = require("https");
const fs = require("fs");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const history = require("connect-history-api-fallback");

// Setup
const app = express();
app.use(history());
const port = process.env["REACT_APP_PORT"] || "8080";
const config = require("./config/webpack.dev.js");
const compiler = webpack(config);
const host = config.devServer.host || "localhost";

const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: true,
});

app.use(middleware);
app.use(require("webpack-hot-middleware")(compiler));

// serving static assets
app.use("/assets", express.static(config.devServer.contentBase));
app.use("/style.css", express.static(__dirname + "/public/style.css"));
app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

console.log("\nWelcome to Qscr Dev Server!\n");

// Launch app
app.listen(port, host, () => {
  console.log("Launching app... http://" + host + ":" + port);
});

https
  .createServer(app)
  .listen(parseInt(port) + 1, () => {
    console.log(
      "Launching app (SSL)... https://" + host + ":" + (parseInt(port) + 1)
    );
  });
