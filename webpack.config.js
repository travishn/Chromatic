const path = require('path');

module.exports = {
  entry: path.join(__dirname, './js/chromatic.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, "./js"),
  },
  module: {
    rules: [{
      test: [/\.jsx?$/],
      exclude: /(node_modules)/,
      loader: "babel-loader",
      query: {
        presets: ["env"]
      }
    }]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", "*"]
  }
};