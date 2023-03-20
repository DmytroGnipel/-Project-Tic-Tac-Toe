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
return {marker, name, mark}
}

let firstPlayer = players('X', 'Dima')
let secondPlayer = players('0', 'Vita')

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
    //finding the winner
    if (isWinner(firstPlayer)) console.log('first player win')
    else if (isWinner(secondPlayer)) console.log('second player win')
    //finding the draw
    else {
            for (let elem of Gameboard.gameboard) {//checking for absence of the undefined elements in the array-gameboard
            if (!elem) return      
    }
    if (Gameboard.gameboard.length === 9) //checking for proper length of the array-gameboard
    console.log('draw')
    }
}

const mainFlow = (() => {
    let counter = 1
    const cells = document.getElementsByTagName('td')
    for (let elem of cells) {
    elem.addEventListener('click', function func() {
    if (counter % 2 !== 0) firstPlayer.marker(elem)
    else secondPlayer.marker(elem)
    elem.removeEventListener('click', func)
    counter += 1
    console.log(Gameboard.gameboard)
    whoWinnerOrDraw()
    })
    }
    })()









