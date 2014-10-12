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
    $('.display').html($el);
  });
});

$(document).on("click", ".quiz-title", function(){
  var quizId = $(this).data('id');
  $.get("/quizzes/"+quizId+"/questions", function(data){
    var counter = 0
    console.log(data[0])
    var templateQuiz = $(".quiz-template").html();
    var uncompiledTemplateQuiz = _.template(templateQuiz);
    var compiledTemplateQuiz = uncompiledTemplateQuiz({
      // counter for index
      content: data[counter],
      options: data[counter].choices.split(";")
    });
    var $el = $(compiledTemplateQuiz);
    $('.display').html($el);
    // increment counter on click
  });
});