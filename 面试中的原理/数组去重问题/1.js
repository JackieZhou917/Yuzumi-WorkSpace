const arr = [1, 3, 4, 2, 3, 4]

function unique(arr) {
  const res = []
  arr.forEach((item) => {
    if(!res.includes(item))
      res.push(item)
  })
  return res
}

console.log(unique(arr))