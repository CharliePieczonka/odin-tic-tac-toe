const gameBoard = (function () {
    let gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
    let locked = true;
    //let gameBoard = [["X", "O", "O"], ["X", "X", "O"], ["O", "X", "O"]];

    let getGameBoard = () => { return gameBoard }

    let updateGameBoard = (value, row, column) => {
        gameBoard[row][column] = value;
    }

    let isLocked = () => { return locked }

    let toggleLocked = () => { 
        if(locked) {
            locked = false;
        }
        else {
            locked = true;
        }
    }

    let clearGameBoard = () => {
        gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
    }

    let hasXWon = () => {
        // check all rows for 3 X's
        if(gameBoard[0].every(x => x === "X") || gameBoard[1].every(x => x === "X") || gameBoard[2].every(x => x === "X")) { 
            return true;
        }

        // check all columns for 3 X's
        if((gameBoard[0][0] === "X"  && gameBoard[1][0] === "X" && gameBoard[2][0] ==="X")
        || (gameBoard[0][1] === "X"  && gameBoard[1][1] === "X" && gameBoard[2][1] ==="X")
        || (gameBoard[0][2] === "X"  && gameBoard[1][2] === "X" && gameBoard[2][2] ==="X")) {
            return true;
        }

        // check diagonals for 3 X's
        if((gameBoard[0][0] === "X"  && gameBoard[1][1] === "X" && gameBoard[2][2] ==="X")
        || (gameBoard[2][0] === "X"  && gameBoard[1][1] === "X" && gameBoard[0][2] ==="X")) {
            return true;
        }

        return false;
    }

    let hasOWon = () => {
        // check all rows for 3 X's
        if(gameBoard[0].every(x => x === "O") || gameBoard[1].every(x => x === "O") || gameBoard[2].every(x => x === "O")) { 
            return true;
        }

        // check all columns for 3 X's
        if((gameBoard[0][0] === "O"  && gameBoard[1][0] === "O" && gameBoard[2][0] ==="O")
        || (gameBoard[0][1] === "O"  && gameBoard[1][1] === "O" && gameBoard[2][1] ==="O")
        || (gameBoard[0][2] === "O"  && gameBoard[1][2] === "O" && gameBoard[2][2] ==="O")) {
            return true;
        }

        // check diagonals for 3 X's
        if((gameBoard[0][0] === "O"  && gameBoard[1][1] === "O" && gameBoard[2][2] ==="O")
        || (gameBoard[2][0] === "O"  && gameBoard[1][1] === "O" && gameBoard[0][2] ==="O")) {
            return true;
        }

        return false;
    }

    let isTie = () => {
        // if gameboard is full and neither X or O has won its a tie
        if(gameBoard[0].every(x => x != "") && gameBoard[1].every(x => x != "") && gameBoard[2].every(x => x != "")
        && hasXWon == false && hasOWon == false) { 
            return true;
        }
        
        return false;
    }

    return { getGameBoard, updateGameBoard, clearGameBoard, hasXWon, hasOWon, isTie };
})();

function createPlayer (name, marker) {

    let getName = () => { return name }
    let getMarker = () => { return marker }

    return { getName, getMarker };
}

const gameController = (function () {
    let player1, player2, current;

    const startGame = (name1, name2) => {
        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "0");
        current = player1;
        //displayController.updateMessage(player1.getName() + "'s turn");
    }

    const playRound = (row, column) => {
        gameBoard.updateGameBoard(current.getMarker(), row, column);
        displayController.renderBoard();

        if(gameBoard.hasXWon() || gameBoard.hasOWon()) {
            finishGame(current.getName());
        }

        else if(gameBoard.isTie()) {
            finishGame("tie");
        }
        else {
            if (current === player1) {
                current = player2;
            }
            else {
                current = player1;
            }
        }
    }

    const finishGame = (winner) => {
        if(winner == "tie") {
            // TODO: write message
            displayController.updateMessage("The game has ended in a draw.");
        }
        else {
            // TODO: write message
            displayController.updateMessage(current.getName() + " has won!");
        }

        //TODO: lock game board


        //gameBoard.clearGameBoard();
    }

    const getCurrentPlayer = () => {
        return current;
    }

    return { startGame, playRound, getCurrentPlayer }

})();

const displayController = (function () {
    let startReset = document.querySelector("#startReset");
    let player1 = document.querySelector("#player1");
    let player2 = document.querySelector("#player2");
    let message = document.querySelector("#message");
    let admin = document.querySelector(".admin");
    let board = document.querySelector(".gameBoard");
    let cells = board.querySelectorAll(".cell");

    startReset.addEventListener("click", () => {
        if(player1.value == "" || player2.value == ""){
            message.textContent = "Please enter player names before starting!";
            message.style.color = "red";
        }
        else {
            admin.children[0].innerHTML = player1.value + " is X";
            admin.children[1].innerHTML = player2.value + " is O";
            message.textContent = player1.value + "'s turn";
            message.style.color = "black";
            startReset.textContent = "Reset Game";
            gameController.startGame(player1.value, player2.value);
        }
    });

    // TODO: listen for cell clicks, send info to boardController
    cells.forEach(cell => cell.addEventListener("click", () => {
        gameController.playRound(cell.parentElement.getAttribute("row"), cell.getAttribute("col"));
    }));

    // TODO: render board
    const renderBoard = () => {
        cells.forEach(cell => {
            cell.textContent = gameBoard.getGameBoard()[cell.parentElement.getAttribute("row")][cell.getAttribute("col")];
        })
    }

    // TODO: lock board


    const updateMessage = (msg) => {
        message.textContent = msg;
    }

    return { updateMessage, renderBoard }
})();