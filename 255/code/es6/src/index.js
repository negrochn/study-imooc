import StateMachine from 'javascript-state-machine'

// 状态机
let fsm = new StateMachine({
  init: 'pending',
  transitions: [
    {
      name: 'resolve',
      from: 'pending',
      to: 'fullfilled'
    },
    {
      name: 'reject',
      from: 'pending',
      to: 'rejected'
    }
  ],
  methods: {
    // 监听 resolve
    onResolve(state, data) {
      // state - 当前状态机实例
      // data - fsm.resolve() 传递的参数
      data.successList.forEach(fn => fn())
    },
    // 监听 reject
    onReject(state, data) {
      data.failList.forEach(fn => fn())
    }
  }
})

// 定义 Promise
class MyPromise {
  constructor(fn) {
    this.successList = []
    this.failList = []

    fn(() => { // resolve 函数
      fsm.resolve(this)
    }, () => { // reject 函数
      fsm.reject(this)
    })
  }
  then(successFn, failFn) {
    this.successList.push(successFn)
    this.failList.push(failFn)
  }
}

// 测试
function loadImg(src) {
  const mp = new MyPromise(function(resolve, reject) {
    let img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function(error) {
      reject(error)
    }
    img.src = src
  })
  return mp
}

let result = loadImg('/img/uml-state.jpg?raw=true')
result.then(function() {
  console.log('success')
}, function() {
  console.log('failed')
})