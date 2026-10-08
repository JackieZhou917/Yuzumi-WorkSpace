const arr = [
  {name: '张三', age: 18, like: {n: 'running'}},
  {name: '李四', age: 19, like: {n: 'running'}},
  {name: '张三', age: 18, like: {n: 'running'}},
  {name: '王五', age: 20}
]

// const res = [...new Set(arr)]
function unique(arr) {
  const res = []
  for(let i = 0; i < arr.length; i++) {
    let has = false
    for (let j = 0; j < res.length; j++){
      if(isEqual(arr[i], res[j])){
        has = true
        break
      }
    }
    if(!has){ 
      res.push(arr[i])
    }
  }
  return res
}

function isEqual(a, b) {
  if((typeof a === 'object' && a !== null) && (typeof b === 'object' && b !== null)) {
    if(Object.keys(a).length !== Object.keys(b).length) {   // 对象的键值对的个数不等
      return false
    }
    for(let key in a) {
      if(key in b) {
        if(!isEqual(a[key], b[key])) {
          return false
        }
      }else {
        return false
      }
    }
    return true
  }else {
    return a === b
  }
}

console.log(unique(arr))
