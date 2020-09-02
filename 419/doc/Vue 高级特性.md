# Vue 高级特性

**自定义 v-model**

- v-bind 只能实现单向绑定
- v-model 实现双向绑定
- 在自定义组件中使用 model 选项来指定 prop 和 event

```js
{
  // 默认 model
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
```

```html
<!-- 自定义 v-model ，演示地址：https://codepen.io/02954/pen/jObjbRQ -->
<div id="app">
  <span>{{ inputVal }}</span>
  <custom-v-model v-model="inputVal" />
</div>
```

```js
Vue.component('custom-v-model',{
  model: {
    prop: 'text',
    event: 'change'
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  template: `
    <div>
      <input type="text" :value="text" @input="$emit('change', $event.target.value)" />
    </div>
  `
})

new Vue({
  el: '#app',
  data() {
    return {
      inputVal: ''
    }
  }
})
```



**$nextTick**

- Vue 是异步渲染的
- data 改变之后，DOM 不会立即渲染
- $nextTick 会在 DOM 渲染之后被触发，以获取最新的 DOM 节点
- 页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次（即只调用一次 $nextTick ）

```html
<!-- $nextTick ，演示地址：https://codepen.io/02954/pen/ZEbdQeY -->
<div id="app">
  
  <div>
    <ul ref="ul1">
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="addItem">Add</button>
  </div>
  
</div>
```

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



**$refs**

- 在元素上指定 ref 的名称
- 可以通过 this.$refs.xxx 来获取对应的 DOM 元素



**slot**

slot 的作用：让父组件可以往子组件中插入一段内容（不一定是字符串，可以是其他组件，只要符合 Vue 标准的组件或标签都可以）

- 基本使用

  ```vue
  <!-- SlotDemo.vue -->
  <template>
    <a :href="url">
      <slot>
        默认内容，即父组件没有设置内容时，这里显示
      </slot>
    </a>
  </template>
  
  <script>
  export default {
    props: ['url']
  }
  </script>
  ```

  ```vue
  <!-- 父组件 -->
  <template>
    <SlotDemo :url="website.url">
      {{ website.title }}
    </SlotDemo>
  </template>
  
  <script>
  import SlotDemo from './SlotDemo'
  
  export default {
    components: { SlotDemo },
    data() {
      return {
        website: {
          url: 'https://www.imooc.com/',
          title: '慕课网',
          subTitle: '程序员的梦工厂'
        }
      }
    }
  }
  </script>
  ```

- 作用域插槽

  让父组件可以访问到子组件的数据。

  ```vue
  <!-- ScopedSlotDemo.vue -->
  <tempalte>
    <a :href="url">
      <slot :slotData="website">
        {{ website.subTitle }}
      </slot>
    </a>
  </tempalte>
  
  <script>
  export default {
    props: ['url'],
    data() {
      return {
        website: {
          url: 'https://cn.vuejs.org/',
          title: 'Vue.js',
          subTitle: '渐进式 JavaScript 框架'
        }
      }
    }
  }
  </script>
  ```

  ```vue
  <!-- 父组件 -->
  <template>
    <ScopedSlotDemo :url="website.url">
      <template v-slot="slotProps">
        {{ slotProps.slotData.title }}
      </template>
    </ScopedSlotDemo>
  </template>
  
  <script>
  import ScopedSlotDemo from './ScopedSlotDemo'
  
  export default {
    components: { ScopedSlotDemo },
    data() {
      website: {
        url: 'https://www.imooc.com/',
        title: '慕课网',
        subTitle: '程序员的梦工厂'
      }
    }
  }
  </script>
  ```

- 具名插槽

  适用于多个插槽的情况。

  ```vue
  <!-- NamedSlotDemo -->
  <template>
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </template>
  ```

  ```vue
  <!-- 父组件 -->
  <template>
    <NamedSlotDemo>
      <!-- v-slot:header 的缩写为 #header -->
      <template v-slot:header>
        <h1>将插入 header slot 中</h1>
      </template>
      
      <p>将插入 main slot 中，即未命中的 slot</p>
  
      <template v-slot:footer>
        <p>将插入到 footer slot 中</p>
      </template>
    </NamedSlotDemo>
  </template>
  ```



**动态组件**

- `<component :is="componentName" />` 用法
- 需要根据数据，动态渲染的场景，即组件类型不确定



**异步组件**

- import 函数
- 按需加载，异步加载大组件

```js
// 同步引入组件
import 组件名 from '组件路径'

// 异步引入组件
export default {
  components: {
    组件名: () => import('组件路径')
  }
}
```



**keep-alive**

- 缓存组件
- 频繁切换，不需要重复渲染
- Vue 常见性能优化

keep-alive 通常用于 tab 的切换。

v-show 和 keep-alive 的区别

1. v-show 通过改变 CSS 属性（ display ）来控制元素的显示或隐藏
2. keep-alive 是在 Vue 框架层级进行的 JS 对象的渲染



**mixin**

- 多个组件有相同的逻辑，抽离出来
- mixin 并不是完美的解决方案，会有一些问题
- Vue3 提出的 Composition API 旨在解决这些问题

mixin 的问题

1. 变量来源不明确，不利于阅读
2. 多 mixin 可能会造成命名冲突
3. mixin 和组件可能出现多对多的关系，复杂度高

