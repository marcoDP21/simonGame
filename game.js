buttonColours = ["red","blue","green","yellow"];
randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
gamePattern = [];
userClickedPattern = [];
level = 0;
started = false;


$(document).on("keypress", function(e){
    
    if (!started) {
    
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

/*-----------------------------------*/

$(".btn").on("click", function(e) {

    userChosenColour = e.currentTarget.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(gamePattern.length == userClickedPattern.length){
        checkAnswer(level);
    }
});
        
    



function nextSequence(){
    level++;
    $("#level-title").text("level "+level);
    
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    audioButton = new Audio("./sounds/"+randomChosenColour+".mp3");
    audioButton.play();
    
};


function playSound(name) {
    audioButton = new Audio("./sounds/"+name+".mp3");
    audioButton.play();
}

function animatePress(currentColour) {

    $('#'+currentColour).addClass('pressed');  
    setTimeout(function(){
        $('#'+currentColour).toggleClass('pressed'); 
    },100);
};



function checkAnswer(currentLevel) {    
    
        if(correct(currentLevel) === false){
            console.log(gamePattern)
            console.log(userClickedPattern)
            $("#level-title").text("Wrong ;(")
            playSound("wrong");
            $("body").addClass("game-over")
            
            setTimeout(function(){

                userClickedPattern = [];
                gamePattern = [];
                $("body").toggleClass("game-over")
                $("#level-title").text("Press a key to start again")

            }, 1000);

            level = 0;
            started = false;

        }else{

            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }    
}

function correct(currentLevel){
    for (let i = 0; i < currentLevel; i++) {
        if(gamePattern[i] != userClickedPattern[i]){
            return false; 
        }
    }
    return true;
    
}
