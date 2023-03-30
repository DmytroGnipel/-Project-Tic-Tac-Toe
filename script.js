const Gameboard = {gameboard: []}

const displayGameboard = (() => {//function for adding on the webpage gameboard in form of table
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
    function whoWinnerOrDraw() {//checking the game for the winner or draw and display the result of the game
        function isWinner(player) {//checking each player for the win, return true or false
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
    const display = document.querySelector('p')
    const marker = (cell) => {
        if (!display.textContent) {//code for marking table works only if the winner have not determined yet 
        Gameboard.gameboard[cell.dataset.number] = mark
        cell.textContent = mark
        whoWinnerOrDraw()//checking for winner or draw
        }
    }
    const computerChoise = (cells) => {
        if (!display.textContent) {//code for marking table works only if the winner have not determined yet
        let isThereEmpty = false
        for (elem of cells) {
            if (!elem.textContent) isThereEmpty = true
        }
        if (isThereEmpty) {
    const randomFrom0To8 = Math.floor(Math.random() * 9)
    if (!cells[randomFrom0To8].textContent) {
        cells[randomFrom0To8].textContent = mark
        Gameboard.gameboard[randomFrom0To8] = mark
        whoWinnerOrDraw()//checking for winner or draw
    }
    else computerChoise (cells)
    }   
    }
    }

return {marker, mark, name, computerChoise}
}

const choiseModeGame = () => {
    const buttons = document.getElementsByTagName('button')
    const body = document.querySelector('body')
    const cells = document.getElementsByTagName('td')
    const remover = (array) => {
for (const elem of array) elem.remove()
    }
    for (const elem of buttons) {
        elem.addEventListener('click', () => {

            const twoPlayers = () => {
                let counter = 1 //for alternating moves of the players (even or odd)
                const display = document.querySelector('p')
                for (let elem of cells) {    
                    elem.addEventListener('click', function func() {
                        
                            if (counter % 2 !== 0) firstPlayer.marker(elem)
                            else secondPlayer.marker(elem)
                            counter++
                    elem.removeEventListener('click', func)//avoding double marking
                    
                    }) 
                }
            }

            //while button 'player 1 vs player 2' pressed
            if (elem.textContent === 'player 1 vs player 2') {
                
                for (let i = 1; i < 3; i++) {
                    const input = document.createElement('input')
                    input.placeholder = `enter name of the player #${i}`
                    body.append(input)
                    }
                const buttonStartRestart = document.createElement('button')
                buttonStartRestart.textContent = 'start'
                body.append(buttonStartRestart)
                remover([buttons[1], buttons[0]])
                buttonStartRestart.addEventListener('click', () => {
                    if (buttonStartRestart.textContent === 'restart') window.location.reload() // restart or reload game
                        const inputs = document.getElementsByTagName('input')
                    if (inputs[0].value && inputs[1].value) {//game can start if players input their names
                        buttonStartRestart.textContent = 'restart'
                        window.firstPlayer = players('X', inputs[0].value) //creating players
                        window.secondPlayer = players('0', inputs[1].value)
                        remover([inputs[1], inputs[0]])
                        
                        }
                        else alert('for begining game names of players must be added')
                    })
                twoPlayers()
            }
            //while button 'player vs cpu' pressed
            else if (elem.textContent === 'player vs cpu') {
                const inputForName = document.createElement('input')
                inputForName.placeholder = 'input your name'
                const divForWeapons = document.createElement('div')
                const buttonsWeaponX = document.createElement('button')
                buttonsWeaponX.textContent = 'My mark is X'
                buttonsWeaponX.id = 'smallbutton'
                const buttonsWeapon0 = document.createElement('button')
                buttonsWeapon0.textContent = 'My mark is 0'
                buttonsWeapon0.id = 'smallbutton'
                const buttonStartRestart = document.createElement('button')
                buttonStartRestart.textContent = 'start'
                divForWeapons.append(buttonsWeaponX, buttonsWeapon0)
                body.append(inputForName, divForWeapons, buttonStartRestart)
                remover([buttons[1], buttons[0]])
                //when button with 'X' pressed
                buttonsWeaponX.addEventListener('click', () => {
                    if (inputForName.value) {
                    window.firstPlayer = players('X', inputForName.value)
                    window.secondPlayer = players('0', 'comp')
                    buttonsWeaponX.textContent = `got it, ${firstPlayer.name}. Press start`
                buttonStartRestart.addEventListener('click', () => {
                    if (buttonStartRestart.textContent === 'restart') window.location.reload()
                    buttonStartRestart.textContent = 'restart'
                remover([buttonsWeaponX, buttonsWeapon0, inputForName])                  
                for (const elem of cells) {
                    elem.addEventListener('click', function func() {
                    firstPlayer.marker(elem)
                    secondPlayer.computerChoise(cells)
                    elem.removeEventListener('click', func)
                    })
                }          
                })
                    }
                })
                //when button with '0' is pressed
                buttonsWeapon0.addEventListener('click', () => {
                    if (inputForName.value){
                        window.firstPlayer = players('X', 'comp')
                        window.secondPlayer = players('0', inputForName.value)
                        buttonsWeapon0.textContent = `got it, ${secondPlayer.name}. Press start`
                buttonStartRestart.addEventListener('click', () => {
                    if (buttonStartRestart.textContent === 'restart') window.location.reload()
                    buttonStartRestart.textContent = 'restart'
                    remover([buttonsWeaponX, buttonsWeapon0, inputForName])             
                    firstPlayer.computerChoise(cells)
                    for (const elem of cells) {
                    elem.addEventListener('click', function func() {
                    secondPlayer.marker(elem)
                    firstPlayer.computerChoise(cells)
                    elem.removeEventListener('click', func)
                })
                    }
                })
                }
                })
            }
        })
    }
}

choiseModeGame()















