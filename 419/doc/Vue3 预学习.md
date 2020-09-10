# Vue3 预学习

**Vue3**

Vue3 要来了

- ~~Vue3 尚未发布，还在研发中~~
- 面试会考察候选人对新技术的关注程度
- ~~新版本发布之后~~，再做补充



Vue3 升级内容

- 全部用 TS 重写（响应式、vdom 、模板编译）
- 性能提升，（打包后的）代码量减少
- 会调整部分 API



Vue2.x 马上就要过时了吗？

- Vue3 从正式发布到推广开来，还需要一段时间
- Vue2.x 应用范围非常广泛，有大量项目需要维护、升级
- Proxy 存在浏览器兼容性问题，且不能 Polyfill



接下来

- 社区热门知识点：Proxy 重写响应式
- 其他面试题，~~待发布~~之后再补充



**Proxy 基本使用**

回顾 Object.defineProperty

- 见 [Vue 响应式原理](https://github.com/negrochn/study-imooc/blob/master/419/doc/Vue%20%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.md)



Object.defineProperty 的缺点

- 深度监听需要一次性递归
- 无法监听新增属性和删除属性（ Vue.set 和 Vue.delete ）
- 无法原生监听数组，需要特殊处理



Proxy 基本使用

```js
const data = {
  name: 'negrochn',
  age: 18
}

const proxyData = new Proxy(data, {
  get(target, key, receiver) {
    // 只处理本身（非原型的）属性
    const ownKeys = Reflect.ownKeys(target)
    if (ownKeys.includes(key)) {
      console.log('get', key)
    }
    const result = Reflect.get(target, key, receiver)
    return result // 返回结果
  },
  set(target, key, val, receiver) {
    // 不重复修改数据
    if (target[key] === val) {
      return true
    }
    const result = Reflect.set(target, key, val, receiver)
    console.log('set', key, val)
    return result // 是否设置成功
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key)
    console.log('delete property', key)
    return result // 是否删除成功
  }
})

// 测试
proxyData.age = 19
delete ProxyData.age
```



Reflect 的作用

- 和 Proxy 能力一一对应
- 规范化、标准化、函数式
- 替代掉 Object 上的工具函数



**Vue3 用 Proxy 实现响应式**

Proxy 实现响应式

- 深度监听，性能更好
- 可监听新增和删除属性
- 可监听数组变化

```js
function reactive(target = {}) {
  // 不是对象或数组，则返回
  if (typeof target !== 'object' || target == null) {
    return target
  }
  
  // 代理配置
  const proxyConf = {
    get(target, key, receiver) {
      // 只处理本身（非原型的）属性
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('get', key)
      }
      
      // 深度监听，如何提升性能
      return reactive(Reflect.get(target, key, receiver))
    },
    set(target, key, val, receiver) {
      // 重复的数据，不处理
      if (target[key] === val) {
        return true
      }
      
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('已有的 key', key)
      } else {
        console.log('新增的 key', key)
      }
      
      const result = Reflect.set(target, key, val, receiver)
      console.log('set', key, val)
      return result // 是否设置成功
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      console.log('delete property', key)
      return result // 是否删除成功
    }
  }
  
  // 生成代理对象
  return new Proxy(target, proxyConf)
}

// 测试数据
const data = {
  name: 'negrochn',
  age: 18,
  address: {
    province: '浙江省',
    city: '杭州市'
  },
  a: {
    b: {
      c: {
        d: {
          e: {
            f: '深层嵌套'
          }
        }
      }
    }
  }
}

const proxyData = reactive(data)
```



总结

- Proxy 能规避 Object.defineProperty 的问题
- Proxy 无法兼容所有浏览器，无法 Polyfill