function A() {
  setTimeout(() => {
    console.log('a');
  }, 1000)
}
function B() {
  console.log('b');
}

// A().then(() => {
//   B()
// })


async function fn() {
  // return new Promise((resolve) => {})
  await A()  // await 相当于.then
  await B()
  C()
}
fn()