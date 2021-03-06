const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //利用 path 模組來處理相對路徑的問題
    filename: 'app.bundle.js'
    // 整體結果會在./dist/app.bundle.js
  },
  resolve: {
    // alias: {
    //   vue$: 'vue/dist/vue.esm.js'
    // }
  },
  module: {
    rules: [{ test: /\.vue$/, use: 'vue-loader' }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};
