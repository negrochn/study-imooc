class Math {
  // 装饰方法
  @log
  add(a, b) {
    return a + b
  }
}

function log(target, name, descriptor) {
  let oldValue = descriptor.value

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments)
    return oldValue.apply(this, arguments)
  }

  return descriptor
}

const math = new Math()
const result = math.add(1, 3) // 会打印日志
console.log(result)