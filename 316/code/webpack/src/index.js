function component() {
  const elem = document.createElement('div')
  elem.innerHTML = ['Hello', 'webpack'].join(' ')
  return elem
}

document.body.appendChild(component())