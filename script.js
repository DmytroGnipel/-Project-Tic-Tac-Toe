let Gameboard = {gameboard: []}

const displayGameboard = (() => {
const div = document.querySelector('div')
const table = document.createElement('table')
let counter = 0
for (let i = 0; i < 3; i++) {
const row = document.createElement('tr')
for (let k = 0; k < 3; k++) {
const cell = document.createElement('td')
cell.dataset.number = `${counter}`
cell.textContent = Gameboard.gameboard[counter]
row.appendChild(cell)
counter++
}
table.appendChild(row)
}
div.appendChild(table)
})()

const players = (mark, name) => {
const marker = (cell) => {
    Gameboard.gameboard[cell.dataset.number] = mark
    cell.textContent = mark
}

return {marker, mark, name}
}


function isWinner(player) {
    const board = Gameboard.gameboard
    const markOfPlayer = player.mark
  return (board[0] === markOfPlayer && board[1] === markOfPlayer && board[2] === markOfPlayer
    || board[3] === markOfPlayer && board[4] === markOfPlayer && board[5] === markOfPlayer
    || board[6] === markOfPlayer && board[7] === markOfPlayer && board[8] === markOfPlayer
    || board[0] === markOfPlayer && board[4] === markOfPlayer && board[8] === markOfPlayer
    || board[2] === markOfPlayer && board[4] === markOfPlayer && board[6] === markOfPlayer
    || board[0] === markOfPlayer && board[3] === markOfPlayer && board[6] === markOfPlayer
    || board[1] === markOfPlayer && board[4] === markOfPlayer && board[7] === markOfPlayer
    || board[2] === markOfPlayer && board[5] === markOfPlayer && board[8] === markOfPlayer
    )
}

function whoWinnerOrDraw() {
    const display = document.querySelector('p')  
    //finding the winner
    if (isWinner(firstPlayer)) display.textContent = `player ${firstPlayer.name} win!`
    else if (isWinner(secondPlayer)) display.textContent = `player ${secondPlayer.name} win!`
    //finding the draw
    else {
            for (let elem of Gameboard.gameboard) {//checking for absence of the undefined elements in the array-gameboard
            if (!elem) return      
    }
    if (Gameboard.gameboard.length === 9) //checking for proper length of the array-gameboard
    display.textContent = 'draw!'
    }
}

const mainflow = (() => {
const body = document.querySelector('body')
for (let i = 1; i < 3; i++) {
const input = document.createElement('input')
input.placeholder = `enter name of the player #${i}`
body.append(input)
}
const startRestartGame = document.querySelector('button')
startRestartGame.addEventListener('click', () => {
if (startRestartGame.textContent === 'restart') window.location.reload();
startRestartGame.textContent = 'restart'
const inputs = document.getElementsByTagName('input')
if (inputs[0].value && inputs[1].value) {
    window.firstPlayer = players('X', inputs[0].value)
    window.secondPlayer = players('0', inputs[1].value)
    inputs[1].remove()
    inputs[0].remove()
}
})
    let counter = 1
    const cells = document.getElementsByTagName('td')
    const display = document.querySelector('p')
    for (let elem of cells) {    
    elem.addEventListener('click', function func() {
        if (!display.textContent) {
    if (counter % 2 !== 0) firstPlayer.marker(elem)
    else secondPlayer.marker(elem)
    elem.removeEventListener('click', func)
    counter += 1
    whoWinnerOrDraw()
}
    }) 
}
})()













