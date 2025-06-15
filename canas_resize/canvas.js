let canvas = document.querySelector("canvas");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined,
}

let maxRadius = 40;
let minRadius = 2;

let myColors = [
    '#D6D58E',
    '#DBF227',
    '#9FC131',
    '#005C53'
];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

});

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

let ctx = canvas.getContext("2d");

function Circle (x,y,radius,dx,dy,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.oR = radius;
    this.color = myColors[Math.floor(Math.random() * myColors.length)];

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

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy
        };

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 &&
             mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            };
        }else if( this.radius > this.oR){
            this.radius -=1
        };

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
     };
}




let radius = 30;
let bounce = 0;
let increaseSpeed = false;


let circles = [];
let amountOfCircles = 350;

function init (){

    circles = [];

    for (let j = 0; j < amountOfCircles; j++) {
        let dx = (Math.random() - 0.5); 
        let dy = (Math.random() - 0.5);
        let rx = randomXY(radius, (innerWidth - 30));
        let ry = randomXY(radius, (innerHeight - 30));
        let randomRadius = (Math.floor(Math.random() *(7 - 3 + 1) + 3));
        let rColor = "white"
        const circle = new Circle(rx,ry,randomRadius,dx,dy,rColor);
        circles.push(circle)

            };
        };



function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circles.length; i++) {
         circles[i].draw();
         circles[i].update();

    }
    
};

    
init();
animate();


