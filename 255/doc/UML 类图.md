# UML 类图

**UML 类图**

- Unified Modeling Language 统一建模语言
- 类图，UML 包含很多种图，和本课相关的是类图
- 关系，主要讲解泛化和关联
- 演示，代码和类图结合



**画图工具**

- MS Office visio
- [processon](https://www.processon.com/)



**类图**

| 类名                                                         |
| :----------------------------------------------------------- |
| + public 属性名A: 类型<br /># protected 属性名B: 类型<br />- private 属性名C: 类型 |
| + public 方法名A(参数1, 参数2): 返回值类型<br /># protected 方法名B(参数1, 参数2): 返回值类型<br />- private 方法名C(参数1): 返回值类型 |

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  eat() {
    console.log(`${this.name} eat something.`)
  }
  speak() {
    console.log(`My name is ${this.name}, ${this.age} years old.`)
  }
}
```

![](http://assets.processon.com/chart_image/5f2c0935e0b34d4554b2162a.png)

