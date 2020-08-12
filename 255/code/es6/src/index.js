class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    console.log('init')
  }
  fn1() {
    console.log('fn1')
  }
  fn2() {
    console.log('fn2')
  }
}

class Creator {
  create(name) {
    return new Product(name)
  }
}

let c = new Creator()
let p = c.create('iPhone')
p.init()
p.fn1()
