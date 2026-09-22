export function game(playerAction) {
    const arr = ['rock', 'sicssor', 'paper']
    const index = Math.floor(Math.random() * 3)
    const computerAction = arr[index]

    console.log(`我出了${computerAction}, 你出了${playerAction}`);

    if (playerAction == computerAction) {
        console.log('平局')
        return 0
    } else if ((playerAction == 'rock' && computerAction == 'sicssor') ||
        (playerAction == 'sicssor' && computerAction == 'paper') ||
        (playerAction == 'paper' && computerAction == 'rock')) {
        console.log('玩家赢')
        return 1
    } else {
        console.log('电脑赢')
        return -1
    }
}