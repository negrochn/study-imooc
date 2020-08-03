import './style/style1.css'
import './style/style2.less'

import { sum } from './math'

const sumRes = sum(10, 40)
console.log('sumRes', sumRes)

if (module.hot) {
  module.hot.accept(['./math'], () => {
    const sumRes = sum(10, 40)
    console.log('sumRes in hot', sumRes)
  })
}
