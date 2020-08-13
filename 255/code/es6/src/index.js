class Adaptee {
  specificRequest() {
    return '德标插头'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee()
  }
  request() {
    const info = this.adaptee.specificRequest()
    return `${info} - 转换器 - 国标插头`
  }
}

// 测试
const target = new Target()
console.log(target.request())
