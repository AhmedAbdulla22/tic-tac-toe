console.log("Welcome to tic-tac-toe!");
// this game is tic-tac-toe game
// cell
function Cell() {
    let value = "";
    function getValue() {
        return value;
    }

    function setValue(newValue) {
        if(isEmpty()) {
            value = newValue;
            return true;
        } else {
            return false;
        }
    }

    function isEmpty() {
        return value === "";
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

// game board
const gameBoard = (() => {
    let board = newBoard();

    function newBoard() {
        let Board = [];
        for (let i = 0; i < 9; i++) {
            Board[i] = Cell();
        } 
        return Board;
    }
    
    
    function getBoard() {
        return board;
    }

    function reset() {
        board = newBoard();
    }

    function TheBoardInterface() {
        let boardUI = "";
        for (let i = 0; i < 9; i++) {
            boardUI += ` | ${board[i].getValue() ? board[i].getValue() : '#'}`;    
            if (i === 2 || i === 5 || i === 8) {
                boardUI += " |\n-----------\n";
            }
        }
        return boardUI;
    }

    function setMark(index,value) {
        return board[index - 1].setValue(value);
    }

    function checkWin() {
        let isWin = false;
        //Horizontal 
            for (let row = 0; row < 3; row++) {
                let index = row * 3; // to go by row each time 0 row 1 , 3 row 2 and 6 is row 3
                let skip = false; // to skip row if there is empty cell

                for (let i = 0; i < 3; i++) {
                    if (board[index + i].getValue() === "") {
                        skip = true;
                        break;
                    }                 
                }

                if(skip) {
                continue; 
                } 

                //check for win
                if (board[index].getValue() === board[index + 1].getValue() && board[index].getValue() === board[index + 2].getValue()) {
                    isWin = true;
                    break;
                }
            }
            
            if (!isWin) {
                //Vertical 
                for (let col = 0; col < 3; col++) {
                    let skip  = false; // to skip col if there is empty cell
    
                    for (let row = 0; row < 3; row++) {
                        if (board[col + row * 3].getValue() === "") {
                            skip = true;
                            break;
                        }                             
                    }
    
                    if(skip) {
                    continue; 
                    } 
    
                    if (board[col].getValue() === board[col + 3].getValue() && board[col].getValue() === board[col + 6].getValue()) {
                        isWin = true;
                        break;
                    }
                }
            }
            

            if (!isWin) {
                //Diag 
                if (board[0].getValue() !== "" && board[0].getValue() === board[4].getValue() && board[0].getValue() === board[8].getValue()) {
                    isWin = true;
                } else if (board[2].getValue() !== "" && board[2].getValue() === board[4].getValue() && board[2].getValue() === board[6].getValue()) {
                    isWin = true;
                }
            }

            return isWin;
    }

    function checkDraw() {
        let draw = true;
        for (let i = 0; i < 9; i++) {
            if (board[i].getValue() === "") {
                draw = false;
                break;
            }
        } 

        return draw;
    }

    return { getBoard , reset , setMark,TheBoardInterface , checkDraw , checkWin};
})();

const gameController = (() => {
    let gameOver;
    let player = [];
    let currentPlayerIndex;

    function play() {
        player = [createPlayer("John","X"),createPlayer("Pork","O")];
        rounds = prompt("How Many Rounds to Play? 1-9:");
        
        gameOver = false;
        currentPlayerIndex = 0;
        gameBoard.reset();
        
        while(!gameOver) {
            const cell = prompt(`choose cell 1-9:\n${gameBoard.TheBoardInterface()}`);

            //drop value
            if (!gameBoard.setMark(cell,player[currentPlayerIndex].mark)) {
                continue;
            }
            
            //check result
            if (gameBoard.checkWin()) {
                //Won
                console.log(`${player[currentPlayerIndex].name} Won the Game!`);
                gameOver = true;
            } else if (gameBoard.checkDraw()) {
                //Draw
                console.log(`the Game ended With Draw!`);
                gameOver = true;
            } else {
                //Ongoing
                currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
            }

        }
    }

    return {play};
})();

const displayController = (() => {
    // TODO: display Controller
    function displayGameBoard() {
        const gameBoardContainer = document.getElementById("game-board");
        gameBoardContainer.innerText = gameBoard.TheBoardInterface();
    }

    return {
        displayGameBoard,
    }
})();




// gameController.play();
displayController.displayGameBoard();