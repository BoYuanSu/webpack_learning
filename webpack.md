# Webpack 學習紀錄

## chap 1 安裝 Webpack

安裝 webpack(npm 套件安裝)，在 webpack 3 中，webpack 本身和它的 CLI 以前都是同一個套件，但在第 4 版中，已經兩者分開來管理。

```
npm install webpack webpack-cli --save-dev
npm i webpack webpack-cli -D
```

如果你只安裝 webpack，下 webpack 指令程式會請你安裝 webpack-cli

```shell
One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:
 - webpack-cli (https://github.com/webpack/webpack-cli)
   The original webpack full-featured CLI.
We will use "npm" to install the CLI via "npm install -D".
Do you want to install 'webpack-cli' (yes/no): no
You need to install 'webpack-cli' to use webpack via CLI.
You can also install the CLI manually.
```
