console.log(String({a: 1}));
// 1. ToString({a: 1})
// 2. ToPrimitive({a: 1}, String)
// 3. {a: 1}.toString()    //返回 "[object Object]"
// 5. ToString("[object Object]")
// 6. 返回 "[object Object]"



console.log(String([]));
// 1. ToString([])
// 2. ToPrimitive([], String)
// 3. [].toString() //返回 ""
// 4. ToString("")
// 5. 返回 ""

