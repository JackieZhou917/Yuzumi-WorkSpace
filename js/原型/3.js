Person.prototype.say = function () {
    console.log('hello');
    
}

function Person() {
    this.name = '猪猪侠'
}

const p = new Person()  // p.__proto__ = Person.prototype
console.log(p);
p.say()
