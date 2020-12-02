# Node.js 从零开发 Web Server 博客项目

## Node.js 介绍

Node.js ，一个 JS 的运行环境。



### 用途

1. **运行在服务端，作为 Web Server**
2. 运行在本地，作为打包、构建工具



### nvm

Node.js 版本管理工具，可切换多个 Node.js 版本。

#### 下载地址

https://github.com/coreybutler/nvm-windows/releases

#### 使用

- `nvm list` ，查看当前所有的 Node 版本
- `nvm install 15.3.0` ，安装指定的版本
- `nvm use 15.3.0` ，切换到指定的版本
- `nvm uninstall 15.3.0` 卸载指定的版本



### Node.js 和 JS 的区别

- ECMAScript 是语法规范
- **Node.js = ECMAScript + Node.js API**
- JS = ECMAScript + Web API



### debugger

1. VS Code 自带的 debugger
2. inspect 协议（设置 `--inspect=9229` ，访问 chrome://inspect）



### 服务端和前端的区别

1. 服务稳定性
2. 考虑内存和 CPU（优化、扩展）
3. 日志记录
4. 安全
5. 集群和服务拆分

#### 服务稳定性

- 服务端可能会遭受各种恶意攻击和误操作
- 单个客户端可以意外挂掉，但是服务端不能
- **使用 PM2 做进程守护**

#### 考虑内存和 CPU（优化、扩展）

- 前端独占一个浏览器，内存和 CPU 都不是问题
- 服务端要承载很多请求，内存和 CPU 都是稀缺资源
- **使用 stream 写日志（优化），使用 redis 存 session（扩展）**

#### 日志记录

- 前端也会参与写日志，但只是日志的发起方，不关心后续
- 服务端要记录日志、存储日志、分析日志，前端不关心
- **使用多种日志记录方式，以及如何分析日志**

#### 安全

- 服务端要随时准备接收各种恶意攻击，前端则少很多，如越权操作、数据库攻击等
- **登录验证，预防 xss 攻击和 sql 注入**

#### 集群和服务拆分

- 产品发展速度快，流量可能会迅速增加，通过扩展机器和服务拆分来承载大流量
- **从设计上支持服务拆分**



## 项目介绍

1. 目标
2. 需求
3. 技术方案



### 目标

- 开发一个博客系统，具有博客的基本功能
- 只开发服务端，不关心前端



### 需求

- 首页、作者页、博客详情页
- 登录页
- 管理中心，新建页、编辑页

<img src="https://img.mukewang.com/szimg/5c87a0690001899e19201080.jpg" alt="首页" style="zoom: 33%;" />

<img src="https://img.mukewang.com/szimg/5c87a0740001aa6f19201080.jpg" alt="作者页" style="zoom: 33%;" />

<img src="https://img.mukewang.com/szimg/5c87a0870001ab1d19201080.jpg" alt="博客详情页" style="zoom: 33%;" />

<img src="https://img.mukewang.com/szimg/5c87a0940001542019201080.jpg" alt="登录页" style="zoom: 33%;" />

<img src="https://img.mukewang.com/szimg/5c87a0ab000102e119201080.jpg" alt="管理中心" style="zoom: 33%;" />

<img src="https://img.mukewang.com/szimg/5c87a0cc0001440f19201080.jpg" alt="新建&编辑页" style="zoom: 33%;" />



### 技术方案

- 数据存储
- 接口设计

#### 数据存储

- 博客
- 用户

<img src="https://img1.sycdn.imooc.com/szimg/5c87a4480001ca9319201080.jpg" alt="博客" style="zoom:33%;" />

<img src="https://img1.sycdn.imooc.com/szimg/5c87a45c0001f58119201080.jpg" alt="用户" style="zoom:33%;" />

#### 接口设计

<img src="https://img1.sycdn.imooc.com/szimg/5c87a46900014d6419201080.jpg" alt="接口设计" style="zoom:33%;" />