const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [ { 
          loader: 'file-loader?name=[name].[ext]',
          options: { outputPath : 'assets/' }
        } ]
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
    ])
  ]
};