// $(document).ready(function(){
//   $.get('/quizzes', function(data) {
//     $('.intro').empty();
//     _.each(data, function(element){
//       $('body').append("<h1>"+element.title+"</h1>");
//     });
//   });
// });



$(document).ready(function(){
  $.get('/quizzes', function(data){

    var template = $(".all-quiz-template").html();
    var uncompiledTemplate = _.template(template);
    var compiledTemplate = uncompiledTemplate({
      content: data
    });
    var $el = $(compiledTemplate);
    $('.intro').empty();
    $('body').append($el);
  });
});

$(document).on("click", ".quiz-title", function(){
  var quizId = $(this).data('id');
  $.get("/quizzes/"+quizId+"/questions", function(data){
  // console.log(data[0].question);
    var templateQuiz = $(".quiz-template").html();
    var uncompiledTemplateQuiz = _.template(templateQuiz);
    var compiledTemplateQuiz = uncompiledTemplateQuiz({
      content: data
    });
    var $el = $(compiledTemplateQuiz);
    $('body').empty();
    $('body').append($el);
  });
});