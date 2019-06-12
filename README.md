# Webpack 學習紀錄

目的：讓大家可以用 Webpack 進行 Vue 學習，熟悉未來專案開發的模式

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

## chap3

### webpack.config.js 檔案設置

webpack 打包有四個核心概念

- entry: 模組打包的進入點，預設值是 `./src`，webpack 會從此檔案開始建立你的專案的 dependency
- output: 告訴 webpack 你希望將打包完的檔案 (bundle) 輸出至哪裡
- loader: 處理非 JavaScript 檔案檔案(.css/.vue...etc)，透過 loader 預先處理 import 的模組，
- plugins: 打包優化和壓縮，到重新定義環境中的變數，處理各式各樣的任務，使用 plugins 時，需要 `require()` 模組。目前我有用到 `html-webpack-plugin`將打包結果注入到已存在的 html 檔、`HotModuleReplacementPlugin`自動偵測檔案變化重新打包

[Reference](https://www.webpackjs.com/concepts/)

接下來我們在可以在 webpack.config.js 進行下列簡單的設定，這個設定讓我們可以將 `./src/index.js` 打包並輸出至 `./dist/app.bundle.js`

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
};
```

### mode 開發/生產環境設定

此外還有 [`mode`](https://www.webpackjs.com/concepts/mode/) 可以設定開發、正式環境，可以設定為 development 或是 production，可以針對環境自動開關一些 plugins。

當打包時如果沒帶入 `mode` 的資訊，cli 也會跳出相關的警告

`WARNING in configuration The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/`

因此我們將 npm script 加入下列的指令用來區分開發/生產環境的建置

```json
"scripts": {
    "build": "./node_modules/.bin/webpack-cli ---config webpack.config.js --mode=production",
    "dev": "./node_modules/.bin/webpack-cli ---config webpack.config.js --mode=development"
  },
```

## chap4

### 建立 Vue 開發設定

首先安裝 vue，然後就可以像以前一樣，在 index.js 裡面寫 vue(嗎？

```
npm i vue -S
```

```js
import Vue from 'vue';

new Vue({
  el: '#app',
  data: {
    message: 'Vue!'
  }
});
```

然後開啟網頁之後會發現錯誤

```
vue.runtime.esm.js:620 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

(found in <Root>)
```

這是因為 webpack 預設打包 vue 不包含 template compiler 的功能，也就是說如果你的 vue instance 包含 template 的屬性(直接在 html 裡面使用模版也算)，就會發生錯誤。

#### runtime-only build 解決方式

1. 在 webpack 設定檔內建立別名，讓 webpack 遇到 `vue` 這個字眼時，自動辨識為 `vue/dist/vue.esm.js`，這樣 webpack 打包出來的 vue 版本就包含 template compiler 的功能。

   ```js
   module.exports = {
     // ...
     // 補充說明 resolve 是 webpack 打包時再 import 模組時，可以修改解析模組的方式
     // 所以下面的意思是在 import vue 時，是去找 vue 裡面的某一支 js 進行打包
     // '$' 表示精準匹配，所以 import vue-xxx 模組不會有影響
     // 更多用法請參考 https://webpack.docschina.org/configuration/resolve/
     resolve: {
       alias: {
         vue$: 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
       }
     }
   };
   ```

   - 優點: 可以更自由的去使用 vue 建立 component 的方式，適合學習時使用
   - 缺點: 打包出來的 js 會變大，不適合作為產品開發

- [Reference](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only)

2. 透過 `*.vue` 檔建立模板，且使用 `vue-loader` 進行編譯。

   - 首先先安裝 loader & template compiler，loader 是 webpack 需要的套件，template comipler 是

   ```
   npm i vue-loader -D
   npm i vue-template-compiler -D
   ```

   - 設定 webpack vue-loader，除了設定 loader 外，也必須加入 vue-loader 的 plugin `VueLoaderPlugin`

   ```js
   const VueLoaderPlugin = require('vue-loader/lib/plugin');
   // ...
   module.exports = {
     // ...
     // 讓 webpack import *.vue 檔的時後，使用 vue-loader 預處理
     // 更多用法請參考 https://webpack.js.org/concepts/loaders
     module: {
       rules: [
         // ...
         {
           test: /\.vue$/,
           loader: 'vue-loader'
         }
       ]
     },
     plugins: [
       // 請確保引入這個 plugin
       new VueLoaderPlugin()
     ]
   };
   ```

   - 建立 `App.vue` 檔

   ```html
   <template>
     <div>Hellow Vue loader</div>
   </template>
   ```

   ```html
   <script>
     export default {
       name: 'App'
     };
   </script>
   ```

   - 修改 `index.js`

   ```js
   import App from './App.vue';
   new Vue({
     render(h) {
       return h(App);
     }
   }).$mount('#app4');
   ```

   - 優點: 除了打包出來的檔案較小之外，在載入頁面的時候，也不會出現瞬間有`{{}}`的問題，因為 component 是先被 render 完畢才嵌入 DOM。
   - 缺點: 不適合初學者
   - [Reference](https://vue-loader.vuejs.org/zh/guide/) 官方說明文件，其實在 component 內如果使用外部資源圖片或是有 `<style>` 設定，webpack 需要更多的 loader，目前暫不說明

## chap5

使用了 webpack 開發之後，會需要開始為每次更動進行重新編譯，為了解決這個麻煩，webpack 提供了 熱重載

```
npm i webpack-dev-server -D
```

只要安裝完成即可使用，因此我們將 npm script 改寫

```json
"scripts": {
    "build": "./node_modules/.bin/webpack-cli --config webpack.config.js --mode=production",
    "dev": "./node_modules/.bin/webpack-dev-server --config webpack.config.js --mode=development"
  },
```

更多功能請參考相關文件
[Hot-Module-Replacement Guides](https://www.webpackjs.com/guides/hot-module-replacement/)

## chap6

其餘小功能分享

### index.html 相關

1. 將 `app.bundle.js` 注入 `index.html`
   原本我們是自己在 html 用 script 引入 app.bundle.js，但 webpack 可以自動幫你注入

   - 安裝套件

   ```
   npm i html-webpack-plugin -D
   ```

   - webpack config

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   module.exports = {
     plugins: [
       new HtmlWebpackPlugin({
         // 使用自訂html樣板
         // filename 可以自訂輸出檔名，預設輸出 到 dist/index.html
         // https://github.com/jantimon/html-webpack-plugin#options
         template: './src/index.html'
       })
     ]
   };
   ```

2.
