const { sources, Compilation } = require("webpack");

module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const pluginName = "DemoPlugin";
    const { name } = this.options;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      const logger = compiler.getInfrastructureLogger("Demo Plugin");
      logger.log("hello from compiler thisCompilation");
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          // See lib/Compilation.js in webpack for more
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => compilation.emitAsset(name, new sources.RawSource("hello", true))
      );
    });
  }
};
