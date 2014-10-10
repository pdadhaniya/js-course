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

    var template = $(".my-template").html();
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
  console.log("HEY BUDDY!")
})