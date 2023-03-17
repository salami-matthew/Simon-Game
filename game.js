
$(document).on("keypress", function(event){
  console.log(event);
  $(document).off("keypress");
  nextSequence();
});

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];


function nextSequence(){
  var randomNumber = (Math.floor(Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  buttonFlash(randomChosenColour);
  playSound(randomChosenColour);
  $("h1").text("level " + level);
  level++
}

$(".btn").on("click", function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
    setTimeout(nextSequence, 1000);
    userClickedPattern = []; 
    }

   } else {
    console.log("wrong");
    var wrongAudio =new Audio ("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function buttonFlash(button){
  $("#"+ button).animate({opacity: 0}, 'fast');
  $("#"+ button).animate({opacity: 1}, 'fast');
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  $(document).on("keypress", function(event){
    console.log(event);
    $(document).off("keypress");
    nextSequence();
  });
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}