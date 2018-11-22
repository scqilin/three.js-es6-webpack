# three.js-es6-webpack

基于ES6开发的three.js演示项目

## 项目目录：
- public : 打包后文件夹
- src : 项目文件
    - assets : 项目资源文件夹,图片视频等
        - mapb.jpg
    - css :
        - index.css
    - util : 引入的js库文件
        - state.js
    - consts.js ：项目中的常量
    - main.js : 项目入口文件
- index.html 页面模板
- package.json
- webpak.config.js


## 运行结果
显示三个带纹理的物体。两个球体，一个立方体。能够通过orbitControls控制来控制场景。

[演示地址](https://scqilin.github.io/three.js-es6-webpack/public/index.html)

![avatar](https://raw.githubusercontent.com/scqilin/three.js-es6-webpack/master/src/assets/es6-threejs.jpg)

## 知识点

### ES6 解构
在定义常量的时候用到了es6中对象的解构。把常量定义到window对象中，方便全局访问。
书籍《深入理解ES6》中对[解构](https://blog.csdn.net/lin5165352/article/details/82345899)有详细的介绍。

### ES6 async await
处理异步问题。有待研究。

### 纹理加载
纹理的加载使用了两种不同的方式。一种在使用的时候加载，一种提前缓存。
1. 直接加载，和之前的加载方式不一样，需要通过require 的方式。
```javascript
//let maps1 = new THREE.TextureLoader().load(./assets/mapd.jpg); 
let imgurl = require('./assets/mapd.jpg') 
let maps1 = new THREE.TextureLoader().load(imgurl);
```
2. 提前缓存，异步加载。
返回一个Promise,所有图片加载完成的时候为resolve 。

### webpack部分配置说明
参考之前写的一篇文章[webpack入门使用教程](https://blog.csdn.net/lin5165352/article/details/82285972)

1. 使用 source map
当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。
为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。
source map [有很多不同的选项](https://www.webpackjs.com/configuration/devtool/)，以便可以根据需要进行配置。如下面两种常用配置。
devtool: 'eval-source-map',   //  原始源代码 
devtool: 'inline-source-map', //  原始源代码 

2. webpack-dev-server  
方便开发

3. HtmlWebpackPlugin  
提供html模板

4. DashboardPlugin  
webpack-dashboard是一统计和优化webpack日志的工具，可以以表格形势展示日志信息。其中包括构建过程和状态、日志以及涉及的模块列表

5. Lodash  
是一个一致性、模块化、高性能的 JavaScript 实用工具库。
Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。 
Lodash 的模块化方法 非常适用于：
    -  遍历 array、object 和 string
    -  对值进行操作和检测
    -  创建符合功能的函数
    -  入口函数main.js中 _initStage 就使用了lodash/fp 简化了代码。

6. 通过npm方式增加了dat.gui 和 WEBGL ，

7. 使用es6 中 calss 方式，并使用单例模式。入口main1.js  class 在 base.js。通过静态函数方式 初始化场景。多次调用只返回一个。发布分支版本吧。分支1

## 版本1.1.1
2018年11月19日
