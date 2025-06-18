let canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

function randomColor(){
    let color = Math.floor(Math.random() * (balls.length - 0 ) + 0);
    return myColors[color];
}

function randomNumber (min,max){
    let number = Math.floor(Math.random() * (max - min) + min);    
    number > 0 ? number = number : number = -number;

    return number;
}


function Ball (x,y,radius,dx,dy,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxHeigh = y - radius;

    this.color = color;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        
     };

     this.update = function(){

        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
            if(this.x + this.radius > innerWidth){
                this.x = innerWidth - this.radius;
            }
            this.dx = -this.dx * friction; 
        }

        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
            if(this.y + this.radius > innerHeight){
                this.y = innerHeight - this.radius;
                this.dy = -this.dy * friction;
                this.maxHeigh = y - Math.abs(this.dy) * 10;
            }
        }else{
            this.dy += 1;
        }

        if(this.y)

         console.log(`Pos: (${this.x}, ${this.y}) - Vel: dx=${this.dx}, dy=${this.dy} - MaxAltura=${this.maxHeigh}`);

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
     };
}

let balls = [];
let ball;

function init (){
    // balls = [];
    // for (let i = 0; i < 50; i++) {
    //         let dx = (Math.random() + 3); 
    //         let dy = (Math.random() + 0.9);
    //         let color = randomColor();
    //         let radius =  randomNumber(18,30);
    //         let ball = new Ball(randomNumber(30,innerWidth), randomNumber(30,innerHeight),radius,dx,dy, color);
    //         balls.push(ball);
    //     }; 

                let dx = (Math.random() + 3); 
            let dy = (Math.random() + 0.9);
            let color = randomColor();
            let radius =  randomNumber(18,30);
            ball = new Ball(randomNumber(30,innerWidth), randomNumber(30,innerHeight),radius,dx,dy, color);
    }



function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // for (let i = 0; i < balls.length; i++) {
    //     balls[i].draw()
    //     balls[i].update()
    // }
    ball.draw();
    ball.update()
};

    
init();
animate();
