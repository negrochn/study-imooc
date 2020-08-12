# Vue 面试题

**1. v-show 和 v-if 的区别**

- v-if 是“真正”的条件渲染，切换过程中条件块内的事件监听器和子组件适当地销毁和重建
- v-if 是“惰性”的，初始条件为假时什么都不做，直到条件变为真才会开始渲染
- v-show 是不管初始条件是什么都会渲染，基于 CSS 进行切换（display: none）
- v-if 有更高的切换开销，v-show 有更高的初始渲染开销
- v-show 适用于非常频繁切换的场景，v-if 适用于运行条件较少改变的场景



**2. 为何在 v-for 中使用 key**

- 必须用 key ，而且不能是 index 和 random
- diff 算法中通过 tag 和 key 来判断是否 sameVnode
- 减少渲染次数，提升渲染性能



**3. 描述 Vue 组件生命周期（父子组件）**

- 单组件生命周期图
- 父子组件生命周期关系



**4. Vue 组件如何通信**

- 父子组件 props 和 $emit
- 自定义事件 `event.$on` 、`event.$emit` 、`event.$off`
- Vuex



**5. 描述渲染和更新过程**

![](https://img.mukewang.com/szimg/5f1523310001423419201080.jpg)



**6. 双向数据绑定 v-model 的实现原理**

- input 元素的 `value="name"`
- 绑定 input 事件 `@input="name = $event.target.value"`
- data 更新触发 re-render



**7. 对 MVVM 的理解**

![](https://img1.sycdn.imooc.com/szimg/5f1523630001a78c19201080.jpg)



**8. computed 有何特点**

- 缓存，data 不变不会重新计算
- 提高性能



**9. 为何组件必须是一个函数？**

- 定义的 Vue 组件是一个 class ，每个地方去使用这个组件，其实是这个 class 的实例化



**10. Ajax 请求应该放在哪个生命周期**

-  mounted
- JS 是单线程的，Ajax 异步获取数据
- 放在 mounted 之前没有用，只会让逻辑更加混乱



**11. 如何将组件所有 props 传递给子组件**

- $props
- `<User v-bind="$props">`
- 细节知识点，优先级不高



**12. 如何自己实现 v-model**

```vue
<!-- 注意：
				1. 上面使用 :value 而没用 v-model
				2. 上面的 change 和 model.event 对应起来，即名字自己改
-->
<template>
  <input type="text" :value="text" @input="$emit('change', $event.target.value)" />
</template>

<script>
export default {
  model: {
    prop: 'text', // 对应到 props.text
    event: 'change'
  },
  props: {
    text: String
  }
}
</script>
```



**13. 多个组件有相同逻辑，如何抽离**

- mixin
- 以及 mixin  的一些缺点



**14. 何时要使用异步组件**

- 加载大组件
- 路由异步加载



**15. 何时需要使用 keep-alive**

- 缓存组件，不需要重复渲染
- 如多个静态 tab 页的切换
- 优化性能



**16. 何时需要使用 beforeDestroy**

- 解绑自定义事件 event.$off
- 清除定时器
- 解绑自定义的 DOM 事件，如 window.scroll 等



**17. 什么是作用于插槽**

```vue
<template>
	<a :href="url">
    <slot :website="website">
      {{ website.subTitle }}
  	</slot>
  </a>
</template>

<script>
export default {
  props: {
    url: String
  },
  data() {
    return {
      website: {
        url: 'https://coding.imooc.com/',
        title: '慕课网',
        subTitle: '实战课程'
      }
    }
  }
}
</script>

<style>
</style>
```

```vue
<template>
	<Child :url="website.url">
    <template v-slot="slotProps">
      <!-- slotProps 名字可自定义 -->
      {{ slotProps.website.title }}
		</template>
  </Child>
</template>

<script>
import Child from './child'

export default {
  data() {
    return {
      website: {
        url: 'https://github.com/'
      }
    }
  }
}
</script>
```



**18. Vuex 中 action 和 mutation 有何区别**

- action 中处理异步，mutation 不可以
- mutation 做原子操作
- action 可以整合多个 mutation



**19. vue-router 常用的路由模式**

- hash 模式（默认）
- H5 history 模式（需要服务端支持）
- 两者比较



**20. 如何配置 vue-router 异步加载**

```js
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/home')
    },
    {
      path: '/login',
      component: () => import('@/pages/login')
    }
  ]
})
```



**21. 请用 vnode 描述一个 DOM 结构**

```html
<div id="div1" class="container">
  <p>vdom</p>
  <ul style="font-size: 20px">
    <li>a</li>
  </ul>
</div>
```

```js
{
  tag: 'div',
  props: {
    className: 'container',
    id: 'div1'
  },
  children: [
    {
      tag: 'p',
      children: 'vdom'
    },
    {
      tag: 'ul',
      props: {
        style: 'font-size: 20px'
      },
      children: [
        {
          tag: 'li',
          chilren: 'a'
        }
      ]
    }
  ]
}
```



**22. 监听 data 变化的核心 API 是什么**

- Object.defineProperty
- 以及深度监听、监听数组
- 有何缺电



**23. Vue 如何监听数组变化**

- Object.defineProperty 不能监听数组变化
- 重新定义原型，重写 push 、pop 等方法，实现监听
- Proxy 可以原生支持监听数组变化



**24. 请描述响应式原理**

- 监听 data 变化
- 组件渲染和更新的流程



**25. diff 算法的事件复杂度**

- O(n)
- 在O(n^3) 基础上做了一些调整



**26. 简述 diff 算法过程**

- patch(elem, vnode) 和 patch(vnode, newVnode)
- patchVnode 、addVnodes 和 removeVnodes
- updateChildren（ key 的重要性）



**27. Vue 为何是异步渲染，$nextTick 何用？**

- 异步渲染（以及合并 data 修改），可以提高渲染性能
- $nextTick 在 DOM 更新完之后，触发回调



**28.  Vue 常见性能优化方式**

- 合理使用 v-show 和 v-if
- 合理使用 computed
- v-for 时加 key ，以及避免和 v-if 同时使用
- 自定义事件、DOM 事件及时销毁
- 合理使用异步组件
- 合理使用 keep-alive
- data 层级不要太深
- 使用 vue-loader 在开发环境做模板编译（预编译）
- webpack 层级的优化
- 前端通用的性能优化，如图片懒加载
- 使用 SSR