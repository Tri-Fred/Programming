
var canvas, canvasContext;
window.onload = function() {
    var canvas, canvasContext;
    
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
   



   document.addEventListener('keydown', keyPressed);
   document.addEventListener('keyup', keyReleased);
   
   for(var i = 0; i <10; i++){
           
       }

   
        setInterval(mainloop, 1000 / 50);
   }
/*var name= prompt ("Enter Username");
alert("Welcome " +name);*/

var playerXpos = 30;
var playerYpos = 0;
const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 5;
var playerYspeed = 7;

var AIXpos = 750;
var AIYpos = 0;
const AI_HEIGHT = 100;
const AI_WIDTH = 5;
var AIYspeed = 7;

var resetting = true;
var score = 0;
var AIscore = 0;

var middlelines = [];


//ball info
var ballXpos = 800;
var ballYpos = 0;
const BALL_SIZE = 80;
var ballXspeed = 10;
var ballYspeed = -10;


   
//player moving on command 
const UP_KEY = 38;
const DOWN_KEY = 40;
var upKeyPressed = false;
var downKeyPressed = false;

//toggle ball start position
var startingPos = true;

function mainloop(){
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    colorRect(ballXpos, ballYpos, SIZE, SIZE, 'white');
    colorRect(playerXpos, playerYpos, PLAYER_WIDTH, PLAYER_HEIGHT, 'white');
    colorRect(AIXpos, AIYpos, AI_WIDTH, AI_HEIGHT, 'white');

    colorText(50, 20, '20px arial', 'Score: ' + score, 'white');
    colorText(canvas.width - 150, 20, '20px arial', 'AIScore:' + AIscore, 'white');

    ballMove();
    paddleMove();
    if (resetting) {
        reset();
        resetting = false;
    }
    AImove();
    drawlines();
}
function drawlines(){
    middlelines.forEach(function(line,i,array){
        colorRext(line,lineXpos, line,lineYpos, line.WIDTH, line.HEIGHT,'white');
    });
}

//line for bounce code
var linecount = 0;

function makelines() {
   const WIDTH = 4;
   const HEIGHT = 10;
   const GAP = 5;
   var lineXpos = canvas.width / 2 - WIDTH / 2;
   var lineYpos = HEIGHT * linecount + linecount * GAP;
   
   linecount++;

   var line = {
       linexpos: lineXpos,
       lineYpos: lineYpos,
       WIDTH: WIDTH,
       HEIGHT: HEIGHT,
   }
   middlelines.push(line);
}


//background colour

function colorRect(x,y,w,h,c){
   canvasContext.fillStyle = c;
   canvasContext.fillRect(x,y,w,h);
}


// ball move function
   function ballMove() {
       ballXpos = ballXpos + ballXspeed;
       ballYpos = ballYpos + ballYspeed;

       //ball bouncing off player goalie
       if (ballXpos < playerXpos + PLAYER_WIDTH && 
           ballYpos + BALL_SIZE > playerYpos &&
           ballYpos < playerYpos + PLAYER_HEIGHT) {
           ballXspeed *= -1;
       }
       //ball bouncing off enemy goalie
       if (ballXpos + BALL_SIZE > AIXpos &&
           ballYpos + BALL_SIZE > AIYpos &&
           ballYpos < AIYpos + AI_HEIGHT) {
           ballXspeed *= -1;
       }  
       
       //ball bouncing off right edge
       if(ballXpos > canvas.width - BALL_SIZE){
           ballXspeed *= -1;
           startingPos = true;
           score++;
       }

       //ball bouncing off left edge
       if(ballXpos < 0 ){
           ballXspeed *= -1;
           startingPos = true;
           AIscore++;
       }

       //ball bouncing off bottom edge
       if(ballYpos > canvas.height - BALL_SIZE){
           ballYspeed *= -1;
       }

       //ball bouncing off top edge
       if(ballYpos < 0 ){
           ballYspeed *= -1;  
       }
       
   
   }
   //player moving on command
function playerMove() {
       if (downKeyPressed) {
           playerYpos += playerYspeed;
       }
       if (upKeyPressed) {
           playerYpos -= playerYspeed;
       }
   }

   function keyPressed(evt) {
       if (evt.keyCode == UP_KEY) {
           upKeyPressed = true;
       }
       if (evt.keyCode == DOWN_KEY) {
           downKeyPressed = true;
       }
   }


   function keyReleased(evt) {
       if (evt.keyCode == DOWN_KEY) {
           downKeyPressed = false;
       }
       if (evt.keyCode == UP_KEY) {
           upKeyPressed = false;
       }
   }

   //AI following ball
   function enemyAImove() {
       if(ballYpos < AIYpos + AI_HEIGHT / 3) {
       AIYpos -= AIYspeed;

       }

       if(ballYpos > AIYpos + AI_HEIGHT / 2) {
       AIYpos += AIYspeed;                    
       }
   }   
  

   //when ball hits edge it restarts in the middle
   function startPos () {
       ballXpos = canvas.width / 2 - BALL_SIZE / 2;
       ballYpos = canvas.height / 2 - BALL_SIZE / 2;
       playerYpos = ballYpos - PLAYER_HEIGHT / 2;
       AIYpos = ballYpos - AI_HEIGHT / 2;
       
   }
   //scoreboard text
   function colorText(x, y, f, msg, c) {
       canvasContext.fillText(msg, x, y);
       canvasContext.fillStyle = c;
       canvasContext.font = f;
       
   }
    

