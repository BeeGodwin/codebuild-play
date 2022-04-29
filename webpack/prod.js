const merge = require("webpack-merge");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js",
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 1100000,
    maxAssetSize: 1100000,
  },
  devServer: undefined,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
