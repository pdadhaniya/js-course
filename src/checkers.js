var board, currentPlayer, input, integers, startRow, startCol, endRow, endCol, turns;

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
  $(document).trigger('addSpan');

  currentPlayer = 'wht'
};

var attemptMove = function (row1, col1, row2, col2) {
  if (board[row2][col2] !== ' X ') {
    $(document).trigger('invalidMove', ["You must move to an empty space!"]);
    getMove();
    // return "error"; // add error logic 
  } else if (row1<0 || row1>7 || col1<0 || col1>7 || row2<0 || row2>7 || col2<0 || row2>7) {
    $(document).trigger('invalidMove', ["Stay on the board please!"]);
    getMove();
    // return "error"; // add error logic
  };

  if (canCapture()) {
    if (currentPlayer === 'red') {
      if ( (row2-row1 === -2) && (Math.abs(col2-col1) ===2) && (board[(row1-1)][((col1+col2)/2)] === 'wht')  ) {
        removePiece( ( (row1+row2) / 2 ), ( (col1+col2) / 2 ) );
        makeMove(row1, col1, row2, col2);
      } else {
        $(document).trigger('invalidMove', ['You must make a move to CAPTURE a WHITE piece!!!!!']);
        getMove();
        // return "Make a move to CAPTURE!!!!!!!!!";
      }
    } else if (currentPlayer === 'wht') {
      if ( (row2-row1 === 2) && (Math.abs(col2-col1) ===2) && (board[(row1+1)][((col1+col2)/2)] === 'red')  ) {
        removePiece(((row1+row2)/2),((col1+col2)/2))
        makeMove(row1, col1, row2, col2);
      } else {
        $(document).trigger('invalidMove', ['You must make a move to CAPTURE a RED piece!!!!!']);
        getMove();
        // return "Make a move to CAPTURE!!!!!!!!!";
      };
    }
   } else {
      if (currentPlayer === 'red') {
        if ((row2-row1 === -1) && (Math.abs(col2-col1) === 1)) {
          makeMove(row1, col1, row2, col2);
        } else {
          $(document).trigger('invalidMove', ['Please make a valid move.']);
          getMove();
          // return "error1"; //add error logic
        }
      } else if (currentPlayer === 'wht') {
        if ((row2-row1 === 1) && (Math.abs(col2-col1) === 1)) {
          makeMove(row1, col1, row2, col2);
        } else {
        $(document).trigger('invalidMove', ['Please make a valid move.']);
        getMove();
        // return "error2"; //add error logic
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
  turns += 1;
  board[row2][col2] = board[row1][col1];
  board[row1][col1] = ' X ';
  if (currentPlayer === 'wht') {
    currentPlayer = 'red';
  } else if (currentPlayer === 'red') {
    currentPlayer = 'wht';
  }
  $(document).trigger('boardChange');
  $(document).trigger('turns');
  getMove();
};

var removePiece = function(row, col) {
  board[row][col] = ' X ';
  $(document).trigger('pieceTaken', [row, col]);
};


var getMove = function() {
  input = prompt("What move would you like to make? Please enter the row and column of the piece you want to move, and the row and column of the destination. Comma separate your coordinates with no spaces");
  if (input === 'quit') {
    move = {
      quit: true
    };
  } else {
    integers = input.split(',').map(function(item) {
      return parseInt(item);
    });
    move = {
      startRow: integers[0],
      startCol: integers[1],
      endRow: integers[2],
      endCol: integers[3]
    };
    attemptMove(move.startRow,move.startCol,move.endRow,move.endCol);
  }
};


var play = function() {
  resetBoard();
  turns = 0;
  $(document).trigger('turns');
  displayBoard();
  getMove();
};











