// $("div.btn").each(function (index, ele) {

//   console.log(ele.text("hell"));
// });
//var highScore = 0;
 sessionStorage.setItem("highScore", 0);
//document.cookie = "username=John Doe";
//console.log(document.cookie);

var gamePattern = [];
var btnColors = ["red", "yellow", "green", "blue"];
var userChosenColor;
var userClickedPatter = [];
var userLevel = 0;
var ansCounter = 0;
var isGameOver = false;
//pressing the restart button
// $("#restart").on("click", function () {
//   gamePattern = [];
//   userLevel = 0;
//   isGameOver = false;
//   nextSequence();
// });

// starting the game
$(document).on("keydown", function () {
  if (userLevel == 0) {
    isGameOver = false;
    userLevel++;
    nextSequence();
  }
});

//function to start the game
function gameLevel() {
  $("#level-title").text("Level " + userLevel);
}

function gameOver() {
  $("#level-title").text("Game Over, Press any Key to restart");
  var overSound = new Audio("sounds/wrong.mp3");
  var levelCompleted = userLevel - 2;
  $("body").addClass("game-over");
  overSound.play();
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 800);
  gamePattern = [];
  if(sessionStorage.getItem("highScore")<userLevel-2){
    console.log("userLevel = "+levelCompleted);
    sessionStorage.setItem("highScore",levelCompleted);
    $("#HSValue").text(sessionStorage.getItem("highScore"));
  }
  userLevel = 0;
  isGameOver = true;
}

//Creating Sequence for game
function nextSequence() {
  if (!isGameOver) {
    gameLevel();
    var i = 0;
    while (i < 2) {
      var randomNum = Math.floor(Math.random() * 4);
      gamePattern.push(btnColors[randomNum]);

      i++;
    }
    console.log(gamePattern);
    choosingColor();
    userLevel++;
  }
}

// function choosingColor(pattern){
//   for(var i = 0; i<pattern.length; i++){
//     $("#"+pattern[i]).fadeOut(500).fadeIn(500);
//     var aud = new Audio("sounds/"+pattern[i]+".mp3");
//     aud.play();
//     console.log(aud);
//     console.log(i);
//   }
// }

//to animate boxes and play sound
var count = 0;
function choosingColor() {
  var aud = new Audio("sounds/" + gamePattern[count] + ".mp3");
  if (count != 0) {
    aud.pause();
  }

  //using recurring function to add delay between color pattern cycle
  setTimeout(() => {
    $("#" + gamePattern[count])
      .fadeOut(500)
      .fadeIn(500);
    $;
    btnSound(gamePattern[count], "play");
    count++;
    if (count < gamePattern.length) {
      choosingColor();
    } else {
      count = 0;
    }
  }, 800);
}

// event handler for when user clicks a button
$(".btn").on("click", function (e) {
  userChosenColor = e.target.id;
  userClickedPatter.push(userChosenColor);
  btnSound(userChosenColor, "play");
  animatePress(userChosenColor);
  checkAnswer();
  // var aud = new Audio("sounds/"+userChosenColor+".mp3");
  // aud.play();
});

// code to check if pattern input is correct
function checkAnswer() {
  if (ansCounter < gamePattern.length) {
    if (userClickedPatter[ansCounter] != gamePattern[ansCounter]) {
      gameOver();
    }else {
      ansCounter++;
    }
  } 
  if(ansCounter == gamePattern.length)
  {
    ansCounter = 0;
    userClickedPatter = [];
    nextSequence();
  }
}
// if(userChosenColor.length == gamePattern.length){

// }

//to play sound
function btnSound(btnColor, trigger) {
  var aud = new Audio("sounds/" + btnColor + ".mp3");
  if (trigger.toLowerCase() == "play") {
    aud.play();
  } else {
    aud.pause();
  }
}

//animating the button on press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => $("#" + currentColor).removeClass("pressed"), 200);
}
