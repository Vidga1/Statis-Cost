const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
  },
  output: {
    clean: true,
    filename: '[name].bundle.[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'hidden-source-map'
      : 'eval-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    // allowedHosts: "all",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    ...(isDev
      ? [new MiniCssExtractPlugin()]
      : [
          new MiniCssExtractPlugin({
            chunkFilename: '[name].[contenthash].css',
            filename: '[name].[contenthash].css',
          }),
        ]),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new FaviconsWebpackPlugin('src/public/favicon.png'),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|ts|jsx|tsx)$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[hash][ext]',
        },
      },
    ],
  },
};
