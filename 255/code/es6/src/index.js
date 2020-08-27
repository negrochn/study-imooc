import StateMachine from 'javascript-state-machine'

// 初始化状态机
let fsm = new StateMachine({
  init: '未收藏',
  transitions: [
    {
      name: 'doStore',
      from: '未收藏',
      to: '已收藏'
    },
    {
      name: 'cancelStore',
      from: '已收藏',
      to: '未收藏'
    }
  ],
  methods: {
    // 监听执行收藏
    onDoStore() {
      console.log('收藏成功')
      updateText()
    },
    // 监听取消收藏
    onCancelStore() {
      console.log('取消收藏成功')
      updateText()
    }
  }
})

const $btn = $('#btn')

$btn.click(function() {
  if (fsm.is('未收藏')) {
    fsm.doStore()
  } else {
    fsm.cancelStore()
  }
})

// 更新按钮的文案
function updateText() {
  if (fsm.is('未收藏')) {
    $btn.text('收藏')
  } else {
    $btn.text('取消收藏')
  }
}

// 初始化文案
updateText()