// Symbol.iterator 并不是人人都知道
// 也不是每个人都需要封装一个 each 函数
// 因此就有了 for ... of 语法
function each(data) {
  for(let item of data) {
    console.log(item)
  }
}

each([1, 2, 3, 4, 5])
each($('a'))
each(document.querySelectorAll('a'))