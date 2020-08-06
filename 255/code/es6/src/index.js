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
