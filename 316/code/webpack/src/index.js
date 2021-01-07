import style from './style.scss'
import Icon from './Lynk&Co.jpg'

function component() {
  const elem = document.createElement('div')
  elem.innerHTML = ['Hello', 'webpack'].join(' ')
  elem.classList.add(style.hello)

  const myIcon = new Image()
  myIcon.src = Icon
  elem.appendChil(myIcon)

  return elem
}

document.body.appendChild(component())