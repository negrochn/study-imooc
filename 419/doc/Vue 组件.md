# Vue 组件

**props 和 $emit**

- 父组件传递一个属性给子组件，子组件通过 props 接收
- props 定义可配置的属性，推荐对象的形式（ type 、default 、validator），单向数据流
- 子组件通过 $emit 触发父组件中绑定的事件，并传递数据



**组件间通信 - 自定义事件**

- 兄弟组件间通过自定义事件（只要不是父子组件都适用）

- eventBus 是一个 Vue 实例，Vue 本身具有自定义事件的能力

- 创建 eventBus

  ```js
  // eventBus.js
  import Vue from 'vue'
  export default new Vue()
  ```

- 引入 eventBus ，事件接收方和事件提供方都需要引入

  ```js
  // 假设 eventBus.js 在 /src/utils 下
  import Bus from '@/utils/eventBus.js'
  ```

- 事件接收方订阅 eventBus

  ```js
  Bus.$on('getTarget', target => {
    console.log(target)
  })
  ```

- 事件提供方发布 eventBus

  ```js
  Bus.$emit('getTarget', event.target)
  ```

- eventBus 使用后及时销毁，否则可能造成内存泄漏

  ```js
  beforeDestroy() {
    Bus.$off('getTarget')
  }
  ```



**组件生命周期**

- 挂载阶段
  - beforeCreate
  - created
  - beforeMount
  - mounted
- 更新阶段
  - beforeUpdate
  - updated
- 销毁阶段
  - beforeDestroy
  - destroyed

[![生命周期](https://cn.vuejs.org/images/lifecycle.png)](https://cn.vuejs.org/images/lifecycle.png)



created 和 mounted 的区别？

- created ，Vue 实例已经初始化，但还没有开始渲染
- mounted ，页面已经渲染

beforeDestroy 要做哪些处理？

- 自定义事件解除绑定（如 eventBus）
- 定时任务销毁（如 setTimeout 、setInterval ）
- 绑定的 window 或 document 事件销毁

生命周期（父子组件）

- 挂载阶段的顺序
  - 父 beforeCreate ，父 created ，父 beforeMount
  - 子 beforeCreate ，子 created ，子beforeMount
  - 子 mounted
  - 父 mounted
- 更新阶段的顺序
  - 父 beforeUpdate
  - 子 beforeUpdate
  - 子 updated
  - 父 updated
- 销毁阶段的顺序
  - 父 beforeDestroy
  - 子 beforeDestroy
  - 子 destroyed
  - 父 destroyed