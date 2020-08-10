# Vue 组件渲染和更新

**Vue 组件是如何渲染和更新的**

初次渲染过程

- 解析模板为 render 函数（或在开发环境已完成，vue-loader ）
- 触发响应式，监听 data 属性，getter 和 setter
- 执行 render 函数，生成 vnode ，patch(elem, vnode)



执行 render 函数会触发 getter

```vue
<template>
	<p>
    {{ message }}
  </p>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello', // 会触发 get
      city: 'Hangzhou' // 不会触发 get ，因为模板没用到，即与视图没关系
    }
  }
}
</script>
```



更新过程

- 修改 data ，触发 setter （此前在 getter 中已被监听）
- 重新执行 render 函数，生成 newVnode
- patch(vnode, newVnode)

![](https://img.mukewang.com/szimg/5e834ef40001a76119201080.jpg)



**Vue 组件是异步渲染的**

异步渲染

- 回顾 $nextTick
- 汇总 data 的修改，一次性更新视图
- 减少 DOM 操作次数，提高性能

```js
new Vue({
  el: '#app',
  data() {
    return {
      list: ['a', 'b', 'c']
    }
  },
  methods: {
    addItem() {
      this.list.push(`${Date.now()}`)
      this.list.push(`${Date.now()}`)
      this.list.push(`${Date.now()}`)
      
      this.$nextTick(() => {
        // 获取 DOM 元素
        const ulElem = this.$refs.ul1
        console.log(ulElem.childNodes.length)
      })
    }
  }
})
```



总结

- 渲染和响应式的关系
- 渲染和模板编译的关系
- 渲染和 vdom 的关系
- 初次渲染过程
- 更新过程
- 异步渲染