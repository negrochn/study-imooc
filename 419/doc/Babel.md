# Babel

**Babel**

- 前端开发环境必备工具
- 同 webpack ，需要了解基本的配置和使用
- 面试考察概率不高，但要求必会
- 环境搭建 & 基本配置
- babel-polyfill
- babel-runtime



**Babel 环境搭建和基本配置**

- 环境搭建
- .babelrc 配置
- presets 和 plugins

`npm init -y` 初始化项目，`npm i @babel/cli @babel/core @babel/preset-env` 安装 Babel 插件。

配置 .babelrc 。

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": []
}
```

创建 src/index.js 。

```js
const sum = (a, b) => a + b
```

执行 `npx babel src/index.js` 。

```shell
PS E:\Coding\github\study-imooc\419\code\babel-demo> npx babel .\src\index.js
"use strict";

var sum = function sum(a, b) {
  return a + b;
};
```

preset 是 Babel 插件（ plugin ）的集合。



**babel-polyfill 是什么**

- 什么是 Polyfill （如 Array.prototype.indexOf ）
- core-js 和 regenerator
- babel-polyfill 即两者的集合



**babel-polyfill 现已被弃用**

- Babel 7.4 之后弃用 babel-polyfill
- 推荐直接使用 core-js 和 regenerator
- 但不影响面试会考察它



`npm i @babel/polyfill --save` 安装 babel-polyfill 。

引入 @babel/polyfill 。

```js
// src/index.js
import '@babel/polyfill'

const sum = (a, b) => a + b

Promise.resolve(100).then(data => data);

[10, 20, 30].includes(20)

// 语法，符合 ES5 语法规范
// 不处理模块化
```

执行 `npx babel src/index.js` 。

```shell
PS E:\Coding\github\study-imooc\419\code\babel-demo> npx babel .\src\index.js
"use strict";

require("@babel/polyfill");

var sum = function sum(a, b) {
  return a + b;
};

Promise.resolve(100).then(function (data) {
  return data;
});
[10, 20, 30].includes(20); // 语法，符合 ES5 语法规范
// 不处理模块化
```



**babel-polyfill 按需引入**

- 文件比较大
- 只有一部分功能，无需全部引入
- 配置按需引入

配置 .babelrc 。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": []
}
```

修改 src/index.js 。

```js
// 不需要引入 @babel/polyfill
const sum = (a, b) => a + b

Promise.resolve(100).then(data => data);

[10, 20, 30].includes(20)

// 语法，符合 ES5 语法规范
// 不处理模块化，模块化处理需要 webpack
```

执行 `npx babel src/index.js` 。

```shell
PS E:\Coding\github\study-imooc\419\code\babel-demo> npx babel .\src\index.js
"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var sum = function sum(a, b) {
  return a + b;
};

Promise.resolve(100).then(function (data) {
  return data;
});
[10, 20, 30].includes(20); // 语法，符合 ES5 语法规范
// 不处理模块化，模块化处理需要 webpack
```



**babel-polyfill 的问题**

- 会污染全局环境
- 如果做一个独立的 web 系统，则没问题
- 如果做一个第三方的库，则会有问题



**babel-runtime**

`npm i @babel/runtime --save` 。

`npm i @babel/plugin-transform-runtime` 。

配置 .babelrc 。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

执行 `npx babel src/index.js` 。

```shell
PS E:\Coding\github\study-imooc\419\code\babel-demo> npx babel .\src\index.js
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _context;

var sum = function sum(a, b) {
  return a + b;
};

_promise["default"].resolve(100).then(function (data) {
  return data;
});

(0, _includes["default"])(_context = [10, 20, 30]).call(_context, 20); // 语法，符合 ES5 语法规范
// 不处理模块化，模块化处理需要 webpack
// 污染全局环境
// window.Promise = function () { }
// Array.prototype.includes = function () { }
// 使用方
// window.Promise = 'abc'
```



**Babel 总结**

- 环境搭建 & 基本配置
- babel-polyfill
- babel-runtime