class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
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
  speak() {
    console.log(`My student id is ${this.studentId}.`)
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age)
    this.subject = subject
  }
  speak() {
    console.log(`I'am a ${this.subject} teacher.`)
  }
}

const s1 = new Student('negrochn', 18, '02954')
s1.speak() // My student id is 02954.
const t1 = new Teacher('lexiaodai', 17, 'english')
t1.speak() // I'am a english teacher.

