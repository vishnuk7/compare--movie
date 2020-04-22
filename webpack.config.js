const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./js/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
