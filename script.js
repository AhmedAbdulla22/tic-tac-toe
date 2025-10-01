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
            boardUI += "    |\n";
        }
        return boardUI;
    }

    return {board, printTheBoard};S
}

// cell
function Cell() {
    //0 for no one
    //1 for player 1
    //2 for player 2
    let player = 0;
    //0 for empty
    //1 for X
    //2 for Y
    let choice = 0;
    function getChoice() {
        return choice === 0 ? "*":
          choice === 1 ? "X":"O";
    }

    function getPlayer() {
        return player === 0 ? "no one":
          player === 1 ? "player 1":"player 2";
    }

    function setChoice(newChoice) {
        choice = newChoice;
    }

    function setPlayer(newPlayer) {
        player = newPlayer;
    }

    return {
        getChoice,
        getPlayer,
        setChoice,
        setPlayer,
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
