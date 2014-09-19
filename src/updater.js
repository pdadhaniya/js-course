
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