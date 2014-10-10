$(document).ready(function(){
  $.get('/quizzes', function(data) {
    $('.intro').empty();
    _.each(data, function(element){
      $('body').append("<h1>"+element.title+"</h1>");
    });
  });
});