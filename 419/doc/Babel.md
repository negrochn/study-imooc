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

```js
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

