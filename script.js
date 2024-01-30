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
        name: "Player 1",
        symbol: "X",
        score: 0
    },
    playerTwo: {
        name: "Player 2",
        symbol: "O",
        score: 0
    },
    addScore(player)   {
        Players[player].score++;
    },
}

//the logic of the game
const GameFlow = {
    //display the board 
    displayGameBoard() {
        console.log(Gameboard.gameboard);
    },
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
            } else {
                alert("Cell is already occupied. Chose another");
            }
        } else alert("Please enter the value between 1 and 3");
    },
    //main game loop
    playGame() { 
        currPlayer = "playerOne";

        for(let i = 0; i <= 9; i++) {
            //display the gameboard
            this.displayGameBoard();

            //get the input from the current player
            const userInput = this.getPlayerInput();

            //fill the board based on players input
            this.playerMove(Players[currPlayer], userInput.row, userInput.column);

            //switch players
            currPlayer = this.switchPlayer(currPlayer);
    }
}    
}
GameFlow.playGame();




