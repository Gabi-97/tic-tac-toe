//store the gameboard as an array inside of an object
//players will be in an object 
//probably going to want as an object to control the flow of the game

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
      //alternate the players
    switchPlayer(currPlayer) {
        return currPlayer === "playerOne" ? "playerTwo" : "playerOne";
    },

    //get the input from players
    getPlayerInput() {
        const input = prompt("Enter row (1-3) and column (1-3) separated by a space");
        const [row, column] = input.split(' ').map(value => parseInt(value, 10));
        return { row, column };
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
                alert("Cell is already occupied. Chose another");
            }
        } else alert("Please enter the value between 1 and 3");
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
    },

    //main game loop
    playGame() { 
        DisplayContent.resetGameboard();
        currPlayer = "playerOne";
        
        while(!this.isGameBoardFull()) {
        
        //get the input from the current player
        const userInput = this.getPlayerInput();

        //fill the board based on players input
        this.playerMove(Players[currPlayer], userInput.row, userInput.column);
        
        //display winner or switch to the next player
        if(this.checkWinCondition()) {
            DisplayContent.renderGameboard();
            console.log(Players[currPlayer].name + " is the winner");
            //break out of the loop if there is a winner
            break;
        }
        else {
            //switch players
            currPlayer = this.switchPlayer(currPlayer);
            }
        } 
    }    
}

//variables for DOM manipulation
const mainContainer = document.querySelector('.gameboard-container');
const startGameBtn = document.querySelector('.start-game');
//display/DOM logic
const DisplayContent = {
    renderGameboard() {
        mainContainer.innerHTML = "";
        for(let i = 0; i < Gameboard.gameboard.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerHTML = Gameboard.gameboard[i];
            mainContainer.appendChild(cell);
        }
    },

    //clear the board
    resetGameboard() {
        Gameboard.gameboard = ["", "", "", "", "", "", "", "", ""];
    }
}
startGameBtn.addEventListener('click', GameFlow.playGame.bind(GameFlow));






