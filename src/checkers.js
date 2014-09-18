var board, currentPlayer;

var resetBoard = function () {
  board = [
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    ['wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X '],
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
    [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ']
  ];

  currentPlayer = 'wht'
};

var attemptMove = function (row1, col1, row2, col2) {
  if (board[row2][col2] !== ' X ') {
    return "error"; // add error logic 
  } else if (row1<0 || row1>7 || col1<0 || col1>7 || row2<0 || row2>7 || col2<0 || row2>7) {
    return "error"; // add error logic
  };

  if (canCapture()) {
    if (currentPlayer === 'red') {
      if ( (row2-row1 === -2) && (Math.abs(col2-col1) ===2) && (board[(row1-1)][((col1+col2)/2)] === 'wht')  ) {
        makeMove(row1, col1, row2, col2);
        removePiece( ( (row1+row2) / 2 ), ( (col1+col2) / 2 ) );
        displayBoard();
      } else {
        return "Make a move to CAPTURE!!!!!!!!!";
      }
    } else if (currentPlayer === 'wht') {
      if ( (row2-row1 === 2) && (Math.abs(col2-col1) ===2) && (board[(row1+1)][((col1+col2)/2)] === 'red')  ) {
        makeMove(row1, col1, row2, col2);
        removePiece(((row1+row2)/2),((col1+col2)/2))
        displayBoard();
      } else {
        return "Make a move to CAPTURE!!!!!!!!!";
      };
    }
   } else {
      if (currentPlayer === 'red') {
        if ((row2-row1 === -1) && (Math.abs(col2-col1) === 1)) {
          makeMove(row1, col1, row2, col2);
          displayBoard();
        } else {
          return "error1"; //add error logic
        }
      } else if (currentPlayer === 'wht') {
        if ((row2-row1 === 1) && (Math.abs(col2-col1) === 1)) {
          makeMove(row1, col1, row2, col2);
          displayBoard();
        } else {
        return "error2"; //add error logic
      }
    }
  };

};

var canCapture = function() {
  if (currentPlayer === 'red') {
    for (var r=0; r < 8; r++) {
      for (var c=0; c < 8; c++) {
        if ( (board[r][c] === 'red') && ( ( (board[r-1][c-1] === 'wht') && (board[r-2][c-2] === ' X ') ) || ( (board[r-1][c+1] === 'wht') && (board[r-2][c+2] === ' X ') )  )) {
          return true;
        } 
      }
    }
  } else if (currentPlayer === 'wht') {
    for (var r=0; r < 8; r++) {
      for (var c=0; c < 8; c++) {
        if ( (board[r][c] === 'wht') && ( ( (board[r+1][c-1] === 'red') && (board[r+2][c-2] === ' X ') ) || ( (board[r+1][c+1] === 'red') && (board[r+2][c+2] === ' X ') )  )) {
          return true;
        }
      }
    }
  }
  return false;
};

var makeMove = function(row1, col1, row2, col2) {
  board[row2][col2] = board[row1][col1];
  removePiece(row1, col1);
  if (currentPlayer === 'wht') {
    currentPlayer = 'red';
  } else if (currentPlayer === 'red') {
    currentPlayer = 'wht';
  }
};

var removePiece = function(row, col) {
  board[row][col] = ' X '
};

