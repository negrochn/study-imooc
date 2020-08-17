class Circle {
  draw() {
    console.log('画一个圆')
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle
  }
  draw() {
    this.circle.draw()
    this.setRedBorder(this.circle)
  }
  setRedBorder(circle) {
    console.log('设置红色边框')
  }
}

const c = new Circle()
const d = new Decorator(c)

d.draw()
