var counter = 0;
var answer, correct, quizId, newQuizId;
var numberCorrect = 0;

$(document).ready(function(){
  showStart();
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

$(document).on("click", ".new-quiz", function(){
  $('.display').html("<form id='quiz-form'><h1>New Quiz!</h1><br>Quiz Title: <br><input class='quiz-form-title' label='title' name='title' type='text'><br>Question 1: <br><input class='quiz-form-question1' label='question' name='question' type='text'><br>Choices: <br><input class='quiz-form-choices' label='choices' name='choices' type='text'><br>Answer: <br><input class='quiz-form-answer' label='answer' name='answer' type='text'><br><input label='submit' type='submit'></form>");
  $('.add-quiz').css("visibility", "hidden");

  $('#quiz-form').submit(function(e){
    e.preventDefault();
    var qtitle = $('.quiz-form-title').val();
    var qquestion = $('.quiz-form-question1').val();
    var qchoices = $('.quiz-form-choices').val();
    var qanswer = $('.quiz-form-answer').val();
    var object = {
      title: qtitle,
      question: qquestion,
      choices: qchoices,
      answer: qanswer,
    };
    $(document).trigger('new-quiz', [object]);
  });
})

$(document).on('new-quiz', function(e, object) {
  $.post('/quizzes',
    { 
      "quiz[title]": object.title
    }, function(data) {
      newQuizId = data.entity.id;
      console.log(newQuizId)
      $.post("/quizzes/"+newQuizId+"/questions",
        {
          "question[question]": object.question,
          "question[answer]": object.answer,
          "question[choices]": object.choices,
          "question[type]": "multiple",
        })
    })
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









