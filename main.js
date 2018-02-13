//variables
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

var player1score = 0;
var player2score = 0;

const WINNING_SCORE = 3;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

//the following fuction stands for what starts once the page is loaded
  window.onload = function() {

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    var framesPerSecond = 30;
    setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);

          });

  }

  function ballReset(){

    if (player1score >= WINNING_SCORE ||
          player2score >= WINNING_SCORE) {
           player1score = 0;
           player2score = 0;
         }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
    if(paddle2YCenter < ballY - 35) {
        paddle2Y += 8;
    } else if (paddle2YCenter > ballY + 35){
        paddle2Y -= 8;
    }
  }

  function moveEverything(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    computerMovement();
    //ball behavior, returns if thouched the right hand side of the screen
    if(ballX > canvas.width){
      //ballSpeedX = -ballSpeedX;
      if(ballY > paddle2Y &&
         ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            var deltaY  = ballY -(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;

         } else {
            player1score++
            ballReset();
            //increases player 1 score by 1

         }
    }
    //returns if thouched the left  hand side of the screen
    else if(ballX < 0) {
      if(ballY > paddle1Y &&
         ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            var deltaY  = ballY -(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
         } else {
           player2score++
            ballReset();
            //increases player 2 score by one

         }
    }

    if(ballY > canvas.height){
      ballSpeedY = -ballSpeedY;
    }
    //returns if thouched the left  hand side of the screen
    else if(ballY < 0){
      ballSpeedY = -ballSpeedY;

    }


  }

//displays / draws everything to the screen
  function drawEverything(){
    // next line blanks out the screen with black
    colorRect(0,0,canvas.width,canvas.height, "black");
    // this is left player paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT,'white');
    // this is right player paddle
    colorRect(canvas.width-10, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT,'white');
    //ball drawng
    colorCircle(ballX, ballY, 10, 'white')
    //score info
    canvasContext.fillText(player1score, 200, 100);
    canvasContext.fillText(player2score, canvas.width - 200, 100);
  }

//following function uses canvas drawing methods


function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}


function colorCircle(centerX, centerY, radius, drawColor){
    // this is the ball drawing
    canvasContext.fillStyle = 'drawColor';
    canvasContext.beginPath();
    //canvasContext.arc(x, y, r, sAngle, eAngle, counterclockwise)
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();

}
