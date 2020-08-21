class Iterator {
  constructor(container) {
    this.list = container.list
    this.index = 0
  }
  next() {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }
  hasNext() {
    if (this.index >= this.list.length) {
      return false
    }
    return true
  }
}

class Container {
  constructor(list) {
    this.list = list
  }
  // 生成遍历器
  getIterator() {
    return new Iterator(this)
  }
}

const arr = [1, 2, 3, 4, 5]
const c = new Container(arr)
const i = c.getIterator()
while (i.hasNext()) {
  console.log(i.next())
}