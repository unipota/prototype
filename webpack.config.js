module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./src/js/game.js'],
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: [ { loader: 'file-loader' } ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  devServer: {
    contentBase: __dirname + '/public',
    watchContentBase: true
  }
};