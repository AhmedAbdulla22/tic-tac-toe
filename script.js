console.log("Welcome to tic-tac-toe!");
// this game is tic-tac-toe game

// game board
function Board() {
    let board = Array.from({length: 3},() => 
        Array.from({length: 3   },() => Cell()));

    function newBoard() {
        board = Array.from({length: 3},() => 
        Array.from({length: 3   },() => Cell()));
    }

    function TheBoardInterface() {
        let boardUI = "";
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                boardUI += ` | ${board[row][col].getChoice()}`;
            }            
            boardUI += " |\n";
        }
        return boardUI;
    }

    return {board, TheBoardInterface};
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

function player() {
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
    let board = Board();
    return {board};
}


const game = gameController();

game.board.board[0][0].setChoice(1);
game.board.board[1][2].setChoice(2);
// console.log(game.board)
game.board.printTheBoard();
