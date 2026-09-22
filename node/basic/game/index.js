import {game} from './lib.js'

let count = 0
process.stdin.on('data', (e) => {  // 监听进程的写入
    const playAction = e.toString().trim()
    const res = game(playAction)
    if (res == 1) {
        count++
    } else {
        count = 0
    }
    if (count >= 3) {
        console.log('你作弊')
        process.exit()
    }
})