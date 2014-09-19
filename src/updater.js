
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


$(document).on('turns', function(e) {
  $('.number').empty();
  $('.number').append('There have been ' + turns + ' turns.');
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
  $('.col').append("<span class='inner'></span>");
});