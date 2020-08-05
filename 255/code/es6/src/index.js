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

// 创建实例
const p1 = new Person('negrochn', 18)
p1.eat() // negrochn eat something.
p1.speak() // My name is negrochn, 18 years old.

const p2 = new Person('lexiaodai', 17)
p2.eat()
p2.speak()
