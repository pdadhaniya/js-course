
// var changeBackground = function() {
//   $('body').css('background-color', '#d3c5b1');
// };
// $(document).on('click', 'button', changeBackground);


$(document).on('boardChange', function() {
  displayBoard();
});


$(document).on('pieceTaken', function(e, row, col) {
  var myColor = currentPlayer;
  var opponent;
  if (currentPlayer === 'red') {
    opponent = 'wht';
  } else {
    opponent = 'red';
  }
  alert('The current player is ' + myColor + ' and your opponent is ' + opponent + '!');
  alert('A piece was taken at row ' + row + ' column ' + col + '.');
});


$(document).on('invalidMove', function(e, error) {
  alert(error)
});

$(document).on('errors', function(e) {
  $('.errors').empty();
  $('.errors').append('There have been ' + errors + ' erroneous moves.');
})


$(document).on('turns', function(e) {
  $('.number').empty();
  $('.number').append('There have been ' + turns + ' turns.');
})

$(document).on('newGame', function(e) {
  $('.games').empty();
  $('.games').append('There have been ' + games + ' games.' );
})

$(document).on('taken', function(e) {
  $('.taken').empty();
  $('.taken').append('There have been ' + taken + ' pieces taken.');
})

$(document).on('showPieces', function(e) {
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      if (board[x][y] === 'wht') {
        $('.row-'+numToChar[x]+'').find('.col-'+[y]+'').find('.inner').addClass('white piece');
      } else if (board[x][y] === 'red') {
        $('.row-'+numToChar[x]+'').find('.col-'+[y]+'').find('.inner').addClass('red piece');
      } else if (board[x][y] === ' X ') {
        $('.row-'+numToChar[x]+'').find('.col-'+[y]+'').find('.inner').removeClass('red white');
      }
    }
  }
});

$(document).on('addSpan', function(e) {
  $('.inner').remove();
  $('.col').append("<span class='inner'></span>");
});

// var $beginningCol, $beginningRow, columnNum1, rowNum1;
// var $endingCol, $endingRow, columnNum2, rowNum2;
// var counter = 0;


// var clickPiece = function() {
//   if (counter === 0) {
//     $beginningCol = $(this).attr('class');
//     $beginningRow = $(this).parent().attr('class');
//     columnNum1 = parseInt($beginningCol.slice(8,9));
//     rowNum1 = charToNum[$beginningRow.slice(8,9)];
//     counter = 1;
//   } else if (counter === 1) {
//       $endingCol = $(this).attr('class');
//       $endingRow = $(this).parent().attr('class');
//       columnNum2 = parseInt($endingCol.slice(8,9));
//       rowNum2 = charToNum[$endingRow.slice(8,9)];
//       counter = 0;
//       attemptMove(rowNum1,columnNum1,rowNum2,columnNum2);
//   }
// };

$(document).on('click', '.col', clickPiece);


