const arr = [1, 2, 3, 4, 5]
const nodeList = document.getElementsByTagName('a')
const $a = $('a')

function each(data) {
  const $data = $(data)
  $data.each((key, val) => {
    console.log(key, val)
  })
}

each(arr)
each(nodeList)
each($a)