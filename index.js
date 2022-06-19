var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

// for random button select
function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  $("#level-title").text("Level " + level);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
// keypress event

$(document).keydown(function() {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();

  }
});


// click event handler
$(".btn").click(function() {

  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  console.log(userClickedPattern);
  animatePress("#" + userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});




// game sounds switch
function playSound(key) {
  switch (key) {

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      var wrong = new Audio("sounds/wrong.mp3");
  }
}

// button pressed animation
function animatePress(key) {
  $(key).addClass("pressed");
  setTimeout(function() {
    $(key).removeClass("pressed");
  }, 100);
}

// for checking user got right click according to gamePattern
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }


  } else {

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }
}

// start over the gamePattern
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
