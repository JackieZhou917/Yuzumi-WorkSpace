class SingleDog {
  show() {
    console.log('i am a 单例对象')
  }
  static getInstance() {
    if(!this.instance) {
      this.instance = new SingleDog()
    }
    return this.instance
  }
}
const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()
console.log(s1 === s2)
