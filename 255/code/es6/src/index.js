// 推荐使用 $.proxy 解决，这样就少定义一个变量
$('#div1').click(function() {
  setTimeout($.proxy(function() {
    // this 符合预期
    $(this).css('background-color', 'yellow')
  }, this), 1000)
})