const callbacks = $.Callbacks() // 注意大小写
callbacks.add(function(info) {
  console.log('fn1', info)
})
callbacks.add(function(info) {
  console.log('fn2', info)
})
callbacks.add(function(info) {
  console.log('fn2', info)
})
callbacks.fire('gogogo')
callbacks.fire('fire')