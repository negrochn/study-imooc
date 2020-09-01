# Vue 基本使用

**模板（插值、指令）**

- 插值、表达式
- 指令、动态属性
- v-html （会有 XSS 风险，会覆盖子组件）

```html
<!-- 演示地址：https://codepen.io/02954/pen/WNQWYMa -->
<div id="app">
  
  <div>
    <p>文本插值 {{ message }}</p>
    <p>JS 表达式 {{ flag ? 'yes' : 'no' }}</p>
    
    <p :id="dynamicId">动态属性 id</p>
    
    <hr />
    <p v-html="rawHtml">
      <span>有 XSS 风险</span>
      <span>【注意】使用 v-html 之后，将会覆盖子组件</span>
    </p>
  </div>
  
</div>
```

```js
new Vue({
  el: '#app',
  data() {
    return {
      message: 'hello Vue',
      flag: true,
      dynamicId: `id-${Date.now()}`,
      rawHtml: '指令 - 原始 html <b>加粗</b> <i>斜体</i>'
    }
  }
})
```



**computed 和 watch**

- computed 有缓存，响应式依赖不变则不会重新计算
- computed 的 getter 函数没有副作用
- v-model 绑定 computed 时，computed 需要有 getter 和 setter ，否则报错
- watch 如何深度监听？
  - `handler: function(newVal, oldVal) {}`
  - `deep: true`
- watch 监听引用类型，拿不到 oldVal
- 当需要在数据发生变化时执行异步或开销比较大的操作时，watch 方式是很有用的

```html
<!-- computed ，演示地址：https://codepen.io/02954/pen/dyYLwQg -->
<div id="app">
  
  <div>
    <p>num {{ num }}</p>
    <p>double1 {{ double1 }}</p>
    <input v-model="double2" />
  </div>
  
</div>
```

```js
new Vue({
  el: '#app',
  data() {
    return {
      num: 20
    }
  },
  computed: {
    double1() {
      return this.num * 2
    },
    double2: {
      get() {
        return this.num * 2
      },
      set(val) {
        this.num = val / 2
      }
    }
  }
})
```

```html
<!-- watch ，演示地址：https://codepen.io/02954/pen/RwWOvNz -->
<div id="app">
  
  <div>
    <p>name {{ name }}</p>
    <input v-model="name" />
    <p>info {{ info }}</p>
    <input v-model="info.city" />
  </div>
  
</div>
```

```js
new Vue({
  el: '#app',
  data() {
    return {
      name: 'negrochn',
      info: {
        city: '杭州'
      }
    }
  },
  watch: {
    name(newVal, oldVal) {
      console.log('watch name', newVal, oldVal)
    },
    info: {
      handler: function(newVal, oldVal) {
        console.log('watch info', newVal, oldVal)
      },
      deep: true // 深度监听
    }
  }
})
```



**class 和 style**

- 使用动态属性
- 使用驼峰式写法

```html
<!-- class 和 style ，演示地址：https://codepen.io/02954/pen/MWaRLJO -->
<div id="app">
  
  <div>
    <p :class="{ black: isBlack, yellow: isYellow }">使用 class</p>
    <p :class="[black, yellow]">使用 class （数组）</p>
    <p :style="styleData">使用 style</p>
  </div>
  
</div>
```

```css
html {
  height: 100%;
}

.black {
  color: #000;
}

.yellow {
  background-color: yellow;
}
```

```js
new Vue({
  el: '#app',
  data() {
    return {
      isBlack: true,
      isYellow: true,
      black: 'black',
      yellow: 'yellow',
      styleData: {
        fontSize: '40px',
        color: 'red',
        backgroundColor: '#ccc'
      }
    }
  }
})
```



**条件渲染**

- v-if/v-else 的用法，可使用变量，也可使用 === 表达式
- v-if 和 v-show 的区别？
  - v-if 是“真正”的条件渲染，切换过程中条件块内的事件监听器和子组件适当地销毁和重建
  - v-if 是“惰性”的，初始条件为假时什么都不做，直到条件变为真才会开始渲染
  - v-show 不管初始条件是什么都会渲染，基于 CSS（ display ）进行切换
  - v-if 有更高的切换开销，v-show 有更高的初始渲染开销
- v-if 和 v-show 的使用场景
  - v-show 适用于非常频繁切换的场景
  - v-if 适用于运行条件较少改变的场景

```html
<!-- 演示地址：https://codepen.io/02954/pen/jObRdGL -->
<div id="app">
  
  <div>
    <p v-if="type === 'a'">A</p>
    <p v-else-if="type === 'b'">B</p>
    <p v-else>other</p>
    
    <p v-show="type === 'a'">A by v-show</p>
    <p v-show="type === 'b'">B by v-show</p>
  </div>
  
</div>
```

```js
new Vue({
  el: '#app',
  data() {
    return {
      type: 'a'
    }
  }
})
```



**列表渲染**

- 如何遍历对象？——也可以用 v-for
- key 的重要性。key 不能乱写（如 random 或 index ）
- v-for 和 v-if 不能一起使用！

```html
<!-- 演示地址：https://codepen.io/02954/pen/ZEbNeaO -->
<div id="app">
  
  <div>
    <p>遍历数组</p>
    <ul>
      <li v-for="(item, index) in listArr" :key="item.id">
        {{ index }} - {{ item.id }} - {{ item.title }}
      </li>
    </ul>
    
    <p>遍历对象</p>
    <ul>
      <li v-for="(val, key, index) in listObj" :key="key">
        {{ index }} - {{ key }} - {{ val.title }}
      </li>
    </ul>
  </div>
  
</div>
```

```js
new Vue({
  el: '#app',
  data() {
    return {
      listArr: [
        { id: 'a', title: '标题1' },
        { id: 'b', title: '标题2' },
        { id: 'c', title: '标题3' }
      ],
      listObj: {
        a: { title: '标题1' },
        b: { title: '标题2' },
        c: { title: '标题3' }
      }
    }
  }
})
```



**事件**

- event 参数，自定义参数
- 事件修饰符，按键修饰符
- 观察事件被绑定到哪里？

```html
<!-- 事件，event 参数和自定义参数，演示地址：https://codepen.io/02954/pen/PoPvpQV -->
<div id="app">
  
  <div>
    <p>{{ num }}</p>
    <button @click="increment1">+1</button>
    <button @click="increment2(2, $event)">+2</button>
  </div>
  
</div>
```

```js
new Vue({
  el: '#app',
  data() {
    return {
      num: 0
    }
  },
  methods: {
    increment1(event) {
      console.log('event', event, event.__proto__.constructor) // 是原生的 event 对象
      console.log(event.target)
      console.log(event.currentTarget) // 事件被挂载到当前元素
      this.num += 1
    },
    increment2(val, event) {
      console.log(event.target)
      this.num += val
    }
  }
})
```

```html
<!-- 事件修饰符 -->

<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式，即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis"></div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数，即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat"></div>
```

```html
<!-- 按键修饰符 -->
<!-- 即使 Alt 或 Shift 被一同按下也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下时才会触发 -->
<button @click.ctrl.exact="onClick">A</button>

<!-- 没有任何系统修饰符被按下时才会触发 -->
<button @click.exact="onClick">A</button>
```



**表单**

- v-model
- 常见表单项：textarea 、checkbox 、radio 、select
- 修饰符：lazy 、number 、trim

```html
<!-- 表单，演示地址：https://codepen.io/02954/pen/eYpavbv -->
<div id="app">
  
  <div>
    <p>输入框：{{ name }}</p>
    <input type="text" v-model.trim="name" />
    <input type="text" v-model.lazy="name" />
    <input type="text" v-model.number="age" />
    
    <p>多行文本：</p>
    <pre>{{ desc }}</pre>
    <textarea v-model="desc"></textarea>
    <!-- 注意：<textarea>{{desc}}</textarea> 是不允许的！ -->
    
    <p>复选框：{{ checked }}</p>
    <input type="checkbox" v-model="checked" />
    
    <p>多个复选框：{{ checkedNames }}</p>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>
    
    <p>单选：{{ gender }}</p>
    <input type="radio" id="male" value="male" v-model="gender" />
    <label for="male">男</label>
    <input type="radio" id="female" value="female" v-model="gender" />
    <label for="female">女</label>
    
    <p>下拉列表选择：{{ selected }}</p>
    <select v-model="selected">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    
    <p>下拉列表选择（多选）：{{ selectedList }}</p>
    <select v-model="selectedList" multiple>
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
  </div>
  
</div>
```

```js
new Vue({
  el: '#app',
  data() {
    return {
      name: '',
      age: 17,
      desc: '',
      checked: false,
      checkedNames: [],
      gender: 'male',
      selected: '',
      selectedList: []
    }
  }
})
```

