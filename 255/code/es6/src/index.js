// 状态（红灯、绿灯、黄灯）
class State {
  constructor(color) {
    this.color = color
  }
  handle(context) {
    console.log(`turn to ${this.color} light`)
    context.setState(this)
  }
}

// 主体
class Context {
  constructor() {
    this.state = null
  }
  // 获取状态
  getState() {
    return this.state
  }
  // 设置状态
  setState(state) {
    this.state = state
  }
}

// 测试
let c = new Context()
let g = new State('green')
let r = new State('red')
let y = new State('yellow')

g.handle(c)
console.log(c.getState())
r.handle(c)
console.log(c.getState())
y.handle(c)
console.log(c.getState())