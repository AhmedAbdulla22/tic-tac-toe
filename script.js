console.log("Welcome to tic-tac-toe!");
// this game is tic-tac-toe game

// game board
function gameBoard() {
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

    // function TheBoardInterface() {
    //     let boardUI = "";
    //     for (let i = 0; i < 9; i++) {
    //         boardUI += ` | ${board[i] ? board[i] : '#'}`;    
    //         if (i === 2 || i === 5 || i === 8) {
    //             boardUI += " |\n-----------\n";
    //         }
    //     }
    //     return boardUI;
    // }

    function setMark(index,value) {
        return board[index].setValue(value);
    }

    return { getBoard , reset , setMark};
}

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


function gameController() {
    let board;
    let gameOver;
    let player = [];
    let currentPlayerIndex;
    let rounds;

    function play() {
        board = gameBoard();
        gameOver = false;
        player = [createPlayer("John","X"),createPlayer("Pork","O")];
        currentPlayerIndex = 0;

        while(!gameOver) {
            const cell = prompt(`choose cell 1-9:\n${boardUI}`);

            //drop value
            if (!Board.setMark(cell,player[currentPlayerIndex].mark)) {
                continue;
            }
            

            //check result
           

            if (gameOver) {
                  console.log(`${player[currentPlayerIndex].name} Won the Game!`);
            }

            currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
        }
    }
    
    function checkWin(board) {
        let isWin = false;
        //Horizontal 
            for (let row = 0; row < 3; row++) {
                let index = row * 3; // to go by row each time 0 row 1 , 3 row 2 and 6 is row 3
                let skip = false; // to skip row if there is empty cell

                for (let i = 0; i < 3; i++) {
                    if (board[index + i] === "") {
                        skip = true;
                        break;
                    }                 
                }

                if(skip) {
                   continue; 
                } 

                //check for win
                if (board[index] === board[index + 1] && board[index] === board[index + 2]) {
                    isWin = true;
                    break;
                }
            }
            
            if (!isWin) {
                //Vertical 
                for (let col = 0; col < 3; col++) {
                    let skip  = false; // to skip col if there is empty cell
    
                    for (let row = 0; row < 3; row++) {
                        if (board[col + row * 3] === "") {
                            skip = true;
                            break;
                        }                             
                    }
    
                    if(skip) {
                       continue; 
                    } 
    
                    if (board[col] === board[col + 3] && board[col] === board[col + 6]) {
                        isWin = true;
                        break;
                    }
                }
            }
            

            if (!isWin) {
                //Diag 
                alert("i'm here")
                if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
                    isWin = true;
                } else if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
                    isWin = true;
                }
            }

            return isWin;
    }

    function checkDraw(board) {
        let draw = true;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                draw = false;
                break;
            }
        } 

        return draw;
    }

    return {board , play};
}


const game = gameController();
game.play();