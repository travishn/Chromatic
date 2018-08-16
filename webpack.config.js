module.exports = {
  entry: "./js/chromatic.js",
  output: {
    filename: "../js/bundle.js"
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