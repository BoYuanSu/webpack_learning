const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //利用 path 模組來處理相對路徑的問題
    filename: 'app.bundle.js'
    // 整體結果會在./dist/app.bundle.js
  }
};
