// $(document).ready(function(){
//   $.get('/quizzes', function(data) {
//     $('.intro').empty();
//     _.each(data, function(element){
//       $('body').append("<h1>"+element.title+"</h1>");
//     });
//   });
// });
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
  console.log(numberCorrect);
  counter += 1;
  $.get("/quizzes/"+quizId+"/questions", function(data){
    console.log(data.length)
    if (data.length === counter) {
      $('.display').html("<p>Game Over!</p>");
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
});