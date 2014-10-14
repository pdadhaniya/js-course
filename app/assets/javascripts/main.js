var answer, correct, counter, quizId, newQuizId, numberCorrect;

$(document).ready(function(){
  showStart();
});

var showStart = function(){
  counter = 0;
  numberCorrect = 0;
  $.get('/quizzes', function(data){
  var template = $(".all-quiz-template").html();
  var uncompiledTemplate = _.template(template);
  var compiledTemplate = uncompiledTemplate({
    content: data
  });
  var $el = $(compiledTemplate);
  $('.intro').empty();
  $('.display').html($el);
  });
  $('.add-quiz').css("visibility", "visible");
}

$(document).on("click", ".show-start", showStart);









