let diceColour = ["blue","green","red","yellow"];
let randomPattern = [];
let selectedPattern = [];
let level = 0;
let start = false;


// User must hit any key to the start game.
$(document).on("keypress", function(){
   if(!start){
      $("h1").text("Level " + level);
      randomSequence();
      start=true;
   }
})


// User selected game pattern: When the user clicks on any of the buttons it will display an animation & will trigger a specific sound.
$(".btn").on("click",function(){
   let selectedColour = $(this).attr("id");
   selectedPattern.push(selectedColour);
   //console.log(selectedPattern);
   playLighting(selectedColour);
   playSound(selectedColour);
   checkMatch(selectedPattern.length - 1);
 })
 

 // To check if the user selected button pattern equals the randomly selected button pattern. If a successful match, you will enter the next level. If the Match is not successful , the Game Ends.
function checkMatch(index){
   if (selectedPattern[index] === randomPattern[index]){
      if(selectedPattern.length === randomPattern.length){
      setTimeout(function(){
         randomSequence();
      },1000)

      }
   }else{
      $("h1").text("Game Over, Press Any Key to Restart")
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      },300)
      
      restart();

      }
}

// Randomly generated button animation & sound pattern that the user will need to remember & select to advance to each successive level.
function randomSequence(){
   selectedPattern=[];
   level ++;
   $("h1").text("Level " + level);

   let randomNumber = Math.floor(Math.random()*4);
   let randomColour = diceColour[randomNumber];
   
   randomPattern.push(randomColour);
   //console.log(randomPattern);
    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomColour);
}


// Sound generated when the button is clicked by the user or randomly selected.
function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
 }


 // Animation generated when any of the buttons is clicked by the user.
 function playLighting(colour){
   $("#" + colour).addClass("pressed");
   setTimeout(function(){
   $("#" + colour).removeClass("pressed"); 
},100)
 }


 // When the user fails to select the buttons that match the randomly selected button pattern, the game will restart.
 function restart(){
   level = 0;
   start = false;
   randomPattern=[];


 }

