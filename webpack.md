# Webpack 學習紀錄

---

## chap 1 安裝 Webpack

安裝 webpack(npm 套件安裝)，在 webpack 3 中，webpack 本身和它的 CLI 以前都是同一個套件，但在第 4 版中，已經兩者分開來管理。

```
npm install webpack webpack-cli --save-dev
npm i webpack webpack-cli -D
```

如果你只安裝 webpack，下 webpack 指令 `./node_modules/.bin/webpack` 程式會請你安裝 webpack-cli

```shell
One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:
 - webpack-cli (https://github.com/webpack/webpack-cli)
   The original webpack full-featured CLI.
We will use "npm" to install the CLI via "npm install -D".
Do you want to install 'webpack-cli' (yes/no): no
You need to install 'webpack-cli' to use webpack via CLI.
You can also install the CLI manually.
```

---

## chap2

安裝 webpack-cli 之後，就可以透過 cli 加上 \*.js config 檔來對你的專案進行打包，因此我們要建立一個 `webpack.config.js` 的檔案

實際上你也可以不用透過 \*.js config 檔來進行打包，可以給予你程式的進入點跟打包完輸出的位置進行建置。更多訊息請參考文件 (https://www.webpackjs.com/api/cli/)

不過實際上大家都是透過 config 檔去設置打包的方式，因此可以將下列指令加到你的 npm script 裡面，這樣你以後要開發就可以透過 `npm run build` 執行 webpack

```json
{
  //...
  "scripts": {
    //...
    "build": "./node_modules/.bin/webpack ---config webpack.config.js "
  }
}
```
