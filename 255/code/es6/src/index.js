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

// 子类继承父类
class Student extends Person {
  constructor(name, age, studentId) {
    super(name, age)
    this.studentId = studentId
  }
  study() {
    console.log(`${this.name} is studying.`)
  }
}

const s1 = new Student('negrochn', 18, '02954')
s1.study() // negrochn is studying.
console.log(s1.studentId) // 02954
s1.eat() // negrochn eat something.
s1.speak() // My name is negrochn, 18 years old.
