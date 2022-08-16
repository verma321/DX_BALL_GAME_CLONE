// const ball=document.querySelector("ball");
const ball=document.getElementById("ball");
const grid=document.querySelector(".grid");
var blocks=Array.from(document.querySelectorAll(".grid div"))
var paddle=document.querySelector("#paddle");
// var paddle=document.getElementById("id");

var ballDirectionY=1;
var ballDirectionX=1;


function moveball(){
    var ballLeft=parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var balltop=parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    ball.style.left=(ballLeft+(10*ballDirectionX))+"px";
    ball.style.top=(balltop-(10*ballDirectionY))+"px";
}
function changeDirection(){
    var ballLeft=parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var balltop=parseInt(window.getComputedStyle(ball).getPropertyValue("top"));

    if(balltop<0 ){
          ballDirectionY=-ballDirectionY;
    }
    else if(ballLeft<0 ||ballLeft>innerWidth)
    ballDirectionX=-ballDirectionX;
}
function remove(){
    blocks.forEach((block)=>{
        var blockposition= block.getBoundingClientRect();
        var ballposition= ball.getBoundingClientRect();
        var removedblock=block.classList.contains("remove");
        if(blockposition.left<ballposition.right && blockposition.right>ballposition.left && blockposition.top<ballposition.bottom && blockposition.bottom>ballposition.bottom && !removedblock)
        {
            block.style.visibility="hidden";
            block.classList.add("remove");
            ballDirectionY = -ballDirectionY;
        }
        else
        console.log("nothing");
    })
}
window.addEventListener("mousemove",movepaddle);

function movepaddle(e){
    mouseposition={
        x: e.clientX,
        y: e.clientY
    }
    if(mouseposition.x < innerWidth-80)
    {
    paddle.style.left=(mouseposition.x + 0) + "px"
    }
    else
    console.log("go inside")
}
function collision(){
    var paddleposition= paddle.getBoundingClientRect();
    var ballposition= ball.getBoundingClientRect();
    if(paddleposition.left<ballposition.right && paddleposition.right>ballposition.left && paddleposition.top<ballposition.bottom && paddleposition.bottom>ballposition.top )
    {
        ballDirectionY=-ballDirectionY;

    }
}
function gameover(){
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    if(ballTop >innerHeight){
        clearInterval(interval);
        const result= document.getElementById("result");
        result.style.display ="block";
    }
    else
    console.log("nothing");
}
function start(){
    moveball();
    changeDirection();
    remove();
    collision();
    gameover();
}
const interval = setInterval(start,40)
