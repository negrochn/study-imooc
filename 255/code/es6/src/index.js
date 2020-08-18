class RealImg {
  constructor(fileName) {
    this.fileName = fileName
    this.loadFromDisk() // 初始化即从硬盘加载，模拟
  }
  loadFromDisk() {
    console.log(this.fileName, 'loading...')
  }
  display() {
    console.log('display', this.fileName)
  }
}

class ProxyImg {
  constructor(fileName) {
    this.realImg = new RealImg(fileName)
  }
  display() {
    this.realImg.display()
  }
}

// 测试
let proxyImg = new ProxyImg('1.png')
proxyImg.display()