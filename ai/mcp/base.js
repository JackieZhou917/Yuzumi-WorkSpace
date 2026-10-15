function A() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('A is ok')
    }, 1000)
  })
}

function B() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('B is ok')
    }, 2000)
  })
}

function C() {
  console.log('C is ok')
}

// Promise.race([A(), B()])
//   .then(res => {
//     console.log(res)
//     C()
//   })
//   .catch(err => {
//     console.log(err)
//   })

Promise.all([A(), B()])
  .then(res => {
    console.log(res)
    C()
  })