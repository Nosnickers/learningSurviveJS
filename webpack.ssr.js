const path = require("path");
const APP_SOURCE = path.join(__dirname, "src");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

module.exports = merge(
  {
    mode: "production",
    entry: { index: path.join(APP_SOURCE, "ssr.js") },
    output: {
      path: path.join(__dirname, "static"),
      filename: "[name].js",
      // libraryTarget: "umd",
      // globalObject: "this",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: APP_SOURCE,
          use: "babel-loader",
        },
      ],
    },
  },
  parts.clean()
);
