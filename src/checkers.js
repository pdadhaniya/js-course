var board, currentPlayer, input, integers, startRow, startCol;
var endRow, endCol, turns, errors, taken;
var $beginningCol, $beginningRow, columnNum1, rowNum1;
var $endingCol, $endingRow, columnNum2, rowNum2;
var counter = 0;
var games = 0;

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

  currentPlayer = 'wht';
};

var attemptMove = function (row1, col1, row2, col2) {
  if (board[row2][col2] !== ' X ') {
    errors += 1;
    $(document).trigger('errors');
    $(document).trigger('invalidMove', ["You must move to an empty space!"]);
  } else if (row1<0 || row1>7 || col1<0 || col1>7 || row2<0 || row2>7 || col2<0 || row2>7) {
    errors += 1;
    $(document).trigger('errors');
    $(document).trigger('invalidMove', ["Stay on the board please!"]);
  };

  if (canCapture()) {
    if (currentPlayer === 'red') {
      if ( (row2-row1 === -2) && (Math.abs(col2-col1) ===2) && (board[(row1-1)][((col1+col2)/2)] === 'wht')  ) {
        removePiece( ( (row1+row2) / 2 ), ( (col1+col2) / 2 ) );
        makeMove(row1, col1, row2, col2);
        taken += 1;
        $(document).trigger('taken');
      } else {
        errors += 1;
        $(document).trigger('errors');
        $(document).trigger('invalidMove', ['You must make a move to CAPTURE a WHITE piece!!!!!']);
      }
    } else if (currentPlayer === 'wht') {
      if ( (row2-row1 === 2) && (Math.abs(col2-col1) ===2) && (board[(row1+1)][((col1+col2)/2)] === 'red')  ) {
        removePiece(((row1+row2)/2),((col1+col2)/2));
        makeMove(row1, col1, row2, col2);
        taken += 1;
        $(document).trigger('taken');
      } else {
        errors += 1;
        $(document).trigger('errors');
        $(document).trigger('invalidMove', ['You must make a move to CAPTURE a RED piece!!!!!']);
      };
    }
   } else {
      if ((currentPlayer === 'red') && (board[row1][col1] === 'red')) {
        if ((row2-row1 === -1) && (Math.abs(col2-col1) === 1)) {
          makeMove(row1, col1, row2, col2);
        } else {
          errors += 1;
          $(document).trigger('errors');
          $(document).trigger('invalidMove', ['Please make a valid move.']);
        }
      } else if ((currentPlayer === 'wht') && (board[row1][col1] === 'wht')) {
        if ((row2-row1 === 1) && (Math.abs(col2-col1) === 1)) {
          makeMove(row1, col1, row2, col2);
        } else {
        errors += 1;
        $(document).trigger('errors');
        $(document).trigger('invalidMove', ['Please make a valid move.']);
      }
    }
  };
};

var canCapture = function() {
  if (currentPlayer === 'red') {
    for (var r=2; r < 8; r++) {
      for (var c=0; c < 8; c++) {
        if ( (board[r][c] === 'red') && ( ( (board[r-1][c-1] === 'wht') && (board[r-2][c-2] === ' X ') ) || ( (board[r-1][c+1] === 'wht') && (board[r-2][c+2] === ' X ') )  )) {
          return true;
        } 
      }
    }
  } else if (currentPlayer === 'wht') {
    for (var r=0; r < 6; r++) {
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
  taken = 0;
  turns = 0;
  errors = 0;
  games += 1;
  $(document).trigger('turns');
  $(document).trigger('newGame');
  $(document).trigger('errors');
  $(document).trigger('taken');
  displayBoard();
};

var clickPiece = function() {
  if (counter === 0) {
    $beginningCol = $(this).attr('class');
    $beginningRow = $(this).parent().attr('class');
    columnNum1 = parseInt($beginningCol.slice(8,9));
    rowNum1 = charToNum[$beginningRow.slice(8,9)];
    counter = 1;
  } else if (counter === 1) {
      $endingCol = $(this).attr('class');
      $endingRow = $(this).parent().attr('class');
      columnNum2 = parseInt($endingCol.slice(8,9));
      rowNum2 = charToNum[$endingRow.slice(8,9)];
      counter = 0;
      attemptMove(rowNum1,columnNum1,rowNum2,columnNum2);
  }
};









