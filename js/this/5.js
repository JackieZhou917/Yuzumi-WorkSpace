function Person() {
    // var obj = {}       // no.1
    // Person.call(obj)   // no.2 让函数的 this 指向obj
    this.name = 'GGBond'  // no.3   obj.name = 'GGBond'
    // obj.__proto__ = Person.prototype   // no.4
    // return obj
}
const p = new Person()
console.log();
