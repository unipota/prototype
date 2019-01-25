const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');

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
    port: 1234
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/img', to: 'assets/img' }
    ]),
    new PrettierPlugin({
      printWidth: 80,               
      tabWidth: 2,                 
      useTabs: false,              
      semi: false,                  
      singleQuote: true,
      trailingComma: false,
      bracketSpacing: true,
      encoding: 'utf-8',           
      extensions: [ ".js", ".ts" ]  
    })
  ]
};