const { classModule } = snabbdom_class
const { propsModule } = snabbdom_props
const { styleModule } = snabbdom_style
const { eventListenersModule } = snabbdom_eventlisteners

// 定义 patch
const patch = snabbdom.init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])

// 定义 h
const h = snabbdom.h

const container = document.getElementById('container')

// 生成 vnode
let vnode = h('div#container.two.classes', { on: { click: someFn } }, [
  h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
  ' and this is just normal text',
  h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
])

patch(container, vnode)

document.getElementById('btn').addEventListener('click', () => {
  // 生成 newVnode
  const newVnode = h('div#container.two.classes', { on: { click: anotherEventHandler } }, [
    h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
    ' and this is still just normal text',
    h('a', { props: { href: '/bar' } }, 'I\'ll take you places!')
  ])

  patch(vnode, newVnode)
  vnode = newVnode
})

function someFn() {
  console.log('some fn')
}

function anotherEventHandler() {
  console.log('another')
}
