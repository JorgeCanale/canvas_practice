let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

ctx.lineWidth = 10;

ctx.strokeStyle = "black";
ctx.fillStyle = "black";

ctx.strokeRect(75, 140, 150, 110);



if(ctx.isContextLost()){
    console.log('the context is lost');
    
};

//practicing som things

//muro
ctx.strokeRect(75, 140, 150, 110);


//puerta
ctx.fillRect(130, 190, 40, 60);

ctx.beginPath();
ctx.moveTo(130, 160);
ctx.lineTo(140, 160);
ctx.closePath();
ctx.stroke();

//Casa
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(160, 60);
ctx.lineTo(250, 140);
ctx.closePath();

ctx.stroke(); 