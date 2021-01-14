// import _ from 'lodash'

// console.log(_.join(['webpack', 'Code Splitting'], ' '))

function component() {
  return import('lodash').then(({ default: _ }) => {
    const elem = document.createElement('div')
    elem.innerHTML = _.join(['lodash', 'join'], ',')
    return elem
  })
}

component().then(elem => {
  document.body.appendChild(elem)
})