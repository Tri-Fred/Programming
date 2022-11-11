

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
   
    loop = setInterval(() => {
       update();
       render();
    },1000/60);


   document.addEventListener('keydown', keyPressed);
   document.addEventListener('keyup', keyReleased);
   
   for(var i = 0; i <10; i++){
           
       }

   

   }
/*var name= prompt ("Enter Username");
alert("Welcome " +name);*/

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

//player image
var player = new Image
   player.src = 'images/pencil.png';

//ball image
var ball = new Image ();
   ball.src = 'images/ball.png';




function drawRect(x,y,width,height,color) {
   canvasContext.fillstyle = color;
   canvasContext.fillRect(x,y,width,height);
   canvasContext.fill();
}
//draw ball into canvas
function drawCircle(x,y,size,color){
   canvasContext.beginpath();
   canvasContext.fillstyle= color;
   canvasContext.arc(x,y,size,0,math.PI*2);
   canvasContext.fill();
}
// draw dotted lines in middle of screen. Place for ball to reset to
function drawNet() {
   canvasContext.strokeStyle = "fff";
   canvasContext.lineWidth = 5;
   canvasContext.setLineDash ([20,10]);
   canvasContext.beginPath();
   canvasContext.moveTo(canvas.width/2, 0);
   canvasContext.lineTo(canvas.width/2 ,canvas.height);
   canvasContext.stroke();
}


   paddle1 = {
       width:20,
       height:140,               
       x:10,
       y:(canvas.height/2) -70,
       color:"#fff",
   }

   paddle2 = {
       width:20,
       height:140,
       x:(canvas.width)-30,
       y:(canvas.height/2) -70,
       color:"#fff",
   }
   ball = {
       size:14,
       x:(canvas.width/2),
       y:(canvas.height/2),
       xv:8,
       yv:8,
       color:"#fff",
   }


function update() {
   
}

function start () {
   update();
   render();
   init();
   loop = setInterval(update,fps);
}

//start game code
function startGame() {
   let startDiv = document.getElementById("start");
   let gameCanvas = document.getElementById("canvas");
   let  gameOver = document.getElementById("game-over");
   startDiv.style.display = "none";
   gameCanvas.style.display = "block";
   gameOver.style.display = "none";
   start();
}
//end game code
function gameOver() {
   let startDiv = document.getElementById("start");
   let gameCanvas = document.getElementById("canvas");
   let  gameOver = document.getElementById("game-over");
   startDiv.style.display = "none";
   gameCanvas.style.display = "none";
   gameOver.style.display = "block";

   clearInterval(loop);
 }
//final draw function
function render() {
   drawRect(0,0,canvas.width,canvas.height,"#000");
   drawNet();
   drawRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height,paddle1.color);
   drawRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height,paddle2.color);
   drawCircle(ball.x,ball.y,ball.size,ball.color);

   ballMove();
   playerMove();
   enemyAImove();
   drawlines();
   
   }

//lines for bouncing code
function drawlines(){
   middlelines.forEach(function(line,i,array){
       colorRect(line.lineXpos,line.lineYpos,line.WIDTH,line.HEIGHT,'white');
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

//player draw function
   function drawImg(player,PLAYER_X_POS,playerYpos,PLAYER_WIDTH,PLAYER_HEIGHT){
canvasContext.drawImage (player,PLAYER_X_POS,playerYpos,PLAYER_WIDTH,PLAYER_HEIGHT);
}


//ball draw function
   function drawImg(ball,ballXpos,ballYpos,BALL_SIZE,BALL_SIZE){
canvasContext.drawImage (ball,ballXpos,ballYpos,BALL_SIZE,BALL_SIZE);

}


// ball move function
   function ballMove() {
       ballXpos = ballXpos + ballXspeed;
       ballYpos = ballYpos + ballYspeed;

       //ball bouncing off player goalie
       if (ballXpos < PLAYER_X_POS + PLAYER_WIDTH && 
           ballYpos + BALL_SIZE > playerYpos &&
           ballYpos < playerYpos + PLAYER_HEIGHT) {
           ballXspeed *= -1;
       }
       //ball bouncing off enemy goalie
       if (ballXpos + BALL_SIZE > enemyAIXpos &&
           ballYpos + BALL_SIZE > enemyAIYpos &&
           ballYpos < enemyAIYpos + ENEMYAI_HEIGHT) {
           ballXspeed *= -1;
       }  
       
       //ball bouncing off right edge
       if(ballXpos > canvas.width - BALL_SIZE){
           ballXspeed *= -1;
           gameOver = true;
           startingPos = true;
           score++;
       }

       //ball bouncing off left edge
       if(ballXpos < 0 ){
           ballXspeed *= -1;
           gameOver = true;
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
       if(ballYpos < enemyAIYpos + ENEMYAI_HEIGHT / 3) {
       enemyAIYpos -= enemyAIYspeed;

       }

       if(ballYpos > enemyAIYpos + ENEMYAI_HEIGHT / 2) {
       enemyAIYpos += enemyAIYspeed;                    
       }
   }   
  

   //when ball hits edge it restarts in the middle
   function startPos () {
       ballXpos = canvas.width / 2 - BALL_SIZE / 2;
       ballYpos = canvas.height / 2 - BALL_SIZE / 2;
       playerYpos = ballYpos - PLAYER_HEIGHT / 2;
       enemyAIYpos = ballYpos - ENEMYAI_HEIGHT / 2;
       
   }
   //scoreboard text
   function colorText(x, y, f, msg, c) {
       canvasContext.fillText(msg, x, y);
       canvasContext.fillStyle = c
       canvasContext.font = f;
       
   }
    

