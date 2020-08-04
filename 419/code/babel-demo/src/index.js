const sum = (a, b) => a + b

Promise.resolve(100).then(data => data);

[10, 20, 30].includes(20)

// 语法，符合 ES5 语法规范
// 不处理模块化，模块化处理需要 webpack

// 污染全局环境
// window.Promise = function () { }
// Array.prototype.includes = function () { }

// 使用方
// window.Promise = 'abc'