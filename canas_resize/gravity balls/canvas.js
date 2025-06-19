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

function reduceFriction (speed){
    if(Math.abs(speed) > 0.2 && friction > 0.05){
        friction -= 0.03;
    }else{
        friction = 0;
    }
}

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

        if(this.x + this.radius > innerWidth ){
            this.x = innerWidth - this.radius - 1;
            this.dx = -this.dx * friction;
            reduceFriction(this.dx);
            console.log("the floor is increasing the friction but like crazy");
            
        }else if(this.x - this.radius < 0){
            this.dx = -this.dx * friction;
            reduceFriction(this.dx);
        }

        if(this.y + this.radius >= innerHeight){
                this.y = innerHeight - this.radius;
                this.dy = -this.dy * friction;
                Math.abs(this.dy) > 0.2 ? reduceFriction(this.dy) : this.dy = 0;
                if(this.maxHeigh > innerHeight - this.radius){
                    this.maxHeigh = innerHeight -this.radius;
                    this.dy = 0;
                }else{
                    this.maxHeigh +=  Math.floor(Math.abs(this.dy));
                }
               console.log(`posicion: x ${this.x} y ${this.y} ancho:${innerWidth} Velocidad: x - ${this.dx} y - ${this.dy} Friction: ${friction} Radius: ${this.radius}`)
            
        }else{
            this.dy += 1;
        }

        
        
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
