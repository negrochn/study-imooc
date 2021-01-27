import _ from 'lodash'
import $ from 'jquery'
import { ui } from './jquery.ui.js'

ui()

const elem = $('<div>')
elem.html(_.join(['webpack', 'caching'], ' '))
$('body').append(elem)

// import Icon from './Lynk&Co.jpg'
// import './style.scss'
// import printMe from './print.js'
// import { add } from './math.js'
// import _ from 'lodash'

// function component() {
//   const elem = document.createElement('div')
//   elem.innerHTML = ['Hello', 'webpack'].join(' ')
//   elem.classList.add('hello')

//   const myIcon = new Image()
//   myIcon.src = Icon
//   elem.appendChild(myIcon)

//   return elem
// }

// document.body.appendChild(component())

// if (module.hot) {
//   module.hot.accept('./print.js', () => {
//     console.log('Accepting the updated printMe module!')
//     printMe()
//   })
// }

// ['babel-loader', '@babel/core', '@babel/preset-env'].map(item => `npm i ${item} -D`)
// Promise.resolve('@babel/polyfill').then(data => data)

// console.log(add(1, 2))

// console.log(_.join(['Code', 'Splitting'], ' '))

// function component() {
//   return import(/* webpackPrefetch: true */'lodash').then(({ default: _ }) => {
//     const elem = document.createElement('div')
//     elem.innerHTML = _.join(['lodash', 'join'], ',')
//     return elem
//   })
// }

// document.addEventListener('click', () => {
//   component().then(elem => {
//     document.body.appendChild(elem)
//   })
// })