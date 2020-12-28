# Node.js 面试题

1. **Node.js 是什么？**

   - Node.js 是基于 Chrome V8 引擎的 JS 运行时
   - Node.js 出现之前，JS 只能在浏览器运行
   - Node.js 出现之后，JS 可以在任何安装 Node.js 的环境运行

2. **Node.js 和 JS 的区别？**

   - 都使用 ES 语法，JS 使用 JS Web API ，Node.js 使用 Node API
   - JS 用于网页，在浏览器运行；Node.js 可用于服务端，如开发 Web Server ，也可用于本机，如 Webpack 等本机的工具

3. **Node.js 如何调试？**

   - 启动 Node 服务使用 inspect ，`cross-env NODE_ENV=dev nodemon --inspect=9229 app.js`
   - 代码中使用 debugger 断点
   - DevTools 中点击 `Open dedicated DevTools for Node.js`

4. **当前文件和当前目录的路径，如何获取？**

   - __filename
   - __dirname

5. **CommonJS 和 ES6 Module 的区别？**

   - 语法不同
   - CommonJS 是动态引入，执行时引入
   - ES6 Module 是静态引入，编译时引入

   ```js
   // ES6 Module 是静态引入，编译时引入，所以必须放在最外层
   import { sum, test } from './utils'
   
   // const flag = true
   // if (flag) {
   //   import { sum, test } from './utils' // 放在 if 语句里会报错，编译时就报错
   // }
   ```

   ```js
   const http = require('http')
   
   const flag = false
   if (flag) {
     const _ = require('lodash') // CommonJS 则不会报错
   }
   ```

6. **path.resolve 和 path.join 的区别？**

   - 两者都是用于拼接文件路径
   - path.resolve 获取绝对路径
   - path.join 获取相对路径

7. **浏览器 JS 的异步**

   - 宏任务：setTimeout 、setInterval 、AJAX 等
   - 微任务：Promise 、async/await
   - 微任务比宏任务更早执行

8. **浏览器 Event Loop**

   - Call Stack 空闲时，将触发 Event Loop 机制，执行宏任务
   - 而触发 Event Loop 之前，会把现有的微任务都执行完
   - 所以微任务比宏任务执行时机更早

9. **Node.js 的异步**

   - 宏任务：setTimeout 、setInterval 、**setImmediate** 、**文件 I/O** 、**网络 I/O** 、**Socket 链接（如连接 MySQL）**
   - 微任务：Promise 、async/await 、**process.nextTick**

10. **Event Loop 在浏览器和 Node.js 的区别？**

    - Node.js 异步 API 更多，宏任务类型也更多
    - Node.js 的 Event Loop 分为 6 个阶段，要按照顺序执行
    - 每个阶段开始之前，都要执行微任务
    - 微任务中，process.nextTick 优先级最高，最早被执行，现已不推荐，因为会阻塞 I/O

11. **Node.js 事件循环的 6 个阶段**

    - **timers** ：执行 setTimeout 、setInterval 的回调
    - **I/O callbacks** ：处理网络、流、TCP 的错误回调
    - **idle ，prepare** ：闲置阶段，Node 内部使用
    - **poll** ：执行 poll 中 I/O 队列，检查定时器是否到时间
    - **check** ：存放 setImmediate 回调
    - **close callbacks** ：关闭回调，例如 `Socket.on('close')`

12. **async/await 执行顺序问题**

    ```js
    setImmediate(() => {
      console.log('immediate')
    })
    
    async function async1() {
      console.log('async1 start')
      await async2()
      console.log('async1 end') // await 后面的内容是异步
    
    async function async2() {
      console.log('async2')
    }
    
    console.log('script start')
    
    setTimeout(() => {
      console.log('setTimeout')
    }, 0)
    
    async1()
    
    new Promise((resolve) => {
      console.log('promise1')
      resolve()
    }).then(() => {
      console.log('promise2')
    })
    
    process.nextTick(() => {
      console.log('nextTick')
    })
    
    console.log('script end')
    
    // 执行顺序
    // script start
    // async1 start
    // async2
    // promise1
    // script end
    // nextTick
    // async1 end
    // promise2
    // setTimeout
    // immediate
    ```

13. **Session 如何实现登录？**

    - Cookie 如何实现登录校验

      ![Cookie 用于登录校验](https://img.mukewang.com/szimg/5fb133000001cd3f19201080.jpg)

    - Session 和 Cookie 的关系

      ![Session 和 Cookie](https://img.mukewang.com/szimg/5fb133b90001070719201080.jpg)

    - Session 为何需要存储在 Redis 中

      - 进程有内存限制
      - 进程的内存是相互隔离的
      - 存储到 Redis ，可解决这些问题

14. **描述 Koa2 和 Express 的中间件机制**

    - 从代码来看，中间件就是一个函数
    - 从业务来看，中间件则是一个独立的模块
    - 模块拆分，模块流转，即可完成复杂的功能
    - 自己实现 Koa2 和 Express 源码

15. **Node.js 如何读取大文件？**

    - stream
    - readline

16. **Node.js 线上为何开启多进程？（PM2）**

    - 高效使用多核 CPU
    - 充分利用服务器内存
    - 最终压榨服务器，不浪费资源

