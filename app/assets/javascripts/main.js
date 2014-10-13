var counter = 0;
var answer, correct, quizId;
var numberCorrect = 0;

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
    $('.display').html("<h1>You are correct!</h1>")
  } else {
    $('.display').html("<h1>You are wrong!</h1>")
  };
  counter += 1;
  setTimeout(nextQuestion, 1000);
});

var nextQuestion = function(){
  $.get("/quizzes/"+quizId+"/questions", function(data){
    if (data.length === counter) {
      $('.display').html("<h1>You got "+(numberCorrect*100)/data.length+"% right!</h1>");
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

$(document).on("click", ".new-quiz", function(){
  $('.display').html("<form id='quiz-form'><h1>New Quiz!</h1><br>Quiz Title: <br><input class='quiz-form-title' label='title' name='title' type='text'><br><input label='submit' type='submit'></form>");
  $('.add-quiz').css("visibility", "hidden");

  $('#quiz-form').submit(function(e){
    e.preventDefault();
    var qtitle = $('.quiz-form-title').val();
    var object = {
      title: qtitle,
    };
    console.log('new-quiz trigger');
    $(document).trigger('new-quiz', [object]);
  });
})


$(document).on('new-quiz', function(e, object) {
  console.log('attempting to post');
  $.post('/quizzes',
    { 
      "quiz[title]": object.title
    }
)});












