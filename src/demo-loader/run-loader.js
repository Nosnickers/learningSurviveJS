const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
  {
    resource: path.resolve(__dirname, "./demo.txt"),
    loaders: [
      {
        loader: path.resolve(__dirname, "./loaders/demo-loader"),
        options: {
          name: "demo.[ext]",
        },
      },
      // { loader: path.resolve(__dirname, "./loaders/pitch-loader") },
      { loader: path.resolve(__dirname, "./loaders/cache-loader") },
    ],
    readResource: fs.readFile.bind(fs),
    context: { emitFile: () => {} },
  },
  (err, result) => (err ? console.error(err) : console.log(result))
);
