# Vue 前端路由

**如何用 JS 实现 hash 路由**

前端路由原理

- 稍微复杂一点的 SPA ，都需要路由
- vue-router 也是 Vue 全家桶的标配之一
- 属于“和日常使用相关联的原理”，面试常考
- 回顾 vue-router 的路由模式：hash 和 H5 history



网页 url 组成部分

```js
// http:127.0.0.1:8000/01-hash.html?a=100&b=20#/aaa/bbb
location.protocol // 'http:'
location.hostname // '127.0.0.1'
location.host // '127.0.0.1:8000'
location.port // '8000'
location.pathname // '/01-hash.html'
location.search // '?a=100&b=20'
location.hash // '#/aaa/bbb'
```



hash 的特点

- hash 变化会触发页面跳转，即浏览器的前进、后退
- hash 变化不会刷新页面，SPA 必需的特点
- hash 变化永远不会提交到 server 端（前端自生自灭）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>hash</title>
</head>
<body>
  <p>hash test</p>
  <button id="btn">修改 hash</button>

  <script>
    // hash 变化，包括：
    // 1. JS 修改 url
    // 2. 手动修改 url 的 hash
    // 3. 浏览器前进、后退
    window.onhashchange = function(event) {
      console.log('old url: ', event.oldURL)
      console.log('new url: ', event.newURL)

      console.log('hash: ', location.hash)
    }

    // 页面初次加载，获取 hash
    window.addEventListener('DOMContentLoaded', () => {
      console.log('hash: ', location.hash)
    })

    // JS 修改 url
    document.getElementById('btn').addEventListener('click', () => {
      location.href = '#/user'
    })
  </script>
</body>
</html>
```



**如何用 JS 实现 H5 history 路由**

H5 history

- 用 url 规范的路由，但跳转时不刷新页面
- history.pushState
- window.onpopstate



正常页面浏览

- https://github.com/xxx 刷新页面
- https://github.com/xxx/yyy 刷新页面
- https://github.com/xxx/yyy/zzz 刷新页面



改造成 H5 history 模式

- https://github.com/xxx 刷新页面
- https://github.com/xxx/yyy 前端跳转，不刷新页面
- https://github.com/xxx/yyy/zzz 前端跳转，不刷新页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>H5 history</title>
</head>
<body>
  <p>H5 history</p>
  <button id="btn">修改 url</button>

  <script>
    // 页面初次加载，获取 pathname
    document.addEventListener('DOMContentLoaded', () => {
      console.log('load: ', location.pathname)
    })

    // 打开一个新的路由
    // 注意，用 pushState 方式，浏览器不会刷新页面
    document.getElementById('btn').addEventListener('click', () => {
      const state = { name: 'page1' }
      console.log('切换路由到', 'page1')
      history.pushState(state, '', 'page1')
    })

    // 监听浏览器前进、后退
    window.onpopstate = event => {
      console.log('onpopstate: ', event.state, location.pathname)
    }
  </script>
</body>
</html>
```



总结

- hash - window.onhashchange
- H5 history - history.pushState 和 window.onpopstate
- H5 history 需要后端支持



两者选择

- to B 的系统推荐用 hash ，简单易用，对 url 规范不敏感
- to C 的系统，可以考虑选择 H5 history ，但需要服务端支持
- 能选择简单的，就别用复杂的，需要考虑成本和收益