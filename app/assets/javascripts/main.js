var counter = 0;
var answer, correct, quizId, newQuizId;
var numberCorrect = 0;

$(document).ready(function(){
  showStart();
});

var showStart = function(){
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









