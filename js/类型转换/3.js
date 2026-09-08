

console.log(Number({}))
// 1. ToNumber({})
// 2. ToPrimitive({}, Number)
// 3. toValueOf()  //还是 {}
// 4. toString()   //返回"[object Object]"
// 5. ToNumber("[object Object]")
// 6. 返回 NaN

console.log(Number([5]))  // 5
// 1. ToNumber([5])
// 2. ToPrimitive([5], Number)
// 3. [5].valueOf()  // 还是 [5]
// 4. [5].toString()  // 返回"5"
// 5. ToNumber("5")
// 6. 返回 5

console.log(Number([]))   // 0
// 1. ToNumber([])
// 2. ToPrimitive([], Number)
// 3. [].valueOf()  // 还是 []
// 4. [].toString()  // 返回""
// 5. ToNumber("")
// 6. 返回 0
