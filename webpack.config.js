module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./src/js/game.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  devServer: {
    contentBase: __dirname + '/public'
  }
};