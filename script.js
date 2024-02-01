//variables for DOM manipulation
const mainContainer = document.querySelector('.gameboard-container');
const resetGameBtn = document.querySelector('.reset-game');
const messagePara = document.querySelector('.message');
const turnPara = document.querySelector('.turn');


//storing the gameboard in a module pattern
const Gameboard = (function() {
    return { gameboard: ["", "", "",
                         "", "", "",
                         "", "", ""]
    };
})();


//objects for the players 
const Players =  {
    playerOne: {
        name: "Player X",
        symbol: "X",
        score: 0
    },

    playerTwo: {
        name: "Player O",
        symbol: "O",
        score: 0
    },

    addScore(player)   {
        Players[player].score++;
    },
}

//the logic of the game
const GameFlow = {
    currPlayer: "playerOne",
      //alternate the players
    switchPlayer(currPlayer) {
        return currPlayer === "playerOne" ? "playerTwo" : "playerOne";
        
    },

    //function for the players move
    playerMove(player, row, column) {
        //check if the chosen cell is valid
        if(row >= 1 && row <= 3 && column >= 1 && column <= 3) {
            //check if the chosen cell is empty
            if(Gameboard.gameboard[(row - 1) * 3 + (column - 1)] === "") {
                //update the gameboard
                Gameboard.gameboard[(row - 1) * 3 + (column - 1)] = player.symbol;
                DisplayContent.renderGameboard();
            } else {
                DisplayContent.warningMessage();
                this.currPlayer = this.switchPlayer(this.currPlayer);
                                
            }
        } 
    },

    //main game loop
    playGame() {                 
        const row = DisplayContent.clickedRowIndex;
        const column = DisplayContent.clickedColumnIndex;

        //clear warning paragraph
        messagePara.innerHTML = "";
        
        //fill the board based on players input
        if(!this.isGameBoardFull() && !this.checkWinCondition()) {
             this.playerMove(Players[this.currPlayer], row, column);
        }   
        
        //display winner or switch to the next player
        if (this.checkWinCondition()) {
            console.log(Players[this.currPlayer].name + " is the winner!");
            DisplayContent.declareWinner(this.currPlayer);
        } else if (!this.isGameBoardFull()) {
            this.currPlayer = this.switchPlayer(this.currPlayer);
        }
    },
    
    isGameBoardFull() {
        return Gameboard.gameboard.every(cell => cell !== "");
    },

    checkWinCondition() {
        //check rows 
        for(let i = 0; i < 3; i++) {
            if ( 
                Gameboard.gameboard[i * 3] === Gameboard.gameboard[i * 3 + 1] &&
                Gameboard.gameboard[i * 3] === Gameboard.gameboard[i * 3 + 2] &&
                Gameboard.gameboard[i * 3] !== ""
            ) {
                return true;
            }
        }
        //check columns
        for(let i = 0; i < 3; i++) {
            if (
                Gameboard.gameboard[i] === Gameboard.gameboard[i + 3] &&
                Gameboard.gameboard[i] === Gameboard.gameboard[i + 6] &&
                Gameboard.gameboard[i] !== ""
            ) {
                return true;
            }
        }
        //check diagonal
        if(
            (Gameboard.gameboard[0] === Gameboard.gameboard[4] &&
             Gameboard.gameboard[0] === Gameboard.gameboard[8] &&
             Gameboard.gameboard[0] !== "") ||
            (Gameboard.gameboard[2] === Gameboard.gameboard[4] &&
             Gameboard.gameboard[2] === Gameboard.gameboard[6] &&
             Gameboard.gameboard[2] !== "")
        ) {
            return true;
        }
        return false;
    }
}

//display/DOM logic
const DisplayContent = {
    clickedRowIndex: null,
    clickedColumnIndex: null,
    renderGameboard() {
        mainContainer.innerHTML = "";
        for(let i = 0; i < Gameboard.gameboard.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerHTML = Gameboard.gameboard[i];
            cell.dataset.index = i;
            mainContainer.appendChild(cell);
        }  
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                this.clickedRowIndex = Math.floor(cell.dataset.index / 3) + 1;
                this.clickedColumnIndex = (cell.dataset.index % 3 ) + 1;
                console.log('hi');
                GameFlow.playGame();
                this.showPlayerTurn();
            })
        });

        resetGameBtn.addEventListener('click', () => {
            this.resetGameboard();
            this.renderGameboard();
        })
    },

    resetGameboard() {
        Gameboard.gameboard = ["", "", "", "", "", "", "", "", ""];
        messagePara.textContent = "";
    },

    warningMessage() {
        messagePara.innerHTML = "Cell is already occupied. Chose another!";
        messagePara.classList.add('warning');
    },

    declareWinner(currPlayer) {
        messagePara.textContent = Players[currPlayer].name + " is the winner";
        messagePara.classList.remove('warning');
        messagePara.classList.add('winner');
    },

    showPlayerTurn() {
        turnPara.innerHTML = Players[GameFlow.currPlayer].name + "'s turn";
    }    
}
DisplayContent.showPlayerTurn();
DisplayContent.renderGameboard();








