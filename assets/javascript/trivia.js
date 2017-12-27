$("#start").on("click", function(){
  $("#start").remove();
  game.beginQuestion();

})

$(document).on('click', '.answerButton', function(e){
  game.clicked(e);
});

$(document).on('click','#reset', function(){
  game.reset();
});




var gameQuestions = [{

  question: "What is the name of the red chipmunk?",
  answers: ["Alvin", "Tommy", "Simon", "Joey"],
  correctAnswer: "Alvin",
  image: "assets/images/Alvin.gif"
}, {
  question: "Which game console was released in 1985?",
  answers: ["Atari", "Sega", "Nintendo", "DOS"],
  correctAnswer: "Nintendo",
  image: "assets/images/nintendo.gif"
}, {
  question: "What is the name of the boy in Willy Wonka & the Chocolate Factory?",
  answers: ["Jimmy", "Anthony", "Toni", "Charlie"],
  correctAnswer: "Charlie",
  image: "assets/images/charlie.gif"

}, {
  question: "Which movie is the following quote from: \"Say hello to my little friend!\"",
  answers: ["Scarface", "Heat", "Good Fellows", "Chaos"],
  correctAnswer: "Scarface",
  image: "assets/images/scarface.gif"
}, {
  question: "Which President is on the Dime?",
  answers: ["George Bush", "Abraham Lincoln", "Ronald Reagan", "Franklin Roosevelt"],
  correctAnswer: "Franklin Roosevelt",
  image: "assets/images/roosevelt.gif"

}];


      var timer;

      var game = {
        questions: gameQuestions,
        questionNumber: 0,
        counter: 30,
        correct: 0,
        incorrect: 0,
        unanswered: 0,


        beginTime: function() {
          game.counter--;
          $("#counter").html(game.counter);
          if (game.counter === 0) {
            console.log("Time Up!")
            game.timeup();
          }
        },

        beginQuestion: function() {
          timer = setInterval(game.beginTime, 1000);
          $("#twowrapper").append("<h2> Time Remaining: </h2>")
          $("#twowrapper").append("<h2>" + gameQuestions[game.questionNumber].question + "</h2>");


          for (var i = 0; i < gameQuestions[game.questionNumber].answers.length; i++) {
            $("#twowrapper").append("<button class='answerButton' id ='button-' data-name ='" + gameQuestions[game.questionNumber].answers[i]
            +"'>"+gameQuestions[game.questionNumber].answers[i]+ "</button>");



          }

        },

      nextQuestion: function(){
        game.counter = 30;
        $("#counter").html(game.counter)
        game.questionNumber++
        game.beginQuestion();

      },

      timeup: function(){
        clearInterval(timer);
        game.unanswered++;
        $("#twowrapper").html("<h2>Out of time!</h2>")
        $("#twowrapper").append("<h3>The correct Answer was: "+gameQuestions[game.questionNumber].correctAnswer);
        $("#twowrapper").append("<img src='" +gameQuestions[game.questionNumber].image +"'/>");
        if(game.questionNumber===gameQuestions.length-1){
          setTimeout(game.results, 3*1000);
        }
        else{
          setTimeout(game.nextQuestion, 3*1000);
        }

      },

      results: function(){
        clearInterval(timer);
        $("#twowrapper").html("<h2>Your Results!</h2>");
        $("#counter").html(game.counter);
        $("#twowrapper").append("<h3> Correct "+game.correct+"</h3>");
        $("#twowrapper").append("<h3> Incorrect "+game.incorrect+"</h3>");
        $("#twowrapper").append("<h3> Unanswered "+game.unanswered+"</h3>")
        $("#twowrapper").append("<button id='reset'>Reset</button>")


      },

      clicked: function(e){
        clearInterval(timer);
        if ($(e.target).attr("data-name")===gameQuestions[game.questionNumber].correctAnswer)
        {
          game.answerCorrectly();
        }
        else {
          game.answerIncorrectly();
        }

      },

      answerCorrectly: function(){
        console.log("Correct!");
        clearInterval(timer);
        game.correct++;
        $("#twowrapper").html("<h2>You got it right!</h2>");
        $("#twowrapper").append("<img src='" +gameQuestions[game.questionNumber].image +"'/>");
        if(game.questionNumber==gameQuestions.length-1){
          setTimeout(game.results, 3*1000);
        }
        else{
          setTimeout(game.nextQuestion, 3*1000);
        }

      },

      answerIncorrectly: function(){
        console.log("oooopppsss");
        clearInterval(timer);
        game.incorrect++;
        $("#twowrapper").html("<h2>You got it wrong!</h2>");
        $("#twowrapper").append('<h3>The correct Answer was: '+gameQuestions[game.questionNumber].correctAnswer+'</h3>');
        $("#twowrapper").append("<img src='" +gameQuestions[game.questionNumber].image +"'/>");
        if(game.questionNumber==gameQuestions.length-1){
          setTimeout(game.results, 3*1000);
        }
        else{
          setTimeout(game.nextQuestion, 3*1000);
        }
      },

      reset: function(){
        game.questionNumber=0;
        game.counter=0;
        game.correct=0;
        game.incorrect=0;
        game.unanswered =0;
        game.beginQuestion();


      },
};
