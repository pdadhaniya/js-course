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