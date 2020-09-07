# Vue 模板编译

**模板编译前置知识点 - with 语法**

模板编译

- 模板是 Vue 开发中最常用的部分，即与使用相关联的原理
- 它不是 HTML ，有指令、插值、JS 表达式，到底是什么？
- 面试不会直接问，但会通过“组件渲染和更新过程”考察
- 前置知识：JS 的 with 语法
- vue-template-compiler 将模板编译为 render 函数
- 执行 render 函数生成 vnode



with 语法

- 改变 {} 内自由变量的查找规则，当做 obj 属性来查找
- 如果找不到匹配的 obj 属性，就会报错
- with 要慎用，它打破了作用域规则，易读性变差

 ```js
const obj =  { a: 100, b: 300 }

console.log(obj.a) // 100
console.log(obj.b) // 200
console.log(obj.c) // undefined
 ```

```js
// 使用 with ，能改变 {} 内自由变量的查找方式
// 将 {} 内自由变量，当做 obj 的属性来查找
with(obj) {
  console.log(a) // 100
  console.log(b) // 200
  console.log(c) // 会报错！！！
}
```



**Vue 模板被编译成什么**

模板编译

- 模板不是 HTML ，有指令、插值、JS 表达式，能实现判断、循环
- HTML 是标签语言，只有 JS 才能实现判断、循环（图灵完备的）
- 因此，模板一定是转换为某种 JS 代码，即模板编译
- 模板编译为 render 函数，执行 render 函数返回 vnode
- 基于 vnode 再执行 patch 和 diff
- 使用 webpack 的 vue-loader ，会在开发环境下编译模板（重要）

```js
const compiler = require('vue-template-compiler')

// 插值
const template = `<p>{{ message }}</p>`

// 编译
const res = compiler.compile(template)
console.log(res.render)
// with(this){return _c('p',[_v(_s(message))])}
```

_c 表示 createElement ，即 h 函数

_v 表示 createTextVNode

_s 表示 toString

```js
// 表达式
const template = `<p>{{ flag ? message : 'no message found' }}</p>`
// with(this){return _c('p',[_v(_s(flag ? message : 'no message found'))])}
```

```js
// 属性和动态属性
const template = `
  <div id="div1" class="container">
    <img :src="imgUrl" />
  </div>
`
// with(this){return _c('div',{staticClass:"container",attrs:{"id":"div1"}},[_c('img',{attrs:{"src":imgUrl}})])}
```

```js
// 条件
const template = `
  <div>
    <p v-if="flag === 'a'">A</p>
    <p v-else>B</p>
  </div>
`
// with(this){return _c('div',[(flag === 'a')?_c('p',[_v("A")]):_c('p',[_v("B")])])}
```

```js
// 循环
const template = `
  <ul>
    <li v-for="item in list" :key="item.id">{{ item.title }}</li>
  </ul>
`
// with(this){return _c('ul',_l((list),function(item){return _c('li',{key:item.id},[_v(_s(item.title))])}),0)}
```

_l 表示 renderList

```js
// 事件
const template = `
  <button @click="onClick">Submit</button>
`
// with(this){return _c('button',{on:{"click":onClick}},[_v("Submit")])}
```

```js
// v-model
const template = `
  <input type="text" v-model="name" />
`
// with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],attrs:{"type":"text"},domProps:{"value":(name)},on:{"input":function($event){if($event.target.composing)return;name=$event.target.value}}})}
```



**Vue 组件可用 render 代替 template**

```js
Vue.component('heading', {
  render: function(createElement) {
    return createElement('h' + this.level, [
      createElement('a', {
        attrs: {
          name: 'headerId',
          href: '#' + 'headerId'
        }
      }, 'this is a tag')
    ])
  }
})
```

- 讲完模板编译，再讲这个 render ，就比较好理解了
- 在有些复杂情况中，不能用 template ，可用考虑用 render
- React 一直都用 render（没有模板），和这里一样



总结

- with 语法
- 模板到 render 函数，再到 vnode ，再到渲染和更新
- Vue 组件可以用 render 代替 template



**回顾和复习已学的知识点**

组件渲染和更新过程

- 一个组件渲染到页面，修改 data 触发更新（数据驱动视图）
- 其背后原理是什么，需要掌握哪些要点？
- 考察对流程了解的全面程度
- 初次渲染过程，更新过程，异步渲染



回顾学过的知识

- 响应式：监听 data 属性，getter ，setter（包括数组）
- 模板编译：模板到 render 函数，再到 vnode
- vdom：patch(elem, vnode) 和 patch(vnode, newVnode)

