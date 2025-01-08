const gameBoard = (function () {
    let gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];

    let getGameBoard = () => { return gameBoard }

    let updateGameBoard = (value, row, column) => {
        gameBoard[row][column] = value;
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

    return { getGameBoard, updateGameBoard, hasXWon, hasOWon };
  })();

  function createPlayer (player, value, turn) {
    const name = player;
    const character = value;
    const order = turn;

    let getName = () => { return name }
    let getCharacter = () => { return character }
    let getOrder = () => { return order }

    return { getName, getCharacter, getOrder };
  }