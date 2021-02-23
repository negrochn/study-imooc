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
  this.name = nage
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
- 全局：变量定义、函数声明（注意函数声明和函数表达式的区别）
- 函数：变量定义、函数声明、`this` 、`arguments`

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