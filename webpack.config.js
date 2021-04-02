const { mode, compi } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");

const cssLoaders = [parts.autoprefix(), parts.tailwind()];

const commonConfig = merge([
  {
    entry: [
      "./src",
    ],
  },
  parts.page({ title: "Demo" }),
  // parts.loadCSS(),
  parts.loadImages({ limit: 15000 }),
  parts.extractCSS({ loaders: cssLoaders }),
  parts.eliminateUnusedCSS(),
  parts.loadJavaScript(),
]);

const productionConfig = merge([
  { mode: "production" },
  parts.generateSourceMaps({ type: "hidden-source-map" }),
]);

const developmentConfig = merge([
  {
    entry: ["webpack-plugin-serve/client"],
  },
  parts.devServer(compi),
  parts.generateSourceMaps({ type: "eval-source-map" }),
]);

const getConfig = (mode = "production") => {
  switch (mode) {
    case "prod:legacy":
      process.env.BROWSERSLIST_ENV = "legacy";
      return merge(commonConfig, productionConfig);
    case "prod:modern":
      process.env.BROWSERSLIST_ENV = "modern";
      return merge(commonConfig, productionConfig);
    case "build:dev":
      return merge(commonConfig, developmentConfig, { mode, compi });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    case "production":
    default:
      return merge(commonConfig, productionConfig, { mode });
    // throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);
