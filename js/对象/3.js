function Car(color) {
    // var this = {}
    this.name = 'su7'
    this.height = 1400
    this.lang = 4800
    this.weight = 1500
    // return this
    this.color = color
}

const zCar = new Car('pink')  // 实例对象
const qCar = new Car('blue')

qCar.name = '劳斯莱斯'

console.log(zCar);
console.log(qCar);