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

## 应用到的知识点

### ES6 解构
在定义常量的时候用到了es6中对象的解构。把常量定义到window对象中，方便全局访问。
书籍《深入理解ES6》中对[解构](https://blog.csdn.net/lin5165352/article/details/82345899)有详细的介绍。
### ES6 async await

### 纹理加载
纹理的加载使用了两种不同的方式。一种在使用的时候加载，一种提前缓存。
1. 直接加载，和之前的加载方式不一样，需要通过require 的方式。
```javascript
//let maps1 = new THREE.TextureLoader().load(./assets/mapd.jpg); //加载不了
let imgurl = require('./assets/mapd.jpg') 
let maps1 = new THREE.TextureLoader().load(imgurl);
```

## 版本1.0.1