const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./src/js/game.js'],
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: [ { loader: 'file-loader' } ]
      },
      {
        test: /\.html$/
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  devServer: {
    contentBase: __dirname + '/public',
    watchContentBase: true,
    port: 1235
  },
  resolve: {
    alias: {
      'js': path.resolve(__dirname, 'src/js'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/img', to: './public/assets/img' }
    ]),
    new PrettierPlugin({
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: false,
      singleQuote: true,
      trailingComma: 'none',
      bracketSpacing: true,
      encoding: 'utf-8',
      extensions: [ '.js', '.ts' ]
    })
  ]
};
