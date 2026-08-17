Grand.prototype.house = function() {
    console.log('汤臣一品');
    
}

function Grand() {
    this.card = 10000000000
}
Father.prototype = new Grand()
function Father() {
    this.lastName = '张'
}
Child.prototype = new Father()

function Child() {
    this.age = 18
}

const p = new Child()  // p.__proto__ = Child.prototype.__proto__ = Object.prototype.__proto__ = null
p.house()
