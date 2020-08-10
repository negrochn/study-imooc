class Car {
  constructor(plateNumber, name) {
    this.plateNumber = plateNumber
    this.name = name
  }
}

class Kuaiche extends Car {
  constructor(plateNumber, name) {
    super(plateNumber, name)
    this.price = 1
  }
}

class Zhuanche extends Car {
  constructor(plateNumber, name) {
    super(plateNumber, name)
    this.price = 2
  }
}

class Trip {
  constructor(car) {
    this.car = car
  }
  start() {
    console.log(`行程开始，车牌号为${this.car.plateNumber}，名称为${this.car.name}。`)
  }
  end() {
    console.log(`行程结束，总价为${this.car.price * 5}`)
  }
}

const car = new Kuaiche('浙A·02954', '比亚迪-汉')
const trip = new Trip(car)
trip.start() // 行程开始，车牌号为浙A·02954，名称为比亚迪-汉。
trip.end() // 行程结束，总价为5
