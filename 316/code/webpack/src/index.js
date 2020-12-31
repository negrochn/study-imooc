import style from './style.scss'

function component() {
  const elem = document.createElement('div')
  elem.innerHTML = ['Hello', 'webpack'].join(' ')
  elem.classList.add(style.hello)
  return elem
}

document.body.appendChild(component())