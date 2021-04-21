const path = require("path");
exports.customloaders = () => ({
  resolveLoader: {
    alias: {
      "demo-loader": path.resolve(
        __dirname,
        "src/demo-loader/loaders/demo-loader.js"
      ),
      "pitch-loader": path.resolve(
        __dirname,
        "src/demo-loader/loaders/pitch-loader.js"
      ),
    },
  },
});
