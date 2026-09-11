const queue = []

queue.push('雪碧')
queue.push('可乐')
queue.push('冰红茶')

while(queue.length) {
  const cur = queue.shift()
  console.log(cur)
}
