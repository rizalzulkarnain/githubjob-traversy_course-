require('dotenv').config();
var path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = (env) => {
  const isProduction = env && env.production !== undefined;

  const plugins = [new Dotenv(), new webpack.HotModuleReplacementPlugin()];

  return {
    entry: './src/index.js',
    mode: isProduction ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },

    devtool: isProduction ? 'none' : 'cheap-module-eval-source-map',

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, // this prevents the default browser full page refresh on form submission and link change
      port: 3000,
      hot: true, //enable hot module replacement feature
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:8082',
      //     secure: false,
      //     changeOrigin: true,
      //   },
      // },
    },
    plugins: plugins,
    resolve: {
      extensions: ['.js'],
      alias: {
        routers: path.resolve(__dirname, 'src/routers'),
        components: path.resolve(__dirname, 'src/components'),
      },
    },
  };
};
