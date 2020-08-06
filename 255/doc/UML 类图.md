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

![](https://github.com/negrochn/study-imooc/blob/master/255/img/uml-person.jpg?raw=true)



**关系**

- 泛化，表示继承
- 关联，表示引用

```js
class Person {
  constructor(name, age, school) {
    this.name = name
    this.age = age
    this.school = school
  }
  eat() {
    console.log(`${this.name} eat something.`)
  }
  speak() {
    console.log(`My name is ${this.name}, ${this.age} years old.`)
  }
}

// 子类继承父类
class Student extends Person {
  constructor(name, age, school) {
    super(name, age, school)
  }
  speak() {
    console.log(`I study in ${this.school}.`)
  }
}

class Teacher extends Person {
  constructor(name, age, school) {
    super(name, age, school)
  }
  speak() {
    console.log(`I teach English in ${this.school}.`)
  }
}
```

![](https://github.com/negrochn/study-imooc/blob/master/255/img/uml-person-school-student-teacher.jpg?raw=true)