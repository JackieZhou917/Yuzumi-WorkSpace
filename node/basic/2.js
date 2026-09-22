// 石头剪刀布
const playerAction = process.argv[process.argv.length - 1]

const arr = ['rock', 'sicssor', 'paper']
const index = Math.floor(Math.random() * 3)
const computerAction = arr[index]

if(playerAction == computerAction){
    console.log('平局')
}else if((playerAction == 'rock' && computerAction == 'sicssor') ||
    (playerAction == 'sicssor' && computerAction == 'paper') ||
    (playerAction == 'paper' && computerAction == 'rock')){
    console.log('玩家赢')
}else{
    console.log('电脑赢')
}

