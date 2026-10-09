// function Person() {
//   this.name = 'zjj',
//   age = 18
// }
// Person.prototype.say = function () {
//   return 'hello'
// }
// Person.sports = function () {
//   return 'play sports'
// }

// let p = new Person()

// console.log(p.say())
// console.log(p.sports())

class Person {
  // eat = 'apple'   // 等同于在构造器中 this.eat = 'apple'
  static eat = 'apple'  // 静态属性，不能被实例访问，但是可以被类访问。
  #sex = 'boy'   // 私有属性，不能被实例访问，且只能在类里面生效

   constructor() {
    this.name = '小明'
    this.age = 18
  }

  get say() {
    return 'hello'
  }

  static sports() {
    return 'play sports'
  }
}

let p = new Person('boy')
console.log(p)
console.log(Person.sports())
