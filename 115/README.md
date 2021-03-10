# BAT大牛带你横扫初级前端JavaScript面试

## 第1章 课程简介

### 1-1 课程简介

基础知识

- 原型、原型链
- 作用域、闭包
- 异步、单线程



JS API

- DOM 操作
- Ajax
- 事件绑定



开发环境

- 版本管理
- 模块化
- 打包工具



运行环境

- 页面渲染
- 性能优化



### 1-2 前言

关于面试

- 基层工程师 - 基础知识
- 高级工程师 - 项目经验
- 架构师 - 解决方案



关于基础

- 工程师的自我修养 - 基础
- 扎实的基础会让你高效学习新技术



### 1-3 几个面试题

先从几道面试题说起

- JS 中使用 `typeof ` 能得到的哪些类型？
- 何时使用 `===` ，何时使用 `==` ？
- `window.onload` 和 `DOMContentLoaded` 的区别？
- 用 JS 创建 10 个 `<a>` 标签，点击的时候弹出对应的序号
- 简述如何实现一个模块加载器，实现类似 `require.js` 的基本功能
- 实现数组的随机排序



思考

- 拿到一个面试题，你第一时间看到的是什么？
- 又如何看待网上搜出来的永远看不完的题海？
- 如何对待接下来遇到的面试题？



### 1-4 如何搞定所有面试题

上一节思考问题的结论

- 拿到一个面试题，你第一时间看到的是什么？- **考点**
- 又如何看待网上搜出来的永远看不完的题海？- **不变应万变**
- 如何对待接下来遇到的面试题？- **题目到知识再到题目**



题目考察的知识点

- JS 中使用 `typeof` 能得到的哪些类型？
  考点：**JS 变量类型**
- 何时使用 `===` ，何时使用 `==` ？
  考点：**强制类型转换**
- `window.onload` 和 `DOMContentLoaded` 的区别？
  考点：**浏览器渲染过程**
- 用 JS 创建 10 个 `<a>` 标签，点击的时候弹出来对应的序号
  考点：**作用域**
- 简述如何实现一个模块加载器，实现类似 `require.js` 的基本功能
  考点：**JS 模块化**
- 实现数组的随机排序
  考点：**JS 基础算法**



## 第2章 JS 基础知识（上）

### 2-1 变量类型和计算 - 1

题目

- JS 中使用 `typeof` 能得到的哪些类型？
- 何时使用 `===` ，何时使用 `==` ？
- JS 中有哪些内置函数？
- JS 变量按照存储方式区分为哪些类型，并描述其特点？
- 如何理解 JSON ？



知识点

- 变量类型
- 变量计算



**变量类型**

- 值类型、引用类型
- `typeof` 运算符



值类型

```js
let a = 100
let b = a
a = 200
console.log(b) // 100
```

引用类型

```js
let a = { age: 20 }
let b = a
b.age = 21
console.log(a.age) // 21
```



`typeof` 运算符

```js
typeof undefined // "undefined"
typeof 'abc' // "string"
typeof 123 // "number"
typeof true // "boolean"
typeof {} // "object"
typeof [] // "object"
typeof null // "object"
typeof console.log // "function"
```



**变量计算 - 强制类型转换**

字符串拼接

```js
let a = 100 + 10 // 110
let b = 100 + '10' // "10010"
```

`==` 运算符

```js
100 == '100' // true
0 == '' // true
null = undefined // true
```

`if` 语句

```js
let a = true
if (a) {}
let b = 100
if (b) {}
let c = ''
if (c) {}
```

逻辑运算符

```js
console.log(10 && 0) // 0
console.log('' || 'abc') // "abc"
console.log(!window.abc) // true

// 判断一个变量会被当做 true 还是 false
let a = 100
console.log(!!a) // true
```



### 2-2 变量类型和计算 - 2

**解答**

JS 中使用 `typeof` 能得到的哪些类型？

答：`undefined` 、`string` 、`number` 、`boolean` 、`object` 、`function` 、`symbol`

```js
let sym = Symbol('commet')
console.log(typeof sym) // "symbol"
```

何时使用 `===` ，何时使用 `==` ？

答：判断对象的某个属性是否存在或为 `null` 时可以使用 `==` ，因为 jQuery 源码这么使用

```js
if (obj.a == null) {
  // 这里相当于 obj.a === null || obj.a === undefined 的简写形式
  // 这是 jQuery 源码中推荐的写法
}
```

JS 中有哪些内置函数？

答：数据封装类对象，包括 `String` 、`Number` 、`Boolean` 、`Object` 、`Array` 、`Function` 、`Date` 、`RegExp` 、`Error`

JS 变量按照存储方式区分为哪些类型，并描述其特点？

答：值类型和引用类型，一个存储值，一个存储引用地址，引用类型可以无限拓展属性



### 2-3 变量类型和计算 - 3

如何理解 JSON ？

答：JSON 只不过是一个 JS 对象而已，也是一种数据格式

```js
JSON.stringify({ a: 10, b: 20 })
JSON.parse('{"a":10,"b":20}')
```



### 2-4 变量类型和计算 - 代码演示

`if` 语句中条件为 `false` 的情况有哪些？

答：`false` 、0 、`NaN` 、`null` 、`undefined`

JS 中有哪些内置对象？

答：`JSON` 、`Math`



### 2-5 typeof symbol

```js
let s = Symbol()
typeof s // "symbol"
let s1 = Symbol()
console.log(s === s1) // false
let s2 = Symbol('s2s2')
console.log(s2) // Symbol(s2s2)
let s3 = s2
console.log(s3 === s2) // true
let sym1 = Symbol('111')
let sym2 = Symbol('222')
let obj = { [sym1]: 'hello world' }
obj[sym2] = 123
console.log(obj) // {Symbol(111): "hello world", Symbol(222): 123}
console.log(obj[sym1]) // "hello world"
console.log(obj[sym2]) // 123
```



### 2-6 原型和原型链

题目

- 如何准确判断一个变量是数组类型
- 写一个原型链继承的例子
- 描述 `new` 一个对象的过程
- zepto 或其他框架源码中如何使用原型链



知识点

- 构造函数
- 构造函数 - 扩展
- 原型规则和示例
- 原型链
- `instanceof`



构造函数

```js
function Foo(name, age) {
  this.name = name
  this.age = age
  this.class = 'class__1'
  // return this // 默认有这一行
}
let f = new Foo('negrochn', 18)
// let f2 = new Foo('lexiaodai', 17) // 创建多个对象
```

构造函数 - 扩展

```js
let a = {} // 其实是 let a = new Object() 的语法糖
let b = [] // 其实是 let b = new Array() 的语法糖
function Foo() {} // 其实是 let Foo = new Function()
// 使用 instanceof 判断一个函数是否是一个变量的构造函数
console.log(b instanceof Array) // true
```



### 2-7 原型和原型链 - 5 条原型规则

5 条原型规则

1. 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（除了 `null` 以外）
2. 所有的引用类型（数组、对象、函数），都有一个 `__proto__`（隐式原型）属性，属性值是一个普通的对象
3. 所有的函数，都有一个 `prototype`（显式原型）属性，属性值也是一个普通的对象
4. 所有的引用类型（数组、对象、函数），`__proto__` 属性值指向它的构造函数的 `prototype` 属性值
5. 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 `__proto__`（即它的构造函数的 `prototype`）中寻找

```js
// 原则 1
let obj = {}
obj.a = 100
let arr = []
arr.a = 100
function fn() {}
fn.a = 100

// 原则 2
console.log(obj.__proto__)
console.log(arr.__proto__)
console.log(fn.__proto__)

// 原则 3
console.log(fn.prototype)

// 原则 4
console.log(obj.__proto__ === Object.prototype) // true
```

```js
// 构造函数
function Foo(name) {
  this.name = name
}
Foo.prototype.alertName = function() {
  alert(this.name)
}

// 创建实例
let f = new Foo('negrochn')
f.printName = function() {
  console.log(this.name)
}
// 测试
f.printName()
f.alertName() // 原则 5
```



### 2-8 原型和原型链 - 5 条原型规则 补充 2 点

```js
for (let key in f) {
  // 高级浏览器已经在 for in 中屏蔽了来自原型的属性
  // 但是这里建议大家还是加上这个判断，保证程序的健壮性
  if (f.hasOwnProperty(key)) {
    console.log(key)
  }
}
```



### 2-9 原型和原型链 - 原型链

```js
// 构造函数
function Foo(name) {
  this.name = name
}
Foo.prototype.alertName = function() {
  alert(this.name)
}

// 创建实例
let f = new Foo('negrochn')
f.printName = function() {
  console.log(this.name)
}
// 测试
f.printName()
f.alertName()
f.toString() // 要去 f.__proto__.__proto__ 中查找
```

![原型链](https://raw.githubusercontent.com/negrochn/study-imooc/master/115/img/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)



### 2-10 原型和原型链 - instanceof

```js
// instanceof 用于判断引用类型属于哪个构造函数的方法
console.log(f instanceof Foo) // true， f 的 __proto__ 一层一层往上，能否对应到 Foo.prototype
console.log(f instanceof Object) // true
```



### 2-11 原型和原型链 - 解答 1

如何准确判断一个变量是数组类型

答：使用 `instanceof Array`

```js
let arr = []
console.log(arr instanceof Array) // true
console.log(typeof arr) // "object" ，typeof 是无法判断是否是数组的
```

写一个原型链继承的例子

```js
// 动物
function Animal() {
  this.eat = function() {
    console.log('animal eat')
  }
}
// 狗
function Dog() {
  this.bark = function() {
    console.log('dog bark')
  }
}
Dog.prototype = new Animal()
// 哈士奇
let hashiqi = new Dog()

// 接下来代码演示时，会推荐更加贴近实战的原型继承示例
```

描述 `new` 一个对象的过程

答：

1. 创建一个新对象
2. `this` 指向这个新对象
3. 执行代码，即对 `this` 赋值
4. 返回 `this`

```js
function Foo(name, age) {
  this.name = name
  this.age = age
  this.class = 'class__1'
  // return this // 默认有这一行
}

let f = new Foo('negrochn', 18)
```

zepto 或其他框架源码中如何使用原型链

答：

- 阅读源码是高效提高技巧的方式
- 但不能“埋头苦钻”，有技巧在其中
- 慕课网搜索“zepto 设计和源码分析”



### 2-12 原型和原型链 - 解答 2

写一个封装 DOM 查询的例子

```js
function Elem(id) {
  this.elem = document.getElementById(id)
}

Elem.prototype.html = function(val) {
  let elem = this.elem
  if (val) {
    elem.innerHTML = val
    return this // 为了链式操作
  } else {
    return elem.innerHTML
  }
}

Elem.prototype.on = function(type, fn) {
  let elem = this.elem
  elem.addEventListener(type, fn)
  return this // 为了链式操作
}

let div1 = new Elem('div1')
div1.html('<p>Hello World</p>').on('click', function() {
  alert('clicked')
})
```



### 2-13 原型和原型链 - 代码演示

无



## 第3章 JS 基础知识（中）

### 3-1 作用域和闭包 - 执行上下文

题目

- 说一下对变量提升的理解
- 说明 `this` 几种不同的使用场景
- 创建 10 个 `<a>` 标签，点击的时候弹出对应的序号
- 如何理解作用域
- 实际开发中闭包的应用



知识点

- 执行上下文
- `this`
- 作用域
- 作用域链
- 闭包



执行上下文

- 范围：一段 `<script>` 或者一个函数
- 全局上下文：执行前，会先把变量定义、函数声明拿出来（注意函数声明和函数表达式的区别）
- 函数上下文：执行前，先把变量定义、函数声明、`this` 、`arguments` 拿出来

```js
console.log(a) // undefined
var a = 100

fn('negrochn') // "negrochn" 20
function fn(name) {
  age = 20
  console.log(name, age)
  var age
}
```



### 3-2 作用域和闭包 - 执行上下文 代码演示

无



### 3-3 作用域和闭包 - this

`this` ，要在执行时才能确认值，定义时无法确认

- 作为构造函数执行
- 作为对象属性执行
- 作为普通函数执行
- `call` 、`apply` 、`bind`

```js
var a = {
  name: 'A',
  fn: function() {
    console.log(this.name)
  }
}
a.fn() // this === a
a.fn.call({ name: 'B' }) // this 作为 { name: 'B' }
var fn1 = a.fn
fn1() // this === window
```



### 3-4 作用域和闭包 - this 代码演示

```js
// 作为构造函数执行
function Foo(name) {
  this.name = name
}
let f = new Foo('negrochn')
f.name // "negrochn"
```

```js
// 作为对象属性执行
let obj = {
  name: 'A',
  printName: function() {
    console.log(this.name)
  }
}
obj.printName() // "A"
```

```js
// 作为普通函数执行
function fn() {
  console.log(this)
}
fn() // window
```

```js
// call 、apply 、bind
function fn1(name, age) {
  console.log(name)
  console.log(this)
}
fn1.call({ x: 1 }, 'negrochn', 20) // "negrochn" { x: 1 }
fn1.apply({ x: 200 }, ['negrochn', 20]) // "negrochn" { x: 200 }

let fn2 = function(name, age) {
  console.log(name)
  console.log(this)
}.bind({ x: 300 })
fn2('negrochn', 20) // "negrochn" { x: 300 }
```



### 3-5 作用域和闭包 - 作用域

作用域

- 没有块级作用域
- 只有函数和全局作用域

```js
// 无块级作用域
if (true) {
  var name = 'negrochn'
}
console.log(name) // "negrochn"

// 只有函数和全局作用域
var a = 100
function fn() {
  var a = 200
  console.log('fn', a)
}
console.log('global', a) // "global" 100
fn() // "fn" 200
```



作用域链

```js
var a = 100
function fn() {
  var b = 200
  // 当前作用域没有定义的变量，即“自由变量”
  console.log(a)
  console.log(b)
}
fn()
```

```js
var a = 100
function f1() {
  var b = 200
  function f2() {
    var c = 300
    console.log(a) // a 是自由变量
    console.log(b) // b 是自由变量
    console.log(c)
  }
  f2()
}
f1()
```



### 3-6 作用域和闭包 - 作用域 代码演示

无



### 3-7 补充 - ES6 块级作用域

JS 没有块级作用域，ES6 有块级作用域



### 3-8 作用域和闭包 - 闭包

闭包

```js
function f1() {
  var a = 100
  // 返回一个函数（函数作为返回值）
  return function() {
    console.log(a)
  }
}
// f1 得到一个函数
var f = f1()
var a = 200
f() // 100
```

闭包的使用场景

- 函数作为返回值
- 函数作为参数传递



### 3-9 作用域和闭包 - 闭包 代码演示

```js
// 闭包 1 ，函数作为返回值
function f1() {
  var a = 100
  return function() {
    console.log(a) // a 是自由变量，向父级作用域去寻找，函数定义时的父作用域
  }
}
var f = f1()
var a = 200
f() // 100
```

```js
// 闭包 2 ，函数作为参数传递
function f1() {
  var a = 100
  return function() {
    console.log(a)
  }
}
var f = f1()
function f2(fn) {
  var a = 200
  fn()
}
f2(f) // 100
```



### 3-10 作用域和闭包 - 解题

说一下对变量提升的理解

- 变量定义
- 函数声明（注意和函数表达式的区别）



说明 `this` 几种不同的使用场景

- 作为构造函数执行
- 作为对象属性执行
- 作为普通函数执行
- `call` 、`apply` 、`bind`



创建 10 个 `<a>` 标签，点击的时候弹出对应的序号

```js
// 这是一个错误的写法
var i, a
for(i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', function(e) {
    e.preventDefault()
    alert(i) // 自由变量，要去父作用域获取值
  })
  document.body.appendChild(a)
}
```

```js
// 这是正确的写法
var i
for(i = 0; i < 10; i++) {
  (function(i) {
    var a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function(e) {
      e.preventDefault()
      alert(i)
    })
    document.body.appendChild(a)
  })(i)
}
```



如果理解作用域

- 自由变量
- 作用域链，即自由变量的查找
- 闭包的两个场景



实际开发中闭包的应用

```js
// 闭包实际应用中主要用于封装变量，收敛权限
function isFirstLoad() {
  var _list = []
  return function(id) {
    if (_list.indexOf(id) >= 0) {
      return false
    } else {
      _list.push(id)
      return true
    }
  }
}

// 使用
var firstLoad = isFirstLoad()
console.log(firstLoad(10)) // true
console.log(firstLoad(10)) // false
console.log(firstLoad(20)) // true
// 你在 isFirstLoad 函数外，根本不可能修改掉 _list 的值
```



### 3-11 作用域和闭包 - 解题 代码演示

无



## 第4章 JS 基础知识（下）

### 4-1 异步和单线程 - 什么是异步

题目

- 同步和异步的区别是什么？分别举一个同步和异步的例子
- 一个关于 setTimeout 的笔试题
- 前端使用异步的场景有哪些？

知识点

- 什么是异步（对比同步）
- 前端使用异步的场景
- 异步和单线程



什么是异步

- 同步阻塞后续代码执行
- 异步不会阻塞程序的运行

```js
console.log(100)
setTimeout(function() {
  console.log(200)
}, 1000)
console.log(300)
```

对比同步

```js
console.log(100)
alert(200) // 1 秒之后手动点击确认
console.log(300)
```

何时需要异步

- 在可能发生等待的情况
- 等待过程中不能像 `alert` 一样阻塞程序运行
- 因此，所有的“等待的情况”都需要异步



前端使用异步的场景

- 定时任务，`setTimeout` 、`setInterval`
- 网络请求，AJAX 请求、动态 `<img>` 加载
- 事件绑定

```js
// AJAX 请求
console.log('start')
$.get('./data1.json', function(data1) {
  console.log(data1)
})
console.log('end')
```

```js
// 动态 <img> 加载
console.log('start')
var img = document.createElement('img')
img.onload = function() {
  console.log('loaded')
}
img.src = '/xxx.png'
console.log('end')
```

```js
// 事件绑定
console.log('start')
document.getElementById('btn1').addEventListener('click', function() {
  alert('clicked')
})
console.log('end')
```



### 4-2 异步和单线程 - 什么是异步 代码演示

无



### 4-3 异步和单线程 - 单线程

```js
console.log(100)
setTimeout(function() {
  console.log(200)
})
console.log(300)
```

1. 执行第 1 行，打印 100
2. 执行 `setTimeout` 后，传入 `setTimeout` 的函数会被暂存起来，不会立即执行（单线程的特点，不能同时干两件事）
3. 执行第 5 行，打印 300
4. 待所有程序执行完，处于空闲状态时，会立马看有没有暂存起来要执行的
5. 发现暂存起来的 setTimeout 中的函数，无须等待时间，就立即过来执行



单线程

- JS 是单线程语言，即一次只能干一件事，如果同时有两件事，另一件就先上一边排队去，我先干完这件事再说，如果没有异步，那就会出现阻塞现象
- 由于 JS 是单线程，在代码执行的时候又不能因为执行需要等待的代码而造成阻塞，因此 JS 会首先将无需等待的（同步）代码执行完成后，再来处理异步代码，如果达到异步代码的执行条件的话，就会执行



### 4-4 异步和单线程 - 解答

同步和异步的区别是什么？分别举一个同步和异步的例子

- 同步会阻塞代码执行，而异步不会
- `alert` 是同步，`setTimeout` 是异步



一个关于 setTimeout 的笔试题

```js
console.log(1)
setTimeout(function() {
  console.log(2)
}, 0)
console.log(3)
setTimeout(function() {
  console.log(4)
}, 1000)
console.log(5)
// 1
// 3
// 5
// 2
// 4 ，一秒后
```



前端使用异步的场景有哪些？

- 定时任务，`setTimeout` 、`setInterval`
- 网络请求，AJAX 请求、动态 `<img>` 加载
- 事件绑定



重点总结

- 异步和同步的区别
- 异步和单线程的关系
- 异步在前端的使用场景



### 4-5 其他知识点 - Date 和 Math

题目

- 获取 `2020-02-24` 格式的日期
- 获取随机数，要求长度一致的字符串格式
- 写一个能遍历对象和数组的通用 `forEach` 函数

知识点

- Date
- Math
- 数组 API
- 对象 API



Date

```js
Date.now() // 获取当前时间毫秒数
var dt = new Date()
dt.getTime() // 获取毫秒数
dt.getFullYear() // 年
dt.getMonth() // 月（0-11）
dt.getDate() // 日（1-31）
dt.getHours() // 时（0-23）
dt.getMinutes() // 分（0-59）
dt.getSeconds() // 秒（0-59）
```

Math

```js
Math.random() // 获取随机数
```



### 4-6 其他知识点 - 数组和对象的 API

数组 API

- `forEach` ，遍历所有元素
- `every` ，判断所有元素是否都符合条件
- `some` ，判断是否有至少一个元素符合条件
- `sort` ，排序
- `map` ，对元素重新组装，生成新数组
- `filter` ，过滤符合条件的元素

```js
// forEach
var arr = [1, 2, 3]
arr.forEach(function(item, index) {
  // 遍历数组的所有元素
  console.log(index, item)
})
// 0 1
// 1 2
// 2 3
```

```js
// every
var arr = [1, 2, 3]
var result = arr.every(function(item, index) {
  // 用来判断所有的数组元素，都满足条件
  if (item < 4) {
    return true
  }
})
console.log(result) // true
```

```js
// some
var arr = [1, 2, 3]
var result = arr.some(function(item, index) {
  // 用来判断只要有一个数组元素满足条件
  if (item < 2) {
    return true
  }
})
console.log(result) // true
```

```js
// sort
var arr = [1, 4, 2, 3, 5]
var result = arr.sort(function(a, b) {
  // 从小到大排序
  return a - b // 从大到小排序 return b - a
})
console.log(result) // [1, 2, 3, 4, 5]
```

```js
// map
var arr = [1, 2, 3]
var result = arr.map(function(item, index) {
  // 将元素重新组装并返回
  return '<b>' + item + '</b>'
})
console.log(result) //  ["<b>1</b>", "<b>2</b>", "<b>3</b>"]
```

```js
// filter
var arr = [1, 2, 3]
var result = arr.filter(function(item, index) {
  // 通过某一个条件过滤数组
  if (item >= 2) {
    return true
  }
})
console.log(result) // [2, 3]
```



对象 API

```js
var obj = {
  x: 100,
  y: 200,
  z: 300
}
var key
for (key in obj) {
  // 注意这里的 hasOwnProperty ，在将原型链的时候讲过了
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key])
  }
}
// x 100
// y 200
// z 300
```



### 4-7 其他知识点 - 知识点 代码演示

无



### 4-8 其他知识点 - 解答

获取 `2020-02-24` 格式的日期

```js
function formatDate(dt) {
  if (!dt) {
    dt = new Date()
  }
  var year = dt.getFullYear()
  var month = dt.getMonth() + 1
  var date = dt.getDate()
  return year + '-' + month.toString().padStart(2, '0') + '-' + date.toString().padStart(2, '0')
}

formatDate(new Date()) // "2021-02-24"
```



获取随机数，要求长度一致的字符串格式

```js
var random = Math.random()
random = random + '0000000000'
random = random.slice(0, 10)
console.log(random)
```



写一个能遍历对象和数组的通用 `forEach` 函数

```js
function forEach(obj, fn) {
  var key
  if (obj instanceof Array) {
    obj.forEach(function(item, index) {
      fn(index, item)
    })
  } else {
    for (key in obj) {
      fn(key, obj[key])
    }
  }
}

var arr = [1, 2, 3]
forEach(arr, function(key, value) {
  console.log(key, value)
})
// 0 1
// 1 2
// 2 3

var obj = {
  x: 100,
  y: 200
}
forEach(obj, function(key, value) {
  console.log(key, value)
})
// x 100
// y 200
```



重点总结

- Date
- Math
- 数组 API
- 对象 API



### 4-9 其他知识点 - 代码演示



## 第5章 JS Web API（上）

### 5-1 从基础知识到 JS Web API

回顾 JS 基础知识

- 变量类型和计算
- 原型和原型链
- 闭包和作用域
- 异步和单线程
- 其他（如 Date 、Math 、各种常用 API）
- 特点：表面看起来并不能用于工作中开发代码
- 内置函数：Object 、Array 、Boolean 、String ...
- 内置对象：Math 、JSON ...
- 我们连在网页弹出一句 `Hello World` 都不能实现



JS Web API

- JS 基础知识：ECMA262 标准
- JS Web API：W3C 标准



W3C 标准中关于 JS 的规定有

- DOM 操作
- BOM 操作
- 事件绑定
- AJAX 请求（包括 http 协议）
- 存储



页面弹框是 `window.alert(123)` ，浏览器需要做

- 定义一个 `window` 全局变量，对象类型
- 给他定义一个 `alert` 属性，属性值是一个函数

获取元素 `document.getElementById(id)` ，浏览器需要

- 定义一个 `document` 全局变量，对象类型
- 给它定义一个 `getElementById` 的属性，属性值是一个函数

但是 W3C 标准没有规定任何 JS 基础相关的东西

- 不管什么变量类型、原型、作用域和异步
- 只管定义用于浏览器中 JS 操作页面的 API 和全局变量

全面考虑，JS 内置的全局函数和对象有哪些？

- 之前讲过的 Object 、Array 、Boolean 、String 、Math 、JSON 等
- 刚刚提到的 window 、document
- 接下来还有继续讲到的所有未定义的全局变量，如 `navigator.userAgent`



总结

常说的 JS（浏览器执行的 JS）包含两部分

- JS 基础知识（ECMA262 标准）
- JS Web API（W3C 标准）



### 5-2 DOM 本质

DOM ，全称 Document Object Model

题目

- DOM  是哪种基本的数据结构？
- DOM 操作的常用 API 有哪些？
- DOM 节点的 Attribute 和 Property 有何区别？

知识点

- DOM 本质
- DOM 节点操作
- DOM 结构操作



DOM 本质

```xml
<?xml version="1.0" encoding="utf-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend</body>
  <other>
    <a></a>
    <b></b>
  </other>
</note>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div>
    <p>this is p</p>
  </div>
</body>
</html>
```

DOM 本质：浏览器拿到 HTML 代码后，DOM 把 HTML 代码结构化成浏览器可识别以及 JS 可识别的东西。

HTML 代码就是一个字符串，但是浏览器已经把字符串结构化成树形结构了。



### 5-3 DOM 节点操作

DOM 可以理解为：浏览器把拿到的 HTML 代码，结构化成一个浏览器能识别并且 JS 可操作的一个模型而已。



DOM 节点操作

- 获取 DOM 节点
- Property ，JS 对象属性
- Attribute ，HTML 标签属性



获取 DOM 节点

```js
var div1 = document.getElementById('div1') // 元素
var divList = document.getElementsByTagName('div') // 集合
console.log(divList.length)
console.log(divList[0])

var containerList = document.getElementsByClassName('container') // 集合
var pList = document.querySelectorAll('p') // 集合
```

Property ，JS 对象属性

```js
var pList = document.querySelectorAll('p')
var p = pList[0]
console.log(p.style.width) // 获取样式
p.style.width = '100px' // 修改样式
console.log(p.className) // 获取 class
p.className = 'p1' // 修改 class

// 获取 nodeName 和 nodeType
console.log(p.nodeName) // "P"
console.log(p.nodeType) // 1
```

Attribute ，HTML 标签属性

```js
var pList = document.querySelectorAll('p')
var p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'imooc')
p.getAttribute('style')
p.setAttribute('style', 'font-size: 30px;')
```



### 5-4 DOM 节点操作 - 代码演示

无

### 5-5 DOM 结构操作

DOM 结构操作

- 新增节点
- 获取父元素
- 获取子元素
- 删除节点

新增节点

```js
var div1 = document.getElementById('div1')
// 添加新节点
var p = document.createElement('p')
p.innerHTML = 'new p'
div1.appendChild(p) // 添加新创建的元素
// 移动已有节点
var p4 = document.getElementById('p4')
div1.appendChild(p4)
```

获取父元素和子元素

```js
var div1 = document.getElementById('div1')
var parent = div1.parentNode

var children = div1.childNodes
```

删除节点

```js
div1.removeChild(children[0])
```



### 5-6 DOM 结构操作 - 代码演示

无



### 5-7 DOM 结构操作 - 解答

DOM  是哪种基本的数据结构？

答：树

DOM 操作的常用 API 有哪些？

答：

- 获取 DOM 节点，以及节点的 Property 和 Attribute
- 获取父节点，获取子节点
- 新增节点，删除节点

DOM 节点的 Attribute 和 Property 有何区别？

答：

- Property 只是一个 JS 对象的属性的修改
- Attribute 是对 HTML 标签属性的修改



重点总结

- DOM 本质
- DOM 节点操作
- DOM 结构操作



### 5-8 BOM 操作

题目

- 如何检测浏览器的类型
- 拆解 URL 的各部分

知识点

- `navigator`
- `srceen`
- `location`
- `history`



navigator & screen

```js
// navigator
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome) // 81

// screen
console.log(screen.width) // 1920
console.log(screen.height) // 1080
```

location & history

```js
// location ，以 http://localhost:8080/login?username=negrochn&password=123456#mid=1 为例
console.log(location.href) // http://localhost:8080/login?username=negrochn&password=123456#mid=1
console.log(location.protocol) // http:
console.log(location.host) // localhost:8080
console.log(location.hostname) // localhost
console.log(location.port) // 8080
console.log(location.pathname) // /login
console.log(location.search) // ?username=negrochn&password=123456
console.log(location.hash) // #mid=1

// history
history.back()
history.forward()
```



### 5-9 BOM 操作 - 代码演示

无



## 第6章 JS Web API（下）

### 6-1 事件

题目

- 编写一个通用的事件监听函数
- 描述事件冒泡流程
- 对一个无限下拉加载图片的页面，如何给每个图片绑定事件

知识点

- 通用事件绑定
- 事件冒泡
- 代理

通用事件绑定

```js
var btn = document.getElementById('btn1')
btn.addEventListener('click', function(e) {
  console.log('clicked')
})

function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn)
}
var a = document.getElementById('link1')
bindEvent(a, 'click', function(e) {
  e.preventDefault() // 阻止默认行为
  alert('clicked')
})
```

关于 IE 低版本的兼容性

- IE 低版本使用 `attachEvent` 绑定事件，和 W3C 标准不一样
- IE 低版本使用量已非常少，很多网站都早已不支持
- 建议对 IE 低版本的兼容性：了解即可，无需深究
- 如果遇到对 IE 低版本要求苛刻的面试，果断放弃



事件冒泡

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>事件冒泡</title>
</head>
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <p id="p4">取消</p>
  </div>
  <div id="div2">
    <p id="p5">取消</p>
    <p id="p6">取消</p>
  </div>
  <script>
    function bindEvent(elem, type, fn) {
      elem.addEventListener(type, fn)
    }
    
    var p1 = document.getElementById('p1')
    var body = document.body
    bindEvent(p1, 'click', function(e) {
      e.stopPropagation()
      alert('激活')
    })
    bindEvent(body, 'click', function(e) {
      alert('取消')
    })
  </script>
</body>
</html>
```

代理

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>事件冒泡</title>
</head>
<body>
  <div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
    <!-- 会随时新增更多 a 标签 -->
  </div>
  <script>
    var div1 = document.getElementById('div1')
    div1.addEventListener('click', function(e) {
      var target = e.target
      if (target.nodeName === 'A') {
        alert(target.innerHTML)
      }
    })
  </script>
</body>
</html>
```

完善通用绑定事件的函数

```js
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, function(e) {
    var target
    if (selector) {
      target = e.target
      if (target.matches(selector)) {
        fn.call(target, e)
      }
    } else {
      fn(e)
    }
  })
}

// 使用代理
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function(e) {
  console.log(this.innerHTML)
})

// 不使用代理
var a = document.getElementById('a1')
bindEvent(div1, 'click', function(e) {
  console.log(a.innerHTML)
})
```

代理的好处

- 代码简洁
- 减少浏览器内存占用



### 6-2 事件 - 代码演示

无



### 6-3 事件 - 解答

编写一个通用的事件监听函数

答：

```js
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, function(e) {
    let target
    if (selector) {
      target = e.target
      if (target.matches(selector)) {
        fn.call(target, e)
      }
    } else {
      fn(e)
    }
  })
}
```



描述事件冒泡流程

答：

1. DOM 树形结构
2. 事件冒泡
3. 阻止冒泡
4. 冒泡的应用



对一个无限下拉加载图片的页面，如何给每个图片绑定事件

答：

- 使用代理
- 代理的两个优点（代码简洁、减少浏览器内存占用）



重点总结

- 通用事件绑定
- 事件冒泡
- 事件代理



### 6-4 Ajax - XMLHttpRequest

题目

- 手写一个 Ajax ，不依赖第三方库
- 跨域的几种实现方式

知识点

- XMLHttpRequest
- 状态码说明
- 跨域



XMLHttpRequest

```js
var xhr = new XMLHttpRequest()
xhr.open('GET', '/api', false)
xhr.onreadystatechange = function() {
  // 这里的函数异步执行
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      alert(xhr.responseText)
    }
  }
}
xhr.send(null)
```



IE 兼容性问题

- IE 低版本使用 ActiveXObject ，和 W3C 标准不一样
- IE 低版本使用量已非常少，很多网站都早已不支持
- 建议对 IE 低版本的兼容性：了解即可，无需深究
- 如果遇到对 IE 低版本要求苛刻的面试，果断放弃



readyState

- 0 - 未初始化，还没有调用 send() 方法
- 1 - 载入，已调用 send() 方法，正在发送请求
- 2 - 载入完成，send() 方法执行完成，已经接收到全部响应内容
- 3 - 交互，正在解析响应内容
- 4 - 完成，响应内容解析完成，可以在客户端调用了



status

- 1XX - 信息，服务器收到请求，需要请求者继续执行操作
- 2XX - 成功，操作被成功接收并处理
- 3XX - 重定向，需要进一步的操作以完成请求
- 4XX - 客户端错误，请求包含语法错误或无法完成请求
- 5XX - 服务器错误，服务器在处理请求的过程中发生了错误

| 状态码 | 英文描述              | 中文描述                                                     |
| ------ | --------------------- | ------------------------------------------------------------ |
| 100    | Continue              | 继续。客户端应继续其请求。                                   |
| 200    | OK                    | 请求成功。                                                   |
| 204    | No Content            | 无内容。服务器成功处理，但未返回内容。                       |
| 206    | Partial Content       | 部分内容。服务器成功处理了部分 GET 请求。                    |
| 301    | Moved Permanently     | 永久移动。请求的资源已被永久的移动到新 URI ，返回信息会包括新的 URI ，浏览器会自动定向到新 URI 。 |
| 302    | Found                 | 临时移动。客户端应继续使用原有 URI 。                        |
| 304    | Not Modified          | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。 |
| 307    | Temporary Redirect    | 临时重定向。使用 GET 请求重定向。                            |
| 400    | Bad Request           | 客户端请求的语法错误，服务器无法理解。                       |
| 401    | Unauthorized          | 请求要求用户的身份认证。                                     |
| 403    | Forbidden             | 服务器理解请求客户端的请求，但是拒绝执行此请求。             |
| 404    | Not Found             | 服务器无法根据客户端的请求找到资源（网页）。                 |
| 500    | Internal Server Error | 服务器内部错误，无法完成请求。                               |
| 502    | Bad Gateway           | 作为网关或代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应。 |
| 503    | Service Unavailable   | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。       |



### 6-5 Ajax - 跨域

什么是跨域

- 浏览器有同源策略，不允许 Ajax 访问其他域接口
- 跨域条件：协议、域名、端口，有一个不同就算跨域
- 有三个标签允许跨域加载资源
  - `<img src=xxx>` ，用于打点统计，统计网站可能是其他域
  - `<link href=xxx>` ，可以使用 CDN
  - `<script src=xxx>` ，可以使用 CDN ，用于 JSONP



跨域注意事项

- 所有的跨域请求都必须经过信息提供方允许
- 如果未经允许即可获取，那是浏览器同源策略出现楼栋



JSONP 实现原理

- 加载 https://coding.imooc.com/lesson/115.html#mid=5387
- 不一定服务器端真正有一个 115.html 文件
- 服务器可以根据请求，动态生成一个文件返回
- 同理，`<script src="http://coding.imooc.com/api.js">`
- 例如你的网站要跨域访问慕课网的一个接口
- 慕课给你一个地址 http://coding.imooc.com/api.js
- 返回内容格式如 `callback({ x: 100, y: 200 })`（可动态生成）

```html
<script>
window.callback = function(data) {
  // 这是我们跨域得到的信息
  console.log(data)
}
</script>
<script src="http://coding.imooc.com/api.js"></script>
<!-- 以上将返回 callback({ x: 100, y: 200 }) -->
```



服务器设置 http header

- 另外一个解决跨域的简洁方法，需要服务器来做
- 但是作为交互方，我们必须知道这个方法
- 是将来解决跨域问题的一个趋势

```js
// 注意：不同后端语言的写法可能不一样

// 第二个参数填写允许跨域的域名称，不建议直接写 *
response.setHeader('Access-Control-Allow-Origin', 'http://a.com, http://b.com')
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

// 接收跨域的 Cookie
response.setHeader('Access-Control-Allow-Credentials', 'true')
```



手写一个 Ajax ，不依赖第三方库

```js
var xhr = new XMLHttpRequest()
xhr.open('GET', '/api', false)
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      alert(xhr.responseText)
    }
  }
}
xhr.send(null)
```



跨域的几种实现方式

- JSONP
- 服务器端设置 http header



重点总结

- XMLHttpRequest
- 状态码
- 跨域



### 6-6 存储

题目

- 请描述一下 Cookie 、sessionStorage 和 localStorage 的区别？

知识点

- Cookie
- sessionStorage 和 localStorage



Cookie

- 本身用于客户端和服务器端通信
- 但是它有本地存储的功能，于是就被“借用”
- 使用 `document.cookie` 获取和修改

Cookie 用于存储的缺点

- 存储量太小，只有 4KB
- 所有 http 请求都带着，会影响获取资源的效率
- API 简单，需要封装才能用 `document.cookie`



localStorage 和 sessionStorage

- HTML5 专门为存储而设计，最大容量 5MB
- API 简单易用，`getItem(key)` 、`setItem(key, value)`
- iOS Safari 隐藏模式下，localStorage.getItem 会报错，建议统一使用 try-catch 封装



请描述一下 Cookie 、sessionStorage 和 localStorage 的区别？

- 容量
- 是否携带到请求中
- API 易用性



## 第7章 开发环境

### 7-1 介绍

关于开发环境

- 面试官想通过开发环境了解面试者的经验
- 开发环境，最能体现工作产出的效率
- 会以聊天的形式为主，而不是出具体的问题



开发环境包含

- IDE（写代码的效率）
- Git（代码版本管理，多人协作开发）
- JS 模块化
- 打包工具
- 上线回滚的流程



### 7-2 IDE

IDE

- WebStorm
- Sublime
- VS Code（推荐）
- Atom



### 7-3 Git - 常用命令

Git

- 正式项目都需要代码版本管理
- 大型项目需要多人协作开发
- Git 和 Linux 是一个作者
- 网络 Git 服务器，如 github
- 一般公司代码非开源，都有自己的 Git 服务器
- 搭建 Git 服务器无需你了解太多
- Git 的基本操作必须很熟练



常用 Git 命令

- `git add .`
- `git checkout xxx` ，还原文件
- `git commit -m 'xxx'` ，提交到本地仓库
- `git push origin master` ，提交到远程仓库
- `git pull origin master` ，下载远程仓库的文件
- `git branch` ，创建分支
- `git checkout -b xxx`/`git checkout xxx` ，新建一个分支/切换到另一个分支
- `git merge xxx` ，把之前的分支拷贝到这里



### 7-4 Git - 代码演示

无



### 7-5 Git - 代码演示 多人协作

多人开发

- 为了编写属于自己的功能，可以创建自己的分支，而不要在主分支上改动，最后进行合并即可

步骤

1. `git checkout -b dev` ，创建一个 dev 分支
2. `vi a.js`修改内容（vi 属于 Linux 命令，`git status` 查看是否被修改，`git diff` 查看修改的内容）
3. `git add .`
4. `git commit -m 'update dev'`
5. `git push origin dev` ，提交到远程仓库的 dev 分支
6. 半个月之后，合并到 master 分支
7. `git checkout master` ，切换到 master 分支
8. `git pull origin master` ，下载远程仓库的 master 分支的文件
9. `git merge dev` ，把 dev 分支的修改内容拷贝到 master 分支
10. `git push origin master` ，提交到远程仓库的 master 分支

附加命令

- `cat 文件名`，查看文件内容
- `git diff` ，查看修改的内容
- `git branch` ，查看分支和当前在哪条分支上
- `git status` ，查看文件是否被修改的状态
- `vi 文件` ，新建文件并打开文件
- `esc + :wq` ，退出并保存文件



### 7-6 模块化 - AMD

不使用模块化

```js
// util.js
function getFormatDate(date, type) {
  // type === 1 返回 2021-03-06
  // type === 2 返回 2021年3月6日
  // ...
}
```

```js
// a-util.js
function aGetFormatDate(date) {
  // 要求返回 2021年3月6日格式
  return getFormatDate(date, 2)
}
```

```js
// a.js
var dt = new Date()
console.log(aGetFormatDate(dt))
```

```html
<script src="util.js"></script>
<script src="a-util.js"></script>
<script src="a.js"></script>
<!-- 1. 这些代码中的函数必须是全局变量，才能暴露给使用方。全局变量污染。 -->
<!-- 2. a.js 知道要引用 a-util.js ，但是他知道还需要依赖于 util.js 吗 -->
```

AMD

- require.js
- 全局 `define` 函数
- 全局 `require` 函数
- 依赖 JS 会自动、异步加载

使用 require.js

```js
// util.js
define(function() {
  return {
    getFormatDate: function(date, type) {
      if (type === 1) {
        return '2021-03-06'
      } else if (type === 2) {
        return '2021年3月6日'
      }
    }
  }
})
```

```js
// a-util.js
define(['./util.js'], function(util) {
  return {
    aGetFormatDate: function(date) {
      return util.getFormatDate(date, 2)
    }
  }
})
```

```js
// a.js
define(['./a-util.js'], function(aUtil) {
  return {
    printDate: function(date) {
      console.log(aUtil.aGetFormatDate(date))
    }
  }
})
```

```js
// main.js
require(['./a.js'], function(a) {
  var date = new Date()
  a.printDate(date)
})
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AMD</title>
</head>
<body>
  <script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.min.js" data-main="./main.js"></script>
</body>
</html>
```



### 7-7 模块化 - AMD 代码演示

无



### 7-8 模块化 - CommonJS

CommonJS

- Node.js 模块化规范，现在被前端大量使用，原因：
- 前端开发依赖的插件和库，都可以从 npm 中获取
- 构建工具的高度自动化，使得使用 npm 的成本非常低
- CommonJS 不会异步加载 JS ，而是同步一次性加载出来



使用 CommonJS

```js
// util.js
module.exports = {
  getFormatDate: function(date, type) {
    if (type === 1) {
      return '2021-03-06'
    } else if (type === 2) {
      return '2021年3月6日'
    }
  }
}
```

```js
// a-util.js
var util = require('util.js')
module.exports = {
  aGetFormatDate: function(date) {
    return util.getFormatDate(date, 2)
  }
}
```



AMD 和 CommonJS 的使用场景

- 需要异步加载 JS ，使用 AMD
- 使用了 npm 之后建议使用 CommonJS



重点总结

- AMD
- CommonJS
- 两者的区别



### 7-9 构建工具 - 安装 Node.js

### 7-10 构建工具 - 安装 Webpack

### 7-11 构建工具 - 配置 Webpack

### 7-12 构建工具 - 使用 jQuery

### 7-13 构建工具 - 压缩 JS

### 7-14 上线回滚 - 上线回滚流程

### 7-15 上线回滚 - Linux 基础命令



## 8章 运行环境

### 8-1 介绍

运行环境

- 浏览器就可以通过访问链接来得到页面的内容
- 通过绘制和渲染，显示出页面的最终的样子
- 整个过程中，我们需要考虑什么问题？

知识点

- 页面加载过程
- 性能优化
- 安全性



### 8-2 页面加载 - 渲染过程

题目

- 从输入 URL 到得到 HTML 的详细过程
- `window.onload` 和 `DOMContentLoaded` 的区别

知识点

- 加载资源的形式
- 加载一个资源的过程
- 浏览器渲染页面的过程



加载资源的形式

- 输入 URL（或跳转页面）加载 HTML
- 加载 HTML 中的静态资源

加载一个资源的过程

- 浏览器根据 DNS 服务器得到域名的 IP 地址
- 向这个 IP 的机器发送 HTTP 请求
- 服务器收到、处理并返回 HTTP 请求
- 浏览器得到返回内容

浏览器渲染页面的过程

- 根据 HTML 结构生产 DOM Tree
- 根据 CSS 生产 CSSOM
- 将 DOM 和 CSSOM 整合形成 Render Tree
- 根据 Render Tree 开始渲染和展示
- 遇到 `<script>` 时，会执行并阻塞渲染



### 8-3 页面加载 - 几个示例

为何要把 CSS 放在 head 中？

答：保证先加载 CSS ，接着渲染，不然要渲染两次，用户体验差。



为何要把 JS 放在 body 最下面？

答：不会阻塞渲染过程，提高性能。



`window.onload` 和 `DOMContentLoaded`

```js
window.addEventListener('load', function() {
  // 页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function() {
  // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```



### 8-4 页面加载 - 解答

从输入 URL 到得到 HTML 的详细过程

- 浏览器根据 DNS 服务器得到域名的 IP 地址
- 向这个 IP 的机器发送 HTTP 请求
- 服务器收到、处理并返回 HTTP 请求
- 浏览器得到返回内容

`window.onload` 和 `DOMContentLoaded` 的区别

- 页面的全部资源加载完才会执行，包括图片、视频等
- DOM 渲染完即可执行，此时图片、视频还没有加载完



### 8-5 性能优化 - 优化策略

性能优化

- 这本身就是一个综合性的问题
- 没有标准答案，如果要非常全面，能写一本书
- 只关注核心店，针对面试

原则

- 多使用内存、缓存或者其他方法
- 减少 CPU 计算、减少网络

从哪里入手

- 加载页面和静态资源
- 页面渲染

加载资源优化

- 静态资源的压缩合并
- 静态资源缓存
- 使用 CDN 让资源加载更快
- 使用 SSR 后端渲染，数据直接输出到 HTML 中

渲染优化

- CSS 放前面，JS 放后面
- 懒加载（图片懒加载、下拉加载更多）
- 减少 DOM 操作，对 DOM 查询做缓存，多个操作尽量合并在一起执行
- 事件节流
- 尽早执行操作，如 DOMContentLoaded



### 8-6 性能优化 - 几个示例

资源合并

```html
<script src=a.js></script>
<script src=b.js></script>
<script src=c.js></script>
```

```html
<script src="abc.js"></script>
```

缓存

- 通过连接名称控制缓存
- 只有内容改变的时候，链接名称才会改变

CDN

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

使用 SSR 后端渲染

- 现在 Vue/React 提出了这样的概念
- 其实 JSP/PHP/ASP 都属于后端渲染

懒加载

```html
<img id="img1" src="preview.png" data-realsrc="abc.png" />
<script>
  var img1 = document.getElementById('img1')
  img1.src = img1.getAttribute('data-realsrc')
</script>
```

缓存 DOM 查询

```js
// 未缓存 DOM 查询
var i
for (i = 0; i < document.getElementByTagName('p').length; i++) {
  
}

// 缓存了 DOM 查询
var pList = document.getElementByTagName('p')
var i
for (i = 0; i <pList.length; i++) {
  
}
```

合并 DOM 插入

```js
var listNode = document.getElementById('list')

// 要插入 10 个 li 标签
var frag = document.createDocumentFragment()
var x, li
for (x = 0; x < 10; x++) {
  li = document.createElement('li')
  li.innerHTML = 'List item ' + x
  frag.appendChild(li)
}
listNode.appendChild(frag)
```

事件节流

```js
var textarea = document.getElementById('text')
var timeoutid
textarea.addEventListener('keyup', function() {
  if (timeoutid) {
    clearTimeout(timeoutid)
  }
  timeoutid = setTimeout(function() {
    // 触发 change 事件
  }, 100)
})
```

尽早操作

```js
window.addEventListener('load', function() {
  // 页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function() {
  // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```



### 8-7 安全性 - XSS

知识点

- XSS 跨站请求攻击
- XSRF 跨站请求伪造



XSS

- 在新浪博客写一篇文章，同时偷偷插入一段 `<script>`
- 攻击代码中，获取 Cookie ，发送自己的服务器
- 发布博客，有人查看博客内容
- 会把查看者的 Cookie 发送到攻击者的服务器
- 前端替换关键字，例如替换 `<` 为 `&lt;` ，`>` 为 `&gt;`
- 后端替换



### 8-8 安全性 - XSRF

XSRF

- 你已登录一个购物网站，正在浏览商品
- 该网站付费接口是 xxx.com/pay?id=100 ，但是没有任何验证
- 然后你收到一封邮件，隐藏着 `<img src="xxx.com/pay?id=100" />`
- 你查看邮件的时候，就已经悄悄的付费购买了
- 增加验证流程，如输入指纹、密码、短信验证码



### 8-9 面试技巧

简历

- 简洁明了，重点突出项目经理和解决方案
- 把个人博客放在简历中，并且定期维护更新博客
- 把个人的开源项目放在简历中，并维护开源项目
- 简历千万不要造假，要保持能力和经理上的真实性

面试过程中

- 如何看待加班？加班就像借钱，救急不救穷
- 千万不要挑战面试官，不要反考面试官
- 学会给面试官惊喜，但不要太多
- 遇到不会回答的问题，说出你知道的也可以
- 谈谈你的缺点——说一下你最近正在学什么就可以了



## 第9章 真题模拟

1. **`var` 和 `let` 、`const` 的区别**

   答：

   - `var` 是 ES5 语法，`let` 、`const` 是ES6 语法，`var` 有变量提升
   - `var` 和 `let` 是变量，可修改，`const` 是常量，不可修改
   - `let` 、`const` 有块级作用域，`var` 没有

2. **`typeof` 返回哪些类型**

   答：

   - undefined 、string 、number 、boolean 、symbol
   - object（注意，`typeof null === 'object'`）
   - function

3. **列举强制类型转换和隐式类型转换**

   答：

   - 强制：`parseInt` 、`parseFloat` 、`toString` 等
   - 隐式：if 、逻辑运算、== 、+ 拼接字符串

4. **手写深度比较，模拟 lodash 的 `isEqual`**

   答：

   ```js
   // 判断是否是对象或数组
   function isObject(obj) {
     return typeof obj === 'object' && obj !== null
   }
   function isEqual(obj1, obj2) {
     if (!isObject(obj1) || !isObject(obj2)) {
       // 值类型（注意，参与 equal 的一般不会是函数）
       return obj1 === obj2
     }
     if (obj1 === obj2) {
       return true
     }
     // 两个都是对象或数组，而且不相等
     // 1. 先取出 obj1 和 obj2 的 keys ，比较个数
     const obj1Keys = Object.keys(obj1)
     const obj2Keys = Object.keys(obj2)
     if (obj1Keys.length !== obj2Keys.length) {
       return false
     }
     // 2. 以 obj1 为基准，和 obj2 一次递归比较
     for (let key in obj1) {
       if (!isEqual(obj1[key], obj2[key])) {
         return false
       }
     }
     // 3. 全相等
     return true
   }
   
   const obj1 = {
     a: 100,
     b: {
       x: 100,
       y: 200
     }
   }
   const obj2 = {
     a: 100,
     b: {
       x: 100,
       y: 200
     }
   }
   console.log(obj1 === obj2) // false
   console.log(isEqual(obj1, obj2)) // true
   ```

5. **`split` 和 `join` 的区别**

   答：

   ```js
   '1-2-3'.split('-') // [1, 2, 3]
   [1, 2, 3].join('-') /// '1-2-3'
   ```

6. **数组的 `pop` 、`push` 、`unshift` 、`shift` 分别做什么**

   答：

   - 功能是什么？
   - 返回值是什么？
   - 是否会对原数组造成影响？

   ```js
   const arr = [10, 20, 30, 40]
   const result = arr.pop()
   console.log(result, arr) // 40, [10, 20, 30]
   ```

   ```js
   const arr = [10, 20, 30, 40]
   const result = arr.push(50) // 返回 length
   console.log(result, arr) // 5, [10, 20, 30, 40, 50]
   ```

   ```js
   const arr = [10, 20, 30, 40]
   const result = arr.unshift(5) // 返回 length
   console.log(result, arr) // 5, [5, 10, 20, 30, 40]
   ```

   ```js
   const arr = [10, 20, 30, 40]
   const result = arr.shift()
   console.log(result, arr) // 10, [20, 30, 40]
   ```

   纯函数：1. 不改变源数组；2. 返回一个数组

   ```js
   // 纯函数
   const arr = [10, 20, 30, 40]
   
   const cArr = arr.concat([50, 60, 70]) // [10, 20, 30, 40, 50, 60, 70]
   const mArr = arr.map(item => item * 10) // [100, 200, 300, 400]
   const fArr = arr.filter(item => item > 20) // [30, 40]
   const sArr = arr.slice() // [10, 20, 30, 40]
   
   
   // 非纯函数
   // push 、pop 、shift 、unshift
   // forEach
   // some every reduce
   ```

7. **数组 `slice` 和 `splice` 的区别**

   答：

   - 功能区别，`slice` 是切片，`splice` 是剪接
   - 参数和返回值
   - 是否纯函数？

   ```js
   const arr = [10, 20, 30, 40, 50]
   
   // slice 是纯函数
   const sliceArr = arr.slice(1, 4)
   
   // splice 不是纯函数
   const spliceArr = arr.splice(1, 2, 'a', 'b', 'c')
   console.log(arr, spliceArr) // [10, "a", "b", "c", 40, 50]，[20, 30]
   ```

8. **`[10, 20, 30].map(parseInt)` 返回结果是什么？**

   答：

   - `map` 的参数和返回值
   - `parseInt` 的参数和返回值

   ```js
   [10, 20, 30].map(parseInt)
   // 相当于
   [10, 20, 30].map((item, index) => {
     return parseInt(item, index)
   })
   // 分解为
   parseInt(10, 0) // 10
   parseInt(20, 1) // NaN
   parseInt(30, 2) // NaN
   ```

9. **Ajax 请求 get 和 post 的区别？**

   答：

   - get 一般用于查询操作，post 一般用于提交操作
   - get 参数拼接在 url 上，post 放在请求体内（数据体积可更大）
   - 安全性，post 易于防止 CSRF

10. **函数 call 和 apply 的区别？**

    答：

    ```js
    fn.call(this, p1, p2, p3)
    fn.apply(this, arguments)
    ```

11. **事件代理（委托）是什么？**

    答：

    ```js
    function bindEvent(elem, type, selector, fn) {
      if (fn == null) {
        fn = selector
        selector = null
      }
      elem.addEventListener(type, function(e) {
        var target
        if (selector) {
          target = e.target
          if (target.matches(selector)) {
            fn.call(target, e)
          }
        } else {
          fn(e)
        }
      })
    }
    
    // 使用代理
    var div1 = document.getElementById('div1')
    bindEvent(div1, 'click', 'a', function(e) {
      console.log(this.innerHTML)
    })
    
    // 不使用代理
    var a = document.getElementById('a1')
    bindEvent(div1, 'click', function(e) {
      console.log(a.innerHTML)
    })
    ```

12. **闭包是什么，有什么特性？有什么负面影响？**

    答：

    - 回顾作用域和自由变量
    - 回顾闭包应用场景：作为参数被传入，作为返回值被返回
    - 回顾：自由变量的查找，要在函数定义的地方（而非执行的地方）
    - 影响：变量会常驻内存，得不到释放。闭包不要乱用
    
13. **如何阻止事件冒泡和默认行为？**

    答：

    - `event.stopPropagation()`
    - `event.preventDefault()`

14. **查找、添加、删除、移动 DOM 节点的方法？**

    答：

    - `getElementById` 、`getElementsByTagName` 、`getElementsByClassName` 、`querySelectorAll`
    - `appendChild`（添加和移动）
    - `removeChild`
    - `parentNode` 、`childNodes`

15. **如何减少 DOM 操作？**

    答：

    - 缓存 DOM 查询结果
    - 多次 DOM 操作，合并到一次插入

16. **解释 JSONP 的原理，为何它不是真正的 Ajax ？**

    答：

    - 浏览器的同源策略（服务端没有同源策略）和跨域
    - 哪些 HTML 标签能绕过跨域？
    - JSONP 的原理

17. **`document` 的 load 和 ready 的区别**

    答：

    ```js
    window.addEventListener('load', function() {
      // 页面的全部资源加载完才会执行，包括图片、视频等
    })
    document.addEventListener('DOMContentLoaded', function() {
      // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
    })
    ```

18. **`==` 和 `===` 的不同**

    答：

    - `==` 会尝试类型转换
    - `===` 严格相等
    - 哪些场景才会用 `==` ？

19. **函数声明和函数表达式的区别**

    答：

    - 函数声明 `function fn() {}`
    - 函数表达式 `const fn = function() {}`
    - 函数声明会在代码执行前预加载，而函数表达式不会

20. **`new Object()` 和 `Object.create()` 的区别**

    答：

    - `{}` 等同于 `new Object()` ，原型是 `Object.prototype`
    - `Object.create(null)` 没有原型
    - `Object.crate({...})` 可指定原型

    ```js
    const obj1 = {
      a: 10,
      b: 20,
      sum() {
        return this.a + this.b
      }
    }
    const obj2 = new Object({
      a: 10,
      b: 20,
      sum() {
        return this.a + this.b
      }
    })
    const obj3 = new Object(obj1)
    console.log(obj1 === obj2) // false
    console.log(obj1 === obj3) // true
    
    const obj4 = Object.create(null) // {} ，但没有原型
    const obj5 = new Object() // {}
    const obj6 = Object.create(obj1) // 创建一个空对象，把空对象的原型指向 obj1
    console.log(obj1 === obj6) // false
    console.log(obj1 === obj6.__proto__) // true
    ```

21. **关于 `this` 的场景题**

    ```js
    const User = {
      count: 1,
      getCount: function() {
        return this.count
      }
    }
    console.log(User.getCount()) // 1
    const func = User.getCount
    console.log(func()) // undefined
    ```

22. **关于作用域和自由变量的场景题（1）**

    ```js
    let i
    for (i = 1; i <=3; i++) {
      setTimeout(function() {
        console.log(i)
      }, 0)
    }
    // 4
    // 4
    // 4
    ```

23. **判断字符串以字母开头，后面字母数字下划线，长度 6-30**

    答：

    ```js
    const reg = /^[a-zA-Z]\w{5,29}$/
    ```

24. **关于作用域和自由变量的场景题（2）**

    ```js
    let a = 100
    function test() {
      alert(a) // 100
      a = 10
      alert(a) // 10
    }
    test()
    alert(a) // 10
    ```

25. **手写字符串 `trim` 方法，保证浏览器兼容性**

    答：

    ```js
    String.prototype.trim = function() {
      return this.replace(/^\s+/, '').replace(/\s+$/, '')
    }
    // （原型、this 、正则表达式）
    ```

26. **如何获取多个数字中的最大值**

    答：

    ```js
    function max() {
      const nums = Array.prototype.slice.call(arguments) // 变为数组
      let max = -Infinity
      nums.forEach(n => {
        if (n > max) {
          max = n
        }
      })
      return max
    }
    // 或者使用 Math.max()
    ```

27. **如何用 JS 实现继承？**

    答：

    - class 继承
    - prototype 继承

28. **如何捕获 JS 程序中的异常？**

    答：

    ```js
    // 第一种方式
    try {
      // TODO
    } catch(error) {
      console.error(error) // 手动捕获
    } finally {
      // TODO
    }
    
    // 第二种方式
    // 自动捕获
    window.onerror = function(message, source, lineNum, colNum, error) {
      // 第一，对跨域的 JS ，如 CDN 的不会有详细的报错信息
      // 第二，对于压缩的 JS ，还要配合 SourceMap 反查到未压缩代码的行、列
    }
    ```

29. **什么是 JSON ？**

    答：

    - JSON 是一种数据格式，本质是一段字符串
    - JSON 格式和 JS 对象结构一致，对 JS 语言更友好
    - `window.JSON` 是一个全局对象，`JSON.stringify` 和 `JSON.parse`

30. **获取当前页面 URL 参数**

    答：

    - 传统方式，查找 `location.search`
    - 新 API ，`URLSearchParams`

    ```js
    // 传统方式
    function query(name) {
      const search = location.search.substr(1)
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
      const res = search.match(reg)
      if (res === null) {
        return null
      }
      return res[2]
    }
    ```

    ```js
    // URLSearchParams
    function query(name) {
      const search = location.search
      const p = new URLSearchParams(search)
      return p.get(name)
    }
    ```

31. **将 URL 参数解析为 JS 对象**

    答：

    ```js
    // 传统方式，分析 search
    function query2Obj() {
      const res = {}
      const search = location.search.substr(1) // 去掉前面的 ?
      search.split('&').forEach(paramStr => {
        const arr = paramStr.split('=')
        const [key, val] = arr
        res[key] = val
      })
      return res
    }
    ```

    ```js
    // 使用 URLSearchParams
    function query2Obj() {
      const res = {}
      const pList = new URLSearchParams(location.search)
      pList.forEach((val, key) => {
        res[key] = val
      })
      return res
    }
    ```

32. **手写数组 faltern ，考虑多层级**

    答：

    ```js
    function flat(arr) {
      // 验证 arr 中，还有没有深层数组
      const isDeep = arr.some(item => item instanceof Array)
      if (!isDeep) {
        return arr
      }
      return flat(Array.prototype.concat.apply([], arr))
    }
    
    const res = flat([1, 2, [3, 4], [5, [6, 7]]])
    console.log(res) // [1, 2, 3, 4, 5, 6, 7]
    ```

33. **数组去重**

    答：

    - 传统方式，遍历元素挨个比较、去重
    - 使用 Set
    - 考虑计算效率

    ```js
    // 传统方式
    function unique(arr) {
      const res = []
      arr.forEach(item => {
        if (res.indexOf(item) < 0) {
          res.push(item)
        }
      })
      return res
    }
    console.log(unique([1, 2, 3, 1, 2, 3, 4])) // 1 2 3 4
    ```

    ```js
    // 使用 Set（无序、不重复）
    function unique(arr) {
      const set = new Set(arr)
      return [...set]
    }
    console.log(unique([1, 2, 3, 1, 2, 3, 4])) // 1 2 3 4
    ```

34. **手写深拷贝**

    答：

    ```js
    function deepClone(obj = {}) {
      // 如果不是数组或对象，直接返回
      if (typeof obj !== 'object' || obj == null) {
        return obj
      }
      // 初始化返回结果
      let result
      if (obj instanceof Array) {
        result = []
      } else {
        result = {}
      }
      // 遍历数组或对象的属性
      for (let key in obj) {
        // 保证 key 不是原型的属性
        if (obj.hasOwnProperty(key)) {
          // 递归调用
          result[key] = deepClone(obj[key])
        }
      }
      // 返回结果
      return result
    }
    
    // 注意 Object.assign 不是深拷贝
    ```

35. **介绍一下 RAF（`requestAnimationFrame`）**

    答：

    - 要想动画流畅，更新频率要 60 帧/秒，即 16.67ms 更新一次视图
    - `setTimeout` 要手动更新频率，而 RAF 浏览器会自动控制
    - 后台标签或隐藏 iframe 中，RAF 会暂停，而 `setTimeout` 依然执行

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>setTimeout</title>
      <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
      <style>
        #div1, #div2 {
          width: 100px;
          height: 50px;
          margin-bottom: 20px;
          background-color: red;
        }
      </style>
    </head>
    <body>
      <div id="div1">setTimeout</div>
      <div id="div2">requestAnimateFrame</div>
      <script>
        const $div1 = $('#div1')
        let curWidth = 100
        const maxWidth = 640
        function animate() {
          curWidth += 3
          $div1.css('width', curWidth)
          if (curWidth < maxWidth) {
            setTimeout(animate, 16.7)
          }
        }
        animate()
    
        const $div2 = $('#div2')
        let curWidth2 = 100
        function animate2() {
          curWidth2 += 3
          $div2.css('width', curWidth2)
          if (curWidth2 < maxWidth) {
            window.requestAnimationFrame(animate2)
          }
        }
        animate2()
      </script>
    </body>
    </html>
    ```

36. **前端性能如何优化？一般从哪几个方面考虑？**

    答：

    - 原则：多使用内存、缓存，减少计算、减少网络请求
    - 方向：加载页面，页面渲染，页面操作流畅度

