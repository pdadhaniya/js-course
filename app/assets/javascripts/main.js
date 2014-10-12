var counter = 0;
var answer;
var correct;
var numberCorrect = 0;
var quizId;

$(document).ready(function(){
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
});

$(document).on("click", ".quiz-title", function(){
  quizId = $(this).data('id');
  $.get("/quizzes/"+quizId+"/questions", function(data){
    answer = data[counter].answer
    var templateQuiz = $(".quiz-template").html();
    var uncompiledTemplateQuiz = _.template(templateQuiz);
    var compiledTemplateQuiz = uncompiledTemplateQuiz({
      content: data[counter],
      options: data[counter].choices.split(";")
    });
    var $el = $(compiledTemplateQuiz);
    $('.display').html($el);
  });
});

$(document).on("click", ".quiz-choice", function(){
  var choice = $(this).attr('id');
  if (choice === answer) {
    numberCorrect += 1;
  }
  if (choice === answer) {
    $('.display').html("<h1>You are correct!</h1>")
  } else {
    $('.display').html("<h1>You are wrong!</h1>")
  };
  console.log(numberCorrect);
  counter += 1;
  setTimeout(nextQuestion, 1000);
});

var nextQuestion = function(){
  $.get("/quizzes/"+quizId+"/questions", function(data){
    console.log(data.length)
    if (data.length === counter) {
      $('.display').html("<h1>You got "+(numberCorrect*100)/data.length+"% right!</h1>");
      console.log(numberCorrect); 
    } else {
      answer = data[counter].answer
      var templateQuiz = $(".quiz-template").html();
      var uncompiledTemplateQuiz = _.template(templateQuiz);
      var compiledTemplateQuiz = uncompiledTemplateQuiz({
        content: data[counter],
        options: data[counter].choices.split(";")
      });
      var $el = $(compiledTemplateQuiz);
      $('.display').html($el);
    }
  });
}
