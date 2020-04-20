const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./js/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [new Dotenv()],
};
