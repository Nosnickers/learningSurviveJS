const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const path = require("path");

module.exports = merge(
  { mode: "production", entry: { app: "./src/multi.js" } },
  {
    output: {
      path: path.resolve(process.cwd(), "dist"),
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
    },
  },
  parts.clean(),
  parts.page({ title: "Demo" }),
  parts.page({ title: "Another", url: "another" })
);
