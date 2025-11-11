console.log("Welcome to tic-tac-toe!");
// this game is tic-tac-toe game

// game board
function gameBoard() {
    let board = getBoard();

    
    function getBoard() {
        return ["","","","","","","","",""];
    }

    function resetBoard() {
        board = getBoard();
    }

    function TheBoardInterface() {
        let boardUI = "";
        for (let i = 0; i < 9; i++) {
            boardUI += ` | ${board[i].getValue()}`;    
            if (i === 2 || i === 4 || i === 8) {
                boardUI += " |\n";
            }
        }
        return boardUI;
    }

    function checkResult() {
        //Horiziontal Check
        for (let row = 0; row < 3; row++) {
            //get first col value in the row 
            let Symbol = board[row][0]?.getValue();
            let match = true;

            //compare first col value we got (Symbol)
            for (let col = 0; col < 3; col++) {
                if (board[row][col]?.getValue() !== Symbol || board[row][col]?.getValue() === "*") {
                    match = false;
                    break;
                } 
            }         

            //if match then someone won
            if (match) {
                return true; //true = Won
            }
        }

        //Vertical Check
        for (let col = 0; col < 3; col++) {
            //get first row value in the col
            let Symbol = board[0][col]?.getValue();
            let match = true;

            //compare first row value we got (Symbol)
            for (let row = 0; row < 3; row++) {
                if (board[row][col]?.getValue() !== Symbol || board[row][col]?.getValue() === "*") {
                    match = false;
                    break;
                } 
            }         

            //if match then someone won
            if (match) {
                return true;//true: Won
            }
        }

        //Diagonal LTR Check
        if (notMatch) {
            //get first value from left to right
            let Symbol = board[0][0]?.getValue();
            let match = true;

            for (let i = 0; i < 3; i++) {
                if (board[i][i]?.getValue() !== Symbol || board[i][i]?.getValue() === "*") {
                    match = false;
                    break;
                } 
            }         

            //if match then someone won
            if (match) {
                return true;//true: Won
            }
        } else {
            //Diagonal RTL Check
            //get first value from left to right
            let Symbol = board[0][2]?.getValue();
            let match = true;

            for (let i = 0; i < 3; i++) {
                //2-i for RTL
                if (board[i][2 - i]?.getValue() !== Symbol || board[i][2 - i]?.getValue() === "*") {
                    match = false;
                    break;
                } 
            }         

            //if match then someone won
            if (match) {
                return true;//true: Won
            }
        }

        return false; //Not Won

    }

    function setCell(index,value) {
        board[index].setValue(value);
    }

    return { TheBoardInterface,resetBoard , setCell,checkResult};
}

// cell
function Cell() {
    //0 for empty
    //1 for X
    //2 for Y
    let value = 0;
    function getValue() {
        return value === 0 ? "*":
          value === 1 ? "X":"O";
    }

    function setValue(newValue) {
        value = newValue;
    }

    return {
        getValue,
        setValue,
    }
}

function createPlayer(name,mark) {
    return {
        name,
        mark
    }
}


function gameController() {
    let board = gameBoard();
    let gameOver;
    let player = [];
    let currentPlayerIndex;

    function play() {

        const row = prompt(`choose row 1-3:`);
        const column = prompt(`choose column 1-3:`);
        //drop value
        board.setCell(row - 1,column - 1,currentPlayerIndex === 0 ? 1 : 2);
        board.checkResult();
        console.log(board.TheBoardInterface())
        currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
        
        //check who is turn
        //wait for him to choose his cell
        //drop value in that cell
        //update board
        // check who won
        //if game over
        // update player stats and game stats
        // if not game over repeat to first step
    }
    

    return {board , player1 , player2, play};
}


const game = gameController();
game.play()