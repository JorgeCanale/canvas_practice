let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");

ctx.lineWidth = 10;

ctx.strokeStyle = "black";
ctx.fillStyle = "black";

ctx.strokeRect(75, 140, 150, 110);


//practicing som things

//muro
ctx.strokeRect(75, 140, 150, 110);

//puerta
ctx.fillRect(130, 190, 40, 60);


//Casa
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(160, 60);
ctx.lineTo(250, 140);
ctx.closePath();

ctx.stroke(); 