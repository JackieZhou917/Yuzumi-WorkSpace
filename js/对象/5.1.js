// 原型:
// 所有的 函数 都天生拥有一个属性 叫 prototype
// 对象 天生拥有一个属性 叫__proto__
function Car(color) {
    // var this = {}
    this.name = 'su7'
    this.height = 1400
    this.lang = 4800
    this.weight = 1500
    // this.__proto__ = Car.prototype
    // return this
    this.color = color
}