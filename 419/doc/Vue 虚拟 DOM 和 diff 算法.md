# Vue 虚拟 DOM 和 diff 算法

**虚拟 DOM - 面试里的网红**

虚拟 DOM（ Virtual DOM ）和 diff

- vdom 是实现 Vue 和 React 的重要基石
- diff 算法是 vdom 中最核心、最关键的部分
- vdom 是一个热门话题，也是面试中的热门问题
- DOM 操作非常耗费性能
- 以前用 jQuery ，可以自行控制 DOM 操作的时机，手动调整
- Vue 和 React 是数据驱动视图，如何有效控制 DOM 操作？



解决方案 - vdom

- 有了一定复杂度，想减少计算次数比较难
- 能不能把计算，更多的转移为 JS 计算？因为 JS 执行速度很快
- vdom - 用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM



用 JS 模拟 DOM 结构

```html
<!-- DOM 结构 -->
<div id="div1" class="container">
  <p>vdom</p>
  <ul style="font-size: 20px">
    <li>a</li>
  </ul>
</div>
```

```js
// JS 模拟
{
  tag: 'div',
  props: { className: 'container', id: 'div1' },
  children: [
    { tag: 'p', children: 'vdom' },
    {
      tag: 'ul',
      props: { style: 'font-size: 20px' },
      children: [
        { tag: 'li', children: 'a' }
      ]
    }
  ]
}
```



通过 snabbdom 学习 vdom

- 简洁强大的 vdom 库，易学易用
- Vue 参考它实现的 vdom 和 diff
- https://github.com/snabbdom/snabbdom
- Vue3.0 重写了 vdom 的代码，优化了性能
- 但 vdom 的基本理念不变，面试考点不变
- React vdom 具体实现和 Vue 也不同，但不妨碍统一学习



**用过虚拟 DOM 吗？**

snabbdom 官方用例

```js
import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

var patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

var container = document.getElementById('container')

var vnode = h('div#container.two.classes', { on: { click: someFn } }, [
  h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
  ' and this is just normal text',
  h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
])
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode)

var newVnode = h('div#container.two.classes', { on: { click: anotherEventHandler } }, [
  h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', { props: { href: '/bar' } }, 'I\'ll take you places!')
])
// Second `patch` invocation
patch(vnode, newVnode) // Snabbdom efficiently updates the old view to the new state
```



HTML 中使用 snabbdom

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>snabbdom demo</title>
</head>

<body>
  <div id="container"></div>
  <button id="btn">change</button>

  <!-- 引入 snabbdom -->
  <script src="https://cdn.bootcdn.net/ajax/libs/snabbdom/0.7.4/snabbdom.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/snabbdom/0.7.4/snabbdom-class.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/snabbdom/0.7.4/snabbdom-props.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/snabbdom/0.7.4/snabbdom-style.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/snabbdom/0.7.4/snabbdom-eventlisteners.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/snabbdom/0.7.4/h.js"></script>

  <script src="./index.js"></script>
</body>

</html>
```

```js
const snabbdom = window.snabbdom

// 定义 patch
const patch = snabbdom.init([
  snabbdom_class,
  snabbdom_props,
  snabbdom_style,
  snabbdom_eventlisteners
])

// 定义 h
const h = snabbdom.h

const container = document.getElementById('container')

// 生成 vnode
let vnode = h('ul#list', {}, [
  h('li.item', {}, 'Item 1'),
  h('li.item', {}, 'Item 2')
])

patch(container, vnode)

document.getElementById('btn').addEventListener('click', () => {
  // 生成 newVnode
  const newVnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item B'),
    h('li.item', {}, 'Item 3')
  ])

  patch(vnode, newVnode)
  vnode = newVnode
})
```



snabbdom 重点总结

- h 函数
- vnode 数据结构
- patch 函数



vdom 总结

- 用 JS 模拟 DOM 结构（ vnode ）
- 新旧 vnode 对比，得出最小的更新范围，最后更新 DOM
- 数据驱动视图的模式下，有效控制 DOM 操作



**虚拟 DOM - diff 算法**

diff 算法

- vdom 中最核心、最关键的部分
- 在日常使用 Vue 、React 中有所体现（如 key ）
- 前端热门话题，面试“宠儿”



diff 算法概述

- diff 即对比，是一个广泛的概念，如 Linux diff 命令、git diff 等
- 两个 JS 对象也可以做 diff ，如 https://github.com/cujojs/jiff
- 两棵树做 diff ，如这里的 vdom diff

![](https://img.mukewang.com/szimg/5ea66104000181bb19201080.jpg)



树 diff 的时间复杂度 O(n^3)

1. 遍历 tree1
2. 遍历 tree2
3. 排序
4. 1000 个节点，要计算 10 亿次，算法不可用



优化时间复杂度到 O(n)

- 只比较同一层级，不跨级比较
- tag 不相同，则直接删掉重建，不再深度比较
- tag 和 key 两者相同，则认为是相同节点，不再深度比较

![](https://img.mukewang.com/szimg/5ea662920001860419201080.jpg)

![](https://img.mukewang.com/szimg/5ea662ef00012d9e19201080.jpg)



**深入 diff 算法源码**

生成 vnode

1. 打开 h.ts ，找到 h 函数，h 函数返回 vnode

   ```typescript
   export function h (sel: any, b?: any, c?: any): VNode {
   	// ...
     return vnode(sel, data, children, text, undefined)
   }
   ```

2. vnode 函数返回一个包含 sel 、data 、children 、text 等内容的对象

   ```typescript
   export function vnode (sel: string | undefined,
     data: any | undefined,
     children: Array<VNode | string> | undefined,
     text: string | undefined,
     elm: Element | Text | undefined): VNode {
     const key = data === undefined ? undefined : data.key
     return { sel, data, children, text, elm, key }
   }
   ```

3. 打开 init.ts ，找到 init 函数（程序入口），init 函数返回的是一个 patch 函数

   ```typescript
   export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
     // ...
     return function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
       // ...
     }
   }
   ```

4. patch 函数的入参有两个，一个是 vnode 或者 element ，另一个是 vnode

cbs 是回调函数集，cbs.pre 表示 pre hook ，即生命周期钩子。

snabbdom 的生命周期钩子见 https://github.com/snabbdom/snabbdom#hooks ，与 Vue 的生命周期钩子类似。



patch 函数

1. 第一个参数不是 vnode ，则创建一个空的 vnode ，并关联到这个 DOM 元素
2. 相同的 vnode ，即 key 和 sel 都相等（ sameVnode ），则执行 patchVnode （后续再讲）
3. 不同的 vnode ，直接删掉重建

```typescript
function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
  let i: number, elm: Node, parent: Node
  const insertedVnodeQueue: VNodeQueue = []
  // 执行 pre hook
  for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()

  // 第一个参数不是 vnode
  if (!isVnode(oldVnode)) {
    // 创建一个空的 vnode ，关联到这个 DOM 元素
    oldVnode = emptyNodeAt(oldVnode)
  }

  // 相同的 vnode （ key 和 sel 都相等）
  if (sameVnode(oldVnode, vnode)) {
    // vnode 对比
    patchVnode(oldVnode, vnode, insertedVnodeQueue)
  } else { // 不同的 vnode ，直接删掉重建
    elm = oldVnode.elm!
    parent = api.parentNode(elm) as Node

    createElm(vnode, insertedVnodeQueue)

    if (parent !== null) {
      api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
      removeVnodes(parent, [oldVnode], 0, 0)
    }
  }

  for (i = 0; i < insertedVnodeQueue.length; ++i) {
    insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i])
  }
  for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
  return vnode
}

function emptyNodeAt (elm: Element) {
  const id = elm.id ? '#' + elm.id : ''
  const c = elm.className ? '.' + elm.className.split(' ').join('.') : ''
  return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm)
}

function sameVnode (vnode1: VNode, vnode2: VNode): boolean {
  // key 和 sel 都相等
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}
```



patchVnode 函数

1. 设置 elm ，获取新旧 vnode
2. 如果新旧 vnode 相同，则直接返回
3. 如果新 text  为 undefined ，则进一步判断
   1. 如果新旧 children 都有，则执行 updateChildren 函数（后续再讲）
   2. 如果新 children 有，旧 children 无，则清空 text ，添加 children
   3. 如果旧 children 有，新 children 无，则移除 children
   4. 如果旧 text 有，则清空 text
4. 如果新 text 有 且新旧 text 不相等，移除旧 children ，设置新 text

```typescript
function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
  // 执行 prepatch hook
  const hook = vnode.data?.hook
  hook?.prepatch?.(oldVnode, vnode)

  // 设置 vnode elem
  const elm = vnode.elm = oldVnode.elm!
  // 旧 children
  const oldCh = oldVnode.children as VNode[]
  // 新 children
  const ch = vnode.children as VNode[]

  if (oldVnode === vnode) return
  // hook 相关，暂时不管
  if (vnode.data !== undefined) {
    for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
    vnode.data.hook?.update?.(oldVnode, vnode)
  }
  // vnode.text === undefined ，意味着 vnode.children 一般有值
  if (isUndef(vnode.text)) {
    // 新旧都有 children
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue)
    } else if (isDef(ch)) { // 新 children 有，旧 children 无
      // 清空 text
      if (isDef(oldVnode.text)) api.setTextContent(elm, '')
      // 添加 children
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    } else if (isDef(oldCh)) { // 旧 children 有，新 children 无
      // 移除 children
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) { // 旧 text 有
      // 清空 text
      api.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) { // vnode.text !== undefined ，意味着 vnode.children 无值，且新旧 vnode 的 text 不相等
    // 移除旧 children
    if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    }
    // 设置新 text
    api.setTextContent(elm, vnode.text!)
  }
  hook?.postpatch?.(oldVnode, vnode)
}
```



updateChildren 函数

```typescript
function updateChildren (parentElm: Node,
                          oldCh: VNode[],
                          newCh: VNode[],
                          insertedVnodeQueue: VNodeQueue) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx: KeyToIndexMap | undefined
  let idxInOld: number
  let elmToMove: VNode
  let before: any

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx] // Vnode might have been moved left
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) { // 开始和开始对比
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) { // 结束和结束对比
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // 开始和结束对比，Vnode moved right
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
      api.insertBefore(parentElm, oldStartVnode.elm!, api.nextSibling(oldEndVnode.elm!))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // 结束和开始对比，Vnode moved left
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
      api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else { // 以上四个都未命中
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      }
      // 拿新节点 key ，能否对应上 oldCh 中某个节点的 key
      idxInOld = oldKeyToIdx[newStartVnode.key as string]
      // 没对应上，则插入节点
      if (isUndef(idxInOld)) { // New element
        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!)
      } else { // 对应上了，拿到对应 key 的节点
        elmToMove = oldCh[idxInOld]
        // sel 是否相等（ 参考 sameVnode 的条件 ）
        if (elmToMove.sel !== newStartVnode.sel) { // 不相等，则插入节点
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!)
        } else { // sel 相等，key 相等
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
          oldCh[idxInOld] = undefined as any
          api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!)
        }
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
    if (oldStartIdx > oldEndIdx) {
      before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }
}
```

![](https://github.com/negrochn/study-imooc/blob/master/419/img/snabbdom-updateChildren.jpg?raw=true)



**虚拟 DOM - 考点总结和复习**

diff 算法总结

- patchVnode
- addVnodes 、removeVnodes
- updateChildren（ key 的重要性）



vdom 和 diff 总结

- 细节不重要，updateChildren 的过程也不重要，不要深究
- vdom 核心概念很重要：h 、vnode 、patch 、diff 、key 等
- vdom 存在的价值更加重要：数据驱动视图，控制 DOM 操作