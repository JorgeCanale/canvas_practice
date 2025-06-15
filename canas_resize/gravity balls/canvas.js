let canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let maxRadius = 40;
let minRadius = 2;
let friction = 0.9;

let myColors = [
    '#D6D58E',
    '#DBF227',
    '#9FC131',
    '#005C53'
];


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function randomXY(min,max){
    let position = Math.floor(Math.random() * (max - min * 2) + min);    
    position > 0 ? position = position : position = -position;

    return position;
}

function randomColor(){
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    let Color = `rgb(${red} ${green} ${blue})`;
    return Color;
}

function Ball (x,y,radius,dx,dy,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
     };

     this.update = function(){

            if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        };

        if(this.y + this.radius >= innerHeight ){            
            this.dy = -this.dy * friction
        }else{
            this.dy += dy;
        }

        console.log(this.dy);
        
           if(this.y + radius >= innerHeight){ 
            this.x += this.dx;}
            
          this.y += this.dy

            this.draw();
     };
}

let ball;

function init (){
    let dx = (Math.random() - 0.5); 
    let dy = (Math.random() + 0.9);
    ball = new Ball(randomXY(30,innerWidth), randomXY(30,innerHeight),30,dx,dy, myColors[3]);
        };



function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ball.draw();
    ball.update();
    
};

    
// init();
// animate();
