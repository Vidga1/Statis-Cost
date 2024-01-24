import webpack from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';

type Mode = 'none' | 'development' | 'production' | undefined;

const NODE_ENV: Mode = process.env.NODE_ENV as Mode;
const PREFIX = process.env.PREFIX || '/';

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    clean: true,
    environment: {
      arrowFunction: false,
    },
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '404.html',
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(NODE_ENV === 'production'),
      PREFIX: JSON.stringify(PREFIX),
    }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    watchFiles: ['src/index.html'],
    historyApiFallback: true,
  },
};

export default config;
