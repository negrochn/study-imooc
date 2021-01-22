import Icon from './Lynk&Co.jpg'
import style from './style.scss'
import printMe from './print.js'
import { add } from './math.js'

function component() {
  const elem = document.createElement('div')
  elem.innerHTML = ['Hello', 'webpack'].join(' ')
  elem.classList.add(style.hello)

  const myIcon = new Image()
  myIcon.src = Icon
  elem.appendChild(myIcon)

  return elem
}

document.body.appendChild(component())

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('Accepting the updated printMe module!')
    printMe()
  })
}

['babel-loader', '@babel/core', '@babel/preset-env'].map(item => `npm i ${item} -D`)
Promise.resolve('@babel/polyfill').then(data => data)

console.log(add(1, 2))