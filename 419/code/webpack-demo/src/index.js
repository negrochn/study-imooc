import './style/style1.css'
import './style/style2.less'

import moment from 'moment'
import 'moment/locale/zh-cn' // 手动引入中文语言包
moment.locale('zh-cn')
console.log('locale', moment.locale())
console.log('date', moment().format('ll'))
