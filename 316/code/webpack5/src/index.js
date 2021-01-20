import Icon from './Lynk&Co.jpg'
import style from './style.scss'
import printMe from './print.js'

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