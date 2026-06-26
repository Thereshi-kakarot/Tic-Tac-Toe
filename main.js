
//Create a Game board object that has a game board array stored inside of it.
//Players are going to be stored as objects.
//An object is needed to control the flow of the game itself. And this is what this object does:
//1. Tracks game state - Is it active ? true : false
//2. Track current player - Is current player ? "x" : "0".
//3. Start/Restart game - Initializes the game when clicked.
//4. Switch players - Switch from "x" player to "0" player.
//5. Check for Win.
//6. Check for tie - Every cell is filled but no winner.
//7. End game - Stops the game when one of players win or when it is a tie.


const createGame = (function() {

    let gameBoard = ["", "", "", "", "", "", "", "", "",];
    let currentPlayer = "X";
    let gameOver = false;
    
    const winningConditions = [
        [0,1,2],[3,4,5],[6,7,8], //horizontals
        [0,3,6],[1,4,7],[2,6,8], //verticals
        [0,4,8],[2,4,6] //diagonals
    ];

    function checkWin(){

        for(let combo of winningConditions){
            if(gameBoard[combo[0]] === currentPlayer &&
            gameBoard[combo[1]] === currentPlayer &&
            gameBoard[combo[2]] === currentPlayer 
            ){
                return true;
            }
        }
        return false;
    }

    function checkDraw(){
        for(let cell of gameBoard){
            if(cell !== ""){
                return false;
            }
        }
        return true;
    }

    return {

        makeMove(position){
            if(gameBoard[position] !== ""){
                return false;
            }
        
            if(gameOver){
                return false;
            }

            gameBoard[position] = currentPlayer;

            if(checkWin()){
                winner = currentPlayer;
                gameOver = true;
                return true;
            }

            if(checkDraw()){
                winner = null;
                gameOver = true;
                return true;
            }

            currentPlayer = currentPlayer === "X"? "O" : "X";
        },

        getGameBoard(){
            return [...gameBoard];
        },
        getWinner(){
            return winner;
        },
        getDraw(){
            return checkDraw;
        },
        getPlayer(){
            return currentPlayer;
        },
        isGameOver(){
            return gameOver;
        },
        reset(){
        gameBoard = ["", "", "", "", "", "", "", "", "",];
        currentPlayer = "X";
        gameOver = false; 
        }
    }
})();

const game = createGame;
const currentPlayerDisplay = document.getElementById("current-player-display");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset-btn");
const gameResult = document.getElementById("game-result");

cells.forEach(cell => {
    cell.addEventListener("click", ()=> {
        const position = cell.dataset.position;
        const success = board[position];

        if(success){
            updateDisplay();
        } else{
            console.log(`${game.getPlayer} You are making an invalid move`);
        }
    });
});

function updateDisplay(){
    const board = game.getBoard();

    cells.forEach((cell, index)=> {
        cell.textContent = board[index];
    });

    if(game.isGameOver){
        const winner = game.getWinner();
        if(winner){
            gameResult.textContent = `${winner} Wins!`
        }else{
            gameResult.textContent = `Draw!`;
        }

        cells.forEach(cell => cell.disabled = true);

    }else{
        currentPlayerDisplay.textContent = `${game.getPlayer}'s turn`;
        gameResult.textContent = "";
    }
}

resetBtn.addEventListener("click", ()=> {
    game.reset();
    cells.forEach(cell => {
        gameResult.textContent = "";

        updateDisplay();
    });
});
updateDisplay();

