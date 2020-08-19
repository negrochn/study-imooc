// 明星
let star = {
  name: 'negrochn',
  age: 18,
  phone: '13305720001'
}

// 经纪人
let agent = new Proxy(star, {
  get: function(target, key) {
    if (key === 'phone') {
      // 返回经纪人自己的手机号
      return '18868870001'
    }
    if (key === 'price') {
      // 明星不报价，经纪人报价
      return 120000
    }
    return target[key]
  },
  set: function(target, key, val) {
    if (key === 'customPrice') {
      if (val < 100000) {
        // 最低 10 万
        throw new Error('价格太低')
      } else {
        target[key] = val
        return true
      }
    }
  }
})

console.log(agent.name)
console.log(agent.phone)
console.log(agent.price)
agent.customPrice = 90000
console.log(agent.price)