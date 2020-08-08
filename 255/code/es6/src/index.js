function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = src
  })
}

const url = 'https://img.mukewang.com/szimg/5bc16811000192b219201080.jpg'
const result = loadImg(url)

result.then(img => {
  console.log(img.width)
  return img
}).then(img => {
  console.log(img.height)
  return img
}).catch(err => {
  console.error(err)
})
