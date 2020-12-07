const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'Node.js从零开发Web Server博客项目 前端晋升全栈工程师必备',
      content: '前端开发人员必备技能Node.js提升课程。本课程以博客项目为主线，由浅入深讲解 Node.js 基础知识、框架和插件原理、web Server 的特点与必备模块；同时运用 Node.js 原生和常用框架 Express、Koa2框架三种方式开发web Server，在项目开发过程中全面掌握Node.js。掌握全栈工程师必备技能，为你带来开发和求职的双重收获！',
      createTime: '1607305440732',
      author: 'negrochn'
    },
    {
      id: 2,
      title: '从基础到实战 手把手带你掌握新版Webpack4.0',
      content: 'Webpack 目前无论在求职还是工作中，使用越来越普及。而想要学懂，学会Webpack更绝非易事。本课程完整讲清最新版本下的 Webpack 4 知识体系，通过 基础 + 实例 + 原理代码编写 + 复杂案例分析 完成Webpack4的分析与讲解。更重要的是让你对整个前端项目的构建有一个全局化的认识，实现能力思想双升级。',
      createTime: '1607305511915',
      author: 'lexiaodai'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: 'Node.js从零开发Web Server博客项目 前端晋升全栈工程师必备',
    content: '前端开发人员必备技能Node.js提升课程。本课程以博客项目为主线，由浅入深讲解 Node.js 基础知识、框架和插件原理、web Server 的特点与必备模块；同时运用 Node.js 原生和常用框架 Express、Koa2框架三种方式开发web Server，在项目开发过程中全面掌握Node.js。掌握全栈工程师必备技能，为你带来开发和求职的双重收获！',
    createTime: '1607305440732',
    author: 'negrochn'
  }
}

const addBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}