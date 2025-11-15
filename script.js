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
        return board[index].setValue(value);
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

    function startGame() {        
        gameOver = false;
        currentPlayerIndex = 0;
        gameBoard.reset(); 
        displayController.updateTurnMessage(player[currentPlayerIndex].name,player[currentPlayerIndex].mark)  
    }

    function setPlayers(player1Name,player2Name) {
        player = [createPlayer(player1Name,"X"),createPlayer(player2Name,"O")];
    }

    function playChoice(cellIndex) {
        //drop value
        if (!gameBoard.setMark(cellIndex,player[currentPlayerIndex].mark)) {
            //Warning Message
            if (!gameOver) {
                alert(`This Cell Already Fileld!`);
            } else {
                alert(`This Game is Over!`);
                return;
            }
        }

        displayController.updateGameBoard();
        checkResult();
    }

    function checkResult() {
        //check result
        if (gameBoard.checkWin()) {
            //Won
            alert(`${player[currentPlayerIndex].name} Won the Game!`);
            gameOver = true;
        } else if (gameBoard.checkDraw()) {
            //Draw
            alert(`the Game ended With Draw!`);
            gameOver = true;
        } else {
            //Ongoing
            currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
        }
    }

    return {startGame,setPlayers,playChoice};
})();

const displayController = (() => {
    function displayGameBoard() {
        const mainContainer = document.getElementById("main-container");
        const gameBoardContainer = document.createElement("div");
        gameBoardContainer.classList.add("game-board");
        
        //create board grid
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            const cellButton = document.createElement("button");
            cell.classList.add(`cell`);
            cellButton.classList.add(`button-${i+1}`);
            cellButton.setAttribute("cellIndex",i);

            cell.appendChild(cellButton);
            
            gameBoardContainer.appendChild(cell);
        }

        gameBoardContainer.addEventListener("click",(e) => {
            const cell = e.target;
            const cellIndex = parseInt(cell.getAttribute("cellIndex"));
            gameController.playChoice(cellIndex);
        })

        mainContainer.appendChild(gameBoardContainer);
        updateGameBoard();
    }

    function displayGameBar() {
        const mainContainer = document.getElementById("main-container");
        const gameBarContainer = document.createElement("div");
        gameBarContainer.classList.add("game-bar");

        const playerNameTextBox1 = document.createElement("input");
        const playerNameTextBox2 = document.createElement("input");
        playerNameTextBox1.setAttribute("placeholder","player 1's Name");
        playerNameTextBox2.setAttribute("placeholder","player 2's Name");
        playerNameTextBox1.setAttribute("id","player1-name");
        playerNameTextBox2.setAttribute("id","player2-name");

        const startButton = document.createElement("button");
        startButton.setAttribute("id","start-button")
        startButton.innerText = "Start";

        gameBarContainer.appendChild(playerNameTextBox1);
        gameBarContainer.appendChild(playerNameTextBox2);
        gameBarContainer.appendChild(startButton);

        mainContainer.appendChild(gameBarContainer);

        startButton.addEventListener("click",() => {
            //hide the gameBar 
            gameController.setPlayers(playerNameTextBox1.value,playerNameTextBox2.value);
            mainContainer.innerHTML = "";

            displayController.displayTurn();
            displayController.displayGameBoard();
            
            gameController.startGame();
        })
    }

    function displayTurn() {
        const mainContainer = document.getElementById("main-container");
        const playerTurnMessageContainer = document.createElement("div");
        const playerTurnMessageParagraph = document.createElement("p");
        playerTurnMessageContainer.classList.add("message-container");
        playerTurnMessageParagraph.classList.add("message-paragraph");
        playerTurnMessageContainer.appendChild(playerTurnMessageParagraph);
        mainContainer.appendChild(playerTurnMessageContainer);
    }

    function updateTurnMessage(PlayerName,Mark) {
        const playerTurnMessageParagraph = document.getElementsByClassName("message-paragraph")[0];
        playerTurnMessageParagraph.innerHTML = `${PlayerName}'s Turn:(${Mark})`;
    }

    function updateGameBoard() {
        const cellButtons = document.querySelectorAll(".cell > button");
        const currentBoard = gameBoard.getBoard();
        
        cellButtons.forEach((button,i) => {
            if(currentBoard[i].getValue() !== "") {
                button.innerText = currentBoard[i].getValue();
                if (button.innerText === "O") {
                    button.classList.add("o-choice");
                }
            }
        });
    }

    function displayRestartButton() {
        const mainContainer = document.getElementById("main-container");
        const restartButton = document.createElement("button");
        restartButton.classList.add("restart-button");
        
        restartButton.addEventListener("click",() => {
            
        })
    }

    return {
        displayGameBoard,
        displayGameBar,
        displayTurn,
        updateTurnMessage,
        updateGameBoard,
    }
})();




displayController.displayGameBar();