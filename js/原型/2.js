
Car.prototype.name = 'su7'
Car.prototype.lang = 4800
Car.prototype.height = 1400

function Car(color) {
    // this = {}        // 1
    this.color = color  // 2
    // this.__proto__ = Car.prototype  // 3
    return this         // 4
}

const car = new Car('blue')

car.name = '蔚来'

console.log(car.__proto__)