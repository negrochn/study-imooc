# Vue 响应式原理

**监听 data 变化的核心 API 是什么**

Vue 响应式

- 组件 data 的数据一旦变化，立刻触发视图的更新
- 实现数据驱动视图的第一步
- 考察 Vue 原理的第一题
- 核心 API - Object.defineProperty
- 如何实现响应式，代码演示
- Object.defineProperty 的一些缺点



Proxy 有兼容性问题

- Proxy 兼容性不好，且无法 Polyfill
- Vue2.x 还会存在一段时间，所以都得学
- Vue3.0 相关知识，下一章讲，这里只是先提一下



Object.defineProperty 基本用法

```js
const data = {}
let name = 'negrochn'

Object.defineProperty(data, 'name', {
  get() {
    console.log('get')
    return name
  },
  set(newVal) {
    console.log('set')
    name = newVal
  }
})

console.log(data.name) // get negrochn
data.name = 'negro' // set
```



Object.defineProperty 实现响应式

- 监听对象，监听数组
- 复杂对象，深度监听
- 几个缺点



**如何深度监听 data 变化**

```js
// 触发视图更新
function updateView() {
  console.log('更新视图')
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  // 深度监听
  observe(value)
  
  // 核心 API
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        // 深度监听
        observe(newVal)
        
        // 设置新值
        // 注意，value 一直在闭包中，此处设置完后，再 get 时也是最新的值
        value = newVal
        
        updateView()
      }
    }
  })
}

// 监听对象属性
function observe(target) {
  // 不是对象或数组，则直接返回
  if (typeof target !== 'object' || target == null) {
    return target
  }
  
  // 重新定义各个属性（ for in 也可以遍历数组）
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

let data = {
  name: 'negrochn',
  age: 18,
  address: {
    city: 'Hangzhou'
  }
}

observe(data)

data.name = 'negro'
data.age = {
  num: 19
}
data.age.num = 20
data.address.city = 'Huzhou'
data.job = 'IT' // 新增属性，监听不到 —— Vue.set
delete data.age // 删除属性，监听不到 —— Vue.delete
```



Object.defineProperty 的缺点

- 深度监听，需要递归到底，一次性计算量大
- 无法监听新增属性和删除属性（ Vue.set 和 Vue.delete ）
- 无法原生监听数组，需要特殊处理



**如何监听数组变化**

```js
// 触发视图更新
function updateView() {
  console.log('更新视图')
}

// 重新定义数组原型
const oldArrayPrototype = Array.prototype
// 创建新对象，原型指向 oldArrayPrototype ，再扩展新的方法不影响原型
const newArrayPrototype = Object.create(oldArrayPrototype)
;['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  newArrayPrototype[methodName] = function() {
    updateView()
    
    oldArrayPrototype[methodName].call(this, ...arguments)
  }
})

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  // 深度监听
  observe(value)
  
  // 核心 API
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        // 深度监听
        observe(newVal)
        
        // 设置新值
        // 注意，value 一直在闭包中，此处设置完后，再 get 时也是最新的值
        value = newVal
        
        updateView()
      }
    }
  })
}

// 监听对象属性
function observe(target) {
  // 不是对象或数组，则直接返回
  if (typeof target !== 'object' || target == null) {
    return target
  }
  if (Array.isArray(target)) {
    target.__proto__ = newArrayPrototype
  }
  
  // 重新定义各个属性（ for in 也可以遍历数组）
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

let data = {
  name: 'negrochn',
  age: 18,
  address: {
    city: 'Hangzhou'
  },
  hobby: ['摄影', '园艺']
}

observe(data)

data.hobby.push('看书')
```

