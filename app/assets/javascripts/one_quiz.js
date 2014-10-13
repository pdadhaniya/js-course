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
    $('.add-quiz').css("visibility", "hidden");
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
      $('.display').html("<h1>You got "+(numberCorrect*100)/data.length+"% right!</h1><br><button class='show-start'>Home</button>");
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
      $('.add-quiz').css("visibility", "hidden");
    }
  });
}