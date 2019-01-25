const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/img', to: 'assets/img' }
    ])
  ]
};