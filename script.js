console.log("Welcome to tic-tac-toe!");
// this game is tic-tac-toe game

// game board
function gameBoard() {
    let board = getBoard();

    
    function getBoard() {
        return Array.from({length: 3},() => 
        Array.from({length: 3   },() => Cell()));
    }

    function resetBoard() {
        board = getBoard();
    }

    function TheBoardInterface() {
        let boardUI = "";
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                boardUI += ` | ${board[row][col].getValue()}`;
            }            
            boardUI += " |\n";
        }
        return boardUI;
    }

    function checkResult() {
        let notMatch = false;

        //Horiziontal Check
        for (let row = 0; row < 3; row++) {
            //get first col value in the row 
            let Symbol = board[row][0]?.getValue();

            //compare first col value we got (Symbol)
            for (let col = 0; col < 3; col++) {
                if (board[row][col]?.getValue() !== Symbol || board[row][col]?.getValue() === "*") {
                    notMatch = true;
                    break;
                } 
            }         

            //if match then someone won
            if (!notMatch) {
                console.log(`${Symbol} won the game`);
                return;
            } else {
                //reset the flag
                notMatch = false;
            }
        }

        //Vertical Check
        for (let col = 0; col < 3; col++) {
            //get first row value in the col
            let Symbol = board[0][col]?.getValue();

            //compare first row value we got (Symbol)
            for (let row = 0; row < 3; row++) {
                if (board[row][col]?.getValue() !== Symbol || board[row][col]?.getValue() === "*") {
                    notMatch = true;
                    break;
                } 
            }         

            //if match then someone won
            if (!notMatch) {
                console.log(`${Symbol} won the game`);
                return;
            } else {
                //reset the flag
                notMatch = false;
            }
        }

        //Diagonal LTR Check
        if (notMatch) {
            //get first value from left to right
            let Symbol = board[0][0]?.getValue();

            for (let i = 0; i < 3; i++) {
                if (board[i][i]?.getValue() !== Symbol || board[i][i]?.getValue() === "*") {
                    notMatch = true;
                    break;
                } 
            }         

            //if match then someone won
            if (!notMatch) {
                console.log(`${Symbol} won the game`);
                return;
            } else {
                //reset the flag
                notMatch = false;
            }
        } else {
            //Diagonal RTL Check
            //get first value from left to right
            let Symbol = board[0][2]?.getValue();

            for (let i = 0; i < 3; i++) {
                //2-i for RTL
                if (board[i][2 - i]?.getValue() !== Symbol || board[i][2 - i]?.getValue() === "*") {
                    notMatch = true;
                    break;
                } 
            }         

            //if match then someone won
            if (!notMatch) {
                console.log(`${Symbol} won the game`);
                return;
            } else {
                //reset the flag
                notMatch = false;
            }
        }

    }

    function setCell(row,col,value) {
        board[row][col].setValue(value);
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

function Player() {
    let name = "";
    let roundsWon = 0;

    function getName() {
        return name;
    }

    function getRoundsWon() {
        return roundsWon;
    }

    function setName(newName) {
        name = newName;
    }

    function setRoundsWon(rounds) {
        roundsWon = rounds;
    }

    return {
        getName,
        getRoundsWon,
        setName,
        setRoundsWon,
    }
}


function gameController() {
    let board = gameBoard();
    
    let player1 = Player();
    let player2 = Player();

    player1.setName("Player1");
    player2.setName("player2");
    
    return {board , player1 , player2};
}


const game = gameController();

game.board.setCell(0,0,1);
game.board.setCell(0,1,2);
game.board.setCell(0,2,2);
game.board.setCell(1,0,1);
game.board.setCell(1,1,1);
game.board.setCell(1,2,1);
game.board.setCell(2,0,2);
game.board.setCell(2,1,1);
game.board.setCell(2,2,1);
console.log(game.board.TheBoardInterface());
game.board.checkResult();