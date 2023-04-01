/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      index: path.resolve(__dirname, "./src/index.ts"),
      components: path.resolve(__dirname, "./src/components"),
      utils: path.resolve(__dirname, "./src/utils"),
      pages: path.resolve(__dirname, "./src/pages"),
      api: path.resolve(__dirname, "./src/api"),
      assets: path.resolve(__dirname, "./src/assets"),
      controllers: path.resolve(__dirname, "./src/controllers"),
      core: path.resolve(__dirname, "./src/core"),
      mockData: path.resolve(__dirname, "./src/mockData"),
      handlebars: "handlebars/dist/handlebars.min.js",
    },
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /(node_modules)/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|jpg|avif|svg|ico)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./images/[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
    }),

    new MiniCssExtractPlugin({}),
  ],
};
