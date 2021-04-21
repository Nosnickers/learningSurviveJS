const { mode, compi, analyzeri } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const path = require("path");

const cssLoaders = [parts.autoprefix(), parts.tailwind()];
const customldr = require("./webpack.customloader");
const commonConfig = merge([
  // customldr.customloaders(),
  {
    output: {
      path: path.resolve(process.cwd(), "dist"),
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
    },
  },
  parts.clean(),
  {
    entry: ["./src"],
  },
  parts.page({ title: "Demo" }),
  // parts.loadCSS(),
  parts.loadImages({ limit: 15000 }),
  parts.extractCSS({ loaders: cssLoaders }),
  // parts.eliminateUnusedCSS(),
  parts.loadJavaScript(),
  parts.setFreeVariable("HELLO", "hello from config"),
]);

const productionConfig = merge([
  parts.attachRevision(),
  parts.autoAnalyzerPlugin(analyzeri),
  // parts.generateSourceMaps({ type: "hidden-source-map" }),
  // { recordsPath: path.join(__dirname, "records.json") },  // records.json 存在的话，会影响build。需注意
  parts.generateSourceMaps({ type: "source-map" }),
  { mode: "production" },
  parts.bundleSplit(),
  parts.minifyJavaScript(),
  parts.minifyCSS({ options: { preset: ["default"] } }),
  parts.eliminateUnusedCSS(),
]);

const developmentConfig = merge([
  {
    entry: ["webpack-plugin-serve/client"],
  },
  parts.devServer(compi),
  parts.bundleSplit(),
  parts.minifyJavaScript(),
  parts.generateSourceMaps({ type: "source-map" }),
]);

const getConfig = (mode = "production") => {
  switch (mode) {
    // 动态编译不同环境 和 动态加载间有问题 TODO
    // case "prod:legacy":
    //   process.env.BROWSERSLIST_ENV = "legacy";
    //   return merge(commonConfig, productionConfig);
    // case "prod:modern":
    //   process.env.BROWSERSLIST_ENV = "modern";
    //   return merge(commonConfig, productionConfig);
    case "build:dev":
      return merge(commonConfig, developmentConfig, { mode, compi });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    case "build:prod-analyzer":
      return merge(commonConfig, productionConfig, { mode, analyzeri });
    case "production":
    default:
      return merge(commonConfig, productionConfig, { mode });
    // throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);
