class jQuery {
  constructor(selector) {
    const slice = Array.prototype.slice
    let dom = slice.call(document.querySelectorAll(selector))
    const len = dom ? dom.length : 0
    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append(node) {
    // ...
  }
  addClass(className) {
    // ...
  }
  html(data) {
    // ...
  }
  // 此处省略若干 API
}

window.$ = function(selector) {
  return new jQuery(selector)
}

const ps = $('p')
console.log(ps)
console.log(ps.addClass)
