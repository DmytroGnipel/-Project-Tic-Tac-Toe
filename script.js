const Gameboard = {gameboard: []}

const displayGameboard = (() => {//fuction for adding on the webpage gameboard in form of table
const div = document.querySelector('div')
const table = document.createElement('table')
let counter = 0
    for (let i = 0; i < 3; i++) {
    const row = document.createElement('tr')
        for (let k = 0; k < 3; k++) {
        const cell = document.createElement('td')
        cell.dataset.number = `${counter}`
        row.appendChild(cell)
        counter++
        }
    table.appendChild(row)
    }
div.appendChild(table)
})()

const players = (mark, name) => {//constructor for players
    const marker = (cell) => {
        Gameboard.gameboard[cell.dataset.number] = mark
        cell.textContent = mark
    }
return {marker, mark, name}
}

function isWinner(player) {//checking each player for the win
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

function whoWinnerOrDraw() {//checking the game for the winner or draw and display the result of the game
    const display = document.querySelector('p')  
    //finding the winner
    if (isWinner(firstPlayer)) display.textContent = `player ${firstPlayer.name} had won. Congrats!`
    else if (isWinner(secondPlayer)) display.textContent = `player ${secondPlayer.name} had won. Congrats!`
    //finding the draw
    else {
            for (let elem of Gameboard.gameboard) {//checking for absence of the undefined elements in the array-gameboard
            if (!elem) return//elems of Gameboard must not be undefined      
            }
            if (Gameboard.gameboard.length === 9) display.textContent = 'draw!' //Gameboard must be filled
            
    }
}

const mainFlow = (() => {

const body = document.querySelector('body')//append two inputs for the players names
for (let i = 1; i < 3; i++) {
const input = document.createElement('input')
input.placeholder = `enter name of the player #${i}`
body.append(input)
}

const startRestartGame = document.querySelector('button')// button for launching the game
startRestartGame.addEventListener('click', () => {
    if (startRestartGame.textContent === 'restart') window.location.reload() // restart or reload game
    const inputs = document.getElementsByTagName('input')
    if (inputs[0].value && inputs[1].value) {//game can start if players input their names
    startRestartGame.textContent = 'restart'
    window.firstPlayer = players('X', inputs[0].value) //creating players
    window.secondPlayer = players('0', inputs[1].value)
    inputs[1].remove()//after creating playres imputs remove
    inputs[0].remove()
    }
    else alert('for begining game names of players must be added')
})
    //let counter = 1 //for alternating moves of the players (even or odd)
    const cells = document.getElementsByTagName('td')
    const display = document.querySelector('p')
    for (let elem of cells) {    
        elem.addEventListener('click', function func() {
            if (!display.textContent) {//code for marking table works only if the winner have not determined yet 
                firstPlayer.marker(elem)
                computerChoise(cells)
        elem.removeEventListener('click', func)//avoding double marking
        whoWinnerOrDraw()//checking for winner or draw
        console.log(Gameboard.gameboard)
            }
        }) 
    }
})()

const computerChoise = (cells) => {
    let isThereEmpty = false
    for (elem of cells) {
        if (!elem.textContent) isThereEmpty = true
    }
    console.log(isThereEmpty)
    if (isThereEmpty) {
const randomFrom0To8 = Math.floor(Math.random() * 9)
console.log(randomFrom0To8)
if (!cells[randomFrom0To8].textContent) {
    cells[randomFrom0To8].textContent = '0'
    Gameboard.gameboard[randomFrom0To8] = '0'
    console.log(Gameboard.gameboard)
}
else computerChoise (cells)
}
}


/*
const choiseModeGame = () => {
    const buttons = document.getElementsByTagName('button')
    for (const elem of buttons) {
        elem.addEventListener('click', () => {
            if (elem.textContent === 'player 1 vs player 2')
            console.log('arise inputs for entering players name and button "start"')
            else if (elem.textContent === 'player vs cpu') {
                document.create
            }
        })
    }
}

*/















