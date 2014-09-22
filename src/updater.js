

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
  alert('The current player is ' + myColor + ' and your opponent is ' + opponent + '! A piece was taken at row ' + row + ' column ' + col + '.');
});


$(document).on('invalidMove', function(e, error) {
  alert(error)
});

$(document).on('errors', function(e) {
  $('.errors').empty();
  $('.errors').append('There have been ' + errors + ' erroneous moves.');
});


$(document).on('turns', function(e) {
  $('.number').empty();
  $('.number').append('There have been ' + turns + ' turns.');
});

$(document).on('newGame', function(e) {
  $('.games').empty();
  $('.games').append('There have been ' + games + ' games.' );
});

$(document).on('taken', function(e) {
  $('.taken').empty();
  $('.taken').append('There have been ' + taken + ' pieces taken.');
});

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


$(document).on('click', '.col', clickPiece);


