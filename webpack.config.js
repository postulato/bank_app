const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: __dirname + "/src/index.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + "/dist", // Folder to store generated bundle
    filename: "bundle.js", // Name of generated bundle after build
    publicPath: "", // public URL of the output directory when referenced in a browser
  },
  module: {
    // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false, sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [postcssPresetEnv({ stage: 3 })],
            },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "dist/images",
        },
      },

    ],
  },
  plugins: [
    // Array of plugins to apply to build chunk
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
      inject: "body",
    }),
  ],
  devServer: {
    // configuration for webpack-dev-server
    contentBase: "./src/public", //source of static assets
    port: 7700, // port to run dev-server
  },
};
