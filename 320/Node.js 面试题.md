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

   

