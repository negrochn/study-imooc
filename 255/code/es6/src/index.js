class Car {
  constructor(plateNumber) {
    this.plateNumber = plateNumber
  }
}

class Camera {
  // 车辆进入时，摄像头识别车牌号和时间
  shot(car) {
    return {
      plateNumber: car.plateNumber,
      inTime: Date.now()
    }
  }
}

class Screen {
  show(car, inTime) {
    return `车牌号：${car.plateNumber}，停留时长：${Math.floor((Date.now() - inTime) / 1000 / 60)}分钟`
  }
}

class Park {
  constructor(floors) {
    this.floors = floors || []
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {}
  }
  // 获取每层的空余车位数
  getEmptyNumber() {
    return this.floors.map(floor => floor.getEmptyPlaceNumber())
  }
  // 车辆进入停车场
  in(car) {
    if (!this.getEmptyNumber().reduce((prev, cur) => prev + cur, 0)) {
      console.log('停车场车位已满，非常抱歉！')
      return
    }
    // 摄像头记录车辆信息
    const info = this.camera.shot(car)
    const place = getRandomFloorPlace(this.floors)
    place.in()
    info.place = place
    this.carList[car.plateNumber] = info
  }
  out(car) {
    const plateNumber = car.plateNumber
    const info = this.carList[plateNumber]
    info.place.out()
    delete this.carList[plateNumber]
  }
}

class Floor {
  constructor(index, places) {
    this.index = index // 层号
    this.places = places
  }
  // 获取空余车位数
  getEmptyPlaceNumber() {
    return this.places.reduce((prev, cur) => {
      return prev + Number(cur.empty)
    }, 0)
  }
}

class Place {
  constructor(index) {
    this.index = index // 车位号
    this.empty = true
  }
  in() {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}

function getRandomFloorPlace(floors) {
  // 获取有空余车位的层
  const emptyFloors = floors.filter(floor => floor.getEmptyPlaceNumber())
  // 获取有空余车位的层中随机的层号
  const floorIdx = getRandomIndex(emptyFloors.length)
  const floor = emptyFloors[floorIdx]
  // 判断该层是否有空余车位，其实没有必要判断
  if (floor.getEmptyPlaceNumber()) {
    // 获取该层所有的车位
    const places = floor.places
    // 获取该层空余的车位
    const emptyPlaces = places.filter(place => place.empty)
    // 判断该层还有空余车位
    if (emptyPlaces.length) {
      const placeIdx = getRandomIndex(emptyPlaces.length)
      // 获取到随机的车位
      const place = emptyPlaces[placeIdx]
      return place
    }
  }
}

function getRandomIndex(length, exceptIdx) {
  const idx = Math.floor(Math.random() * length)
  if (idx !== exceptIdx) {
    return idx
  }
}


// 创建一个 3 层，每层 100 个车位的停车场
let floors = []
for (let i = 0; i < 3; i++) {
  let places = []
  for (let j = 0; j < 100; j++) {
    places.push(new Place(j + 1))
  }
  floors.push(new Floor(i + 1, places))
}

const park = new Park(floors)

for (let k = 0; k < 300; k++) {
  const car = new Car('浙A·' + ('00000' + (k + 1)).slice(-5))
  park.in(car)
}
console.log(park)

// 测试
const car1 = new Car('浙A·10001')
console.log(park.getEmptyNumber())
park.in(car1)
const car2 = new Car('浙A·10002')
console.log(park.getEmptyNumber())
park.in(car2)
const car3 = new Car('浙A·10003')
console.log(park.getEmptyNumber())
park.in(car3)

setTimeout(() => {
  park.out(car2)
  console.log(park.getEmptyNumber())
}, 62000)
setTimeout(() => {
  park.out(car3)
  console.log(park.getEmptyNumber())
}, 123000)
