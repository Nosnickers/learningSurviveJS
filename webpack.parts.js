const { WebpackPluginServe } = require("webpack-plugin-serve");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

exports.devServer = (compi) => ({
  watch: !compi,
  optimization: {
    usedExports: true,
    // splitChunks: {
    //   sideEffects: [
    //     "*.css",
    //     // "@babel/polyfill"
    //   ],
    // },
  },
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: "./dist", // Expose if output.path changes
      liveReload: true,
      waitForBuild: true,
    }),
  ],
});

// exports.page = ({ title }) => ({
//   plugins: [new MiniHtmlWebpackPlugin({ context: { title } })],
// });
exports.page = ({ title, url = "", chunks } = {}) => ({
  plugins: [
    new MiniHtmlWebpackPlugin({
      publicPath: "/",
      chunks,
      filename: `${url && url + "/"}index.html`,
      context: { title },
    }),
  ],
});

exports.loadCSS = () => ({
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
});

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options },
            "css-loader",
          ].concat(loaders),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
  };
};

exports.tailwind = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: { plugins: [require("tailwindcss")()] },
  },
});

exports.bundleSplit = () => ({
  // entry: {
  //   app: {
  //     import: path.join(__dirname, "src", "index.js"),
  //     dependOn: "vendor",
  //   },
  //   vendor: ["react", "react-dom"],
  // },
  optimization: {
    splitChunks: {
      maxSize: 30000,
      // css/mini-extra is injected by mini-css-extract-plugin
      minSize: { javascript: 10000, "css/mini-extra": 5000 },
      // usedExports: true,
      chunks: "all",
    },
    runtimeChunk: { name: "runtime" },
  },
  // plugins: [
  //   new webpack.optimize.AggressiveSplittingPlugin({
  //     minSize: 10000,
  //     maxSize: 30000,
  //   }),
  // ],
});

const path = require("path");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

const ALL_FILES = glob.sync(path.join(__dirname, "src/*.js"));
exports.eliminateUnusedCSS = () => ({
  plugins: [
    new PurgeCSSPlugin({
      paths: ALL_FILES, // Consider extracting as a parameter
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["html"],
        },
      ],
    }),
  ],
});

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: { plugins: [require("autoprefixer")()] },
  },
});

exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});

const APP_SOURCE = path.join(__dirname, "src");

exports.loadJavaScript = () => ({
  module: {
    rules: [
      // Consider extracting include as a parameter
      { test: /\.js$/, include: APP_SOURCE, use: "babel-loader" },
    ],
  },
});

// https://survivejs.com/webpack/building/source-maps/
exports.generateSourceMaps = ({ type }) => {
  return {
    devtool: type,
    output: {
      sourceMapFilename: "[file].map",
    },
  };
};

exports.clean = () => ({ plugins: [new CleanWebpackPlugin()] });

const GitRevisionPlugin = require("git-revision-webpack-plugin");
exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

const TerserPlugin = require("terser-webpack-plugin");
exports.minifyJavaScript = () => ({
  optimization: { minimizer: [new TerserPlugin()] },
});

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

exports.minifyCSS = ({ options }) => ({
  optimization: {
    minimizer: [new CssMinimizerPlugin({ minimizerOptions: options })],
  },
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
exports.autoAnalyzerPlugin = (analyzeri) => ({
  plugins: analyzeri ? [new BundleAnalyzerPlugin()] : [],
});

const { ModuleFederationPlugin } = require("webpack").container;
exports.federateModule = ({ name, filename, exposes, remotes, shared }) => ({
  plugins: [
    new ModuleFederationPlugin({
      name,
      filename,
      exposes,
      remotes,
      shared,
    }),
  ],
});
